import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { formControlBase, formControlVariantClasses, type FormControlVariant } from './form-control-styles'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: FormControlVariant
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(formControlBase, formControlVariantClasses[variant], className)}
      {...props}
    />
  ),
)

Input.displayName = 'Input'
