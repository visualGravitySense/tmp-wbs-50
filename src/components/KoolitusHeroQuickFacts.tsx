'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Award,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  MessageSquare,
  Users,
} from 'lucide-react'
import { AnimatedStat } from '@/components/ui/QuickStatsStrip'

export type HeroBadge = { text?: string; color?: string; size?: string }

export type QuickFactsSanityRow = {
  _key?: string
  label?: string | null
  value?: string | null
  hint?: string | null
  icon?: string | null
}

export type QuickFactsSanityStat = {
  _key?: string
  number?: string | null
  suffix?: string | null
  label?: string | null
}

export type QuickFactsCardSanity = {
  eyebrow?: string | null
  title?: string | null
  durationPill?: string | null
  rows?: QuickFactsSanityRow[] | null
  subsidyText?: string | null
  priceText?: string | null
  stats?: QuickFactsSanityStat[] | null
}

const WRAP_BLUE =
  'border-blue-400/25 bg-gradient-to-br from-blue-500/25 to-blue-600/10 text-blue-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-blue-400/20 dark:from-blue-500/30 dark:to-blue-900/20 dark:text-blue-400'
const WRAP_VIOLET =
  'border-violet-400/25 bg-gradient-to-br from-violet-500/22 to-violet-600/10 text-violet-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-violet-400/20 dark:from-violet-500/28 dark:to-violet-900/15 dark:text-violet-100'
const WRAP_ROSE =
  'border-rose-400/25 bg-gradient-to-br from-rose-500/22 to-rose-600/10 text-rose-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-rose-400/18 dark:from-rose-500/25 dark:to-rose-900/15 dark:text-rose-100'
const WRAP_AMBER =
  'border-amber-400/30 bg-gradient-to-br from-amber-400/28 to-amber-600/12 text-amber-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] dark:border-amber-400/22 dark:from-amber-500/25 dark:to-amber-900/18 dark:text-amber-100'
const WRAP_FUCHSIA =
  'border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/22 to-fuchsia-600/10 text-fuchsia-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-fuchsia-400/18 dark:from-fuchsia-500/25 dark:to-fuchsia-900/15 dark:text-fuchsia-100'

const ICON_REGISTRY: Record<string, { Icon: LucideIcon; iconWrap: string }> = {
  calendardays: { Icon: CalendarDays, iconWrap: WRAP_BLUE },
  calendar: { Icon: CalendarDays, iconWrap: WRAP_BLUE },
  users: { Icon: Users, iconWrap: WRAP_VIOLET },
  mappin: { Icon: MapPin, iconWrap: WRAP_ROSE },
  map: { Icon: MapPin, iconWrap: WRAP_ROSE },
  award: { Icon: Award, iconWrap: WRAP_AMBER },
  trophy: { Icon: Award, iconWrap: WRAP_AMBER },
  messagesquare: { Icon: MessageSquare, iconWrap: WRAP_FUCHSIA },
  message: { Icon: MessageSquare, iconWrap: WRAP_FUCHSIA },
  clock: { Icon: Clock, iconWrap: WRAP_BLUE },
}

function normalizeIconKey(raw?: string | null): string {
  const k = (raw || 'calendarDays').trim().toLowerCase()
  const aliases: Record<string, string> = {
    calendar: 'calendardays',
    calendardays: 'calendardays',
    user: 'users',
    users: 'users',
    mappin: 'mappin',
    mapin: 'mappin',
    location: 'mappin',
    map: 'mappin',
    award: 'award',
    trophy: 'award',
    messagesquare: 'messagesquare',
    message: 'messagesquare',
    clock: 'clock',
  }
  return aliases[k] || k
}

function resolveIcon(raw?: string | null) {
  const key = normalizeIconKey(raw)
  return ICON_REGISTRY[key] || ICON_REGISTRY.calendardays
}

type FactRow = {
  id: string
  Icon: LucideIcon
  label: string
  value: string
  hint: string
  iconWrap: string
}

