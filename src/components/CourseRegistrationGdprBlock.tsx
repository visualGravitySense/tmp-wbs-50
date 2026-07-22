'use client'

import { useId } from 'react'
import { Label } from '@/components/ui'
import { cn } from '@/lib/utils'

export type CourseRegistrationGdprConsentMode = 'lazy' | 'explicit'

export type CourseRegistrationGdprBlockProps = {
  className?: string
  /** `glass` — kontrast ja pinnad registreerumislehe klaas-tausta jaoks. */
  surface?: 'default' | 'glass'
  /** Teksti sees kasutatav tegevuse nimetus (nt nupu silt). */
  submitActionLabel?: string
  /** Privaatsuspoliitika / GDPR leht. */
  privacyPolicyHref?: string
  /** Õppetingimused (eraldi leht või ankur). */
  trainingTermsHref?: string
  /**
   * `lazy` — Variant A: nõusolek tekstina tegevuse juures (vähem klõpse).
   * `explicit` — kaks kohustuslikku märkeruutu (sobib Töötukassa / rangete nõuete korral).
   */
  consentMode?: CourseRegistrationGdprConsentMode
  /** Valikuline turundusnõusolek (eraldi märkeruut, vaikimisi märkimata). */
  showMarketingOptIn?: boolean
  /** Vormi välja nimi turundusnõusoleku jaoks. */
  marketingInputName?: string
  /** Turundusmärkeruudu silt. */
  marketingLabel?: string
}

const defaultPrivacy = '/privacy-policy'
const defaultTrainingTerms = '/privacy-policy'

/**
 * Kursusele registreerumisel: GDPR + õppetingimused (kohustuslik) ja valikuline turundusnõusolek.
 * Kasuta `lazy` konversiooniks või `explicit`, kui on vaja aktiivset märkeruutu.
 */
export default function CourseRegistrationGdprBlock({
  className,
  surface = 'default',
  submitActionLabel = 'Registreeri',
  privacyPolicyHref = defaultPrivacy,
  trainingTermsHref = defaultTrainingTerms,
  consentMode = 'lazy',
  showMarketingOptIn = false,
  marketingInputName = 'marketingConsent',
  marketingLabel = 'Soovin saada koolituse ja uudiste kohta teavet e-posti teel (valikuline).',
}: CourseRegistrationGdprBlockProps) {
  const baseId = useId()
  const privacyId = `${baseId}-privacy`
  const termsId = `${baseId}-terms`
  const marketingId = `${baseId}-marketing`

  const linkClass =
    surface === 'glass'
      ? 'font-semibold text-blue-800 underline decoration-blue-500/40 underline-offset-2 transition hover:text-blue-950 hover:decoration-blue-700 dark:text-sky-100 dark:decoration-sky-300/50 dark:hover:text-white dark:hover:decoration-sky-100/60'
      : 'font-semibold text-blue-700 dark:text-blue-400 underline decoration-blue-400/50 underline-offset-2 transition hover:text-blue-800 hover:decoration-blue-600 dark:text-[rgb(var(--color-primary))] dark:decoration-white/25 dark:hover:text-blue-400'

  const fieldsetGlass =
    'rounded-2xl border border-white/25 bg-white/[0.12] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-md dark:border-white/[0.22] dark:bg-white/[0.09] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(56,189,248,0.05)]'

  return (
    <div
      className={cn(
        'space-y-4 text-left text-xs leading-relaxed sm:text-sm',
        surface === 'glass'
          ? 'text-slate-700 dark:text-slate-100/92'
          : 'text-slate-600 dark:text-[rgb(var(--text-secondary))]',
        className,
      )}
    >
      {consentMode === 'lazy' ? (
        <p className="max-w-xl">
          Vajutades &quot;{submitActionLabel}&quot;, nõustud sa{' '}
          <a href={privacyPolicyHref} className={linkClass} target="_blank" rel="noopener noreferrer">
            privaatsuspoliitikaga
          </a>{' '}
          (sh isikuandmete töötlemisega) ning{' '}
          <a href={trainingTermsHref} className={linkClass} target="_blank" rel="noopener noreferrer">
            õppetingimustega
          </a>
          . Registreerumine ilma nende nõustumiseta ei ole võimalik.
        </p>
      ) : (
        <fieldset
          className={cn(
            'max-w-xl space-y-3',
            surface === 'glass' ? fieldsetGlass : 'rounded-xl border border-slate-200/90 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.04]',
          )}
        >
          <legend className="sr-only">Kohustuslikud nõusolekud</legend>
          <Label variant="checkbox">
            <input
              id={privacyId}
              type="checkbox"
              name="consentPrivacy"
              required
              className={cn(
                'mt-1 h-4 w-4 shrink-0 rounded text-blue-600 focus:ring-blue-500 dark:bg-transparent',
                surface === 'glass'
                  ? 'border-white/40 dark:border-white/25'
                  : 'border-slate-300 dark:border-white/20',
              )}
            />
            <span>
              Olen tutvunud{' '}
              <a href={privacyPolicyHref} className={linkClass} target="_blank" rel="noopener noreferrer">
                privaatsuspoliitikaga
              </a>{' '}
              ja nõustun isikuandmete töötlemisega. <span className="text-red-600 dark:text-red-400">*</span>
            </span>
          </Label>
          <Label variant="checkbox">
            <input
              id={termsId}
              type="checkbox"
              name="consentTrainingTerms"
              required
              className={cn(
                'mt-1 h-4 w-4 shrink-0 rounded text-blue-600 focus:ring-blue-500 dark:bg-transparent',
                surface === 'glass'
                  ? 'border-white/40 dark:border-slate-400/45'
                  : 'border-slate-300 dark:border-white/20',
              )}
            />
            <span>
              Olen lugenud{' '}
              <a href={trainingTermsHref} className={linkClass} target="_blank" rel="noopener noreferrer">
                õppetingimusi
              </a>{' '}
              ja nõustun nendega. <span className="text-red-600 dark:text-red-400">*</span>
            </span>
          </Label>
        </fieldset>
      )}

      {showMarketingOptIn ? (
        <Label variant="checkbox" htmlFor={marketingId} className="max-w-xl">
          <input
            id={marketingId}
            type="checkbox"
            name={marketingInputName}
            value="true"
            className={cn(
              'mt-1 h-4 w-4 shrink-0 rounded text-blue-600 focus:ring-blue-500 dark:bg-transparent',
              surface === 'glass'
                ? 'border-white/40 dark:border-slate-400/45'
                : 'border-slate-300 dark:border-white/20',
            )}
          />
          <span>{marketingLabel}</span>
        </Label>
      ) : null}
    </div>
  )
}
