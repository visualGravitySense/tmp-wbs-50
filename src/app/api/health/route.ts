import { getSiteUrl } from '@/lib/site/siteUrl'

export const revalidate = 0

export function GET() {
  return Response.json(
    {
      status: 'ok',
      site: getSiteUrl(),
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
