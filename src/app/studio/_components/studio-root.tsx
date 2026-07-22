'use client'

import dynamic from 'next/dynamic'

import config from '../../../../sanity.config'

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-dvh items-center justify-center bg-[#101112] text-sm text-white/80">
        Loading Sanity Studio…
      </div>
    ),
  },
)

export default function StudioRoot() {
  return <NextStudio config={config} />
}
