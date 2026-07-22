'use client'

import React, { useEffect, useRef } from 'react'

type StatDef = { end: number; decimals: number; suffix: string; label: string }

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

export function AnimatedStat({
  end,
  decimals,
  suffix,
  label,
  active,
}: StatDef & { active: boolean }) {
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!active) {
      if (numberRef.current) numberRef.current.textContent = String(Math.round(end))
      return
    }

    let start: number | null = null
    const duration = 1200
    let frame: number

    const step = (now: number) => {
      if (start === null) start = now
      const t = Math.min((now - start) / duration, 1)
      const eased = easeOutCubic(t)
      const current = end * eased
      
      if (numberRef.current) {
        numberRef.current.textContent = decimals > 0 
          ? current.toFixed(decimals) 
          : String(Math.round(current))
      }
      
      if (t < 1) frame = requestAnimationFrame(step)
    }
    
    if (numberRef.current) {
      numberRef.current.textContent = decimals > 0 ? (0).toFixed(decimals) : '0'
    }
    
    // Delay slightly to not compete with Next.js hydration
    const timer = setTimeout(() => {
      frame = requestAnimationFrame(step)
    }, 150)
    
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [active, end, decimals])

  return (
    <div className="relative flex flex-col items-center px-0.5 py-1 text-center sm:px-1">
      <span
        className="relative z-[1] bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-base font-black tabular-nums text-transparent sm:text-lg md:text-xl dark:from-white dark:to-slate-200 flex items-baseline justify-center gap-1"
        suppressHydrationWarning
      >
        <span ref={numberRef}>{decimals > 0 ? (0).toFixed(decimals) : '0'}</span>
        {suffix && <span className="text-xs sm:text-sm font-bold tracking-normal">{suffix}</span>}
      </span>
      <span className="relative z-[1] mt-1 max-w-[6rem] text-[8px] font-bold uppercase leading-tight tracking-wide text-slate-500/90 sm:max-w-none sm:text-[9px] dark:text-slate-400">
        {label}
      </span>
    </div>
  )
}

export interface QuickStatsStripProps {
  stats: StatDef[]
  active?: boolean
  className?: string
}

export default function QuickStatsStrip({ stats, active = true, className = '' }: QuickStatsStripProps) {
  if (!stats || stats.length === 0) return null
  const statGridStyle = { gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }

  return (
    <div className={`relative mt-2.5 overflow-hidden rounded-2xl border border-white/45 bg-white/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_4px_20px_-8px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/[0.1] dark:bg-white/[0.05] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 to-transparent dark:from-white/[0.04] dark:to-transparent" />
      <div
        className="relative grid divide-x divide-white/40 py-2 dark:divide-white/[0.08]"
        style={statGridStyle}
      >
        {stats.map((s, i) => (
          <AnimatedStat key={s.label + i} {...s} active={active} />
        ))}
      </div>
    </div>
  )
}
