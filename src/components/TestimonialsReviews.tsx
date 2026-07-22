'use client'

import { useRef, useState, useEffect } from 'react'
import type { Review } from '@/types/review'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react'
import { BrandVibrantButton, MarketingContainer, Section, marketingInsetCardClass } from '@/components/ui'
import TestimonialReviewCard from './TestimonialReviewCard'

export type { Review } from '@/types/review'

type TestimonialsReviewsProps = {
  reviews: Review[]
  /** Defaults to `/testimonials`. */
  seeAllHref?: string
  /** When set, only this many cards are shown; link “Vaata kõik” still opens the full archive. */
  previewLimit?: number
}

export default function TestimonialsReviews({
  reviews,
  seeAllHref = '/testimonials',
  previewLimit,
}: TestimonialsReviewsProps) {
  const visible =
    typeof previewLimit === 'number' && previewLimit > 0
      ? reviews.slice(0, previewLimit)
      : reviews

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const ticking = useRef(false)

  const checkScroll = () => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
          setCanScrollLeft(scrollLeft > 0)
          setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth)
        }
        ticking.current = false
      })
      ticking.current = true
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [visible])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current
      // Scroll by exactly one "page" (the visible width)
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <Section variant="band" className="relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 dark:bg-amber-500/3 blur-[150px] rounded-full -z-10 select-none pointer-events-none" />

      <MarketingContainer elevated>
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 flex justify-center">
            <EyebrowPillBadge text="Tagasiside" showDots />
          </div>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl">
            Kliendid räägivad
          </h2>
        </div>

        {visible.length === 0 ? (
          <div className={`mx-auto max-w-xl flex flex-col items-center justify-center px-8 py-12 text-center ${marketingInsetCardClass}`}>
            <p className="text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Ühtegi arvustust pole veel.
            </p>
          </div>
        ) : (
          <div className="relative">
            <div 
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex min-w-0 flex-nowrap overflow-x-auto gap-6 pb-4 pt-12 scrollbar-none snap-x snap-mandatory touch-auto md:gap-6 md:pt-10"
            >
              {visible.map((review, i) => (
                <div 
                  key={review.id ?? `${review.author}-${i}`}
                  className="shrink-0 w-[calc(100%-2rem)] snap-center snap-always md:w-[calc(33.333%-1rem)]"
                >
                  <TestimonialReviewCard
                    review={review}
                    index={i}
                  />
                </div>
              ))}
            </div>

            {/* Desktop Navigation Arrows */}
            {visible.length > 3 && (
              <div className="hidden md:flex justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  aria-label="Eelmine"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  aria-label="Järgmine"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}

            <div className="mt-12 flex flex-col items-center">
              <BrandVibrantButton
                href={seeAllHref}
                variant="marketing"
                className="group"
                icon={MessageSquare}
              >
                Kõik arvustused
              </BrandVibrantButton>
            </div>
          </div>
        )}
      </MarketingContainer>
    </Section>
  )
}
