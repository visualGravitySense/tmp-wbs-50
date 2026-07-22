'use client';

import React, { useState, type FormEvent } from 'react';
import { Alert, FormField, GreenButton, Input, Label, Spinner, WhiteButton } from '@/components/ui';
import { Send } from 'lucide-react';
import { pushDataLayerEvent } from '@/lib/analytics';
import { triggerProgramPdfDownload } from '@/lib/nineDays/programPdfDownload';
import { submitEmailLead } from '@/lib/telegramLeadClient';

interface NineDaysMiniLeadForm {
  introTitle?: string;
  introText?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  submitText?: string;
  submitPendingText?: string;
  closeText?: string;
  successTitle?: string;
  successText?: string;
  readMoreLinkText?: string;
}

interface NineDaysMiniClientFormProps {
  whiteButtonText?: string;
  whiteButtonLink?: string;
  lead?: NineDaysMiniLeadForm;
}

export default function NineDaysMiniClientForm({ whiteButtonText, whiteButtonLink, lead }: NineDaysMiniClientFormProps) {
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadPending, setLeadPending] = useState(false)
  const [leadSent, setLeadSent] = useState(false)
  const [pdfDownloadStarted, setPdfDownloadStarted] = useState(false)
  const [leadError, setLeadError] = useState('')

  const readMoreHref = whiteButtonLink && whiteButtonLink !== '#' ? whiteButtonLink : undefined

  async function handleLeadSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = leadEmail.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setLeadError('Palun sisesta kehtiv e-posti aadress.')
      return
    }
    setLeadError('')
    setLeadPending(true)
    try {
      await submitEmailLead(trimmed, 'nine-days-mini')
      const downloaded = await triggerProgramPdfDownload()
      setPdfDownloadStarted(downloaded)
      pushDataLayerEvent({
        event: 'form_submission_success',
        form_id: 'nine_days_mini_lead',
        course_title: 'General',
      })
      setLeadSent(true)
      setLeadEmail('')
    } catch (err) {
      const status = (err as Error & { status?: number }).status
      if (status === 503) {
        setLeadError('Teenus pole veel seadistatud. Kontrolli serveri keskkonnamuutujaid.')
      } else {
        setLeadError('Saatmine ebaõnnestus. Palun proovi uuesti.')
      }
    } finally {
      setLeadPending(false)
    }
  }

  return (
    <div className="space-y-3 flex flex-col items-stretch w-full">
      <WhiteButton
        text={whiteButtonText}
        className="w-full"
        aria-expanded={leadOpen}
        onClick={() => {
          setLeadOpen((open) => !open)
          setLeadError('')
        }}
      />
      {leadOpen ? (
        <div
          className="animate-in fade-in slide-in-from-top-1 duration-200 rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-[0_20px_52px_-34px_rgba(15,23,42,0.16)] dark:border-white/12 dark:bg-slate-900/75"
          id="nine-days-mini-lead-panel"
        >
          {leadSent ? (
            <div className="space-y-3 text-left">
              <p className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                {lead?.successTitle || 'Aitäh!'}
              </p>
              <p className="text-sm leading-relaxed text-[rgb(var(--color-foreground))/0.75]">
                {lead?.successText ||
                  (pdfDownloadStarted
                    ? 'Programmi PDF peaks kohe alla laadima. Kui ei näe faili, kontrolli brauseri allalaadimisi.'
                    : 'Aitäh — andmed on kätte saadud. PDF faili lisame peagi; võtame ühendust e-posti teel.')}
              </p>
              {readMoreHref ? (
                <a
                  href={readMoreHref}
                  className="inline-flex text-sm font-semibold text-blue-700 dark:text-blue-400 underline decoration-blue-700/35 underline-offset-2 hover:opacity-90"
                >
                  {lead?.readMoreLinkText || 'Soovid kohe lugeda? Ava täispikk kirjeldus →'}
                </a>
              ) : null}
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold leading-snug text-[rgb(var(--color-foreground))]">
                  {lead?.introTitle || 'Saadame programmi sulle e-kirjaga märgitud aadressile.'}
                </p>
                <p className="text-xs leading-relaxed text-[rgb(var(--color-foreground))/0.65]">
                  {lead?.introText ||
                    'Vormi saatmisega kinnitad, et nõustud oma kontaktandmete (e-post) meiega jagamisega, et saaksime sulle materjali saata.'}
                </p>
              </div>
              <FormField>
                <Label
                  htmlFor="nine-days-mini-lead-email"
                  variant="compact"
                  className="text-blue-700 dark:text-blue-400"
                >
                  {lead?.emailLabel || 'E-post'}
                </Label>
                <Input
                  id="nine-days-mini-lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={leadEmail}
                  onChange={(ev) => setLeadEmail(ev.target.value)}
                  placeholder={lead?.emailPlaceholder || 'nimi@ettevote.ee'}
                  required
                  className="py-3 focus:border-blue-700 focus:ring-blue-700/20"
                />
              </FormField>
              {leadError ? <Alert variant="error">{leadError}</Alert> : null}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <GreenButton
                  icon={Send}
                  type="submit"
                  disabled={leadPending}
                >
                  {leadPending ? (
                    <>
                      <Spinner size="sm" className="mr-2 text-white" label="Saadan" />
                      {lead?.submitPendingText || 'Saadan…'}
                    </>
                  ) : (
                    lead?.submitText || 'Saada mulle programm'
                  )}
                </GreenButton>
                <button
                  type="button"
                  onClick={() => {
                    setLeadOpen(false)
                    setLeadError('')
                  }}
                  className="text-center text-sm font-semibold text-[rgb(var(--color-foreground))/0.55] underline decoration-slate-300 underline-offset-2 hover:text-[rgb(var(--color-foreground))] sm:text-right"
                >
                  {lead?.closeText || 'Sulge'}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : null}
    </div>
  )
}
