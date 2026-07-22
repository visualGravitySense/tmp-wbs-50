import type { AnchorHTMLAttributes, ReactNode } from 'react'
import React from 'react'
import { CTAButton } from './CTAButton'

export type SecondaryMarketingButtonProps = {
  href: string
  children: ReactNode
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href' | 'children'>

// Robust helper to strip trailing/standalone arrows (→, ->, etc.) from children dynamically
function cleanChildren(children: React.ReactNode): React.ReactNode {
  if (!children) return children

  const isArrowString = (str: string) => {
    const trimmed = str.trim()
    return trimmed === '→' || trimmed === '->' || trimmed === '=>' || trimmed === '›' || trimmed === '>'
  }

  if (typeof children === 'string') {
    if (isArrowString(children)) return null
    return children.replace(/\s*(?:->|=>|→|>|›)\s*$/, '')
  }

  if (Array.isArray(children)) {
    const cleaned = React.Children.map(children, (child: React.ReactNode) => cleanChildren(child))
    if (!cleaned) return null
    const filtered = cleaned.filter((child: React.ReactNode) => child !== null && child !== '')
    return filtered.length > 0 ? filtered : null
  }

  if (React.isValidElement(children)) {
    const props = children.props as any
    if (props && props.children) {
      const cleanedInner = cleanChildren(props.children)
      if (cleanedInner === null || cleanedInner === '') {
        return null
      }
      if (typeof props.children === 'string' && isArrowString(props.children)) {
        return null
      }
      return React.cloneElement(children, {
        ...props,
        children: cleanedInner
      } as any)
    }
  }

  return children
}

/** White bordered secondary CTA (hero / koolitus / opstar) synchronized to matching premium sizing metrics. */
export function SecondaryMarketingButton({
  href,
  children,
  className,
  ...rest
}: SecondaryMarketingButtonProps) {
  const cleanedChildren = cleanChildren(children)

  // Enforce same typography wrapper
  const innerContent = (
    <span className="text-xs md:text-sm font-black uppercase tracking-widest leading-none">
      {cleanedChildren}
    </span>
  )

  // Remove manual rounded-xl or similar overrides
  const cleanClassName = className
    ? className
        .replace(/\brounded-(?:xl|lg|md|sm|2xl|3xl)\b/g, '')
        .replace(/\bdark:rounded-(?:xl|lg|md|sm|2xl|3xl)\b/g, '')
    : ''

  // Sync pixel-perfect classes: inline-flex, gap-2.5, px-6 md:px-8, h-12 md:h-14, min-w-[160px] md:min-w-[200px], font-black uppercase
  const finalClassName = `group inline-flex items-center justify-center gap-2.5 px-6 md:px-8 h-12 md:h-14 min-w-[160px] md:min-w-[200px] rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all duration-200 ${cleanClassName}`

  return (
    <CTAButton href={href} variant="secondaryMarketing" className={finalClassName} {...rest}>
      {innerContent}
    </CTAButton>
  )
}
