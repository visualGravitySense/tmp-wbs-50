import 'server-only'

import { cache } from 'react'

import { KONTAKT_PAGE_QUERY } from '@/lib/sanity/queries/kontaktPage'
import { sanityFetch } from '@/sanity/lib/live'
import type { KontaktPageDoc } from '@/types/kontaktPage'

export const getKontaktPageCached = cache(async () => {
  const { data } = await sanityFetch({
    query: KONTAKT_PAGE_QUERY,
    tags: ['kontaktPage']
  })
  return (data ?? null) as KontaktPageDoc | null
})
