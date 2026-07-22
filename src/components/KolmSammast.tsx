import { MarketingContainer, Section, marketingInsetCardClass } from '@/components/ui'
import { PortableText } from '@portabletext/react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { Cog, Network, Users } from 'lucide-react'

interface Step {
  stepNumber: number
  title: string
  description: any[] // Portable text array
  icon?: string
}

interface KolmSammastProps {
  kolmSammastData: {
    title: string
    eyebrow?: string
    subtitle?: string
    steps: Step[]
  }
  className?: string
}

export default function KolmSammast({ 
  kolmSammastData, 
  className = '' 
}: KolmSammastProps) {
  const { title, eyebrow, subtitle, steps = [] } = kolmSammastData

  const getStepIconKey = (titleText?: string) => {
    const normalized = (titleText || '').toLowerCase()
    if (normalized.includes('operatiiv')) return 'operatiiv'
    if (normalized.includes('süsteem') || normalized.includes('susteem')) return 'susteem'
    if (normalized.includes('areng')) return 'areng'
    return 'fallback'
  }

  const renderStepIcon = (titleText?: string, fallbackIcon?: string) => {
    const iconKey = getStepIconKey(titleText)

    switch (iconKey) {
      case 'operatiiv':
        return <Cog className="h-8 w-8 text-indigo-500 dark:text-indigo-400" strokeWidth={2.2} />
      case 'susteem':
        return <Network className="h-8 w-8 text-blue-500 dark:text-blue-400" strokeWidth={2.2} />
      case 'areng':
        return <Users className="h-8 w-8 text-violet-600 dark:text-violet-400" strokeWidth={2.2} />
      default:
        return <span>{fallbackIcon || '✦'}</span>
    }
  }

  const cardClass = `${marketingInsetCardClass} group shrink-0 snap-center pt-14 transition-all duration-500 hover:border-blue-300/70 dark:hover:border-blue-500/30 md:snap-normal md:min-w-0 md:w-auto md:pt-16`

  return (
    <Section variant="band" className={className}>
      {/* Background Decor */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-5">
        <div className="absolute left-1/2 top-20 h-[300px] w-[min(1000px,200vw)] -translate-x-1/2 rounded-full bg-blue-500 blur-[120px]" />
      </div>

      <MarketingContainer elevated>
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-24">
          {eyebrow && (
            <EyebrowPillBadge 
              text={eyebrow} 
              centered 
              wrapperClassName="mb-6"
            />
          )}
          <h2 className="mb-4 text-3xl font-black leading-[0.92] tracking-tighter text-[rgb(var(--text-primary))] md:mb-6 md:text-5xl lg:text-6xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-sm font-bold uppercase tracking-eyebrow text-blue-700 opacity-90 dark:text-blue-400 dark:opacity-80 sm:text-base md:text-lg md:tracking-[0.3em]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Mobile: one row + horizontal swipe; md+: 3-column grid */}
        <div className="relative mx-auto w-full">
          <div
            className="-mx-4 flex touch-auto gap-3 overflow-x-auto overscroll-x-contain px-4 pb-4 pt-1 snap-x snap-mandatory scroll-pl-4 scroll-pr-4 [scrollbar-width:none] sm:-mx-6 sm:gap-4 sm:px-6 sm:scroll-pl-6 sm:scroll-pr-6 md:mx-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0 md:pt-0 md:snap-none [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${cardClass} w-[min(88vw,360px)] md:w-auto`}
              >
                {/* Massive Step Number Background */}
                <div className="pointer-events-none absolute right-4 top-3 text-7xl font-black italic text-slate-200/80 transition-colors duration-500 group-hover:text-blue-500/25 dark:text-white/[0.03] dark:group-hover:text-blue-500/[0.08] md:right-8 md:top-4 md:text-8xl">
                  0{step.stepNumber}
                </div>

                {/* Step Marker */}
                <div className="absolute left-8 top-0 h-10 w-px bg-gradient-to-b from-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)] md:left-10 md:h-12" />

                {/* Icon */}
                {(step.icon || getStepIconKey(step.title) !== 'fallback') && (
                  <div className="relative mb-6 text-3xl md:mb-8 md:text-4xl">
                    <span className="relative z-10 inline-block transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      {renderStepIcon(step.title, step.icon)}
                    </span>
                    <div className="absolute inset-0 scale-0 rounded-full bg-blue-500/20 blur-2xl transition-transform duration-500 group-hover:scale-100" />
                  </div>
                )}

                {/* Title */}
                <div className="mb-4 text-xl font-black uppercase italic leading-tight tracking-tight text-[rgb(var(--text-primary))] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 md:mb-6 md:text-2xl">
                  {step.title}
                </div>

                {/* Description */}
                <div className="prose prose-sm prose-slate max-w-none text-[rgb(var(--text-secondary))] leading-relaxed opacity-80 transition-opacity group-hover:opacity-100 dark:prose-invert dark:opacity-70">
                  <PortableText value={step.description} />
                </div>

                {/* Bottom Decorative Element */}
                <div className="mt-6 flex items-center gap-2 opacity-20 transition-all duration-500 group-hover:opacity-100 md:mt-8">
                  <div className="h-px w-8 bg-blue-500" />
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Hint: more cards — fades on md+ */}
          <div
            className="pointer-events-none absolute inset-y-4 right-0 z-[1] w-10 bg-gradient-to-l from-[rgb(var(--bg-primary))] to-transparent md:hidden"
            aria-hidden
          />
        </div>

        {/* Connective Line (Visual Only) */}
        <div className="pointer-events-none absolute left-0 top-[60%] -z-10 hidden h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-white/5 lg:block" />
      </MarketingContainer>
    </Section>
  )
}