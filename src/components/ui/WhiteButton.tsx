import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import React from 'react'
import { Eye } from 'lucide-react'
import { CTAButton } from './CTAButton'

export type WhiteButtonProps =
  | ({
      href: string
      text?: string
      children?: ReactNode
      className?: string
      icon?: React.ComponentType<{ className?: string }>
      showIcon?: boolean
    } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href' | 'children'>)
  | ({
      href?: undefined
      text?: string
      children?: ReactNode
      className?: string
      icon?: React.ComponentType<{ className?: string }>
      showIcon?: boolean
    } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>)

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

/** 
 * Secondary Soft White CTA — link or button with locked premium global style guidelines.
 * 
 * Usage Examples:
 * - Default Eye: `<WhiteButton>Vaata programmi</WhiteButton>`
 * - Custom Icon: `<WhiteButton icon={MessageSquare}>Tagasiside</WhiteButton>`
 * - Without Icon: `<WhiteButton showIcon={false}>Tagasiside</WhiteButton>`
 */
export default function WhiteButton(props: WhiteButtonProps) {
  const {
    text,
    children,
    icon: Icon,
    showIcon = true,
    className,
    ...rest
  } = props

  // Clean the children/text of any legacy/manual arrows passed in code
  const rawContent = children || text || ''
  const cleanedChildren = cleanChildren(rawContent)

  // Enforce premium unified structure with Left-side Circle Icon (Eye by default)
  const innerContent = (
    <span className="flex items-center justify-center gap-2.5 w-full">
      {showIcon && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300 transition-transform group-hover:translate-x-0.5 duration-300">
          {Icon ? (
            <Icon className="h-2.5 w-2.5" />
          ) : (
            <Eye className="h-2.5 w-2.5" strokeWidth={2.5} />
          )}
        </span>
      )}
      {/* Typography Styling matches primary: font-black uppercase tracking-widest text-xs md:text-sm */}
      <span className="text-xs md:text-sm font-black uppercase tracking-widest leading-none">
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

  // Enforce exact same locked dimensions as primary button for perfect symmetry
  const finalClassName = `group flex sm:inline-flex items-center justify-center gap-2.5 px-6 h-12 md:h-14 min-w-[160px] md:min-w-[200px] w-full sm:w-auto bg-white border border-slate-200 text-slate-900 rounded-full font-black uppercase tracking-widest text-xs md:text-sm shadow-sm transition-all duration-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-white/10 dark:text-white dark:hover:bg-slate-800/60 ${cleanClassName}`

  if ('href' in props && props.href) {
    const { href, className: _c, children: _ch, text: _t, icon: _i, showIcon: _s, ...linkRest } = props
    return (
      <CTAButton href={href} variant="softWhite" className={finalClassName} {...linkRest}>
        {innerContent}
      </CTAButton>
    )
  }

  const { className: _c2, children: _ch2, text: _t2, icon: _i2, showIcon: _s2, ...buttonRest } = props as Extract<
    WhiteButtonProps,
    { href?: undefined }
  >

  return (
    <CTAButton variant="softWhite" className={finalClassName} {...buttonRest}>
      {innerContent}
    </CTAButton>
  )
}
