'use client'

import { useId, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { Alert, FormField, FormMessage, Input, Label, Spinner, Textarea } from '@/components/ui'
import { pushDataLayerEvent } from '@/lib/analytics'
import { submitContactMessageToTelegram } from '@/lib/telegramLeadClient'
import MarketingOptInCheckbox from '@/components/kontakt/MarketingOptInCheckbox'
import type { ResolvedKontaktPage } from '@/types/kontaktPage'

type SendState = 'idle' | 'sending' | 'success' | 'error'

const MIN_LEN = 10
const MAX_MESSAGE = 3500
const MAX_CONTACT = 128
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function phoneDigitCount(s: string): number {
  return s.replace(/\D/g, '').length
}

export type ContactPageFormCopy = ResolvedKontaktPage['messageForm']

type ContactPageFormProps = {
  copy: ContactPageFormCopy
}

export default function ContactPageForm({ copy }: ContactPageFormProps) {
  const formId = useId()
  const contactInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [sendState, setSendState] = useState<SendState>('idle')

  const contactTrim = contact.trim()
  const emailOk = EMAIL_RE.test(contactTrim)
  const phoneDigits = phoneDigitCount(contactTrim)
  const contactOk =
    emailOk || (phoneDigits >= 8 && phoneDigits <= 15 && contactTrim.length > 0)
  const contactHasError = contactTrim.length > 0 && !contactOk
  const canSend =
    name.trim().length > 0 &&
    message.trim().length >= MIN_LEN &&
    contactOk &&
    sendState !== 'sending' &&
    sendState !== 'success'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSend) return
    setSendState('sending')
    try {
      await submitContactMessageToTelegram(message.trim(), 'kontakt-page', contactTrim, {
        name: name.trim(),
        company: company.trim(),
        marketingConsent: emailOk ? marketingConsent : false,
      })
      pushDataLayerEvent({
        event: 'form_submission_success',
        form_id: 'contact_page',
        course_title: 'General',
      })
      setSendState('success')
      setMessage('')
      setContact('')
      setName('')
      setCompany('')
      setMarketingConsent(false)
    } catch {
      setSendState('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-labelledby={`${formId}-heading`}>
      <h2 id={`${formId}-heading`} className="sr-only">
        {copy.formAriaTitle}
      </h2>

      <FormField>
        <Label htmlFor={`${formId}-name`} variant="muted">
          Nimi *
        </Label>
        <Input
          id={`${formId}-name`}
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value.slice(0, MAX_CONTACT))
            if (sendState === 'error') setSendState('idle')
          }}
          placeholder="Sinu nimi"
          variant="panel"
          disabled={sendState === 'sending' || sendState === 'success'}
        />
      </FormField>

      <FormField>
        <Label htmlFor={`${formId}-company`} variant="muted">
          Ettevõte
        </Label>
        <Input
          id={`${formId}-company`}
          type="text"
          name="company"
          autoComplete="organization"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value.slice(0, MAX_CONTACT))
            if (sendState === 'error') setSendState('idle')
          }}
          placeholder="Sinu ettevõte"
          variant="panel"
          disabled={sendState === 'sending' || sendState === 'success'}
        />
      </FormField>

      <FormField>
        <Label htmlFor={`${formId}-contact`} variant="muted">
          {copy.contactFieldLabel}
        </Label>
        <Input
          id={`${formId}-contact`}
          ref={contactInputRef}
          type="text"
          name="contact"
          inputMode="text"
          autoComplete="on"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value.slice(0, MAX_CONTACT))
            if (sendState === 'error') setSendState('idle')
          }}
          placeholder={copy.contactPlaceholder}
          aria-invalid={contactHasError}
          variant="panel"
          disabled={sendState === 'sending' || sendState === 'success'}
        />
      </FormField>
      <FormMessage>{copy.contactHint}</FormMessage>

      <MarketingOptInCheckbox
        checked={marketingConsent}
        onChange={(checked) => {
          setMarketingConsent(checked)
          if (sendState === 'error') setSendState('idle')
        }}
        disabled={sendState === 'sending' || sendState === 'success'}
      />

      <FormField>
        <Label htmlFor={`${formId}-message`} variant="muted">
          {copy.messageFieldLabel}
        </Label>
        <Textarea
          id={`${formId}-message`}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            if (sendState === 'error') setSendState('idle')
          }}
          rows={5}
          maxLength={MAX_MESSAGE}
          placeholder={copy.messagePlaceholder}
          variant="panel"
          disabled={sendState === 'sending' || sendState === 'success'}
        />
        <FormMessage>{copy.messageHint}</FormMessage>
      </FormField>
      {sendState === 'error' ? (
        <Alert variant="error" className="text-sm">
          {copy.errorMessage}
        </Alert>
      ) : null}
      {sendState === 'success' ? (
        <Alert variant="success">
          <p className="font-semibold text-emerald-800 dark:text-emerald-50">{copy.successTitle}</p>
          <p className="mt-1.5 text-emerald-800/90 dark:text-emerald-100/90">{copy.successBody}</p>
        </Alert>
      ) : null}
      <button
        type="submit"
        disabled={!canSend}
        className="group relative overflow-hidden flex w-full items-center justify-center gap-2 rounded-full btn-vibrant-blue !py-3 text-sm font-black uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none sm:w-auto sm:!px-8"
      >
        <span className="relative z-10 flex items-center gap-2">
          {sendState === 'sending' ? (
            <Spinner size="sm" className="text-current" label={copy.submittingButtonText} />
          ) : (
            <Send className="h-4 w-4 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5" />
          )}
          {sendState === 'sending' ? copy.submittingButtonText : copy.submitButtonText}
        </span>
        <span className="absolute inset-0 z-0 w-[200%] -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[60%]" />
      </button>
    </form>
  )
}
