import Image from 'next/image'
import * as React from 'react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@/types/blog'
import { urlFor } from '@/sanity/lib/image'

function getChildrenText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(getChildrenText).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    return getChildrenText((children as any).props.children)
  }
  return ''
}

type BlogPostPortableBodyProps = {
  body: PortableTextBlock[]
  headingIdByKey: Record<string, string>
}

export default function BlogPostPortableBody({ body, headingIdByKey }: BlogPostPortableBodyProps) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="mb-[1.35em] text-[1.125rem] leading-[1.82] tracking-[0.01em] text-[rgb(var(--text-secondary))] last:mb-0 sm:text-[1.1875rem] sm:leading-[1.85]">
          {children}
        </p>
      ),
      h2: ({ children, value }) => (
        <h2
          id={value?._key ? headingIdByKey[value._key] : undefined}
          className="blog-article-h2 mt-14 scroll-mt-28 border-b border-black/[0.08] pb-3 text-[1.62rem] font-semibold leading-[1.16] tracking-[0.02em] text-[rgb(var(--text-primary))] first:mt-0 sm:mt-16 sm:text-[1.88rem]"
        >
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3
          id={value?._key ? headingIdByKey[value._key] : undefined}
          className="blog-article-h3 mt-11 scroll-mt-28 text-[1.02rem] font-semibold leading-[1.28] tracking-[0.02em] text-[rgb(var(--text-primary))] first:mt-0 sm:text-[1.14rem]"
        >
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="blog-article-h4 mt-9 scroll-mt-28 text-[0.82rem] leading-snug text-[rgb(var(--text-primary))] first:mt-0">
          {children}
        </h4>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-[1.35em] space-y-[0.65em] text-[1.125rem] leading-[1.82] tracking-[0.01em] text-[rgb(var(--text-secondary))] sm:text-[1.1875rem]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="my-[1.35em] list-inside list-decimal space-y-[0.65em] pl-0.5 text-[1.125rem] leading-[1.82] text-[rgb(var(--text-secondary))] [font-variant-numeric:lining-nums] marker:text-[rgb(var(--text-primary))] marker:font-semibold sm:text-[1.1875rem]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="relative pl-[1.35rem] before:absolute before:left-0 before:top-[0.62em] before:h-1 before:w-1 before:rounded-full before:bg-[rgb(var(--text-primary))]/35 before:content-['']">
          {children}
        </li>
      ),
      number: ({ children }) => <li className="pl-1">{children}</li>,
    },
    marks: {
      strong: ({ children }) => {
        const text = getChildrenText(children)
        if (text.length > 70) {
          return <span className="font-semibold text-[rgb(var(--text-primary))]">{children}</span>
        }
        return <strong className="font-semibold text-[rgb(var(--text-primary))]">{children}</strong>
      },
      em: ({ children }) => <em className="italic text-[rgb(var(--text-primary))]/95">{children}</em>,
      underline: ({ children }) => (
        <span className="underline decoration-[rgb(var(--text-secondary))]/35 underline-offset-[4px]">{children}</span>
      ),
      link: ({ children, value }) => {
        const href = (value as { href?: string })?.href || '#'
        const blank = href.startsWith('http')
        return (
          <a
            href={href}
            className="border-b border-[rgb(var(--text-primary))]/25 pb-px text-[rgb(var(--text-primary))] no-underline transition-colors hover:border-blue-600/70 hover:text-blue-700 dark:hover:text-blue-400"
            {...(blank ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {children}
          </a>
        )
      },
    },
    types: {
      calloutBlock: ({ value }) => {
        const v = value as { text?: string; type?: string }
        const t = v.type || 'info'
        const palette =
          t === 'warning'
            ? 'border-amber-400/45 bg-gradient-to-br from-amber-50/90 to-amber-100/30 dark:from-amber-950/25 dark:to-amber-900/10'
            : t === 'success'
              ? 'border-emerald-400/40 bg-gradient-to-br from-emerald-50/90 to-emerald-100/25 dark:from-emerald-950/25 dark:to-emerald-900/10'
              : 'border-slate-300/60 bg-gradient-to-br from-slate-50/95 to-slate-100/40 dark:border-slate-600/50 dark:from-slate-900/40 dark:to-slate-950/25'
        return (
          <blockquote
            className={`my-10 border-l-[3px] py-6 pl-7 pr-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-none rounded-r-xl ${palette}`}
          >
            <p className="blog-article-display text-[1.3125rem] italic leading-[1.65] tracking-[-0.01em] text-[rgb(var(--text-primary))] sm:text-[1.375rem]">
              {v.text}
            </p>
          </blockquote>
        )
      },
      imageBlock: ({ value }) => {
        const v = value as {
          image?: { asset?: { _ref?: string } }
          alt?: string
          caption?: string
        }
        if (!v.image?.asset?._ref) return null
        const src = urlFor(v.image).url()
        return (
          <figure className="blog-article-figure my-10">
            <div className="overflow-hidden rounded-sm border border-black/[0.06] bg-[#f4f4f5] shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_24px_48px_-28px_rgba(0,0,0,0.18)] dark:border-white/[0.07] dark:bg-white/[0.04] dark:shadow-[0_24px_56px_-32px_rgba(0,0,0,0.65)]">
              <div className="relative aspect-[16/10] w-full max-h-[min(28rem,75vh)]">
                <Image src={src} alt={v.alt || ''} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 608px" />
              </div>
            </div>
            {v.caption ? (
              <figcaption className="blog-article-display mt-3.5 text-center text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[rgb(var(--text-secondary))] dark:text-gray-400">
                {v.caption}
              </figcaption>
            ) : null}
          </figure>
        )
      },
      statsRow: ({ value }) => {
        const v = value as { stats?: Array<{ number?: number; label?: string }> }
        if (!v.stats?.length) return null
        return (
          <div className="my-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.07] shadow-sm dark:border-white/10 dark:bg-white/10">
            {v.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/95 px-4 py-6 text-center dark:bg-[rgb(var(--bg-secondary))]/90"
              >
                <div className="blog-article-display text-[2rem] font-semibold tabular-nums tracking-tight text-[rgb(var(--text-primary))] sm:text-[2.25rem]">
                  {stat.number}
                </div>
                <div className="mt-1.5 text-[0.8125rem] leading-snug tracking-wide text-[rgb(var(--text-secondary))]">{stat.label}</div>
              </div>
            ))}
          </div>
        )
      },
    },
  }

  return (
    <div className="blog-article-prose min-w-0 text-[rgb(var(--text-primary))]" lang="et">
      <PortableText value={body as never} components={components} />
    </div>
  )
}
