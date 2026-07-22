'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { SplitHeader } from '@/components/ui'
import { X, ZoomIn, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { BrandVibrantButton } from '@/components/ui/BrandVibrantButton'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'

export interface GalleryImage {
  _key: string
  asset: {
    _id?: string
    url?: string
    blurDataURL?: string
    [key: string]: any
  }
  tag?: string
  alt?: string
  size?: 'normal' | 'large' | 'wide'
}

export interface PhotoGalleryProps {
  title?: string
  subtitle?: string
  images: GalleryImage[]
  variant?: 'preview' | 'full'
  mobileLayout?: 'scroll' | 'marquee'
  gradientFrom?: string
  gradientTo?: string
}

function getGridClass(size?: string) {
  switch (size) {
    case 'large': return 'md:col-span-2 md:row-span-2'
    case 'wide':  return 'md:col-span-2'
    default:      return 'col-span-1'
  }
}

function getHeightClass(size?: string) {
  switch (size) {
    case 'large': return 'h-[260px] md:h-[580px]'
    case 'wide':  return 'h-[200px] md:h-[280px]'
    default:      return 'h-[200px] md:h-[280px]'
  }
}

export default function PhotoGallery({ 
  title, 
  subtitle, 
  images, 
  variant = 'full', 
  mobileLayout = 'scroll',
  gradientFrom,
  gradientTo
}: PhotoGalleryProps) {

  if (!images?.length) return null

  const displayImages = images

  const renderImage = (img: GalleryImage, isDuplicate = false) => {
    const srcWidth = mobileLayout === 'marquee' ? 400 : 800
    const src = urlFor(img.asset).width(srcWidth).quality(85).auto('format').url()
    const lightSrc = urlFor(img.asset).width(1800).quality(90).url()
    const alt = img.alt || img.tag || 'Koolitus foto'

    return (
      <div
        key={isDuplicate ? `${img._key}-dup` : img._key}
        className={[
          'group relative overflow-hidden rounded-2xl',
          'bg-[rgb(var(--bg-secondary))]',
          'shadow-[0_2px_12px_-4px_rgba(15,23,42,0.12)]',
          'transition-all duration-500',
          'hover:shadow-[0_20px_48px_-16px_rgba(15,23,42,0.28),0_0_0_1px_rgba(99,102,241,0.15)]',
          'hover:-translate-y-0.5',
          'dark:shadow-[0_2px_12px_-4px_rgba(0,0,0,0.4)]',
          'dark:hover:shadow-[0_20px_48px_-16px_rgba(99,102,241,0.3),0_0_0_1px_rgba(99,102,241,0.2)]',
          mobileLayout === 'marquee' 
            ? 'w-[280px] h-[280px] shrink-0' 
            : 'max-md:w-[280px] max-md:h-[280px] max-md:shrink-0 max-md:snap-center max-md:snap-always',
          mobileLayout === 'marquee' ? '' : getGridClass(img.size),
          mobileLayout === 'marquee' ? '' : getHeightClass(img.size),
          isDuplicate && mobileLayout !== 'marquee' ? 'hidden' : ''
        ].join(' ')}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          placeholder={img.asset?.blurDataURL ? "blur" : "empty"}
          blurDataURL={img.asset?.blurDataURL}
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Tag pill */}
        {img.tag && (
          <span className="absolute bottom-3 left-3 inline-block rounded-lg border border-white/20 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-800 opacity-0 shadow-sm backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 dark:bg-slate-900/85 dark:text-slate-100">
            {img.tag}
          </span>
        )}
      </div>
    )
  }

  const customStyle = (gradientFrom && gradientTo && mobileLayout === 'marquee') ? {
    background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`
  } : undefined

  return (
    <section 
      className={`py-16 sm:py-20 overflow-x-hidden`}
      style={customStyle}
    >
      {/* Header wrapper */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className={`mb-10 sm:mb-14 flex justify-center ${customStyle ? 'text-white' : ''}`}>
            <SplitHeader
              title={title}
              eyebrow={subtitle ? <EyebrowPillBadge text={subtitle} tone={customStyle ? 'onDark' : 'default'} /> : undefined}
              align="center"
              className="max-w-3xl"
              inverted={!!customStyle}
            />
          </div>
        )}
      </div>

      {/* Marquee/Grid Track Wrapper */}
      <div className={mobileLayout === 'marquee' ? "w-full overflow-hidden" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
        <div 
          className={mobileLayout === 'marquee' ? "overflow-hidden w-full" : ""}
          style={mobileLayout === 'marquee' ? {
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          } : undefined}
        >
          <div className={
            mobileLayout === 'marquee'
              ? 'flex w-max animate-[marquee-horizontal_32s_linear_infinite] md:animate-[marquee-horizontal_40s_linear_infinite] gap-4 py-2'
              : 'max-md:flex max-md:touch-auto max-md:gap-4 max-md:overflow-x-auto max-md:overscroll-x-contain max-md:pb-6 max-md:pt-2 max-md:snap-x max-md:snap-mandatory max-md:scroll-pl-4 max-md:scroll-pr-4 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden max-md:-mx-4 max-md:px-4 md:grid md:grid-cols-4 md:gap-4'
          }>
            {displayImages.map((img) => renderImage(img, false))}
            {mobileLayout === 'marquee' && displayImages.map((img) => renderImage(img, true))}
          </div>
        </div>
      </div>

      {/* CTA wrapper */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {variant === 'preview' && images.length > 6 && (
          <div className="mt-12 flex justify-center">
            <BrandVibrantButton href="/galerii">
              Vaata kõiki
            </BrandVibrantButton>
          </div>
        )}
      </div>

    </section>
  )
}
