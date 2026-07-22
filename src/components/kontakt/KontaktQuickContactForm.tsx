'use client'

import { useId, useState } from 'react'
import { Send } from 'lucide-react'
import { Alert, FormField, Input, Label, Spinner } from '@/components/ui'
import { pushDataLayerEvent } from '@/lib/analytics'
import { submitEmailLead } from '@/lib/telegramLeadClient'
import MarketingOptInCheckbox from '@/components/kontakt/MarketingOptInCheckbox'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL = 254

type SendState = 'idle' | 'sending' | 'success' | 'error'

/** Compact e-posti vorm Otsekontakt plokis (Telegram + valikuline Smaily). */
export default function KontaktQuickContactForm() {
  const formId = useId()
  const [email, setEmail] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [sendState, setSendState] = useState<SendState>('idle')

  const emailTrim = email.trim()
  const emailOk = EMAIL_RE.test(emailTrim)
  const emailHasError = emailTrim.length > 0 && !emailOk
  const canSend = emailOk && sendState !== 'sending' && sendState !== 'success'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSend) return
    setSendState('sending')
    try {
      await submitEmailLead(emailTrim, 'kontakt-otsekontakt', { marketingConsent })
      pushDataLayerEvent({
        event: 'form_submission_success',
        form_id: 'kontakt_otsekontakt',
        course_title: 'General',
      })
      setSendState('success')
      setEmail('')
      setMarketingConsent(false)
    } catch {
      setSendState('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 border-t border-[var(--border)]/70 pt-6" aria-labelledby={`${formId}-heading`}>
      <h3 id={`${formId}-heading`} className="text-sm font-bold text-[rgb(var(--text-primary))]">
        Jäta e-post — võtame ühendust
      </h3>

      <FormField>
        <Label htmlFor={`${formId}-email`} variant="muted">
          E-post
        </Label>
        <Input
          id={`${formId}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.slice(0, MAX_EMAIL))
            if (sendState === 'error') setSendState('idle')
          }}
          placeholder="nimi@näide.ee"
          aria-invalid={emailHasError}
          variant="panel"
          disabled={sendState === 'sending' || sendState === 'success'}
        />
      </FormField>

      <MarketingOptInCheckbox
        checked={marketingConsent}
        onChange={(checked) => {
          setMarketingConsent(checked)
          if (sendState === 'error') setSendState('idle')
        }}
        disabled={sendState === 'sending' || sendState === 'success'}
      />

      {sendState === 'error' ? (
        <Alert variant="error" className="text-sm">
          Saatmine ebaõnnestus. Proovi hetke pärast uuesti või kirjuta otse e-postiga.
        </Alert>
      ) : null}

      {sendState === 'success' ? (
        <Alert variant="success">
          <p className="font-semibold text-emerald-800 dark:text-emerald-50">Aitäh — e-post on kohale jõudnud.</p>
          <p className="mt-1.5 text-emerald-800/90 dark:text-emerald-100/90">
            Võtame ühendust esimesel võimalusel.
          </p>
        </Alert>
      ) : null}

      <button
        type="submit"
        disabled={!canSend}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-[var(--border)] bg-transparent px-6 py-3 text-sm font-bold text-[rgb(var(--text-primary))] transition-colors hover:border-blue-400/50 hover:bg-blue-500/5 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        <span className="relative z-10 flex items-center gap-2">
          {sendState === 'sending' ? (
            <Spinner size="sm" className="text-current" label="Saadan…" />
          ) : (
            <Send className="h-4 w-4 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5" />
          )}
          {sendState === 'sending' ? 'Saadan…' : 'Saada e-post'}
        </span>
      </button>
    </form>
  )
}