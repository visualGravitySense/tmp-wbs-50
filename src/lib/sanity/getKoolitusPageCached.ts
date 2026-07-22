import 'server-only'

import { cache } from 'react'

import { ensureKoolitusHeroSection } from '@/lib/sanity/koolitusDefaultHeroBlock'
import { KOOLITUS_PAGE_QUERY } from '@/lib/sanity/queries/koolitus'
import { sanityFetch } from '@/sanity/lib/live'

export const getKoolitusPageCached = cache(async () => {
  const { data } = await sanityFetch({
    query: KOOLITUS_PAGE_QUERY,
    tags: ['koolitusPage']
  })
  return ensureKoolitusHeroSection(data)
})
