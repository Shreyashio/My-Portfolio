import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'Shreyashio'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

// GraphQL query to get contribution data, repos, followers and streak info
const GRAPHQL_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    followers {
      totalCount
    }
    repositories(privacy: PUBLIC) {
      totalCount
    }
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`

function calculateStreak(weeks: { contributionDays: { contributionCount: number; date: string }[] }[]) {
  // Flatten all days and sort by date descending
  const allDays = weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0
  let checkingCurrent = true
  let currentStreakCounted = false

  for (const day of allDays) {
    const dayDate = new Date(day.date)
    dayDate.setHours(0, 0, 0, 0)

    if (checkingCurrent && !currentStreakCounted) {
      // Allow today or yesterday as starting point
      const diffDays = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays > 1) {
        checkingCurrent = false
      }
    }

    if (day.contributionCount > 0) {
      tempStreak++
      if (checkingCurrent) {
        currentStreak = tempStreak
      }
    } else {
      if (checkingCurrent) {
        checkingCurrent = false
        currentStreakCounted = true
      }
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak
      }
      tempStreak = 0
    }
  }

  if (tempStreak > longestStreak) longestStreak = tempStreak

  return { currentStreak, longestStreak }
}

export async function GET() {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'GITHUB_TOKEN not set in environment variables' },
      { status: 500 }
    )
  }

  try {
    // Fetch contributions for the past year
    const now = new Date()
    const oneYearAgo = new Date(now)
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'PortfolioApp/1.0',
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: {
          username: GITHUB_USERNAME,
          from: oneYearAgo.toISOString(),
          to: now.toISOString(),
        },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`)
    }

    const json = await response.json()

    if (json.errors) {
      throw new Error(json.errors[0]?.message ?? 'GitHub GraphQL error')
    }

    const user = json.data?.user
    if (!user) {
      throw new Error('No user data returned from GitHub')
    }

    const calendar = user.contributionsCollection.contributionCalendar
    const { currentStreak, longestStreak } = calculateStreak(calendar.weeks)

    return NextResponse.json({
      totalCommits: calendar.totalContributions,
      repositories: user.repositories.totalCount,
      followers: user.followers.totalCount,
      currentStreak,
      longestStreak,
    })
  } catch (err) {
    console.error('[github-stats] Error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats', detail: String(err) },
      { status: 500 }
    )
  }
}
