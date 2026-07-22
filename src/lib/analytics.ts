/**
 * Google Analytics is disabled site-wide.
 * Re-enable only by setting NEXT_PUBLIC_GA_MEASUREMENT_ID and mounting <GoogleAnalytics />.
 */
export const ANALYTICS_ENABLED = false

/** Google Analytics 4 measurement ID — empty while analytics is off. */
export const GA_MEASUREMENT_ID = ANALYTICS_ENABLED
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || ''
  : ''

export const COOKIE_CONSENT_STORAGE_KEY = 'cookie-consent'

/** Fired when the user chooses accept or essential-only. */
export const COOKIE_CONSENT_CHANGED_EVENT = 'cookie-consent-changed'

/** @deprecated Use COOKIE_CONSENT_CHANGED_EVENT */
export const COOKIE_CONSENT_ACCEPTED_EVENT = COOKIE_CONSENT_CHANGED_EVENT

export const COOKIE_CONSENT_ALL = 'all'
export const COOKIE_CONSENT_ESSENTIAL = 'essential'

export type CookieConsentChoice = typeof COOKIE_CONSENT_ALL | typeof COOKIE_CONSENT_ESSENTIAL

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof window === 'undefined') return null
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    if (value === COOKIE_CONSENT_ALL || value === 'accepted') return COOKIE_CONSENT_ALL
    if (value === COOKIE_CONSENT_ESSENTIAL) return COOKIE_CONSENT_ESSENTIAL
    return null
  } catch {
    return null
  }
}

export function hasAnalyticsConsent(): boolean {
  if (!ANALYTICS_ENABLED) return false
  return readCookieConsent() === COOKIE_CONSENT_ALL
}

export function setCookieConsent(choice: CookieConsentChoice) {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice)
  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGED_EVENT))
}

/**
 * GTM/GA dataLayer push. No-op while ANALYTICS_ENABLED is false
 * (does not create dataLayer or send events).
 */
export function pushDataLayerEvent(_payload: Record<string, unknown>): void {
  if (!ANALYTICS_ENABLED) return
  if (typeof window === 'undefined') return
  const w = window as Window & { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push(_payload)
}
