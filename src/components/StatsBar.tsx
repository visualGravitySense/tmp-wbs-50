import React from 'react'
import { cn } from '@/lib/utils'

export interface StatItem {
  number: string
  suffix?: string
  label: string
}

export interface StatsBarProps {
  stats: StatItem[]
  className?: string
  variant?: 'card' | 'inline'
}

export default function StatsBar({ stats, className, variant = 'card' }: StatsBarProps) {
  if (!stats || stats.length === 0) return null

  const isCard = variant === 'card'

  return (
    <div
      className={cn(
        'w-full',
        isCard && 'bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm p-4 sm:p-6',
        className
      )}
    >
      <div
        className={cn(
          'relative z-10 grid gap-4',
          !isCard && 'border-t border-slate-200/80 dark:border-white/10 pt-4 mt-2'
        )}
        style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
      >
        {stats.map((stat, idx) => {
          const value = `${stat.number || ''}${stat.suffix || ''}`
          return (
            <div
              key={idx}
              className={cn(
                'flex flex-col items-center justify-center text-center px-2',
                idx < stats.length - 1 && 'border-r border-slate-200/80 dark:border-white/10'
              )}
            >
              <span className="text-base sm:text-xl md:text-2xl font-black text-slate-800 dark:text-white leading-none tracking-tight">
                {value}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1.5 sm:mt-2">
                {stat.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