const FALLBACK_FACT_ROWS: Omit<FactRow, 'Icon' | 'iconWrap'>[] = [
  {
    id: 'duration',
    label: 'Kestus',
    value: '9 päeva · 4 kuud',
    hint: 'Intensiivne kontaktõpe ja vaheperioodid tehaste praktikas.',
  },
  {
    id: 'group',
    label: 'Grupi suurus',
    value: 'Max 12 osalejat',
    hint: 'Väike grupp tagab personaalse tagasiside ja arutelude sügavuse.',
  },
  {
    id: 'location',
    label: 'Asukoht',
    value: 'Tallinn + tehased',
    hint: 'Teooria linnas, praktika päris tootmiskeskkondades.',
  },
  {
    id: 'cert',
    label: 'Tunnistus',
    value: 'Product Name',
    hint: 'Tunnustatud programm, mis ühendab LEAN, TPS ja Product Name raamistiku.',
  },
  {
    id: 'support',
    label: 'Järeltugi',
    value: '12 kuud',
    hint: 'Jätkunõustamine ja materjalid pärast koolituse lõppu.',
  },
]

const FALLBACK_ICONS = ['calendarDays', 'users', 'mapPin', 'award', 'messageSquare'] as const

function buildFactRows(rows?: QuickFactsSanityRow[] | null): FactRow[] {
  const list = rows?.filter((r) => r.label?.trim() && r.value?.trim()) ?? []
  if (list.length === 0) {
    return FALLBACK_FACT_ROWS.map((r, i) => {
      const { Icon, iconWrap } = resolveIcon(FALLBACK_ICONS[i])
      return { ...r, Icon, iconWrap }
    })
  }
  return list.map((r, i) => {
    const { Icon, iconWrap } = resolveIcon(r.icon)
    return {
      id: r._key || `row-${i}`,
      Icon,
      iconWrap,
      label: r.label!.trim(),
      value: r.value!.trim(),
      hint: (r.hint && String(r.hint).trim()) || '',
    }
  })
}

type StatDef = { end: number; decimals: number; suffix: string; label: string }

const FALLBACK_STATS: StatDef[] = [
  { end: 147, decimals: 0, suffix: '+', label: 'LÕPETAJAT' },
  { end: 60, decimals: 0, suffix: '+', label: 'ETTEVÕTET' },
  { end: 4.9, decimals: 1, suffix: '', label: 'HINNANG' },
  { end: 25, decimals: 0, suffix: '%', label: 'PRAAK ↓' },
]

