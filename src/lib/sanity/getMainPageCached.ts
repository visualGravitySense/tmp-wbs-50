import 'server-only'

import { cache } from 'react'

import { MAIN_PAGE_QUERY } from '@/lib/sanity/mainPageQuery'
import { sanityFetch } from '@/sanity/lib/live'

/** One Sanity round-trip per request when both `layout` and `page` need main page data. */
export const getMainPageCached = cache(async () => {
  const { data } = await sanityFetch({
    query: MAIN_PAGE_QUERY,
    tags: ['mainPage']
  })
  return data
})
