import 'server-only'

import { cache } from 'react'

import { ABOUT_PAGE_QUERY } from '@/lib/sanity/queries/about'
import type { AboutPage } from '@/types/about'
import { sanityFetch } from '@/sanity/lib/live'

export const getAboutPageCached = cache(async (): Promise<AboutPage | null> => {
  const { data } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
    tags: ['aboutPage']
  })
  return (data as AboutPage | null) ?? null
})