function buildStats(stats?: QuickFactsSanityStat[] | null): StatDef[] {
  const list =
    stats?.filter(
      (s) =>
        s.number?.trim() &&
        s.label?.trim()
    ) ?? []
  if (list.length === 0) return FALLBACK_STATS
  return list.map((s) => {
    const numStr = s.number!.trim()
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

const DEF_EYEBROW = 'Product Name · PROGRAMMI ÜLEVAADE'
const DEF_TITLE = 'Kiired faktid'
const DEF_PILL = '9 päeva'
const DEF_SUBSIDY = 'EIS toetus kuni 50%'
const DEF_PRICE = 'alates 890 €'

function resolveQuickFacts(data?: QuickFactsCardSanity | null) {
  const d = data || {}
  const facts = buildFactRows(d.rows)
  const stats = buildStats(d.stats)
  return {
    eyebrow: (d.eyebrow && String(d.eyebrow).trim()) || DEF_EYEBROW,
    title: (d.title && String(d.title).trim()) || DEF_TITLE,
    durationPill: (d.durationPill && String(d.durationPill).trim()) || DEF_PILL,
    subsidyText: (d.subsidyText && String(d.subsidyText).trim()) || DEF_SUBSIDY,
    priceText: (d.priceText && String(d.priceText).trim()) || DEF_PRICE,
    facts,
    stats,
  }
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

export type KoolitusHeroQuickFactsProps = {
  quickFactsCard?: QuickFactsCardSanity | null
  badges?: HeroBadge[] | null
}

export default function KoolitusHeroQuickFacts({
  quickFactsCard,
  badges,
}: KoolitusHeroQuickFactsProps) {
  const resolved = useMemo(
    () => resolveQuickFacts(quickFactsCard),
    [quickFactsCard]
  )

  const rootRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px 12% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const showHint = hoverId ?? activeId
  const hintText =
    resolved.facts.find((r) => r.id === showHint)?.hint ?? ''

  const statCount = Math.max(1, Math.min(3, resolved.stats.length))
  const statGridClass =
    statCount >= 3
      ? 'grid-cols-2 sm:grid-cols-3'
      : statCount === 2
        ? 'grid-cols-2'
        : 'grid-cols-1'

  return (
    <div
      ref={rootRef}
      className="site-hero-quick-facts group/card relative w-full min-w-0 max-w-full overflow-hidden rounded-[26px] border border-white/55 bg-white/25 shadow-[0_4px_24px_-2px_rgba(59,130,246,0.12),0_32px_64px_-28px_rgba(15,23,42,0.18),inset_0_1px_0_0_rgba(255,255,255,0.65),inset_0_0_80px_-20px_rgba(255,255,255,0.35)] backdrop-blur-[28px] backdrop-saturate-150 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-0.5 hover:border-white/75 hover:shadow-[0_8px_32px_-4px_rgba(59,130,246,0.18),0_40px_80px_-32px_rgba(15,23,42,0.22),inset_0_1px_0_0_rgba(255,255,255,0.85)] dark:rounded-[2rem] dark:border-white/[0.14] dark:bg-[rgb(var(--bg-secondary))]/55 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_28px_56px_-24px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_-40px_80px_-48px_rgba(59,130,246,0.08)] dark:backdrop-blur-[32px] dark:hover:border-blue-400/25 dark:hover:shadow-[0_0_0_1px_rgba(59,130,246,0.12),0_36px_72px_-28px_rgba(0,0,0,0.82),inset_0_1px_0_0_rgba(255,255,255,0.14),0_0_48px_-12px_rgba(59,130,246,0.15)]"
    >
      <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full bg-gradient-to-br from-cyan-300/35 via-blue-400/20 to-transparent blur-3xl dark:from-cyan-500/20 dark:via-blue-600/15" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-64 rounded-full bg-gradient-to-tr from-indigo-400/25 via-blue-500/15 to-transparent blur-3xl dark:from-indigo-600/18 dark:via-blue-700/12" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-40 w-[120%] -translate-x-1/2 rounded-full bg-white/25 blur-2xl dark:bg-white/[0.04]" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-slate-200/15 dark:from-white/[0.06] dark:via-transparent dark:to-slate-950/40" />

      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/20" />

      <div
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 mix-blend-overlay transition-all duration-700 ease-out group-hover/card:translate-x-full group-hover/card:opacity-100 dark:via-white/[0.08]"
        aria-hidden
      />

      <div className="relative px-4 pb-4 pt-0 sm:px-5 sm:pb-4 lg:px-6">
        <div className="relative mt-0 h-[3px] w-full overflow-hidden rounded-b-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_20px_rgba(34,211,238,0.45),0_0_40px_rgba(59,130,246,0.25)] dark:shadow-[0_0_24px_rgba(34,211,238,0.35)]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80 dark:opacity-40" />
        </div>

        <div className="mt-3 flex items-start justify-between gap-2 border-b border-white/40 pb-2.5 dark:border-white/[0.08]">
          <div className="min-w-0 pr-1">
            <p className="text-[10px] font-bold uppercase leading-snug tracking-[0.18em] text-blue-600/95 drop-shadow-sm dark:text-cyan-200/90">
              {resolved.eyebrow}
            </p>
            <h2 className="mt-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-xl font-black tracking-tight text-transparent sm:text-[1.35rem] dark:from-white dark:via-slate-100 dark:to-slate-400">
              {resolved.title}
            </h2>
          </div>
          <span className="shrink-0 rounded-full border border-white/60 bg-white/45 px-2.5 py-1 text-[10px] font-bold text-blue-900 shadow-[0_2px_12px_-4px_rgba(37,99,235,0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)] backdrop-blur-md transition-transform duration-300 group-hover/card:scale-[1.03] dark:border-blue-400/30 dark:bg-blue-950/50 dark:text-blue-50 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]">
            {resolved.durationPill}
          </span>
        </div>

        {badges && badges.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {badges.map((b, i) => (
              <span
                key={i}
                className="rounded-full border border-white/50 bg-white/35 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] backdrop-blur-sm transition-all hover:border-blue-300/60 hover:bg-white/55 dark:border-white/[0.12] dark:bg-white/[0.08] dark:text-slate-100 dark:shadow-none dark:hover:border-blue-400/35 dark:hover:bg-white/[0.12]"
              >
                {b.text}
              </span>
            ))}
          </div>
        ) : null}

        <ul className="mt-0 divide-y divide-white/35 dark:divide-white/[0.08]">
          {resolved.facts.map((row) => {
            const open = showHint === row.id
            const Icon = row.Icon
            return (
              <li key={row.id}>
                <button
                  type="button"
                  className="group/row flex w-full flex-col items-start gap-1 py-2.5 text-left transition-all duration-300 hover:bg-white/40 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] focus-visible:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 focus-visible:ring-offset-0 dark:hover:bg-white/[0.06] dark:hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] dark:focus-visible:ring-blue-500/35 sm:flex-row sm:items-center sm:gap-2.5 sm:py-2"
                  onMouseEnter={() => setHoverId(row.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() =>
                    setActiveId((c) => (c === row.id ? null : row.id))
                  }
                  aria-expanded={open}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-300 sm:h-9 sm:w-9 ${row.iconWrap} ${open ? 'scale-105 shadow-lg ring-1 ring-white/50 dark:ring-white/15' : 'group-hover/row:scale-105 group-hover/row:shadow-md'}`}
                  >
                    <Icon
                      className="h-[15px] w-[15px] shrink-0 drop-shadow-sm sm:h-4 sm:w-4"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-xs font-medium text-slate-600 sm:text-[13px] dark:text-slate-300">
                    {row.label}
                  </span>
                  <span className="w-full break-words text-left text-xs font-bold text-slate-900 sm:max-w-[52%] sm:shrink-0 sm:text-right sm:text-[13px] dark:text-white">
                    {row.value}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${hintText ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
          aria-live="polite"
        >
          {hintText ? (
            <p className="border-t border-white/30 px-0.5 py-1.5 text-[11px] leading-snug text-slate-600 dark:border-white/[0.06] dark:text-slate-400">
              {hintText}
            </p>
          ) : null}
        </div>

        <div className="relative mt-0.5 overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-r from-white/50 via-cyan-50/30 to-blue-50/40 p-px shadow-[0_8px_24px_-8px_rgba(37,99,235,0.2),inset_0_1px_0_0_rgba(255,255,255,0.65)] backdrop-blur-md transition-all duration-300 hover:border-white/70 hover:shadow-[0_12px_28px_-8px_rgba(37,99,235,0.28)] dark:border-blue-500/20 dark:from-slate-900/60 dark:via-blue-950/40 dark:to-slate-900/60 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] dark:hover:border-blue-400/30">
          <div className="flex flex-wrap items-center justify-between gap-1.5 rounded-[15px] bg-white/30 px-3 py-2 text-xs dark:bg-transparent">
            <span className="flex min-w-0 items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-400/95">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-400/15 text-emerald-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] dark:border-emerald-500/25 dark:bg-emerald-500/15 dark:text-emerald-200">
                <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="truncate">{resolved.subsidyText}</span>
            </span>
            <span className="shrink-0 bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text font-black text-transparent dark:from-blue-300 dark:to-cyan-300">
              {resolved.priceText}
            </span>
          </div>
        </div>

        <div className="relative mt-2.5 overflow-hidden rounded-2xl border border-white/45 bg-white/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_4px_20px_-8px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/[0.1] dark:bg-white/[0.05] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 to-transparent dark:from-white/[0.04] dark:to-transparent" />
          <div
            className={`relative grid divide-x divide-white/40 py-2 dark:divide-white/[0.08] ${statGridClass}`}
          >
            {resolved.stats.slice(0, 3).map((s, i) => (
              <AnimatedStat key={s.label + i} {...s} active={inView} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
