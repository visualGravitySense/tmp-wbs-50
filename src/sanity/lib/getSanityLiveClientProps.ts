import 'server-only'

import type { ClientPerspective } from '@sanity/client'
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants'
import { cookies, draftMode } from 'next/headers'

import { client } from '@/sanity/lib/client'

function readBrowserToken(): string | undefined {
  const token = (
    process.env.SANITY_API_READ_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_AUTH_TOKEN ||
    ''
  ).trim()
  return token || undefined
}

async function resolveDraftPerspective(): Promise<ClientPerspective> {
  const draft = await draftMode()
  if (!draft.isEnabled) {
    return 'published'
  }

  const cookieStore = await cookies()
  if (!cookieStore.has(perspectiveCookieName)) {
    return 'drafts'
  }

  const value = cookieStore.get(perspectiveCookieName)?.value
  if (value === 'published' || value === 'drafts' || value === 'raw') {
    return value
  }

  return 'drafts'
}

export async function getSanityLiveClientProps() {
  const { isEnabled: draftModeEnabled } = await draftMode()
  const browserToken = readBrowserToken()
  const {
    projectId,
    dataset,
    apiHost,
    apiVersion,
    useProjectHostname,
    requestTagPrefix,
  } = client.config()

  return {
    projectId: projectId!,
    dataset: dataset!,
    apiHost,
    apiVersion,
    useProjectHostname,
    requestTagPrefix,
    requestTag: undefined as string | undefined,
    token:
      typeof browserToken === 'string' && draftModeEnabled
        ? browserToken
        : undefined,
    draftModeEnabled,
    draftModePerspective: await resolveDraftPerspective(),
  }
}
