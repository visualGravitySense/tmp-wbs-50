'use client'

import { EyebrowPillBadge, GlassPanel } from '@/components/ui'
import {
  COOKIE_CONSENT_ALL,
  COOKIE_CONSENT_ESSENTIAL,
  COOKIE_CONSENT_STORAGE_KEY,
  setCookieConsent,
} from '@/lib/analytics'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SiteSettings } from '@/types/sanity'

interface CookieBannerProps {
  data?: SiteSettings['cookieBanner']
}

const buttonBaseClass =
  'flex-1 rounded-full px-6 py-3 text-[10px] font-black tracking-widest uppercase transition-all duration-300 active:scale-[0.98] cursor-pointer'

export default function CookieBanner({ data }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    if (consent) return

    let shown = false
    const showBanner = () => {
      if (shown) return
      shown = true
      setIsVisible(true)
      removeListeners()
    }

    const removeListeners = () => {
      window.removeEventListener('scroll', showBanner)
      window.removeEventListener('pointermove', showBanner)
      window.removeEventListener('touchstart', showBanner)
    }

    window.addEventListener('scroll', showBanner, { passive: true })
    window.addEventListener('pointermove', showBanner, { passive: true })
    window.addEventListener('touchstart', showBanner, { passive: true })

    const timer = setTimeout(showBanner, 12000)

    return () => {
      removeListeners()
      clearTimeout(timer)
    }
  }, [])

  const closeWithChoice = (choice: typeof COOKIE_CONSENT_ALL | typeof COOKIE_CONSENT_ESSENTIAL) => {
    setCookieConsent(choice)
    setIsVisible(false)
  }

  if (!isVisible) return null

  const title = data?.title || 'Küpsiste kasutamine'
  const description =
    data?.description ||
    'Kasutame küpsiseid veebilehe toimimiseks ja kasutuskogemuse parandamiseks.'
  const acceptLabel = data?.acceptLabel || 'Nõustun'
  const rejectLabel = data?.rejectLabel || 'Ainult vajalikud'
  const readMoreLabel = data?.readMoreLabel || 'Loe lähemalt'

  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 fixed bottom-6 left-6 right-6 z-[100] duration-700 md:left-auto md:right-8 md:max-w-md">
      <GlassPanel className="relative !p-6 shadow-2xl hover:!translate-y-0 hover:!scale-100 overflow-hidden rounded-glass-card border border-white/10 bg-black/60 backdrop-blur-2xl">
        <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-600/20 blur-[50px]" />

        <div className="relative z-10">
          <div className="mb-4">
            <EyebrowPillBadge text={title} tone="sky" />
          </div>

          <p className="mb-6 text-sm font-medium leading-relaxed text-gray-300">
            {description}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => closeWithChoice(COOKIE_CONSENT_ALL)}
              className={`${buttonBaseClass} bg-white text-black shadow-md hover:bg-sky-500 hover:text-slate-950 hover:shadow-sky-500/20`}
            >
              {acceptLabel}
            </button>
            <button
              type="button"
              onClick={() => closeWithChoice(COOKIE_CONSENT_ESSENTIAL)}
              className={`${buttonBaseClass} border border-white/20 bg-white/10 text-white hover:border-sky-500/40 hover:bg-white/15 hover:text-sky-100`}
            >
              {rejectLabel}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/privacy-policy"
              className="text-[11px] font-semibold text-gray-400 underline underline-offset-4 transition-colors hover:text-sky-300"
            >
              {readMoreLabel}
            </Link>
          </div>
        </div>
      </GlassPanel>
    </div>
  )
}
