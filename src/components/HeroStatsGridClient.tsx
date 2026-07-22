'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type HeroStat = {
  label: string
  number: string
  suffix?: string
}

export type HeroStatInput = HeroStat | {
  label: string
  number?: string
  value?: string
  suffix?: string
}

function normalizeStat(input: HeroStatInput): HeroStat {
  const number = String(input.number ?? ('value' in input ? input.value : '') ?? '').trim()
  const suffix = input.suffix?.trim()
  return {
    label: input.label.trim(),
    number,
    suffix: suffix || undefined,
  }
}

export function resolveHeroStats(stats?: HeroStatInput[] | null): HeroStat[] {
  if (!stats || stats.length === 0) return []
  const list =
    stats.filter((s) => {
      const label = s.label?.trim()
      const number = String(s.number ?? ('value' in s ? s.value : '') ?? '').trim()
      return Boolean(label && number)
    })

  if (list.length === 0) return []
  return list.map(normalizeStat)
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function parseStatNumber(raw: string): { end: number; decimals: number } | null {
  const cleaned = raw.replace(/\s/g, '').replace(',', '.')
  const n = Number(cleaned)
  if (!Number.isFinite(n)) return null
  const dot = cleaned.indexOf('.')
  const decimals = dot >= 0 ? Math.min(cleaned.length - dot - 1, 2) : 0
  return { end: n, decimals }
}

function formatStatValue(value: number, decimals: number) {
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value))
}

export type HeroStatCellProps = {
  stat: HeroStat
  className?: string
  active?: boolean
  delay?: number
  enableCountUp?: boolean
}

export function HeroStatCell({
  stat,
  className,
  active = false,
  delay = 0,
  enableCountUp = true,
}: HeroStatCellProps) {
  const parsed = useMemo(() => parseStatNumber(stat.number), [stat.number])
  const [suffixVisible, setSuffixVisible] = useState(false)
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const p = parseStatNumber(stat.number)

    if (!active) {
      if (numberRef.current) numberRef.current.textContent = stat.number
      setSuffixVisible(false)
      return
    }

    if (!enableCountUp || !p) {
      if (numberRef.current) numberRef.current.textContent = stat.number
      setSuffixVisible(Boolean(stat.suffix))
      return
    }

    let frame = 0
    let delayTimer: ReturnType<typeof setTimeout> | undefined
    let suffixTimer: ReturnType<typeof setTimeout> | undefined
    const { end, decimals } = p

    delayTimer = setTimeout(() => {
      setSuffixVisible(false)
      let start: number | null = null
      const duration = 1300

      const step = (now: number) => {
        if (start === null) start = now
        const t = Math.min((now - start) / duration, 1)
        const current = end * easeOutCubic(t)
        if (numberRef.current) numberRef.current.textContent = formatStatValue(current, decimals)
        if (t < 1) {
          frame = requestAnimationFrame(step)
        } else {
          if (numberRef.current) numberRef.current.textContent = formatStatValue(end, decimals)
          if (stat.suffix) {
            suffixTimer = setTimeout(() => setSuffixVisible(true), 100)
          }
        }
      }

      if (numberRef.current) numberRef.current.textContent = formatStatValue(0, decimals)
      frame = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(delayTimer)
      clearTimeout(suffixTimer)
      cancelAnimationFrame(frame)
    }
  }, [active, enableCountUp, delay, stat.number, stat.suffix])

  const showSuffix = Boolean(
    stat.suffix && active && ((!enableCountUp || !parsed) || suffixVisible),
  )

  return (
    <div
      className={cn(
        'luxury-stat-card group relative text-center transition-all duration-500 ease-out hover:-translate-y-1',
        active ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
        className,
      )}
    >
      <div
        className={cn(
          'candy-stat-shell relative z-10 mx-auto w-fit justify-center gap-0.5 sm:gap-1',
          stat.suffix && 'candy-stat-shell--has-suffix',
        )}
        aria-label={`${stat.number}${stat.suffix ?? ''}`}
      >
        <span
          ref={numberRef}
          className="candy-stat tabular-nums text-4xl font-heading font-black tracking-tight sm:text-5xl md:text-7xl text-accent"
          suppressHydrationWarning
        >
          {stat.number}
        </span>
        {stat.suffix ? (
          <span
            className={cn(
              'stat-suffix text-xl transition-all duration-500 ease-out sm:text-2xl md:text-4xl text-accent',
              showSuffix ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
            )}
            aria-hidden={!showSuffix}
          >
            {stat.suffix}
          </span>
        ) : null}
      </div>
      <div
        className={cn(
          'luxury-stat-label relative z-10 mt-4 text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-textHeading transition-all duration-700 ease-out font-heading leading-snug break-words',
          active ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        )}
        style={{ transitionDelay: active ? `${delay + 200}ms` : '0ms' }}
      >
        {stat.label}
      </div>
    </div>
  )
}

export type HeroStatsGridClientProps = {
  stats: HeroStat[]
  showDivider?: boolean
  className?: string
  gridClassName?: string
  dividerClassName?: string
  animate?: boolean
}

export default function HeroStatsGridClient({
  stats = [],
  showDivider = true,
  className,
  gridClassName,
  animate = false,
}: HeroStatsGridClientProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  return (
    <div ref={rootRef} className={cn('site-hero-stats min-w-0 max-w-full overflow-visible', className)}>
      {showDivider ? (
        <div
          className={cn(
            'site-hero-stats-divider mx-auto mb-4 h-px max-w-6xl bg-gradient-to-r from-transparent via-[var(--border)] to-transparent transition-opacity duration-700 sm:mb-6',
            inView ? 'opacity-100' : 'opacity-0',
          )}
        />
      ) : null}
      <div
        className={cn(
          'site-hero-stats-grid mx-auto mb-4 grid min-w-0 max-w-full grid-cols-2 gap-x-4 gap-y-8 overflow-visible sm:mb-8 sm:gap-6 lg:grid-cols-4 [&>*]:min-w-0 [&>*]:overflow-visible',
          gridClassName,
        )}
      >
        {stats.map((stat, index) => (
          <HeroStatCell
            key={`${stat.label}-${stat.number}-${stat.suffix ?? ''}-${index}`}
            stat={stat}
            active={inView}
            delay={index * 120}
            enableCountUp={animate}
          />
        ))}
      </div>
    </div>
  )
}
