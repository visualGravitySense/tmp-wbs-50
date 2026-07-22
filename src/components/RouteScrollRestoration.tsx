'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/** Retry schedule — fights Next.js history restore and deferred section mounts. */
const SCROLL_RETRY_MS = [0, 50, 150, 400, 800, 1500, 3000, 5000]

/**
 * Keeps the viewport at y=0 on route changes unless the URL carries a hash
 * fragment (e.g. #pricing). Prevents mobile browsers and layout shifts from
 * landing below the hero on the homepage.
 */
export default function RouteScrollRestoration() {
  const pathname = usePathname()
  const userScrolledRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const hash = window.location.hash
    if (hash && hash.length > 1) return

    userScrolledRef.current = false

    const onUserScroll = () => {
      if (window.scrollY > 8) userScrolledRef.current = true
    }
    window.addEventListener('scroll', onUserScroll, { passive: true })

    const scrollToTop = () => {
      if (userScrolledRef.current) return
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    scrollToTop()
    requestAnimationFrame(scrollToTop)

    const timers = SCROLL_RETRY_MS.map((ms) => window.setTimeout(scrollToTop, ms))

    return () => {
      window.removeEventListener('scroll', onUserScroll)
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [pathname])

  return null
}