'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import HydrationFix from '@/components/HydrationFix'
import LoadingWrapper from '@/components/LoadingWrapper'
import CookieBanner from '@/components/CookieBanner'
import type { ReactNode } from 'react'
import type { SiteSettings } from '@/types/sanity'

import FloatingContactLazy from '@/components/FloatingContactLazy'
import RouteScrollRestoration from '@/components/RouteScrollRestoration'

type SiteChromeProps = {
  children: ReactNode
  headerData: any
  footerData: any
  cookieBanner?: SiteSettings['cookieBanner']
  draftEnabled?: boolean
}

export default function SiteChrome({
  children,
  headerData,
  footerData,
  cookieBanner,
  draftEnabled = false,
}: SiteChromeProps) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

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
      <Footer data={footerData} />
      <CookieBanner data={cookieBanner} />
      <FloatingContactLazy hidden={draftEnabled} />
    </>
  )
}
