'use client'

import { useState } from 'react'
import { MarketingContainer, Section, marketingMicroPillClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import OpstarProfit8ComponentDetailPanel, {
  type EightComponentItem,
} from '@/components/OpstarProfit8ComponentDetailPanel'

interface OpstarProfit8ComponentsProps {
  componentsData: {
    title: string
    eyebrow: string
    subtitle?: string
    components: EightComponentItem[]
  }
  className?: string
}

export default function OpstarProfit8Components({ 
  componentsData, 
  className = '' 
}: OpstarProfit8ComponentsProps) {
  const [activeComponent, setActiveComponent] = useState<number>(0)

  const { title, eyebrow, subtitle, components = [] } = componentsData
  const activeComp = components[activeComponent]

  return (
    <Section variant="band" className={className} id="komponendid">
      {/* Background Decor */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[min(420px,70vw)] w-[min(420px,70vw)] rounded-full bg-blue-600/5 blur-[100px]" />

      <MarketingContainer elevated>
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12">
          {eyebrow && (
            <EyebrowPillBadge 
              text={eyebrow} 
              centered 
              wrapperClassName="mb-4"
            />
          )}
          <h2 className="mb-3 text-3xl font-black leading-[1.05] tracking-tighter text-[rgb(var(--text-primary))] sm:mb-4 sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-sm font-medium text-[rgb(var(--text-secondary))] opacity-75 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* Tab Selection */}
        <div className="mb-6 flex gap-2 overflow-x-auto overscroll-x-contain pb-2 snap-x snap-mandatory scroll-pl-1 scroll-pr-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 md:snap-none lg:grid-cols-8">
          {components.map((component, index) => (
            <button
              key={index}
              onClick={() => setActiveComponent(index)}
              className={`group relative min-w-[7.5rem] shrink-0 snap-start overflow-hidden p-2.5 text-left transition-all duration-300 sm:min-w-0 sm:p-3 md:p-3.5 ${
                activeComponent === index
                  ? 'z-10 rounded-xl border border-blue-400 bg-blue-600 shadow-[0_8px_24px_rgba(37,99,235,0.28)] md:scale-105'
                  : `${marketingMicroPillClass} hover:border-slate-300 dark:hover:border-white/20`
              }`}
            >
              <div
                className={`mb-1 text-[9px] font-black transition-colors sm:mb-1.5 sm:text-[10px] ${
                  activeComponent === index ? 'text-blue-100' : 'text-blue-600 dark:text-blue-500'
                }`}
              >
                0{component.number}
              </div>
              <div
                className={`text-[10px] font-bold uppercase leading-snug tracking-tight transition-colors sm:text-[11px] ${
                  activeComponent === index ? 'text-white' : 'text-slate-700 dark:text-gray-400'
                }`}
              >
                {component.title}
              </div>

              {/* Dynamic light bar for active tab */}
              {activeComponent === index && (
                <div className="absolute bottom-0 left-0 h-1 w-full bg-white/40 shadow-[0_-2px_10px_rgba(255,255,255,0.5)]" />
              )}
            </button>
          ))}
        </div>

        {activeComp && <OpstarProfit8ComponentDetailPanel active={activeComp} />}
      </MarketingContainer>
    </Section>
  )
}