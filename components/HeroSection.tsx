'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

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

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleHireClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Trigger direct mailto and scroll to contact section
    window.location.href = 'mailto:rshreyash784@gmail.com?subject=Hiring%20Shreyash'
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
            className="flex flex-col gap-5"
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
              Open to opportunities &amp; collabs
            </motion.div>

            {/* Main headline: SHREYASHio & @Hashrey_ */}
            <div>
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none uppercase tracking-tighter"
                style={{
                  fontFamily: 'Anton, sans-serif',
                  color: 'var(--clr-dark)',
                }}
              >
                SHREY<span style={{ color: 'var(--clr-red)' }}>ASH</span>
                <span
                  style={{ color: 'var(--clr-red)' }}
                  className="lowercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl align-baseline ml-1"
                >
                  io
                </span>
              </h1>

              {/* Sub-handle: @Hashrey_ — fades out & slides up on scroll as it transitions into navbar */}
              <motion.div
                animate={{
                  opacity: scrolled ? 0 : 1,
                  y: scrolled ? -20 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-xl md:text-2xl font-bold tracking-widest uppercase mt-1 inline-block"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: 'var(--clr-red)',
                }}
              >
                @Hashrey_
              </motion.div>
            </div>

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

              {/* Hire Me CTA button */}
              <button
                onClick={handleHireClick}
                className="px-6 py-3 font-bold uppercase text-sm tracking-widest transition-all duration-200"
                style={{
                  background: 'var(--clr-dark)',
                  color: 'var(--clr-bg)',
                  border: '3px solid var(--clr-dark)',
                  boxShadow: '5px 5px 0px var(--clr-red)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--clr-red)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-red)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '7px 7px 0px var(--clr-dark)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--clr-dark)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-dark)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px var(--clr-red)'
                }}
              >
                Hire Me ✉
              </button>

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
              className="mt-6 flex items-center gap-3"
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

          {/* Right — Matrix Code Developer Image in Brutalist Frame */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            {/* Brutalist frame with Matrix Image */}
            <div
              className="relative p-3 group transition-transform duration-300 hover:-translate-y-1"
              style={{
                border: '3px solid var(--clr-dark)',
                background: '#000',
                boxShadow: '10px 10px 0px var(--clr-red)',
              }}
            >
              {/* Corner tag */}
              <div
                className="absolute -top-4 -left-4 px-3 py-1 text-xs font-bold uppercase tracking-widest z-20"
                style={{
                  background: 'var(--clr-red)',
                  color: '#fff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  boxShadow: '2px 2px 0px var(--clr-dark)',
                }}
              >
                #01
              </div>

              {/* Developer matrix photo */}
              <div className="relative w-[300px] sm:w-[340px] h-[380px] sm:h-[420px] overflow-hidden border-2 border-dark">
                <Image
                  src="/avatar.jpg"
                  alt="Shreyash @Hashrey_ Avatar"
                  fill
                  priority
                  sizes="(max-width: 768px) 300px, 340px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle brutalist grid overlay on image */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(var(--clr-red) 1px, transparent 1px), linear-gradient(90deg, var(--clr-red) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
              </div>

              {/* Caption badge underneath image inside frame */}
              <div className="mt-2 pt-2 border-t border-dark/40 flex items-center justify-between px-1">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--clr-red)' }}
                >
                  Shreyash Raut
                </span>
                <span
                  className="text-[10px] font-mono uppercase tracking-widest text-white/70"
                >
                  @Hashrey_
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
