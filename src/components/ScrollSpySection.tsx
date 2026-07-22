import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  id: string
  title: string
  children: ReactNode
  className?: string
}

/**
 * Wraps a page section so `ScrollSpyNav` can discover it.
 *
 * Important: use `overflow-x-clip` (not `overflow-x-hidden`).
 * `hidden` + default `overflow-y: visible` computes to `overflow-y: auto`,
 * which creates a nested vertical scrollport (double scrollbar) on long FAQ/KKK sections.
 */
export function ScrollSpySection({ id, title, children, className }: Props) {
  return (
    <section
      id={id}
      data-section-title={title}
      className={cn(
        'scroll-mt-20 group/section relative w-full max-w-full overflow-x-clip overflow-y-visible',
        className,
      )}
    >
      {children}
    </section>
  )
}
