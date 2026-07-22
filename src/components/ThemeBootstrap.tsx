'use client'

import { useLayoutEffect } from 'react'

import {
  applyColorSchemeFromStorage,
  installExtensionAttributeGuard,
  syncCookieFromLocalStorage,
} from '@/lib/theme-persistence'

const BRAND_PREVIEW_VALUES = new Set(['opstar', 'vip-holidays', 'swiss-minimalism'])

/** Dev/preview: `?brand=swiss-minimalism` overrides body data-brand without CMS. */
function applyBrandPreviewFromQuery() {
  if (typeof window === 'undefined') return
  try {
    const brand = new URLSearchParams(window.location.search).get('brand')?.trim()
    if (brand && BRAND_PREVIEW_VALUES.has(brand)) {
      document.body.setAttribute('data-brand', brand)
    }
  } catch {
    /* ignore */
  }
}

export function ThemeBootstrap() {
  useLayoutEffect(() => {
    installExtensionAttributeGuard()
    syncCookieFromLocalStorage()
    applyColorSchemeFromStorage()
    applyBrandPreviewFromQuery()
  }, [])

  return null
}
