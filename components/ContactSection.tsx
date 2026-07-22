'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EMAIL = 'rshreyash784@gmail.com'

const socials = [
  {
    id: 'github-link',
    label: 'GitHub',
    href: 'https://github.com/Shreyashio',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'linkedin-link',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shreyashraut/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'twitter-link',
    label: 'X / Twitter',
    href: 'https://x.com/Hashrey_',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.722-8.844L1.254 2.25H8.08l4.262 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const subject = encodeURIComponent(`Portfolio Message from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    const mailtoUrl = `mailto:${EMAIL}?subject=${subject}&body=${body}`

    try {
      // Direct window location trigger to open user's default email composer
      window.location.href = mailtoUrl
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    borderBottom: '2px solid var(--clr-dark)',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    padding: '10px 0',
    fontSize: '1rem',
    fontFamily: 'Space Grotesk, sans-serif',
    color: 'var(--clr-dark)',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      id="contact"
      className="py-24 relative"
      ref={sectionRef}
      style={{ background: 'var(--clr-bg)', borderTop: '3px solid var(--clr-dark)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — Headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1" style={{ background: 'var(--clr-red)' }} />
              <span
                className="text-xs uppercase tracking-widest font-bold"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--clr-red)' }}
              >
                Get In Touch
              </span>
            </div>

            <h2
              className="text-7xl md:text-8xl uppercase leading-none mb-8"
              style={{ fontFamily: 'Anton, sans-serif', color: 'var(--clr-dark)' }}
            >
              SAY<br />
              <span style={{ color: 'var(--clr-red)' }}>HI.</span>
            </h2>

            <p
              className="text-base md:text-lg mb-8 max-w-sm leading-relaxed"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#555' }}
            >
              Building something interesting? Want to collaborate on a blockchain
              project, AI experiment, or just ask why my GPU is always at 100%?
              Drop a message.
            </p>

            {/* Direct email card with copy functionality */}
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="text-lg font-bold break-all transition-colors hover:text-red-brand"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--clr-dark)' }}
              >
                {EMAIL} ↗
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 transition-all duration-200"
                style={{
                  border: '2px solid var(--clr-dark)',
                  background: copied ? '#22c55e' : 'var(--clr-dark)',
                  color: 'var(--clr-bg)',
                  boxShadow: '2px 2px 0px var(--clr-red)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  cursor: 'pointer',
                }}
              >
                {copied ? '✓ Copied!' : 'Copy Email'}
              </button>
            </div>

            {/* Social icons */}
            <div className="flex gap-4">
              {socials.map((s) => (
                <motion.a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="flex items-center justify-center w-10 h-10 transition-all"
                  style={{
                    border: '2px solid var(--clr-dark)',
                    color: 'var(--clr-dark)',
                    background: 'var(--clr-bg)',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'var(--clr-red)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-red)'
                    ;(e.currentTarget as HTMLElement).style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'var(--clr-bg)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-dark)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--clr-dark)'
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 mt-10 px-4 py-2"
              style={{
                border: '2px solid var(--clr-dark)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
              🟢 Open to opportunities &amp; collaborations
            </div>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 p-8"
              style={{
                border: '3px solid var(--clr-dark)',
                background: 'var(--clr-bg)',
                boxShadow: '8px 8px 0px var(--clr-red)',
              }}
            >
              <h3
                className="text-2xl uppercase"
                style={{ fontFamily: 'Anton, sans-serif', color: 'var(--clr-dark)' }}
              >
                Let&apos;s Build Something
              </h3>

              {/* Name */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="contact-name"
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#888' }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-red)'
                  }}
                  onBlur={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-dark)'
                  }}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="contact-email"
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#888' }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-red)'
                  }}
                  onBlur={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-dark)'
                  }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="contact-message"
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#888' }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-red)'
                  }}
                  onBlur={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-dark)'
                  }}
                />
              </div>

              {/* Submit */}
              <button
                id="contact-submit"
                type="submit"
                className="w-full py-4 font-bold uppercase text-sm tracking-widest transition-all duration-200"
                style={{
                  background:
                    status === 'success' ? '#22c55e' : 'var(--clr-red)',
                  color: '#fff',
                  border: '3px solid var(--clr-dark)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  boxShadow: '4px 4px 0px var(--clr-dark)',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (status === 'idle') {
                    (e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translate(0, 0)'
                }}
              >
                {status === 'loading'
                  ? 'Opening Email App...'
                  : status === 'success'
                  ? '✓ Email Composer Opened!'
                  : status === 'error'
                  ? 'Error — Try Again'
                  : 'Send Message →'}
              </button>

              {status === 'success' && (
                <p
                  className="text-xs text-center font-semibold"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#22c55e' }}
                >
                  Message prepared! If your email app didn&apos;t open automatically, click &quot;Copy Email&quot; above to message {EMAIL}.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
