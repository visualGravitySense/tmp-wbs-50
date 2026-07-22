import React from 'react'
import { MarketingContainer, marketingInsetCardClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import GrantSectionClientForm from './GrantSectionClientForm'
import { cn } from '@/lib/utils'

interface GrantSectionData {
  eyebrow?: string
  title?: string
  highlightedTitle?: string
  description?: string
  ctaText?: string
  responseText?: string
}

interface GrantSectionProps {
  data?: GrantSectionData
}

function resolveGrantTitle(data?: GrantSectionData): string {
  const base = data?.title?.trim()
  const highlight = data?.highlightedTitle?.trim()

  if (base && highlight) {
    const baseLower = base.toLowerCase()
    const highlightLower = highlight.toLowerCase()
    if (baseLower.includes(highlightLower)) return base
    return `${base} ${highlight}`.trim()
  }

  return base || highlight || 'Töötukassa hüvitab kuni 80% kuludest'
}

export default function GrantSection({ data }: GrantSectionProps) {
  const eyebrow = data?.eyebrow?.trim() || 'Koolitustoetuse võimalus tööandjale!'
  const title = resolveGrantTitle(data)
  const description =
    data?.description?.trim() ||
    'Kasuta võimalust ja arenda oma meeskonda riigi toel. Aitame dokumentide vormistamisel, et protsess oleks Sinu jaoks võimalikult lihtne.'

  return (
    <MarketingContainer>
      <div
        className={cn(
          marketingInsetCardClass,
          'grant-panel mx-auto max-w-3xl border border-slate-200/70 px-6 py-10 text-center sm:px-10 sm:py-12 dark:border-white/10',
        )}
      >
        <EyebrowPillBadge
          text={eyebrow}
          tone="default"
          className="mx-auto mb-5 sm:mb-6"
        />

        <h2 className="text-balance text-2xl font-black leading-tight tracking-tight text-[rgb(var(--text-primary))] sm:text-3xl md:text-[2rem]">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[rgb(var(--text-secondary))/0.88] sm:text-base md:mt-5">
          {description}
        </p>

        <GrantSectionClientForm
          ctaText={data?.ctaText}
          responseText={data?.responseText}
          align="center"
          className="mt-7 sm:mt-8"
        />
      </div>
    </MarketingContainer>
  )
}