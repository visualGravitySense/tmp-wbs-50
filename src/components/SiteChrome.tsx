'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import FooterContactForm from '@/components/FooterContactForm'
import HydrationFix from '@/components/HydrationFix'
import LoadingWrapper from '@/components/LoadingWrapper'
import CookieBanner from '@/components/CookieBanner'
import type { ReactNode } from 'react'
import type { SiteSettings } from '@/types/sanity'

import FloatingContactLazy from '@/components/FloatingContactLazy'
import RouteScrollRestoration from '@/components/RouteScrollRestoration'

type FooterVariant = NonNullable<NonNullable<SiteSettings['layout']>['footerVariant']>

type SiteChromeProps = {
  children: ReactNode
  headerData: any
  footerData: any
  cookieBanner?: SiteSettings['cookieBanner']
  /** Structural footer layout from siteSettings.layout.footerVariant */
  footerVariant?: FooterVariant | string | null
  draftEnabled?: boolean
}

export default function SiteChrome({
  children,
  headerData,
  footerData,
  cookieBanner,
  footerVariant = 'default',
  draftEnabled = false,
}: SiteChromeProps) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  const useContactFormFooter = footerVariant === 'contact-form'

  return (
    <>
      <HydrationFix />
      <RouteScrollRestoration />
      <Header data={headerData} />
      {/*
        overflow-x-clip (not hidden): avoids overflow-y computing to auto,
        which would nest a second vertical scrollbar inside <main>.
      */}
      <main className="flex w-full min-w-0 max-w-full flex-1 flex-col overflow-x-clip overflow-y-visible">
        <LoadingWrapper>{children}</LoadingWrapper>
      </main>
      {useContactFormFooter ? (
        <FooterContactForm data={footerData} />
      ) : (
        <Footer data={footerData} />
      )}
      <CookieBanner data={cookieBanner} />
      <FloatingContactLazy hidden={draftEnabled} />
    </>
  )
}
