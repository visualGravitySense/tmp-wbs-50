'use client'

import { usePathname } from 'next/navigation'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/DisableDraftMode'

/**
 * Live preview only on the public site — not on /studio.
 * SanityLive in the studio route was remounting the editor on every field change.
 */
export function DraftPreviewLayer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/studio')) {
    return null
  }

  return (
    <>
      <VisualEditing />
      <DisableDraftMode />
    </>
  )
}
