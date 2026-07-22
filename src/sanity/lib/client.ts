import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.replace(/\/$/, '') ||
  (typeof process.env.NEXT_PUBLIC_VERCEL_URL === 'string' &&
  process.env.NEXT_PUBLIC_VERCEL_URL.length > 0
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/studio`
    : `${(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')}/studio`)

/** Server-only — same tokens as `src/sanity/lib/live.ts` and `@/lib/sanity/client`. */
function serverReadToken(): string | undefined {
  if (typeof window !== 'undefined') return undefined
  const t = (
    process.env.SANITY_API_READ_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_AUTH_TOKEN ||
    ''
  ).trim()
  return t || undefined
}

const readToken = serverReadToken()

/**
 * Used by `sanityFetch` / Live Content. Imported `review` docs need authenticated reads;
 * Sanity CDN does not support tokenized requests — keep `useCdn: false` (see `/testimonials`).
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  ...(readToken ? { token: readToken } : {}),
  stega: { studioUrl },
})
