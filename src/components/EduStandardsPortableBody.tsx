import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { sectionIdFromHeading } from '@/lib/eduStandardsSections'
import { BrandVibrantButton } from '@/components/ui'

function blockPlainText(block: PortableTextBlock): string {
  if (!Array.isArray(block.children)) return ''
  return block.children
    .map((child) => (typeof child === 'object' && child && 'text' in child ? String(child.text ?? '') : ''))
    .join('')
}

type EduStandardsPortableBodyProps = {
  value: PortableTextBlock[] | null | undefined
}

const linkClass =
  'font-semibold text-blue-600 underline-offset-2 transition-colors hover:underline dark:text-blue-400'

const components: PortableTextComponents = {
  types: {
    ctaButton: ({ value }) => (
      <div className="mt-8 mb-8 flex justify-center">
        <BrandVibrantButton href={value.href || '/koolitus'}>
          {value.label || 'Tutvun koolitusega täpsemalt'}
        </BrandVibrantButton>
      </div>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed text-[rgb(var(--text-secondary))] last:mb-0 sm:text-[15px]">
        {children}
      </p>
    ),
    h2: ({ children, value }) => {
      const headingText = value ? blockPlainText(value as PortableTextBlock) : ''
      const sectionId = sectionIdFromHeading(headingText)
      return (
        <h2
          id={sectionId ?? (value?._key ? `edu-${value._key}` : undefined)}
          className="mb-4 mt-10 scroll-mt-32 text-xl font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-2xl border-b border-slate-100 pb-2 dark:border-slate-800 [&:first-of-type]:mt-0"
        >
          {children}
        </h2>
      )
    },
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-base font-bold tracking-tight text-[rgb(var(--text-primary))] sm:text-lg">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 text-sm font-bold text-[rgb(var(--text-primary))] sm:text-base">{children}</h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc list-inside space-y-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] pl-2 sm:text-[15px]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal list-inside space-y-2 pl-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[rgb(var(--text-primary))]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href || '#'
      const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
      if (!external && href.startsWith('/')) {
        return (
          <Link href={href} className={linkClass}>
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          className={linkClass}
          {...(external && href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
}

export default function EduStandardsPortableBody({ value }: EduStandardsPortableBodyProps) {
  if (!value?.length) return null
  return <PortableText value={value} components={components} />
}
