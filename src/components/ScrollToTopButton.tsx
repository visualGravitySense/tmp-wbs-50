'use client'

import { ArrowUp } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const SCROLL_SHOW_RATIO = 1 / 3

function useScrollPastPageThird() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let maxScroll = 0
    
    const onResize = () => {
      maxScroll = document.documentElement.scrollHeight - window.innerHeight
    }
    
    const update = () => {
      if (maxScroll <= 80) {
        setVisible(false)
        return
      }
      setVisible(window.scrollY >= maxScroll * SCROLL_SHOW_RATIO)
    }

    onResize()
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', () => { onResize(); update(); }, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return visible
}

export default function ScrollToTopButton() {
  const visible = useScrollPastPageThird()

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <button
      type="button"
      onClick={scrollToTop}
      data-visible={visible}
      className="scroll-to-top-btn pointer-events-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-blue-600 shadow-[0_8px_30px_-12px_rgba(37,99,235,0.45)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_12px_36px_-10px_rgba(37,99,235,0.5)] hover:scale-[1.03] active:scale-[0.97] dark:border-white/12 dark:bg-white/[0.08] dark:text-blue-300 dark:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.75)] data-[visible=false]:pointer-events-none data-[visible=false]:opacity-0 data-[visible=true]:opacity-100"
      style={{ transitionProperty: 'opacity, transform, box-shadow' }}
      aria-label="Liigu lehe algusesse"
      title="Üles"
    >
      <span className="absolute inset-0 rounded-full ring-1 ring-blue-500/10 dark:ring-blue-400/15" />
      <ArrowUp className="relative h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
    </button>
  )
}
