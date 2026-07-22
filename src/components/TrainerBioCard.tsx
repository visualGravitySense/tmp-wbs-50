import React from 'react'
import Image from 'next/image'
import { MarketingContainer, Section, SplitHeader, marketingPanelClass, marketingMicroPillClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import { urlFor as urlForImage } from '@/sanity/lib/image';
import { renderTextWithLinks } from '@/lib/linkify'

export type TrainerBioCardVariant = 'compact' | 'extended'

export interface TrainerBioCardData {
  eyebrow?: string
  title?: string
  subtitle?: string
  quote?: string
  description?: string
  extendedDescription?: string
  tags?: string[]
  extendedTags?: string[]
  stats?: Array<{
    value: string
    label: string
  }>
  certificationLink?: string
  fieldExperienceLabel?: string
  fieldExperienceText?: string
  mainImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  overlayImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  overlayImage2?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
}

export interface TrainerBioCardProps {
  data?: TrainerBioCardData
  variant?: TrainerBioCardVariant
}

const DEFAULT_TAGS = [
  'LEAN',
  'TOYOTA TPS',
  'KAIZEN',
  '100+ TEHAST',
  '25A KOGEMUST',
  'JIPM SERTIFITSEERITUD',
]

const DEFAULT_EXTENDED_TAGS = ['AGILE']

const DEFAULT_STATS = [
  { value: '147+', label: 'Lõpetajat' },
  { value: '+31%', label: 'Kesk. OEE kasv' },
  { value: '4.9/5', label: 'Hinnang' },
]

const DEFAULT_EXTENDED_DESCRIPTION =
  'Kogemus hõlmab masina- ja toiduainetööstust, meditsiini- ning logistikasektori ettevõtteid Eestis ja Baltikumis. Metoodikad põhinevad Toyota TPS ja JIPM praktikal — kohandatud Eesti tootmisreaalsusele. Koolitustel seob ta teooria reaalse põranda tööga, et muutused jõuaksid juhtimislaudani kiiremini.'

const DEFAULT_FIELD_EXPERIENCE_TEXT =
  'Praktiline kogemus reaalsest tootmisest, mitte ainult klassiruumi teooria.'

function MainPortrait({ data }: { data?: TrainerBioCardData }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_25px_70px_-30px_rgba(0,0,0,0.65)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-black/35 to-transparent" />
      {data?.mainImage ? (
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={urlForImage(data.mainImage).width(1000).quality(90).url()}
            alt={data.mainImage.alt || 'Your Name'}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative aspect-[4/5] w-full">
          <Image
            src="/placeholder-image.svg"
            alt="Team member"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  )
}

function FactoryThumb({ data, className }: { data?: TrainerBioCardData; className?: string }) {
  return (
    <div className={className}>
      {data?.overlayImage ? (
        <div className="relative aspect-[4/3] h-full min-h-[5rem] w-full">
          <Image
            src={urlForImage(data.overlayImage).width(700).quality(90).url()}
            alt={data.overlayImage.alt || 'Tehase külastus'}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative aspect-[4/3] h-full min-h-[5rem] w-full">
          <Image
            src="/placeholder-image.svg"
            alt="Workplace"
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  )
}

export default function TrainerBioCard({ data, variant = 'compact' }: TrainerBioCardProps) {
  const isExtended = variant === 'extended'

  const baseTags = data?.tags?.length ? data.tags : DEFAULT_TAGS
  const tags = isExtended
    ? Array.from(new Set([...baseTags, ...(data?.extendedTags ?? DEFAULT_EXTENDED_TAGS)])).slice(0, 10)
    : baseTags

  const stats = data?.stats?.length ? data.stats : DEFAULT_STATS

  const fieldLabel = data?.fieldExperienceLabel || 'Field Experience'
  const fieldText = data?.fieldExperienceText || DEFAULT_FIELD_EXPERIENCE_TEXT

  return (
    <Section variant="band">
      <MarketingContainer elevated>
        <div className={`trainer-bio-card ${marketingPanelClass}`}>
          <div className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-6 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

          {/* Mobile-only header at the very top of the card */}
          <SplitHeader
            title={data?.title || 'Your Name'}
            eyebrow={<EyebrowPillBadge text={data?.eyebrow || 'Koolitaja'} />}
            subtitle={data?.subtitle || 'Programmi juht ja peakoolitaja • 25+ aastat tootmises'}
            align="left"
            className="mb-8 lg:hidden"
            headingLevel="div"
          />

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left media */}
            <div className="relative lg:col-span-5">
              <MainPortrait data={data} />

              {isExtended ? (
                <div className={`trainer-bio-experience mt-4 flex gap-3 p-4 backdrop-blur ${marketingMicroPillClass}`}>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                      {fieldLabel}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{fieldText}</p>
                  </div>
                  <FactoryThumb
                    data={data}
                    className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-[var(--border)]/60 shadow-md"
                  />
                </div>
              ) : (
                <>
                  <div className="absolute -bottom-8 -right-3 z-20 w-[46%] overflow-hidden rounded-2xl border-4 border-[var(--bg-primary)] shadow-2xl md:-right-6">
                    <FactoryThumb data={data} className="relative aspect-video w-full" />
                  </div>

                  <div className="trainer-bio-experience relative z-10 mt-14 mr-[40%] rounded-2xl border border-[var(--border)]/70 bg-[rgb(var(--bg-primary))]/65 p-4 backdrop-blur sm:mr-[38%] lg:mr-[34%]">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                      {fieldLabel}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{fieldText}</p>
                  </div>
                </>
              )}
            </div>

            {/* Right content */}
            <div className="lg:col-span-7 lg:pt-2">
              <SplitHeader
                title={data?.title || 'Your Name'}
                eyebrow={<EyebrowPillBadge text={data?.eyebrow || 'Koolitaja'} />}
                subtitle={data?.subtitle || 'Programmi juht ja peakoolitaja • 25+ aastat tootmises'}
                align="left"
                className="hidden lg:flex mb-8"
              />

              <blockquote className="trainer-bio-quote mt-8 rounded-2xl border border-[var(--border)]/70 bg-[rgb(var(--bg-primary))]/65 p-6 backdrop-blur-sm">
                <p className="text-xl italic leading-snug tracking-tight text-[var(--text-primary)] md:text-2xl">
                  {data?.quote ||
                    '"Õpetab seda, mida on ise tehases teinud — ja ka seda, mida tegid Henry Ford sajand tagasi ja Jaapani juhid Toyotas."'}
                </p>
              </blockquote>

              <div className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
                {renderTextWithLinks(data?.description ||
                  'Meie treener ei õpeta lihtsalt teooriat. Õpetab seda, millele tugineb tugev teooria — ehk töötavat praktikat. Jagame kogemust 100+ Eesti tehase põrandalt. Teeme puust ja punaselt ette ja asi saab selgeks.')}
              </div>

              {isExtended ? (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
                  {renderTextWithLinks(data?.extendedDescription || DEFAULT_EXTENDED_DESCRIPTION)}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag, idx) => {
                  const colorStyles = [
                    // Royal Blue
                    {
                      bg: 'bg-blue-500/5 dark:bg-blue-400/5',
                      border: 'border-blue-500/20 hover:border-blue-500/35 dark:border-blue-400/20 dark:hover:border-blue-400/35',
                      text: 'text-blue-700 dark:text-blue-400 dark:hover:text-blue-400 hover:text-blue-900',
                      hoverBg: 'hover:bg-blue-500/10 dark:hover:bg-blue-400/10',
                    },
                    // Emerald Green
                    {
                      bg: 'bg-emerald-500/5 dark:bg-emerald-400/5',
                      border: 'border-emerald-500/20 hover:border-emerald-500/35 dark:border-emerald-400/20 dark:hover:border-emerald-400/35',
                      text: 'text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:text-emerald-900',
                      hoverBg: 'hover:bg-emerald-500/10 dark:hover:bg-emerald-400/10',
                    },
                    // Indigo
                    {
                      bg: 'bg-indigo-500/5 dark:bg-indigo-400/5',
                      border: 'border-indigo-500/20 hover:border-indigo-500/35 dark:border-indigo-400/20 dark:hover:border-indigo-400/35',
                      text: 'text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:text-indigo-900',
                      hoverBg: 'hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10',
                    },
                    // Cyan
                    {
                      bg: 'bg-cyan-500/5 dark:bg-cyan-400/5',
                      border: 'border-cyan-500/20 hover:border-cyan-500/35 dark:border-cyan-400/20 dark:hover:border-cyan-400/35',
                      text: 'text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 hover:text-cyan-900',
                      hoverBg: 'hover:bg-cyan-500/10 dark:hover:bg-cyan-400/10',
                    }
                  ];
                  const style = colorStyles[idx % colorStyles.length];

                  return (
                    <span
                      key={tag}
                      className={`trainer-bio-tag cursor-default rounded-full border px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:shadow-md dark:shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.2)] ${style.bg} ${style.border} ${style.text} ${style.hoverBg}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3">
                {stats.map((stat, index) => (
                  <div
                    key={`${stat.label}-${index}`}
                    className="trainer-bio-stat rounded-2xl transition-all text-center max-md:border-none max-md:bg-transparent max-md:p-0 max-md:shadow-none md:border md:border-[var(--border)]/70 md:bg-[rgb(var(--bg-primary))]/75 md:px-4 md:py-4 hover:-translate-y-0.5 hover:border-blue-400/40"
                  >
                    <span className="trainer-bio-stat-value block bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-xs text-[var(--text-secondary)]">
                Tutvu koolituse vastavusega{' '}
                <a
                  href="/taienduskoolituse-standard"
                  className="trainer-bio-link font-bold text-blue-600 underline decoration-2 underline-offset-4 dark:text-blue-400"
                >
                  täienduskoolituse standardile
                </a>{' '}
                siin.
              </p>
            </div>
          </div>
        </div>
      </MarketingContainer>
    </Section>
  )
}
