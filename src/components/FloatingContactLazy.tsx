'use client'

import dynamic from 'next/dynamic'

const FloatingContactAndres = dynamic(() => import('./FloatingContactAndres'), { ssr: false })

export default function FloatingContactLazy({ hidden }: { hidden?: boolean }) {
  return <FloatingContactAndres hidden={hidden} />
}
