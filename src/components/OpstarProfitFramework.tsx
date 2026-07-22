import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import {
  BrandVibrantButton,
  MarketingContainer,
  Section,
  marketingInsetCardClass,
} from '@/components/ui'
import {
  resolveOpstarFrameworkData,
  type OpstarFrameworkData,
  type OpstarFrameworkPart,
} from '@/lib/opstar/frameworkDefaults'
import { ArrowRight } from 'lucide-react'

type OpstarProfitFrameworkProps = {
  frameworkData?: OpstarFrameworkData | null
  className?: string
}

function codeSizeClass(code: string) {
  if (code.length >= 5) {
    return 'text-[clamp(1.35rem,4vw,1.85rem)]'
  }
  return 'text-[clamp(1.65rem,5vw,2.1rem)]'
}

function normalizeCtaHref(href?: string): string {
  const trimmed = href?.trim()
  return trimmed || '#'
}

function FrameworkCard({ part, index }: { part: OpstarFrameworkPart; index: number }) {
  const ctaHref = normalizeCtaHref(part.ctaHref)

  return (
    <article
      className={`group relative flex h-full min-w-0 flex-col overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(var(--color-primary))/0.35] sm:p-7 ${marketingInsetCardClass}`}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[rgb(var(--color-primary))/0.08] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-4 flex items-start gap-3">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))] text-xs font-black text-[rgb(var(--color-primary))]"
        >
          {index + 1}
        </span>
        <div className="min-w-0">
          <p
            className={`font-black leading-none tracking-tight text-[rgb(var(--color-primary))] ${codeSizeClass(part.code)}`}
          >
            {part.code}
          </p>
          <h3 className="mt-1.5 text-base font-bold leading-snug text-[rgb(var(--text-primary))] sm:text-lg">
            {part.fullTitle}
          </h3>
        </div>
      </div>

      <p className="mb-4 flex-grow text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
        {part.explanation}
      </p>

      <blockquote className="mb-5 border-l-2 border-[rgb(var(--color-primary))/0.35] pl-3 text-sm italic leading-relaxed text-[rgb(var(--text-primary))]/85">
        &ldquo;{part.painQuote}&rdquo;
      </blockquote>

      <BrandVibrantButton
        href={ctaHref}
        variant="marketing"
        className="mt-auto w-full sm:w-auto"
        icon={ArrowRight}
      >
        {part.ctaText}
      </BrandVibrantButton>
    </article>
  )
}

export default function OpstarProfitFramework({
  frameworkData,
  className = '',
}: OpstarProfitFrameworkProps) {
  const { eyebrow, title, subtitle, parts } = resolveOpstarFrameworkData(frameworkData)

  return (
    <Section variant="band" className={className}>
      <div className="pointer-events-none absolute left-[10%] top-0 h-72 w-72 rounded-full bg-[rgb(var(--color-primary))/0.08] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-[8%] h-64 w-64 rounded-full bg-[rgb(var(--color-accent))/0.06] blur-[90px]" />

      <MarketingContainer elevated>
        <div className="mb-10 text-center md:mb-14">
          <EyebrowPillBadge text={eyebrow} showDots className="mx-auto" />
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight text-[rgb(var(--text-primary))] md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[rgb(var(--text-secondary))] sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {(Array.isArray(parts) ? parts : []).map((part, index) => (
            <FrameworkCard
              key={part?.code ? `${part.code}-${index}` : `framework-part-${index}`}
              part={part}
              index={index}
            />
          ))}
        </div>
      </MarketingContainer>
    </Section>
  )
}
