'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, type ProjectCategory } from '@/data/projects'

type Tab = { id: ProjectCategory; label: string }

const tabs: Tab[] = [
  { id: 'full-stack', label: 'Full-Stack' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'ai-ml', label: 'AI/ML' },
]

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [flipped, setFlipped] = useState(false)

  return (
    // Wrapper: NOT a motion.div with layout — that breaks preserve-3d
    <div
      style={{
        height: '360px',
        perspective: '1200px',
      }}
    >
      {/* Inner — rotates on flip */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.65s cubic-bezier(0.34, 1.3, 0.64, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ───── FRONT ───── */}
        <div
          onClick={() => setFlipped(true)}
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            border: '3px solid var(--clr-dark)',
            background: 'var(--clr-bg)',
            boxShadow: '6px 6px 0px var(--clr-dark)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.boxShadow = '8px 8px 0px var(--clr-red)'
            el.style.transform = 'translate(-2px,-2px)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.boxShadow = '6px 6px 0px var(--clr-dark)'
            el.style.transform = 'translate(0,0)'
          }}
          role="button"
          tabIndex={0}
          aria-label={`Flip card to see details for ${project.name}`}
          onKeyDown={(e) => e.key === 'Enter' && setFlipped(true)}
        >
          {/* Halftone pattern */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
              backgroundSize: '12px 12px',
              opacity: 0.04,
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header badges without emoji icons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  padding: '3px 8px',
                  border: '1.5px solid var(--clr-red)',
                  color: 'var(--clr-red)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {project.category === 'full-stack' ? 'Full-Stack' : project.category === 'blockchain' ? 'Blockchain' : 'AI/ML'}
              </span>

              {project.hackathon && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--clr-dark)',
                    background: '#fde047',
                    padding: '2px 8px',
                    border: '1.5px solid var(--clr-dark)',
                    boxShadow: '2px 2px 0px #000',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  {project.hackathon}
                </span>
              )}
            </div>

            <h3
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: '2.2rem',
                textTransform: 'uppercase',
                color: 'var(--clr-dark)',
                lineHeight: 1.1,
                marginBottom: '12px',
              }}
            >
              {project.name}
            </h3>

            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.85rem',
                color: '#555',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {project.description}
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--clr-dark)', fontFamily: 'Space Grotesk, sans-serif' }}>
              Click to flip ↻
            </span>
            <div style={{ width: '32px', height: '32px', border: '2px solid var(--clr-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--clr-bg)' }}>
              <span style={{ color: 'var(--clr-red)', fontSize: '16px', fontWeight: 700 }}>+</span>
            </div>
          </div>
        </div>

        {/* ───── BACK ───── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            border: '3px solid var(--clr-red)',
            background: 'var(--clr-dark)',
            boxShadow: '6px 6px 0px var(--clr-red)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.4rem', textTransform: 'uppercase', color: 'var(--clr-bg)' }}>
                {project.name}
              </h3>
              <button
                onClick={() => setFlipped(false)}
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--clr-red)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ✕ Flip back
              </button>
            </div>

            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#ccc', lineHeight: 1.5, marginBottom: '12px' }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    padding: '2px 8px',
                    border: '1px solid var(--clr-red)',
                    color: 'var(--clr-red)',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons: Stacked full-width (1st: Visit Project, 2nd: GitHub underneath) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px', width: '100%' }}>
            {/* Top button: Visit Project or status pill */}
            {project.liveUrl && project.liveUrl !== '#' ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '9px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: 'var(--clr-red)',
                  border: '2px solid var(--clr-red)',
                  color: '#fff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                  boxShadow: '2px 2px 0px #000',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translate(-1px, -1px)'
                  el.style.boxShadow = '4px 4px 0px #000'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translate(0, 0)'
                  el.style.boxShadow = '2px 2px 0px #000'
                }}
              >
                Visit Project →
              </a>
            ) : (
              <span
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '9px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '2px solid rgba(255, 255, 255, 0.25)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  cursor: 'default',
                }}
              >
                {project.liveStatus || 'Soon'}
              </span>
            )}

            {/* Bottom button: GitHub Repository */}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '8px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  border: '2px solid var(--clr-bg)',
                  color: 'var(--clr-bg)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'var(--clr-bg)'
                  el.style.color = 'var(--clr-dark)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                  el.style.color = 'var(--clr-bg)'
                }}
              >
                GitHub Repository ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TopicsSection() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('full-stack')

  const filtered = projects.filter((p) => p.category === activeTab)
  const countFor = (cat: ProjectCategory) => projects.filter((p) => p.category === cat).length

  return (
    <section
      id="projects"
      className="py-24 relative"
      style={{ background: 'var(--clr-bg)', borderTop: '3px solid var(--clr-dark)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-1" style={{ background: 'var(--clr-red)' }} />
          <span
            className="text-xs uppercase tracking-widest font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--clr-red)' }}
          >
            Selected Work
          </span>
        </div>

        <h2
          className="text-6xl md:text-7xl uppercase mb-12"
          style={{ fontFamily: 'Anton, sans-serif', color: 'var(--clr-dark)' }}
        >
          PROJECTS
        </h2>

        {/* Tab filter */}
        <div className="flex flex-wrap gap-0 mb-12" style={{ borderBottom: '3px solid var(--clr-dark)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-6 py-4 flex items-center gap-3 transition-all duration-200"
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: activeTab === tab.id ? 'var(--clr-red)' : '#888',
                background: 'transparent',
                border: 'none',
                borderRight: '1px solid #ddd',
                textDecoration: activeTab !== tab.id ? 'line-through' : 'none',
              }}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
              <span
                className="text-sm font-bold px-1.5 py-0.5"
                style={{
                  background: activeTab === tab.id ? 'var(--clr-red)' : 'transparent',
                  color: activeTab === tab.id ? '#fff' : '#aaa',
                  border: activeTab === tab.id ? 'none' : '1px solid #ccc',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.7rem',
                }}
              >
                {countFor(tab.id)}
              </span>

              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: 'var(--clr-red)' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Project grid — plain div, no motion layout (would break flip) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#aaa' }}>
              Nothing here yet — but something&apos;s brewing! ☕
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
