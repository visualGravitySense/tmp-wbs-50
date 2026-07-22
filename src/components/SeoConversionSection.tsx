'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import {
  MarketingContainer,
  marketingInsetCardClass,
  marketingMicroPillClass,
  marketingPanelClass,
  Section,
} from '@/components/ui'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'

export type SeoConversionTerm = {
  termId: string
  title: string
  subtitle: string
  description: string
}

export type SeoConversionSectionData = {
  enabled?: boolean | null
  anchorId?: string | null
  eyebrow?: string | null
  title?: string | null
  intro?: string | null
  terms?: SeoConversionTerm[] | null
}

const DEFAULT_TERMS: SeoConversionTerm[] = [
  {
    termId: 'lean',
    title: 'LEAN',
    subtitle: 'Kulusäästlik mõtlemine',
    description:
      'Meetodid, mis aitavad leida ja eemaldada tootmisprotsessist raiskamised, säästes aega ja raha. See ei ole kokkuhoid, vaid väärtuse loomine ilma kadudeta.',
  },
  {
    termId: 'tps',
    title: 'TPS',
    subtitle: 'Toyota Tootmissüsteem',
    description:
      'Algupärane efektiivsuse filosoofia, mis keskendub optimaalsele töövoole ja vigade ennetamisele. See on kultuur, kus iga töötaja aitab süsteemi paremaks muuta.',
  },
  {
    termId: 'vsm',
    title: 'VSM',
    subtitle: 'Väärtusahela kaardistamine',
    description:
      'Visuaalne tööriist, mis näitab täpselt, kus tekib toote väärtus ja kus on peidus takistused. See on kui röntgenülesvõte sinu tootmisprotsessist.',
  },
]

const DEFAULT_INTRO =
  'Lühidalt ja selgelt: mida tähendavad kõige sagedamini kasutatavad mõisted tootmisjuhtimises — hea nii otsingumootoritele kui ka külastajale, kes otsustab, kas koolitus on talle õige.'

function normalizeTerms(raw: SeoConversionSectionData['terms']): SeoConversionTerm[] {
  const base = !raw?.length
    ? DEFAULT_TERMS
    : raw.filter((t): t is SeoConversionTerm =>
        Boolean(t?.termId && t?.title && t?.subtitle && t?.description),
      )

  if (!base.length) return DEFAULT_TERMS

  const seen = new Map<string, number>()
  return base.map((term) => {
    const slug = term.termId.trim()
    const count = seen.get(slug) ?? 0
    seen.set(slug, count + 1)
    if (count === 0) return { ...term, termId: slug }
    return { ...term, termId: `${slug}-${count + 1}` }
  })
}

type SeoConversionSectionProps = {
  data?: SeoConversionSectionData | null
}

/**
 * SEO + conversion block after hero: glossary-style terms with expandable copy.
 * Content is driven by `mainPage.seoConversionSection` in Sanity (fallbacks match `doc/buttons-conversion.tsx`).
 */
