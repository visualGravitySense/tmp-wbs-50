import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { PUBLIC_MARKETING_PATHS } from '@/lib/site/agentDiscoveryServer'
import { getSiteUrl } from '@/lib/site/siteUrl'

const SITEMAP_POSTS_QUERY = `*[_type in ["blogPost", "post"] && defined(slug.current)] {
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_MARKETING_PATHS.map((path) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' || path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/koolitus' || path === '/product' ? 0.9 : 0.7,
  }))

  let postEntries: MetadataRoute.Sitemap = []
  try {
    const rows = await client.fetch<
      Array<{ slug: string; publishedAt?: string; _updatedAt?: string }>
    >(SITEMAP_POSTS_QUERY, {}, { next: { revalidate: 3600 } })

    postEntries = (rows ?? []).map((row) => ({
      url: `${siteUrl}/blog/${row.slug}`,
      lastModified: row._updatedAt || row.publishedAt || now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    postEntries = []
  }

  return [...staticEntries, ...postEntries]
}
