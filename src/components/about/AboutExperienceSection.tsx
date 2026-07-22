'use client'

import { useState } from 'react'
import { ChevronDown, Star } from 'lucide-react'
import ExperienceStatsGrid from '@/components/about/ExperienceStatsGrid'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { GradientStatValue } from '@/components/GradientStatValue'
import { MarketingContainer, Section, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { ExperienceItem, ExperienceSection } from '@/types/about'

/** Milestones shown before progressive disclosure kicks in */
const INITIAL_VISIBLE_COUNT = 4

type Props = {
  experienceSection: ExperienceSection
}

const EXPERIENCE_STATS_DEFAULT = [
  { value: '20+', label: 'Aastat' },
  { value: '100+', label: 'Klienti' },
  { value: '50+', label: 'Koolitust' },
  { value: '4', label: 'Valdkonda' },
]

export default function AboutExperienceSection({ experienceSection }: Props) {
  const [expanded, setExpanded] = useState(false)

  const experienceSectionStats =
    experienceSection.stats?.filter((s) => s.value?.trim() && s.label?.trim()) ??
    []
  const resolvedExperienceStats =
    experienceSectionStats.length > 0 ? experienceSectionStats : EXPERIENCE_STATS_DEFAULT

  const showStatistics = experienceSection.showStatistics === true

  const experienceItems = experienceSection.experienceItems ?? []
  const indexedExperienceItems = experienceItems.map((item, index) => ({ item, index }))
  const hasMoreMilestones = experienceItems.length > INITIAL_VISIBLE_COUNT
  const displayedIndexedItems = expanded
    ? indexedExperienceItems
    : indexedExperienceItems.slice(0, INITIAL_VISIBLE_COUNT)
  const hiddenMilestoneCount = Math.max(0, experienceItems.length - INITIAL_VISIBLE_COUNT)

  const isSplitExperienceLayout = experienceSection.layoutVariant === 'split'
  const splitPivot = Math.ceil(displayedIndexedItems.length / 2)
  const leftExperienceItems = displayedIndexedItems.slice(0, splitPivot)
  const rightExperienceItems = displayedIndexedItems.slice(splitPivot)

  const factsItems = experienceSection.factsItems ?? []
  const DEFAULT_FACTS = [
    { text: 'Toyota', colorTheme: 'blue' as const },
    { text: '147+', colorTheme: 'purple' as const },
    { text: 'Esimene', colorTheme: 'green' as const },
  ]
  const resolvedFactsItems = factsItems.length > 0 ? factsItems : DEFAULT_FACTS

  const renderTimelineColumn = (
    entries: Array<{ item: ExperienceItem; index: number }>,
    options?: { compact?: boolean }
  ) => (
    <div className="relative">
      <div className="absolute bottom-0 left-[11px] top-2 w-[2px] bg-gradient-to-b from-blue-600/35 via-blue-600/55 to-blue-500/90 dark:from-blue-500/25 dark:via-blue-500/45 dark:to-blue-400/70" />

      <div className={options?.compact ? 'space-y-8' : 'space-y-12'}>
        {entries.map(({ item, index }) => {
          const total = experienceItems.length
          const progress = total > 1 ? index / (total - 1) : 1
          const dotGlow = 0.12 + progress * 0.42

          return (
            <div key={`${item.title}-${index}`} className="group relative flex items-start">
              <div
                className={`absolute left-0 z-10 h-6 w-6 rounded-full border-4 border-[rgb(var(--bg-primary))] shadow-xl transition-transform duration-300 group-hover:scale-125 ${
                  item.color === 'blue'
                    ? 'bg-blue-500'
                    : item.color === 'green'
                      ? 'bg-emerald-500'
                      : item.color === 'purple'
                        ? 'bg-purple-500'
                        : item.color === 'orange'
                          ? 'bg-orange-500'
                          : 'bg-gray-500'
                }`}
                style={{
                  boxShadow: `0 0 ${10 + progress * 18}px ${3 + progress * 8}px rgba(59, 130, 246, ${dotGlow})`,
                }}
              />

              <div className="ml-12 w-full">
                <div
                  className={`relative overflow-hidden transition-all duration-500 group-hover:translate-x-2 !p-0 ${marketingInsetCardClass}`}
                >
                  <div className={`relative z-10 ${options?.compact ? '!p-5' : '!p-6'}`}>
                    {item.year ? (
                      <span
                        className={`mb-3 inline-block px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${marketingMicroPillClass}`}
                      >
                        {item.year}
                      </span>
                    ) : null}

                    <div className="mb-3 text-xl font-black italic uppercase tracking-tight text-[rgb(var(--text-primary))]">
                      {item.title}
                    </div>

                    <p className="text-base font-medium leading-relaxed text-[rgb(var(--text-secondary))] opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const timelineFadeOverlay =
    !expanded && hasMoreMilestones ? (
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-[rgb(var(--bg-primary))] via-[rgb(var(--bg-primary))]/90 to-transparent"
        aria-hidden
      />
    ) : null

  const showMoreToggle = hasMoreMilestones ? (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-primary))]/80 px-6 py-3',
          'text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600 shadow-sm transition-all duration-300',
          'hover:-translate-y-0.5 hover:border-blue-300/60 hover:shadow-md',
          'dark:text-blue-400 dark:hover:border-blue-500/40',
        )}
      >
        {expanded
          ? 'Näita vähem'
          : `Näita rohkem${hiddenMilestoneCount > 0 ? ` (+${hiddenMilestoneCount})` : ''}`}
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 transition-transform duration-300', expanded && 'rotate-180')}
          aria-hidden
        />
      </button>
    </div>
  ) : null

  return (
    <Section variant="band" className="relative overflow-hidden transition-colors duration-500">
      <div className="absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />

      <MarketingContainer elevated className="relative z-10">
        <div className="mx-auto w-full">
          <div className="mb-20 text-center">
            <div className="relative z-10 mb-6 flex justify-center">
              <EyebrowPillBadge
                text={experienceSection.eyebrow?.trim() || 'Areng läbi aastate'}
              />
            </div>
            <h2 className="mb-6 text-4xl font-black leading-none tracking-tighter text-[rgb(var(--text-primary))] md:text-6xl">
              {experienceSection.title}
            </h2>
            {experienceSection.subtitle ? (
              <p className="mx-auto max-w-2xl text-xl font-medium text-[rgb(var(--text-secondary))] opacity-80">
                {experienceSection.subtitle}
              </p>
            ) : null}
          </div>

          {experienceItems.length > 0 ? (
            <>
              {!isSplitExperienceLayout ? (
                <>
                <div className={showStatistics ? "grid items-start gap-16 lg:grid-cols-12" : "mx-auto w-full max-w-4xl"}>
                  <div className={showStatistics ? "relative lg:col-span-7" : "relative"}>
                    {timelineFadeOverlay}
                    {renderTimelineColumn(displayedIndexedItems)}
                  </div>

                  {showStatistics && (
                    <div className="space-y-8 lg:col-span-5 lg:sticky lg:top-32">
                    <div className={`relative overflow-hidden !p-8 ${marketingInsetCardClass}`}>
                      <div className="pointer-events-none absolute right-0 top-0 p-6 opacity-20">
                      <Star className="text-6xl h-16 w-16 text-slate-300 dark:text-slate-600" />
                      </div>
                      <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        {experienceSection.factsEyebrow?.trim() || 'PÕHIALUSED'}
                      </h4>
                      <p className="font-medium leading-relaxed text-slate-700 dark:text-slate-300 relative z-10">
                        {experienceSection.factsDescription?.trim() ||
                          'Aastakümnete pikkune kogemus mitmes valdkonnas on andnud mulle sügavaima teadmise ja praktiliste oskuste kogumi.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {resolvedFactsItems.map((item, index) => (
                          <div
                            key={index}
                            className={`group flex items-center justify-center px-4 py-3 text-center text-sm font-semibold text-[rgb(var(--text-primary))] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] ${marketingMicroPillClass}`}
                          >
                            {item.text}
                          </div>
                      ))}
                    </div>

                    <div className={`!p-8 ${marketingInsetCardClass}`}>
                      <h4 className="mb-8 text-center text-[10px] font-black uppercase tracking-[0.3em] text-[rgb(var(--text-secondary))]">
                        {experienceSection.statsTitle?.trim() || 'Oluline statistika'}
                      </h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                        {resolvedExperienceStats.map((stat, i) => (
                          <div key={i} className={`px-3 py-4 text-center ${marketingMicroPillClass}`}>
                            <GradientStatValue value={stat.value} className="mb-1" />
                            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600/90 dark:text-blue-400/80">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  )}
                </div>
                {showMoreToggle}
                </>
              ) : (
                <div className="space-y-12">
                  <div className="relative">
                    {timelineFadeOverlay}
                    <div className="grid items-start gap-8 lg:grid-cols-2">
                      <div>{renderTimelineColumn(leftExperienceItems, { compact: true })}</div>
                      <div>{renderTimelineColumn(rightExperienceItems, { compact: true })}</div>
                    </div>
                  </div>
                  {showMoreToggle}

                  <div className={`grid items-start gap-6 ${showStatistics ? 'lg:grid-cols-2' : 'mx-auto w-full max-w-4xl'}`}>
                    <div className={`relative overflow-hidden !p-8 ${marketingInsetCardClass}`}>
                      <div className="pointer-events-none absolute right-0 top-0 p-6 opacity-20">
                        <Star className="text-6xl h-16 w-16 text-slate-300 dark:text-slate-600" />
                      </div>
                      <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        {experienceSection.factsEyebrow?.trim() || 'PÕHIALUSED'}
                      </h4>
                      <p className="font-medium leading-relaxed text-slate-700 dark:text-slate-300 relative z-10">
                        {experienceSection.factsDescription?.trim() ||
                          'Aastakümnete pikkune kogemus mitmes valdkonnas on andnud mulle sügavaima teadmise ja praktiliste oskuste kogumi.'}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {resolvedFactsItems.map((item, index) => (
                            <div
                              key={index}
                              className={`group flex items-center justify-center px-4 py-2.5 text-center text-sm font-semibold text-[rgb(var(--text-primary))] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] ${marketingMicroPillClass}`}
                            >
                              {item.text}
                            </div>
                        ))}
                      </div>
                    </div>

                    {showStatistics && (
                      <div className={`h-fit !p-8 ${marketingInsetCardClass}`}>
                        <h4 className="mb-8 text-center text-[10px] font-black uppercase tracking-[0.3em] text-[rgb(var(--text-secondary))]">
                          {experienceSection.statsTitle?.trim() || 'Oluline statistika'}
                        </h4>
                        <ExperienceStatsGrid stats={resolvedExperienceStats} className="gap-y-8" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </MarketingContainer>
    </Section>
  )
}
