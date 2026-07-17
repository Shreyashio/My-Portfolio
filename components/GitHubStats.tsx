'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const GITHUB_USERNAME = 'Shreyashio'

interface Stat {
  label: string
  value: number
  suffix: string
  icon: string
}

const stats: Stat[] = [
  { label: 'Total Commits', value: 280, suffix: '+', icon: '⌨️' },
  { label: 'Repositories', value: 24, suffix: '+', icon: '📁' },
  { label: 'Current Streak', value: 12, suffix: ' days', icon: '🔥' },
  { label: 'Followers', value: 18, suffix: '+', icon: '👥' },
]

function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <div ref={ref}>
      <span className="tabular-nums">{count}</span>
      {suffix}
    </div>
  )
}

function StatCell({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="p-6 flex flex-col justify-between"
      style={{
        border: '3px solid var(--clr-dark)',
        background: 'var(--clr-bg)',
        boxShadow: '5px 5px 0px var(--clr-dark)',
        minHeight: '140px',
        cursor: 'none',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px var(--clr-red)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px var(--clr-dark)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translate(0, 0)'
      }}
      data-cursor-hover
    >
      <span className="text-3xl">{stat.icon}</span>
      <div>
        <div
          className="text-4xl font-bold leading-none mb-1"
          style={{ fontFamily: 'Anton, sans-serif', color: 'var(--clr-red)' }}
        >
          <CountUpNumber target={stat.value} suffix={stat.suffix} />
        </div>
        <p
          className="text-xs uppercase tracking-widest"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#666' }}
        >
          {stat.label}
        </p>
      </div>
    </motion.div>
  )
}

export default function GitHubStats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="stats"
      className="py-24 relative"
      ref={sectionRef}
      style={{ background: 'var(--clr-bg)', borderTop: '3px solid var(--clr-dark)' }}
    >
      {/* Graph paper bg */}
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

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Heatmap — large cell */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 p-6"
            style={{
              border: '3px solid var(--clr-dark)',
              background: 'var(--clr-bg)',
              boxShadow: '6px 6px 0px var(--clr-dark)',
            }}
          >
            <p
              className="text-xs uppercase tracking-widest font-bold mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#888' }}
            >
              Contribution Activity
            </p>

            {/* GitHub contribution graph */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/A90E02/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME}'s GitHub contribution heatmap`}
              className="w-full h-auto"
              style={{ imageRendering: 'pixelated' }}
              loading="lazy"
            />

            {/* Streak stats embed */}
            <div className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&ring=A90E02&fire=A90E02&currStreakLabel=A90E02&sideLabels=1A1A1A&currStreakNum=1A1A1A&sideNums=1A1A1A&dates=888888&background=FFFBD4`}
                alt={`${GITHUB_USERNAME}'s GitHub streak stats`}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Stat tiles — right column */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {stats.map((stat, i) => (
              <StatCell key={stat.label} stat={stat} delay={i * 0.1 + 0.3} />
            ))}
          </div>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap gap-4 items-center"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-bold uppercase text-sm tracking-widest transition-all duration-200"
            style={{
              background: 'var(--clr-dark)',
              color: 'var(--clr-bg)',
              border: '3px solid var(--clr-dark)',
              boxShadow: '5px 5px 0px var(--clr-red)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'var(--clr-red)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-red)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'var(--clr-dark)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-dark)'
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View GitHub Profile →
          </a>

          <span
            className="text-sm"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#888' }}
          >
            @{GITHUB_USERNAME}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
