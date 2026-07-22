'use client'

import { marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'

export type IndustryFilterCounts = Map<string, number>

export function buildIndustryFilterOptions(
  items: { industry?: string | null }[],
): { industries: string[]; counts: IndustryFilterCounts } {
  const counts = new Map<string, number>()
  for (const item of items) {
    const industry = item.industry?.trim()
    if (industry) {
      counts.set(industry, (counts.get(industry) || 0) + 1)
    }
  }
  return {
    industries: ['Kõik', ...Array.from(counts.keys()).sort()],
    counts,
  }
}

type IndustryFilterPillsProps = {
  industries: string[]
  activeFilter: string
  onFilterChange: (industry: string) => void
  getCount: (industry: string) => number | undefined
  className?: string
}

/** Pill filter bar shared by /kliendid and /testimonials. */
export default function IndustryFilterPills({
  industries,
  activeFilter,
  onFilterChange,
  getCount,
  className,
}: IndustryFilterPillsProps) {
  if (industries.length <= 1) return null

  return (
    <div className={cn('mb-8 flex flex-wrap items-center justify-center gap-3 md:mb-10', className)}>
      {industries.map((industry) => {
        const count = getCount(industry)
        const isActive = activeFilter === industry
        return (
          <button
            key={industry}
            type="button"
            onClick={() => onFilterChange(industry)}
            className={cn(
              marketingMicroPillClass,
              'px-5 py-2.5 text-sm transition-all duration-300',
              isActive
                ? 'border-blue-600/20 bg-blue-600/10 text-blue-600 shadow-sm dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300'
                : 'backdrop-blur-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/50 dark:hover:text-white',
            )}
          >
            {industry}{' '}
            {count !== undefined ? (
              <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs font-bold opacity-60 dark:bg-slate-800">
                {count}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}