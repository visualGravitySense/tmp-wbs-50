'use client'

import { useCallback, useState } from 'react'
import { usePathname } from 'next/navigation'

type BlogPostShareProps = {
  title?: string
  /**
   * Absolute page URL for share links (preferred).
   * Pass from the server so SSR and client render the same `href`s.
   */
  url?: string
}

/**
 * Social share card. Share URLs must not read `window` during render —
 * that caused hydration mismatches (empty URL on server, full URL on client).
 */
export default function BlogPostShare({
  title = 'Jaga artiklit',
  url,
}: BlogPostShareProps) {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)

  // Prefer server-provided absolute URL; otherwise a path-only stable value
  // (same on server + client) — never touch window during render.
  const pageUrl = (url?.trim() || pathname || '').trim()
  const encoded = encodeURIComponent(pageUrl)
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`

  const onCopy = useCallback(async () => {
    const target =
      pageUrl ||
      (typeof window !== 'undefined'
        ? `${window.location.origin}${pathname || ''}`
        : '')
    if (!target) return
    try {
      await navigator.clipboard.writeText(target)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }, [pageUrl, pathname])

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.08] bg-white/70 p-4 text-center shadow-[0_20px_50px_-34px_rgba(15,23,42,0.5)] backdrop-blur-2xl dark:border-white/12 dark:bg-[rgb(var(--bg-secondary))]/62 dark:shadow-[0_20px_50px_-34px_rgba(0,0,0,0.75)] xl:rounded-[20px] xl:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.26)_100%)] dark:bg-[linear-gradient(140deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.06)_100%)]" aria-hidden />
      <div className="pointer-events-none absolute -right-12 -top-14 h-28 w-28 rounded-full bg-blue-400/15 blur-2xl dark:bg-blue-500/18" aria-hidden />
      <div className="relative z-[1] mb-2.5 text-[11px] font-bold uppercase tracking-[0.11em] text-slate-400 dark:text-slate-500 xl:mb-3">
        {title}
      </div>
      <div className="relative z-[1] flex justify-center gap-2.5">
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-black/[0.1] bg-white/70 text-sm font-bold text-slate-500 shadow-[0_10px_22px_-16px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/70 hover:text-blue-600 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400/45 dark:hover:bg-blue-500/15 dark:hover:text-blue-300"
          title="LinkedIn"
        >
          in
        </a>
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-black/[0.1] bg-white/70 text-sm font-bold text-slate-500 shadow-[0_10px_22px_-16px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/70 hover:text-blue-600 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400/45 dark:hover:bg-blue-500/15 dark:hover:text-blue-300"
          title="Facebook"
        >
          fb
        </a>
        <button
          type="button"
          onClick={onCopy}
          className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-black/[0.1] bg-white/70 text-sm text-slate-500 shadow-[0_10px_22px_-16px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/70 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400/45 dark:hover:bg-blue-500/15"
          title="Kopeeri link"
          aria-label="Kopeeri lingi aadress"
        >
          {copied ? '✓' : '🔗'}
        </button>
      </div>
    </div>
  )
}
