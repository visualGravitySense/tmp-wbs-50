'use client'

import React, { useState } from 'react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { Label, WhiteButton, BrandVibrantButton, SplitHeader, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Check, Sparkles } from 'lucide-react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface AudienceCard {
  quote: string
  behavior: string
  percentage: string
  revealText: string
  revealLink: string
}

export interface AudienceSectionProps {
  /** Tighter spacing and typography (e.g. Koolitus page). */
  compact?: boolean
  eyebrow?: string
  title: string
  socialProofIntro: string
  cards: AudienceCard[]
  confirmButtonText: string
  /** Default prompt when nothing is selected yet. */
  bottomText?: string
  /** Blue CTA label — from Sanity `ctaText`, falls back to "SAADA PÄRING". */
  ctaText?: string
  /** CTA destination — external/internal URL opens link; hash/empty opens contact form. */
  ctaLink?: string
  transformBar: {
    beforeLabel: string
    beforeText: string
    afterLabel: string
    afterText: string
  }
  goalSection: {
    label: string
    placeholder: string
    confirmText: string
  }
  directorPath: {
    title: string
    description: string
    linkText: string
    linkUrl: string
  }
}

/** Surfaces: light = airy paper; dark = slate depth aligned with tokens (--border, slate-800/900). */
const innerPanel =
  'rounded-[22px] border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/65 to-white shadow-[0_18px_44px_-30px_rgba(15,23,42,0.2)] backdrop-blur-sm dark:border-[rgb(var(--border))]/90 dark:bg-gradient-to-br dark:from-slate-800/78 dark:via-slate-900/94 dark:to-slate-950 dark:shadow-[0_28px_72px_-34px_rgba(0,0,0,0.88)] dark:ring-1 dark:ring-inset dark:ring-white/[0.05]'

/** Warm CTA strip — separate from innerPanel to avoid conflicting gradient/border utilities. */
const directorPanel =
  'relative overflow-hidden rounded-[22px] border border-amber-200/70 bg-gradient-to-br from-amber-50/90 via-white/92 to-orange-50/55 shadow-[0_22px_55px_-38px_rgba(15,23,42,0.28)] backdrop-blur-sm dark:border-amber-500/35 dark:bg-gradient-to-br dark:from-amber-950/55 dark:via-slate-900/88 dark:to-slate-950 dark:shadow-[0_28px_72px_-34px_rgba(0,0,0,0.88)] dark:ring-1 dark:ring-inset dark:ring-amber-400/14'

const DEFAULT_CTA_TEXT = 'SAADA PÄRING'

