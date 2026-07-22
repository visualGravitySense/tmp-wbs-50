'use client'

import React, { useState, useEffect } from 'react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { Card, CardContent, MarketingContainer, Section, SplitHeader, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { renderTextWithLinks } from '@/lib/linkify'

interface InvestmentSectionProps {
  eyebrow?: string
  title?: string
  titleHighlight?: string
  contemplationQuestion?: string
  contemplationLabel?: string
  benefitsTitle?: string
  benefits?: Array<{
    title?: string
    subtitle?: string
    isHidden?: boolean
  }>
  price?: number
  priceDaily?: string
  priceReframe?: string
  roiCalculator?: {
    label?: string
    sizes?: Array<{
      label?: string
      sublabel?: string
      result?: string
    }>
    defaultResult?: string
    sendRoiText?: string
  }
  guarantee?: {
    text?: string
  }
  primaryButtonText?: string
  secondaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonHref?: string
  peerProof?: {
    avatarInitials?: string[]
    text?: string
    highlight?: string
  }
  contactInfo?: {
    text?: string
    phone?: string
    email?: string
  }
  backgroundColor?: string
}

export default function InvestmentSection({
  eyebrow = "Investeering",
  title = "Mida saad ",
  titleHighlight = "tagasi?",
  contemplationQuestion = "Mis olukord on sinu tootmises 12 kuu pärast, kui sa jätkad praegusel viisil?",
  contemplationLabel = "Mõtle hetkeks:",
  benefitsTitle = "Harjumuste omandamise hind sisaldab:",
  benefits = [
    {
      title: "9-päevane intensiivprogramm (72 ak.h)",
      subtitle: "3 moodulit, visiidid tehastesse, reaalne praktika",
    },
    {
      title: "Personaalsed arenguülesanded",
      subtitle: "Sinu tehase probleemide lahendamine koolituse käigus",
    },
    {
      title: "Lõputunnistus ja LEAN-praktiku märk",
      subtitle: "Eesti Kvaliteediühingu poolt tunnustatud tase",
    }
  ],
  price = 1490,
  priceDaily = "165€ / õppepäev",
  priceReframe = "See on vähem kui ühe praakpartii kulu.",
  roiCalculator,
  guarantee,
  primaryButtonText = "Registreeru koolitusele",
  secondaryButtonText = "Küsi pakkumist meeskonnale",
  primaryButtonHref = "/register",
  secondaryButtonHref = "/kontakt",
  peerProof,
  contactInfo,
  backgroundColor = "bg-[rgb(var(--bg-primary))]" // Используем наш темный фон
}: InvestmentSectionProps) {
  
  const [showMoreBenefits, setShowMoreBenefits] = useState(false)
  const [activeSize, setActiveSize] = useState(1)

  const safeText = (value: string | undefined, fallback: string) => {
    if (!value) return fallback
    const trimmed = value.trim()
    // Treat placeholders like ".", "..", "-", "—", "_" as empty content.
    const looksLikePlaceholder = /^[-–—._\s]+$/.test(trimmed)
    return trimmed.length > 0 && !looksLikePlaceholder ? trimmed : fallback
  }

  const safePrice = (value: number | undefined, fallback: number) => {
    if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) return fallback
    return value
  }

  const fallbackBenefits = [
    {
      title: "9-päevane intensiivprogramm (72 ak.h)",
      subtitle: "3 moodulit, visiidid tehastesse, reaalne praktika",
      isHidden: false,
    },
    {
      title: "Personaalsed arenguülesanded",
      subtitle: "Sinu tehase probleemide lahendamine koolituse käigus",
      isHidden: false,
    },
    {
      title: "Lõputunnistus ja LEAN-praktiku märk",
      subtitle: "Eesti Kvaliteediühingu poolt tunnustatud tase",
      isHidden: false,
    },
  ]

  const fallbackRoiSizes = [
    { label: '10 töötajat', sublabel: '~40k/kuu', result: '€48 000' },
    { label: '50 töötajat', sublabel: '~200k/kuu', result: '€240 000' },
    { label: '100+ töötajat', sublabel: '~400k/kuu', result: '€480 000' },
  ]

  const fallbackPeerInitials = ['A', 'M', 'K', 'S']

  const normalizedBenefits = (benefits || [])
    .map((benefit) => ({
      title: safeText(benefit?.title, 'LEAN-praktika moodul'),
      subtitle: safeText(benefit?.subtitle, 'Praktiline väärtus sinu ettevõtte jaoks'),
      isHidden: Boolean(benefit?.isHidden),
    }))
    .filter((benefit) => benefit.title.length > 0)

  const effectiveBenefits = normalizedBenefits.length > 0 ? normalizedBenefits : fallbackBenefits

  const normalizedRoiSizes = (roiCalculator?.sizes || [])
    .map((size, index) => ({
      label: safeText(size?.label, fallbackRoiSizes[index]?.label || `Variant ${index + 1}`),
      sublabel: safeText(size?.sublabel, fallbackRoiSizes[index]?.sublabel || 'prognoos'),
      result: safeText(size?.result, fallbackRoiSizes[index]?.result || '€0'),
    }))
    .filter((size) => size.label.length > 0)

  const effectiveRoiSizes = normalizedRoiSizes.length > 0 ? normalizedRoiSizes : fallbackRoiSizes
  const safeActiveSize = Math.min(activeSize, Math.max(0, effectiveRoiSizes.length - 1))
  const effectiveDefaultRoi = safeText(roiCalculator?.defaultResult, '€48 000')

  const effectivePeerInitials =
    (peerProof?.avatarInitials || []).filter((item) => (item || '').trim().length > 0).length > 0
      ? (peerProof?.avatarInitials || []).filter((item) => (item || '').trim().length > 0)
      : fallbackPeerInitials

  const effectivePeerText = safeText(peerProof?.text, 'Sertifitseeritud')
  const effectivePeerHighlight = safeText(peerProof?.highlight, '150+ tootmisjuhti')
  const effectiveContactPhone = safeText(contactInfo?.phone, '+3720000000')
  const effectiveContactEmail = safeText(contactInfo?.email, 'hello@example.com')
  const effectiveContemplationLabel = safeText(contemplationLabel, 'Mõtle hetkeks:')
  const effectiveContemplationQuestion = safeText(
    contemplationQuestion,
    'Mis olukord on sinu tootmises 12 kuu pärast, kui sa jätkad praegusel viisil?'
  )
  const effectivePrice = safePrice(price, 1490)
  const effectivePriceDaily = safeText(priceDaily, '165€ / õppepäev')
  const effectivePriceReframe = safeText(priceReframe, 'See on vähem kui ühe praakpartii kulu.')
  const effectivePrimaryButtonText = safeText(primaryButtonText, 'Registreeru koolitusele')
  const effectiveSecondaryButtonText = safeText(secondaryButtonText, 'Küsi pakkumist meeskonnale')
  const effectiveGuarantee = safeText(
    guarantee?.text,
    'Kui sa 30 päeva jooksul ei näe praktilist väärtust, aitame sul koostada rakendusplaani tasuta.'
  )
  
  const visibleBenefits = showMoreBenefits ? effectiveBenefits : effectiveBenefits.filter((b) => !b.isHidden)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#pricing') {
      const el = document.getElementById('pricing');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <Section id="pricing" variant="band" className="relative overflow-hidden bg-transparent transition-colors duration-500 scroll-mt-24">
      {/* Specular Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[350px] w-[350px] rounded-full bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-transparent blur-[80px] sm:blur-[110px] dark:from-blue-600/12 dark:via-indigo-600/8 dark:to-transparent" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-teal-500/6 via-blue-500/8 to-transparent blur-[90px] sm:blur-[120px] dark:from-teal-500/8 dark:via-blue-500/12 dark:to-transparent" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/6 via-indigo-500/8 to-blue-500/6 blur-[100px] sm:blur-[140px] dark:from-purple-500/8 dark:via-indigo-500/10 dark:to-blue-500/8" />

      <MarketingContainer elevated>
          
          {/* Header */}
          <div className="mx-auto mb-16 flex justify-center">
            <SplitHeader
              eyebrow={<EyebrowPillBadge text={eyebrow} />}
              title={`${title}${titleHighlight ? `, ${titleHighlight}` : ''}`}
              subtitle={
                <div className={`mx-auto mt-6 max-w-2xl p-6 transition-all duration-300 hover:scale-[1.01] ${marketingMicroPillClass}`}>
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold text-[10px] uppercase tracking-widest block mb-2">{effectiveContemplationLabel}</span>
                  <p className="text-slate-700 dark:text-[rgb(var(--text-secondary))] text-base sm:text-lg leading-relaxed font-medium">"{renderTextWithLinks(effectiveContemplationQuestion)}"</p>
                </div>
              }
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Benefits */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`p-8 md:p-10 transition-all duration-300 ${marketingInsetCardClass}`}>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <h3 className="text-xl font-extrabold uppercase text-slate-850 dark:text-[rgb(var(--text-primary))] mb-8 tracking-tight border-b border-slate-100 dark:border-white/5 pb-4">
                  {benefitsTitle}
                </h3>
                
                <div className="space-y-6">
                  {visibleBenefits?.map((benefit, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-800 dark:text-[rgb(var(--text-primary))] font-bold text-sm uppercase tracking-wide group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {renderTextWithLinks(benefit.title)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-[rgb(var(--text-secondary))] mt-1">{renderTextWithLinks(benefit.subtitle)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {effectiveBenefits.length > 3 && !showMoreBenefits && (
                  <button 
                    onClick={() => setShowMoreBenefits(true)}
                    className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                  >
                    + Vaata kõiki detaile
                  </button>
                )}
              </div>

              {/* Price Reframe */}
              <div className={`flex flex-col items-center justify-between gap-8 bg-gradient-to-r from-blue-50 to-transparent p-8 md:p-10 dark:from-blue-600/10 dark:to-transparent md:flex-row ${marketingInsetCardClass}`}>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900 dark:text-[rgb(var(--text-primary))] tracking-tighter dark:bg-gradient-to-r dark:from-white dark:to-slate-350 dark:bg-clip-text">{effectivePrice}€</span>
                    <span className="text-slate-500 dark:text-[rgb(var(--text-secondary))] font-bold uppercase text-sm">+ KM</span>
                  </div>
                  <p className="text-blue-650 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mt-2">{effectivePriceDaily}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-slate-600 dark:text-[rgb(var(--text-secondary))] text-sm italic max-w-[220px] leading-relaxed">
                    {effectivePriceReframe}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ROI Calculator */}
            <div className="lg:col-span-5">
              <div className={`p-8 md:p-10 ${marketingInsetCardClass}`}>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <h4 className="text-xs font-black tracking-[0.3em] text-slate-400 dark:text-gray-500 uppercase mb-8 text-center">
                  {safeText(roiCalculator?.label, 'Sinu potentsiaalne ROI')}
                </h4>

                {/* ROI Sizes */}
                <div className="grid grid-cols-3 gap-2 mb-10">
                  {effectiveRoiSizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSize(index)}
                      className={`px-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeSize === index 
                        ? 'rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.3),0_15px_30px_-5px_rgba(59,130,246,0.4)] hover:scale-[1.03]' 
                        : `${marketingMicroPillClass} text-slate-650 hover:bg-slate-200/80 dark:text-[rgb(var(--text-secondary))] dark:hover:bg-white/10`
                      }`}
                    >
                      {size.label}
                      <span className="block opacity-50 font-medium lowercase tracking-normal mt-1">{size.sublabel}</span>
                    </button>
                  ))}
                </div>

                {/* ROI Result */}
                <div className={`mb-8 p-8 text-center shadow-[inset_0_2px_5px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] ${marketingMicroPillClass}`}>
                  <p className="text-[10px] font-black text-blue-650 dark:text-blue-400 uppercase tracking-[0.3em] mb-4">Eeldatav sääst aastas:</p>
                  <div className="text-4xl font-black text-slate-850 dark:text-[rgb(var(--text-primary))] tracking-tighter">
                    {effectiveRoiSizes[safeActiveSize]?.result || effectiveDefaultRoi}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  {/* <button className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.25)] border-t border-white/20">
                    {effectivePrimaryButtonText} →
                  </button>
                  <button className="w-full py-5 bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-[rgb(var(--text-primary))] rounded-full font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                    {effectiveSecondaryButtonText}
                  </button> */}
                  <a href={primaryButtonHref} className="block text-center w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.25)] border-t border-white/20">
                    {effectivePrimaryButtonText} →
                  </a>
                  <a href={secondaryButtonHref} className="block text-center w-full py-5 bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-[rgb(var(--text-primary))] rounded-full font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                    {effectiveSecondaryButtonText}
                  </a>
                </div>

                {/* Guarantee */}
                <p className="mt-8 text-center text-[10px] text-slate-500 dark:text-[rgb(var(--text-secondary))] font-medium leading-relaxed italic px-4">
                  {renderTextWithLinks(effectiveGuarantee)}
                </p>
              </div>
            </div>

          </div>

          {/* Footer Proof & Contacts */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {effectivePeerInitials.map((init, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[rgb(var(--bg-primary))] bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                    {init}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-450 dark:text-gray-500 font-medium">
                <strong className="text-slate-800 dark:text-[rgb(var(--text-primary))]">{effectivePeerText}</strong> {effectivePeerHighlight}
              </p>
            </div>

            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[rgb(var(--text-secondary))]">
              <a href={`tel:${effectiveContactPhone}`} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Tel: {effectiveContactPhone}</a>
              <a href={`mailto:${effectiveContactEmail}`} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors lowercase tracking-normal font-bold">{effectiveContactEmail}</a>
            </div>
          </div>
      </MarketingContainer>
    </Section>
  )
}