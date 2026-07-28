import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'Shreyashio'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const GRAPHQL_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    followers {
      totalCount
    }
    repositories(privacy: PUBLIC, first: 30, orderBy: { field: PUSHED_AT, direction: DESC }) {
      totalCount
      nodes {
        name
        languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
    }
    contributionsCollection(from: $from, to: $to) {
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
  const allDays = weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0
  let checkingCurrent = true

  for (const day of allDays) {
    const dayDate = new Date(day.date)
    dayDate.setHours(0, 0, 0, 0)

    if (checkingCurrent) {
      const diffDays = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays > 1 && day.contributionCount === 0) {
        checkingCurrent = false
      }
    }

    if (day.contributionCount > 0) {
      tempStreak++
      if (checkingCurrent) currentStreak = tempStreak
    } else {
      if (checkingCurrent) checkingCurrent = false
      if (tempStreak > longestStreak) longestStreak = tempStreak
      tempStreak = 0
    }
  }
  if (tempStreak > longestStreak) longestStreak = tempStreak

  return { currentStreak, longestStreak }
}

function getWeeklySparkline(weeks: { contributionDays: { contributionCount: number; date: string }[] }[]) {
  // Return the last 16 weeks of total contributions per week (for sparklines)
  return weeks.slice(-16).map((w) =>
    w.contributionDays.reduce((sum, d) => sum + d.contributionCount, 0)
  )
}

function getMostActiveDay(weeks: { contributionDays: { contributionCount: number; date: string }[] }[]) {
  const dayTotals = [0, 0, 0, 0, 0, 0, 0]
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  weeks.flatMap((w) => w.contributionDays).forEach((d) => {
    const dow = new Date(d.date).getDay()
    dayTotals[dow] += d.contributionCount
  })
  const maxIdx = dayTotals.indexOf(Math.max(...dayTotals))
  return dayNames[maxIdx]
}

function getTopLanguages(repos: {
  languages: { edges: { size: number; node: { name: string; color: string | null } }[] }
}[]) {
  const langMap: Record<string, { size: number; color: string }> = {}
  for (const repo of repos) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name
      if (!langMap[name]) langMap[name] = { size: 0, color: edge.node.color ?? '#888' }
      langMap[name].size += edge.size
    }
  }
  const total = Object.values(langMap).reduce((s, v) => s + v.size, 0)
  return Object.entries(langMap)
    .map(([name, { size, color }]) => ({ name, percent: Math.round((size / total) * 100), color }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5)
}

export async function GET() {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'GITHUB_TOKEN not set in environment variables' },
      { status: 500 }
    )
  }

  try {
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
      next: { revalidate: 3600 },
    })

    if (!response.ok) throw new Error(`GitHub API responded with status ${response.status}`)

    const json = await response.json()
    if (json.errors) throw new Error(json.errors[0]?.message ?? 'GitHub GraphQL error')

    const user = json.data?.user
    if (!user) throw new Error('No user data returned from GitHub')

    const calendar = user.contributionsCollection.contributionCalendar
    const { currentStreak, longestStreak } = calculateStreak(calendar.weeks)
    const weeklySparkline = getWeeklySparkline(calendar.weeks)
    const mostActiveDay = getMostActiveDay(calendar.weeks)
    const topLanguages = getTopLanguages(user.repositories.nodes)

    return NextResponse.json({
      totalCommits: calendar.totalContributions,
      repositories: user.repositories.totalCount,
      followers: user.followers.totalCount,
      currentStreak,
      longestStreak,
      weeklySparkline,
      mostActiveDay,
      topLanguages,
    })
  } catch (err) {
    console.error('[github-stats] Error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats', detail: String(err) },
      { status: 500 }
    )
  }
}
