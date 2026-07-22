export const revalidate = 86400

export function GET() {
  const metadata = {
    resource: 'https://tootmisjuhtimine.ee',
    authorization_servers: [
      'https://tootmisjuhtimine.ee'
    ],
    scopes_supported: [],
    bearer_methods_supported: ['header']
  }

  return Response.json(metadata, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
