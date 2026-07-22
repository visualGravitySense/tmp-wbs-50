'use client'

import type { ReactNode } from 'react'
import { marketingInsetCardClass } from '@/components/ui'

export interface EightComponentItem {
  number: number
  title: string
  tags: string
  whatIs: string
  howItWorks: string
  result: string
  resultMetric: string
}

interface OpstarProfit8ComponentDetailPanelProps {
  active: EightComponentItem
}

function DetailColumn({
  dotClass,
  label,
  children,
}: {
  dotClass: string
  label: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className={`h-1 w-1 shrink-0 rounded-full ${dotClass}`} />
        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-gray-500 sm:text-[11px] sm:tracking-widest">
          {label}
        </h4>
      </div>
      <p className="text-[13px] font-medium leading-snug text-[rgb(var(--text-secondary))] md:text-sm md:leading-relaxed">
        {children}
      </p>
    </div>
  )
}

export default function OpstarProfit8ComponentDetailPanel({
  active,
}: OpstarProfit8ComponentDetailPanelProps) {
  return (
    <div className={`relative overflow-hidden !p-4 sm:!p-5 md:!p-6 ${marketingInsetCardClass}`}>
      <div
        className="pointer-events-none absolute -right-2 top-1 select-none text-[clamp(3.5rem,18vw,6.5rem)] font-black italic leading-none text-slate-200/45 dark:text-white/[0.04]"
        aria-hidden
      >
        {active.number}
      </div>

      <div className="relative z-10 mb-4 border-b border-slate-200/80 pb-4 dark:border-white/[0.06] sm:mb-5 sm:pb-4">
        <h3 className="text-xl font-black uppercase italic leading-[1.05] tracking-tighter text-[rgb(var(--text-primary))] sm:text-2xl md:text-[1.65rem]">
          {active.title}
        </h3>
        <div className="mt-1.5 text-[9px] font-black uppercase tracking-eyebrow eyebrow-label text-blue-600 dark:text-blue-500 sm:text-[10px] sm:tracking-[0.28em]">
          {active.tags}
        </div>
      </div>

      <div className="relative z-10 grid gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-6">
        <DetailColumn dotClass="bg-blue-500" label="Mis see on">
          {active.whatIs}
        </DetailColumn>
        <DetailColumn dotClass="bg-blue-500" label="Kuidas toimib">
          {active.howItWorks}
        </DetailColumn>
        <div className="space-y-3 lg:space-y-4">
          <DetailColumn dotClass="bg-emerald-500" label="Tulemus">
            {active.result}
          </DetailColumn>
          <div className="relative inline-flex max-w-full rounded-lg border border-emerald-500/35 bg-emerald-50/95 px-3 py-2 shadow-sm dark:border-emerald-500/25 dark:bg-emerald-500/[0.12] sm:px-4 sm:py-2.5">
            <span className="text-[11px] font-black uppercase italic leading-tight tracking-wide text-emerald-900 dark:text-emerald-300 sm:text-xs sm:tracking-wider">
              {active.resultMetric}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
