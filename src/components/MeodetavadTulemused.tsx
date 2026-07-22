import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { MarketingContainer, Section, marketingInsetCardClass } from '@/components/ui'

interface Result {
  value: string
  valueColor: string
  label: string
  description: string
}

/** Big-number typography + matching orb / progress bar from Sanity `valueColor` hint or card index. */
const VALUE_ACCENTS = [
  {
    value:
      'text-indigo-600 drop-shadow-[0_10px_28px_rgba(79,70,229,0.26)] dark:text-indigo-400 dark:drop-shadow-[0_10px_26px_rgba(129,140,248,0.22)]',
    orb: 'bg-indigo-500/12 blur-3xl group-hover:bg-indigo-500/22 dark:bg-indigo-500/14 dark:group-hover:bg-indigo-500/26',
    bar: 'bg-indigo-600 dark:bg-indigo-500',
    labelHover: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
  },
  {
    value:
      'text-teal-600 drop-shadow-[0_10px_28px_rgba(13,148,136,0.26)] dark:text-teal-400 dark:drop-shadow-[0_10px_26px_rgba(45,212,191,0.2)]',
    orb: 'bg-teal-500/12 blur-3xl group-hover:bg-teal-500/22 dark:bg-teal-500/14 dark:group-hover:bg-teal-500/26',
    bar: 'bg-teal-600 dark:bg-teal-500',
    labelHover: 'group-hover:text-teal-600 dark:group-hover:text-teal-400',
  },
  {
    value:
      'text-amber-600 drop-shadow-[0_10px_28px_rgba(217,119,6,0.22)] dark:text-amber-400 dark:drop-shadow-[0_10px_26px_rgba(251,191,36,0.18)]',
    orb: 'bg-amber-500/12 blur-3xl group-hover:bg-amber-500/22 dark:bg-amber-500/14 dark:group-hover:bg-amber-500/26',
    bar: 'bg-amber-600 dark:bg-amber-500',
    labelHover: 'group-hover:text-amber-700 dark:group-hover:text-amber-400',
  },
] as const

const EMERALD_ACCENT = {
  value:
    'text-emerald-600 drop-shadow-[0_8px_20px_rgba(5,150,105,0.2)] dark:text-emerald-400 dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]',
  orb: 'bg-emerald-500/12 blur-3xl group-hover:bg-emerald-500/22 dark:bg-emerald-500/14 dark:group-hover:bg-emerald-500/26',
  bar: 'bg-emerald-600 dark:bg-emerald-500',
  labelHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
} as const

const ROSE_ACCENT = {
  value:
    'text-rose-600 drop-shadow-[0_10px_26px_rgba(225,29,72,0.18)] dark:text-rose-400 dark:drop-shadow-[0_10px_24px_rgba(251,113,133,0.18)]',
  orb: 'bg-rose-500/12 blur-3xl group-hover:bg-rose-500/22 dark:bg-rose-500/14 dark:group-hover:bg-rose-500/26',
  bar: 'bg-rose-600 dark:bg-rose-500',
  labelHover: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
} as const

function accentForCard(index: number, valueColor: string | undefined) {
  const s = (valueColor || '').toLowerCase()
  if (s.includes('emerald') || s.includes('green')) return EMERALD_ACCENT
  if (s.includes('rose') || s.includes('pink')) return ROSE_ACCENT
  if (s.includes('amber') || s.includes('orange') || s.includes('gold')) return VALUE_ACCENTS[2]
  if (s.includes('teal') || s.includes('cyan')) return VALUE_ACCENTS[1]
  if (s.includes('indigo') || s.includes('violet') || s.includes('purple')) return VALUE_ACCENTS[0]
  /** Legacy / generic "blue" in CMS → rotate presets so cards aren’t all the same. */
  return VALUE_ACCENTS[index % VALUE_ACCENTS.length]
}

interface MeodetavadTulemusedProps {
  tulemusedData: {
    title: string
    eyebrow: string
    subtitle?: string
    results: Result[]
    source: string
  }
  className?: string
}

export default function MeodetavadTulemused({ 
  tulemusedData, 
  className = '' 
}: MeodetavadTulemusedProps) {
  const {
    title,
    eyebrow,
    subtitle,
    results = [],
    source
  } = tulemusedData

  return (
    <Section variant="band" className={className} id="tulemused">
      {/* Экстремальный фон: Сетка и световые пятна */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle,rgb(15_23_42/0.11)_1px,transparent_1px)] [background-size:40px_40px] dark:opacity-[0.035] dark:[background-image:radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)]"
        aria-hidden
      />
      
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      <MarketingContainer elevated>
        {/* Header */}
        <div className="mb-10 text-center sm:mb-14 md:mb-20">
          {eyebrow && (
            <EyebrowPillBadge 
              text={eyebrow} 
              centered 
              wrapperClassName="mb-6"
            />
          )}
          <h2 className="mb-6 text-3xl font-black leading-none tracking-tighter text-[rgb(var(--text-primary))] sm:mb-8 sm:text-4xl md:text-7xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-[rgb(var(--text-secondary))] text-center max-w-3xl mx-auto font-medium opacity-70">
              {subtitle}
            </p>
          )}
        </div>

        {/* Results Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-6 md:grid md:grid-cols-3 md:gap-8 mb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-md:-mx-4 max-md:px-4">
          {results.map((result, index) => {
            const accent = accentForCard(index, result.valueColor)
            return (
            <div
              key={index}
              className={`max-md:w-[85vw] max-md:shrink-0 max-md:snap-center group relative overflow-hidden !p-6 transition-all duration-700 hover:border-slate-300/80 dark:hover:border-white/15 sm:!p-8 md:!p-10 ${marketingInsetCardClass}`}
            >
              {/* Фоновое свечение внутри карточки */}
              <div className={`absolute -bottom-10 -right-10 h-32 w-32 transition-all duration-700 ${accent.orb}`} />
              
              {/* Value - Kinetic */}
              <div
                className={`mb-6 text-6xl italic tracking-tighter transition-transform duration-700 group-hover:-translate-y-2 md:text-7xl ${accent.value}`}
              >
                <span className="inline-block">{result.value}</span>
              </div>

              {/* Label */}
              <div className={`mb-4 text-xl font-black uppercase italic tracking-tight text-[rgb(var(--text-primary))] transition-colors ${accent.labelHover}`}>
                {result.label}
              </div>

              {/* Description */}
              <div className="text-[rgb(var(--text-secondary))] text-sm leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                {result.description}
              </div>

              {/* Индикатор прогресса внизу карточки */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-200/90 dark:bg-white/5">
                <div className={`h-full w-0 transition-all duration-1000 ease-out group-hover:w-full ${accent.bar}`} />
              </div>
            </div>
            )
          })}
        </div>

        {source && (
          <div className="flex justify-center px-2">
            <EyebrowPillBadge
              className="max-w-full justify-center sm:max-w-3xl"
              text={`Source: ${source}`}
              showDots
            />
          </div>
        )}
      </MarketingContainer>
    </Section>
  )
}