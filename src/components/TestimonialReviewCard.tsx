'use client'

import { useCallback, useState } from 'react'
import { marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { renderTextWithLinks } from '@/lib/linkify'

const TEXT_PREVIEW_LEN = 200

function truncateAt(text: string, max: number) {
  if (text.length <= max) return text
  const slice = text.slice(0, max).trimEnd()
  return `${slice.endsWith('…') ? slice.slice(0, -1) : slice}…`
}

const HABIT_TAGS = [
  'Reaktiivne — Ennetav',
  'Isikust sõltuv — Süsteem',
  'Mõõtmata — Mõõdetud',
] as const

function authorInitials(author: string): string {
  const parts = author.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    const a = parts[0][0]
    const b = parts[parts.length - 1][0]
    if (a && b) return (a + b).toUpperCase()
  }
  return author.slice(0, 2).toUpperCase() || '?'
}

export default function TestimonialReviewCard({ review, index }: { review: any; index: number }) {
  const [expanded, setExpanded] = useState(false)
  
  const authorName = review.name ?? review.author ?? ''
  const rawRole = review.role ?? review.label ?? ''
  const company = review.company ?? ''
  const fullText = review.text ?? review.content ?? ''
  const tags = review.tags ?? []

  const roleDisplay = company 
    ? `${rawRole}${rawRole ? ', ' : ''}${company}`
    : rawRole

  const isLong = fullText.length > TEXT_PREVIEW_LEN
  const displayText = expanded || !isLong ? fullText : truncateAt(fullText, TEXT_PREVIEW_LEN)

  const onReadMore = useCallback(() => setExpanded(true), [])
  const initials = authorInitials(authorName)
  const habit = tags.length > 0 ? tags[0] : HABIT_TAGS[index % HABIT_TAGS.length]

  return (
    <figure className={`testimonial-card group relative flex min-h-[280px] flex-col !overflow-visible pt-10 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 dark:hover:border-blue-500/20 ${marketingInsetCardClass}`}>
      <div className="testimonial-avatar-wrapper absolute -top-6 left-1/2 -translate-x-1/2 z-10">
        <div 
          aria-hidden="true" 
          className="testimonial-avatar flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-2 border-white dark:border-slate-900 shadow-md transition-transform duration-500 group-hover:scale-110"
        >
          {initials}
        </div>
      </div>

      <div className="mt-4 flex-grow flex flex-col relative">
        <span className="testimonial-quote-icon text-3xl font-serif text-slate-300 dark:text-slate-800 leading-none select-none transition-colors duration-300">
          &ldquo;
        </span>
        
        <blockquote className="testimonial-quote my-2 text-[14px] md:text-[15px] font-medium italic leading-relaxed text-slate-700 dark:text-slate-300 flex-grow">
          <span className="whitespace-pre-wrap">{renderTextWithLinks(displayText)}</span>
        </blockquote>

        {isLong && !expanded ? (
          <button
            type="button"
            onClick={onReadMore}
            className="mt-1 self-start text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Loe edasi
          </button>
        ) : null}

        <span className="testimonial-quote-icon text-3xl font-serif text-slate-300 dark:text-slate-800 leading-none select-none text-right block transition-colors duration-300">
          &rdquo;
        </span>
      </div>

      <div className="testimonial-author mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
        <div className="testimonial-author-name text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
          &mdash; {authorName}
        </div>
        {roleDisplay ? (
          <div className="testimonial-author-role text-[9px] uppercase tracking-widest text-slate-500 dark:text-gray-500 mt-1 truncate">
            {roleDisplay}
          </div>
        ) : null}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-50 dark:border-white/5">
        <span className={`testimonial-tag px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 ${marketingMicroPillClass}`}>
          {habit}
        </span>
      </div>
    </figure>
  )
}
