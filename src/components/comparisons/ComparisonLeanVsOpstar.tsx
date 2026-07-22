'use client'

import { useCallback, useId, useState } from 'react'
import {
  BrandVibrantButton,
  marketingInsetCardClass,
  marketingMicroPillClass,
} from '@/components/ui'
import {
  resolveLeanVsOpstarData,
  type LeanVsOpstarData,
  type LeanVsOpstarScenario,
} from '@/lib/opstar/leanVsOpstarDefaults'
import { CalendarCheck, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type LeanVsOpstarProps = {
  leanVsOpstarData?: Partial<LeanVsOpstarData> | null
  className?: string
}

function ScenarioTabs({
  scenarios,
  activeIndex,
  onSelect,
  tablistId,
}: {
  scenarios: LeanVsOpstarScenario[]
  activeIndex: number
  onSelect: (index: number) => void
  tablistId: string
}) {
  return (
    <div
      role="tablist"
      aria-label="Valu stsenaariumid"
      id={tablistId}
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {scenarios.map((scenario, index) => {
        const isActive = index === activeIndex
        return (
          <button
            key={`${scenario.criterion}-${index}`}
            type="button"
            role="tab"
            id={`${tablistId}-tab-${index}`}
            aria-selected={isActive}
            aria-controls={`${tablistId}-panel`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(index)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2.5 text-left text-xs font-bold leading-snug transition-all duration-300 sm:px-5 sm:text-sm',
              isActive
                ? 'border-[rgb(var(--color-primary))/0.45] bg-[rgb(var(--color-primary))/0.12] text-[rgb(var(--text-primary))] shadow-[0_12px_28px_-18px_rgb(var(--color-primary)/0.45)]'
                : `${marketingMicroPillClass} text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--color-primary))/0.25] hover:text-[rgb(var(--text-primary))]`,
            )}
          >
            {scenario.criterion}
          </button>
        )
      })}
    </div>
  )
}

function ComparisonColumn({
  variant,
  label,
  body,
  showAdvantage,
}: {
  variant: 'lean' | 'opstar'
  label: string
  body: string
  showAdvantage?: boolean
}) {
  const isOpstar = variant === 'opstar'

  return (
    <article
      className={cn(
        'relative flex min-h-[220px] min-w-[85vw] shrink-0 snap-center flex-col rounded-2xl border p-5 transition-shadow duration-300 sm:min-w-[min(100%,320px)] md:min-h-[260px] md:min-w-0 md:shrink md:snap-align-none md:p-6',
        isOpstar
          ? 'border-[rgb(var(--color-primary))/0.4] bg-[rgb(var(--color-primary))/0.07] shadow-[0_24px_56px_-28px_rgb(var(--color-primary)/0.35)]'
          : 'border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))/0.65]',
      )}
    >
      {isOpstar ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[rgb(var(--color-primary))/0.12] blur-2xl"
        />
      ) : null}

      <div className="mb-4 flex items-center justify-between gap-2">
        <h3
          className={cn(
            'text-[10px] font-black uppercase tracking-[0.2em]',
            isOpstar
              ? 'text-[rgb(var(--color-primary))]'
              : 'text-[rgb(var(--text-secondary))]',
          )}
        >
          {label}
        </h3>
        {isOpstar && showAdvantage ? (
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[rgb(var(--color-accent))]',
              marketingMicroPillClass,
            )}
          >
            <Check className="h-3 w-3 shrink-0" aria-hidden />
            Tugevam lahendus
          </span>
        ) : null}
      </div>

      <p
        className={cn(
          'relative flex-grow text-sm leading-relaxed sm:text-[15px]',
          isOpstar
            ? 'font-semibold text-[rgb(var(--text-primary))]'
            : 'font-medium text-[rgb(var(--text-secondary))]',
        )}
      >
        {body}
      </p>
    </article>
  )
}

