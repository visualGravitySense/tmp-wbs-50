'use client'

import { useId } from 'react'
import { Label } from '@/components/ui'
import { cn } from '@/lib/utils'

export const MARKETING_OPT_IN_LABEL =
  'Soovin ka teateid uute gruppide ja praktiliste materjalide kohta (saab igal ajal loobuda)'

type MarketingOptInCheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
}

/** Styled marketing opt-in checkbox shared by kontakt page forms. */
export default function MarketingOptInCheckbox({
  checked,
  onChange,
  disabled = false,
  className,
  id,
  name = 'marketingConsent',
}: MarketingOptInCheckboxProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <Label variant="checkbox" htmlFor={inputId} className={cn('max-w-xl text-[13px] text-slate-600 dark:text-[rgb(var(--text-secondary))]', className)}>
      <input
        id={inputId}
        type="checkbox"
        name={name}
        value="true"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-white/20 dark:bg-transparent"
      />
      <span>{MARKETING_OPT_IN_LABEL}</span>
    </Label>
  )
}