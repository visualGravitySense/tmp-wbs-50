import React, { type ReactNode } from 'react'
import { CTAButton } from './CTAButton'
import { ArrowRight } from 'lucide-react'

interface GreenButtonProps {
  /** Text label – used when no children are provided. */
  text?: string
  /** Children take priority over the `text` prop when both are provided. */
  children?: ReactNode
  onClick?: (e: React.MouseEvent<Element>) => void
  className?: string
  href?: string
  /** Optional left icon component — accepts any Lucide icon or SVG component */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  /** Show the icon when true (default) */
  showIcon?: boolean
  /** Button type for forms */
  type?: 'button' | 'submit' | 'reset'
  /** Additional props to pass through */
  [key: string]: any
}

// Strip trailing arrow characters from plain string content
function cleanString(str: string): string {
  return str.replace(/\s*(?:->|=>|→|›)\s*$/, '')
}

/**
 * Green primary CTA button – mirrors the premium blue/white button architecture.
 * Accepts either `children` (priority) or the legacy `text` prop.
 * Renders a left-side circular icon frame and enforces strict size constraints.
 */
export default function GreenButton({
  text = 'Kuva mulle 9-päevane kava',
  children,
  onClick,
  className = '',
  href,
  icon: Icon,
  showIcon = true,
  type = 'button',
  ...rest
}: GreenButtonProps) {
  // Children take priority; fall back to `text`. Strip arrows from plain strings only.
  const rawLabel = children ?? (typeof text === 'string' ? cleanString(text) : text)

  // Build inner content with optional icon on the left
  const innerContent = (
    <span className="flex items-center justify-center gap-2.5 w-full">
      {showIcon && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/80 text-white">
          {Icon ? (
            <Icon className="h-2.5 w-2.5" strokeWidth={2.5} />
          ) : (
            <ArrowRight className="h-2.5 w-2.5" strokeWidth={2.5} />
          )}
        </span>
      )}
      <span className="text-xs md:text-sm font-black uppercase tracking-widest leading-none">
        {rawLabel}
      </span>
    </span>
  )

  // Remove any manual rounded overrides that could break the pill shape
  const cleanClassName = className
    ? className
        .replace(/\brounded-(?:xl|lg|md|sm|2xl|3xl)\b/g, '')
        .replace(/\bdark:rounded-(?:xl|lg|md|sm|2xl|3xl)\b/g, '')
    : ''

  // Enforce strict sizing and visual styling
  const finalClassName = `inline-flex items-center justify-center gap-2.5 px-6 h-12 md:h-14 min-w-[160px] md:min-w-[200px] bg-[#10b981] hover:bg-[#059669] text-white rounded-full font-black uppercase tracking-widest text-xs md:text-sm shadow-md transition-all duration-200 hover:opacity-95 disabled:opacity-50 ${cleanClassName}`

  if (href) {
    return (
      <CTAButton href={href} variant="green" className={finalClassName} onClick={onClick} {...rest}>
        {innerContent}
      </CTAButton>
    )
  }

  return (
    <CTAButton variant="green" className={finalClassName} onClick={onClick} type={type} {...rest}>
      {innerContent}
    </CTAButton>
  )
}
