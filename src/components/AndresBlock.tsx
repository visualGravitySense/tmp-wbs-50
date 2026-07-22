import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Award, ArrowRight, ExternalLink } from 'lucide-react'
import { Container, Section, SplitHeader, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import { BrandVibrantButton } from '@/components/ui/BrandVibrantButton'
import { urlFor as urlForImage } from '@/sanity/lib/image'
import type { AndresBlockType } from '@/types/mainPageSections'

// A small helper to safely render Portable Text blocks as plain strings if needed, 
// or simply map through them if we want rich text.
function renderPortableText(blocks: any[]) {
  if (!blocks || !Array.isArray(blocks)) return null
  return blocks.map((block, idx) => {
    if (block._type !== 'block' || !block.children) return null
    return (
      <p key={idx} className="mb-4 last:mb-0">
        {block.children.map((child: any) => child.text).join('')}
      </p>
    )
  })
}

export interface AndresBlockProps {
  variant: 'compact' | 'medium' | 'full'
  data?: AndresBlockType
}

function PortraitImage({ photo }: { photo?: any }) {
  if (photo) {
    return (
      <Image
        src={urlForImage(photo).width(900).quality(90).url()}
        alt="Team member"
        fill
        sizes="(max-width: 1024px) 100vw, 38vw"
        className="object-cover object-[center_15%] grayscale"
        priority
      />
    )
  }

  return (
    <Image
      src="/placeholder-image.svg"
      alt="Team member"
      fill
      sizes="(max-width: 1024px) 100vw, 38vw"
      className="object-cover object-[center_15%] grayscale"
      priority
    />
  )
}

function DefaultImage({ index, photo }: { index: number, photo?: any }) {
  if (photo) {
    return (
      <Image
        src={urlForImage(photo).width(560).quality(88).url()}
        alt="Secondary"
        fill
        sizes="(max-width: 640px) 90vw, 280px"
        className="object-cover"
      />
    )
  }
  const fallbackSrc = "/placeholder-image.svg"
  return (
    <Image
      src={fallbackSrc}
      alt="Factory/Classroom"
      fill
      sizes="(max-width: 640px) 90vw, 280px"
      className="object-cover"
    />
  )
}

export default function AndresBlock({ variant, data }: AndresBlockProps) {
  const isCompact = variant === 'compact'
  const isFull = variant === 'full'

  const title = data?.name || 'Your Name'
  const eyebrow = data?.eyebrow || 'Expert'
  const subtitle = data?.subtitle || 'Programmi juht ja peakoolitaja • 25+ aastat tootmises'
  const tags = data?.tags || ['LEAN', 'TOYOTA TPS', 'KAIZEN']
  
  const stats = data?.stats || [
    { value: '147+', label: 'Lõpetajat' },
    { value: '+31%', label: 'Kesk. OEE kasv' },
    { value: '4.9/5', label: 'Hinnang' },
    { value: '100+', label: 'Tehast' },
  ]

  const defaultQuote = '"Õpetab seda, mida on ise tehases teinud — ja ka seda, mida tegid Henry Ford sajand tagasi ja Jaapani juhid Toyotas."'
  const defaultShortBio = 'Replace this short bio with your expert introduction. Focus on practical experience and outcomes for clients.'

  // The Compact variant is simpler
  if (isCompact) {
    return (
      <Container size="6xl" className="mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)]/70 bg-[rgb(var(--bg-primary))]/40 p-6 shadow-xl backdrop-blur-md sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <PortraitImage photo={data?.photo} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <SplitHeader title={title} eyebrow={<EyebrowPillBadge text={eyebrow} />} subtitle={subtitle} align="left" className="mb-6" />
              <div className="text-lg leading-relaxed text-[var(--text-secondary)]">
                {data?.shortBio || defaultShortBio}
              </div>
              <div className="mt-8 flex gap-4">
                <BrandVibrantButton href={data?.ctaLink || "/koolitus"}>
                  {data?.ctaLabel || "Avasta lähemalt"}
                </BrandVibrantButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }

  // Medium and Full variants
  return (
    <Container size="6xl" className="mx-auto px-4 md:px-8 py-16 md:py-24">
      <article className={`${marketingInsetCardClass} relative overflow-hidden rounded-3xl border border-[rgb(var(--border))]/50 bg-[rgb(var(--bg-primary))]/30 backdrop-blur-xl shadow-2xl`}>
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-16 bottom-32 h-56 w-56 rounded-full bg-cyan-500/8 blur-3xl" aria-hidden />

        {/* Header */}
        <header className="relative flex flex-col gap-3 border-b border-[rgb(var(--border))]/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
          <EyebrowPillBadge text={eyebrow} className="self-start sm:self-center" />
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className={`px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--text-secondary))] ${marketingMicroPillClass}`}>
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Mobile Header */}
        <div className="px-5 pt-8 sm:px-8 lg:hidden">
          <SplitHeader title={title} subtitle={subtitle} align="left" className="mb-2" headingLevel="div" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12">
          {/* Photos */}
          <div className="relative flex flex-col gap-4 p-5 sm:p-6 lg:p-8 lg:col-span-5 lg:border-r border-[rgb(var(--border))]/50">
            <div className="relative w-full rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] shadow-lg">
              <PortraitImage photo={data?.photo} />
            </div>
            {isFull && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-white/10">
                  <DefaultImage index={0} photo={data?.secondaryPhotos?.[0]} />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-white/10">
                  <DefaultImage index={1} photo={data?.secondaryPhotos?.[1]} />
                </div>
              </div>
            )}
          </div>

          {/* Copy */}
          <div className="flex flex-col px-5 py-8 sm:px-8 lg:col-span-7 lg:py-10 lg:pl-10 lg:pr-10">
            <SplitHeader title={title} subtitle={subtitle} align="left" className="hidden lg:flex mb-6 lg:mb-8" />
            <blockquote className="mt-8 border-l-[3px] border-blue-500 pl-5 sm:pl-6">
              <p className="text-xl font-medium italic leading-snug tracking-tight text-[rgb(var(--text-primary))] sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
                {data?.quote || defaultQuote}
              </p>
            </blockquote>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-[rgb(var(--text-secondary))]">
              {data?.bio ? renderPortableText(data.bio) : (
                <>
                  <p>{data?.shortBio || defaultShortBio}</p>
                  <p>Konsultatsioonid ja koolitused on toimunud autotööstuses, toiduainete ja metallitööstuses, logistikaettevõtetes ning meditsiini- ja masinatööstuses. Tehaseid on aidatud üle Eesti, Lätis ja Leedus — alati kohapeal, kus töö tegelikult toimub.</p>
                </>
              )}
            </div>

            {isFull && (data?.methodologyText || data?.methodology) && (
              <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
                <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-400">
                  {data?.methodologyTitle || 'Metoodika'}
                </h4>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {data?.methodologyText || data?.methodology}
                </p>
              </div>
            )}

            {isFull && tags && tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {tags.map((tag) => {
                  const isJipm = tag.toLowerCase().includes('jipm')
                  return (
                    <span 
                      key={tag} 
                      className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm ${
                        isJipm 
                          ? 'border-emerald-200/80 bg-emerald-50/90 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'border-blue-200/60 bg-blue-50/50 text-blue-600 dark:border-blue-800/40 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}
                    >
                      {isJipm && <Award className="mr-1.5 h-3.5 w-3.5 shrink-0" aria-hidden />}
                      {tag}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 border-t border-[rgb(var(--border))]/60 divide-x divide-y sm:divide-y-0 divide-[rgb(var(--border))]/60 ${isFull ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
          {(isFull ? stats : stats.slice(0, 3)).map((stat, index) => (
            <div key={`${stat.label}-${index}`} className="flex flex-col items-center justify-center px-4 py-6 text-center sm:py-7">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--text-secondary))]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {isFull && (
          <div className="border-t border-[rgb(var(--border))]/60 px-5 py-6 sm:px-8 sm:py-8">
            {/* Timeline */}
            {data?.timeline && data.timeline.length > 0 && (
              <div className="pt-2 pb-4 sm:pt-4 sm:pb-6">
                <div className="relative">
                  {/* Horizontal Scrollable Container for Mobile/Tablet, Grid for Desktop */}
                  <div className="flex overflow-x-auto lg:grid lg:grid-cols-6 lg:gap-0 snap-x snap-mandatory hide-scrollbar pb-4 lg:pb-0">
                    
                    {data.timeline.map((item, idx) => (
                      <div key={idx} className="relative flex w-[160px] min-w-[160px] shrink-0 flex-col items-center snap-center lg:w-auto lg:min-w-0">
                        {/* Horizontal Line Segment (extends across each item) */}
                        <div className={`absolute top-[38px] h-[2px] bg-blue-500/20 z-0
                          ${idx === 0 ? 'left-[50%] w-[50%]' : 
                            idx === data.timeline!.length - 1 ? 'left-0 w-[50%]' : 
                            'left-0 w-full'}`} 
                          aria-hidden="true" 
                        />

                        {/* Year */}
                        <div className="h-[24px] flex items-end justify-center text-center">
                          <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            {item.year}
                          </span>
                        </div>
                        
                        {/* Dot */}
                        <div className="mt-[6px] mb-[6px] relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 shadow-sm ring-4 ring-[var(--bg-primary)]">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                        </div>
                        
                        {/* Title */}
                        <div className="px-2 text-center flex items-start justify-center">
                          <h4 className="text-[10px] font-bold uppercase leading-snug tracking-wider text-[var(--text-primary)]">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Factories */}
            {data?.factories && data.factories.length > 0 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-[var(--text-primary)]">Tehased</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {data.factories.map((factory, idx) => (
                    <div key={idx} className="rounded-xl border border-[var(--border)]/50 bg-[var(--bg-secondary)]/50 p-5">
                      {factory.logo && (
                        <div className="mb-4 relative h-12 w-32">
                          <Image src={urlForImage(factory.logo).width(200).url()} alt={factory.name} fill className="object-contain object-left" />
                        </div>
                      )}
                      <h4 className="font-semibold text-[var(--text-primary)]">{factory.name}</h4>
                      {factory.description && (
                        <p className="mt-2 text-sm text-[var(--text-secondary)]">{factory.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}



        {/* Credentials row */}
        <footer className="flex flex-col gap-3 border-t border-[rgb(var(--border))]/60 bg-[rgb(var(--bg-primary))]/40 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:px-8 sm:py-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300">
            <Award className="h-3.5 w-3.5 shrink-0" aria-hidden />
            JIPM sertifitseeritud
          </span>
          <span className="inline-flex items-center rounded-full border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-secondary))]/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[rgb(var(--text-secondary))]">
            Toyota TPS metoodika
          </span>
          <Link
            href="/taienduskoolituse-standard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 underline decoration-blue-500/40 underline-offset-4 transition hover:text-blue-500 dark:text-blue-400 sm:ml-auto"
          >
            Tutvu koolitusstandardiga
            <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
          </Link>
        </footer>
      </article>
    </Container>
  )
}
