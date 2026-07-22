import Image from 'next/image'
import { urlFor as urlForImage } from '@/sanity/lib/image'
import type { HeroBlock } from '@/types/sanity'

interface HeroProps {
  data: HeroBlock
}

export function Hero({ data }: HeroProps) {
  const { heading, subheading, image, ctaButton, overlay } = data

  return (
    <section className="site-hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {image && (
        <div className="site-hero-media absolute inset-0 z-0">
          <Image
            src={urlForImage(image).url()}
            alt={heading}
            fill
            className="object-cover"
            priority
          />
          {overlay && (
            <div className="site-hero-overlay absolute inset-0 bg-black/50" />
          )}
        </div>
      )}

      <div className="site-hero-content relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-left md:text-center">
        <h1 className="site-hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          {heading}
        </h1>

        {subheading && (
          <p className="site-hero-sub text-xl sm:text-2xl text-white/90 mb-8 drop-shadow-md max-w-2xl md:mx-auto">
            {subheading}
          </p>
        )}

        {ctaButton && (
          <a
            href={ctaButton.url}
            className="site-hero-cta inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-foreground))] hover:bg-[rgb(var(--color-accent))] focus-visible:ring-[rgb(var(--color-ring))] h-11 px-8 text-lg"
          >
            {ctaButton.text}
          </a>
        )}
      </div>
    </section>
  )
}
