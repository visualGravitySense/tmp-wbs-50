import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, SplitHeader } from '@/components/ui'
import { urlFor as urlForImage } from '@/sanity/lib/image'
import type { MainAndresCardBlock } from '@/types/mainPageSections'

export interface MainAndresCardProps {
  data: MainAndresCardBlock
}

export default function MainAndresCard({ data }: MainAndresCardProps) {
  const {
    badge = 'KOOLITAJA',
    title = 'Your Name',
    subtitle = 'Programmi juht ja peakoolitaja • 25+ aastat tootmises',
    description = 'Meie treener ei õpeta lihtsalt teooriat. Õpetab seda, millele tugineb tugev teooria — ehk töötavat praktikat. Jagame kogemust 100+ Eesti tehase põrandalt. Teeme puust ja punaselt ette ja asi saab selgeks.',
    image,
    ctaButton,
  } = data

  const ctaText = ctaButton?.text || 'Loe edasi'
  const ctaLink = ctaButton?.link || '/koolitus'

  return (
    <Container size="6xl" className="mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)]/70 bg-[rgb(var(--bg-primary))]/40 p-6 shadow-xl backdrop-blur-md sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              {image ? (
                <Image
                  src={urlForImage(image).width(900).quality(90).url()}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover object-[center_15%] grayscale"
                  priority
                />
              ) : (
                <Image
                  src="/placeholder-image.svg"
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover object-[center_15%] grayscale"
                  priority
                />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <SplitHeader title={title} eyebrow={badge} subtitle={subtitle} align="left" className="mb-6" />
            <div className="text-lg leading-relaxed text-[var(--text-secondary)] whitespace-pre-line">
              {description}
            </div>
            <div className="mt-8 flex gap-4">
              <Link
                href={ctaLink}
                className="group relative overflow-hidden inline-flex items-center gap-2.5 rounded-full btn-vibrant-blue !px-7 !py-3.5 text-[14px] font-black uppercase tracking-[0.12em]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaText}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 w-[200%] -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[60%]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
