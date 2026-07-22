import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import {
  formControlBase,
  formControlVariantClasses,
  textareaPanelClass,
  type FormControlVariant,
} from './form-control-styles'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: FormControlVariant
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        formControlBase,
        formControlVariantClasses[variant],
        variant === 'panel' ? textareaPanelClass : 'resize-y',
        className,
      )}
      {...props}
    />
  ),
)

Textarea.displayName = 'Textarea'
