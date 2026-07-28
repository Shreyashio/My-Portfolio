'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  GitCommitHorizontal,
  BookMarked,
  Flame,
  Users,
} from 'lucide-react'

const GITHUB_USERNAME = 'Shreyashio'

// ─── Types ──────────────────────────────────────────────────────────────────

interface Language {
  name: string
  percent: number
  color: string
}

interface GitHubApiData {
  totalCommits: number
  repositories: number
  followers: number
  currentStreak: number
  longestStreak: number
  weeklySparkline: number[]
  mostActiveDay: string
  topLanguages: Language[]
}

// ─── Count-up number ────────────────────────────────────────────────────────

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView || target === 0) return
    let start = 0
    const duration = 1400
    const step = Math.max(1, Math.ceil(target / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Sparkline bar chart ─────────────────────────────────────────────────────

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data, 1)
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 20 }}>
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${Math.max(10, (v / max) * 100)}%`,
            background: v === 0 ? '#e0e0c8' : 'var(--clr-red)',
            opacity: v === 0 ? 0.4 : 0.85,
            borderRadius: '1px 1px 0 0',
            transition: 'height 0.4s ease',
          }}
        />
      ))}
    </div>
  )
}

// ─── Language bar ────────────────────────────────────────────────────────────

function LangBar({ lang, delay }: { lang: Language; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: lang.color, flexShrink: 0 }}
          />
          <span
            className="text-[11px] uppercase tracking-widest"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--clr-dark)' }}
          >
            {lang.name}
          </span>
        </div>
        <span
          className="text-[11px] tabular-nums"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#888' }}
        >
          {lang.percent}%
        </span>
      </div>
      <div
        className="w-full rounded-none overflow-hidden"
        style={{ height: 4, background: '#e0e0c8' }}
      >
        <motion.div
          style={{ height: '100%', background: lang.color, borderRadius: 0 }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${lang.percent}%` } : { width: 0 }}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ─── Stat row tile (compact horizontal) ─────────────────────────────────────

const statMeta = [
  { key: 'totalCommits',   label: 'Total Commits',   Icon: GitCommitHorizontal, suffix: '+'   },
  { key: 'repositories',   label: 'Repositories',    Icon: BookMarked,          suffix: ''    },
  { key: 'currentStreak',  label: 'Current Streak',  Icon: Flame,               suffix: ' d'  },
  { key: 'followers',      label: 'Followers',       Icon: Users,               suffix: ''    },
] as const

function StatTile({
  label, Icon, value, suffix, sparkline, delay,
}: {
  label: string
  Icon: React.ElementType
  value: number
  suffix: string
  sparkline: number[]
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.45 }}
      className="flex flex-col justify-between px-4 py-3 cursor-default group"
      style={{
        border: '3px solid var(--clr-dark)',
        background: 'var(--clr-bg)',
        boxShadow: '4px 4px 0px var(--clr-dark)',
        transition: 'box-shadow 0.15s, transform 0.15s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '4px 4px 0px var(--clr-red)'
        el.style.transform = 'translate(-2px,-2px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '4px 4px 0px var(--clr-dark)'
        el.style.transform = 'translate(0,0)'
      }}
    >
      {/* Top row: icon + label + number */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon size={13} style={{ color: 'var(--clr-red)', flexShrink: 0 }} strokeWidth={2} />
          <span
            className="text-[10px] uppercase tracking-widest"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#777' }}
          >
            {label}
          </span>
        </div>
        <div
          className="text-2xl font-bold tabular-nums leading-none"
          style={{ fontFamily: 'Anton, sans-serif', color: 'var(--clr-dark)' }}
        >
          <CountUp target={value} suffix={suffix} />
        </div>
      </div>

      {/* Sparkline */}
      <div className="mt-2">
        <Sparkline data={sparkline} />
      </div>
    </motion.div>
  )
}

// ─── Main section ────────────────────────────────────────────────────────────