function ComparisonPanel({
  scenario,
  tablistId,
  activeIndex,
}: {
  scenario: LeanVsOpstarScenario
  tablistId: string
  activeIndex: number
}) {
  return (
    <div
      role="tabpanel"
      id={`${tablistId}-panel`}
      aria-labelledby={`${tablistId}-tab-${activeIndex}`}
      className="animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <p className="mb-4 text-center text-sm font-medium text-[rgb(var(--text-secondary))] md:mb-6 md:text-base">
        Kuidas see probleem lahendatakse?
      </p>

      {/* Mobile: horizontal swipe between columns */}
      <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2 snap-x snap-mandatory [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 md:px-0 [&::-webkit-scrollbar]:hidden">
        <ComparisonColumn
          variant="lean"
          label="Tavapärane Lean"
          body={scenario.leanValue}
        />
        <ComparisonColumn
          variant="opstar"
          label="OPSTAR PROFIT™"
          body={scenario.opstarValue}
          showAdvantage={scenario.opstarHasAdvantage !== false}
        />
      </div>
    </div>
  )
}

export default function ComparisonLeanVsOpstar({
  leanVsOpstarData,
  className = '',
}: LeanVsOpstarProps) {
  const resolved = resolveLeanVsOpstarData(leanVsOpstarData)
  const { title, eyebrow, subtitle, cta } = resolved
  const scenarios = resolved.comparisonItems
  const [activeIndex, setActiveIndex] = useState(0)
  const tablistId = useId().replace(/:/g, '')

  const safeIndex =
    scenarios.length > 0 ? Math.min(activeIndex, scenarios.length - 1) : 0
  const activeScenario = scenarios[safeIndex] ?? scenarios[0]

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
      <div className="relative z-10 min-w-0">
        <div className="mb-6 text-center sm:mb-8 md:mb-10">
          <span className="mb-1.5 block px-1 text-[9px] font-black uppercase leading-relaxed tracking-[0.28em] text-[rgb(var(--color-primary))] sm:mb-2 sm:text-[10px] sm:tracking-[0.38em]">
            {eyebrow}
          </span>
          <h2 className="mb-2 px-1 text-[clamp(1.35rem,6.5vw,2rem)] font-black leading-[1.08] tracking-tighter text-[rgb(var(--text-primary))] sm:mb-3 sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mx-auto max-w-2xl px-1 text-[13px] font-medium leading-snug text-[rgb(var(--text-secondary))] opacity-90 sm:text-sm md:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="relative mx-auto min-w-0 w-full">
          <div className={cn('relative min-w-0', marketingInsetCardClass)}>
            <div className="space-y-5 p-4 sm:space-y-6 sm:p-6 md:p-8">
              <ScenarioTabs
                scenarios={scenarios}
                activeIndex={safeIndex}
                onSelect={handleSelect}
                tablistId={tablistId}
              />

              {activeScenario ? (
                <ComparisonPanel
                  key={safeIndex}
                  scenario={activeScenario}
                  tablistId={tablistId}
                  activeIndex={safeIndex}
                />
              ) : null}
            </div>

            <div className="relative border-t border-[rgb(var(--border))] bg-[rgb(var(--color-primary))/0.05] px-4 py-5 sm:px-6 sm:py-6 md:flex md:items-center md:justify-between md:gap-6">
              <div className="relative mb-4 min-w-0 text-center md:mb-0 md:text-left">
                <h4 className="mb-1 text-base font-black uppercase italic leading-tight text-[rgb(var(--text-primary))] sm:text-lg md:text-xl">
                  {cta.text}
                </h4>
                <p className="text-[9px] font-black uppercase leading-relaxed tracking-[0.16em] text-[rgb(var(--color-primary))] opacity-90 sm:text-[10px] sm:tracking-[0.18em] md:text-[11px] md:tracking-[0.2em]">
                  {cta.subtitle}
                </p>
              </div>
              <BrandVibrantButton
                href={cta.buttonUrl || '#'}
                icon={CalendarCheck}
                className="h-12 w-full min-w-[160px] rounded-full text-xs font-black uppercase tracking-widest md:h-14 md:w-auto md:min-w-[200px] md:text-sm"
              >
                {cta.buttonText || 'Vaata kava'}
              </BrandVibrantButton>
            </div>
          </div>
        </div>
      </div>
  )
}
