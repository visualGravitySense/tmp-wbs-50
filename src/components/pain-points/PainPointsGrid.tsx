'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import { marketingInsetCardClass } from '@/components/ui'
import { cn } from '@/lib/utils'

/** Pain cards shown before progressive disclosure kicks in */
const INITIAL_VISIBLE_COUNT = 4

interface PainItem {
  title: string
  description: string
}

export interface PainSectionProps {
  eyebrow?: string
  heading?: string
  subheading?: string
  items?: PainItem[]
  bottomText?: string
  ctaText?: string
  ctaLink?: string
  contactModalTitle?: string
  contactModalDescription?: string
  contactModalSuccessTitle?: string
  contactModalSuccessText?: string
}

export default function PainPointsGrid({
  eyebrow = 'Kas tunned end ära?',
  heading = 'Probleemid, mis ei kao iseenesest',
  subheading,
  items = [],
}: PainSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasMore = items.length > INITIAL_VISIBLE_COUNT
  const hiddenCount = items.length - INITIAL_VISIBLE_COUNT
  const visibleItems = isExpanded ? items : items.slice(0, INITIAL_VISIBLE_COUNT)

  return (
    <>
      {/* Soft Radial Gradient Underlay */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.04)_0%,transparent_60%)]" />

      {/* Decorative Fine Grid */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center md:text-left">
        {/* Eyebrow */}
        {eyebrow && (
          <div className="flex mb-6 md:mb-8 justify-center md:justify-start">
            <EyebrowPillBadge text={eyebrow} centered={false} />
          </div>
        )}

        {/* Heading */}
        <h2 className="font-barlow mt-6 text-4xl font-[600] leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-6xl">
          {heading}
        </h2>

        {/* Subheading */}
        {subheading && (
          <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
            {subheading}
          </p>
        )}

        {/* Pain Cards Grid — progressively disclosed */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleItems.map((item, index) => {
            const num = String(index + 1).padStart(2, '0')
            return (
              <div key={index} className="group relative">
                <div className={`relative grid h-full w-full grid-cols-[64px_1fr] items-start overflow-hidden !p-7 !pb-8 !pr-8 ${marketingInsetCardClass}`}>
                  <div className="absolute bottom-8 left-0 top-8 w-[2px] rounded-r-full bg-rose-500 opacity-100 shadow-[0_0_12px_#f43f5e] dark:bg-rose-400 dark:shadow-[0_0_12px_#fb7185]" />

                  <span className="font-barlow pt-1.5 text-center text-[17px] font-[300] tracking-wide text-rose-500 dark:text-rose-400">
                    {num}
                  </span>

                  <div className="relative z-10 flex flex-col items-start">
                    <h3 className="text-[20px] font-[600] leading-snug text-slate-900 dark:text-[#f0f4ff]">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 pb-0.5 text-[15px] leading-relaxed text-slate-600 dark:text-[#8da0bc]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Show more / show less toggle */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-primary))]/80 px-6 py-3',
                'text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600 shadow-sm transition-all duration-300',
                'hover:-translate-y-0.5 hover:border-blue-300/60 hover:shadow-md',
                'dark:text-blue-400 dark:hover:border-blue-500/40',
              )}
            >
              {isExpanded
                ? 'NÄITA VÄHEM'
                : `NÄITA ROHKEM (+${hiddenCount})`}
              <ChevronDown
                className={cn('h-4 w-4 shrink-0 transition-transform duration-300', isExpanded && 'rotate-180')}
                aria-hidden
              />
            </button>
          </div>
        )}
      </div>
    </>
  )
}