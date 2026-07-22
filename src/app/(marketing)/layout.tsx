import type { Metadata } from 'next'
import { buildPageMetadata, DEFAULT_HOME_SEO } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: DEFAULT_HOME_SEO.title,
    description: DEFAULT_HOME_SEO.description,
  }),
  robots: {
    index: true,
    follow: true,
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
