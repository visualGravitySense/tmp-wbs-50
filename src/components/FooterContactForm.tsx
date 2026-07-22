'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import {
  FooterSocialIcon,
  footerSocialAriaLabel,
  type FooterData,
  type FooterLinkItem,
  type FooterSocialItem,
} from '@/components/Footer'
import { submitContactMessageToTelegram } from '@/lib/telegramLeadClient'
import { pushDataLayerEvent } from '@/lib/analytics'
import { Container } from '@/components/ui'
import { BUSINESS_CONTACT } from '@/lib/contact/businessInfo'

type SendState = 'idle' | 'sending' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE = 10
const MAX_MESSAGE = 3500
const SOURCE = 'footer-contact-form'
const PRIVACY_HREF = '/privacy-policy'

const DEFAULT_NAV: FooterLinkItem[] = [
  { label: 'What we do', href: '/koolitus' },
  { label: 'Why we do it', href: '/about' },
  { label: 'Our partners', href: '/kliendid' },
  { label: 'Opportunities', href: '/register' },
  { label: 'Privacy policy', href: PRIVACY_HREF },
]

const DEFAULT_SOCIAL: FooterSocialItem[] = [
  { platform: 'facebook', url: 'https://www.facebook.com/' },
  { platform: 'telegram', url: 'https://t.me/' },
  { platform: 'x', url: 'https://x.com/' },
  { platform: 'instagram', url: 'https://www.instagram.com/' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/' },
]

export type FooterContactFormProps = {
  data?: FooterData
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  disabled,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  autoComplete?: string
  disabled?: boolean
}) {
  return (
    <label className="footer-contact-field block min-w-0">
      <span className="footer-contact-label mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
        {label}
      </span>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="footer-contact-input w-full border-0 border-b border-white/25 bg-transparent px-0 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[rgb(var(--footer-contact-accent))] disabled:opacity-50"
        placeholder=" "
      />
    </label>
  )
}

