'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { techStack, type TechItem } from '@/data/techStack'

const categories = ['Frontend', 'Backend', 'Blockchain', 'AI/ML & Data'] as const

const categoryColors: Record<string, string> = {
  Frontend: '#A90E02',
  Backend: '#FFFBD4',
  Blockchain: '#A90E02',
  'AI/ML & Data': '#FFFBD4',
}

function TechChip({ item, index }: { item: TechItem; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="shrink-0 mx-3"
      style={{ cursor: 'none' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={
        hovered
          ? { y: -14, scale: 1.08 }
          : { y: 0, scale: 1 }
      }
      transition={{ type: 'spring', stiffness: 420, damping: 18 }}
      data-cursor-hover
    >
      <div
        style={{
          position: 'relative',
          border: hovered ? '2.5px solid var(--clr-red)' : '2.5px solid rgba(255,251,212,0.25)',
          background: hovered ? 'var(--clr-red)' : 'rgba(255,251,212,0.05)',
          boxShadow: hovered
            ? '0 0 24px rgba(169,14,2,0.55), 6px 6px 0px rgba(169,14,2,0.4)'
            : '3px 3px 0px rgba(255,251,212,0.08)',
          padding: '18px 28px',
          minWidth: '190px',
          transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        }}
      >
        {/* Glow ring on hover */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'absolute',
              inset: '-6px',
              border: '1px solid rgba(169,14,2,0.3)',
              pointerEvents: 'none',
            }}
          />
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <motion.span
            animate={hovered ? { rotate: [0, -10, 10, -6, 0], scale: 1.3 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.45 }}
            style={{ fontSize: '2.2rem', display: 'block' }}
          >
            {item.icon}
          </motion.span>

          <div>
            <p
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: hovered ? '#fff' : 'var(--clr-bg)',
                lineHeight: 1,
                transition: 'color 0.2s',
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.7rem',
                color: hovered ? 'rgba(255,255,255,0.75)' : '#666',
                marginTop: '4px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
            >
              {item.category} {item.since ? `· since ${item.since}` : ''}
            </p>
          </div>
        </div>

        {/* Bottom underline sweep on hover */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            background: '#fff',
          }}
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

function MarqueeRow({
  items,
  reverse = false,
  speed = '50s',
}: {
  items: TechItem[]
  reverse?: boolean
  speed?: string
}) {
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="marquee-track"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed} linear infinite`,
          padding: '12px 0',
        }}
      >
        {doubled.map((item, i) => (
          <TechChip key={`${item.label}-${i}`} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  const frontendBackend = techStack.filter(
    (t) => t.category === 'Frontend' || t.category === 'Backend'
  )
  const blockchainAI = techStack.filter(
    (t) => t.category === 'Blockchain' || t.category === 'AI/ML & Data'
  )

  // Third row — all items, slower
  const allItems = [...techStack].reverse()

  return (
    <section
      id="stack"
      className="relative overflow-hidden"
      style={{
        background: 'var(--clr-dark)',
        borderTop: '3px solid var(--clr-dark)',
        borderBottom: '3px solid var(--clr-dark)',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, rgba(255,251,212,0.025) 0, rgba(255,251,212,0.025) 1px, transparent 0, transparent 50%)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Large faded "STACK" text bg */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(120px, 22vw, 300px)',
            color: 'rgba(255,251,212,0.02)',
            textTransform: 'uppercase',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          TOOLS
        </span>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 relative z-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-1" style={{ background: 'var(--clr-red)' }} />
          <span
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 700,
              color: 'var(--clr-red)',
            }}
          >
            Tools of the Trade
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              textTransform: 'uppercase',
              color: 'var(--clr-bg)',
              lineHeight: 1,
            }}
          >
            TECH<br />
            <span style={{ color: 'var(--clr-red)' }}>STACK</span>
          </h2>

          {/* Category pills */}
          <div className="flex flex-wrap gap-3 mb-1">
            {categories.map((cat) => (
              <span
                key={cat}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  color: 'var(--clr-red)',
                  border: '1.5px solid rgba(169,14,2,0.5)',
                  padding: '4px 10px',
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 1 — Frontend + Backend → left */}
      <div className="marquee-wrapper mb-3" aria-label="Frontend and Backend technologies">
        <MarqueeRow items={frontendBackend} speed="55s" />
      </div>

      {/* Separator */}
      <div className="my-4 px-6">
        <div style={{ height: '1px', background: 'rgba(255,251,212,0.06)' }} />
      </div>

      {/* Row 2 — Blockchain + AI/ML ← reverse */}
      <div className="marquee-wrapper mb-3" aria-label="Blockchain and AI/ML technologies">
        <MarqueeRow items={blockchainAI} reverse speed="45s" />
      </div>

      {/* Separator */}
      <div className="my-4 px-6">
        <div style={{ height: '1px', background: 'rgba(255,251,212,0.06)' }} />
      </div>

      {/* Row 3 — All items → left (slower, adds depth) */}
      <div className="marquee-wrapper" aria-label="All technologies">
        <MarqueeRow items={allItems} speed="70s" />
      </div>

      {/* Footer hint */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex items-center gap-3 relative z-10">
        <div style={{ width: '6px', height: '6px', background: 'var(--clr-red)' }} />
        <p
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.75rem',
            color: '#555',
            letterSpacing: '0.05em',
          }}
        >
          Hover any chip to pause & interact
        </p>
      </div>
    </section>
  )
}
