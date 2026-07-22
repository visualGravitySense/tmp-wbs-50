'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { BlogTocItem } from '@/lib/blog/blogPostHeadings'

type BlogPostTocProps = {
  items: BlogTocItem[]
  title?: string
  /** Sidebar on desktop; collapsible `<details>` on mobile */
  variant?: 'sidebar' | 'collapsible'
}

const shellClass =
  'relative overflow-hidden rounded-[18px] border border-black/[0.08] bg-white/70 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.5)] backdrop-blur-2xl dark:border-white/12 dark:bg-[rgb(var(--bg-secondary))]/62 dark:shadow-[0_20px_50px_-34px_rgba(0,0,0,0.75)] xl:rounded-[20px]'

function TocLinkList({
  items,
  activeId,
  title,
  listClassName = '',
}: {
  items: BlogTocItem[]
  activeId: string
  title: string
  listClassName?: string
}) {
  return (
    <>
      {title ? (
        <div className="relative z-[1] mb-2.5 text-[11px] font-bold uppercase tracking-[0.11em] text-slate-400 dark:text-slate-500 xl:mb-3.5">
          {title}
        </div>
      ) : null}
      <ul className={`relative z-[1] flex flex-col gap-0.5 ${listClassName}`}>
        {items.map((item) => {
          const isActive = activeId === item.id
          const isSub = item.depth === 3
          return (
            <li key={item.id} className={`toc-item ${isSub ? 'pl-2' : ''}`}>
              <a
                href={`#${item.id}`}
                className={[
                  'relative block rounded-[12px] border border-transparent py-2 pl-2.5 pr-2 text-[13px] leading-snug transition-all duration-200',
                  isSub ? 'text-xs pl-[18px]' : '',
                  isActive
                    ? 'border-blue-200/70 bg-[linear-gradient(130deg,rgba(96,165,250,0.2),rgba(191,219,254,0.4))] font-semibold text-blue-500 shadow-[0_10px_24px_-18px_rgba(37,99,235,0.65)] dark:border-blue-400/45 dark:bg-blue-500/15 dark:text-blue-300'
                    : 'text-[rgb(var(--text-secondary))] hover:border-black/[0.08] hover:bg-white/45 hover:text-[rgb(var(--text-primary))] dark:hover:border-white/12 dark:hover:bg-white/[0.04]',
                ].join(' ')}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default function BlogPostToc({
  items,
  title = 'Sisukord',
  variant = 'sidebar',
}: BlogPostTocProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    if (items.length === 0) return

    const elements = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) {
            setActiveId(e.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [items])

  if (!items.length) return null

  if (variant === 'collapsible') {
    return (
      <details className={`group ${shellClass}`} aria-label={title}>
        <summary className="relative flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.26)_100%)] dark:bg-[linear-gradient(140deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.06)_100%)]" aria-hidden />
          <span className="relative z-[1] text-[11px] font-bold uppercase tracking-[0.11em] text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <span className="relative z-[1] flex items-center gap-2 text-xs font-medium text-[rgb(var(--text-secondary))]">
            <span className="rounded-full bg-black/[0.06] px-2 py-0.5 dark:bg-white/10">{items.length}</span>
            <ChevronDown
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </span>
        </summary>
        <div className="relative border-t border-black/[0.06] px-4 pb-4 pt-3 dark:border-white/10">
          <TocLinkList
            items={items}
            activeId={activeId}
            title=""
            listClassName="max-h-56 overflow-y-auto overscroll-contain"
          />
        </div>
      </details>
    )
  }

  return (
    <nav className={`${shellClass} p-4 xl:p-5`} aria-label={title}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.26)_100%)] dark:bg-[linear-gradient(140deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.06)_100%)]" aria-hidden />
      <div className="pointer-events-none absolute -right-12 -top-14 h-28 w-28 rounded-full bg-blue-400/15 blur-2xl dark:bg-blue-500/18" aria-hidden />
      <TocLinkList items={items} activeId={activeId} title={title} />
    </nav>
  )
}
