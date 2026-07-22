import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { CTAButton } from './CTAButton'
import type { ButtonVibrantLayout } from './button-styles'

export type BrandVibrantButtonVariant = ButtonVibrantLayout

export type BrandVibrantButtonProps =
  | ({
      href: string
      children: ReactNode
      variant?: BrandVibrantButtonVariant
      className?: string
      icon?: React.ComponentType<{ className?: string }>
      showIcon?: boolean
    } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href' | 'children'>)
  | ({
      href?: undefined
      children: ReactNode
      variant?: BrandVibrantButtonVariant
      className?: string
      icon?: React.ComponentType<{ className?: string }>
      showIcon?: boolean
    } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>)

// Robust helper to strip trailing/standalone arrows (→, ->, =>, >, etc.) from children dynamically
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

/** 
 * Brand vibrant blue CTA — link or button with premium global style guidelines.
 * 
 * Usage Examples:
 * - Default Arrow: `<BrandVibrantButton>Kontakt</BrandVibrantButton>`
 * - Phone Variant: `<BrandVibrantButton icon={Phone}>Helista meile</BrandVibrantButton>`
 * - Email Variant: `<BrandVibrantButton icon={Mail}>Kirjuta meile</BrandVibrantButton>`
 */
export function BrandVibrantButton(props: BrandVibrantButtonProps) {
  const { variant = 'hero', className, children, icon: Icon, showIcon = true } = props

  // Clean the children of any legacy/manual arrows passed in code
  const cleanedChildren = cleanChildren(children)

  // Enforce premium unified structure with Left-side Circle Arrow Icon
  const innerContent = (
    <span className="flex items-center justify-center gap-2.5 w-full">
      {/* Replicate Left Icon Style (The Circle Arrow) */}
      {showIcon && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/80 text-white transition-transform group-hover:translate-x-0.5 duration-300">
          {Icon ? (
            <Icon className="h-2.5 w-2.5" />
          ) : (
            <ArrowRight className="h-2.5 w-2.5" strokeWidth={2.5} />
          )}
        </span>
      )}
      {/* Typography Styling: text-xs md:text-sm font-black uppercase tracking-widest text-white */}
      <span className="text-xs md:text-sm font-black uppercase tracking-widest text-white leading-none">
        {cleanedChildren}
      </span>
    </span>
  )

  // Remove manual rounded-xl or similar classes that could break pill structure
  const cleanClassName = className
    ? className
        .replace(/\brounded-(?:xl|lg|md|sm|2xl|3xl)\b/g, '')
        .replace(/\bdark:rounded-(?:xl|lg|md|sm|2xl|3xl)\b/g, '')
    : ''
  
  // Base background & transitions: inline-flex, gap-2.5, px-6 md:px-8, h-12 md:h-14, min-w-[160px] md:min-w-[200px], bg-[#0055E5], shadow
  const finalClassName = `group inline-flex items-center justify-center gap-2.5 px-6 md:px-8 h-12 md:h-14 min-w-[160px] md:min-w-[200px] rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all duration-200 bg-[#0055E5] hover:opacity-95 shadow-[0_4px_14px_rgba(0,85,229,0.2)] ${cleanClassName}`

  if ('href' in props && props.href) {
    const { href, variant: _v, className: _c, children: _ch, icon: _i, showIcon: _s, ...rest } = props
    return (
      <CTAButton href={href} variant="vibrant" layout={variant} className={finalClassName} {...rest}>
        {innerContent}
      </CTAButton>
    )
  }

  const { variant: _v2, className: _c2, children: _ch2, icon: _i2, showIcon: _s2, ...rest } = props as Extract<
    BrandVibrantButtonProps,
    { href?: undefined }
  >

  return (
    <CTAButton variant="vibrant" layout={variant} className={finalClassName} {...rest}>
      {innerContent}
    </CTAButton>
  )
}

