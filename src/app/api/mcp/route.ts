import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { SITE_SEARCH_QUERY, type SiteSearchHit } from '@/lib/sanity/queries/siteSearch'

function buildMatchPattern(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase()
  if (trimmed.length < 2) return null
  const safe = trimmed
    .replace(/[*?]/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 80)
  const parts = safe.split(' ').filter(Boolean)
  if (parts.length === 0) return null
  return `*${parts.join('*')}*`
}

const TOOLS = [
  {
    name: 'search_blog_posts',
    description: 'Search blog posts and articles about manufacturing, LEAN, TPS, and OEE.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The keyword or search phrase (e.g., OEE, lean, waste)'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'get_contact_info',
    description: 'Get contact email, phone number, and website links.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { method, params, id } = body

    if (method === 'tools/list') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: { tools: TOOLS }
      })
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params ?? {}

      if (name === 'search_blog_posts') {
        const query = args?.query ?? ''
        const pattern = buildMatchPattern(query)
        if (!pattern) {
          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: 'No search results found (query too short).' }],
              isError: false
            }
          })
        }

        const results = await client.fetch<SiteSearchHit[]>(SITE_SEARCH_QUERY, { p: pattern })
        const cleaned = (results ?? []).filter((r) => r.href && r.title)

        if (cleaned.length === 0) {
          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: `No articles found matching "${query}".` }],
              isError: false
            }
          })
        }

        const siteBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://example.com'
        const text = cleaned
          .map((r) => `- [${r.title}](${siteBase}${r.href}): ${r.description ?? 'No description available.'}`)
          .join('\n')

        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: `Search results for "${query}":\n\n${text}` }],
            isError: false
          }
        })
      }

      if (name === 'get_contact_info') {
        const siteBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://example.com'
        const contactInfo = {
          name: 'Your Name',
          email: 'hello@example.com',
          phone: '+372 000 0000',
          website: siteBase,
          pages: {
            contact: `${siteBase}/kontakt`,
            registration: `${siteBase}/register`,
            blog: `${siteBase}/blog`,
            courses: `${siteBase}/koolitus`
          }
        }

        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(contactInfo, null, 2) }],
            isError: false
          }
        })
      }

      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method not found: ${name}` }
      }, { status: 404 })
    }

    return NextResponse.json({
      jsonrpc: '2.0',
      id,
      error: { code: -32600, message: 'Invalid Request' }
    }, { status: 400 })

  } catch (err) {
    console.error('[api/mcp]', err)
    return NextResponse.json({
      jsonrpc: '2.0',
      error: { code: -32603, message: 'Internal error' }
    }, { status: 500 })
  }
}

// Support OPTIONS for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  })
}
