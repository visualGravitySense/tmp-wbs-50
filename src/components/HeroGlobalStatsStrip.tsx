'use client'

import QuickStatsStrip from '@/components/ui/QuickStatsStrip'

export type GlobalStatInput = {
  number?: string | null
  suffix?: string | null
  label?: string | null
  value?: string | null
}

export function mapGlobalStatsToStripStats(stats: GlobalStatInput[], limit = 4) {
  return stats
    .filter((s) => {
      const label = s.label?.trim()
      const number = String(s.number ?? s.value ?? '').trim()
      return Boolean(label && number)
    })
    .slice(0, limit)
    .map((s) => {
      const numStr = String(s.number ?? s.value ?? '').trim()
      const end = parseFloat(numStr.replace(/[^0-9.]/g, '')) || 0
      const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
      return {
        end,
        decimals,
        suffix: s.suffix != null ? String(s.suffix) : '',
        label: String(s.label).trim(),
      }
    })
}

export type HeroGlobalStatsStripProps = {
  stats?: GlobalStatInput[] | null
  limit?: number
  className?: string
}

const DEFAULT_STRIP_CLASS =
  'mt-3 !border-slate-200/60 !bg-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_4px_20px_-8px_rgba(15,23,42,0.05)] dark:!border-white/[0.1] dark:!bg-white/[0.05] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'

export default function HeroGlobalStatsStrip({
  stats,
  limit = 4,
  className = DEFAULT_STRIP_CLASS,
}: HeroGlobalStatsStripProps) {
  const stripStats = mapGlobalStatsToStripStats(stats ?? [], limit)
  if (stripStats.length === 0) return null

  return (
    <QuickStatsStrip
      stats={stripStats}
      className={['site-hero-global-stats', className].filter(Boolean).join(' ')}
    />
  )
}