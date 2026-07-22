import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type FormFieldProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function FormField({ className, children, ...props }: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)} {...props}>
      {children}
    </div>
  )
}
