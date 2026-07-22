'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { BookmarkCheck, UserPlus } from 'lucide-react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { Alert, MarketingContainer, Section, GreenButton, BrandVibrantButton, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { addDaysUTC, parseEstonianDateRange, toYyyyMmDdUTC, weekLabelFromEstonianDateString } from '@/lib/dates/estonianTrainingDates'

export type CohortStatusTone = 'active' | 'upcoming' | 'finished'

function resolveRegistrationHref(cohort: CohortRow): string {
  const raw = cohort.buttonUrl?.trim()
  if (raw) return raw
  if (cohort.id) return `/register?cohort=${encodeURIComponent(cohort.id)}`
  return '/register'
}

function isSameSitePathHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}

function generateIcsDataUri(cohort: CohortRow): string | null {
  if (!cohort.trainingDates?.length) return null

  const title = cohort.trainingTitle || cohort.name || 'Koolitus'
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Andres Kase//NONSGML v1.0//EN',
  ]

  cohort.trainingDates.forEach((day, index) => {
    if (!day.date) return
    const dateStr = day.date.replace(/-/g, '')
    const uid = `${cohort.id || 'koolitus'}-day-${index}-${dateStr}@andreskase.ee`

    const startTimeStr = day.startTime ? day.startTime.replace(':', '') + '00' : '090000'
    const endTimeStr = day.endTime ? day.endTime.replace(':', '') + '00' : '170000'
    
    const start = `${dateStr}T${startTimeStr}`
    const end = `${dateStr}T${endTimeStr}`
    
    icsContent.push('BEGIN:VEVENT')
    icsContent.push(`UID:${uid}`)
    icsContent.push(`DTSTAMP:${dateStr}T000000Z`)
    icsContent.push(`DTSTART;TZID=Europe/Tallinn:${start}`)
    icsContent.push(`DTEND;TZID=Europe/Tallinn:${end}`)
    icsContent.push(`SUMMARY:${title} - Päev ${index + 1}`)
    if (day.location || cohort.location) {
      icsContent.push(`LOCATION:${day.location || cohort.location}`)
    }
    icsContent.push('END:VEVENT')
  })

  icsContent.push('END:VCALENDAR')
  
  const icsString = icsContent.join('\r\n')
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsString)}`
}

function buildGoogleCalendarUrl(args: {
  title: string
  location?: string
  datesLabel?: string
}): string {
  const range = parseEstonianDateRange(args.datesLabel)

  const detailsParts = [args.datesLabel, args.location].filter(Boolean)

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: args.title,
  })
  if (range) {
    const start = toYyyyMmDdUTC(range.start)
    const endExclusive = toYyyyMmDdUTC(addDaysUTC(range.end, 1))
    params.set('dates', `${start}/${endExclusive}`)
  }
  if (detailsParts.length) params.set('details', detailsParts.join('\n'))
  if (args.location) params.set('location', args.location)

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export interface CohortRow {
  id?: string
  /** Main training name (e.g. LEAN Edasijõudnud) */
  name?: string
  trainingTitle?: string
  location?: string
  dates?: string
  daysUntil?: string
  timing?: 'soon' | 'mid' | 'flex'
  badges?: Array<{
    text?: string
    type?: 'urgent' | 'open' | 'pre' | 'rec'
  }>
  spotsAvailable?: number
  spotsTotal?: number
  /** Filled count for progress (if set, overrides spotsTotal - spotsAvailable for numerator) */
  spotsFilled?: number
  socialProof?: {
    initials?: string[]
    text?: string
  }
  countdown?: string
  buttonText?: string
  buttonStyle?: 'primary' | 'secondary' | 'outline'
  /** Table CTA: orange = urgent reserve, blue = register, muted = past */
  ctaVariant?: 'orange' | 'blue' | 'disabled'
  calendarLabel?: string
  calendarLinks?: string[]
  trainingDates?: Array<{
    date?: string
    startTime?: string
    endTime?: string
    location?: string
  }>
  preRegistrationInfo?: string
  preRegistrationBenefits?: string[]
  statusLabel?: string
  statusTone?: CohortStatusTone
  price?: string
  /** e.g. subsidy line in green */
  priceNote?: string
  /** Left accent bar (urgent cohort) */
  isHighlighted?: boolean
  /** Row looks disabled (finished) */
  isCompleted?: boolean
  /** Registration / booking link (Facebook event, form, `/register`, …). Empty → `/register?cohort=` + id when id set. */
  buttonUrl?: string
}

export interface CohortsSectionProps {
  eyebrow?: string
  title?: string
  filterLabel?: string
  filters?: Array<{
    label?: string
    value?: string
    active?: boolean
  }>
  cohorts?: CohortRow[]
  maxParticipantsNote?: string
  jtbdSection?: {
    title?: string
    subtitle?: string
    buttons?: Array<{
      label?: string
      icon?: string
      response?: string
    }>
  }
  /** Dark bar + check — social proof / urgency */
  alertBanner?: {
    message: string
  }
  /** Light green footer strip (Töötukassa etc.) */
  subsidyFooter?: {
    text: string
    linkText?: string
    linkHref?: string
  }
  /** Three cards under table — overrides jtbd layout when set */
  chooserSection?: {
    title: string
    cards: Array<{
      eyebrow: string
      title: string
      description: string
    }>
  }
  backgroundColor?: string
}

const DEFAULT_COHORT_FILTERS: NonNullable<CohortsSectionProps['filters']> = [
  { label: 'Kõik', value: 'all', active: true },
  { label: 'Lähima 3 kuu jooksul', value: 'soon' },
  { label: '3–6 kuu pärast', value: 'mid' },
  { label: 'Paindlik', value: 'flex' },
]

const DEFAULT_COHORT_ROWS: NonNullable<CohortsSectionProps['cohorts']> = [
  {
    id: 'apr24',
    trainingTitle: 'LEAN Edasijõudnud',
    location: 'Tallinn, Nordic Hotel Forum',
    name: 'LEAN Edasijõudnud',
    dates: '22. aprill 2024 kuni 24. aprill 2024',
    daysUntil: 'Alguseni: 12 päeva',
    timing: 'soon',
    statusLabel: 'Aktiivne',
    statusTone: 'active',
    isHighlighted: true,
    badges: [{ text: '2 kohta veel', type: 'urgent' }],
    spotsAvailable: 2,
    spotsTotal: 20,
    spotsFilled: 18,
    price: '€1 290',
    priceNote: '≈€258 pärast toetust',
    buttonText: 'Hoia koht kinni',
    ctaVariant: 'orange',
    calendarLabel: 'Lisa kalendrisse',
    calendarLinks: ['Google', 'Outlook', '.ics'],
    countdown: 'Grupp täitus eile — uus grupp avatud',
  },
  {
    id: 'mai24',
    trainingTitle: 'LEAN Põhikoolitus',
    location: 'Tartu, Tasku keskus',
    name: 'LEAN Põhikoolitus',
    dates: '15. mai 2024 kuni 17. mai 2024',
    timing: 'mid',
    statusLabel: 'Tulemas',
    statusTone: 'upcoming',
    spotsAvailable: 8,
    spotsTotal: 20,
    spotsFilled: 12,
    price: '€990',
    priceNote: '≈€198 pärast toetust',
    buttonText: 'Registreeru',
    ctaVariant: 'blue',
    calendarLabel: 'Lisa kalendrisse',
    calendarLinks: ['Google', '.ics'],
  },
  {
    id: 'past',
    trainingTitle: 'LEAN Põhikoolitus',
    location: 'Tallinn',
    name: 'LEAN Põhikoolitus',
    dates: '10. märts 2024 kuni 12. märts 2024',
    timing: 'flex',
    statusLabel: 'Lõpetatud',
    statusTone: 'finished',
    isCompleted: true,
    spotsAvailable: 0,
    spotsTotal: 20,
    spotsFilled: 20,
    price: '€990',
    buttonText: 'Grupp täis',
    ctaVariant: 'disabled',
  },
]

function PinIcon(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function LightningIcon(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  )
}

function CheckSquareIcon(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4" strokeLinecap="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2 2 4.5-4.5" />
    </svg>
  )
}

function SparkleIcon(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
    </svg>
  )
}

function CalendarIcon(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function inferStatus(cohort: CohortRow): { label: string; tone: CohortStatusTone } {
  if (cohort.statusLabel && cohort.statusTone) {
    return { label: cohort.statusLabel, tone: cohort.statusTone }
  }
  if (cohort.isCompleted) return { label: 'Lõpetatud', tone: 'finished' }
  const types = cohort.badges?.map((b) => b.type) || []
  if (types.includes('urgent') || cohort.timing === 'soon') return { label: 'Aktiivne', tone: 'active' }
  if (types.includes('pre')) return { label: 'Tulemas', tone: 'upcoming' }
  return { label: 'Tulemas', tone: 'upcoming' }
}

function inferCtaVariant(cohort: CohortRow): 'orange' | 'blue' | 'disabled' {
  if (cohort.ctaVariant) return cohort.ctaVariant
  if (cohort.isCompleted) return 'disabled'
  const urgent = cohort.badges?.some((b) => b.type === 'urgent') || cohort.isHighlighted
  if (urgent || cohort.timing === 'soon') return 'orange'
  return 'blue'
}

function progressMeta(cohort: CohortRow) {
  const total = cohort.spotsTotal ?? 0
  const avail = cohort.spotsAvailable ?? 0
  const filled = cohort.spotsFilled ?? (total > 0 ? total - avail : 0)
  const pct = total > 0 ? Math.min(100, Math.max(0, (filled / total) * 100)) : 0
  const spotsLeft = avail
  return { total, filled, pct, spotsLeft }
}

function progressBarColor(tone: CohortStatusTone, pct: number, spotsLeft: number) {
  if (tone === 'finished') return 'bg-slate-300 dark:bg-slate-600'
  if (spotsLeft <= 0) return 'bg-red-500'
  if (pct >= 85) return 'bg-amber-500'
  if (pct >= 50) return 'bg-emerald-500'
  return 'bg-emerald-400'
}

export default function CohortsSection({
  eyebrow = 'Kohordid',
  title = 'Grupid ja koolituspäevad',
  filterLabel = 'Millal saad olla 9 päevaks eemal?',
  filters = DEFAULT_COHORT_FILTERS,
  cohorts = DEFAULT_COHORT_ROWS,
  maxParticipantsNote = 'Grupis on alati max 16–20 osalejat. Töötukassa toetus kuni 80%.',
  jtbdSection = {
    title: 'Millist koolitust valida?',
    subtitle: 'Vali tase vastavalt oma kogemusele ja eesmärkidele.',
    buttons: [],
  },
  alertBanner,
  subsidyFooter = {
    text: 'Töötukassa koolitustoetus kuni 80% — kontrolli oma õigust enne registreerumist.',
    linkText: 'Kontrolli õigust',
    linkHref: '#',
  },
  chooserSection,
  backgroundColor = 'bg-transparent',
}: CohortsSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedJtbd, setSelectedJtbd] = useState<string | null>(null)

  const filterList = filters != null && filters.length > 0 ? filters : DEFAULT_COHORT_FILTERS
  const cohortList = cohorts != null ? cohorts : DEFAULT_COHORT_ROWS

  const resolvedAlert = useMemo(() => {
    if (alertBanner?.message) return alertBanner
    const urgent = cohortList.find((c) => c.badges?.some((b) => b.type === 'urgent') || c.isHighlighted)
    if (urgent?.socialProof?.text) return { message: urgent.socialProof.text }
    if (urgent?.countdown) return { message: urgent.countdown }
    return null
  }, [alertBanner, cohortList])

  const resolvedChooser = useMemo(() => {
    if (chooserSection?.cards?.length) return chooserSection
    const btns = jtbdSection?.buttons || []
    if (btns.length >= 3) {
      return {
        title: jtbdSection?.title || 'Millist koolitust valida?',
        cards: btns.slice(0, 3).map((b, i) => ({
          eyebrow: i === 0 ? 'ALGTASE • €990' : i === 1 ? 'EDASIJÕUDNUD • €1 290' : 'JUHTIMINE • €1 490',
          title: b.label || '',
          description: (b.response || '').replace(/\s+/g, ' ').slice(0, 140) + (b.response && b.response.length > 140 ? '…' : ''),
        })),
      }
    }
    return {
      title: jtbdSection?.title || 'Millist koolitust valida?',
      cards: [
        {
          eyebrow: 'ALGTASE • €990',
          title: 'LEAN põhimõtted ja tööriistad',
          description: 'Sul puudub formaalne LEAN kogemus või soovid korrastada põhiteadmisi praktiliste harjutustega.',
        },
        {
          eyebrow: 'EDASIJÕUDNUD • €1 290',
          title: 'Süsteemne probleemide lahendamine',
          description: 'Oled juhtinud LEAN algatusi ja tahad süvendada mõõtmist, A3-d ning juhtimisrutiine.',
        },
        {
          eyebrow: 'JUHTIMINE • €1 490',
          title: 'Strateegiline juhtimine ja muutused',
          description: 'Vastutad muutuste elluviimise eest ja vajad raamistikku juhtkonna kaasamiseks.',
        },
      ],
    }
  }, [chooserSection, jtbdSection])

  const filteredCohorts =
    activeFilter === 'all' ? cohortList : cohortList.filter((cohort) => cohort.timing === activeFilter)

  const handleJtbdClick = (buttonIndex: number) => {
    setSelectedJtbd(selectedJtbd === buttonIndex.toString() ? null : buttonIndex.toString())
  }

  return (
    <Section
      variant="band"
      className="relative overflow-hidden text-slate-800 dark:text-slate-200 bg-transparent"
    >
      {/* Background elements removed per user request */}

      <MarketingContainer elevated>
        {/* ── Section header ────────────────────────────────────── */}
        <div className="mb-12 text-center sm:mb-14">
          {eyebrow ? (
            <div className="mb-4 flex justify-center">
              <EyebrowPillBadge text={eyebrow} />
            </div>
          ) : null}
          <h2 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-[rgb(var(--text-primary))] md:text-5xl">
            {title}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-80" />
        </div>

        {/* ── Alert banner ──────────────────────────────────────── */}
        {resolvedAlert ? (
          <Alert variant="banner" className="mb-8" icon={<CheckSquareIcon className="h-5 w-5" />}>
            {resolvedAlert.message}
          </Alert>
        ) : null}

        {/* ── Filter bar ────────────────────────────────────────── */}
        <div className={`mb-8 flex flex-col gap-4 !p-4 sm:flex-row sm:items-center sm:justify-between ${marketingInsetCardClass}`}>
          <span className="text-sm font-semibold text-slate-600 dark:text-[rgb(var(--text-secondary))]">
            {filterLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {filterList.map((filter, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveFilter(filter.value || 'all')}
                className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all duration-200 ${
                  activeFilter === filter.value
                    ? 'border border-blue-400/40 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_8px_24px_-8px_rgba(59,130,246,0.55)] ring-1 ring-inset ring-white/30 dark:from-[rgb(var(--color-primary))] dark:to-blue-500'
                    : `${marketingMicroPillClass} text-slate-600 hover:border-blue-300/50 hover:text-blue-700 dark:text-slate-300 dark:hover:border-[rgb(var(--color-primary))]/40 dark:hover:text-white`
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main cohorts table card ───────────────────────────── */}
        <div className={`relative overflow-hidden !p-0 ${marketingInsetCardClass}`}>
          {/* Inner shimmer top edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent dark:via-white/20" />

          {/* Desktop column headers */}
          <div
            className="hidden border-b border-white/75 bg-gradient-to-r from-white/30 via-white/15 to-white/30 px-6 py-4
                          text-[10px] font-black uppercase tracking-[0.22em] text-slate-500 backdrop-blur-md
                          lg:grid lg:grid-cols-[minmax(180px,1.15fr)_minmax(160px,1fr)_130px_minmax(140px,0.9fr)_minmax(100px,0.75fr)_minmax(160px,0.95fr)] lg:gap-4
                          dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-slate-500"
          >
            <span className="lg:pl-2">Koolitus</span>
            <span>Kuupäevad</span>
            <span>Staatus</span>
            <span>Osalejad</span>
            <span>Hind</span>
            <span className="text-right">Toiming</span>
          </div>

          <div className="divide-y divide-slate-100/80 dark:divide-white/[0.05]">
            {filteredCohorts.map((cohort) => {
              const { label: statusLabel, tone } = inferStatus(cohort)
              const { total, filled, pct, spotsLeft } = progressMeta(cohort)
              const cta = inferCtaVariant(cohort)
              const titleText = cohort.trainingTitle || cohort.name || '—'
              const disabled = cohort.isCompleted || cta === 'disabled'
              const hasCalendarLink = (cohort.calendarLinks || []).some((l) => (l || '').toLowerCase() === 'google')
              const isIcs = Boolean(cohort.trainingDates?.length)
              const calendarUrl =
                hasCalendarLink && !disabled
                  ? (generateIcsDataUri(cohort) || buildGoogleCalendarUrl({ title: titleText, location: cohort.location, datesLabel: cohort.dates }))
                  : null
              const weekLabel = weekLabelFromEstonianDateString(cohort.dates)
              const registrationHref = resolveRegistrationHref(cohort)
              const registrationUseLink = isSameSitePathHref(registrationHref)

              /* CTA button styles */
              const mutedBtn =
                'cursor-not-allowed bg-slate-100 text-slate-400 ring-1 ring-inset ring-slate-200/80 dark:bg-white/[0.05] dark:text-slate-600 dark:ring-white/[0.06] transition-all duration-200'

              return (
                <div
                  key={cohort.id || cohort.name}
                  className={`group relative px-5 py-7 transition-all duration-300
                    lg:grid lg:grid-cols-[minmax(180px,1.15fr)_minmax(160px,1fr)_130px_minmax(140px,0.9fr)_minmax(100px,0.75fr)_minmax(160px,0.95fr)] lg:items-center lg:gap-4 lg:px-7 lg:py-6
                    hover:bg-gradient-to-r hover:from-white/40 hover:via-white/25 hover:to-white/40
                    dark:hover:from-white/[0.02] dark:hover:via-white/[0.01] dark:hover:to-white/[0.02]
                    ${disabled ? 'opacity-55 grayscale-[0.4]' : ''}
                    ${cohort.isHighlighted && !disabled
                      ? 'bg-gradient-to-r from-amber-50/35 via-white/20 to-orange-50/25 dark:from-amber-500/[0.04] dark:via-transparent dark:to-orange-500/[0.02]'
                      : ''}
                  `}
                >
                  {/* Highlighted left accent bar */}
                  {(cohort.isHighlighted || cta === 'orange') && !disabled ? (
                    <div
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-amber-400 to-orange-500 shadow-[0_0_12px_rgba(245,158,11,0.6)] lg:top-5 lg:bottom-5"
                      aria-hidden
                    />
                  ) : null}

                  {/* Row hover glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/15" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10" />
                  </div>

                  {/* ── Training ── */}
                  <div className="mb-5 lg:mb-0 lg:pl-3">
                    <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 lg:hidden">
                      Koolitus
                    </p>
                    <p className="text-base font-black leading-snug text-slate-900 dark:text-[rgb(var(--text-primary))]">
                      {titleText}
                    </p>
                    {cohort.location ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <PinIcon className="h-3.5 w-3.5 shrink-0" />
                        {cohort.location}
                      </p>
                    ) : null}
                    {cohort.preRegistrationInfo ? (
                      <div
                        className="mt-3 rounded-xl border border-blue-100/80 bg-blue-50/70 p-3 text-xs leading-relaxed text-blue-900
                                      backdrop-blur-sm dark:border-blue-500/15 dark:bg-blue-900/20 dark:text-blue-100"
                      >
                        <span className="font-bold">{cohort.preRegistrationInfo}</span>
                        {cohort.preRegistrationBenefits?.map((b, j) => (
                          <span key={j} className="mt-1 block text-blue-800 dark:text-blue-200">
                            • {b}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {/* ── Dates ── */}
                  <div className="mb-5 lg:mb-0">
                    <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 lg:hidden">
                      Kuupäevad
                    </p>
                    <div className="flex items-start gap-2">
                      <CalendarIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500 dark:text-blue-400" />
                      <div>
                        <p className="text-sm font-semibold leading-relaxed text-slate-800 dark:text-[rgb(var(--text-primary))]">
                          {cohort.dates}
                        </p>
                        {weekLabel ? (
                          <p className="mt-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400">{weekLabel}</p>
                        ) : null}
                        {cohort.daysUntil ? (
                          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{cohort.daysUntil}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* ── Status ── */}
                  <div className="mb-5 flex flex-wrap items-center gap-2 lg:mb-0">
                    <p className="mb-0 w-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 lg:hidden">
                      Staatus
                    </p>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide shadow-sm backdrop-blur-md
                        ${tone === 'active'
                          ? 'border-amber-300/60 bg-amber-50/80 text-amber-800 ring-1 ring-inset ring-amber-200/50 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/15'
                          : tone === 'upcoming'
                            ? 'border-blue-200/60 bg-blue-50/80 text-blue-700 ring-1 ring-inset ring-blue-200/50 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/15'
                            : 'border-slate-200/60 bg-slate-50/80 text-slate-500 ring-1 ring-inset ring-slate-200/50 dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-slate-500 dark:ring-white/[0.06]'
                        }`}
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full shadow-[0_0_6px_currentColor] ${
                          tone === 'active'
                            ? 'bg-amber-500 text-amber-500'
                            : tone === 'upcoming'
                              ? 'bg-blue-500 text-blue-500 dark:bg-[rgb(var(--color-primary))] dark:text-[rgb(var(--color-primary))]'
                              : 'bg-slate-400 text-slate-400'
                        }`}
                      />
                      {statusLabel}
                    </span>
                  </div>

                  {/* ── Participants ── */}
                  <div className="mb-5 lg:mb-0">
                    <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 lg:hidden">
                      Osalejad
                    </p>
                    {total > 0 ? (
                      <>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {filled} / {total} täidetud
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200/60 dark:bg-white/[0.08] dark:ring-white/[0.08]">
                          <div
                            className={`h-full rounded-full shadow-[0_0_6px_currentColor] transition-all duration-700 ${progressBarColor(tone, pct, spotsLeft)}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        {!disabled && spotsLeft > 0 && spotsLeft <= 4 ? (
                          <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                            <LightningIcon className="h-3 w-3" />
                            {spotsLeft} kohta veel
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <p className="text-xs text-slate-400 dark:text-slate-600">—</p>
                    )}
                  </div>

                  {/* ── Price ── */}
                  <div className="mb-5 lg:mb-0">
                    <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 lg:hidden">
                      Hind
                    </p>
                    {cohort.price ? (
                      <>
                        <p className="text-xl font-black leading-tight text-slate-900 dark:text-[rgb(var(--text-primary))]">
                          {cohort.price}
                        </p>
                        {cohort.priceNote ? (
                          <p className="mt-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {cohort.priceNote}
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <p className="text-sm font-semibold text-slate-400">—</p>
                    )}
                  </div>

                  {/* ── Action ── */}
                  <div className="flex flex-col gap-2.5 lg:items-end">
                    <p className="mb-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 lg:hidden">
                      Toiming
                    </p>
                    {disabled ? (
                      <button
                        type="button"
                        disabled
                        className={`w-full rounded-full px-4 py-3 text-center text-sm font-black lg:w-full lg:max-w-[200px] ${mutedBtn}`}
                      >
                        {cohort.buttonText?.replace(/\s*(?:->|=>|→|>|›)\s*$/, '') || 'Registreeru'}
                      </button>
                    ) : cta === 'orange' ? (
                      <GreenButton
                        href={registrationHref}
                        icon={BookmarkCheck}
                        className="w-full lg:max-w-[200px]"
                      >
                        {cohort.buttonText?.replace(/\s*(?:->|=>|→|>|›)\s*$/, '') || 'Hoia koht kinni'}
                      </GreenButton>
                    ) : (
                      <BrandVibrantButton
                        href={registrationHref}
                        icon={UserPlus}
                        className="w-full lg:max-w-[200px]"
                      >
                        {cohort.buttonText?.replace(/\s*(?:->|=>|→|>|›)\s*$/, '') || 'Registreeru'}
                      </BrandVibrantButton>
                    )}
                    
                    {!disabled && (
                      <Link
                        href="/koolitus"
                        className="mt-1 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-center text-[11px] font-black uppercase tracking-wider text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white lg:max-w-[200px]"
                      >
                        Vaata programmi
                      </Link>
                    )}

                    {calendarUrl ? (
                      <a
                        href={calendarUrl}
                        target={isIcs ? undefined : "_blank"}
                        rel={isIcs ? undefined : "noopener noreferrer"}
                        download={isIcs ? `${cohort.id || 'koolitus'}-kalender.ics` : undefined}
                        className="mt-2 flex items-center gap-1.5 text-left text-xs font-bold text-blue-600 underline-offset-2 hover:underline dark:text-[rgb(var(--color-primary))]"
                      >
                        <CalendarIcon className="h-3 w-3 shrink-0" />
                        {cohort.calendarLabel || 'Lisa kalendrisse'}
                        {!isIcs && ' (Google)'}
                      </a>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Inner shimmer bottom edge */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/[0.08]" />
        </div>

        {/* ── Max participants note ─────────────────────────────── */}
        {maxParticipantsNote ? (
          <p className="mt-5 text-center text-xs font-medium text-slate-500 dark:text-slate-500">
            {maxParticipantsNote}
          </p>
        ) : null}

        {/* ── Chooser panel ─────────────────────────────────────── */}
        <div
          className="relative mt-10 overflow-hidden rounded-[32px] border border-white/85
                      bg-gradient-to-br from-blue-50/80 via-white/82 to-indigo-50/55
                      p-7 shadow-[0_32px_80px_-44px_rgba(59,130,246,0.3),0_0_0_1px_rgba(255,255,255,0.75)_inset]
                      backdrop-blur-2xl sm:p-9
                      dark:border-blue-500/[0.14] dark:from-blue-950/40 dark:via-[rgb(var(--bg-secondary))]/40 dark:to-indigo-950/28
                      dark:shadow-[0_28px_76px_-42px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)_inset]"
        >
          {/* Decorative orb inside panel */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-[200px] w-[200px] rounded-full bg-blue-300/20 blur-[70px] dark:bg-blue-600/15" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent dark:via-white/20" />

          <div className="relative mb-7 flex items-start gap-4">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl
                           bg-gradient-to-br from-blue-500/15 to-violet-500/10 text-blue-600
                           ring-1 ring-inset ring-blue-200/60
                           dark:from-[rgb(var(--color-primary))]/25 dark:to-violet-500/15 dark:text-blue-300 dark:ring-white/10"
            >
              <SparkleIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-[rgb(var(--text-primary))]">
                {resolvedChooser.title}
              </h3>
              {jtbdSection?.subtitle ? (
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {jtbdSection.subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-3">
            {resolvedChooser.cards.map((card, i) => (
              <div
                key={i}
                className={`group/card relative overflow-hidden rounded-2xl border border-white/90 bg-white/85 p-5
                              shadow-[0_16px_40px_-24px_rgba(15,23,42,0.28)]
                              backdrop-blur-xl ring-1 ring-inset ring-white/90
                              transition-all duration-300
                              hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(59,130,246,0.25)]
                              dark:border-white/[0.09] dark:bg-[rgb(var(--bg-secondary))]/80
                              dark:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.6)]
                              dark:ring-white/[0.08]
                              dark:hover:border-blue-500/20 dark:hover:bg-[rgb(var(--bg-secondary))]
                              dark:hover:shadow-[0_16px_48px_-20px_rgba(29,97,255,0.25)]`}
              >
                {/* Card inner shimmer */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 dark:via-white/25" />

                {/* Level indicator dot */}
                <div
                  className={`mb-3 h-1 w-8 rounded-full ${
                    i === 0
                      ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                      : i === 1
                        ? 'bg-gradient-to-r from-blue-500 to-violet-500'
                        : 'bg-gradient-to-r from-violet-500 to-purple-600'
                  }`}
                />

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  {card.eyebrow}
                </p>
                <p className="mt-2.5 text-sm font-black leading-snug text-slate-900 dark:text-[rgb(var(--text-primary))]">
                  {card.title}
                </p>
                <p className="mt-2.5 line-clamp-3 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Legacy JTBD tool buttons if many buttons */}
          {(jtbdSection?.buttons?.length || 0) > 3 ? (
            <div className="relative mt-8 border-t border-blue-100/70 pt-6 dark:border-white/[0.08]">
              <div className="flex flex-wrap gap-2">
                {jtbdSection!.buttons!.map((button, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleJtbdClick(index)}
                    className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all duration-200 ${
                      selectedJtbd === index.toString()
                        ? 'border-blue-300/60 bg-blue-50 text-blue-800 shadow-[0_4px_12px_-4px_rgba(59,130,246,0.3)] dark:border-[rgb(var(--color-primary))]/40 dark:bg-white/10 dark:text-white'
                        : 'border-slate-200/80 bg-white/80 text-slate-600 hover:border-blue-200 hover:text-blue-700 dark:hover:text-blue-400 dark:border-white/[0.08] dark:bg-transparent dark:text-slate-400 dark:hover:border-white/15 dark:hover:text-slate-200'
                    }`}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
              {selectedJtbd !== null && jtbdSection?.buttons?.[parseInt(selectedJtbd, 10)]?.response ? (
                <div
                  className="mt-4 rounded-xl border border-blue-100/80 bg-white/90 p-4 text-sm leading-relaxed
                                text-slate-700 backdrop-blur-sm
                                dark:border-white/[0.08] dark:bg-black/25 dark:text-slate-200"
                >
                  {jtbdSection.buttons[parseInt(selectedJtbd, 10)]?.response}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* ── Subsidy footer ────────────────────────────────────── */}
        {subsidyFooter?.text ? (
          <div
            className="relative mt-6 flex flex-col gap-3 overflow-hidden rounded-2xl border border-emerald-200/80
                          bg-gradient-to-r from-emerald-50/90 via-green-50/75 to-teal-50/70
                          px-5 py-4 shadow-[0_16px_44px_-28px_rgba(16,185,129,0.4)]
                          backdrop-blur-xl ring-1 ring-inset ring-white/80
                          sm:flex-row sm:items-center sm:gap-5 sm:px-6
                          dark:border-emerald-500/[0.18] dark:from-emerald-950/45 dark:via-green-950/28 dark:to-teal-950/22
                          dark:shadow-[0_16px_44px_-24px_rgba(0,0,0,0.65)]
                          dark:ring-white/[0.07]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent dark:via-emerald-400/20" />

            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                           bg-gradient-to-br from-emerald-400/20 to-green-500/15 text-emerald-600
                           ring-1 ring-inset ring-emerald-200/60
                           dark:from-emerald-500/20 dark:to-green-500/12 dark:text-emerald-400 dark:ring-emerald-500/20"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>

            <p className="min-w-0 flex-1 text-sm font-medium leading-relaxed text-emerald-900 dark:text-emerald-100/90">
              {subsidyFooter.text}
            </p>

            {subsidyFooter.linkText ? (
              <a
                href={subsidyFooter.linkHref || '#'}
                className="shrink-0 rounded-full border border-emerald-300/70 bg-white/70 px-4 py-2 text-sm font-black text-emerald-800 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:scale-95 active:translate-y-0 dark:border-emerald-500/25 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
              >
                {subsidyFooter.linkText}
              </a>
            ) : null}
          </div>
        ) : null}
      </MarketingContainer>
    </Section>
  )
}