export default function GitHubStats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const cacheBust = Math.floor(Date.now() / (1000 * 60 * 60 * 24))

  const [apiData, setApiData] = useState<GitHubApiData | null>(null)
  const [statsError, setStatsError] = useState(false)

  // Placeholder sparkline (all zeros) shown while loading
  const emptySparkline = Array(16).fill(0)

  useEffect(() => {
    fetch('/api/github-stats')
      .then((r) => { if (!r.ok) throw new Error('api error'); return r.json() })
      .then((d: GitHubApiData) => setApiData(d))
      .catch(() => setStatsError(true))
  }, [])

  const stats = statMeta.map((m) => ({
    ...m,
    value: apiData ? (apiData[m.key] as number) : 0,
    sparkline: apiData ? apiData.weeklySparkline : emptySparkline,
  }))

  return (
    <section
      id="stats"
      className="py-24 relative"
      ref={sectionRef}
      style={{ background: 'var(--clr-bg)', borderTop: '3px solid var(--clr-dark)' }}
    >
      {/* Graph-paper background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--clr-dark) 1px, transparent 1px), linear-gradient(90deg, var(--clr-dark) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-1" style={{ background: 'var(--clr-red)' }} />
          <span
            className="text-xs uppercase tracking-widest font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--clr-red)' }}
          >
            Proof of Work
          </span>
        </div>

        <h2
          className="text-6xl md:text-7xl uppercase mb-12"
          style={{ fontFamily: 'Anton, sans-serif', color: 'var(--clr-dark)' }}
        >
          GITHUB<br />STATS
        </h2>

        {/* Bento grid: 2-col left (heatmap) + 1-col right (tiles) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ── LEFT PANEL ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col"
            style={{
              border: '3px solid var(--clr-dark)',
              background: 'var(--clr-bg)',
              boxShadow: '6px 6px 0px var(--clr-dark)',
            }}
          >
            {/* Heatmap header */}
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <span
                className="text-[10px] uppercase tracking-widest font-bold"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#888' }}
              >
                Contribution Activity
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span
                  className="text-[10px] font-mono tracking-wider"
                  style={{ color: '#16a34a' }}
                >
                  Live Sync
                </span>
              </span>
            </div>

            {/* Heatmap image */}
            <div className="px-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ghchart.rshah.org/A90E02/${GITHUB_USERNAME}?v=${cacheBust}`}
                alt={`${GITHUB_USERNAME}'s GitHub contribution heatmap`}
                className="w-full h-auto"
                style={{ imageRendering: 'pixelated' }}
                loading="lazy"
              />
            </div>

            {/* ── Streak summary strip ───────────────────────────────── */}
            <div
              className="grid grid-cols-3 divide-x"
              style={{ borderTop: '3px solid var(--clr-dark)', divideColor: 'var(--clr-dark)' }}
            >
              {[
                { label: 'Current Streak', value: apiData?.currentStreak ?? null, suffix: ' days', Icon: Flame },
                { label: 'Longest Streak', value: apiData?.longestStreak ?? null, suffix: ' days', Icon: GitCommitHorizontal },
                { label: 'Total Contribs', value: apiData?.totalCommits ?? null, suffix: '+', Icon: BookMarked },
              ].map(({ label, value, suffix, Icon }, idx) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center py-4 gap-1"
                  style={{ borderRight: idx < 2 ? '3px solid var(--clr-dark)' : 'none' }}
                >
                  <Icon size={13} style={{ color: 'var(--clr-red)' }} strokeWidth={2} />
                  <div
                    className="text-2xl font-bold leading-none tabular-nums"
                    style={{ fontFamily: 'Anton, sans-serif', color: 'var(--clr-dark)' }}
                  >
                    {value === null ? (
                      <span
                        className="inline-block w-14 h-6 animate-pulse rounded-sm"
                        style={{ background: '#e0e0c8' }}
                      />
                    ) : (
                      <CountUp target={value} suffix={suffix} />
                    )}
                  </div>
                  <span
                    className="text-[9px] uppercase tracking-widest"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#888' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Top Languages ─────────────────────────────────────── */}
            <div
              className="px-5 py-5 flex flex-col gap-3"
              style={{ borderTop: '3px solid var(--clr-dark)' }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-[10px] uppercase tracking-widest font-bold"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#888' }}
                >
                  Top Languages
                </span>
                {apiData && (
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#aaa' }}
                  >
                    Most active on {apiData.mostActiveDay}s
                  </span>
                )}
              </div>

              {apiData ? (
                apiData.topLanguages.length > 0 ? (
                  apiData.topLanguages.map((lang, i) => (
                    <LangBar key={lang.name} lang={lang} delay={i * 0.08} />
                  ))
                ) : (
                  <p className="text-xs" style={{ color: '#aaa', fontFamily: 'Space Grotesk, sans-serif' }}>
                    No language data available.
                  </p>
                )
              ) : (
                // Loading skeleton
                [60, 40, 28, 15, 10].map((w, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <div className="h-3 rounded animate-pulse" style={{ width: '5rem', background: '#e0e0c8' }} />
                      <div className="h-3 rounded animate-pulse" style={{ width: '2rem', background: '#e0e0c8' }} />
                    </div>
                    <div className="h-1 rounded animate-pulse" style={{ width: `${w}%`, background: '#e0e0c8' }} />
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* ── RIGHT PANEL: compact stat tiles ────────────────────── */}
          <div className="flex flex-col gap-4">
            {statsError ? (
              <p className="text-xs" style={{ color: '#888', fontFamily: 'Space Grotesk, sans-serif' }}>
                Could not load GitHub stats.
              </p>
            ) : (
              stats.map((s, i) => (
                <StatTile
                  key={s.key}
                  label={s.label}
                  Icon={s.Icon}
                  value={s.value}
                  suffix={s.suffix}
                  sparkline={s.sparkline}
                  delay={i * 0.1 + 0.2}
                />
              ))
            )}

            {/* GitHub CTA inside right panel */}
            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-2 py-3 font-bold uppercase text-xs tracking-widest transition-all duration-200"
              style={{
                background: 'var(--clr-dark)',
                color: 'var(--clr-bg)',
                border: '3px solid var(--clr-dark)',
                boxShadow: '4px 4px 0px var(--clr-red)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--clr-red)'
                el.style.borderColor = 'var(--clr-red)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--clr-dark)'
                el.style.borderColor = 'var(--clr-dark)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View GitHub →
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
