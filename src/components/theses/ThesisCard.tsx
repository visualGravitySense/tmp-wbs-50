'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { Award, GraduationCap, Sparkles, TrendingUp } from 'lucide-react'
import { BrandVibrantButton } from '@/components/ui/BrandVibrantButton'
import { Button } from '@/components/ui'
import { marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Thesis } from '@/types/thesis'
import { thesisTypeLabel } from '@/types/thesis'

function MetaBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[10px] font-700 tracking-wider uppercase text-slate-600 dark:text-slate-400',
        marketingMicroPillClass,
        className,
      )}
    >
      {children}
    </span>
  )
}

interface ThesisCardProps {
  thesis: Thesis
  index?: number
}

export default function ThesisCard({ thesis, index = 0 }: ThesisCardProps) {
  const [abstractExpanded, setAbstractExpanded] = useState(false)
  const [mentorVisible, setMentorVisible] = useState(false)

  const abstract = thesis.abstract?.trim() || ''
  const hasSource = Boolean(thesis.sourceUrl?.trim())
  const hasMentor = Boolean(thesis.mentorComment?.trim())
  const categoryLabel = thesis.category?.trim().toUpperCase() || ''
  const achievement = thesis.achievement?.trim()
  const isFeatured = Boolean(achievement)

  return (
    <div className="relative min-w-0">
      <div
        className="pointer-events-none absolute -inset-3 rounded-[1.35rem] bg-[radial-gradient(ellipse_75%_60%_at_70%_0%,rgba(59,130,246,0.14),transparent_55%),radial-gradient(ellipse_55%_45%_at_10%_100%,rgba(16,185,129,0.1),transparent_50%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100 dark:bg-[radial-gradient(ellipse_75%_60%_at_70%_0%,rgba(59,130,246,0.2),transparent_52%),radial-gradient(ellipse_55%_45%_at_10%_100%,rgba(52,211,153,0.14),transparent_48%)] md:-inset-4"
        aria-hidden
      />

      <article
        className="group/card relative flex h-full flex-col transition-all duration-500 hover:-translate-y-1.5"
        style={{ transitionDelay: `${index * 45}ms` }}
      >
        <div
          className={cn(
            'relative flex h-full flex-col overflow-hidden !p-0 transition-all duration-500 group-hover/card:border-blue-400/45 group-hover/card:shadow-[0_28px_60px_-28px_rgba(37,99,235,0.28)] dark:group-hover/card:border-blue-500/35 dark:group-hover/card:shadow-[0_32px_70px_-32px_rgba(29,97,255,0.22)]',
            marketingInsetCardClass,
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.45)_0%,transparent_42%,rgba(59,130,246,0.05)_100%)] dark:bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,transparent_44%,rgba(16,185,129,0.07)_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90 dark:inset-x-5 dark:via-white/25"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-8 left-3 top-8 w-[3px] rounded-full bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-400 opacity-0 transition-opacity duration-500 group-hover/card:opacity-90"
            aria-hidden
          />

          {isFeatured ? (
            <div className="absolute right-4 top-4 z-20">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-amber-900 dark:text-amber-200',
                  'border border-amber-300/60 bg-gradient-to-r from-amber-50/95 to-amber-100/80 dark:border-amber-500/30 dark:from-amber-500/15 dark:to-amber-400/10',
                  marketingMicroPillClass,
                )}
              >
                <Award className="h-3 w-3" aria-hidden />
                Tunnustatud
              </span>
            </div>
          ) : null}

          <div className="relative border-b border-slate-200/70 bg-gradient-to-br from-white/85 via-slate-50/40 to-white/45 px-6 py-5 backdrop-blur-sm dark:border-white/[0.07] dark:from-white/[0.06] dark:via-black/15 dark:to-white/[0.03] sm:px-8 sm:py-6">
            <div className="flex items-start justify-between gap-3 pr-16">
              <MetaBadge className="tabular-nums">{thesis.year}</MetaBadge>
              {categoryLabel ? <MetaBadge>{categoryLabel}</MetaBadge> : null}
            </div>

            <h3 className="mt-5 text-xl font-700 leading-snug text-slate-900 transition-colors duration-300 group-hover/card:text-blue-800 dark:text-white dark:group-hover/card:text-blue-400">
              {thesis.title}
            </h3>

            <p className="mt-2 text-xs font-600 uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {thesisTypeLabel(thesis.type)}
            </p>

            {thesis.author?.trim() ? (
              <p className="mt-2 text-xs font-600 uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {thesis.author}
              </p>
            ) : null}
          </div>

          <div className="relative flex flex-1 flex-col px-6 py-5 sm:px-8 sm:py-6">
            {thesis.school?.trim() ? (
              <div className="mb-5 flex items-center gap-2.5">
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center',
                    marketingMicroPillClass,
                  )}
                >
                  <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden />
                </div>
                <span className="text-xs font-600 uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {thesis.school}
                </span>
              </div>
            ) : null}

            {thesis.keywords && thesis.keywords.length > 0 ? (
              <div className="mb-5 flex flex-wrap gap-1.5">
                {thesis.keywords.map((keyword) => (
                  <MetaBadge key={keyword}>{keyword}</MetaBadge>
                ))}
              </div>
            ) : null}

            {abstract ? (
              <div className="mb-6 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500/70 dark:text-blue-400/70" aria-hidden />
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[rgb(var(--text-secondary))]">
                    Annotatsioon
                  </p>
                </div>
                <p
                  className={cn(
                    'text-xs leading-relaxed text-[rgb(var(--text-secondary))]/90',
                    !abstractExpanded && 'line-clamp-3',
                  )}
                >
                  {abstract}
                </p>
                <button
                  type="button"
                  onClick={() => setAbstractExpanded((v) => !v)}
                  className="mt-3 inline-flex items-center gap-1 text-[10px] font-700 uppercase tracking-wider text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {abstractExpanded ? 'Näita vähem' : 'Loe edasi'}
                </button>
              </div>
            ) : (
              <div className="flex-1" />
            )}

            {mentorVisible && hasMentor ? (
              <div
                className={cn(
                  'mb-6 rounded-xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-indigo-50/40 p-4 text-xs leading-relaxed text-[rgb(var(--text-secondary))]',
                  'dark:border-blue-500/20 dark:from-blue-500/10 dark:to-indigo-500/5',
                )}
              >
                <p className="mb-1 text-[9px] font-black uppercase tracking-[0.22em] text-blue-700/80 dark:text-blue-300/80">
                  Juhendaja kommentaar
                </p>
                <p>{thesis.mentorComment}</p>
              </div>
            ) : null}

            {achievement ? (
              <div className="mt-auto border-t border-slate-200/80 pt-5 dark:border-white/[0.08]">
                <div
                  className={cn(
                    'rounded-xl p-4',
                    'border border-emerald-500/15 bg-gradient-to-br from-emerald-500/8 to-teal-500/5 text-emerald-950',
                    'shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-200/80 bg-emerald-50 shadow-sm dark:border-emerald-500/25 dark:bg-emerald-500/10">
                      <TrendingUp
                        className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1 text-[9px] font-black uppercase tracking-[0.22em] text-emerald-700/80 dark:text-emerald-400/80">
                        Tulemus:
                      </p>
                      <p className="text-[12px] font-medium leading-snug text-slate-800 dark:text-slate-200">
                        {achievement}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {(hasSource || hasMentor) && (
              <div
                className={cn(
                  'mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap',
                  !achievement && 'mt-auto border-t border-slate-200/80 pt-5 dark:border-white/[0.08]',
                )}
              >
                {hasSource ? (
                  <BrandVibrantButton
                    href={thesis.sourceUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="marketing"
                    className="w-full sm:w-auto"
                  >
                    Vaata allikat
                  </BrandVibrantButton>
                ) : null}
                {hasMentor ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setMentorVisible((v) => !v)}
                    className="h-12 min-w-[160px] rounded-full px-6 text-xs font-black uppercase tracking-widest md:h-14 md:min-w-[200px] md:px-8 md:text-sm"
                    aria-expanded={mentorVisible}
                  >
                    {mentorVisible ? 'Peida kommentaar' : 'Juhendaja kommentaar'}
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
