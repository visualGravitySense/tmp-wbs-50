export const revalidate = 86400

export function GET() {
  const metadata = {
    issuer: 'https://tootmisjuhtimine.ee',
    authorization_endpoint: 'https://tootmisjuhtimine.ee/oauth/authorize',
    token_endpoint: 'https://tootmisjuhtimine.ee/oauth/token',
    jwks_uri: 'https://tootmisjuhtimine.ee/oauth/jwks',
    grant_types_supported: ['implicit', 'authorization_code'],
    response_types_supported: ['code', 'token'],
    agent_auth: {
      skill: 'https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md',
      register_uri: 'https://tootmisjuhtimine.ee/register',
      identity_types_supported: ['anonymous'],
      anonymous: {
        credential_types_supported: ['api_key'],
        claim_uri: 'https://tootmisjuhtimine.ee/register'
      }
    }
  }

  return Response.json(metadata, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
