'use client';

import React, { useState, type FormEvent } from 'react';
import { Alert, FormField, BrandVibrantButton, Input, Label, Spinner } from '@/components/ui';
import { HandCoins, Send } from 'lucide-react';
import { isValidIsikukood, normalizeIsikukood } from '@/lib/grantInquiry/isikukood';
import { pushDataLayerEvent } from '@/lib/analytics';
import { submitGrantInquiry } from '@/lib/telegramLeadClient';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface GrantSectionClientFormProps {
  ctaText?: string;
  responseText?: string;
  align?: 'start' | 'center';
  className?: string;
}

export default function GrantSectionClientForm({
  ctaText,
  responseText,
  align = 'start',
  className,
}: GrantSectionClientFormProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isikukood, setIsikukood] = useState('')
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleInquirySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nameTrim = name.trim()
    const emailTrim = email.trim()
    const idTrim = normalizeIsikukood(isikukood)

    if (nameTrim.length < 2) {
      setError('Palun sisesta oma nimi.')
      return
    }
    if (!EMAIL_RE.test(emailTrim)) {
      setError('Palun sisesta kehtiv e-posti aadress.')
      return
    }
    if (!isValidIsikukood(idTrim)) {
      setError('Isikukood peab olema 11-kohaline ja kehtiv (või jäta tühjaks).')
      return
    }

    setError('')
    setPending(true)
    try {
      await submitGrantInquiry({
        name: nameTrim,
        email: emailTrim,
        isikukood: idTrim || undefined,
      })
      pushDataLayerEvent({
        event: 'form_submission_success',
        form_id: 'grant_inquiry',
        course_title: 'General',
      })
      setSent(true)
      setName('')
      setEmail('')
      setIsikukood('')
    } catch {
      setError('Saatmine ebaõnnestus. Palun proovi uuesti.')
    } finally {
      setPending(false)
    }
  }

  const centered = align === 'center'

  return (
    <div className={`space-y-4 pt-1 ${className ?? ''}`}>
      <div
        className={`flex flex-col gap-4 ${
          centered
            ? 'items-center sm:flex-row sm:justify-center'
            : 'items-stretch sm:flex-row sm:items-center'
        } sm:gap-5`}
      >
        <BrandVibrantButton
          icon={HandCoins}
          type="button"
          aria-expanded={inquiryOpen}
          aria-controls="grant-inquiry-panel"
          onClick={() => {
            setInquiryOpen((v) => !v)
            setError('')
          }}
          className={centered ? 'w-full sm:w-auto' : 'w-full sm:w-auto'}
        >
          {ctaText || 'Uuri toetuse kohta'}
        </BrandVibrantButton>
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 ${
            centered ? 'justify-center' : 'pl-1'
          }`}
        >
          <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--text-secondary))] sm:text-xs">
            {responseText || 'Vastus 24h jooksul'}
          </span>
        </div>
      </div>

      {inquiryOpen ? (
        <div
          id="grant-inquiry-panel"
          className={`animate-in fade-in slide-in-from-top-1 duration-200 rounded-2xl border border-blue-500/25 bg-white/90 p-5 shadow-lg backdrop-blur-sm dark:border-blue-500/30 dark:bg-slate-900/80 ${
            centered ? 'mx-auto max-w-md text-left' : ''
          }`}
        >
          {sent ? (
            <div className="space-y-2 text-left">
              <p className="text-base font-bold text-blue-700 dark:text-blue-300">Aitäh!</p>
              <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
                Meie meeskond vaatab sinu andmed üle ja vastab 24 tunni jooksul, kas Töötukassa toetus on sinu
                olukorras võimalik.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
                Sisesta oma andmed — Meie meeskond saab täpsemalt öelda, kas riigi koolitustoetus on sinu jaoks
                võimalik. Isikukood on valikuline, kuid aitab kiiremini kontrollida.
              </p>
              <FormField>
                <Label htmlFor="grant-inquiry-name" variant="compact" className="text-blue-700 dark:text-blue-300">
                  Nimi *
                </Label>
                <Input
                  id="grant-inquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="py-3 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </FormField>
              <FormField>
                <Label htmlFor="grant-inquiry-email" variant="compact" className="text-blue-700 dark:text-blue-300">
                  E-post *
                </Label>
                <Input
                  id="grant-inquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nimi@ettevote.ee"
                  className="py-3 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </FormField>
              <FormField>
                <Label htmlFor="grant-inquiry-id" variant="compact" className="text-blue-700 dark:text-blue-300">
                  Isikukood (valikuline)
                </Label>
                <Input
                  id="grant-inquiry-id"
                  name="isikukood"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={isikukood}
                  onChange={(e) => setIsikukood(e.target.value.replace(/[^\d\s]/g, '').slice(0, 13))}
                  placeholder="39001010000"
                  className="py-3 font-mono tracking-wide focus:border-blue-500 focus:ring-blue-500/20"
                />
                <p className="mt-1 text-xs text-[rgb(var(--text-secondary))/0.8]">
                  11 numbrit. Jätad tühjaks, kui eelistad ainult e-posti teel vastust.
                </p>
              </FormField>
              <p className="text-xs text-[rgb(var(--text-secondary))/0.85]">
                Saates nõustud kontaktandmete töötlemisega päringu vastamiseks (privaatsuspoliitika).
              </p>
              {error ? <Alert variant="error">{error}</Alert> : null}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <BrandVibrantButton icon={Send} type="submit" disabled={pending} className="w-full sm:w-auto">
                  {pending ? (
                    <>
                      <Spinner size="sm" className="mr-2 text-white" label="Saadan" />
                      Saadan…
                    </>
                  ) : (
                    'Saada päring'
                  )}
                </BrandVibrantButton>
                <button
                  type="button"
                  onClick={() => {
                    setInquiryOpen(false)
                    setError('')
                  }}
                  className="min-h-11 px-3 text-sm font-semibold text-[rgb(var(--text-secondary))] underline underline-offset-2"
                >
                  Sulge
                </button>
              </div>
            </form>
          )}
        </div>
      ) : null}
    </div>
  )
}
