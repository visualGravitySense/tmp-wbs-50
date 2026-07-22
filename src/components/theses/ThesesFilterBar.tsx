'use client'

import { Filter, X } from 'lucide-react'
import { marketingMicroPillClass, marketingPanelCompactClass } from '@/components/ui'
import { cn } from '@/lib/utils'

export type ThesesFilterKey = 'year' | 'school' | 'category' | 'industry'

export type ThesesFilterState = {
  year: string | null
  school: string | null
  category: string | null
  industry: string | null
}

interface ThesesFilterBarProps {
  filters: ThesesFilterState
  onFilterChange: (key: ThesesFilterKey, value: string | null) => void
  onClearAll?: () => void
  years: string[]
  schools: string[]
  categories: string[]
  industries: string[]
  counts: {
    all: number
    year: Record<string, number>
    school: Record<string, number>
    category: Record<string, number>
    industry: Record<string, number>
  }
}

function FilterGroup({
  label,
  activeValue,
  options,
  counts,
  onSelect,
}: {
  label: string
  activeValue: string | null
  options: string[]
  counts: Record<string, number>
  onSelect: (value: string | null) => void
}) {
  if (options.length === 0) return null

  const pillBase =
    'inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide transition-all duration-200'

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[rgb(var(--text-secondary))]">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={cn(
            pillBase,
            !activeValue
              ? 'border border-blue-600 bg-blue-600 text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.55)] dark:shadow-[0_8px_28px_-10px_rgba(29,97,255,0.45)]'
              : cn(
                  marketingMicroPillClass,
                  'text-[rgb(var(--text-secondary))] hover:border-blue-400/60 hover:text-blue-600 dark:hover:text-blue-400',
                ),
          )}
        >
          Kõik
        </button>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              pillBase,
              activeValue === option
                ? 'border border-blue-600 bg-blue-600 text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.55)] dark:shadow-[0_8px_28px_-10px_rgba(29,97,255,0.45)]'
                : cn(
                    marketingMicroPillClass,
                    'text-[rgb(var(--text-secondary))] hover:border-blue-400/60 hover:text-blue-600 dark:hover:text-blue-400',
                  ),
            )}
          >
            {option}
            <span
              className={cn(
                'rounded-lg px-1.5 py-0.5 text-[9px] tabular-nums',
                activeValue === option ? 'bg-white/20 text-white' : marketingMicroPillClass,
              )}
            >
              {counts[option] ?? 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ThesesFilterBar({
  filters,
  onFilterChange,
  onClearAll,
  years,
  schools,
  categories,
  industries,
  counts,
}: ThesesFilterBarProps) {
  const hasActiveFilters = Boolean(filters.year || filters.school || filters.category || filters.industry)

  return (
    <div className={cn('relative overflow-hidden', marketingPanelCompactClass)}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-blue-400/[0.08] blur-3xl dark:bg-blue-500/15"
        aria-hidden
      />

      <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 pb-5 dark:border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center',
              marketingMicroPillClass,
            )}
          >
            <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[rgb(var(--text-primary))]">
              Filtreeri töid
            </p>
            <p className="text-xs font-medium text-[rgb(var(--text-secondary))]">
              Kokku{' '}
              <span className="font-bold tabular-nums text-[rgb(var(--text-primary))]">
                {counts.all}
              </span>{' '}
              lõputöö(d)
            </p>
          </div>
        </div>

        {hasActiveFilters && onClearAll ? (
          <button
            type="button"
            onClick={onClearAll}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
              marketingMicroPillClass,
            )}
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Tühista filtrid
          </button>
        ) : null}
      </div>

      <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <FilterGroup
          label="Aasta"
          activeValue={filters.year}
          options={years}
          counts={counts.year}
          onSelect={(value) => onFilterChange('year', value)}
        />
        <FilterGroup
          label="Õppeasutus"
          activeValue={filters.school}
          options={schools}
          counts={counts.school}
          onSelect={(value) => onFilterChange('school', value)}
        />
        <FilterGroup
          label="Kategooria"
          activeValue={filters.category}
          options={categories}
          counts={counts.category}
          onSelect={(value) => onFilterChange('category', value)}
        />
        <FilterGroup
          label="Tööstusharu"
          activeValue={filters.industry}
          options={industries}
          counts={counts.industry}
          onSelect={(value) => onFilterChange('industry', value)}
        />
      </div>
    </div>
  )
}