/** Neutral engineering line-art (not a copy of the reference illustration). */
function EngineeringLineArt() {
  return (
    <svg
      className="footer-contact-art pointer-events-none absolute bottom-0 right-0 h-[min(280px,55%)] w-[min(320px,48%)] text-white opacity-[0.16]"
      viewBox="0 0 320 280"
      fill="none"
      aria-hidden
    >
      <circle cx="200" cy="140" r="90" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="140" r="62" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="140" r="34" stroke="currentColor" strokeWidth="1" />
      <path d="M110 140h180M200 50v180" stroke="currentColor" strokeWidth="1" />
      <path
        d="M140 90l120 100M140 190l120-100"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <rect x="168" y="108" width="64" height="64" stroke="currentColor" strokeWidth="1" />
      <path
        d="M40 220c40-40 80-20 100 10s50 50 90 20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M60 40h40M60 50h28M60 60h34" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export default function FooterContactForm({ data }: FooterContactFormProps) {
  const formId = useId()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [sendState, setSendState] = useState<SendState>('idle')

  const phoneDisplay = data?.phone || BUSINESS_CONTACT.phoneDisplay
  const emailDisplay = data?.email || BUSINESS_CONTACT.emails[0]?.address || 'hello@example.com'
  const addressDisplay = data?.location || BUSINESS_CONTACT.address.full

  const socialLinks = (
    Array.isArray(data?.socialLinks) && data.socialLinks.length > 0
      ? data.socialLinks
      : DEFAULT_SOCIAL
  ).filter((s) => s?.url?.trim())

  const navLinks: FooterLinkItem[] = (() => {
    const fromCms = [
      ...(data?.servicesLinks ?? []),
      ...(data?.infoLinks ?? []),
    ].filter((l) => l?.label && l?.href)
    if (fromCms.length === 0) return DEFAULT_NAV
    // Deduplicate by href, keep order
    const seen = new Set<string>()
    const out: FooterLinkItem[] = []
    for (const l of fromCms) {
      const h = (l.href || '').trim()
      if (!h || seen.has(h)) continue
      seen.add(h)
      out.push(l)
      if (out.length >= 6) break
    }
    return out.length > 0 ? out : DEFAULT_NAV
  })()

  const emailOk = EMAIL_RE.test(email.trim())
  const canSend =
    firstName.trim().length > 0 &&
    emailOk &&
    message.trim().length >= MIN_MESSAGE &&
    privacyAgreed &&
    sendState !== 'sending' &&
    sendState !== 'success'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSend) return
    setSendState('sending')

    const name = `${firstName.trim()} ${lastName.trim()}`.trim()
    const companyField = [company.trim(), position.trim()].filter(Boolean).join(' — ')
    const messageBody = [
      message.trim(),
      phone.trim() ? `\nPhone: ${phone.trim()}` : '',
      position.trim() ? `\nPosition: ${position.trim()}` : '',
    ]
      .join('')
      .slice(0, MAX_MESSAGE)

    try {
      // API message path: `contact` = email (or phone); we use email for Smaily + Telegram.
      await submitContactMessageToTelegram(messageBody, SOURCE, email.trim(), {
        name,
        company: companyField,
        marketingConsent: privacyAgreed,
      })
      pushDataLayerEvent({
        event: 'form_submission_success',
        form_id: SOURCE,
        course_title: 'Footer consultation',
      })
      setSendState('success')
      setFirstName('')
      setLastName('')
      setCompany('')
      setPosition('')
      setEmail('')
      setPhone('')
      setMessage('')
      setPrivacyAgreed(false)
    } catch {
      setSendState('error')
    }
  }

  function resetError() {
    if (sendState === 'error') setSendState('idle')
  }

  const busy = sendState === 'sending' || sendState === 'success'

  return (
    <footer className="footer-contact-form-wrapper relative w-full overflow-hidden text-white">
      {/* ── Upper: Get in Touch ── */}
      <div className="footer-contact-upper relative bg-[rgb(var(--footer-contact-bg))]">
        <Container size="6xl" className="relative z-10 py-14 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h2 className="footer-contact-heading mb-10 text-3xl font-light tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Get in Touch
              </h2>

              <form onSubmit={onSubmit} className="relative z-10 space-y-7" noValidate>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    id={`${formId}-first`}
                    label="First Name"
                    value={firstName}
                    onChange={(v) => {
                      setFirstName(v.slice(0, 80))
                      resetError()
                    }}
                    autoComplete="given-name"
                    disabled={busy}
                  />
                  <Field
                    id={`${formId}-last`}
                    label="Last Name"
                    value={lastName}
                    onChange={(v) => {
                      setLastName(v.slice(0, 80))
                      resetError()
                    }}
                    autoComplete="family-name"
                    disabled={busy}
                  />
                  <Field
                    id={`${formId}-company`}
                    label="Company"
                    value={company}
                    onChange={(v) => {
                      setCompany(v.slice(0, 120))
                      resetError()
                    }}
                    autoComplete="organization"
                    disabled={busy}
                  />
                  <Field
                    id={`${formId}-position`}
                    label="Position"
                    value={position}
                    onChange={(v) => {
                      setPosition(v.slice(0, 120))
                      resetError()
                    }}
                    autoComplete="organization-title"
                    disabled={busy}
                  />
                  <Field
                    id={`${formId}-email`}
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(v) => {
                      setEmail(v.slice(0, 128))
                      resetError()
                    }}
                    autoComplete="email"
                    disabled={busy}
                  />
                  <Field
                    id={`${formId}-phone`}
                    label="Phone"
                    type="tel"
                    value={phone}
                    onChange={(v) => {
                      setPhone(v.slice(0, 40))
                      resetError()
                    }}
                    autoComplete="tel"
                    disabled={busy}
                  />
                </div>

                <label className="footer-contact-field block">
                  <span className="footer-contact-label mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                    Message
                  </span>
                  <textarea
                    id={`${formId}-message`}
                    rows={3}
                    value={message}
                    disabled={busy}
                    onChange={(e) => {
                      setMessage(e.target.value.slice(0, MAX_MESSAGE))
                      resetError()
                    }}
                    placeholder="Write your message…"
                    className="footer-contact-input min-h-[5.5rem] w-full resize-y border-0 border-b border-white/25 bg-transparent px-0 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[rgb(var(--footer-contact-accent))] disabled:opacity-50"
                  />
                </label>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex max-w-md cursor-pointer items-start gap-2.5 text-xs text-white/70">
                    <input
                      type="checkbox"
                      checked={privacyAgreed}
                      disabled={busy}
                      onChange={(e) => {
                        setPrivacyAgreed(e.target.checked)
                        resetError()
                      }}
                      className="footer-contact-checkbox mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm border-white/40 bg-transparent text-[rgb(var(--footer-contact-accent))] focus:ring-[rgb(var(--footer-contact-accent))]"
                    />
                    <span>
                      I agree with{' '}
                      <Link
                        href={PRIVACY_HREF}
                        className="underline underline-offset-2 transition-colors hover:text-white"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!canSend}
                    className="footer-contact-submit inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--footer-contact-accent))] px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {sendState === 'sending' ? 'Sending…' : 'Get consultation'}
                  </button>
                </div>

                {sendState === 'success' ? (
                  <p className="text-sm font-medium text-emerald-300" role="status">
                    Thank you — your message was sent. We will get back to you soon.
                  </p>
                ) : null}
                {sendState === 'error' ? (
                  <p className="text-sm font-medium text-red-300" role="alert">
                    Sending failed. Please try again or email us directly.
                  </p>
                ) : null}
                {email.trim() && !emailOk ? (
                  <p className="text-xs text-white/50">Please enter a valid email address.</p>
                ) : null}
              </form>
            </div>

            <aside className="relative z-10 flex flex-col justify-between gap-10 lg:col-span-4 lg:pl-4">
              <div className="space-y-6 text-sm">
                <div>
                  <p className="footer-contact-label mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                    {data?.phoneLabel || 'Phone'}
                  </p>
                  <a
                    href={`tel:${phoneDisplay.replace(/\s+/g, '')}`}
                    className="text-white/90 transition-colors hover:text-white"
                  >
                    {phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="footer-contact-label mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                    {data?.emailLabel || 'Email'}
                  </p>
                  <a
                    href={`mailto:${emailDisplay}`}
                    className="break-all text-white/90 transition-colors hover:text-white"
                  >
                    {emailDisplay}
                  </a>
                </div>
                <div>
                  <p className="footer-contact-label mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                    {data?.locationLabel || 'Address'}
                  </p>
                  <p className="max-w-xs leading-relaxed text-white/90">{addressDisplay}</p>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  {socialLinks.map((item, index) => (
                    <a
                      key={`${item.platform || 'social'}-${index}`}
                      href={item.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-contact-social flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors hover:border-white hover:text-white"
                      aria-label={footerSocialAriaLabel(item)}
                    >
                      <FooterSocialIcon platform={item.platform} />
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
        <EngineeringLineArt />
      </div>

      {/* ── Lower bar ── */}
      <div className="footer-contact-lower bg-[rgb(var(--footer-contact-bar-bg))]">
        <Container size="6xl" className="py-6 sm:py-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0 shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                {data?.brandBadge || 'Site Name'}
              </p>
              <p className="mt-1 text-sm font-semibold tracking-wide text-white sm:text-base">
                {data?.brandTitle || 'Site Name'}
              </p>
            </div>

            <nav
              className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/65"
              aria-label="Footer"
            >
              {navLinks.map((link, i) => (
                <Link
                  key={`${link.href}-${i}`}
                  href={link.href || '#'}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              {socialLinks.slice(0, 5).map((item, index) => (
                <a
                  key={`bar-${item.platform || 's'}-${index}`}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-social flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
                  aria-label={footerSocialAriaLabel(item)}
                >
                  <span className="scale-90">
                    <FooterSocialIcon platform={item.platform} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-1 border-t border-white/10 pt-4 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>{data?.copyrightText || `© ${new Date().getFullYear()} Site Name. All rights reserved.`}</p>
            {data?.bottomTagline ? <p>{data.bottomTagline}</p> : null}
          </div>
        </Container>
      </div>
    </footer>
  )
}
