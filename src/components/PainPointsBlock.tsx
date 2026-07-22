'use client'

import React from 'react'
import { Container } from '@/components/ui'
import PainPointsRoles, { PainPointsRolesProps } from './pain-points/PainPointsRoles'
import PainPointsGrid, { PainSectionProps } from './pain-points/PainPointsGrid'
import PainPointsAudience, { AudienceSectionProps } from './pain-points/PainPointsAudience'

export type PainPointsBlockProps =
  | ({ variant: 'roles' } & PainPointsRolesProps)
  | ({ variant: 'grid' } & PainSectionProps)
  | ({ variant: 'audience' } & AudienceSectionProps)

export default function PainPointsBlock(props: PainPointsBlockProps) {
  let className = "mx-auto px-4 md:px-8 py-12 sm:py-16 md:py-24 relative overflow-x-clip overflow-y-visible"
  
  if (props.variant === 'grid') {
    className += " text-slate-900 transition-colors duration-500 dark:text-[#f0f4ff]"
  }

  return (
    <Container size="6xl" className={className}>
      {props.variant === 'roles' && <PainPointsRoles {...props} />}
      {props.variant === 'grid' && <PainPointsGrid {...props} />}
      {props.variant === 'audience' && <PainPointsAudience {...props} />}
    </Container>
  )
}
