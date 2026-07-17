'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { quotes } from '@/data/quotes'

// Random slight rotations for the sticky-note look
const rotations = [
  -2, 1.5, -1, 2.5, -1.5, 1, -2.5, 2, -1, 1.5,
  -2, 1, -1.5, 2, -1, 1.5, -2.5, 1, -1.5, 2,
  -1, 2.5, -2, 1, -1.5, 2, -1,
]

// Alternating tape colors
const tapeColors = ['var(--clr-red)', 'rgba(169,14,2,0.5)', 'var(--clr-red)']

function QuoteCard({ quote, rowIndex, cardIndex }: { quote: string; rowIndex: number; cardIndex: number }) {
  const [hovered, setHovered] = useState(false)
  const baseRotation = rotations[cardIndex % rotations.length] * (rowIndex % 2 === 0 ? 1 : -1)
  const tapeColor = tapeColors[cardIndex % tapeColors.length]

  return (
    <motion.div
      className="shrink-0 mx-4"
      style={{ cursor: 'none' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={
        hovered
          ? { rotate: 0, y: -16, scale: 1.07, zIndex: 10 }
          : { rotate: baseRotation, y: 0, scale: 1, zIndex: 1 }
      }
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      data-cursor-hover
    >
      <div
        style={{
          position: 'relative',
          background: hovered ? '#fff' : 'var(--clr-bg)',
          border: `2.5px solid ${hovered ? 'var(--clr-red)' : 'var(--clr-dark)'}`,
          boxShadow: hovered
            ? '0 20px 40px rgba(0,0,0,0.4), 6px 6px 0px var(--clr-red)'
            : '4px 4px 0px rgba(255,251,212,0.15)',
          padding: '28px 24px 24px',
          minWidth: '280px',
          maxWidth: '320px',
          transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
        }}
      >
        {/* Washi tape strip */}
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-1deg)',
            width: '56px',
            height: '22px',
            background: tapeColor,
            opacity: 0.85,
            zIndex: 2,
          }}
          aria-hidden="true"
        />

        {/* Corner fold */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '22px',
            height: '22px',
            background: hovered ? 'var(--clr-red)' : '#ddd',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            transition: 'background 0.2s',
          }}
          aria-hidden="true"
        />

        {/* Quote mark */}
        <span
          style={{
            position: 'absolute',
            top: '14px',
            left: '18px',
            fontFamily: 'Anton, sans-serif',
            fontSize: '4rem',
            color: hovered ? 'var(--clr-red)' : 'rgba(26,26,26,0.07)',
            lineHeight: 1,
            pointerEvents: 'none',
            transition: 'color 0.2s',
          }}
          aria-hidden="true"
        >
          "
        </span>

        <p
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.88rem',
            lineHeight: 1.7,
            color: hovered ? 'var(--clr-dark)' : '#2a2a2a',
            paddingTop: '16px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {quote}
        </p>

        {/* Bottom red line sweep on hover */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            background: 'var(--clr-red)',
          }}
          animate={{ width: hovered ? '85%' : '0%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

function MarqueeRow({
  items,
  reverse = false,
  speed = '45s',
  rowIndex = 0,
}: {
  items: string[]
  reverse?: boolean
  speed?: string
  rowIndex?: number
}) {
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        paddingBottom: '20px',
        paddingTop: '20px',
      }}
    >
      <div
        className="marquee-track marquee-wrapper"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed} linear infinite`,
        }}
      >
        {doubled.map((q, i) => (
          <QuoteCard key={`r${rowIndex}-${i}`} quote={q} rowIndex={rowIndex} cardIndex={i} />
        ))}
      </div>
    </div>
  )
}

export default function QuoteWall() {
  const third = Math.ceil(quotes.length / 3)
  const row1 = quotes.slice(0, third)
  const row2 = quotes.slice(third, third * 2)
  const row3 = quotes.slice(third * 2)

  return (
    <section
      id="quotes"
      className="relative overflow-hidden"
      style={{
        background: 'var(--clr-dark)',
        borderTop: '3px solid var(--clr-dark)',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      {/* Cross-hatch background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,251,212,0.02) 0, rgba(255,251,212,0.02) 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, rgba(255,251,212,0.02) 0, rgba(255,251,212,0.02) 1px, transparent 0, transparent 50%)',
          backgroundSize: '30px 30px',
        }}
        aria-hidden="true"
      />

      {/* Giant faded watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(80px, 18vw, 240px)',
            color: 'rgba(255,251,212,0.018)',
            textTransform: 'uppercase',
            lineHeight: 1,
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          DEBUG
          <br />
          MODE
        </span>
      </div>

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
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
            Dev Brain Dump
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              textTransform: 'uppercase',
              color: 'var(--clr-bg)',
              lineHeight: 1.05,
            }}
          >
            Things I Mutter<br />
            <span style={{ color: 'var(--clr-red)', WebkitTextStroke: '0px' }}>While Debugging</span>
          </h2>

          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.85rem',
              color: '#555',
              maxWidth: '280px',
              lineHeight: 1.6,
              marginBottom: '4px',
            }}
          >
            {quotes.length} thoughts collected during late-night sessions. Hover to pause the chaos.
          </p>
        </div>
      </div>

      {/* Row 1 → */}
      <MarqueeRow items={row1} speed="50s" rowIndex={0} />

      {/* Row 2 ← */}
      <MarqueeRow items={row2} reverse speed="42s" rowIndex={1} />

      {/* Row 3 → (slightly faster) */}
      <MarqueeRow items={row3.length > 0 ? row3 : row1} speed="58s" rowIndex={2} />

      {/* Footer */}
      <div
        className="max-w-7xl mx-auto px-6 mt-12 pt-8 relative z-10 flex flex-wrap items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,251,212,0.08)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', background: 'var(--clr-red)' }} />
          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.8rem',
              color: '#555',
            }}
          >
            Made with ☕, 🔥 and a suspicious amount of <code style={{ color: 'var(--clr-red)' }}>console.log()</code> — Shreyash © 2025
          </p>
        </div>

        <a
          href="#hero"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 700,
            padding: '8px 16px',
            border: '2px solid var(--clr-red)',
            color: 'var(--clr-red)',
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'var(--clr-red)'
            el.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'transparent'
            el.style.color = 'var(--clr-red)'
          }}
        >
          ↑ Back to top
        </a>
      </div>
    </section>
  )
}
