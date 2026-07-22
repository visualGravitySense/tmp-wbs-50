export const revalidate = 86400

export function GET() {
  const metadata = {
    serverInfo: {
      name: 'tootmisjuhtimine-mcp-server',
      version: '1.0.0'
    },
    endpoint: 'https://tootmisjuhtimine.ee/api/mcp',
    capabilities: {
      tools: [
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
          description: 'Get contact email, phone number, and website links for Andres Kase.',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        }
      ]
    }
  }

  return Response.json(metadata, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
