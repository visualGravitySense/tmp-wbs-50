'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import ThesisCard from '@/components/theses/ThesisCard'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ThesesPagination from '@/components/theses/ThesesPagination'
import ThesesFilterBar, {
  type ThesesFilterKey,
  type ThesesFilterState,
} from '@/components/theses/ThesesFilterBar'
import { MarketingContainer, Section, marketingMicroPillClass } from '@/components/ui'
import { BrandVibrantButton } from '@/components/ui/BrandVibrantButton'
import { cn } from '@/lib/utils'
import type { Thesis } from '@/types/thesis'

const THESES_PER_PAGE = 9

interface ThesesGridProps {
  sectionTitle?: string
  sectionSubtitle?: string
  theses: Thesis[]
  variant?: 'preview' | 'full'
}

function uniqueSorted(values: (string | number | undefined | null)[]): string[] {
  return Array.from(
    new Set(values.map((v) => (v == null ? '' : String(v).trim())).filter(Boolean)),
  ).sort((a, b) => {
    const na = Number(a)
    const nb = Number(b)
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return nb - na
    return a.localeCompare(b, 'et')
  })
}

function countBy(values: Thesis[], getter: (t: Thesis) => string | number | undefined): Record<string, number> {
  const out: Record<string, number> = {}
  for (const thesis of values) {
    const key = String(getter(thesis) ?? '').trim()
    if (!key) continue
    out[key] = (out[key] ?? 0) + 1
  }
  return out
}

function SectionDivider() {
  return (
    <div className="mx-auto mt-10 flex max-w-md items-center gap-3 px-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent opacity-70 dark:via-white/15" />
      <div className="flex gap-1.5">
        <span className="h-1 w-1 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.45)] dark:shadow-[0_0_14px_rgba(29,97,255,0.5)]" />
        <span className="h-1 w-1 rounded-full bg-blue-600/35 dark:bg-blue-400/30" />
        <span className="h-1 w-1 rounded-full bg-blue-600/15 dark:bg-blue-400/15" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[rgb(var(--border))] to-transparent opacity-70 dark:via-white/15" />
    </div>
  )
}

function StatPill({ value, label }: { value: string | number; label: string }) {
  return (
    <div className={cn('px-4 py-3 text-center', marketingMicroPillClass)}>
      <div className="text-2xl font-extrabold tabular-nums tracking-tight text-[rgb(var(--text-primary))]">
        {value}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--text-secondary))]">
        {label}
      </div>
    </div>
  )
}

