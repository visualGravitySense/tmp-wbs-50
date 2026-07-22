'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { glassPanelVariantClasses } from '@/components/ui'
import { cn } from '@/lib/utils'
import { urlFor } from '@/lib/sanity/client'

type Category = { _id: string; title: string }

type GalleryRow = {
  image: any
  caption?: string | null
  categories?: Category[] | null
}

type GalleryClientProps = {
  rows: GalleryRow[]
  /** Categories in Sanity drag-and-drop order (with server-side fallback). */
  orderedCategories?: Category[] | null
}

export default function GalleryClient({
  rows,
  orderedCategories,
}: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    // Categories that actually appear on at least one image
    const used = new Map<string, string>()
    for (const row of rows) {
      if (row.categories) {
        for (const cat of row.categories) {
          if (cat._id && cat.title) {
            used.set(cat._id, cat.title)
          }
        }
      }
    }

    if (used.size === 0) return []

    // Prefer Sanity ordered list; preserve order, only show used categories
    if (orderedCategories && orderedCategories.length > 0) {
      const ordered: { id: string; title: string }[] = []
      const seen = new Set<string>()

      for (const cat of orderedCategories) {
        if (!cat?._id || seen.has(cat._id) || !used.has(cat._id)) continue
        seen.add(cat._id)
        ordered.push({ id: cat._id, title: used.get(cat._id) || cat.title })
      }

      // Append any image categories missing from the ordered list
      for (const [id, title] of used) {
        if (!seen.has(id)) {
          ordered.push({ id, title })
        }
      }

      return ordered
    }

    // Fallback: insertion order from images (legacy behaviour)
    return Array.from(used.entries()).map(([id, title]) => ({ id, title }))
  }, [rows, orderedCategories])

  const filteredRows = useMemo(() => {
    if (!activeCategory) return rows
    return rows.filter((row) => {
      if (!row.categories) return false
      return row.categories.some((c) => c._id === activeCategory)
    })
  }, [rows, activeCategory])

  return (
    <div>
      {categories.length > 0 && (
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              activeCategory === null
                ? "bg-[rgb(var(--color-primary))] text-white shadow-md shadow-[rgb(var(--color-primary))]/20"
                : "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))]/80 hover:text-[rgb(var(--text-primary))]"
            )}
          >
            Kõik
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                activeCategory === cat.id
                  ? "bg-[rgb(var(--color-primary))] text-white shadow-md shadow-[rgb(var(--color-primary))]/20"
                  : "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))]/80 hover:text-[rgb(var(--text-primary))]"
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}

      {filteredRows.length === 0 && activeCategory ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[rgb(var(--bg-primary))]/50 px-6 py-14 text-center dark:bg-white/[0.03]">
          <p className="text-sm font-medium text-[rgb(var(--text-secondary))] sm:text-base">
            Selles kategoorias pole hetkel pilte.
          </p>
        </div>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
          {filteredRows.map(({ image, caption }, index) => {
            const src = urlFor(image).width(900).height(675).fit('crop').auto('format').url()
            const alt = image.alt || caption || `Galerii ${index + 1}`
            return (
              <li key={`${src}-${index}`} className="min-w-0">
                <figure
                  className={cn(
                    glassPanelVariantClasses.card,
                    'group overflow-hidden !p-0 shadow-md transition-shadow duration-300 hover:!translate-y-0 hover:!scale-100 hover:shadow-lg',
                  )}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[rgb(var(--bg-secondary))]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  {caption ? (
                    <figcaption className="border-t border-[var(--border)]/60 px-3 py-2.5 text-center text-xs font-semibold leading-snug text-[rgb(var(--text-secondary))] sm:px-4 sm:text-[13px]">
                      {caption}
                    </figcaption>
                  ) : null}
                </figure>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
