'use client'

import React, { useEffect, useRef, useState, type FormEvent, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { ChevronRight, CheckCircle2, BookOpen, UserPlus, MailOpen } from 'lucide-react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { Alert, Button, FormField, Input, Label, MarketingContainer, Section, Spinner, BrandVibrantButton, GreenButton, WhiteButton, SplitHeader, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { submitLeadToTelegram } from '@/lib/telegramLeadClient'
import { triggerProgramPdfDownload } from '@/lib/nineDays/programPdfDownload'
import { handleInPageAnchorClick } from '@/lib/smoothScrollToId'

function isParticipantWinCardTitle(title: string): boolean {
  return title.toLowerCase().includes('osaleja saab')
}

function isCompanyWinCardTitle(title: string): boolean {
  const t = title.toLowerCase()
  return (t.includes('juht') && t.includes('võidab')) || t.includes('org võidab') || t.includes('ettevõte võidab')
}

/** Flatten Sanity string, number, locale object, or Portable Text to plain text. */
function cmsFieldToPlainString(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' && !Number.isNaN(value)) return String(value)
  if (Array.isArray(value)) {
    const parts: string[] = []
    for (const node of value) {
      if (!node || typeof node !== 'object') continue
      const n = node as Record<string, unknown>
      if (n._type === 'block' && Array.isArray(n.children)) {
        for (const ch of n.children as Record<string, unknown>[]) {
          if (typeof ch?.text === 'string' && ch.text) parts.push(ch.text)
        }
      } else if (typeof n.text === 'string' && n.text) {
        parts.push(n.text)
      }
    }
    return parts.join(' ').trim()
  }
  if (typeof value === 'object') {
    const o = value as Record<string, unknown>
    for (const key of ['et', 'en', 'fi', 'default']) {
      const v = o[key]
      if (typeof v === 'string' && v.trim()) return v.trim()
    }
    for (const v of Object.values(o)) {
      if (typeof v === 'string' && v.trim()) return v.trim()
    }
  }
  return ''
}

function extractBlockPlainText(block: Record<string, unknown>): string {
  if (!Array.isArray(block.children)) return ''
  const parts: string[] = []
  for (const ch of block.children as Record<string, unknown>[]) {
    if (typeof ch?.text === 'string' && ch.text) parts.push(ch.text)
  }
  return parts.join('').trim()
}

/** Pull discrete list lines from a Sanity Portable Text body (blocks or bullet items). */
function extractPortableTextListItems(body: unknown): string[] {
  if (!Array.isArray(body) || body.length === 0) return []

  const items: string[] = []
  for (const node of body) {
    if (!node || typeof node !== 'object') continue
    const block = node as Record<string, unknown>
    if (block._type !== 'block') continue

    const text = extractBlockPlainText(block)
    if (!text) continue

    if (block.listItem === 'bullet' || block.listItem === 'number') {
      items.push(text)
      continue
    }

    for (const line of text.split(/\n+/)) {
      const trimmed = line.trim()
      if (trimmed) items.push(trimmed)
    }
  }

  if (items.length > 0) return items

  const plain = cmsFieldToPlainString(body)
  if (!plain) return []
  return plain.split(/\n+/).map((line) => line.trim()).filter(Boolean)
}

function parseDayTagBadges(tag: string | undefined): string[] {
  const raw = tag?.trim() ?? ''
  if (!raw) return ['ÕPPEPÄEV']
  return raw
    .split(/[,;|]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.toUpperCase())
}

function formatDayNumber(dayNumber: number): string {
  return String(dayNumber).padStart(2, '0')
}

export interface Habit {
  id: string
  name: string
  popularity: string
}

/** Short label under day button on mobile (matches NineDaysPlan mini). */
function shortDayTag(day: Pick<Day, 'dayNumber' | 'tag' | 'title'>): string {
  const tag = day.tag?.trim() ?? ''
  if (tag.length > 0 && tag.length <= 14) return tag.toUpperCase()
  const title = day.title?.trim() ?? ''
  const sep = title.indexOf(' — ')
  if (sep > 0) {
    const fromTitle = title.slice(0, sep).trim()
    if (fromTitle.length > 0 && fromTitle.length <= 14) return fromTitle.toUpperCase()
  }
  if (day.dayNumber === 1) return 'PÄEV'
  return `PÄEV ${day.dayNumber}`
}

export interface Day {
  dayNumber: number
  habit: string
  tag: string
  title: string
  description: any[] // Portable Text array
  infoCards?: Array<{
    title?: string
    body?: any[]
  }>
  isViewed?: boolean
  isActive?: boolean
  habitsFocus?: string
  companyPain?: string[]
  shortSolution?: string[]
  fullProgram?: any[]
}

export interface Testimonial {
  quote: string
  author: string
  company: string
  position: string
  avatar?: {
    asset: {
      _id: string
      url: string
    }
  }
  rating: number
}

export interface CTASectionData {
  title: string
  description: string
  primaryButton: {
    text: string
    url: string
  }
  secondaryButton?: {
    text: string
    url: string
  }
}

export interface TestimonialsSectionData {
  title: string
  subtitle?: string
  testimonials: Testimonial[]
}

export interface NineDaysProgramProps {
  eyebrow?: string
  title: string
  titleHighlight?: string
  subtitle: string
  habitsQuestionTitle?: string
  habitsQuestionSubtitle?: string
  dayPickerTitle?: string
  viewedCountLabel?: string
  continueButtonText?: string
  dayGoalLabel?: string
  dayFocusLabel?: string
  dayExtraInfoTitle?: string
  nextDayLabel?: string
  finalDayMessage?: string
  dayLinkPrefix?: string
  dayLinkText?: string
  dayLinkHref?: string
  /** Left column: green gradient + white pill CTAs */
  sidebarCtas?: {
    registerText?: string | null
    registerUrl?: string | null
    readMoreText?: string | null
    readMoreUrl?: string | null
  } | null
  /** Primary blue button — rendered ONLY when primaryBtnLink is non-empty. */
  primaryBtnText?: string
  primaryBtnLink?: string
  /** Kui määratud, kasutatakse seda «Loe lähemalt» saatmiseks; muidu /api/telegram-lead. */
  onLeadMagnetSubmit?: (email: string) => void | Promise<void>
  popupTitle?: string
  popupSubtitle?: string
  habits: Habit[]
  days: Day[]
  testimonials: Testimonial[]
  completionSection: {
    title: string
    description: string
    selectedHabits: string[]
    nextCourseInfo: string
    buttonText: string
  }
  faqSection: {
    question: string
    testimonials: Testimonial[]
  }
  ctaSection?: CTASectionData
  testimonialsSection?: TestimonialsSectionData
}

// ─── Component ────────────────────────────────────────────────────────────────

// Inner component to safely use useSearchParams
const NineDaysProgramInner: React.FC<NineDaysProgramProps> = ({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  dayPickerTitle,
  viewedCountLabel,
  continueButtonText,
  dayGoalLabel,
  dayFocusLabel,
  dayExtraInfoTitle,
  nextDayLabel,
  finalDayMessage,
  dayLinkPrefix,
  dayLinkText,
  dayLinkHref,
  sidebarCtas,
  primaryBtnText,
  primaryBtnLink,
  onLeadMagnetSubmit,
  popupTitle,
  popupSubtitle,
  days,
  ctaSection,
  testimonialsSection
}) => {
  const safeText = (value: string | undefined, fallback: string) => {
    if (!value) return fallback
    const trimmed = value.trim()
    const looksLikePlaceholder = /^[-–—._\s]+$/.test(trimmed)
    return trimmed.length > 0 && !looksLikePlaceholder ? trimmed : fallback
  }

  const fallbackDays: Day[] = [
    {
      dayNumber: 1,
      habit: 'Nähtav probleemide lahendamine',
      tag: 'Vundament',
      title: 'LEAN mõtteviisi alus',
      description: [{ _type: 'block', children: [{ _type: 'span', text: 'Õpid märkama raiskamist, kaardistama voogu ja looma esimese parendusplaani.' }] }],
    },
    {
      dayNumber: 2,
      habit: 'Andmepõhine juhtimine',
      tag: 'Praktika',
      title: 'Mõõdikud ja juhtimislauad',
      description: [{ _type: 'block', children: [{ _type: 'span', text: 'Seadistad praktilised KPI-d ja õpid tegema otsuseid faktide, mitte oletuste põhjal.' }] }],
    },
    {
      dayNumber: 3,
      habit: 'Pidev parendamine',
      tag: 'Kinnistamine',
      title: 'Rutiinid, mis jäävad tööle',
      description: [{ _type: 'block', children: [{ _type: 'span', text: 'Koostad 30-päevase juurutusplaani, et õpitu annaks päris tulemuse sinu tehases.' }] }],
    },
  ]

  const fallbackTestimonials: Testimonial[] = [
    { quote: 'Programm andis kohe rakendatavad tööriistad.', author: 'Mart Kask', company: 'ABB Estonia', position: 'Tootmisjuht', rating: 5 },
    { quote: 'Nägin tulemusi juba esimese kuu jooksul.', author: 'Katrin Lõhmus', company: 'Cleveron', position: 'Operatsioonijuht', rating: 5 },
  ]

  const rawTitle = safeText(title, '9-päevane programm, mis muudab harjumusi')
  const explicitHighlight = safeText(titleHighlight, '')
  const splitTitle = rawTitle.includes('|') ? rawTitle.split('|').map((part) => part.trim()) : []
  let effectiveTitle = splitTitle.length > 1 ? splitTitle[0] : rawTitle
  let effectiveTitleHighlight = explicitHighlight || (splitTitle.length > 1 ? splitTitle.slice(1).join(' | ') : '')

  // If CMS has only one title field, auto-split it into 2 visual parts.
  if (!effectiveTitleHighlight) {
    const words = rawTitle.split(/\s+/).filter(Boolean)
    if (words.length >= 4) {
      const midpoint = Math.ceil(words.length / 2)
      effectiveTitle = words.slice(0, midpoint).join(' ')
      effectiveTitleHighlight = words.slice(midpoint).join(' ')
    }
  }
  const effectiveSubtitle = safeText(subtitle, 'Praktiline teekond, mis aitab sul viia LEAN põhimõtted päriselt tööle.')
  const effectiveDayPickerTitle = safeText(dayPickerTitle, 'Mis päev sind huvitab?')
  const effectiveViewedCountLabel = safeText(viewedCountLabel, 'päeva vaadatud')
  const effectiveContinueButtonText = safeText(continueButtonText, 'Jätka →')
  const effectiveDayGoalLabel = safeText(dayGoalLabel, 'Päeva eesmärk')
  const effectiveDayFocusLabel = safeText(dayFocusLabel, 'Harjumus fookuses')
  const effectiveDayExtraInfoTitle = safeText(dayExtraInfoTitle, 'Lisainfo päevast')
  const effectiveNextDayLabel = safeText(nextDayLabel, 'Järgmine päev')
  const effectiveFinalDayMessage = safeText(finalDayMessage, 'Oled viimase päeva juures. Aeg minna rakendusse!')
  const effectiveDayLinkPrefix = safeText(dayLinkPrefix, 'Päev {day} kõlab huvitavalt?')
  const effectiveDayLinkText = safeText(dayLinkText, 'Registreeru ja ela see päev ise läbi.')
  const effectiveDayLinkHref = safeText(dayLinkHref, '/register')
  const effectivePopupTitle = safeText(
    popupTitle,
    'Saadame programmi sulle e-kirjaga märgitud aadressile.',
  )
  const effectivePopupSubtitle = safeText(
    popupSubtitle,
    'Vormi saatmisega kinnitad, et nõustud oma kontaktandmete jagamisega.',
  )

  // Primary CTA scrolls to the pricing / hinnastamine block on the same page.
  let registerUrl = safeText(sidebarCtas?.registerUrl ?? undefined, '#pricing')
  if (
    registerUrl === '#' ||
    registerUrl === '#cohorts' ||
    registerUrl === '/register' ||
    registerUrl.startsWith('/register?')
  ) {
    registerUrl = '#pricing'
  }

  const effectiveSidebarCtas = {
    registerText: safeText(sidebarCtas?.registerText ?? undefined, 'Registreeru programmi'),
    registerUrl,
    readMoreText: safeText(sidebarCtas?.readMoreText ?? undefined, 'Loe lähemalt'),
    readMoreUrl: safeText(sidebarCtas?.readMoreUrl ?? undefined, '/product'),
  }

  const registerHrefIsInternal = /^\/(?!\/)/.test(effectiveSidebarCtas.registerUrl)
  const registerIsPricingAnchor =
    effectiveSidebarCtas.registerUrl === '#pricing' ||
    effectiveSidebarCtas.registerUrl === '#hinnastamine' ||
    effectiveSidebarCtas.registerUrl.endsWith('#pricing') ||
    effectiveSidebarCtas.registerUrl.endsWith('#hinnastamine')

  const normalizedDays = (days || [])
    .map((day, idx) => {
      const cards =
        Array.isArray(day?.infoCards)
          ? day.infoCards
              .map((card: any) => ({
                title: safeText(cmsFieldToPlainString(card?.title), ''),
                body: Array.isArray(card?.body) ? card.body : [],
              }))
              .filter((card: any) => card.title || card.body.length > 0)
          : []

      return {
        dayNumber: typeof day?.dayNumber === 'number' && day.dayNumber > 0 ? day.dayNumber : idx + 1,
        habit: safeText(day?.habit, 'Praktiline LEAN-harjumus'),
        tag: safeText(day?.tag, 'Õppepäev'),
        title: safeText(day?.title, `Päev ${idx + 1}`),
        description: Array.isArray(day?.description) && day.description.length > 0
          ? day.description
          : [{ _type: 'block', children: [{ _type: 'span', text: 'Selle päeva detailid saad peagi lisada Sanitysse.' }] }],
        infoCards: cards,
        habitsFocus: day?.habitsFocus,
        companyPain: day?.companyPain,
        shortSolution: day?.shortSolution,
        fullProgram: day?.fullProgram,
      }
    })
    .filter((day) => day.dayNumber > 0)
  const effectiveDays = normalizedDays.length > 0 ? normalizedDays : fallbackDays

  const effectiveCta = ctaSection
    ? {
        title: safeText(ctaSection.title, 'Kas oled valmis järgmisele tasemele liikuma?'),
        description: safeText(ctaSection.description, 'Vali sobiv alguspunkt ja rakenda LEAN põhimõtteid süsteemselt.'),
        primaryButton: {
          text: safeText(ctaSection.primaryButton?.text, 'Registreeru'),
          url: safeText(ctaSection.primaryButton?.url, '#'),
        },
        secondaryButton: ctaSection.secondaryButton
          ? {
              text: safeText(ctaSection.secondaryButton.text, 'Küsi lisainfot'),
              url: safeText(ctaSection.secondaryButton.url, '#'),
            }
          : undefined,
      }
    : undefined

  const effectiveTestimonialsSection = testimonialsSection
    ? {
        title: safeText(testimonialsSection.title, 'Osalejate kogemuslood'),
        subtitle: testimonialsSection.subtitle ? safeText(testimonialsSection.subtitle, '') : undefined,
        testimonials:
          testimonialsSection.testimonials?.length > 0
            ? testimonialsSection.testimonials.map((t) => ({
                quote: safeText(t.quote, 'Programm oli väga praktiline ja andis kiire tulemuse.'),
                author: safeText(t.author, 'Osaleja'),
                company: safeText(t.company, 'Ettevõte'),
                position: safeText(t.position, 'Juht'),
                avatar: t.avatar,
                rating: typeof t.rating === 'number' && t.rating > 0 ? t.rating : 5,
              }))
            : fallbackTestimonials,
      }
    : undefined

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const defaultDay = searchParams.get('day') ? parseInt(searchParams.get('day') as string, 10) : 1

  const [activeDay, setActiveDay] = useState<number>(defaultDay)
  const [viewedDays, setViewedDays] = useState<number[]>([1, defaultDay])
  // Registration Contact Modal States
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactInput, setContactInput] = useState('')
  const [contactError, setContactError] = useState('')
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [pendingTargetUrl, setPendingTargetUrl] = useState('')
  const [pendingBtnText, setPendingBtnText] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  // Sync activeDay with URL param on mount and when URL changes
  useEffect(() => {
    const dayParam = searchParams.get('day')
    if (dayParam) {
      const dayNum = parseInt(dayParam, 10)
      if (!isNaN(dayNum)) {
        setActiveDay(dayNum)
        setViewedDays(prev => Array.from(new Set([...prev, dayNum])))
      }
    }
  }, [searchParams])

  const [leadMagnetOpen, setLeadMagnetOpen] = useState(false)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadPending, setLeadPending] = useState(false)
  const [leadSent, setLeadSent] = useState(false)
  const [leadError, setLeadError] = useState('')
  const [pdfDownloadStarted, setPdfDownloadStarted] = useState(false)

  const dayContentRef = useRef<HTMLDivElement>(null)
  const dayHeaderRef = useRef<HTMLDivElement>(null)
  const dayPickerStickyRef = useRef<HTMLDivElement>(null)
  const dayScrollRef = useRef<HTMLDivElement>(null)
  const dayItemRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const skipInitialDayScrollRef = useRef(true)

  const scrollDayContentIntoView = () => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(max-width: 1023px)').matches) return

    const target = dayHeaderRef.current ?? dayContentRef.current
    if (!target) return

    const siteHeaderPx = 56
    const pickerHeight = dayPickerStickyRef.current?.getBoundingClientRect().height ?? 0
    const offset = siteHeaderPx + pickerHeight + 12
    const top = target.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(min-width: 1024px)').matches) return

    const container = dayScrollRef.current
    const item = dayItemRefs.current[activeDay]
    if (!container || !item) return

    const timer = setTimeout(() => {
      const maxScroll = container.scrollWidth - container.clientWidth
      const target = item.offsetLeft - (container.clientWidth - item.offsetWidth) / 2
      container.scrollTo({
        left: Math.max(0, Math.min(target, maxScroll)),
        behavior: 'smooth',
      })
    }, 0)

    return () => clearTimeout(timer)
  }, [activeDay])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(max-width: 1023px)').matches) return
    if (skipInitialDayScrollRef.current) {
      skipInitialDayScrollRef.current = false
      return
    }

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollDayContentIntoView())
    })
    return () => window.cancelAnimationFrame(id)
  }, [activeDay])

  async function handleLeadMagnetSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = leadEmail.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setLeadError('Palun sisesta kehtiv e-posti aadress.')
      return
    }
    setLeadError('')
    setLeadPending(true)
    try {
      if (onLeadMagnetSubmit) {
        await onLeadMagnetSubmit(trimmed)
      } else {
        await submitLeadToTelegram(trimmed, 'nine-days-program')
      }
      const downloaded = await triggerProgramPdfDownload()
      setPdfDownloadStarted(downloaded)
      setLeadSent(true)
      setLeadEmail('')
    } catch (err) {
      const status = (err as Error & { status?: number }).status
      if (status === 503) {
        setLeadError('Teenus pole veel seadistatud. Lisa TELEGRAM_BOT_TOKEN ja TELEGRAM_CHAT_ID.')
      } else {
        setLeadError('Saatmine ebaõnnestus. Palun proovi uuesti.')
      }
    } finally {
      setLeadPending(false)
    }
  }

  const selectDay = (dayNumber: number) => {
    setViewedDays((prev) => Array.from(new Set([...prev, activeDay, dayNumber])))
    setActiveDay(dayNumber)
    const params = new URLSearchParams(searchParams.toString())
    params.set('day', dayNumber.toString())
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const currentDay = effectiveDays.find(d => d.dayNumber === activeDay) || effectiveDays[0]
  const currentDayIndex = Math.max(0, effectiveDays.findIndex((d) => d.dayNumber === currentDay?.dayNumber))
  const nextDay = effectiveDays[currentDayIndex + 1] || null
  const currentDayInfoCards = currentDay?.infoCards ?? []
  const shortSolutionItems =
    (currentDay?.shortSolution || []).length > 0
      ? currentDay!.shortSolution!
      : ['Kolm juhtimistasandit ühes rütmis', 'Väärtusvoo nägemine tervikuna', 'Prioriteetide juhtimine ja tootmisrütm']
  const participantWinCard = currentDayInfoCards.find((card) => isParticipantWinCardTitle(card.title || ''))
  const companyWinCard = currentDayInfoCards.find((card) => isCompanyWinCardTitle(card.title || ''))
  const participantWinText = cmsFieldToPlainString(participantWinCard?.body)
    || 'Kaardistab oma juhtimissüsteemi ja määratleb rolli selles selgelt'
  const companyWinText = cmsFieldToPlainString(companyWinCard?.body)
    || 'Selgem struktuur, kiirem otsustamine, vähem segadust'
  const participantBenefitItems = extractPortableTextListItems(participantWinCard?.body)
  const companyBenefitItems = extractPortableTextListItems(companyWinCard?.body)
  const dayObjectiveText = currentDay?.habitsFocus || currentDay?.habit || ''
  const dayTagBadges = parseDayTagBadges(currentDay?.tag)
  const viewedDayCount = viewedDays.length
  const totalDayCount = effectiveDays.length
  const progressPercentage = totalDayCount ? (viewedDayCount / totalDayCount) * 100 : 0
  const dayPositionPercentage = totalDayCount
    ? Math.round((currentDay.dayNumber / totalDayCount) * 100)
    : 0
  const dayLinkPrefixText = effectiveDayLinkPrefix.replace(/\{day\}/g, String(currentDay.dayNumber))

  const continueToNextDay = () => {
    if (nextDay) {
      selectDay(nextDay.dayNumber)
    }
  }

  const handleRegisterClick = (
    e: React.MouseEvent<Element>,
    targetUrl: string,
    btnText: string
  ) => {
    e.preventDefault()
    setPendingTargetUrl(targetUrl)
    setPendingBtnText(btnText)
    setContactInput('')
    setContactError('')
    setIsSuccess(false)
    setIsContactModalOpen(true)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = contactInput.trim()
    if (!trimmed) {
      setContactError('Palun sisesta kontaktandmed!')
      return
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    const digits = trimmed.replace(/\D/g, '')
    const isPhone = digits.length >= 7 && digits.length <= 15

    if (!isEmail && !isPhone) {
      setContactError('Palun sisesta kehtiv e-posti aadress või telefoninumber!')
      return
    }

    setContactError('')
    setContactSubmitting(true)

    const payload = {
      selectedProblems: [],
      customGoal: currentDay
        ? `Vaadatud päev: Päev ${currentDay.dayNumber} - ${currentDay.title}`
        : `Päeva pole valitud`,
      contact: trimmed,
      buttonClicked: pendingBtnText,
      title: '9 päeva. Üks süsteem.',
    }

    try {
      await fetch('/api/audience-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setIsSuccess(true)
    } catch (err) {
      console.error('Failed to submit 9-days lead to Telegram', err)
    } finally {
      setContactSubmitting(false)
    }
  }

  const panel = marketingInsetCardClass
  const dayPickerPanel = `${marketingInsetCardClass} border-2`
  const microPill = marketingMicroPillClass

  return (
    <Section variant="band">
      <MarketingContainer elevated>

        <div className="mb-5 sm:mb-6 lg:mb-8">
          <SplitHeader
            title={effectiveTitleHighlight ? `${effectiveTitle}, ${effectiveTitleHighlight}` : effectiveTitle}
            eyebrow={eyebrow ? <EyebrowPillBadge text={eyebrow} /> : undefined}
            subtitle={effectiveSubtitle}
            align="responsive"
            className="max-w-4xl"
          />
        </div>

        {/* ── Main journey grid ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-5">

          {/* Left column: day picker on top, unified content card below */}
          <div className="flex flex-col gap-4 order-1 lg:col-start-1 lg:self-start">

          {/* ── Day picker — sticky on mobile ──────────────────────────── */}
          <div
            ref={dayPickerStickyRef}
            className="sticky top-14 z-20 shrink-0 lg:static lg:top-auto lg:z-auto"
          >
            <div className={`${dayPickerPanel} p-3 sm:p-4 lg:p-5`}>
              <div className="mb-2 flex items-center justify-between gap-2 lg:mb-3">
                <span className="text-xs font-semibold text-[rgb(var(--text-primary))] sm:text-sm">
                  {effectiveDayPickerTitle}
                </span>
              </div>

              {/* Days: mobile — swipeable strip (NineDaysPlan mini); lg+ — full-width row */}
              <div className="relative min-w-0 max-lg:overflow-x-clip max-lg:rounded-xl max-lg:border max-lg:border-[rgb(var(--border))]/60 max-lg:bg-gradient-to-b max-lg:from-slate-50/95 max-lg:to-slate-100/90 max-lg:p-2.5 max-lg:shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:max-lg:border-white/10 dark:max-lg:from-slate-900/50 dark:max-lg:to-slate-800/40">
                <div
                  ref={dayScrollRef}
                  className="flex min-w-0 items-stretch gap-2 overflow-x-auto overscroll-x-contain px-0.5 py-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] snap-x snap-mandatory touch-auto [&::-webkit-scrollbar]:hidden lg:w-full lg:justify-between lg:gap-0 lg:overflow-visible lg:px-1 lg:snap-none lg:touch-auto"
                >
                  {effectiveDays.map((day) => {
                    const isActive = activeDay === day.dayNumber
                    const isDone = !isActive && viewedDays.includes(day.dayNumber)
                    const isViewed = viewedDays.includes(day.dayNumber)

                    return (
                      <div
                        key={day.dayNumber}
                        ref={(el) => {
                          dayItemRefs.current[day.dayNumber] = el
                        }}
                        className={`flex min-w-[3.5rem] shrink-0 snap-center flex-col items-center gap-1.5 sm:min-w-[4.25rem] lg:min-w-0 lg:flex-1 lg:shrink lg:snap-align-none ${
                          isActive ? 'lg:z-10' : ''
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => selectDay(day.dayNumber)}
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold transition-all duration-300 ease-out lg:h-10 lg:w-10 lg:text-sm lg:font-black lg:duration-200 ${
                            isActive
                              ? 'day-active-vibrant z-10 text-white shadow-lg lg:scale-110 lg:bg-gradient-to-br lg:from-blue-500 lg:to-indigo-600 lg:shadow-[0_10px_24px_-10px_rgba(99,102,241,0.6)]'
                              : isDone
                                ? 'day-button-visited lg:bg-gradient-to-br lg:from-emerald-400 lg:to-teal-500 lg:shadow-[0_8px_20px_-8px_rgba(16,185,129,0.5)]'
                                : 'day-button-inactive hover:border-blue-400 lg:bg-[rgb(var(--bg-primary))] lg:text-[rgb(var(--text-primary))] lg:border lg:border-[rgb(var(--border))] lg:hover:text-blue-600 lg:hover:scale-105'
                          }`}
                          aria-label={`Vali päev ${day.dayNumber}: ${day.title}`}
                          aria-current={isActive ? 'true' : undefined}
                        >
                          {isDone ? (
                            <span className="flex items-center justify-center">
                              <svg viewBox="0 0 12 12" fill="none" className="h-4 w-4 lg:h-4 lg:w-4" aria-hidden>
                                <path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          ) : (
                            day.dayNumber
                          )}
                        </button>

                        <span
                          className={`max-w-[3.5rem] line-clamp-2 text-center text-[8px] font-bold uppercase leading-tight tracking-wide transition-colors sm:max-w-[4.5rem] sm:text-[9px] lg:hidden ${
                            isActive
                              ? 'text-[#2563EB] dark:text-blue-300'
                              : isViewed
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {shortDayTag(day)}
                        </span>

                        <div
                          className={`h-1.5 w-1.5 rounded-full transition-all duration-500 lg:hidden ${
                            isViewed
                              ? `scale-100 ${isActive ? 'bg-[#2563EB]' : 'bg-emerald-500'}`
                              : 'scale-0 opacity-0'
                          }`}
                          aria-hidden
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[rgb(var(--border))]/50">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progressPercentage}%`,
                    background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 60%, #10b981 100%)',
                  }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs sm:text-sm lg:mt-3">
                <span className="hidden text-[rgb(var(--text-secondary))] lg:inline">
                  {viewedDayCount}/{totalDayCount} {effectiveViewedCountLabel}
                </span>
                <button
                  type="button"
                  onClick={continueToNextDay}
                  className="ml-auto font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 flex items-center gap-1 transition-all hover:gap-1.5"
                >
                  {effectiveContinueButtonText}
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Day summary (Lisainfo) ───────────────────────────────────── */}
          <div>
            <div className={`relative p-5 lg:p-8 ${panel}`}>
              <div ref={dayHeaderRef} className="relative z-10 space-y-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-blue-700 border border-blue-200/80 dark:bg-blue-900/40 dark:border-blue-700/50 dark:text-blue-400">
                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                    {effectiveDayExtraInfoTitle}
                  </span>
                </div>

                <h3 className="text-lg font-black leading-tight text-[rgb(var(--text-primary))] md:text-xl">
                  {currentDay?.tag ? `${currentDay.tag}: ${currentDay.title}` : currentDay?.title}
                </h3>

                <p className="text-sm text-[rgb(var(--text-secondary))] md:text-base">
                  {effectiveDayFocusLabel}:{' '}
                  <span className="font-semibold text-[rgb(var(--text-primary))]">
                    {currentDay?.habitsFocus || currentDay?.habit}
                  </span>
                </p>

                <div>
                  <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))]">
                    Mida sel päeval teeme
                  </h4>
                  <ul className="space-y-2.5">
                    {shortSolutionItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 rounded-lg border border-[rgb(var(--border))]/40 bg-[rgb(var(--bg-primary))]/50 p-2.5 px-3 dark:bg-white/[0.02]"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100/80 text-[10px] font-black text-emerald-700 shadow-sm dark:bg-emerald-900/50 dark:text-emerald-300">
                          {i + 1}
                        </div>
                        <span className="text-sm font-semibold text-[rgb(var(--text-primary))]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1 rounded-xl border border-blue-100/60 bg-blue-50/50 p-3 dark:border-blue-800/30 dark:bg-blue-900/10">
                    <h6 className="mb-1.5 text-sm font-bold text-blue-600 dark:text-blue-400">Osaleja saab</h6>
                    <p className="text-xs leading-relaxed text-[rgb(var(--text-secondary))]">{participantWinText}</p>
                  </div>
                  <div className="flex-1 rounded-xl border border-emerald-100/60 bg-emerald-50/50 p-3 dark:border-emerald-800/30 dark:bg-emerald-900/10">
                    <h6 className="mb-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">Juht / Org võidab</h6>
                    <p className="text-xs leading-relaxed text-[rgb(var(--text-secondary))]">{companyWinText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>{/* end left column stack */}

          {/* ── Day content panel (structured right card) ──────────────── */}
          <div
            ref={dayContentRef}
            className="order-2 scroll-mt-[13rem] lg:col-start-2 lg:row-start-1 lg:scroll-mt-0"
          >
            <div
              key={currentDay.dayNumber}
              className={`relative overflow-hidden p-5 lg:p-8 ${panel} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            >
              <div className="mega-soft-glass-inner-glow" />
              <div className="mega-soft-glass-reflection" />

              <div className="relative z-10 space-y-5">
                {/* Day title hero */}
                <div className="overflow-hidden rounded-2xl border border-blue-100/60 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 shadow-[0_8px_28px_-18px_rgba(37,99,235,0.22)] dark:border-blue-900/30 dark:from-blue-950/20 dark:via-[rgb(var(--bg-primary))] dark:to-indigo-950/15">
                  <div className="flex items-start gap-4 p-5 md:p-6">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black text-white shadow-[0_8px_20px_-8px_rgba(99,102,241,0.55)]"
                      aria-hidden
                    >
                      {formatDayNumber(currentDay.dayNumber)}
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="mb-2.5 flex flex-wrap gap-1.5">
                        {dayTagBadges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center rounded-full border border-blue-100/80 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:border-blue-800/50 dark:bg-blue-950/40 dark:text-blue-400"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-lg font-black leading-tight text-slate-900 dark:text-white sm:text-xl md:text-2xl">
                        {currentDay.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Päeva eesmärk */}
                {dayObjectiveText ? (
                  <div className="rounded-r-2xl border-l-4 border-blue-600 bg-blue-50/60 px-5 py-4 dark:border-blue-500 dark:bg-blue-950/25">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 dark:text-blue-400">
                      {effectiveDayGoalLabel}
                    </p>
                    <p className="text-sm font-medium italic leading-relaxed text-[rgb(var(--text-primary))] md:text-base">
                      &ldquo;{dayObjectiveText}&rdquo;
                    </p>
                  </div>
                ) : null}

                {/* Osaleja saab päeva lõpuks */}
                {(participantBenefitItems.length > 0 || participantWinCard) && (
                  <div className="rounded-2xl border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-primary))]/80 p-5 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.18)] dark:bg-white/[0.03] sm:p-6">
                    <h3 className="mb-4 text-base font-black text-[rgb(var(--text-primary))] sm:text-lg">
                      {participantWinCard?.title || 'Osaleja saab päeva lõpuks'}
                    </h3>
                    <ul className="space-y-3">
                      {(participantBenefitItems.length > 0
                        ? participantBenefitItems
                        : [participantWinText]
                      ).map((item, index) => (
                        <li key={`participant-benefit-${index}`} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
                            style={{
                              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                              boxShadow: '0 4px 12px -4px rgba(99,102,241,0.5)',
                            }}
                          >
                            {index + 1}
                          </span>
                          <span className="pt-0.5 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ettevõte võidab, kui juht rakendab */}
                {(companyBenefitItems.length > 0 || companyWinCard) && (
                  <div className="rounded-2xl border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-primary))]/80 p-5 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.18)] dark:bg-white/[0.03] sm:p-6">
                    <h3 className="mb-4 text-base font-black text-[rgb(var(--text-primary))] sm:text-lg">
                      {companyWinCard?.title || 'Ettevõte võidab, kui juht rakendab'}
                    </h3>
                    <ul className="space-y-3">
                      {(companyBenefitItems.length > 0
                        ? companyBenefitItems
                        : [companyWinText]
                      ).map((item, index) => (
                        <li key={`company-benefit-${index}`} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
                            style={{
                              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                              boxShadow: '0 4px 12px -4px rgba(99,102,241,0.5)',
                            }}
                          >
                            {index + 1}
                          </span>
                          <span className="pt-0.5 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Progress & navigation footer */}
                <div className="space-y-4 border-t border-[rgb(var(--border))]/60 pt-5">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold text-[rgb(var(--text-secondary))] sm:text-sm">
                    <span>
                      Päev {currentDay.dayNumber} / {totalDayCount}
                    </span>
                    <span>{dayPositionPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgb(var(--border))]/50">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${dayPositionPercentage}%`,
                        background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 60%, #10b981 100%)',
                      }}
                    />
                  </div>

                  <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
                    {dayLinkPrefixText}{' '}
                    {registerHrefIsInternal ? (
                      <Link
                        href={`${effectiveDayLinkHref}?day=${currentDay.dayNumber}`}
                        className="font-semibold text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-500 dark:text-blue-400"
                      >
                        {effectiveDayLinkText}
                      </Link>
                    ) : (
                      <a
                        href={effectiveDayLinkHref}
                        className="font-semibold text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-500 dark:text-blue-400"
                      >
                        {effectiveDayLinkText}
                      </a>
                    )}
                  </p>

                  {nextDay ? (
                    <button
                      type="button"
                      onClick={continueToNextDay}
                      className="w-full rounded-xl border border-[rgb(var(--border))]/60 p-4 text-left transition-all duration-200 hover:border-blue-300/80 hover:shadow-[0_8px_24px_-16px_rgba(59,130,246,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:bg-white/[0.02] dark:hover:border-blue-700/50"
                      style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(99,102,241,0.04))' }}
                      aria-label={`${effectiveNextDayLabel}: Päev ${nextDay.dayNumber}, ${nextDay.title}`}
                    >
                      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em] text-[rgb(var(--text-secondary))]">
                        {effectiveNextDayLabel}
                      </p>
                      <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                        Päev {nextDay.dayNumber}: {nextDay.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[rgb(var(--text-secondary))]">
                        {nextDay.habit}
                      </p>
                    </button>
                  ) : (
                    <div
                      className="rounded-xl border border-emerald-200/70 p-4 dark:border-emerald-800/30"
                      style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.07), rgba(6,182,212,0.04))' }}
                    >
                      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        {effectiveFinalDayMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>



        </div>

        {/* ── Section CTAs (outside both cards) ─────────────────────────── */}
        <div className="mx-auto mt-6 w-full max-w-2xl space-y-3 px-1 lg:mt-8">
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-4">
          {primaryBtnLink?.trim() ? (
            primaryBtnLink.trim().startsWith('#') ? (
              <BrandVibrantButton
                icon={UserPlus}
                className="w-full justify-center sm:flex-1 sm:max-w-xs"
                onClick={(e) => {
                  e.preventDefault()
                  const id = primaryBtnLink.trim().substring(1)
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {primaryBtnText?.trim() || 'REGISTREERU PROGRAMMI'}
              </BrandVibrantButton>
            ) : (
              <BrandVibrantButton
                href={primaryBtnLink.trim()}
                icon={UserPlus}
                className="w-full justify-center sm:flex-1 sm:max-w-xs"
              >
                {primaryBtnText?.trim() || 'REGISTREERU PROGRAMMI'}
              </BrandVibrantButton>
            )
          ) : null}
            <WhiteButton
              icon={MailOpen}
              className="w-full justify-center sm:flex-1 sm:max-w-xs"
              onClick={() => {
                setLeadMagnetOpen((open) => !open)
                setLeadError('')
              }}
              aria-expanded={leadMagnetOpen}
            >
              {effectiveSidebarCtas.readMoreText}
            </WhiteButton>
          </div>

          {leadMagnetOpen && (
            <div
              className={`${marketingMicroPillClass} animate-in fade-in slide-in-from-top-1 duration-200 p-5`}
              id="nine-days-lead-panel"
            >
              {leadSent ? (
                <div className="space-y-3 text-center sm:text-left">
                  <p className="text-base font-bold text-emerald-700 dark:text-emerald-300">Aitäh!</p>
                  <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
                    {pdfDownloadStarted
                      ? 'Programmi PDF peaks kohe alla laadima. Kontrolli vajadusel oma brauseri allalaadimisi.'
                      : 'Kontrolli varsti oma postkasti — programmi materjalid on teel.'}
                  </p>
                  {effectiveSidebarCtas.readMoreUrl && effectiveSidebarCtas.readMoreUrl !== '#' ? (
                    <a
                      href={effectiveSidebarCtas.readMoreUrl}
                      className="inline-flex text-sm font-semibold text-blue-600 underline decoration-blue-600/30 underline-offset-2 hover:text-blue-500 dark:text-blue-400"
                    >
                      Soovid kohe lugeda? Ava täispikk kirjeldus →
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setLeadMagnetOpen(false)
                        setLeadSent(false)
                      }}
                      className="inline-flex text-sm font-semibold text-slate-400 underline decoration-slate-300 underline-offset-2 hover:text-slate-700"
                    >
                      Sulge
                    </button>
                  )}
                </div>
              ) : (
                <form onSubmit={handleLeadMagnetSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold leading-snug text-[rgb(var(--text-primary))]">
                      {effectivePopupTitle}
                    </p>
                    <p className="text-xs leading-relaxed text-[rgb(var(--text-secondary))]">
                      {effectivePopupSubtitle}
                    </p>
                  </div>
                  <FormField>
                    <Label htmlFor="nine-days-lead-email" variant="compact">
                      E-post
                    </Label>
                    <Input
                      id="nine-days-lead-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={leadEmail}
                      onChange={(ev) => setLeadEmail(ev.target.value)}
                      placeholder="nimi@ettevote.ee"
                      required
                      className="py-3"
                    />
                  </FormField>
                  {leadError ? <Alert variant="error">{leadError}</Alert> : null}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={leadPending}
                      className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-bold text-white shadow-[0_12px_32px_-12px_rgba(37,99,235,0.55)] transition hover:from-blue-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {leadPending ? (
                        <>
                          <Spinner size="sm" className="mr-2 text-white" label="Saadan" />
                          Saadan…
                        </>
                      ) : (
                        'Saada mulle programm'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLeadMagnetOpen(false)
                        setLeadError('')
                      }}
                      className="text-center text-sm font-semibold text-[rgb(var(--text-secondary))] underline decoration-slate-300 underline-offset-2 hover:text-[rgb(var(--text-primary))] sm:text-right"
                    >
                      Sulge
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* ── CTA Section ───────────────────────────────────────────────── */}
        {effectiveCta && (
          <div className="mt-16">
            <div
              className="relative overflow-hidden rounded-2xl p-8 text-center text-white shadow-[0_28px_70px_-28px_rgba(37,99,235,0.65)]"
              style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #4338ca 100%)' }}
            >
              {/* Decorative glows */}
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)' }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full opacity-15"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.8), transparent 70%)' }}
                aria-hidden
              />

              <div className="relative">
                <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">
                  {effectiveCta.title}
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-50/95">
                  {effectiveCta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-blue-700 dark:text-blue-400 shadow-lg hover:bg-blue-50"
                    onClick={() => window.open(effectiveCta!.primaryButton.url, '_blank')}
                  >
                    {effectiveCta.primaryButton.text}
                  </Button>
                  {effectiveCta.secondaryButton && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                      onClick={() => effectiveCta!.secondaryButton?.url && window.open(effectiveCta!.secondaryButton!.url, '_blank')}
                    >
                      {effectiveCta.secondaryButton?.text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Testimonials Section ───────────────────────────────────────── */}
        {effectiveTestimonialsSection && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-black tracking-tight text-[rgb(var(--text-primary))] md:text-4xl">
                {effectiveTestimonialsSection.title}
              </h2>
              {effectiveTestimonialsSection.subtitle && (
                <p className="mx-auto max-w-3xl text-lg text-[rgb(var(--text-secondary))]">
                  {effectiveTestimonialsSection.subtitle}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {effectiveTestimonialsSection.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`${panel} p-5 transition-all duration-300 hover:shadow-[0_24px_64px_-24px_rgba(99,102,241,0.25)] hover:-translate-y-0.5`}
                >
                  <div className="flex items-center mb-4 gap-3">
                    <div className="shrink-0">
                      {testimonial.avatar?.asset?.url ? (
                        <Image
                          src={testimonial.avatar.asset.url}
                          alt={testimonial.author}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-[rgb(var(--border))]/50"
                        />
                      ) : (
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white shadow-[0_4px_12px_-4px_rgba(99,102,241,0.4)]"
                          style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
                        >
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-[rgb(var(--text-primary))] text-sm">{testimonial.author}</div>
                      <div className="text-xs text-[rgb(var(--text-secondary))]/90">{testimonial.position}</div>
                      <div className="text-xs text-[rgb(var(--text-secondary))]/70">{testimonial.company}</div>
                    </div>
                  </div>

                  <blockquote className="text-sm italic leading-relaxed text-[rgb(var(--text-secondary))]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        )}

      </MarketingContainer>

      {/* ── Contact Details Modal (Premium Glassmorphism Overlay) ─────────── */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/95 dark:bg-slate-900/95 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {isSuccess ? (
              <div className="text-center py-4 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black tracking-tight text-[rgb(var(--text-primary))]">
                  Valikud salvestatud!
                </h3>
                <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
                  Aitäh — sinu kontaktandmed ja viimati vaadatud päev on edukalt edastatud.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsContactModalOpen(false)
                    setIsSuccess(false)
                  }}
                  className="w-full rounded-full bg-[#10b981] hover:bg-[#059669] text-white py-3 text-sm font-bold shadow-md transition active:scale-[0.98]"
                >
                  Sulge
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black tracking-tight text-[rgb(var(--text-primary))] mb-2">
                  Kinnita oma kontakt
                </h3>
                <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
                  Palun sisesta oma e-posti aadress või telefoninumber, et saaksime sinuga ühendust võtta ning päeva sinu registreeringuga siduda.
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <FormField>
                    <Label htmlFor="nine-days-contact-field" className="text-[#10b981] font-bold">
                      E-post või telefon
                    </Label>
                    <Input
                      id="nine-days-contact-field"
                      type="text"
                      required
                      placeholder="nimi@ettevote.ee või +372 ..."
                      value={contactInput}
                      onChange={(e) => setContactInput(e.target.value)}
                      className="py-3 focus:border-[#10b981] focus:ring-[#10b981]/20 font-medium"
                    />
                  </FormField>

                  {contactError && <Alert variant="error">{contactError}</Alert>}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsContactModalOpen(false)}
                      className="rounded-full px-5 py-2.5 text-sm font-semibold text-[rgb(var(--text-secondary))] border border-[rgb(var(--border))]/70 hover:bg-[rgb(var(--bg-secondary))] transition active:scale-[0.98]"
                    >
                      Tühista
                    </button>
                    <GreenButton
                      type="submit"
                      disabled={contactSubmitting}
                      icon={UserPlus}
                      showIcon={!contactSubmitting}
                    >
                      {contactSubmitting ? 'Saadan...' : 'Kinnita ja jätka'}
                    </GreenButton>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </Section>
  )
}

export default function NineDaysProgram(props: NineDaysProgramProps) {
  return (
    <Suspense fallback={<div className="h-96 w-full flex items-center justify-center"><Spinner /></div>}>
      <NineDaysProgramInner {...props} />
    </Suspense>
  )
}
