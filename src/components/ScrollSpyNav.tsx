'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type SpySection = { id: string; title: string }

function collectSections(): SpySection[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-section-title]'))
    .filter((el) => el.id)
    .map((el) => ({
      id: el.id,
      title: el.getAttribute('data-section-title') || '',
    }))
}

export default function ScrollSpyNav() {
  const pathname = usePathname()
  const [sections, setSections] = useState<SpySection[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | null = null
    let mutationObserver: MutationObserver | null = null
    let scanTimer: ReturnType<typeof setTimeout> | undefined

    const bindIntersectionObserver = (elements: HTMLElement[]) => {
      intersectionObserver?.disconnect()

      if (elements.length === 0) {
        setActiveId(null)
        return
      }

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

          if (visible.length > 0) {
            setActiveId(visible[0].target.id)
          }
        },
        {
          rootMargin: '-20% 0px -40% 0px',
          threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
        },
      )

      elements.forEach((el) => intersectionObserver?.observe(el))
      setActiveId(elements[0].id)
    }

    const scan = () => {
      const nextSections = collectSections()
      setSections(nextSections)
      bindIntersectionObserver(
        nextSections
          .map(({ id }) => document.getElementById(id))
          .filter((el): el is HTMLElement => Boolean(el)),
      )
    }

    const scheduleScan = () => {
      if (scanTimer) clearTimeout(scanTimer)
      scanTimer = setTimeout(scan, 120)
    }

    scan()

    mutationObserver = new MutationObserver(scheduleScan)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      if (scanTimer) clearTimeout(scanTimer)
      mutationObserver?.disconnect()
      intersectionObserver?.disconnect()
    }
  }, [pathname])

  if (sections.length === 0 || pathname.startsWith('/blog') || pathname.startsWith('/kliendid')) return null

  // Sit left of the window scrollbar so it is not mistaken for a second scroll track
  return (
    <nav className="fixed top-1/2 right-6 z-[90] hidden -translate-y-1/2 flex-col items-end gap-3 lg:right-8 lg:flex">
      {sections.map(({ id, title }, index) => {
        const isActive = activeId === id
        return (
          <button
            key={`${id}--${index}`}
            onClick={() => {
              const el = document.getElementById(id)
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top: y, behavior: 'smooth' })
              }
            }}
            className="group relative flex items-center justify-end p-1 focus:outline-none"
            aria-label={`Mine sektsiooni: ${title}`}
          >
            <span
              className="absolute right-6 whitespace-nowrap rounded-md bg-slate-900/90 px-2.5 py-1 text-xs font-bold tracking-wide text-white shadow-sm dark:bg-white/90 dark:text-slate-900 opacity-0 pointer-events-none transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:pointer-events-auto"
            >
              {title}
            </span>
            <div
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'scale-125 bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)] dark:bg-blue-400 dark:shadow-[0_0_12px_rgba(96,165,250,0.6)]'
                  : 'bg-slate-300/80 hover:scale-110 hover:bg-slate-400 dark:bg-slate-700/80 dark:hover:bg-slate-500'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
