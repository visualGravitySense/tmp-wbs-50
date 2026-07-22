import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { homepageLinkHeaderValue, markdownForPath } from '@/lib/site/agentDiscoveryEdge'

const MARKDOWN_PATHS = new Set(['/'])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accept = request.headers.get('accept') ?? ''

  if (
    request.method === 'GET' &&
    MARKDOWN_PATHS.has(pathname) &&
    accept.includes('text/markdown') &&
    !accept.includes('text/html')
  ) {
    const markdown = markdownForPath(pathname)
    if (markdown) {
      return new NextResponse(markdown, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: 'Accept',
          'Cache-Control': 'public, max-age=300, s-maxage=3600',
        },
      })
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  if (pathname === '/') {
    response.headers.set('Link', homepageLinkHeaderValue())
    response.headers.append('Vary', 'Accept')
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
