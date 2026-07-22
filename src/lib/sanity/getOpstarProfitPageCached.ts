import 'server-only'

import { cache } from 'react'

import { OPSTAR_PROFIT_QUERY } from '@/lib/sanity/queries/opstarProfit'
import { sanityFetch } from '@/sanity/lib/live'

export const getOpstarProfitPageCached = cache(async () => {
  const { data } = await sanityFetch({
    query: OPSTAR_PROFIT_QUERY,
    tags: ['opstarPage']
  })
  return data
})
