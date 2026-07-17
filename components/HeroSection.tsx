'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Blockchain Developer',
  'AI/ML Developer',
]

function TypewriterText() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = roles[roleIdx]
    const speed = isDeleting ? 40 : 70

    timerRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1))
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1600)
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1))
        if (displayed.length - 1 === 0) {
          setIsDeleting(false)
          setRoleIdx((i) => (i + 1) % roles.length)
        }
      }
    }, speed)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [displayed, isDeleting, roleIdx])

  return (
    <span className="inline-block min-w-[2ch]">
      {displayed}
      <span
        className="inline-block w-0.5 ml-1 align-middle animate-pulse"
        style={{ background: 'var(--clr-red)', height: '1em' }}
      />
    </span>
  )
}

// Developer SVG doodle — stylized abstract dev figure
function DoodleAvatar() {
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), 3200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative ${drawn ? 'idle-bob' : ''}`}>
      <svg
        width="320"
        height="380"
        viewBox="0 0 320 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Shreyash developer doodle"
        role="img"
      >
        {/* Body outline */}
        <path
          d="M160 60 C 200 60, 230 90, 230 130 C 230 170, 200 200, 160 200 C 120 200, 90 170, 90 130 C 90 90, 120 60, 160 60 Z"
          stroke="#A90E02"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="doodle-path"
          style={{ animationDelay: '0s', animationDuration: '1.5s' }}
        />
        {/* Eyes */}
        <circle
          cx="140"
          cy="120"
          r="8"
          stroke="#A90E02"
          strokeWidth="2.5"
          fill="none"
          className="doodle-path"
          style={{ animationDelay: '0.5s', animationDuration: '0.5s' }}
        />
        <circle
          cx="180"
          cy="120"
          r="8"
          stroke="#A90E02"
          strokeWidth="2.5"
          fill="none"
          className="doodle-path"
          style={{ animationDelay: '0.5s', animationDuration: '0.5s' }}
        />
        {/* Pupils */}
        <circle cx="142" cy="122" r="3" fill="#A90E02" className="doodle-path" style={{ animationDelay: '0.8s', animationDuration: '0.3s' }} />
        <circle cx="182" cy="122" r="3" fill="#A90E02" className="doodle-path" style={{ animationDelay: '0.8s', animationDuration: '0.3s' }} />
        {/* Smile */}
        <path
          d="M 140 155 Q 160 175 180 155"
          stroke="#A90E02"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          className="doodle-path"
          style={{ animationDelay: '1s', animationDuration: '0.5s' }}
        />
        {/* Headphones */}
        <path
          d="M 92 120 Q 92 55, 160 55 Q 228 55, 228 120"
          stroke="#1A1A1A"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          className="doodle-path"
          style={{ animationDelay: '0.2s', animationDuration: '0.8s' }}
        />
        <rect x="80" y="108" width="16" height="26" rx="6" stroke="#1A1A1A" strokeWidth="2.5" fill="none" className="doodle-path" style={{ animationDelay: '0.9s', animationDuration: '0.4s' }} />
        <rect x="224" y="108" width="16" height="26" rx="6" stroke="#1A1A1A" strokeWidth="2.5" fill="none" className="doodle-path" style={{ animationDelay: '0.9s', animationDuration: '0.4s' }} />

        {/* Shoulders / torso */}
        <path
          d="M 90 200 L 60 240 L 60 310 L 260 310 L 260 240 L 230 200"
          stroke="#1A1A1A"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="doodle-path"
          style={{ animationDelay: '1.3s', animationDuration: '0.8s' }}
        />
        {/* Hoodie pocket */}
        <path
          d="M 120 270 L 120 300 L 200 300 L 200 270 Q 160 260 120 270 Z"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          fill="none"
          className="doodle-path"
          style={{ animationDelay: '1.8s', animationDuration: '0.5s' }}
        />
        {/* Laptop in hands */}
        <rect x="70" y="295" width="180" height="12" rx="2" stroke="#A90E02" strokeWidth="2.5" fill="none" className="doodle-path" style={{ animationDelay: '2s', animationDuration: '0.5s' }} />
        <rect x="85" y="235" width="150" height="60" rx="3" stroke="#A90E02" strokeWidth="2" fill="none" className="doodle-path" style={{ animationDelay: '2.2s', animationDuration: '0.5s' }} />
        {/* Code lines on screen */}
        <path d="M 100 248 L 140 248" stroke="#A90E02" strokeWidth="1.5" strokeLinecap="round" className="doodle-path" style={{ animationDelay: '2.4s', animationDuration: '0.2s' }} />
        <path d="M 100 258 L 160 258" stroke="#A90E02" strokeWidth="1.5" strokeLinecap="round" className="doodle-path" style={{ animationDelay: '2.5s', animationDuration: '0.2s' }} />
        <path d="M 100 268 L 130 268" stroke="#A90E02" strokeWidth="1.5" strokeLinecap="round" className="doodle-path" style={{ animationDelay: '2.6s', animationDuration: '0.2s' }} />
        <path d="M 100 278 L 155 278" stroke="#A90E02" strokeWidth="1.5" strokeLinecap="round" className="doodle-path" style={{ animationDelay: '2.7s', animationDuration: '0.2s' }} />
        {/* Stars / sparkles */}
        <text x="250" y="90" fontSize="18" fill="#A90E02" className="doodle-path" style={{ animationDelay: '2.8s', animationDuration: '0.3s' }}>✦</text>
        <text x="30" y="170" fontSize="12" fill="#1A1A1A" className="doodle-path" style={{ animationDelay: '2.9s', animationDuration: '0.2s' }}>✦</text>
        <text x="270" y="210" fontSize="10" fill="#A90E02" className="doodle-path" style={{ animationDelay: '3s', animationDuration: '0.2s' }}>✦</text>
      </svg>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--clr-bg)' }}
    >
      {/* Diagonal thick border line */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(135deg, transparent 49.8%, var(--clr-dark) 49.8%, var(--clr-dark) 50.2%, transparent 50.2%)`,
          opacity: 0.12,
        }}
      />

      {/* Halftone dot grid in corner */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 w-fit px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{
                border: '2px solid var(--clr-dark)',
                background: 'var(--clr-bg)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#22c55e' }}
              />
              Open to opportunities & collabs
            </motion.div>

            {/* Main headline */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none uppercase whitespace-nowrap"
              style={{
                fontFamily: 'Anton, sans-serif',
                color: 'var(--clr-dark)',
                letterSpacing: '-0.02em',
              }}
            >
              SHREY<span style={{ color: 'var(--clr-red)' }}>ASH</span><span style={{ color: 'var(--clr-red)' }}>.</span>
            </h1>

            {/* Typewriter role */}
            <div
              className="text-xl md:text-2xl font-semibold"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--clr-dark)' }}
            >
              I&apos;m a{' '}
              <span style={{ color: 'var(--clr-red)' }}>
                <TypewriterText />
              </span>
            </div>

            {/* Tagline */}
            <p
              className="text-base md:text-lg max-w-md leading-relaxed"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#444' }}
            >
              Hybrid engineer who went from making buttons look pretty to writing
              smart contracts and training neural nets. Still figuring out which one
              breaks the most at 2 AM.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="#projects"
                className="group relative px-6 py-3 font-bold uppercase text-sm tracking-widest transition-all duration-200"
                style={{
                  background: 'var(--clr-red)',
                  color: '#fff',
                  border: '3px solid var(--clr-dark)',
                  boxShadow: '5px 5px 0px var(--clr-dark)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '7px 7px 0px var(--clr-dark)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px var(--clr-dark)'
                }}
              >
                View My Work ↓
              </a>
              <a
                href="#contact"
                className="px-6 py-3 font-bold uppercase text-sm tracking-widest transition-all duration-200"
                style={{
                  background: 'transparent',
                  color: 'var(--clr-dark)',
                  border: '3px solid var(--clr-dark)',
                  boxShadow: '5px 5px 0px var(--clr-red)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--clr-dark)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--clr-bg)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '7px 7px 0px var(--clr-red)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--clr-dark)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px var(--clr-red)'
                }}
              >
                Say Hi →
              </a>
            </div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="mt-8 flex items-center gap-3"
              aria-hidden="true"
            >
              <div
                className="w-px h-12"
                style={{ background: 'var(--clr-red)' }}
              />
              <span
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#999' }}
              >
                Scroll
              </span>
            </motion.div>
          </motion.div>

          {/* Right — Doodle */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            {/* Brutalist frame */}
            <div
              className="relative p-6"
              style={{
                border: '3px solid var(--clr-dark)',
                background: 'var(--clr-bg)',
                boxShadow: '10px 10px 0px var(--clr-red)',
              }}
            >
              {/* Corner tag */}
              <div
                className="absolute -top-4 -left-4 px-2 py-1 text-xs font-bold uppercase tracking-widest z-10"
                style={{
                  background: 'var(--clr-red)',
                  color: '#fff',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                #01
              </div>
              {/* Halftone bg inside frame */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                }}
                aria-hidden="true"
              />
              <DoodleAvatar />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
