import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

type PrivacyPolicyPortableBodyProps = {
  value: PortableTextBlock[] | null | undefined
}

const linkClass =
  'font-semibold text-blue-600 underline-offset-2 transition-colors hover:underline dark:text-blue-400'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed text-[rgb(var(--text-secondary))] last:mb-0 sm:text-[15px]">
        {children}
      </p>
    ),
    h2: ({ children, value }) => (
      <h2
        id={value?._key ? `pp-${value._key}` : undefined}
        className="mb-4 mt-10 scroll-mt-24 text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl [&:first-of-type]:mt-0"
      >
        {children}
      </h2>
    ),
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
      <ul className="mb-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-inside list-decimal space-y-2 pl-0.5 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
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

export default function PrivacyPolicyPortableBody({ value }: PrivacyPolicyPortableBodyProps) {
  if (!value?.length) return null
  return <PortableText value={value} components={components} />
}