export default function ThesesGrid({ sectionTitle, sectionSubtitle, theses, variant = 'full' }: ThesesGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [filters, setFilters] = useState<ThesesFilterState>({
    year: null,
    school: null,
    category: null,
    industry: null,
  })
  const [currentPage, setCurrentPage] = useState(1)

  const years = useMemo(() => uniqueSorted(theses.map((t) => t.year)), [theses])
  const schools = useMemo(() => uniqueSorted(theses.map((t) => t.school)), [theses])
  const categories = useMemo(() => uniqueSorted(theses.map((t) => t.category)), [theses])
  const industries = useMemo(() => uniqueSorted(theses.map((t) => t.industry)), [theses])

  const portfolioStats = useMemo(
    () => ({
      total: theses.length,
      schools: schools.length,
      categories: categories.length,
      awarded: theses.filter((t) => t.achievement?.trim()).length,
    }),
    [theses, schools.length, categories.length],
  )

  const filteredTheses = useMemo(() => {
    return theses.filter((thesis) => {
      if (filters.year && String(thesis.year) !== filters.year) return false
      if (filters.school && thesis.school !== filters.school) return false
      if (filters.category && thesis.category !== filters.category) return false
      if (filters.industry && thesis.industry !== filters.industry) return false
      return true
    })
  }, [theses, filters])

  const baseForCounts = useMemo(() => {
    return theses.filter((thesis) => {
      if (filters.school && thesis.school !== filters.school) return false
      if (filters.category && thesis.category !== filters.category) return false
      if (filters.industry && thesis.industry !== filters.industry) return false
      return true
    })
  }, [theses, filters.school, filters.category, filters.industry])

  const baseForSchoolCounts = useMemo(() => {
    return theses.filter((thesis) => {
      if (filters.year && String(thesis.year) !== filters.year) return false
      if (filters.category && thesis.category !== filters.category) return false
      if (filters.industry && thesis.industry !== filters.industry) return false
      return true
    })
  }, [theses, filters.year, filters.category, filters.industry])

  const baseForCategoryCounts = useMemo(() => {
    return theses.filter((thesis) => {
      if (filters.year && String(thesis.year) !== filters.year) return false
      if (filters.school && thesis.school !== filters.school) return false
      if (filters.industry && thesis.industry !== filters.industry) return false
      return true
    })
  }, [theses, filters.year, filters.school, filters.industry])

  const baseForIndustryCounts = useMemo(() => {
    return theses.filter((thesis) => {
      if (filters.year && String(thesis.year) !== filters.year) return false
      if (filters.school && thesis.school !== filters.school) return false
      if (filters.category && thesis.category !== filters.category) return false
      return true
    })
  }, [theses, filters.year, filters.school, filters.category])

  const counts = useMemo(
    () => ({
      all: filteredTheses.length,
      year: countBy(baseForCounts, (t) => t.year),
      school: countBy(baseForSchoolCounts, (t) => t.school),
      category: countBy(baseForCategoryCounts, (t) => t.category),
      industry: countBy(baseForIndustryCounts, (t) => t.industry),
    }),
    [filteredTheses.length, baseForCounts, baseForSchoolCounts, baseForCategoryCounts, baseForIndustryCounts],
  )

  const totalPages = Math.max(1, Math.ceil(filteredTheses.length / THESES_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)

  const paginatedTheses = useMemo(() => {
    const start = (safePage - 1) * THESES_PER_PAGE
    return filteredTheses.slice(start, start + THESES_PER_PAGE)
  }, [filteredTheses, safePage])

  const rangeStart = filteredTheses.length === 0 ? 0 : (safePage - 1) * THESES_PER_PAGE + 1
  const rangeEnd = Math.min(safePage * THESES_PER_PAGE, filteredTheses.length)

  useEffect(() => {
    setCurrentPage(1)
  }, [filters.year, filters.school, filters.category, filters.industry])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const handleFilterChange = (key: ThesesFilterKey, value: string | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleClearAll = () => {
    setFilters({ year: null, school: null, category: null, industry: null })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (theses.length === 0) {
    return null
  }

  const title = (sectionTitle ?? 'Juhendatud lõputööd').trim()
  const subtitle = sectionSubtitle?.trim()

  return (
    <Section variant="band" id="loputood" className="overflow-x-hidden relative">
      <div className="bg-premium-grid" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[10%] h-[min(420px,70vw)] w-[min(420px,70vw)] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.2),transparent_62%)] blur-[90px]" />
        <div className="absolute bottom-[6%] right-[5%] h-[min(380px,65vw)] w-[min(380px,65vw)] rounded-full bg-[radial-gradient(circle_at_70%_50%,rgba(129,140,248,0.12),transparent_58%)] blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 h-[min(300px,55vw)] w-[min(300px,55vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.08),transparent_65%)] blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_0%,transparent_30%,transparent_70%,rgba(0,0,0,0.04)_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,transparent_70%,rgba(0,0,0,0.22)_100%)]" />
      </div>

      <MarketingContainer elevated>
        <div className="mb-12 text-center sm:mb-14 md:mb-16">
          <div className="mb-6 flex justify-center">
            <EyebrowPillBadge text="Akadeemiline portfell" showDots />
          </div>
          <h2 className="mb-5 text-4xl font-black leading-none tracking-tighter text-[rgb(var(--text-primary))] md:text-5xl lg:text-6xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mx-auto max-w-3xl text-base font-medium italic leading-relaxed text-[rgb(var(--text-secondary))] opacity-90 md:text-lg">
              {subtitle}
            </p>
          ) : null}
          <SectionDivider />

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <StatPill value={portfolioStats.total} label="Lõputööd" />
            <StatPill value={portfolioStats.schools} label="Õppeasutust" />
            <StatPill value={portfolioStats.categories} label="Kategooriat" />
            <StatPill value={portfolioStats.awarded} label="Tunnustust" />
          </div>
        </div>

        {variant !== 'preview' && (
          <div className="mb-10 lg:sticky lg:top-[4.5rem] lg:z-20 lg:mb-12">
            <ThesesFilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
              years={years}
              schools={schools}
              categories={categories}
              industries={industries}
              counts={counts}
            />
          </div>
        )}

        {filteredTheses.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[rgb(var(--bg-primary))]/50 px-6 py-16 text-center dark:bg-white/[0.03]">
            <p className="text-sm font-medium text-[rgb(var(--text-secondary))] sm:text-base">
              Valitud filtritega lõputöid ei leitud. Proovi teisi filtreid või{' '}
              <button
                type="button"
                onClick={handleClearAll}
                className="font-bold text-blue-600 hover:underline dark:text-blue-400"
              >
                tühista filtrid
              </button>
              .
            </p>
          </div>
        ) : (
          <div ref={gridRef} className="relative scroll-mt-28">
            <div className="pointer-events-none absolute inset-x-0 -top-16 h-48 -z-10">
              <div className="absolute left-1/2 top-0 h-[min(280px,60vw)] w-[min(680px,92vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.1),transparent_68%)] blur-[80px]" />
            </div>

            {variant !== 'preview' && totalPages > 1 ? (
              <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--text-secondary))]">
                Näitan{' '}
                <span className="tabular-nums text-[rgb(var(--text-primary))]">
                  {rangeStart}–{rangeEnd}
                </span>{' '}
                /{' '}
                <span className="tabular-nums text-[rgb(var(--text-primary))]">
                  {filteredTheses.length}
                </span>{' '}
                lõputööd
              </p>
            ) : null}

            <div className="grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {(variant === 'preview' ? theses.slice(0, 3) : paginatedTheses).map((thesis, index) => (
                <ThesisCard key={thesis._id} thesis={thesis} index={index} />
              ))}
            </div>

            {variant !== 'preview' && (
              <ThesesPagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}

            {variant === 'preview' && theses.length > 3 && (
              <div className="mt-12 flex justify-center">
                <BrandVibrantButton href="/loputood">
                  Vaata kõiki lõputöid
                </BrandVibrantButton>
              </div>
            )}
          </div>
        )}
      </MarketingContainer>
    </Section>
  )
}
