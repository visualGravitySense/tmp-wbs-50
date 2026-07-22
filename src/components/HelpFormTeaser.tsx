'use client'

import React, { useState } from 'react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { BarChart3 } from 'lucide-react'
import ProductionAuditQuiz from '@/components/ProductionAuditQuiz'
import {
  BrandVibrantButton,
  MarketingContainer,
  marketingPanelCompactClass,
} from '@/components/ui'
import { urlFor } from '@/sanity/lib/image'

export type HelpFormTeaserData = {
  enabled?: boolean | null
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  buttonText?: string | null
  image?: any
  questions?: { question: string; options: string[] }[]
}

const HOME_DEFAULTS = {
  eyebrow: 'Personaalne tagasiside',
  title: 'Vasta mõnele küsimusele — vaata, millega saan sind aidata',
  description:
    'Vastuste eest võid lisada oma e-posti — meie meeskond saab ette valmistada asjakohasemaid soovitusi.',
  buttonText: 'Ava tootmisaudit',
} as const

const KOOLITUS_DEFAULTS = {
  eyebrow: 'Veel ei ole kindel?',
  title: 'Kirjelda lühidalt oma olukorda — vaatan, kuidas sind kõige paremini aidata',
  description:
    'Vasta 6-le kiirele küsimusele ja saa detailne analüüs ning personaalsed soovitused otse oma e-mailile.',
  buttonText: 'Ava tootmisaudit',
} as const

type HelpFormTeaserProps = {
  data?: HelpFormTeaserData | null
  /** `home`: pärast quizi. `koolitus`: enne grupi tabelit. */
  variant?: 'home' | 'koolitus'
  className?: string
}

/**
 * Compact CTA replacing the external Google Form with the interactive ProductionAuditQuiz.
 * - Home: `mainPage.helpFormTeaser` (pärast quizi).
 * - Koolitus: `koolitusPage.leadFormTeaser` (enne grupi tabelit).
 */
export default function HelpFormTeaser({ data, variant = 'home', className }: HelpFormTeaserProps) {
  const [showQuiz, setShowQuiz] = useState(false)

  if (data?.enabled === false) return null

  const copy = variant === 'home' ? HOME_DEFAULTS : KOOLITUS_DEFAULTS
  const eyebrow = (data?.eyebrow?.trim() || copy.eyebrow).trim()
  const title = (data?.title?.trim() || copy.title).trim()
  const description = (data?.description?.trim() || copy.description).trim()
  const buttonText = (data?.buttonText?.trim() || copy.buttonText).trim()

  const outerClass =
    variant === 'koolitus'
      ? ''
      : 'mt-10 mb-4 md:mt-12 md:mb-6'

  if (showQuiz) {
    return (
      <MarketingContainer className="my-8">
        <ProductionAuditQuiz blockQuestions={data?.questions} />
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowQuiz(false)}
            className="text-xs font-bold uppercase tracking-wider text-slate-400 transition hover:text-white underline underline-offset-4 cursor-pointer"
          >
            ← Sulge kiiraudit
          </button>
        </div>
      </MarketingContainer>
    )
  }

  if (variant === 'home' || variant === 'koolitus') {
    return (
      <MarketingContainer className={`help-form-teaser-section ${outerClass}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT: The Teaser Panel */}
          <div className={`${marketingPanelCompactClass} order-2 lg:order-1`}>
            <div className="help-form-teaser-glow pointer-events-none absolute -right-20 -top-16 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-400/10" />
            <div className="relative flex flex-col gap-6 md:gap-8">
              <div className="min-w-0 text-left">
                {eyebrow ? <EyebrowPillBadge text={eyebrow} className="mb-0" /> : null}
                <div className="mt-3 text-balance text-xl font-black leading-snug tracking-tight text-[var(--text-primary)] sm:text-2xl md:text-[1.65rem] md:leading-tight">
                  {title}
                </div>
                {description ? (
                  <p className="mt-3 max-w-lg text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
                    {description}
                  </p>
                ) : null}
              </div>
              <div className="flex shrink-0 flex-col gap-2 items-start">
                <BrandVibrantButton
                  onClick={() => setShowQuiz(true)}
                  variant="marketing"
                  icon={BarChart3}
                  className="whitespace-normal text-center leading-tight sm:max-w-full md:max-w-none cursor-pointer animate-pulse-slow w-full sm:w-auto"
                >
                  {buttonText}
                </BrandVibrantButton>
                <p className="help-form-teaser-subtext text-left text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Käivita sealsamas lehel
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Image / Placeholder */}
          <div className="relative h-64 sm:h-80 lg:h-full w-full min-h-[300px] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center order-1 lg:order-2">
             {data?.image ? (
               <img 
                 src={urlFor(data.image).width(800).format('webp').quality(80).url()} 
                 alt={title || 'Tootmisaudit'}
                 className="absolute inset-0 w-full h-full object-cover"
                 loading="eager"
                 decoding="sync"
                 fetchPriority="high"
               />
             ) : variant === 'koolitus' ? (
               <img src="/placeholder-image.svg" alt="Feature illustration" className="absolute inset-0 w-full h-full object-cover" />
             ) : (
               <>
                 <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')" }}></div>
                 <div className="relative z-10 flex flex-col items-center gap-3">
                   <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                   </div>
                   <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs">Placeholder Pilt</span>
                 </div>
               </>
             )}
          </div>
        </div>
      </MarketingContainer>
    )
  }

  return (
    <MarketingContainer elevated className={`help-form-teaser-section ${className || ''}`}>
      <div className={marketingPanelCompactClass}>
        <div className="help-form-teaser-glow pointer-events-none absolute -right-20 -top-16 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-400/10" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="min-w-0 flex-1 text-left">
            {eyebrow ? <EyebrowPillBadge text={eyebrow} className="mb-0" /> : null}
            <div className="mt-2 text-balance text-xl font-black leading-snug tracking-tight text-[var(--text-primary)] sm:text-2xl md:text-[1.65rem] md:leading-tight">
              {title}
            </div>
            {description ? (
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
                {description}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center md:flex-col md:items-stretch">
            <BrandVibrantButton
              onClick={() => setShowQuiz(true)}
              variant="marketing"
              icon={BarChart3}
              className="whitespace-normal text-center leading-tight sm:max-w-[16rem] md:max-w-none cursor-pointer animate-pulse-slow"
            >
              {buttonText}
            </BrandVibrantButton>
            <p className="help-form-teaser-subtext text-center text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 sm:text-left md:text-center">
              Käivita sealsamas lehel
            </p>
          </div>
        </div>
      </div>
    </MarketingContainer>
  )
}
