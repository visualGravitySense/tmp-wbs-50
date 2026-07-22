'use client'

import React from 'react'
import { Container } from '@/components/ui'
import ComparisonBeforeAfter, { BeforeAfterProps } from './comparisons/ComparisonBeforeAfter'
import ComparisonLeanVsOpstar, { LeanVsOpstarProps } from './comparisons/ComparisonLeanVsOpstar'
import ComparisonOpstarProfit, { OpstarProfitComparisonProps } from './comparisons/ComparisonOpstarProfit'

export type ComparisonBlockProps =
  | ({ variant: 'before-after' } & BeforeAfterProps)
  | ({ variant: 'lean-vs-opstar' } & LeanVsOpstarProps)
  | ({ variant: 'opstar-profit' } & OpstarProfitComparisonProps)

export default function ComparisonBlock(props: ComparisonBlockProps) {
  return (
    <Container size="6xl" className="mx-auto px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
      {props.variant === 'before-after' && <ComparisonBeforeAfter {...props} />}
      {props.variant === 'lean-vs-opstar' && <ComparisonLeanVsOpstar {...props} />}
      {props.variant === 'opstar-profit' && <ComparisonOpstarProfit {...props} />}
    </Container>
  )
}
