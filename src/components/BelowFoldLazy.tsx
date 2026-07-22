'use client'

/**
 * Client wrapper that lazy-loads HomeBelowFoldSections with ssr:false.
 * `ssr: false` is only valid inside a Client Component — this file is that boundary.
 */
import dynamic from 'next/dynamic'
import type { HomeBelowFoldSectionsProps } from '@/components/HomeBelowFoldSections'

const HomeBelowFoldSections = dynamic(
  () => import('@/components/HomeBelowFoldSections')
)

export default function BelowFoldLazy(props: HomeBelowFoldSectionsProps) {
  return <HomeBelowFoldSections {...props} />
}
