'use client'

import { useState, Suspense, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import CourseRegistrationGdprBlock from '@/components/CourseRegistrationGdprBlock'
import {
  Alert,
  BrandVibrantButton,
  FormField,
  Input,
  Label,
  Spinner,
  Textarea,
} from '@/components/ui'
import { pushDataLayerEvent } from '@/lib/analytics'
import { submitCourseRegistration } from '@/lib/telegramLeadClient'
import { cn } from '@/lib/utils'
import type { FormControlVariant } from '@/components/ui'

const SUBMIT_LABEL = 'Registreeri'

export type CourseRegistrationFormProps = {
  onSubmit?: (payload: FormData) => void | Promise<void>
  visualPreset?: 'default' | 'glass'
  defaultCohortId?: string
  defaultNote?: string
}

function CourseRegistrationFormInner({
  onSubmit,
  visualPreset = 'default',
  defaultCohortId,
  defaultNote,
}: CourseRegistrationFormProps) {
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  
  const searchParams = useSearchParams()
  const packageTier = searchParams.get('package') || undefined

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    setPending(true)
    setSubmitError(false)
    try {
      if (onSubmit) {
        await onSubmit(fd)
      } else {
        await submitCourseRegistration({
          name: String(fd.get('name') ?? ''),
          company: String(fd.get('company') ?? '') || undefined,
          email: String(fd.get('email') ?? ''),
          phone: String(fd.get('phone') ?? '') || undefined,
          note: String(fd.get('note') ?? '') || undefined,
          cohort: String(fd.get('cohort') ?? '') || undefined,
          packageTier: packageTier,
          marketingConsent: fd.get('marketingConsent') === 'true',
        })
      }
      pushDataLayerEvent({
        event: 'form_submission_success',
        form_id: 'registration_koolitus',
        course_title: packageTier || String(fd.get('cohort') ?? '') || 'General',
      })
      setSent(true)
      form.reset()
    } catch {
      setSubmitError(true)
    } finally {
      setPending(false)
    }
  }

  const fieldVariant: FormControlVariant = visualPreset === 'glass' ? 'glass' : 'default'
  const labelVariant = visualPreset === 'glass' ? 'glass' : 'default'
  const glass = visualPreset === 'glass'

  if (sent) {
    return (
      <div
        className={cn(
          'px-6 py-10 text-center',
          glass
            ? 'rounded-2xl border border-emerald-300/35 bg-gradient-to-br from-emerald-100/50 to-teal-50/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_12px_40px_-16px_rgba(16,185,129,0.35)] backdrop-blur-xl dark:border-emerald-400/35 dark:from-emerald-950/55 dark:to-teal-950/40 dark:shadow-[inset_0_1px_0_0_rgba(167,243,208,0.12),0_0_0_1px_rgba(52,211,153,0.12),0_20px_56px_-24px_rgba(16,185,129,0.28)]'
            : 'rounded-2xl border border-emerald-200/80 bg-emerald-50/90 dark:border-emerald-500/25 dark:bg-emerald-950/30',
        )}
      >
        <p className={cn('text-lg font-bold', glass ? 'text-emerald-900 dark:text-emerald-50' : 'text-emerald-900 dark:text-emerald-100')}>
          Aitäh!
        </p>
        <p
          className={cn(
            'mt-2 text-sm',
            glass ? 'text-emerald-900/85 dark:text-emerald-100/90' : 'text-emerald-800/90 dark:text-emerald-200/90',
          )}
        >
          Sinu soov on kätte saadud. Võtame peagi ühendust.
        </p>
      </div>
    )
  }

  const cohortId = defaultCohortId?.trim()
  const prefilledNote =
    defaultNote !== undefined ? defaultNote : cohortId ? `Soovin registreeruda grupile (ID: ${cohortId}).` : undefined

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-5">
      {cohortId ? <input type="hidden" name="cohort" value={cohortId} /> : null}

      <FormField>
        <Label htmlFor="reg-name" variant={labelVariant}>
          Nimi *
        </Label>
        <Input id="reg-name" name="name" type="text" required autoComplete="name" variant={fieldVariant} />
      </FormField>

      <FormField>
        <Label htmlFor="reg-company" variant={labelVariant}>
          Ettevõte
        </Label>
        <Input id="reg-company" name="company" type="text" autoComplete="organization" variant={fieldVariant} />
      </FormField>

      <FormField>
        <Label htmlFor="reg-email" variant={labelVariant}>
          E-post *
        </Label>
        <Input id="reg-email" name="email" type="email" required autoComplete="email" variant={fieldVariant} />
      </FormField>

      <FormField>
        <Label htmlFor="reg-phone" variant={labelVariant}>
          Telefon
        </Label>
        <Input id="reg-phone" name="phone" type="tel" autoComplete="tel" variant={fieldVariant} />
      </FormField>

      <FormField>
        <Label htmlFor="reg-note" variant={labelVariant}>
          Märkus (valikuline)
        </Label>
        <Textarea
          id="reg-note"
          name="note"
          rows={3}
          variant={fieldVariant}
          {...(prefilledNote ? { defaultValue: prefilledNote } : {})}
        />
      </FormField>

      <CourseRegistrationGdprBlock
        surface={glass ? 'glass' : 'default'}
        submitActionLabel={SUBMIT_LABEL}
        privacyPolicyHref="/privacy-policy"
        trainingTermsHref="/privacy-policy"
        consentMode="lazy"
        showMarketingOptIn
      />

      {submitError ? (
        <Alert variant="error" className="text-xs">
          Saatmine ebaõnnestus. Proovi hetke pärast uuesti või kirjuta otse kontaktivormi kaudu.
        </Alert>
      ) : null}

      <div className="pt-1">
        <BrandVibrantButton
          type="submit"
          variant="marketing"
          className="inline-flex w-full items-center justify-center gap-2 sm:w-auto"
          disabled={pending}
        >
          {pending ? <Spinner size="sm" className="text-white" label="Saadan" /> : null}
          {pending ? 'Saadan…' : SUBMIT_LABEL}
        </BrandVibrantButton>
      </div>
    </form>
  )
}

export default function CourseRegistrationForm(props: CourseRegistrationFormProps) {
  return (
    <Suspense fallback={<div className="h-20 flex items-center justify-center"><Spinner size="md" /></div>}>
      <CourseRegistrationFormInner {...props} />
    </Suspense>
  )
}
