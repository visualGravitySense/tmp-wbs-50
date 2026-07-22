'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Search } from 'lucide-react'
import { Spinner } from '@/components/ui'
import type { SiteSearchHit } from '@/lib/sanity/queries/siteSearch'

const DEBOUNCE_MS = 220

function useSearchShortcut(handler: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'k' && e.key !== 'K') return
      if (!(e.metaKey || e.ctrlKey)) return
      e.preventDefault()
      handler()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handler])
}

export default function SiteSearch() {
  const panelId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [results, setResults] = useState<SiteSearchHit[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  const shortcutHint = useMemo(() => {
    if (typeof navigator === 'undefined') return 'Ctrl K'
    return /Mac|iPhone|iPod|iPad/i.test(navigator.platform) ? '⌘K' : 'Ctrl+K'
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setDebounced('')
    setResults([])
    setSelected(0)
    abortRef.current?.abort()
  }, [])

  const toggle = useCallback(() => {
    setOpen((v) => !v)
  }, [])

  useSearchShortcut(toggle)

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim()), DEBOUNCE_MS)
    return () => window.clearTimeout(t)
  }, [query])

  useEffect(() => {
    if (!open) return
    const id = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [open])

  useEffect(() => {
    if (!open) return
    if (debounced.length < 2) return

    // trigger loading state slightly after effect start to satisfy lint rule
    window.requestAnimationFrame(() => setLoading(true))
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac

    const run = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debounced)}`, { signal: ac.signal })
        if (!res.ok) throw new Error('search')
        const data = (await res.json()) as { results: SiteSearchHit[] }
        setResults(data.results ?? [])
        setSelected(0)
      } catch (e) {
        if ((e as Error).name === 'AbortError') return
        setResults([])
      } finally {
        if (!ac.signal.aborted) setLoading(false)
      }
    }
    void run()
    return () => ac.abort()
  }, [debounced, open])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', onDoc)
    return () => document.removeEventListener('keydown', onDoc)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const onKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0
      )
    } else if (e.key === 'Enter' && results[selected]) {
      e.preventDefault()
      window.location.href = results[selected].href
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border bg-white/90 backdrop-blur-sm border-slate-200 shadow-sm text-slate-800 dark:bg-slate-900/40 dark:border-white/10 dark:text-[#f0f4ff] p-2.5 transition-all hover:bg-white dark:hover:bg-slate-900/60 active:scale-95 lg:min-w-[9.5rem] lg:px-3 lg:py-2"
        aria-label="Otsi saidilt"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
      >
        <Search size={16} className="shrink-0 text-slate-500 dark:text-[#8da0bc]" aria-hidden />
        <span className="hidden text-left text-[11px] font-bold tracking-wide text-slate-500 dark:text-[#8da0bc] lg:inline">
          Otsi…
        </span>
        <kbd className="pointer-events-none hidden rounded border border-slate-200 bg-slate-100 text-slate-500 dark:bg-white/5 dark:border-white/10 dark:text-[#4a6080] px-1.5 py-0.5 font-mono text-[10px] font-semibold lg:inline lg:ml-auto">
          {shortcutHint}
        </kbd>
      </button>

      {typeof document !== 'undefined' && open
        ? createPortal(
            <div className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto p-4 pt-[min(12vh,7rem)] sm:p-6 sm:pt-[min(14vh,8rem)]">
              <button
                type="button"
                className="absolute inset-0 bg-[#0a1020]/55 backdrop-blur-[6px]"
                aria-label="Sulge otsing"
                onClick={close}
              />
              <div
                id={panelId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${panelId}-label`}
                className="search-modal-dialog relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(165deg,rgba(16,24,52,0.98)_0%,rgba(17,31,77,0.98)_52%,rgba(25,31,92,0.98)_100%)] text-white shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)]"
                onKeyDown={onKeyNav}
              >
                <div className="search-ambient-glow-top pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-500/25 blur-3xl" />
                <div className="search-ambient-glow-bottom pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
 
                <div className="relative border-b border-white/10 px-4 py-3 sm:px-5">
                  <p id={`${panelId}-label`} className="sr-only">
                    Saidi otsing
                  </p>
                  <div className="search-input-wrapper flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 sm:px-4">
                    {loading ? (
                      <Spinner size="md" className="text-blue-300 search-spinner" label="Otsin" />
                    ) : (
                      <Search className="h-5 w-5 shrink-0 text-blue-200/90 search-icon" aria-hidden />
                    )}
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Otsi pealkirjadest ja sisust…"
                      className="search-input min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/45 sm:text-[15px]"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      aria-autocomplete="list"
                      aria-controls={`${panelId}-list`}
                    />
                    <button
                      type="button"
                      onClick={close}
                      className="search-esc-badge shrink-0 rounded-lg px-2 py-1 text-[11px] font-black uppercase tracking-wider text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      Esc
                    </button>
                  </div>
                </div>
 
                <ul
                  id={`${panelId}-list`}
                  className="relative max-h-[min(60vh,22rem)] overflow-y-auto py-2"
                  role="listbox"
                  aria-label="Tulemused"
                >
                  {debounced.length >= 2 && !loading && results.length === 0 ? (
                    <li className="px-5 py-8 text-center text-sm text-white/55">
                      Vastet ei leitud. Proovi teisi märksõnu.
                    </li>
                  ) : null}
                  {debounced.length > 0 && debounced.length < 2 ? (
                    <li className="px-5 py-6 text-center text-sm text-white/50">
                      Kirjuta vähemalt kaks tähemärki.
                    </li>
                  ) : null}
                  {results.map((r, i) => (
                    <li key={`${r.href}-${i}`} role="presentation">
                      <a
                        href={r.href}
                        role="option"
                        aria-selected={i === selected}
                        className={`search-hit-item mx-2 flex flex-col gap-0.5 rounded-xl px-3 py-3 transition-colors sm:mx-3 sm:px-4 ${
                          i === selected ? 'bg-white/12 ring-1 ring-blue-400/35 search-hit-item-selected' : 'hover:bg-white/8'
                        }`}
                        onMouseEnter={() => setSelected(i)}
                      >
                        <span className="search-item-category text-[10px] font-black uppercase tracking-[0.14em] text-blue-200/85">
                          {r.category}
                        </span>
                        <span className="text-[15px] font-bold leading-snug tracking-tight text-white">{r.title}</span>
                        {r.description ? (
                          <span className="line-clamp-2 text-[13px] leading-relaxed text-white/55">{r.description}</span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="relative border-t border-white/10 px-4 py-2.5 text-[11px] text-white/40 sm:px-5">
                  <span className="hidden sm:inline">↑↓ vali · Enter avab · </span>
                  <span>{shortcutHint} avab / sulgeb</span>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
