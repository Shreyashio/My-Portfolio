'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Stats', href: '#stats' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = ['hero', 'projects', 'stack', 'stats', 'contact', 'quotes']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-chiffon border-b-3 border-dark shadow-sm py-3' : 'bg-transparent py-5'
      }`}
      style={{ borderBottom: scrolled ? '3px solid #1A1A1A' : 'none' }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between min-h-[40px] relative">
        {/* Left side: @Hashrey_ slides in from the left on scroll */}
        <div className="flex items-center min-w-[140px]">
          <AnimatePresence>
            {scrolled && (
              <motion.a
                href="#hero"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="font-bold text-lg md:text-xl tracking-wider transition-colors hover:opacity-80"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: 'var(--clr-red)',
                }}
              >
                @Hashrey_
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop links container: centered at first, slides smoothly to the right on scroll */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          className={`hidden md:flex items-center ${
            scrolled ? 'ml-auto' : 'mx-auto'
          }`}
        >
          <ul className="flex items-center gap-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className="text-sm font-semibold uppercase tracking-widest transition-colors hover:text-red-brand"
                  style={{
                    color: active === link.href.slice(1) ? 'var(--clr-red)' : 'var(--clr-dark)',
                  }}
                >
                  {link.label}
                  {active === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={{ background: 'var(--clr-red)' }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Mobile Hamburger toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ cursor: 'pointer' }}
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: 'var(--clr-dark)',
              transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: 'var(--clr-dark)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: 'var(--clr-dark)',
              transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'var(--clr-bg)',
              borderTop: '3px solid var(--clr-dark)',
            }}
          >
            <ul className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-lg font-bold uppercase tracking-widest"
                    style={{
                      color: active === link.href.slice(1) ? 'var(--clr-red)' : 'var(--clr-dark)',
                      fontFamily: 'Anton, sans-serif',
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
