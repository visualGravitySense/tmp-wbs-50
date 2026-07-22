'use client'

import { useLayoutEffect } from 'react'

import {
  applyColorSchemeFromStorage,
  installExtensionAttributeGuard,
  syncCookieFromLocalStorage,
} from '@/lib/theme-persistence'

export function ThemeBootstrap() {
  useLayoutEffect(() => {
    installExtensionAttributeGuard()
    syncCookieFromLocalStorage()
    applyColorSchemeFromStorage()
  }, [])

  return null
}
