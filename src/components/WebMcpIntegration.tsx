'use client'

import { useEffect } from 'react'

export default function WebMcpIntegration() {
  useEffect(() => {
    const nav = navigator as any
    if (nav.modelContext) {
      try {
        const tools = [
          {
            name: 'search_blog_posts',
            description: 'Search blog posts and articles about manufacturing, LEAN, TPS, and OEE.',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'The keyword or search phrase (e.g. OEE, lean, waste)'
                }
              },
              required: ['query']
            },
            execute: async (args: { query: string }) => {
              try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(args.query)}`)
                if (res.ok) {
                  return await res.json()
                }
                return { error: 'Failed to fetch search results' }
              } catch (err) {
                return { error: String(err) }
              }
            }
          },
          {
            name: 'get_contact_info',
            description: 'Get contact email, phone number, and social media links for Andres Kase.',
            inputSchema: {
              type: 'object',
              properties: {}
            },
            execute: async () => {
              return {
                name: 'Andres Kase',
                email: 'andreskase@tootmisjuhtimine.ee',
                phone: '+372 513 8403',
                website: 'https://tootmisjuhtimine.ee',
                pages: {
                  contact: '/kontakt',
                  registration: '/register',
                  blog: '/blog',
                  courses: '/koolitus'
                }
              }
            }
          }
        ]

        // Try using provideContext first if available (as requested by isitagentready)
        if (typeof nav.modelContext.provideContext === 'function') {
          nav.modelContext.provideContext({ tools })
        }
        
        // Also register individually if supported
        if (typeof nav.modelContext.registerTool === 'function') {
          for (const tool of tools) {
            try {
              nav.modelContext.registerTool(tool)
            } catch (e) {
              // ignore duplicate registrations
            }
          }
        }
        console.log('WebMCP tools registered successfully.')
      } catch (err) {
        console.warn('WebMCP registration failed:', err)
      }
    }
  }, [])

  return null
}
