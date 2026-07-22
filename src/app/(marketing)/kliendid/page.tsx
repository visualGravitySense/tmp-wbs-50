import React from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import client from '@/lib/sanity/client'
import { KLIENDID_PAGE_QUERY } from '@/lib/sanity/queries/kliendidPage'
import MarketingPageAmbient from '@/components/MarketingPageAmbient'
import { Container, Section, EyebrowPillBadge } from '@/components/ui'
import ClientFilterGrid from '@/components/kliendid/ClientFilterGrid'
import type { PartnerLogo } from '@/types/partner'
import PageSections from '@/components/page-builder/PageSections'
import type { MainPageSection } from '@/types/mainPageSections'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Kliendid ja Partnerid | Andres Kase',
  description: 'Tutvu ettevõtetega, kellega oleme teinud koostööd tootmise, logistika ja juhtimise valdkonnas.',
}

type KliendidPageData = {
  page: {
    title: string
    sections?: MainPageSection[]
  } | null
  settings: any
  clients: PartnerLogo[]
}

export default async function KliendidPage() {
  const data = await client.fetch<KliendidPageData>(
    KLIENDID_PAGE_QUERY,
    {},
    { next: { revalidate: 60 } },
  )

  const { page, clients } = data

  const hasSections = page?.sections && page.sections.length > 0

  return (
    <div className="marketing-page-shell relative min-h-screen">
      <div className="bg-premium-grid" />
      <MarketingPageAmbient />
      
      {hasSections && (
        <div className="relative z-20">
          <PageSections sections={page.sections!} reviewPool={[]} partners={clients} />
        </div>
      )}

      <div className="relative z-10 pb-12">
        <Container size="6xl" className="mx-auto px-4 md:px-8 relative pt-8 md:pt-16">
          {clients && clients.length > 0 ? (
            <ClientFilterGrid clients={clients} />
          ) : (
            <div className="text-center py-20 text-slate-500 dark:text-slate-400">
              Klientide andmeid ei leitud.
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}
