'use client'

import { useEffect, useState } from 'react'
import { useIsPresentationTool } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()
  const [inPreviewIframe, setInPreviewIframe] = useState(false)

  useEffect(() => {
    setInPreviewIframe(window.self !== window.top)
  }, [])

  // Studio presentation preview has its own Publish / draft controls.
  if (isPresentationTool || inPreviewIframe) return null

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 left-4 z-[100] rounded-full bg-neutral-900 px-4 py-2 text-sm text-white shadow-lg hover:bg-neutral-800"
    >
      Disable draft mode
    </a>
  )
}
