'use client'

import LiveClient from 'next-sanity/live/client-components/live'
import type { SanityLiveProps } from 'next-sanity/live/client-components/live'

import { previewRefreshSyncTags } from '@/sanity/lib/previewRefresh'

type Props = Omit<SanityLiveProps, 'revalidateSyncTags' | 'intervalOnGoAway'>

/** Client bridge so debounced `revalidateSyncTags` is not serialized through RSC. */
export function SanityLiveClient(props: Props) {
  return (
    <LiveClient
      {...props}
      revalidateSyncTags={previewRefreshSyncTags}
      intervalOnGoAway={false}
    />
  )
}
