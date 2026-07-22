import { marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import {
  resolveOpstarComparisonData,
  type OpstarComparisonData,
} from '@/lib/opstar/comparisonDefaults'
import React from 'react'
import type { PartnerLogo } from '@/types/partner'
import { partnerInitials } from '@/lib/partnerInitials'

interface ComparisonItem {
  isNot: string
  is: string
}

/** Matches marquee partner order on the main page when sourced from `mainPage.partners`. */
const PARTNER_INITIAL_GRADIENTS = [
  'from-slate-500 to-slate-700',
  'from-blue-600 to-indigo-700',
  'from-cyan-600 to-blue-700',
  'from-indigo-500 to-violet-600',
] as const

const MAX_PARTNER_INITIALS_VISIBLE = 4

export interface OpstarProfitComparisonProps {
  comparisonData: Partial<OpstarComparisonData> | null | undefined
  /** Home LogoMarquee list (`mainPage.partners`), optional */
  partners?: PartnerLogo[]
  className?: string
}

export default function ComparisonOpstarProfit({ 
  comparisonData, 
  partners,
  className = '' 
}: OpstarProfitComparisonProps) {
  const {
    title,
    subtitle,
    eyebrow,
    comparisonItems,
  } = resolveOpstarComparisonData(comparisonData)

  const sortedPartners = [...(partners ?? [])].sort(
    (a, b) =>
      (a.order ?? 9999) - (b.order ?? 9999) ||
      a.name.localeCompare(b.name, 'et', { sensitivity: 'base' })
  )
  const visiblePartners = sortedPartners.slice(0, MAX_PARTNER_INITIALS_VISIBLE)
  const overflowPartnerCount = Math.max(0, sortedPartners.length - MAX_PARTNER_INITIALS_VISIBLE)

  return (
    <div className={`relative w-full ${className}`}>
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 origin-top -skew-x-12 bg-blue-600/[0.02]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header - Minimalist & Bold */}
        <div className="mb-8 text-center sm:mb-10">
          {eyebrow && (
            <EyebrowPillBadge 
              text={eyebrow} 
              centered 
              wrapperClassName="mb-4"
            />
          )}
          <h2 className="mb-2 text-3xl font-black leading-[1.05] tracking-tighter text-[rgb(var(--text-primary))] sm:mb-3 sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-sm font-medium tracking-wide text-slate-600 opacity-90 dark:text-slate-400 dark:opacity-80 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* Comparison Structure — premium glass stack */}
        <div className="relative mx-auto w-full">
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_85%_70%_at_50%_-10%,rgba(59,130,246,0.16),transparent_55%),radial-gradient(ellipse_60%_45%_at_100%_50%,rgba(6,182,212,0.1),transparent_50%)] blur-2xl dark:bg-[radial-gradient(ellipse_85%_70%_at_50%_-10%,rgba(59,130,246,0.28),transparent_55%),radial-gradient(ellipse_55%_40%_at_100%_40%,rgba(34,211,238,0.12),transparent_48%)] sm:-inset-8"
            aria-hidden
          />

          {/* Legend / Headers */}
          <div className="relative mb-2 hidden grid-cols-2 px-3 sm:mb-3 sm:px-5 md:grid md:px-6">
            <div className="text-[9px] font-black uppercase tracking-[0.28em] text-red-600/80 drop-shadow-[0_1px_0_rgba(255,255,255,0.5)] dark:text-red-400/60 dark:drop-shadow-none sm:text-[10px] sm:tracking-[0.35em]">
              ✕ Mitte see
            </div>
            <div className="border-l border-slate-300/70 pl-3 text-[9px] font-black uppercase tracking-[0.28em] text-blue-700 drop-shadow-[0_1px_0_rgba(255,255,255,0.45)] dark:border-white/15 dark:text-blue-400 dark:drop-shadow-none sm:pl-4 sm:text-[10px] sm:tracking-[0.35em]">
              ✓ Vaid see
            </div>
          </div>

          <div className={`${marketingInsetCardClass} !p-0`}>
            <div className="relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.52)_0%,transparent_42%,rgba(59,130,246,0.06)_100%)] opacity-90 dark:bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,transparent_45%,rgba(37,99,235,0.12)_100%)] dark:opacity-100"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-[0.85] dark:inset-x-8 dark:via-white/35"
                aria-hidden
              />

              {comparisonItems.map((item, index) => (
                <div
                  key={index}
                  className="group relative grid grid-cols-1 border-b border-slate-200/60 transition-[background,box-shadow] duration-500 last:border-b-0 md:grid-cols-2 dark:border-white/[0.07]"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-white/12"
                    aria-hidden
                  />

                  {/* Left — muted frosted pane */}
                  <div className="relative flex flex-col items-start overflow-hidden bg-gradient-to-br from-slate-100/25 via-white/10 to-slate-100/20 p-4 backdrop-blur-md transition-[background,box-shadow] duration-500 group-hover:from-slate-100/40 group-hover:via-white/20 group-hover:shadow-[inset_0_0_24px_-8px_rgba(15,23,42,0.06)] sm:p-5 md:flex-row md:items-center md:p-6 dark:from-black/15 dark:via-white/[0.02] dark:to-black/10 dark:group-hover:from-black/25 dark:group-hover:via-white/[0.04]">
                    <span className="mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-red-600/80 md:hidden dark:text-red-400/60">✕ Mitte see</span>
                    <div
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_0%_50%,rgba(148,163,184,0.06),transparent_55%)] opacity-70 dark:bg-[radial-gradient(ellipse_120%_80%_at_0%_50%,rgba(255,255,255,0.02),transparent_55%)]"
                      aria-hidden
                    />
                    <p className="relative text-[13px] font-medium italic leading-snug text-slate-600 transition-colors group-hover:text-slate-800 md:text-sm dark:text-slate-400 dark:group-hover:text-slate-300">
                      {item.isNot}
                    </p>
                  </div>

                  {/* Right — luminous glass */}
                  <div className="relative flex flex-col items-start overflow-hidden border-t border-white/25 bg-gradient-to-br from-white/25 via-blue-50/15 to-white/20 p-4 backdrop-blur-[14px] transition-[background,box-shadow,border-color] duration-500 group-hover:border-blue-200/40 group-hover:shadow-[inset_0_0_36px_-12px_rgba(59,130,246,0.12)] dark:border-t-white/5 dark:bg-gradient-to-br dark:from-white/[0.04] dark:via-blue-950/15 dark:to-white/[0.02] dark:group-hover:border-blue-500/25 md:flex-row md:items-center md:border-l md:border-t-0 md:border-slate-200/50 md:dark:border-white/[0.08] sm:p-5 md:p-6">
                    <span className="mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-blue-700 md:hidden dark:text-blue-400">✓ Vaid see</span>
                    <div
                      className="pointer-events-none absolute inset-0 bg-blue-500/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-blue-500/[0.08]"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute -right-8 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-blue-400/[0.14] blur-3xl dark:bg-blue-500/[0.18]"
                      aria-hidden
                    />

                    <div className="relative z-10 flex items-start gap-2.5 sm:gap-3">
                      <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.65),inset_0_1px_0_rgba(255,255,255,0.55)] dark:bg-blue-400 dark:shadow-[0_0_14px_rgba(96,165,250,0.85)]" />
                      <p className="text-sm font-bold leading-snug tracking-tight text-[rgb(var(--text-primary))] md:text-[15px] md:leading-snug dark:text-white">
                        {item.is}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-6 flex justify-center sm:mt-8">
            <div className={`relative inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 ${marketingMicroPillClass}`}>
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-70 dark:via-white/25" aria-hidden />
                <div className="mr-3 flex -space-x-1.5 sm:-space-x-2">
                  {sortedPartners.length === 0 ? (
                    [1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-5 w-5 rounded-full border-2 border-white/90 bg-gradient-to-br from-slate-300 to-slate-500 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.25)] dark:border-[rgb(var(--bg-primary))] dark:from-slate-600 dark:to-slate-800 sm:h-6 sm:w-6"
                        aria-hidden
                      />
                    ))
                  ) : (
                    <>
                      {visiblePartners.map((p, index) => (
                        <div
                          key={p._id}
                          title={p.name}
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-white/95 bg-gradient-to-br ${PARTNER_INITIAL_GRADIENTS[index % PARTNER_INITIAL_GRADIENTS.length]} shadow-[0_2px_8px_-2px_rgba(15,23,42,0.3)] dark:border-[rgb(var(--bg-primary))] sm:h-6 sm:w-6`}
                        >
                          <span className="text-[6px] font-black leading-none tracking-tight text-white drop-shadow-sm sm:text-[7px]">
                            {partnerInitials(p.name)}
                          </span>
                        </div>
                      ))}
                      {overflowPartnerCount > 0 ? (
                        <div
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-white/90 bg-gradient-to-br from-slate-200 to-slate-400 text-[6px] font-black leading-none tracking-tight text-slate-800 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.2)] dark:border-[rgb(var(--bg-primary))] dark:from-slate-600 dark:to-slate-800 dark:text-slate-200 sm:h-6 sm:w-6 sm:text-[7px]"
                          title={`+${overflowPartnerCount}`}
                        >
                          +{overflowPartnerCount}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-600 dark:text-gray-400 sm:text-[10px] sm:tracking-widest">
                  Seda erinevust on kogenud{' '}
                  <span className="text-[rgb(var(--text-primary))] dark:text-white">60+ ettevõtet</span>
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}