const PainPointsAudience: React.FC<AudienceSectionProps> = ({
  compact = false,
  eyebrow,
  title,
  socialProofIntro,
  cards,
  confirmButtonText,
  bottomText,
  ctaText,
  ctaLink,
  transformBar,
  goalSection,
  directorPath
}) => {
  const [checkedCards, setCheckedCards] = useState<boolean[]>(new Array(cards.length).fill(false))
  const [goalValue, setGoalValue] = useState('')
  const [showGoalConfirm, setShowGoalConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [directorSubmitting, setDirectorSubmitting] = useState(false)
  const [contactValue, setContactValue] = useState('')
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactError, setContactError] = useState('')
  const [directorContactValue, setDirectorContactValue] = useState('')
  const [showDirectorContactForm, setShowDirectorContactForm] = useState(false)
  const [directorContactError, setDirectorContactError] = useState('')
  const [directorSubmitted, setDirectorSubmitted] = useState(false)

  const toggleCard = (index: number) => {
    const newChecked = [...checkedCards]
    newChecked[index] = !newChecked[index]
    setCheckedCards(newChecked)
  }

  const handleGoalInput = (val: string) => {
    setGoalValue(val)
    if (val.length > 5 && !showGoalConfirm) {
      setShowGoalConfirm(true)
    }
  }

  const getSelectedProblems = () => {
    return cards
      .filter((_, idx) => checkedCards[idx])
      .map((card) => card.quote)
  }

  const handleDirectorClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (directorSubmitting || directorSubmitted) return

    if (!showDirectorContactForm) {
      setShowDirectorContactForm(true)
      return
    }

    const contactClean = directorContactValue.trim()
    if (!contactClean) {
      setDirectorContactError('Kontaktandmed on kohustuslikud.')
      return
    }

    const hasEmail = EMAIL_RE.test(contactClean)
    const digits = contactClean.replace(/\D/g, '').length
    const hasPhone = digits >= 8 && digits <= 15

    if (!hasEmail && !hasPhone) {
      setDirectorContactError('Palun sisesta korrektne e-post või telefoninumber.')
      return
    }

    setDirectorSubmitting(true)
    setDirectorContactError('')

    try {
      const res = await fetch('/api/audience-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedProblems: getSelectedProblems(),
          customGoal: goalValue,
          buttonClicked: directorPath.linkText,
          title,
          contact: contactClean
        })
      })
      if (res.ok) {
        setDirectorSubmitted(true)
      } else {
        setDirectorContactError('Saatmine ebaõnnestus. Proovi uuesti.')
      }
    } catch (err) {
      console.error('Failed to submit director selections to Telegram', err)
      setDirectorContactError('Saatmine ebaõnnestus. Proovi uuesti.')
    } finally {
      setDirectorSubmitting(false)
    }
  }

  const handleConfirmClick = async (buttonLabel?: string) => {
    if (submitting || submitted) return

    if (!showContactForm) {
      setShowContactForm(true)
      return
    }

    const contactClean = contactValue.trim()
    if (!contactClean) {
      setContactError('Kontaktandmed on kohustuslikud.')
      return
    }

    const hasEmail = EMAIL_RE.test(contactClean)
    const digits = contactClean.replace(/\D/g, '').length
    const hasPhone = digits >= 8 && digits <= 15

    if (!hasEmail && !hasPhone) {
      setContactError('Palun sisesta korrektne e-post või telefoninumber.')
      return
    }

    setSubmitting(true)
    setContactError('')

    try {
      const res = await fetch('/api/audience-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedProblems: getSelectedProblems(),
          customGoal: goalValue,
          buttonClicked: buttonLabel || confirmButtonText,
          title,
          contact: contactClean
        })
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setContactError('Saatmine ebaõnnestus. Proovi uuesti.')
      }
    } catch (err) {
      console.error('Failed to submit confirmation to Telegram', err)
      setContactError('Saatmine ebaõnnestus. Proovi uuesti.')
    } finally {
      setSubmitting(false)
    }
  }

  const checkedCount = checkedCards.filter(Boolean).length
  const totalCards = cards.length
  const resolvedCtaText = ctaText?.trim() || DEFAULT_CTA_TEXT
  const ctaHref =
    ctaLink?.trim() && !ctaLink.startsWith('#') && ctaLink.trim() !== '' ? ctaLink.trim() : undefined

  const handleCtaClick = async () => {
    if (ctaHref) return

    if (!showContactForm) {
      setShowContactForm(true)
      return
    }

    await handleConfirmClick(resolvedCtaText)
  }

  let dynamicBottomText: React.ReactNode = null
  if (checkedCount > 0) {
    if (checkedCount === totalCards && totalCards > 0) {
      dynamicBottomText = (
        <span className="font-[600] text-rose-600 dark:text-rose-400">
          Oled valinud kõik {checkedCount} punkti — see programm on loodud täpselt sinu jaoks.
        </span>
      )
    } else if (checkedCount >= 3) {
      dynamicBottomText = (
        <span className="text-slate-800 dark:text-[#f0f4ff]">
          Oled valinud{' '}
          <span className="font-[700] text-rose-600 dark:text-rose-400">{checkedCount} punkti</span> —
          soovitame jätkata registreerimisega.
        </span>
      )
    } else {
      dynamicBottomText = (
        <span className="text-slate-800 dark:text-[#f0f4ff]">
          Oled valinud{' '}
          <span className="font-[600] text-blue-600 dark:text-[#60a5fa]">{checkedCount} punkti</span>.
          Vali veel, et saada personaalset soovitust.
        </span>
      )
    }
  } else {
    dynamicBottomText = (
      <span className="text-slate-800 dark:text-[#f0f4ff]">
        {bottomText || 'Vali välja punktid, mis sind kõnetavad.'}
      </span>
    )
  }

  return (
    <>
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <header className={compact ? 'mb-5 md:mb-6' : 'mb-10 md:mb-12'}>
          <div
            className={
              compact
                ? 'flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-6 lg:gap-8'
                : 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10'
            }
          >
            <SplitHeader
              title={title}
              eyebrow={eyebrow ? <EyebrowPillBadge text={eyebrow} /> : undefined}
              align="responsive"
              className="flex-1 min-w-0"
            />
            <blockquote
              className={
                compact
                  ? 'relative w-full max-w-none overflow-hidden rounded-xl shadow-[0_12px_32px_-22px_rgba(37,99,235,0.28)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:max-w-md md:rounded-r-2xl'
                  : 'relative max-w-md overflow-hidden rounded-r-xl shadow-[0_12px_32px_-22px_rgba(37,99,235,0.28)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:rounded-r-2xl'
              }
            >
              <div
                className={
                  compact
                    ? 'flex min-h-0 bg-gradient-to-r from-blue-50/92 via-blue-50/40 to-white dark:bg-gradient-to-r dark:from-slate-800/50 dark:via-slate-900/35 dark:to-transparent'
                    : 'flex min-h-[3.5rem] bg-gradient-to-r from-blue-50/92 via-blue-50/40 to-white dark:bg-gradient-to-r dark:from-slate-800/50 dark:via-slate-900/35 dark:to-transparent'
                }
              >
                <span className="w-[3px] shrink-0 bg-blue-500/65 dark:bg-blue-400/70" aria-hidden />
                <p
                  className={
                    compact
                      ? 'flex-1 hyphens-auto break-words py-2.5 pl-3 pr-3 text-[15px] font-medium italic leading-snug text-slate-700 sm:py-2 sm:text-sm md:pl-4 dark:text-slate-300/95'
                      : 'flex-1 py-3 pl-4 pr-4 text-base font-medium italic leading-relaxed text-slate-700 md:pl-5 md:text-lg dark:text-slate-300/95'
                  }
                >
                  &ldquo;{socialProofIntro}&rdquo;
                </p>
              </div>
            </blockquote>
          </div>

          {cards.length > 0 ? (
            <div
              className={
                compact
                  ? 'mt-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400'
                  : 'mt-6 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400'
              }
            >
              <span className="rounded-full border border-slate-200/80 bg-slate-100/90 px-3 py-1 text-slate-700 dark:border-[rgb(var(--border))]/70 dark:bg-slate-800/85 dark:text-slate-200 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                {checkedCount}/{cards.length} valitud
              </span>
              <span className="hidden h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent sm:block dark:from-slate-500/35 dark:to-transparent" />
            </div>
          ) : null}
        </header>

        <div
          className={
            compact
              ? 'mb-5 grid grid-cols-1 items-start gap-2.5 sm:gap-3 md:grid-cols-2 md:gap-3 lg:gap-4'
              : 'mb-10 grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-5'
          }
        >
          {cards.map((card, index) => {
            const on = checkedCards[index]
            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => toggleCard(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleCard(index)
                  }
                }}
                className={`group relative min-h-[44px] cursor-pointer overflow-hidden border text-left transition-all duration-500 ease-out [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg-primary))] active:scale-[0.99] dark:focus-visible:ring-blue-400/50 dark:focus-visible:ring-offset-[rgb(var(--bg-secondary))] sm:min-h-0 sm:active:scale-100 ${
                  compact ? 'rounded-[16px]' : 'rounded-[22px]'
                } ${
                  on
                    ? 'border-blue-400/55 bg-gradient-to-br from-blue-50/95 via-white to-cyan-50/70 shadow-[0_24px_55px_-28px_rgba(59,130,246,0.42)] ring-1 ring-blue-400/25 dark:border-sky-400/40 dark:bg-gradient-to-br dark:from-sky-950/70 dark:via-blue-950/55 dark:to-slate-950 dark:shadow-[0_28px_68px_-28px_rgba(56,189,248,0.22),0_18px_44px_-28px_rgba(0,0,0,0.75)] dark:ring-sky-400/25'
                    : 'border-slate-200/90 bg-gradient-to-br from-white via-slate-50/60 to-white shadow-[0_12px_32px_-26px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:border-slate-300/90 hover:shadow-[0_20px_48px_-30px_rgba(15,23,42,0.22)] dark:border-[rgb(var(--border))]/65 dark:bg-gradient-to-br dark:from-slate-800/82 dark:via-slate-900/92 dark:to-slate-950 dark:shadow-[0_20px_50px_-34px_rgba(0,0,0,0.82)] dark:hover:border-slate-500/45 dark:hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.88)]'
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${on ? 'opacity-100' : ''}`}
                  aria-hidden
                >
                  <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-blue-400/12 blur-2xl dark:bg-sky-500/20" />
                </div>

                <div
                  className={
                    compact ? 'relative z-10 flex gap-3 p-3 sm:p-4' : 'relative z-10 flex gap-4 p-5 sm:p-6'
                  }
                >
                  <div
                    className={`mt-0.5 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                      compact ? 'flex h-11 w-11 sm:h-8 sm:w-8' : 'flex h-9 w-9'
                    } ${
                      on
                        ? 'border-transparent bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_12px_28px_-12px_rgba(59,130,246,0.65)]'
                        : 'border-slate-300/90 bg-white text-transparent dark:border-slate-500/70 dark:bg-slate-900/70 dark:text-transparent'
                    }`}
                  >
                    <svg
                      className={compact ? 'h-4 w-4 sm:h-3.5 sm:w-3.5' : 'h-4 w-4'}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className={compact ? 'min-w-0 flex-1 space-y-2' : 'min-w-0 flex-1 space-y-3'}>
                    <p
                      className={
                        compact
                          ? 'text-[15px] font-bold italic leading-snug tracking-tight text-[rgb(var(--text-primary))] sm:text-[16px]'
                          : 'text-[17px] font-bold italic leading-snug tracking-tight text-[rgb(var(--text-primary))] sm:text-lg'
                      }
                    >
                      &ldquo;{card.quote}&rdquo;
                    </p>

                    {on ? (
                      <div
                        className={
                          compact
                            ? 'animate-in fade-in slide-in-from-top-2 border-t border-blue-200/70 pt-2.5 duration-500 dark:border-sky-400/30'
                            : 'animate-in fade-in slide-in-from-top-2 border-t border-blue-200/70 pt-4 duration-500 dark:border-sky-400/30'
                        }
                      >
                        <p
                          className={
                            compact
                              ? 'mb-1 text-[9px] font-black uppercase tracking-[0.16em] text-blue-700 dark:text-blue-400'
                              : 'mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400'
                          }
                        >
                          Meie kogemus ütleb
                        </p>
                        <p
                          className={
                            compact
                              ? 'text-xs leading-relaxed text-[rgb(var(--text-secondary))]'
                              : 'text-sm leading-relaxed text-[rgb(var(--text-secondary))]'
                          }
                        >
                          {card.behavior}{' '}
                          <span className="font-black text-[rgb(var(--text-primary))]">{card.percentage}</span>{' '}
                          juhist tunneb sama.
                        </p>
                        {card.revealLink ? (
                          <a
                            href={card.revealLink}
                            className={
                              compact
                                ? 'mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 underline-offset-4 transition hover:gap-2 hover:underline dark:text-blue-400 dark:hover:text-blue-400'
                                : 'mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-700 underline-offset-4 transition hover:gap-2 hover:underline dark:text-blue-400 dark:hover:text-blue-400'
                            }
                            onClick={(e) => e.stopPropagation()}
                          >
                            {card.revealText || 'Loe lähemalt'}
                            <span className="sr-only"> ({card.quote})</span>
                            <span aria-hidden>→</span>
                          </a>
                        ) : null}
                      </div>
                    ) : (
                      <p
                        className={
                          compact
                            ? 'text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400 opacity-70 transition-opacity duration-300 max-md:opacity-100 md:opacity-0 md:group-hover:opacity-100 dark:text-slate-500 dark:group-hover:text-slate-300'
                            : 'text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 opacity-70 transition-opacity duration-300 max-md:opacity-100 md:opacity-0 md:group-hover:opacity-100 dark:text-slate-500 dark:group-hover:text-slate-300'
                        }
                      >
                        Klõpsa, et avada statistika
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={cn(
            'relative overflow-hidden',
            innerPanel,
            compact ? 'mb-5 rounded-[16px]' : 'mb-10'
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.06)_0%,transparent_42%,rgba(6,182,212,0.05)_100%)] dark:bg-[linear-gradient(135deg,rgba(16,185,129,0.16)_0%,transparent_48%,rgba(6,182,212,0.1)_100%)]" />
          <div className={compact ? 'relative z-10 p-4 sm:p-5' : 'relative z-10 p-6 sm:p-8'}>
            <div
              className={
                compact
                  ? 'grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4 lg:gap-5'
                  : 'grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6'
              }
            >
              <div className={cn(compact ? 'space-y-1' : 'space-y-2', 'text-center md:text-left')}>
                <span
                  className={
                    compact
                      ? 'text-[9px] font-black uppercase tracking-eyebrow text-slate-500 dark:text-slate-400'
                      : 'text-[10px] font-black uppercase tracking-eyebrow text-slate-500 dark:text-slate-400'
                  }
                >
                  {transformBar.beforeLabel}
                </span>
                <p
                  className={
                    compact
                      ? 'text-sm font-medium italic leading-relaxed text-[rgb(var(--text-secondary))] md:text-sm'
                      : 'text-base font-medium italic leading-relaxed text-[rgb(var(--text-secondary))] md:text-base'
                  }
                >
                  {transformBar.beforeText}
                </p>
              </div>

              <div className="flex justify-center py-1 md:flex-col md:px-2 md:py-0">
                <div
                  className={cn(
                    compact
                      ? 'flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200/80 bg-emerald-50/90 text-emerald-700 shadow-inner sm:h-10 sm:w-10 dark:border-emerald-400/35 dark:bg-emerald-950/65 dark:text-emerald-200 dark:shadow-[0_0_28px_-10px_rgba(52,211,153,0.45),inset_0_1px_0_0_rgba(255,255,255,0.07)]'
                      : 'flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200/80 bg-emerald-50/90 text-emerald-700 shadow-inner dark:border-emerald-400/35 dark:bg-emerald-950/65 dark:text-emerald-200 dark:shadow-[0_0_28px_-10px_rgba(52,211,153,0.45),inset_0_1px_0_0_rgba(255,255,255,0.07)]',
                    'transform transition-transform duration-500 max-md:rotate-90'
                  )}
                >
                  <svg
                    className={compact ? 'h-5 w-5' : 'h-6 w-6'}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              <div
                className={
                  compact
                    ? 'space-y-1 border-t border-slate-200/60 pt-4 text-center md:border-l md:border-t-0 md:pl-5 md:pt-0 md:text-left dark:border-[rgb(var(--border))]/55'
                    : 'space-y-2 border-t border-slate-200/60 pt-6 text-center md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-left dark:border-[rgb(var(--border))]/55'
                }
              >
                <span
                  className={
                    compact
                      ? 'text-[9px] font-black uppercase tracking-eyebrow text-emerald-700 dark:text-emerald-300'
                      : 'text-[10px] font-black uppercase tracking-eyebrow text-emerald-700 dark:text-emerald-300'
                  }
                >
                  {transformBar.afterLabel}
                </span>
                <p
                  className={
                    compact
                      ? 'text-base font-bold leading-snug text-[rgb(var(--text-primary))] md:text-base'
                      : 'text-lg font-bold leading-snug text-[rgb(var(--text-primary))] md:text-lg'
                  }
                >
                  {transformBar.afterText}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'relative overflow-hidden',
            innerPanel,
            compact ? 'mb-5 rounded-[16px]' : 'mb-10'
          )}
        >
          <div className={compact ? 'relative z-10 pb-4 sm:pb-5' : 'relative z-10 pb-6 sm:pb-8'}>
            <Label
              variant="compact"
              className={
                compact
                  ? 'mb-2 px-4 pt-4 text-[9px] text-blue-800 sm:px-5 sm:pt-5 dark:text-sky-300/95'
                  : 'mb-4 px-6 pt-6 sm:px-8 sm:pt-8 text-blue-800 dark:text-sky-300/95'
              }
            >
              {goalSection.label}
            </Label>
            <textarea
              value={goalValue}
              onChange={(e) => handleGoalInput(e.target.value)}
              placeholder={goalSection.placeholder}
              rows={compact ? 3 : 4}
              className={
                compact
                  ? 'w-full min-h-[44px] resize-none rounded-none border-x-0 border-b-0 border-t border-slate-200/90 bg-white px-4 py-3 text-base text-[rgb(var(--text-primary))] placeholder:text-slate-400 shadow-inner transition focus:border-blue-400/60 focus:outline-none focus:ring-4 focus:ring-blue-500/15 dark:border-[rgb(var(--border))]/80 dark:bg-slate-950/65 dark:placeholder:text-slate-500 dark:focus:border-sky-500/50 dark:focus:ring-sky-500/12 dark:hover:border-slate-500/50 sm:min-h-0 sm:py-2.5 sm:text-sm md:px-5'
                  : 'w-full resize-none rounded-none border-x-0 border-b-0 border-t border-slate-200/90 bg-white px-6 py-3.5 text-[rgb(var(--text-primary))] placeholder:text-slate-400 shadow-inner transition focus:border-blue-400/60 focus:outline-none focus:ring-4 focus:ring-blue-500/15 dark:border-[rgb(var(--border))]/80 dark:bg-slate-950/65 dark:placeholder:text-slate-500 dark:focus:border-sky-500/50 dark:focus:ring-sky-500/12 dark:hover:border-slate-500/50'
              }
            />
            {showGoalConfirm ? (
              <div
                className={
                  compact
                    ? 'animate-in fade-in zoom-in mt-2 flex items-center gap-2 px-4 text-xs font-bold text-emerald-700 duration-300 dark:text-emerald-300 sm:px-5'
                    : 'animate-in fade-in zoom-in mt-4 flex items-center gap-2.5 px-6 text-sm font-bold text-emerald-700 duration-300 dark:text-emerald-300 sm:px-8'
                }
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-300/80 bg-emerald-50 text-xs dark:border-emerald-400/45 dark:bg-emerald-950/70 dark:text-emerald-200">
                  ✓
                </span>
                {goalSection.confirmText}
              </div>
            ) : null}
          </div>
        </div>

        <div className={cn(directorPanel, compact && 'rounded-[16px]')}>
          <div className="pointer-events-none absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-400/18 dark:opacity-90" />
          <div
            className={
              compact
                ? 'relative z-10 flex flex-col items-stretch gap-4 p-4 sm:p-5'
                : 'relative z-10 flex flex-col items-stretch gap-6 p-6 sm:p-8'
            }
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 w-full">
              <div className={compact ? 'min-w-0 space-y-1' : 'min-w-0 space-y-2'}>
                <div
                  role="heading"
                  aria-level={4}
                  className={
                    compact
                      ? 'text-xs font-black uppercase italic tracking-wide text-amber-900 dark:text-amber-200'
                      : 'text-sm font-black uppercase italic tracking-wide text-amber-900 dark:text-amber-200'
                  }
                >
                  {directorPath.title}
                </div>
                <p
                  className={
                    compact
                      ? 'max-w-xl text-xs font-medium leading-relaxed text-amber-950/75 dark:text-slate-300'
                      : 'max-w-xl text-sm font-medium leading-relaxed text-amber-950/75 dark:text-slate-300'
                  }
                >
                  {directorPath.description}
                </p>
              </div>
              <BrandVibrantButton
                href="#"
                onClick={handleDirectorClick}
                className="w-full sm:w-auto shrink-0"
              >
                {directorSubmitted ? 'Salvestatud' : directorSubmitting ? 'Saadan...' : directorPath.linkText}
              </BrandVibrantButton>
            </div>

            {showDirectorContactForm && !directorSubmitted && (
              <div className="w-full max-w-md p-5 rounded-xl border border-amber-300/40 bg-white/60 shadow-sm dark:border-amber-500/25 dark:bg-slate-900/60 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300 text-left">
                <label htmlFor="director-contact" className="block text-xs font-bold text-amber-950 dark:text-amber-200 mb-1 uppercase tracking-wider">
                  Sinu kontaktandmed *
                </label>
                <p className="text-[11px] text-amber-900/80 dark:text-slate-400 mb-3 font-semibold leading-relaxed">
                  Jäta oma e-post või telefoninumber, et saaksime teiega ühendust võtta.
                </p>
                <input
                  id="director-contact"
                  type="text"
                  required
                  value={directorContactValue}
                  onChange={(e) => {
                    setDirectorContactValue(e.target.value)
                    setDirectorContactError('')
                  }}
                  placeholder="E-post või telefon..."
                  className="w-full rounded-lg border border-amber-300/35 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 focus:outline-none text-xs transition font-semibold"
                />
                {directorContactError && (
                  <p className="mt-1.5 text-xs font-bold text-red-500 dark:text-red-400">
                    {directorContactError}
                  </p>
                )}
              </div>
            )}

            {directorSubmitted && (
              <div className="w-full text-left p-4 rounded-xl border border-emerald-300/40 bg-emerald-50/50 dark:border-emerald-500/35 dark:bg-emerald-950/40 animate-in fade-in zoom-in duration-300 flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-300/80 bg-emerald-50 text-xs dark:border-emerald-400/45 dark:bg-emerald-950/70 dark:text-emerald-200">
                  ✓
                </span>
                Sinu kontakt on salvestatud! Võtame peagi ühendust.
              </div>
            )}
          </div>
        </div>

        <div
          className={
            compact
              ? 'mt-5 flex flex-col items-center gap-4 border-t border-slate-200/60 pt-6 text-center sm:items-stretch sm:gap-5 sm:text-left md:flex-row md:items-center md:justify-between dark:border-slate-800/60'
              : 'mt-10 flex flex-col items-center gap-5 border-t border-slate-200/60 pt-8 text-center sm:items-stretch sm:gap-6 sm:text-left md:flex-row md:items-center md:justify-between dark:border-slate-800/60'
          }
        >
          <p
            className={
              compact
                ? 'w-full text-base font-[500] leading-snug transition-colors duration-300 md:max-w-[58%]'
                : 'w-full text-lg font-[500] leading-snug transition-colors duration-300 sm:text-xl sm:leading-tight md:max-w-[58%]'
            }
          >
            {dynamicBottomText}
          </p>

          {ctaHref ? (
            <BrandVibrantButton href={ctaHref} className="w-full min-h-12 shrink-0 sm:w-auto md:min-w-[200px]">
              {resolvedCtaText}
            </BrandVibrantButton>
          ) : (
            <BrandVibrantButton
              onClick={handleCtaClick}
              disabled={submitting}
              className="w-full min-h-12 shrink-0 sm:w-auto md:min-w-[200px]"
            >
              {submitted ? 'Päring saadetud' : submitting ? 'Saadan...' : resolvedCtaText}
            </BrandVibrantButton>
          )}
        </div>

        {showContactForm && !submitted && (
          <div className="w-full max-w-md mx-auto p-6 rounded-2xl border border-slate-200/80 bg-white/70 shadow-[0_15px_35px_-15px_rgba(37,99,235,0.15)] dark:border-[rgb(var(--border))]/75 dark:bg-slate-900/60 dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
            <label htmlFor="audience-contact" className="block text-sm font-black text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wide text-left">
              Sinu kontaktandmed *
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-semibold leading-relaxed text-left">
              Jäta oma e-post või telefoninumber, et saaksime sinuga ühendust võtta.
            </p>
            <input
              id="audience-contact"
              type="text"
              required
              value={contactValue}
              onChange={(e) => {
                setContactValue(e.target.value)
                setContactError('')
              }}
              placeholder="E-post või telefon..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 focus:outline-none text-sm transition font-medium"
            />
            {contactError && (
              <p className="mt-2 text-xs font-bold text-red-500 dark:text-red-400 text-left">
                {contactError}
              </p>
            )}
          </div>
        )}
        {submitted && (
          <div className="w-full max-w-md mx-auto text-left p-4 rounded-xl border border-emerald-300/40 bg-emerald-50/50 dark:border-emerald-500/35 dark:bg-emerald-950/40 animate-in fade-in zoom-in duration-300 flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-300/80 bg-emerald-50 text-xs dark:border-emerald-400/45 dark:bg-emerald-950/70 dark:text-emerald-200">
              ✓
            </span>
            Sinu kontakt on salvestatud! Võtame peagi ühendust.
          </div>
        )}

        {confirmButtonText && !submitted ? (
          <div className={compact ? 'mt-5 flex flex-col items-center gap-5' : 'mt-10 flex flex-col items-center gap-6'}>
            <WhiteButton
              onClick={() => void handleConfirmClick(confirmButtonText)}
              disabled={submitting}
              icon={submitted ? Check : Sparkles}
              className="w-full sm:w-auto shadow-[0_12px_32px_-12px_rgba(15,23,42,0.12)]"
            >
              {submitted ? 'Kinnitatud' : submitting ? 'Saadan...' : confirmButtonText}
            </WhiteButton>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default PainPointsAudience