export default function SeoConversionSection({ data }: SeoConversionSectionProps) {
  const sectionId = useId()
  const headingId = `${sectionId}-heading`

  const enabled = data?.enabled !== false

  const terms = useMemo(() => normalizeTerms(data?.terms ?? null), [data?.terms])

  const [activeTermId, setActiveTermId] = useState(() => terms[0]?.termId ?? 'lean')

  useEffect(() => {
    if (!terms.some((t) => t.termId === activeTermId)) {
      setActiveTermId(terms[0]?.termId ?? 'lean')
    }
  }, [terms, activeTermId])

  if (!enabled) return null

  const anchorId = (data?.anchorId || 'tootmisjuhtimise-sonastik').trim() || 'tootmisjuhtimise-sonastik'
  const eyebrow = data?.eyebrow?.trim() || 'Sõnastik'
  const title = data?.title?.trim() || 'Põhimõisted'
  const intro = data?.intro?.trim() || DEFAULT_INTRO

  const tablistLabel = title

  const tabBtnBase =
    `group relative w-full overflow-hidden px-4 py-3.5 text-left transition-all duration-300 sm:px-5 sm:py-4 ${marketingMicroPillClass}`
  const tabBtnInactive =
    'hover:border-slate-300 hover:bg-slate-50/80 dark:hover:border-white/20 dark:hover:bg-white/[0.08]'
  const tabBtnActive =
    'border-slate-700/90 bg-sky-50 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)] dark:border-slate-200/25 dark:bg-blue-500/15 dark:shadow-none'

  const tabLabelActive =
    'text-slate-900 dark:text-[rgb(var(--text-primary))]'
  const tabLabelInactive =
    'text-slate-700 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200'

  return (
    <Section id={anchorId} variant="band" className="seo-conversion-section text-slate-800 dark:text-slate-200" aria-labelledby={headingId}>
      <div
        className="seo-conversion-top-glow pointer-events-none absolute left-1/2 top-0 h-[160px] w-[min(100%,28rem)] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-[72px] dark:bg-blue-500/[0.08] transform-gpu"
        aria-hidden
      />

      <MarketingContainer elevated>
        <div className={marketingPanelClass}>
        <header className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <div className="mb-3 flex justify-center">
            <EyebrowPillBadge text={eyebrow} />
          </div>
          <h2
            id={headingId}
            className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-[rgb(var(--text-primary))]"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-[rgb(var(--text-secondary))]">
              {intro}
            </p>
          ) : null}
        </header>

        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-stretch">
          <div className="mx-auto w-full max-w-[13rem] shrink-0 lg:mx-0 lg:w-[12rem] lg:max-w-[12rem]">
            <div className="flex flex-col gap-2" role="tablist" aria-label={tablistLabel}>
              {terms.map((term, index) => {
                const selected = activeTermId === term.termId
                return (
                  <button
                    key={`${term.termId}-${index}`}
                    type="button"
                    role="tab"
                    id={`tab-${term.termId}`}
                    aria-selected={selected}
                    aria-controls={term.termId}
                    onClick={() => setActiveTermId(term.termId)}
                    className={`${tabBtnBase} ${selected ? tabBtnActive : tabBtnInactive}`}
                  >
                    <span
                      className={`text-base font-black uppercase italic tracking-tight transition-colors sm:text-lg ${
                        selected ? tabLabelActive : tabLabelInactive
                      }`}
                    >
                      {term.title}
                    </span>
                    {selected ? (
                      <span
                        className="seo-conversion-tab-dot absolute top-1/2 right-3.5 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-600 sm:right-4 dark:bg-[rgb(var(--color-primary))]"
                        aria-hidden
                      />
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="min-h-0 w-full min-w-0 flex-1">
            <div className={`${marketingInsetCardClass} flex min-h-0 flex-col justify-center`}>
              <div
                className="seo-conversion-card-glow pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-sky-200/40 blur-[48px] dark:bg-blue-600/20 transform-gpu"
                aria-hidden
              />

              {terms.map((term, index) => {
                const visible = activeTermId === term.termId
                return (
                  <article
                    key={`${term.termId}-${index}`}
                    id={term.termId}
                    role="tabpanel"
                    aria-labelledby={`tab-${term.termId}`}
                    hidden={!visible}
                    className={
                      visible
                        ? 'relative text-left opacity-100 transition-all duration-500 ease-in-out'
                        : 'sr-only'
                    }
                  >
                    <h3 className="seo-conversion-term-subtitle mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-blue-700 dark:text-blue-400 sm:tracking-[0.35em] dark:text-[rgb(var(--color-primary))]">
                      {term.subtitle}
                    </h3>
                    <p className="text-base font-medium leading-relaxed text-slate-800 italic sm:text-lg md:text-xl dark:text-[rgb(var(--text-primary))] dark:opacity-95">
                      {term.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
        </div>
      </MarketingContainer>
    </Section>
  )
}
