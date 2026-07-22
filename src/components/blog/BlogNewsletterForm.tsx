'use client'

import React, { useId, useState, type FormEvent } from 'react'
import { marketingMicroPillClass } from '@/components/ui'
import { pushDataLayerEvent } from '@/lib/analytics'

export type BlogNewsletterVariant = 'horizontal' | 'sidebar'

export type BlogNewsletterFormProps = {
  /** Layout mode — wide index bar vs compact post sidebar card. */
  variant?: BlogNewsletterVariant
  title?: string
  /** Alias used by Sanity page-builder (`subtitle` field). */
  subtitle?: string
  /** Same as subtitle — kept for existing call sites. */
  description?: string
  placeholder?: string
  buttonText?: string
  note?: string
  /** Studio “Väike märkus” alias — same as `note`. */
  smallNote?: string
  /** Override success copy after Smaily accept (CMS-managed). */
  successMessage?: string
  /** Smaily `source` attribute. Defaults: horizontal → `blog`, sidebar → `blog-sidebar`. */
  source?: string
  /** Smaily `tag` attribute. Defaults: horizontal → `uudiskiri`, sidebar → `uudiskiri-sidebar`. */
  tag?: string
  className?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const DEFAULT_SUCCESS_MESSAGE =
  'Aitäh liitumast! Kinnituskiri on teel Sinu postkasti.'

const DEFAULTS = {
  horizontal: {
    source: 'blog',
    tag: 'uudiskiri',
    title: 'Telli uued postitused',
    description: 'Uus artikkel kord nädalas — otse postkasti.',
  },
  sidebar: {
    source: 'blog-sidebar',
    tag: 'uudiskiri-sidebar',
    title: 'Telli uued postitused',
    description: 'Uus artikkel kord nädalas — otse postkasti. Rämpsposti ei saada.',
  },
} as const

/**
 * Blog newsletter form — posts to `/api/smaily`.
 * - `horizontal`: form-only row used inside the blog index banner.
 * - `sidebar`: self-contained card for the article sticky rail.
 */
export default function BlogNewsletterForm({
  variant = 'horizontal',
  title,
  subtitle,
  description,
  placeholder,
  buttonText,
  note,
  smallNote,
  successMessage,
  source,
  tag,
  className = '',
}: BlogNewsletterFormProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isSidebar = variant === 'sidebar'
  const resolvedSource = source?.trim() || DEFAULTS[variant].source
  const resolvedTag = tag?.trim() || DEFAULTS[variant].tag
  const resolvedTitle = title?.trim() || DEFAULTS[variant].title
  const resolvedDescription =
    subtitle?.trim() || description?.trim() || DEFAULTS[variant].description
  const resolvedPlaceholder = placeholder?.trim() || 'sinu@email.ee'
  const resolvedNote = note?.trim() || smallNote?.trim() || undefined
  const resolvedSuccess =
    successMessage?.trim() || DEFAULT_SUCCESS_MESSAGE
  const buttonLabel =
    (buttonText || 'Telli').replace(/\s*(?:->|=>|→|>|›)\s*$/, '') || 'Telli'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isLoading) return

    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setError('Palun sisesta kehtiv e-posti aadress.')
      setIsSuccess(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/smaily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          source: resolvedSource,
          tag: resolvedTag,
        }),
      })

      let data: { success?: boolean; error?: string } = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (response.ok && data.success !== false) {
        pushDataLayerEvent({
          event: 'form_submission_success',
          form_id: isSidebar
            ? 'blog_newsletter_sidebar'
            : 'blog_newsletter_subscribe',
          source: resolvedSource,
          tag: resolvedTag,
          course_title: 'Blog',
        })
        setIsSuccess(true)
        setEmail('')
        return
      }

      setError(
        typeof data.error === 'string' && data.error.trim()
          ? data.error
          : 'Tellimine ebaõnnestus. Palun proovi uuesti.',
      )
    } catch (err) {
      console.error('[BlogNewsletterForm] submit failed:', err)
      setError('Ühenduse viga. Palun proovi uuesti.')
    } finally {
      setIsLoading(false)
    }
  }

  const successBlock = (
    <div
      className={`flex items-start gap-3 p-4 text-sm font-medium leading-relaxed text-emerald-800 dark:text-emerald-300 ${
        isSidebar
          ? 'rounded-2xl border border-emerald-200/70 bg-emerald-50/80 dark:border-emerald-800/40 dark:bg-emerald-950/30'
          : marketingMicroPillClass
      }`}
      role="status"
    >
      <svg
        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{resolvedSuccess}</span>
    </div>
  )

  const formFields = (
    <>
      <form
        className={
          isSidebar
            ? 'flex w-full flex-col gap-3'
            : 'flex flex-col gap-2 sm:flex-row'
        }
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          id={fieldId}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          disabled={isLoading}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError(null)
          }}
          className={
            isSidebar
              ? 'h-11 w-full rounded-xl border border-black/[0.08] bg-white/90 px-4 text-sm text-[rgb(var(--text-primary))] outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/12 dark:bg-white/[0.04] dark:placeholder:text-slate-500'
              : `h-11 min-w-0 flex-1 px-4 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 ${marketingMicroPillClass}`
          }
          placeholder={resolvedPlaceholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={
            isSidebar
              ? 'inline-flex h-11 w-full items-center justify-center rounded-full bg-blue-600 px-5 text-xs font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-18px_rgba(37,99,235,0.7)] transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
              : 'inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-blue-600 px-5 text-xs font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-18px_rgba(37,99,235,0.7)] transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
          }
        >
          {isLoading ? 'Saadan…' : buttonLabel}
        </button>
      </form>
      {error ? (
        <p
          id={errorId}
          className="mt-2 text-xs font-medium text-rose-600 dark:text-rose-400"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      {resolvedNote && !isSidebar ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{resolvedNote}</p>
      ) : null}
    </>
  )

  if (isSidebar) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-[18px] border border-black/[0.08] bg-white/70 p-5 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.5)] backdrop-blur-2xl dark:border-white/12 dark:bg-[rgb(var(--bg-secondary))]/62 dark:shadow-[0_20px_50px_-34px_rgba(0,0,0,0.75)] xl:rounded-[20px] xl:p-6 ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.26)_100%)] dark:bg-[linear-gradient(140deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.06)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-12 -top-14 h-28 w-28 rounded-full bg-emerald-400/15 blur-2xl dark:bg-emerald-500/18"
          aria-hidden
        />
        <div className="relative z-[1] flex w-full flex-col gap-4 text-left">
          <div>
            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.11em] text-slate-400 dark:text-slate-500">
              Uudiskiri
            </div>
            <h3 className="text-lg font-extrabold leading-snug tracking-tight text-[rgb(var(--text-primary))] xl:text-xl">
              {resolvedTitle}
            </h3>
            {resolvedDescription ? (
              <p className="mt-1.5 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
                {resolvedDescription}
              </p>
            ) : null}
          </div>
          {isSuccess ? successBlock : formFields}
          {resolvedNote ? (
            <p className="text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
              {resolvedNote}
            </p>
          ) : null}
        </div>
      </div>
    )
  }

  // horizontal (blog index form slot)
  return (
    <div className={`w-full min-w-0 flex-1 sm:max-w-xl ${className}`}>
      {isSuccess ? (
        <>
          {successBlock}
          {resolvedNote ? (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{resolvedNote}</p>
          ) : null}
        </>
      ) : (
        formFields
      )}
    </div>
  )
}

/** Alias for page-builder / Sanity call sites. */
export { BlogNewsletterForm as BlogNewsletter }
