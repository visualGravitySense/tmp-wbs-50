import { apiCatalogLinkset } from '@/lib/site/agentDiscoveryServer'

export const revalidate = 3600

export function GET() {
  return Response.json(apiCatalogLinkset(), {
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
