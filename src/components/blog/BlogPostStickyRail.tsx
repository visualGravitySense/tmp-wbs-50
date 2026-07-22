'use client'

import { useEffect, useState } from 'react'

type BlogPostStickyRailProps = {
  children: React.ReactNode
}

/**
 * Subtle floating/parallax wrapper for sticky sidebar.
 */
export default function BlogPostStickyRail({ children }: BlogPostStickyRailProps) {
  const [mounted, setMounted] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setMounted(true)

    let rafId = 0
    let compact = window.innerWidth < 1440
    
    const onResize = () => {
      compact = window.innerWidth < 1440
    }

    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        // Keep effect compact on 13" laptops, richer on larger screens.
        const startOffset = compact ? 220 : 140
        const cap = compact ? 8 : 20
        const speed = compact ? 0.012 : 0.02
        const afterHero = Math.max(0, window.scrollY - startOffset)
        const next = Math.min(cap, afterHero * speed)
        setOffset(next)
        rafId = 0
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      className="relative motion-safe:transition-[transform,opacity] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        opacity: mounted ? 1 : 0,
        transform: `translate3d(0, ${mounted ? offset : 0}px, 0)`,
      }}
    >
      <div className="pointer-events-none absolute -inset-x-2 -inset-y-3 -z-[1] rounded-[24px] bg-gradient-to-b from-blue-500/[0.08] via-transparent to-indigo-500/[0.06] blur-xl dark:from-blue-400/[0.12] dark:to-indigo-400/[0.1]" aria-hidden />
      {children}
    </div>
  )
}
