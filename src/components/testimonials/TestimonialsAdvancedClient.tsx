'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { Review } from '@/types/review'
import { Container, Section } from '@/components/ui'
import { cn } from '@/lib/utils'
import IndustryFilterPills from '@/components/filters/IndustryFilterPills'
import ClientLogosMarquee, { LogoItem } from './ClientLogosMarquee'

const TEXT_PREVIEW_LEN = 220
const REGISTRATION_HREF = '/koolitus'

const HABIT_TAGS = [
  'Reaktiivne → Ennetav',
  'Isikust sõltuv → Süsteem',
  'Mõõtmata → Mõõdetud',
] as const

function truncateAt(text: string, max: number) {
  if (text.length <= max) return text
  const slice = text.slice(0, max).trimEnd()
  return `${slice.endsWith('…') ? slice.slice(0, -1) : slice}…`
}

function authorInitials(author: string): string {
  const parts = author.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    const a = parts[0][0]
    const b = parts[parts.length - 1][0]
    if (a && b) return (a + b).toUpperCase()
  }
  return author.slice(0, 2).toUpperCase() || '?'
}

function splitLabel(label?: string): { role?: string; company?: string } {
  if (!label?.trim()) return {}
  const byComma = label.split(',').map((s) => s.trim())
  if (byComma.length >= 2) {
    return { role: byComma[0], company: byComma.slice(1).join(', ') }
  }
  return { role: label.trim() }
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.1l-3.6 1.9.7-4L2.2 5.2l4-.6z" />
    </svg>
  )
}

function StarsRow({ size = 'md', rating = 5 }: { size?: 'md' | 'sm'; rating?: number }) {
  const cls = size === 'sm' ? 'h-[11px] w-[11px]' : 'h-4 w-4'
  return (
    <div role="img" className="flex gap-0.5 text-amber-500" aria-label={`Hinnang: ${rating} viiest`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={cls} />
      ))}
    </div>
  )
}

