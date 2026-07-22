import Image from 'next/image'
import { Button } from '@/components/ui'
import { urlFor as urlForImage } from '@/sanity/lib/image';
import type { HeroBlock } from '@/types/sanity'

interface HeroProps {
  data: HeroBlock
}

export function Hero({ data }: HeroProps) {
  const { heading, subheading, image, ctaButton, overlay } = data

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlForImage(image).url()}
            alt={heading}
            fill
            className="object-cover"
            priority
          />
          {overlay && (
            <div className="absolute inset-0 bg-black/50" />
          )}
        </div>
      )}
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          {heading}
        </h1>
        
        {subheading && (
          <p className="text-xl sm:text-2xl text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
            {subheading}
          </p>
        )}
        
        {ctaButton && (
          <a
            href={ctaButton.url}
            className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 h-11 px-8 text-lg"
          >
            {ctaButton.text}
          </a>
        )}
      </div>
    </section>
  )
}
