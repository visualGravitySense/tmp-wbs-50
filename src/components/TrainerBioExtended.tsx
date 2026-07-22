import React from 'react'
import Image from 'next/image'
import { Award, ExternalLink } from 'lucide-react'
import { MarketingContainer, Section, SplitHeader, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import { urlFor as urlForImage } from '@/sanity/lib/image';
import type { TrainerBioCardData } from '@/components/TrainerBioCard'

export type TrainerBioExtendedData = TrainerBioCardData & {
  bioParagraph2?: string
  bioParagraph3?: string
}

export interface TrainerBioExtendedProps {
  data?: TrainerBioExtendedData
}

const HEADER_TAGS = ['LEAN', 'TOYOTA TPS', 'KAIZEN']

const DEFAULT_QUOTE =
  '"Õpetab seda, mida on ise tehases teinud — ja ka seda, mida tegid Henry Ford sajand tagasi ja Jaapani juhid Toyotas."'

const DEFAULT_BIO_1 =
  'Meie treener ei õpeta lihtsalt teooriat. Õpetab seda, millele tugineb tugev teooria — ehk töötavat praktikat. Jagame kogemust 100+ Eesti tehase põrandalt. Teeme puust ja punaselt ette ja asi saab selgeks.'

const DEFAULT_BIO_2 =
  'Konsultatsioonid ja koolitused on toimunud autotööstuses, toiduainete ja metallitööstuses, logistikaettevõtetes ning meditsiini- ja masinatööstuses. Tehaseid on aidatud üle Eesti, Lätis ja Leedus — alati kohapeal, kus töö tegelikult toimub.'

const DEFAULT_BIO_3 =
  'LEAN ebaõnnestub enamasti siis, kui keskendutakse ainult tööriistadele ilma inimesteta. Meie lähenemine on inimene-esimesena: selged rutiinid, juhtimise nähtavus ja meeskonna kaasamine, et muutus jääks ellu pärast koolitust — mitte ei jääks seinale riputatud plaaniks.'

const DEFAULT_STATS = [
  { value: '147+', label: 'Lõpetajat' },
  { value: '+31%', label: 'Kesk. OEE kasv' },
  { value: '4.9/5', label: 'Hinnang' },
  { value: '100+', label: 'Tehast' },
]

function PortraitImage({ data }: { data?: TrainerBioExtendedData }) {
  if (data?.mainImage) {
    return (
      <Image
        src={urlForImage(data.mainImage).width(900).quality(90).url()}
        alt={data.mainImage.alt || 'Your Name'}
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

function FactoryImage({ data }: { data?: TrainerBioExtendedData }) {
  if (data?.overlayImage) {
    return (
      <Image
        src={urlForImage(data.overlayImage).width(560).quality(88).url()}
        alt={data.overlayImage.alt || 'Tehase külastus'}
        fill
        sizes="(max-width: 640px) 90vw, 280px"
        className="object-cover"
      />
    )
  }

  return (
    <Image
      src="/placeholder-image.svg"
      alt="Workplace"
      fill
      sizes="(max-width: 640px) 90vw, 280px"
      className="object-cover"
    />
  )
}

function ClassroomImage({ data }: { data?: TrainerBioExtendedData }) {
  if (data?.overlayImage2) {
    return (
      <Image
        src={urlForImage(data.overlayImage2).width(560).quality(88).url()}
        alt={data.overlayImage2.alt || 'Koolitus'}
        fill
        sizes="(max-width: 640px) 90vw, 280px"
        className="object-cover"
      />
    )
  }

  return (
    <Image
      src="/placeholder-image.svg"
      alt="Training"
      fill
      sizes="(max-width: 640px) 90vw, 280px"
      className="object-cover"
    />
  )
}

export default function TrainerBioExtended({ data }: TrainerBioExtendedProps) {
  const headerTags = data?.tags?.length ? data.tags.slice(0, 3) : HEADER_TAGS
  const stats = data?.stats?.length
    ? [
        ...data.stats.slice(0, 3),
        { value: '100+', label: 'Tehast' },
      ].slice(0, 4)
    : DEFAULT_STATS

  const certLink = '/taienduskoolituse-standard'

  return (
    <Section variant="band" className="overflow-hidden">
      <MarketingContainer elevated>
        <article className={marketingInsetCardClass}>
          <div
            className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-32 h-56 w-56 rounded-full bg-cyan-500/8 blur-3xl"
            aria-hidden
          />

          {/* Top bar */}
          <header className="relative flex flex-col gap-3 border-b border-[rgb(var(--border))]/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
            <EyebrowPillBadge text={data?.eyebrow || 'Koolitaja'} className="self-start sm:self-center" />
            <div className="flex flex-wrap gap-2">
              {headerTags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--text-secondary))] ${marketingMicroPillClass}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Mobile-only header at the very top of the card body */}
          <div className="px-5 pt-8 sm:px-8 lg:hidden">
            <SplitHeader
              title={data?.title || 'Your Name'}
              subtitle={data?.subtitle || 'Programmi juht ja peakoolitaja • 25+ aastat tootmises'}
              align="left"
              className="mb-2"
              headingLevel="div"
            />
          </div>

          {/* Editorial body */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12">
            {/* Photo column */}
            <div className="relative flex flex-col gap-4 p-5 sm:p-6 lg:p-8 lg:col-span-5 lg:border-r border-[rgb(var(--border))]/50">
              {/* Top Big Image */}
              <div className="relative w-full rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] shadow-lg">
                <PortraitImage data={data} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              </div>

              {/* Bottom 2 Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-white/10">
                  <FactoryImage data={data} />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-white/10">
                  <ClassroomImage data={data} />
                </div>
              </div>
            </div>

            {/* Copy column */}
            <div className="flex flex-col px-5 py-8 sm:px-8 lg:col-span-7 lg:py-10 lg:pl-10 lg:pr-10">
              <SplitHeader
                title={data?.title || 'Your Name'}
                subtitle={data?.subtitle || 'Programmi juht ja peakoolitaja • 25+ aastat tootmises'}
                align="left"
                className="hidden lg:flex mb-6 lg:mb-8"
              />

              <blockquote className="mt-8 border-l-[3px] border-blue-500 pl-5 sm:pl-6">
                <p className="text-xl font-medium italic leading-snug tracking-tight text-[rgb(var(--text-primary))] sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
                  {data?.quote || DEFAULT_QUOTE}
                </p>
              </blockquote>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-[rgb(var(--text-secondary))]">
                <p>{data?.description || DEFAULT_BIO_1}</p>
                <p>{data?.bioParagraph2 || DEFAULT_BIO_2}</p>
                <p>{data?.bioParagraph3 || DEFAULT_BIO_3}</p>
              </div>
            </div>
          </div>

          {/* Full-width stats */}
          <div className="grid grid-cols-2 divide-x divide-y divide-[rgb(var(--border))]/60 border-t border-[rgb(var(--border))]/60 sm:grid-cols-4 sm:divide-y-0">
            {stats.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className="flex flex-col items-center justify-center px-4 py-6 text-center sm:py-7"
              >
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--text-secondary))]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Credentials row */}
          <footer className="flex flex-col gap-3 border-t border-[rgb(var(--border))]/60 bg-[rgb(var(--bg-primary))]/40 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:px-8 sm:py-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Award className="h-3.5 w-3.5 shrink-0" aria-hidden />
              JIPM sertifitseeritud
            </span>
            <span className="inline-flex items-center rounded-full border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-secondary))]/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[rgb(var(--text-secondary))]">
              Toyota TPS metoodika
            </span>
            <a
              href={certLink}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 underline decoration-blue-500/40 underline-offset-4 transition hover:text-blue-500 dark:text-blue-400 sm:ml-auto"
            >
              Tutvu koolitusstandardiga
              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
            </a>
          </footer>
        </article>
      </MarketingContainer>
    </Section>
  )
}
