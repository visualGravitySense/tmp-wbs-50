import 'server-only'

// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from 'next-sanity/live'

import { fetchWithRetry } from '@/lib/sanity/fetchWithRetry'

import { client } from './client'

const readToken = (
  process.env.SANITY_API_READ_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN ||
  ''
).trim()

const { sanityFetch: baseSanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken || false,
  browserToken: readToken || false,
})

export { SanityLive }

export async function sanityFetch(
  ...args: Parameters<typeof baseSanityFetch>
): ReturnType<typeof baseSanityFetch> {
  return fetchWithRetry(() => baseSanityFetch(...args), { label: 'sanityFetch' })
}
