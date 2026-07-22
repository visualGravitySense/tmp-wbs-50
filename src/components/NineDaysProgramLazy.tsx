'use client'

/**
 * Client boundary for lazy-loading NineDaysProgram with ssr:false.
 * Server Components must import this wrapper — not next/dynamic with ssr:false directly.
 */
import dynamic from 'next/dynamic'
import type { NineDaysProgramProps } from './NineDaysProgram'

const NineDaysProgram = dynamic(() => import('./NineDaysProgram'), {
  ssr: false,
  loading: () => null,
})

export default function NineDaysProgramLazy(props: NineDaysProgramProps) {
  return <NineDaysProgram {...props} />
}