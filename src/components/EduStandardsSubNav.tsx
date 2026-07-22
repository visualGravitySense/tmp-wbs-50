'use client'

import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  EDU_STANDARDS_SCROLL_OFFSET,
  EDU_STANDARDS_SECTIONS,
  type EduStandardsSectionId,
} from '@/lib/eduStandardsSections'

export default function EduStandardsSubNav() {
  const [activeSection, setActiveSection] = useState<EduStandardsSectionId>('standard')

  const scrollToSection = useCallback((id: EduStandardsSectionId) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - EDU_STANDARDS_SCROLL_OFFSET
    window.scrollTo({ top: y, behavior: 'smooth' })
    setActiveSection(id)
  }, [])

  useEffect(() => {
    const elements = EDU_STANDARDS_SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[]

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (!visible.length) return

        const best = visible.reduce((current, next) =>
          next.intersectionRatio > current.intersectionRatio ? next : current,
        )

        const id = best.target.id as EduStandardsSectionId
        if (EDU_STANDARDS_SECTIONS.some((section) => section.id === id)) {
          setActiveSection(id)
        }
      },
      {
        rootMargin: '-28% 0px -52% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav aria-label="Dokumendi peatükid" className="sticky top-16 z-40 mb-8 py-1">
      <div className="flex flex-wrap gap-2 overflow-x-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {EDU_STANDARDS_SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => {
                event.preventDefault()
                scrollToSection(id)
              }}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 sm:text-sm',
                isActive
                  ? 'bg-[#0055E5] text-white shadow-[0_4px_14px_rgba(0,85,229,0.35)]'
                  : 'border border-slate-200/80 bg-white/70 text-slate-600 shadow-sm backdrop-blur-sm hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white',
              )}
              aria-current={isActive ? 'true' : undefined}
            >
              {label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