function ReviewGridCard({
  review,
  index,
  identified,
}: {
  review: Review
  index: number
  identified: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const full = review.text
  const isLong = full.length > TEXT_PREVIEW_LEN
  const displayText = expanded || !isLong ? full : truncateAt(full, TEXT_PREVIEW_LEN)
  const { role, company } = splitLabel(review.label)
  const habit = HABIT_TAGS[index % HABIT_TAGS.length]

  return (
    <figure
      className={cn(
        'flex flex-col h-full rounded-[18px] border-[1.5px] border-[#E2E6EE] bg-white p-[22px] transition-all duration-200 dark:border-white/10 dark:bg-[rgb(var(--bg-primary))]',
        identified && 'border-2 border-[#0055E5] dark:border-sky-400',
      )}
    >
      <figcaption className="mb-3.5 flex items-center gap-2.5">
        <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] text-xs font-bold text-[#0055E5] dark:bg-sky-950/50 dark:text-sky-300">
          {authorInitials(review.author)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-[#0F1117] dark:text-[var(--text-primary)]">{review.author}</div>
          {role ? (
            <div className="text-xs text-[#6B7280] dark:text-[var(--text-secondary)]">{role}</div>
          ) : null}
          {company ? (
            <span className="mt-0.5 inline-block rounded bg-[#F3F4F6] px-[7px] py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#374151] dark:bg-white/10 dark:text-[var(--text-secondary)]">
              {company}
            </span>
          ) : null}
        </div>
      </figcaption>

      <div className="mb-2.5">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#0055E5] dark:text-sky-400">Tagasiside</div>
        <blockquote className="border-l-2 border-[#0055E5] pl-2.5 text-[13px] font-medium leading-[1.55] text-[#0F1117] dark:border-sky-400 dark:text-[var(--text-primary)]">
          <span className="whitespace-pre-wrap">&ldquo;{displayText}&rdquo;</span>
        </blockquote>
      </div>

      {isLong && !expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mb-2 self-start text-xs font-semibold text-[#0055E5] underline-offset-2 hover:underline dark:text-sky-300"
        >
          Loe edasi
        </button>
      ) : null}

      <div className="mt-auto border-t border-[#F3F4F6] pt-3.5 dark:border-white/10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FF] px-2.5 py-1 text-[11px] font-semibold text-[#0055E5] dark:bg-sky-950/40 dark:text-sky-300">
          {habit}
        </span>
      </div>
    </figure>
  )
}

export interface TestimonialQuizOption {
  label: string
  textDescription: string
  courseUrl?: string
  ctaText?: string
}

export interface TestimonialsPageSettings {
  pageTitle?: string
  eyebrow?: string
  statRating?: string
  statOee?: string
  statTimeframe?: string
  ctaRegisterText?: string
  quizTitle?: string
  quizSubtitle?: string
  quizTimeframeQuestion?: string
  quizQuestion?: string
  quizOptions?: TestimonialQuizOption[]
}

function buildIndustriesFromCounts(industryCounts: Record<string, number>): string[] {
  return ['Kõik', ...Object.keys(industryCounts).sort()]
}

export default function TestimonialsAdvancedClient({
  allReviews,
  totalCount,
  industryCounts = {},
  contentSettings,
  logos = [],
  skipHero = false,
}: {
  allReviews: Review[]
  totalCount: number
  industryCounts?: Record<string, number>
  contentSettings?: TestimonialsPageSettings
  logos?: LogoItem[]
  /** Hide built-in page title when Sanity page builder supplies marketingSplitHeroBlock. */
  skipHero?: boolean
}) {
  const [activeFilter, setActiveFilter] = useState('Kõik')

  const industries = useMemo(() => buildIndustriesFromCounts(industryCounts), [industryCounts])

  const displayedReviews = useMemo(() => {
    if (activeFilter === 'Kõik') return allReviews
    return allReviews.filter((review) => review.industry === activeFilter)
  }, [activeFilter, allReviews])

  const [activeQuizOptionIndex, setActiveQuizOptionIndex] = useState<number | null>(null)
  const [isQuizVisible, setIsQuizVisible] = useState(false)

  useEffect(() => {
    if (activeQuizOptionIndex !== null) {
      setIsQuizVisible(false)
      const t = setTimeout(() => setIsQuizVisible(true), 50)
      return () => clearTimeout(t)
    } else {
      setIsQuizVisible(false)
    }
  }, [activeQuizOptionIndex])

  // Default quiz options array to match the premium Estonian layout in the screenshot
  const defaultQuizOptions: TestimonialQuizOption[] = [
    {
      label: 'Tahan alustada esimesel võimalusel',
      textDescription: 'Suurepärane otsus. Tootmises loeb kiirus — iga viivitatud kuu tähendab raisatud tunde, madalamat OEE-d ja meeskonna ületunde. Järgmine intensiivne Tootmisjuhtimise arenguprogramm alustab peagi. See on praktiline, tehasepõrandale suunatud kursus, kus paneme Sinu tootmise süsteemselt tööle ja vabastame Sind "tulekahjude kustutamisest". Kohad täituvad kiiresti.',
      courseUrl: '/koolitus',
      ctaText: 'Broneeri koht arenguprogrammis →'
    },
    {
      label: 'Vajame meeskonnakoolitust või tehase auditit',
      textDescription: 'Kui soovite kaasata terve meeskonna või tuvastada konkreetsed raiskamiskohad enne tegevuste alustamist, on parim lahendus rätsepatööna valmiv sisekoolitus või tehase protsesside audit. Aitame kaardistada kitsaskohad ja koostada täpse tegevuskava.',
      courseUrl: '/kontakt',
      ctaText: 'Küsi pakkumist või auditit →'
    },
    {
      label: 'Mul pole praegu aega / Soovin enne tulemusi näha',
      textDescription: 'Mõistame täielikult. Tootmises on tihti kiire ja parendusteks aja leidmine tundub võimatu. Alustuseks soovitame lugeda meie blogiartikleid või tutvuda kasulike materjalidega, mis aitavad esimesi väikseid parendusi teha ilma suure ajakuluta.',
      courseUrl: '/blog',
      ctaText: 'Loe kasulikke artikleid →'
    }
  ]

  const currentQuizOptions = contentSettings?.quizOptions && contentSettings.quizOptions.length > 0 
    ? contentSettings.quizOptions 
    : defaultQuizOptions

  const selectedQuizData = activeQuizOptionIndex !== null ? currentQuizOptions[activeQuizOptionIndex] : null

  return (
    <Section
      variant="minimal"
      className={cn(
        'bg-[#F7F8FA] font-sans dark:bg-[rgb(var(--bg-secondary))]',
        skipHero ? 'pb-12 pt-8 md:pb-[72px] md:pt-10' : 'min-h-screen py-12 md:py-[72px]',
      )}
    >
      <Container size="6xl" padding="none" elevated className="px-6 md:px-12">
        {!skipHero ? (
          <>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0055E5] dark:text-sky-400">
              {contentSettings?.eyebrow || 'Tagasiside'}
            </p>
            <h1 className="mb-6 text-3xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
              {(() => {
                const rawTitle = contentSettings?.pageTitle || 'Mis räägivad, lõpetajad?';
                const trimmed = rawTitle.trim();
                const commaIndex = trimmed.indexOf(',');
                let main = trimmed;
                let accent = '';
                if (commaIndex >= 0) {
                  main = trimmed.slice(0, commaIndex).trim();
                  accent = trimmed.slice(commaIndex + 1).trim();
                }
                return (
                  <>
                    <span className="block">{main}</span>
                    {accent ? (
                      <span className="block mt-2 font-serif font-normal italic text-[#0055E5] dark:text-sky-400 normal-case tracking-normal text-2xl sm:text-3xl lg:text-4xl">
                        {accent}
                      </span>
                    ) : null}
                  </>
                );
              })()}
            </h1>
          </>
        ) : null}

        <div className="mb-5 flex flex-wrap items-center gap-5 rounded-[14px] border border-[#E2E6EE] bg-white px-5 py-3.5 text-sm dark:border-white/10 dark:bg-[rgb(var(--bg-primary))]">
          <StarsRow />
          <span className="text-[15px] font-bold text-[#0F1117] dark:text-[var(--text-primary)]">
            {contentSettings?.statRating || '4.9/5'}
          </span>
          <div className="hidden h-5 w-px bg-[#E2E6EE] sm:block dark:bg-white/10" aria-hidden />
          <span className="text-[#4A4F5C] dark:text-[var(--text-secondary)]">
            <strong className="text-[#0F1117] dark:text-[var(--text-primary)]">{totalCount}</strong> lõpetaja
            {totalCount === 1 ? '' : 't'}
          </span>
          <div className="hidden h-5 w-px bg-[#E2E6EE] md:block dark:bg-white/10" aria-hidden />
          <span className="text-[#4A4F5C] dark:text-[var(--text-secondary)]">
            Keskmine kasv: <strong className="text-[#0055E5] dark:text-sky-400">{contentSettings?.statOee || '+31% OEE'}</strong>
          </span>
          <div className="hidden h-5 w-px bg-[#E2E6EE] lg:block dark:bg-white/10" aria-hidden />
          <span className="text-[#4A4F5C] dark:text-[var(--text-secondary)]">
            Esimene muutus: <strong className="text-[#0055E5] dark:text-sky-400">{contentSettings?.statTimeframe || '~14 päeva'}</strong>
          </span>
          <Link
            href={REGISTRATION_HREF}
            className="ml-auto text-[13px] font-semibold whitespace-nowrap text-[#0055E5] hover:underline dark:text-sky-300"
          >
            {contentSettings?.ctaRegisterText || 'See piisab — registreeru →'}
          </Link>
        </div>

        <ClientLogosMarquee logos={logos} />

        <IndustryFilterPills
          industries={industries}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          getCount={(industry) =>
            industry === 'Kõik' ? totalCount : industryCounts[industry]
          }
        />

        {totalCount === 0 ? (
          <p className="rounded-2xl border border-[#E2E6EE] bg-white p-8 text-center text-[#4A4F5C] dark:border-white/10 dark:bg-[rgb(var(--bg-primary))] dark:text-[var(--text-secondary)]">
            Tagasisideid pole veel lisatud.
          </p>
        ) : null}

        {totalCount > 0 && displayedReviews.length === 0 ? (
          <p className="rounded-2xl border border-[#E2E6EE] bg-white p-8 text-center text-[#4A4F5C] dark:border-white/10 dark:bg-[rgb(var(--bg-primary))] dark:text-[var(--text-secondary)]">
            Selles valdkonnas pole hetkel tagasisideid kuvada.
          </p>
        ) : null}

        {displayedReviews.length > 0 ? (
          <div
            key={activeFilter}
            className="mb-6 grid grid-cols-1 items-stretch gap-4 transition-opacity duration-300 md:grid-cols-2 lg:grid-cols-3"
          >
            {displayedReviews.map((review, index) => (
              <ReviewGridCard
                key={review.id ?? `r-${index}-${review.author}`}
                review={review}
                index={index}
                identified={false}
              />
            ))}
          </div>
        ) : null}

        {currentQuizOptions.length > 0 ? (
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:bg-slate-900/40 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-none p-6 md:p-10 rounded-[24px]">
            <h2 className="text-xl md:text-2xl font-800 tracking-tight text-slate-900 dark:text-white text-center">
              {contentSettings?.quizTitle || 'Leidke oma tehasele kõige täpsem lahendus'}
            </h2>
            <p className="text-xs md:text-sm font-500 text-slate-500 dark:text-slate-400 mt-1.5 text-center">
              {contentSettings?.quizSubtitle || 'Valige oma praegune situatsioon või eesmärk — näitame teile järgmist loogilist sammu:'}
            </p>
            
            <div className="mt-6 border-t border-slate-200/60 pt-6 dark:border-white/5">
              <p className="text-sm font-700 uppercase tracking-wider text-[#0055E5] dark:text-sky-400 text-center mt-6 mb-5">
                {contentSettings?.quizTimeframeQuestion || contentSettings?.quizQuestion || 'Millal te olete valmis oma tootmise süsteemseks muutuseks?'}
              </p>
              
              <div className="mb-6 flex flex-wrap justify-center gap-2.5">
                {currentQuizOptions.map((option, idx) => (
                  <button
                    key={`quiz-opt-${idx}`}
                    type="button"
                    onClick={() => setActiveQuizOptionIndex(idx)}
                    className={cn(
                      'rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 cursor-pointer shadow-sm',
                      activeQuizOptionIndex === idx
                        ? 'border-[#0055E5] bg-[#0055E5] text-white shadow-[0_4px_12px_rgba(0,85,229,0.15)] dark:bg-sky-500 dark:text-slate-950 dark:border-sky-400'
                        : 'bg-slate-50 border border-slate-200/60 dark:bg-white/5 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:border-[#0055E5] dark:hover:border-sky-400',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {selectedQuizData ? (
                <div 
                  className={cn(
                    "text-center mt-6 p-6 rounded-xl border-l-[4px] border-[#0055E5] dark:border-sky-400 transition-all transform",
                    "bg-gradient-to-br from-slate-100/80 to-white/60 border border-slate-200/50 shadow-[inner_0_1px_2px_rgba(255,255,255,0.6)] dark:from-sky-950/20 dark:to-slate-900/40 dark:border-sky-500/10",
                    isQuizVisible 
                      ? "opacity-100 translate-y-0 scale-100 duration-300 ease-out" 
                      : "opacity-0 translate-y-2 scale-[0.99] duration-150"
                  )}
                >
                  <p className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
                    {selectedQuizData.textDescription}
                  </p>
                  
                  {selectedQuizData.courseUrl ? (
                    <div className="mt-5 flex justify-center">
                      <Link
                        href={selectedQuizData.courseUrl}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-[#0055E5] px-6 text-sm font-bold text-white shadow-md transition-all hover:bg-opacity-90 hover:scale-[1.01] active:scale-[0.99] dark:bg-sky-500 dark:text-slate-950 w-full max-w-md"
                      >
                        {selectedQuizData.ctaText || 'Uuri lähemalt →'}
                      </Link>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
