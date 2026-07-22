import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import {
  buttonBrandVariantClasses,
  buttonSecondaryMarketingClasses,
  buttonVibrantLayoutClasses,
  type ButtonBrandVariant,
  type ButtonVibrantLayout,
} from './button-styles'

export type CTAButtonVariant = ButtonBrandVariant | 'secondaryMarketing'

export type CTAButtonProps =
  | ({
      href: string
      variant?: CTAButtonVariant
      layout?: ButtonVibrantLayout
      children: ReactNode
      className?: string
    } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href' | 'children'>)
  | ({
      href?: undefined
      variant?: CTAButtonVariant
      layout?: ButtonVibrantLayout
      children: ReactNode
      className?: string
    } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>)

function resolveClasses(
  variant: CTAButtonVariant,
  layout: ButtonVibrantLayout | undefined,
  className?: string,
) {
  // Strip manual rounded overrides (like rounded-xl or dark:rounded-xl)
  const cleanClassName = className
    ? className
        .replace(/\brounded-(?:xl|lg|md|sm|2xl|3xl)\b/g, '')
        .replace(/\bdark:rounded-(?:xl|lg|md|sm|2xl|3xl)\b/g, '')
    : className

  if (variant === 'secondaryMarketing') {
    return cn(buttonSecondaryMarketingClasses, cleanClassName)
  }
  if (variant === 'vibrant') {
    return cn(
      'rounded-full', // Enforce global pill shape
      buttonBrandVariantClasses.vibrant,
      layout ? buttonVibrantLayoutClasses[layout] : undefined,
      cleanClassName,
    )
  }
  return cn(
    'rounded-full', // Enforce global pill shape for green/softWhite as well
    buttonBrandVariantClasses[variant as ButtonBrandVariant],
    cleanClassName,
  )
}

function wrapGreenContent(children: ReactNode) {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
      <span className="relative z-10">{children}</span>
    </>
  )
}

/** Polymorphic marketing CTA — vibrant, green, soft white, or secondary pill. */
export function CTAButton(props: CTAButtonProps) {
  const { variant = 'vibrant', layout = 'hero', className, children } = props
  const classes = resolveClasses(variant, variant === 'vibrant' ? layout : undefined, className)
  const content = variant === 'green' ? wrapGreenContent(children) : children

  if ('href' in props && props.href) {
    const { href, variant: _v, layout: _l, className: _c, children: _ch, ...anchorRest } = props
    if (href.startsWith('/') && !href.startsWith('//') && !href.includes('#')) {
      return (
        <Link 
          href={href} 
          className={classes} 
          {...anchorRest}
        >
          {content}
        </Link>
      )
    }
    return (
      <a 
        href={href} 
        className={classes} 
        {...anchorRest}
      >
        {content}
      </a>
    )
  }

  const { variant: _v2, layout: _l2, className: _c2, children: _ch2, ...buttonRest } =
    props as Extract<CTAButtonProps, { href?: undefined }>

  return (
    <button 
      type="button" 
      className={classes} 
      {...buttonRest}
    >
      {content}
    </button>
  )
}
