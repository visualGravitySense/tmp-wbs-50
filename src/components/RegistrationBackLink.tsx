'use client'

import { useRouter } from 'next/navigation'
import type { MouseEvent } from 'react'

/** Hinnastamine block id — see `PricingSection` / `InvestmentSection`. */
const PRICING_SECTION_ID = 'pricing'

type RegistrationBackLinkProps = {
  children: React.ReactNode
  className?: string
  showArrow?: boolean
}

export default function RegistrationBackLink({
  children,
  className,
  showArrow = false,
}: RegistrationBackLinkProps) {
  const router = useRouter()

  const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const referrer = typeof document !== 'undefined' ? document.referrer : ''

    if (
      referrer &&
      (referrer.includes('/koolitus') || referrer.includes(window.location.origin))
    ) {
      const url = new URL(referrer)
      window.location.href = `${url.origin}${url.pathname}#${PRICING_SECTION_ID}`
      return
    }

    router.push(`/koolitus#${PRICING_SECTION_ID}`)
  }

  return (
    <button type="button" onClick={handleBack} className={className}>
      {showArrow ? (
        <span className="transition-transform group-hover:-translate-x-0.5">←</span>
      ) : null}
      {children}
    </button>
  )
}