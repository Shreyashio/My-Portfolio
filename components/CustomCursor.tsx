'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })

    const onEnter = () => setIsHovering(true)
    const onLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', move)

    const hoverEls = document.querySelectorAll('a, button, [data-cursor-hover]')
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Re-attach on DOM changes via MutationObserver
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      className={`cursor ${isHovering ? 'cursor-hover' : ''}`}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden="true"
    />
  )
}
