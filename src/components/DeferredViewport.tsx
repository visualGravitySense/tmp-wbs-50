'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type DeferredViewportProps = {
  children: ReactNode
  /** CSS min-height for the placeholder (reduces CLS before children mount). */
  minHeight?: string
  /** Passed to IntersectionObserver — positive values prefetch before the block enters view. */
  rootMargin?: string
  /** Max wait before content mounts even if not scrolled near (avoids “empty” page tail). Default false means it only mounts on intersection. */
  mountOnIdle?: boolean
  /** Optional ID. If window.location.hash matches this ID, mount immediately. */
  idForHash?: string
}

/**
 * Renders `children` after the placeholder nears the viewport.
 * Use to defer heavy client subtrees below the first screen on long marketing pages.
 */
export default function DeferredViewport({
  children,
  minHeight = 'min(72vh, 720px)',
  rootMargin = '0px 0px 320px 0px',
  mountOnIdle = false,
  idForHash,
}: DeferredViewportProps) {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (show) return

    let cancelled = false
    const reveal = () => {
      if (!cancelled) setShow(true)
    }

    const hashMatches = () => {
      if (typeof window === 'undefined' || !idForHash) return false
      const hash = window.location.hash.replace(/^#/, '')
      if (!hash) return false
      // Match exact section id, or common aliases used by in-page CTAs.
      if (hash === idForHash) return true
      if (idForHash === 'pricing' && (hash === 'hinnastamine' || hash === 'hinnad')) return true
      if (idForHash === 'ajakava' && (hash === 'schedule' || hash === 'koolitusprogramm')) return true
      return false
    }

    // Immediately reveal if URL hash matches the target ID
    if (hashMatches()) {
      reveal()
      return
    }

    const onHashChange = () => {
      if (hashMatches()) reveal()
    }
    window.addEventListener('hashchange', onHashChange)

    const el = ref.current
    let io: IntersectionObserver | undefined

    if (el && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) reveal()
        },
        { rootMargin, threshold: 0.01 },
      )
      io.observe(el)
    }

    let idleId: number | undefined
    let maxWait: number | undefined

    if (mountOnIdle) {
      idleId =
        typeof requestIdleCallback !== 'undefined'
          ? requestIdleCallback(reveal, { timeout: 3000 })
          : window.setTimeout(reveal, 3000)
      maxWait = window.setTimeout(reveal, 5000)
    }

    return () => {
      cancelled = true
      io?.disconnect()
      window.removeEventListener('hashchange', onHashChange)
      if (idleId !== undefined && typeof requestIdleCallback !== 'undefined') {
        cancelIdleCallback(idleId)
      } else if (idleId !== undefined) {
        window.clearTimeout(idleId)
      }
      if (maxWait !== undefined) window.clearTimeout(maxWait)
    }
  }, [show, rootMargin, mountOnIdle, idForHash])

  return (
    <div
      ref={ref}
      style={show ? undefined : { minHeight }}
      className="w-full [overflow-anchor:none]"
    >
      {show ? children : null}
    </div>
  )
}
