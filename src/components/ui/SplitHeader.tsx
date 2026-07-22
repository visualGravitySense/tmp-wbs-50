import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'

export interface SplitHeaderProps {
  title?: string
  scriptTitle?: string
  eyebrow?: string | ReactNode
  subtitle?: string | ReactNode
  align?: 'center' | 'left' | 'responsive' | 'custom' // 'responsive' = center on mobile, left on desktop
  className?: string
  eyebrowColor?: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'div'
  inverted?: boolean
}

function splitTitle(titleText: string) {
  const trimmed = titleText.trim()
  const commaIndex = trimmed.indexOf(',')
  if (commaIndex >= 0) {
    return {
      main: trimmed.slice(0, commaIndex).trim(),
      accent: trimmed.slice(commaIndex + 1).trim(),
    }
  }
  return { main: trimmed, accent: '' }
}

export function SplitHeader({
  title,
  scriptTitle,
  eyebrow,
  subtitle,
  align = 'center',
  className,
  eyebrowColor = 'text-blue-700 dark:text-blue-400',
  headingLevel = 'h2',
  inverted = false
}: SplitHeaderProps) {
  if (!title && !eyebrow && !subtitle) return null

  const { main, accent: splitAccent } = (title && !scriptTitle) ? splitTitle(title) : { main: title || '', accent: '' }
  const accent = scriptTitle || splitAccent
  const HeadingTag = headingLevel

  const alignStyles = {
    center: {
      wrapper: 'items-center text-center',
      heading: 'items-center',
      subtitle: 'mx-auto'
    },
    left: {
      wrapper: 'items-start text-left',
      heading: 'items-start',
      subtitle: 'mx-0'
    },
    responsive: {
      wrapper: 'items-center text-center lg:items-start lg:text-left',
      heading: 'items-center lg:items-start',
      subtitle: 'mx-auto lg:mx-0'
    },
    custom: {
      wrapper: '',
      heading: '',
      subtitle: ''
    }
  }

  const currentAlign = alignStyles[align]

  return (
    <div
      className={cn(
        'w-full flex flex-col gap-4',
        currentAlign.wrapper,
        className
      )}
    >
      {/* Eyebrow badge */}
      {eyebrow && (
        typeof eyebrow === 'string' ? (
          <EyebrowPillBadge 
            text={eyebrow} 
            centered={currentAlign.wrapper.includes('text-center') || currentAlign.wrapper.includes('items-center')} 
            tone={inverted ? 'onDark' : 'default'} 
          />
        ) : (
          eyebrow
        )
      )}

      {/* Main split heading */}
      {title && (
        <HeadingTag
          className={cn(
            'text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight leading-[1.1] transition-colors duration-500 break-words hyphens-auto text-balance flex flex-col w-full min-w-0',
            inverted ? 'text-white' : 'text-[rgb(var(--color-foreground))]',
            currentAlign.heading
          )}
        >
          {/* BOLD part */}
          <span className="block font-black tracking-tight leading-[1.05] pb-0.5">
            {main}
          </span>
          {/* ITALIC part */}
          {/* {accent ? (
            <span className="hero-headline-accent block mt-1 text-blue-700 dark:text-blue-400 !text-2xl !sm:text-3xl !lg:text-3xl">
              {accent}
            </span>
          ) : null} */}

          {accent ? (
            <span className={cn(
              "split-header-accent block mt-1 text-2xl sm:text-3xl lg:text-3xl",
              inverted ? "text-white/90" : "text-blue-700 dark:text-blue-400"
            )}>
              {accent}
            </span>
          ) : null}

        </HeadingTag>
      )}

      {/* Subtitle description */}
      {subtitle && (
        typeof subtitle === 'string' ? (
          <p className={cn(
            'text-base sm:text-lg max-w-md leading-relaxed py-2 transition-colors duration-500', 
            inverted ? 'text-white/80' : 'text-[rgb(var(--color-foreground))/0.6]',
            currentAlign.subtitle
          )}>
            {subtitle}
          </p>
        ) : (
          subtitle
        )
      )}
    </div>
  )
}
