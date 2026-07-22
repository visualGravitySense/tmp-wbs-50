'use client'

import type { ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { MarketingContainer, Section, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import { cn } from '@/lib/utils'

export type AboutQuoteItem = {
  quote: string
  author: string
}

export type AboutQuoteSectionData = {
  eyebrow: string
  cardLabel?: string
  quotes: AboutQuoteItem[]
  backgroundColor?: 'gray' | 'blue' | 'white' | 'purple'
}

type AboutQuoteCarouselProps = {
  data: AboutQuoteSectionData
}

export default function AboutQuoteCarousel({ data }: AboutQuoteCarouselProps) {
  const { eyebrow, cardLabel, quotes } = data
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const count = quotes.length

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return
      setActiveIndex(((index % count) + count) % count)
    },
    [count],
  )

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (count === 0 ? 0 : (prev + 1) % count))
  }, [count])

  useEffect(() => {
    setActiveIndex(0)
  }, [count])

  useEffect(() => {
    setProgress(0)
  }, [activeIndex, isPaused])

  useEffect(() => {
    if (count <= 1 || isPaused) return

    const intervalTime = 100 // Tick every 100ms
    const totalDuration = 6000
    const increment = (intervalTime / totalDuration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + increment
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [count, isPaused, nextSlide])

  if (count === 0) return null

  const active = quotes[activeIndex]

  return (
    <Section variant="band" className="relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[120px]" />

      <MarketingContainer elevated className="relative z-10">
        <div className="mx-auto w-full">
          <EyebrowPillBadge text={eyebrow} centered />

          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`relative mx-auto w-full !p-12 md:!p-16 ${marketingInsetCardClass}`}
          >
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/85 to-transparent dark:via-blue-100/25" />

              {cardLabel ? (
                <div className="relative z-10 mb-8 flex justify-start">
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] text-slate-800 dark:text-slate-300 ${marketingMicroPillClass}`}>
                    {cardLabel}
                  </span>
                </div>
              ) : null}

              <div className="pointer-events-none absolute left-8 top-6 font-serif text-7xl leading-none text-blue-500/20 transition-colors dark:text-blue-400/15" aria-hidden>
                “
              </div>

              <div
                key={activeIndex}
                className="relative z-10 text-center animate-in fade-in duration-500"
              >
                <blockquote className="mb-10 text-2xl font-black italic leading-[1.1] tracking-tighter text-[rgb(var(--text-primary))] md:text-4xl">
                  {active.quote}
                </blockquote>

                <div className="flex items-center justify-center space-x-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                  <cite className="whitespace-nowrap text-sm font-black not-italic tracking-[0.2em] text-blue-600 dark:text-blue-300">
                    — {active.author}
                  </cite>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-6 right-8 font-serif text-7xl leading-none text-blue-500/20 transition-colors dark:text-blue-400/15" aria-hidden>
                ”
              </div>
            </div>
          </div>

          {count > 1 ? (
            <div className="mt-10 flex justify-center items-center gap-3" role="tablist" aria-label="Tsitaadid">
              {quotes.map((_, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Tsitaat ${index + 1}`}
                    onClick={() => goTo(index)}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300 relative',
                      isActive
                        ? 'w-16 bg-slate-200 dark:bg-white/10 overflow-hidden'
                        : 'w-1.5 bg-blue-600/25 hover:bg-blue-600/50'
                    )}
                  >
                    {isActive && (
                      <div
                        className="absolute left-0 top-0 h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] transition-all ease-linear duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="mt-10 flex justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
            </div>
          )}
        </div>
      </MarketingContainer>
    </Section>
  )
}
