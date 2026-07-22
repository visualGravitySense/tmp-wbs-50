export const COLOR_SCHEME_STORAGE_KEY = 'ak-color-scheme' as const

/** Same name for cookie — server reads it for first paint without inline scripts. */
export const COLOR_SCHEME_COOKIE_KEY = COLOR_SCHEME_STORAGE_KEY

export const PREFERS_DARK_MEDIA = '(prefers-color-scheme: dark)'

export type StoredColorScheme = 'dark' | 'light'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export function parseColorSchemeCookie(value: string | undefined): StoredColorScheme | null {
  if (value === 'dark' || value === 'light') return value
  return null
}

export function readStoredColorScheme(): StoredColorScheme | null {
  if (typeof window === 'undefined') return null
  try {
    const v = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)
    if (v === 'dark' || v === 'light') return v
  } catch {
    /* ignore */
  }
  return null
}

export function writeColorSchemeCookie(scheme: StoredColorScheme) {
  try {
    document.cookie = `${COLOR_SCHEME_COOKIE_KEY}=${scheme};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`
  } catch {
    /* ignore */
  }
}

/** Mirror localStorage choice into cookie so the next SSR paint matches. */
export function syncCookieFromLocalStorage() {
  const stored = readStoredColorScheme()
  if (stored) writeColorSchemeCookie(stored)
}

export function writeStoredColorScheme(scheme: StoredColorScheme) {
  try {
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, scheme)
    writeColorSchemeCookie(scheme)
  } catch {
    /* ignore */
  }
}

/** Apply theme class from localStorage, cookie, or system preference. */
export function applyColorSchemeFromStorage() {
  if (typeof document === 'undefined') return
  const stored = readStoredColorScheme()
  const root = document.documentElement
  if (stored === 'dark') {
    root.classList.add('dark')
  } else if (stored === 'light') {
    root.classList.remove('dark')
  } else {
    const m = window.matchMedia?.(PREFERS_DARK_MEDIA)
    root.classList.toggle('dark', !!m?.matches)
  }
}

export function installExtensionAttributeGuard() {
  if (typeof window === 'undefined' || (window as Window & { __akExtGuard?: boolean }).__akExtGuard) {
    return
  }
  ;(window as Window & { __akExtGuard?: boolean }).__akExtGuard = true

  const blocked = [
    'data-atm-ext-installed',
    'data-adblock',
    'data-adblocker',
    'data-ublock',
    'data-adguard',
  ]

  const originalSetAttribute = Element.prototype.setAttribute
  Element.prototype.setAttribute = function setAttribute(name: string, value: string) {
    if (this === document.body && blocked.includes(name)) return
    return originalSetAttribute.call(this, name, value)
  }

  const scrubBodyExtensionAttrs = () => {
    if (!document.body) return
    blocked.forEach((attr) => {
      if (document.body.hasAttribute(attr)) document.body.removeAttribute(attr)
    })
  }

  scrubBodyExtensionAttrs()
  queueMicrotask(scrubBodyExtensionAttrs)
}
