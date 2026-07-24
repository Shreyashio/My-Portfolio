'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    // Ring smoothly follows with lag
    let ringX = mouseX
    let ringY = mouseY

    // Trail particles — each chases the one before it
    const TRAIL_COUNT = 8
    const trailPositions: { x: number; y: number }[] = Array.from(
      { length: TRAIL_COUNT },
      () => ({ x: mouseX, y: mouseY })
    )

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', onMouseMove)

    let animId: number

    const animate = () => {
      // Dot snaps instantly to cursor
      dot.style.transform = `translate(${mouseX - 7}px, ${mouseY - 7}px)`

      // Ring lags behind (lerp)
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 22}px, ${ringY - 22}px)`

      // Trail — each point chases the one ahead
      trailPositions[0].x += (mouseX - trailPositions[0].x) * 0.28
      trailPositions[0].y += (mouseY - trailPositions[0].y) * 0.28

      for (let i = 1; i < TRAIL_COUNT; i++) {
        trailPositions[i].x += (trailPositions[i - 1].x - trailPositions[i].x) * 0.3
        trailPositions[i].y += (trailPositions[i - 1].y - trailPositions[i].y) * 0.3
      }

      trailsRef.current.forEach((el, i) => {
        if (!el) return
        const t = trailPositions[i]
        const scale = (1 - i / TRAIL_COUNT) * 0.9
        const opacity = (1 - i / TRAIL_COUNT) * 0.4
        el.style.transform = `translate(${t.x - 5}px, ${t.y - 5}px) scale(${scale})`
        el.style.opacity = String(opacity)
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    // Scale ring on hover — direct style, no class needed
    const onEnter = () => {
      ring.style.width = '64px'
      ring.style.height = '64px'
      ring.style.borderColor = 'rgba(169, 14, 2, 0.9)'
    }
    const onLeave = () => {
      ring.style.width = '44px'
      ring.style.height = '44px'
      ring.style.borderColor = 'rgba(0, 0, 0, 0.75)'
    }

    const attachHover = () => {
      document
        .querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor-hover]')
        .forEach((el) => {
          el.addEventListener('mouseenter', onEnter)
          el.addEventListener('mouseleave', onLeave)
        })
    }

    attachHover()

    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: '#A90E02',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '2px solid rgba(0, 0, 0, 0.75)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
        }}
      />

      {/* Fluid trail particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          ref={(el) => {
            if (el) trailsRef.current[i] = el
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'rgba(169, 14, 2, 0.8)',
            pointerEvents: 'none',
            zIndex: 99997,
            willChange: 'transform, opacity',
            filter: 'blur(1.5px)',
          }}
        />
      ))}


    </>
  )
}
