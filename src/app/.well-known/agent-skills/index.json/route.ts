import { agentSkillsIndex } from '@/lib/site/agentDiscoveryServer'

export const revalidate = 3600

export function GET() {
  return Response.json(agentSkillsIndex(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
