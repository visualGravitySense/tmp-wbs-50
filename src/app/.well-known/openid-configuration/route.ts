export const revalidate = 86400

export function GET() {
  const metadata = {
    issuer: 'https://tootmisjuhtimine.ee',
    authorization_endpoint: 'https://tootmisjuhtimine.ee/oauth/authorize',
    token_endpoint: 'https://tootmisjuhtimine.ee/oauth/token',
    jwks_uri: 'https://tootmisjuhtimine.ee/oauth/jwks',
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['RS256'],
    grant_types_supported: ['implicit', 'authorization_code'],
    response_types_supported: ['code', 'id_token']
  }

  return Response.json(metadata, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
