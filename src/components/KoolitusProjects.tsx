'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { MarketingContainer, Section, SplitHeader, marketingInsetCardClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'

export interface KoolitusProjectItem {
  _key: string
  title?: string
  description?: string
  tag?: string
  image?: {
    asset: Record<string, unknown>
    alt?: string
  }
}

export interface KoolitusProjectsProps {
  eyebrow?: string
  title?: string
  description?: string
  items: KoolitusProjectItem[]
}

export default function KoolitusProjects({
  eyebrow,
  title,
  description,
  items,
}: KoolitusProjectsProps) {
  if (!items?.length) return null

  return (
    <Section variant="band" className="overflow-x-hidden">
      <MarketingContainer elevated>
        <SplitHeader
          title={title || 'Parendusprojektide näited'}
          eyebrow={
            eyebrow ? <EyebrowPillBadge text={eyebrow} centered /> : undefined
          }
          subtitle={description}
          align="center"
          className="mx-auto mb-10 max-w-3xl md:mb-12"
        />

        <div className="mx-auto grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
          {items.map((item) => {
            const hasImage = Boolean(item.image?.asset)
            const src = hasImage
              ? urlFor(item.image!.asset)
                  .width(640)
                  .height(480)
                  .quality(85)
                  .auto('format')
                  .url()
              : null
            const alt = item.image?.alt || item.title || 'Parendusprojekt'

            return (
              <article
                key={item._key}
                className={`group relative min-w-0 overflow-hidden !p-0 ${marketingInsetCardClass}`}
              >
                {hasImage && src ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {item.tag ? (
                      <span className="absolute left-3 top-3 rounded-lg border border-white/20 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 backdrop-blur-md dark:bg-slate-900/85 dark:text-slate-100">
                        {item.tag}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <div className="p-4 sm:p-5">
                  {item.title ? (
                    <h3 className="text-lg font-black leading-tight tracking-tight text-[rgb(var(--text-primary))] md:text-xl">
                      {item.title}
                    </h3>
                  ) : null}
                  {item.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] opacity-85 md:text-base">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </MarketingContainer>
    </Section>
  )
}