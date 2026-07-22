'use client'

import { useEffect, useRef, useState } from 'react'
import {
  marketingInsetCardClass,
  marketingMicroPillClass,
  SplitHeader,
  EyebrowPillBadge,
} from '@/components/ui'
import type { ChallengesSectionContent } from '@/types/mainPageSections'

export type PainPointsRolesProps = {
  challenges?: ChallengesSectionContent
  title?: string
  scriptTitle?: string
}

export default function PainPointsRoles({ challenges, title, scriptTitle }: PainPointsRolesProps) {
  const challengesGridRef = useRef<HTMLDivElement | null>(null)
  const [isChallengesVisible, setIsChallengesVisible] = useState(false)

  useEffect(() => {
    const gridElement = challengesGridRef.current
    if (!gridElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsChallengesVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(gridElement)

    return () => observer.disconnect()
  }, [challenges])

  if (!challenges) return null

  return (
    <>
      <SplitHeader
        title={challenges.title || title || 'Oled juht, spetsialist või lihtsalt kollektiivi liige - väljakutse on sarnane, aga valu erinev'}
        scriptTitle={challenges.scriptTitle || scriptTitle}
        eyebrow={<EyebrowPillBadge text={challenges.eyebrow || 'Väljakutsed'} />}
        subtitle={challenges.subheading || 'Väljakutse võib paista erinev, aga juurpõhjus on tihti sama. Vali roll, millega enim samastud.'}
        align="center"
        className="mb-10 sm:mb-14 md:mb-20"
      />

      <div
        ref={challengesGridRef}
        className="relative mb-14 -mx-4 flex touch-auto gap-4 overflow-x-auto overscroll-x-contain px-4 pb-6 pt-1 snap-x snap-mandatory scroll-pl-4 scroll-pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 md:mx-0 md:mb-16 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 md:pt-0 md:snap-none"
      >
        {[
          {
            title: challenges.managerTitle || 'Juhile',
            items: challenges.managerChallenges || [
              'Tulekahjud',
              'Kulud kõrged',
              'Head tootmisjuhti ei leia',
              'Värbamisaeg pikk',
              'Kandidaat sees, aga vaja arendada',
            ],
            dot: 'bg-blue-500 shadow-blue-200/60',
            badge: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/70',
            borderHover: 'hover:border-blue-300/70',
          },
          {
            title: challenges.participantTitle || 'Osalejale',
            items: challenges.participantChallenges || [
              'Tellimused muutuvad',
              'Töötajad ei tule muutusega kaasa',
              'Tahaks ettevõttes areneda, aga enesekindlust juhtimises puudu',
            ],
            dot: 'bg-orange-500 shadow-orange-200/60',
            badge: 'bg-orange-500/10 text-orange-700 border-orange-200/70',
            borderHover: 'hover:border-orange-300/70',
          },
          {
            title: challenges.collectiveTitle || 'Kollektiiv',
            items: challenges.collectiveChallenges || [
              'Tööde plaani pole',
              'Juhid ei kuula või ei kaasa',
              'Juht ei juhi',
              'Juht justkui ei usalda',
            ],
            dot: 'bg-purple-500 shadow-purple-200/60',
            badge: 'bg-purple-500/10 text-purple-700 border-purple-200/70',
            borderHover: 'hover:border-purple-300/70',
          },
        ].map((column, colIdx) => (
          <div
            key={column.title}
            className={`challenges-card challenges-col-${colIdx + 1} group ${marketingInsetCardClass} p-7 shrink-0 w-[min(85vw,340px)] md:w-auto snap-center snap-always transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-xl motion-reduce:translate-y-0 motion-reduce:transform-none motion-reduce:opacity-100 ${column.borderHover} ${
              isChallengesVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{
              transitionDelay: isChallengesVisible ? `${colIdx * 120}ms` : '0ms',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-xl font-black tracking-tight text-[var(--text-primary)] md:text-2xl">
                {column.title}
              </div>
              <span
                className={`challenges-badge inline-flex px-2.5 py-1 text-xs font-semibold ${marketingMicroPillClass} ${column.badge}`}
              >
                0{colIdx + 1}
              </span>
            </div>

            <ul className="mt-6 space-y-4">
              {column.items.map((item: string, i: number) => (
                <li key={`${column.title}-${i}`} className="flex items-start gap-3.5">
                  <span className={`challenges-dot mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full shadow-sm ${column.dot}`} />
                  <span className="text-[15px] font-medium leading-snug text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative mt-12 flex justify-center text-center">
        {/* Subtle colorful backglow to enhance backdrop-blur glassmorphism */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-36 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/25 via-indigo-500/20 to-emerald-500/25 blur-3xl opacity-90 dark:from-blue-500/15 dark:via-purple-500/8 dark:to-emerald-500/12" />

        {/* Double-bordered elegant glassmorphic capsule container */}
        <div className="group relative mx-auto w-full max-w-2xl rounded-2xl p-[1.5px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(59,130,246,0.18)] sm:rounded-full sm:hover:scale-[1.02]">
          {/* Outer border refraction layer: bright top-left, fading bottom-right */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/90 via-white/40 to-white/10 p-[1.5px] dark:from-white/30 dark:via-white/10 dark:to-white/5 sm:rounded-full" />
          
          {/* Main glass capsule */}
          <div className="relative overflow-hidden flex items-center justify-center rounded-2xl border border-white/60 bg-white/40 px-5 py-4 shadow-[inset_0_3px_5px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.03),0_16px_36px_rgba(0,0,0,0.05)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-[inset_0_2px_3px_rgba(255,255,255,0.25),inset_0_-1px_2px_rgba(0,0,0,0.4),0_16px_36px_rgba(0,0,0,0.35)] sm:rounded-full sm:px-8 sm:py-5 md:px-16 md:py-6">
            
            {/* Diagonal specular glare layer for absolute physical realism */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/5 dark:via-white/5 dark:to-transparent pointer-events-none" />
            
            {/* Glossy highlight line */}
            <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent blur-[0.5px] dark:via-white/40" />

            {/* Inner ambient ring for premium double-layered depth */}
            <div className="absolute inset-1.5 rounded-full border border-white/40 pointer-events-none dark:border-white/5" />

            {/* Ultra-premium typography with balanced tracking and editorial feel */}
            <span className="relative text-balance break-words px-1 text-base font-black tracking-tight text-slate-900/90 dark:text-white sm:text-lg md:text-2xl font-sans drop-shadow-[0_1px_1.5px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.6)]">
              {challenges.conclusion || 'Neid väljakutseid ma aitangi lahendada!'}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
