import { headers } from 'next/headers'

import { SanityLiveClient } from '@/components/SanityLiveClient'
import { getSanityLiveClientProps } from '@/sanity/lib/getSanityLiveClientProps'

/**
 * Live content on the public site only — not on /studio.
 * Debounced refresh runs in SanityLiveClient (client); props come from the server.
 */
export async function SanityLiveServer() {
  const pathname = (await headers()).get('x-pathname') ?? ''

  if (pathname.startsWith('/studio')) {
    return null
  }

  return <SanityLiveClient {...await getSanityLiveClientProps()} />
}
