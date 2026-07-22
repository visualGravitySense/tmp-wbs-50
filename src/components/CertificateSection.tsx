'use client'

import { useState } from 'react'
import { MarketingContainer, Section, SplitHeader, marketingInsetCardClass } from '@/components/ui'

interface CertificateSectionProps {
  eyebrow?: string
  title?: string
  titleHighlight?: string
  subtitle?: string
  proofText?: string
  proofNumber?: string
  habitLabel?: string
  habitText?: string
  habitHighlight?: string
  meaningLabel?: string
  meaningPills?: {
    label: string
    value: string
    active?: boolean
    responseText?: string
    responseExample?: string
  }[]
  meaningResponses?: Record<string, {
    text: string
    example: string
  }>
  useCasesTitle?: string
  useCases?: Array<{
    icon: string
    text: string
    author: string
    role: string
    company: string
    timeframe: string
  }>
  requirementsTitle?: string
  requirements?: string[]
  certName?: string
  certTitle?: string
  certSubtitle?: string
  certMeta?: Array<{
    label: string
    value: string
  }>
  certificateImage?: {
    asset?: {
      url: string
    }
  }
  countriesTitle?: string
  countriesSubtitle?: string
  countries?: Array<{
    flag: string
    name: string
  }>
  alumniTitle?: string
  alumniText?: string
  alumniHighlight?: string
  alumniAvatars?: string[]
  ctaText?: string
  ctaLink?: string
  backgroundColor?: string
}

const CertificateSection: React.FC<CertificateSectionProps> = ({
  eyebrow = "Tunnistus",
  title = "Sa lahkud ",
  titleHighlight = "tõendatult",
  subtitle = "Sertifikaat tõendab mitte ainult, et sa läbisid koolituse — vaid et sa oled võimeline looma reaalset väärtust.",
  proofText = "Standardiseeritud tase",
  proofNumber = "EST-QA-2024",
  habitLabel = "Harjumus:",
  habitText = "Mitte teadmine, vaid ",
  habitHighlight = "tegemine",
  meaningLabel = "Mida see märk sinu jaoks tähendab?",
  meaningPills = [
    { label: "Tööandjale", value: "employer", active: true },
    { label: "Enesele", value: "self" },
    { label: "Turul", value: "market" }
  ],
  meaningResponses = {
    employer: {
      text: "Tõend, et juht suudab iseseisvalt protsesse parendada ja raiskamist vähendada.",
      example: "Näide: 15% tootlikkuse kasv 3 kuuga."
    }
  },
  useCasesTitle = "Kus seda märki kasutatakse?",
  useCases = [],
  requirementsTitle = "Kvalifikatsiooni nõuded:",
  requirements = [
    "100% osalus kontaktõppes",
    "Iseseisva projekti edukas kaitsmine",
    "Praktiliste harjumuste demonstreerimine tehasevisiidil"
  ],
  certName = "Andres Õunapuu",
  certTitle = "LEAN PRAKTIK",
  certSubtitle = "TOOTMISJUHTIDE ARENGUPROGRAMM",
  certMeta = [
    { label: "Väljastatud", value: "15. Mai 2024" },
    { label: "Maht", value: "72 ak. tundi" },
    { label: "Tase", value: "Kõrgtase" }
  ],
  certificateImage,
  countriesTitle = "Rahvusvaheline tunnustus",
  countriesSubtitle = "Meie metoodikat ja sertifikaati tunnustavad partnerid:",
  countries = [],
  alumniTitle = "Liitu vilistlastega",
  alumniText = "Sertifitseeritud ",
  alumniHighlight = "240+",
  alumniAvatars = ["A", "M", "K", "S"],
  ctaText = "Vaata kõiki sertifitseeritud praktikuid",
  ctaLink = "#",
  backgroundColor = "bg-transparent"
}) => {
  const [activeMeaning, setActiveMeaning] = useState(meaningPills?.[0]?.value || 'employer')

  const imageUrl = certificateImage?.asset?.url || "/tunnistus2026.png"

  const resolvedBg = 'bg-transparent';

  return (
    <Section variant="band" className={`relative overflow-hidden ${resolvedBg}`}>
      {/* Световое пятно для глубины */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[140px] rounded-full -z-10" />

      <MarketingContainer elevated>
          
          {/* Header */}
          <div className="mx-auto mb-20 flex justify-center text-center">
            <SplitHeader
              eyebrow={eyebrow}
              title={`${title}${titleHighlight ? `, ${titleHighlight}` : ''}`}
              subtitle={
                <div className="space-y-4">
                  {subtitle && (
                    <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl font-medium italic text-[rgb(var(--text-secondary))] leading-relaxed mt-2">
                      &quot;{subtitle}&quot;
                    </p>
                  )}
                  {proofText && (
                    <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                      <strong className="text-blue-600 dark:text-blue-400 font-black">{proofNumber || ''}</strong> {proofText}
                    </p>
                  )}
                </div>
              }
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            {/* LEFT COLUMN: Habit, Meaning, Use Cases, Requirements */}
            <div className="space-y-8">
              {/* Habit Box */}
              {(habitHighlight || habitText) && (
                <div className="border-l-4 border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 px-6 py-4 rounded-r-2xl">
                  {habitLabel && (
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      {habitLabel}
                    </div>
                  )}
                  <p className="text-sm text-[rgb(var(--text-primary))]">
                    <strong className="text-blue-600 dark:text-blue-400 font-extrabold">{habitHighlight}</strong> {habitText}
                  </p>
                </div>
              )}

              {/* Meaning & Interactions */}
              <div className={`${marketingInsetCardClass} p-8 text-[rgb(var(--text-primary))]`}>
                <h4 className="mb-6 text-[10px] font-black uppercase italic tracking-[0.2em] text-blue-600">{meaningLabel}</h4>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {(meaningPills || []).map((pill, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMeaning(pill.value)}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeMeaning === pill.value 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'border border-slate-300/70 bg-white/75 text-[rgb(var(--text-secondary))] hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>

                <div className="min-h-[120px] animate-in fade-in slide-in-from-right-4 duration-500">
                  <p className="mb-4 font-bold italic leading-relaxed text-[rgb(var(--text-primary))]">
                    &quot;{
                      (meaningPills || []).find(p => p.value === activeMeaning)?.responseText ||
                      (meaningResponses || {})[activeMeaning]?.text || 
                      (!['career', 'client', 'confidence', 'employer', 'self', 'market'].includes(activeMeaning || '') ? activeMeaning : '')
                    }&quot;
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest">
                    {
                      (meaningPills || []).find(p => p.value === activeMeaning)?.responseExample ||
                      (meaningResponses || {})[activeMeaning]?.example || ''
                    }
                  </p>
                </div>
              </div>

              {/* Use Cases */}
              {useCases && useCases.length > 0 && (
                <div className={`${marketingInsetCardClass} space-y-6 p-8 text-[rgb(var(--text-primary))]`}>
                  {useCasesTitle && (
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[rgb(var(--text-secondary))]">
                      {useCasesTitle}
                    </h4>
                  )}
                  <div className="space-y-4">
                    {useCases.map((uc, index) => (
                      <div 
                        key={index}
                        className="flex gap-4 p-4 rounded-xl border border-slate-200/50 bg-white/30 dark:border-white/5 dark:bg-white/[0.01] hover:border-blue-500/40 hover:bg-white/55 dark:hover:border-blue-400/40 dark:hover:bg-white/[0.03] transition-all duration-300"
                      >
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm italic font-medium text-[rgb(var(--text-primary))]">
                            &ldquo;{uc.text}&rdquo;
                          </p>
                          <p className="text-[10px] text-[rgb(var(--text-secondary))] font-semibold uppercase tracking-wider mt-2">
                            — {uc.author}, {uc.role} · {uc.company}{uc.timeframe ? ` · ${uc.timeframe}` : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              <div className={`${marketingInsetCardClass} p-8 text-[rgb(var(--text-primary))]`}>
                <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-[rgb(var(--text-secondary))]">{requirementsTitle}</h4>
                <ul className="space-y-4">
                  {(requirements || []).map((req, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[rgb(var(--text-secondary))]">
                      <span className="font-black text-blue-600 dark:text-blue-400">0{i+1}</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN: Visual Certificate Card & Countries */}
            <div className="space-y-8">
              {/* Visual Certificate Card */}
              {certificateImage?.asset?.url ? (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-surface opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className={`${marketingInsetCardClass} relative overflow-hidden p-8 text-[rgb(var(--text-primary))] md:p-12`}>
                    {/* Cert Image Screenshot */}
                    <div className="relative flex justify-center p-2 md:p-4">
                      <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-slate-200/50 dark:border-white/10 shadow-sm bg-white dark:bg-slate-950/80">
                        <img
                          src={imageUrl}
                          alt="Sertifikaadi näidis"
                          className="w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-surface opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className={`${marketingInsetCardClass} relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-600 to-indigo-700 p-8 text-white shadow-[0_20px_50px_rgba(59,130,246,0.25)] md:p-12`}>
                    {/* Certificate Decorative Circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
                    
                    <div className="relative z-10 space-y-6">
                      <div className="w-12 h-12 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <circle cx="12" cy="8" r="5"/>
                          <path d="M6.5 17.5L5 22l7-2 7 2-1.5-4.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.15em] text-white/70 mb-1">
                          {certName}
                        </div>
                        <h3 
                          className="text-xl md:text-2xl font-black leading-tight tracking-tight text-white"
                          dangerouslySetInnerHTML={{ __html: certTitle || '' }}
                        />
                        {certSubtitle && (
                          <p className="text-xs text-white/85 mt-2 font-medium">
                            {certSubtitle}
                          </p>
                        )}
                      </div>
                      
                      <div className="h-px bg-white/15" />
                      
                      {certMeta && certMeta.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                          {certMeta.map((meta, idx) => (
                            <div key={idx}>
                              <div className="text-[9px] font-bold text-white/55 uppercase tracking-wider mb-1">
                                {meta.label}
                              </div>
                              <div className="text-sm font-bold text-white">
                                {meta.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Countries */}
              {countries && countries.length > 0 && (
                <div className={`${marketingInsetCardClass} p-8 text-[rgb(var(--text-primary))]`}>
                  {countriesTitle && (
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[rgb(var(--text-secondary))] mb-4 flex items-center gap-2">
                      {countriesTitle} {countriesSubtitle && <span className="normal-case tracking-normal font-medium text-slate-400">({countriesSubtitle})</span>}
                    </h4>
                  )}
                  <div className="flex flex-wrap gap-2.5">
                    {countries.map((c, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/60 bg-white/80 dark:border-white/5 dark:bg-white/5 text-xs font-bold text-[rgb(var(--text-primary))]"
                        title={c.name}
                      >
                        <span className="text-base leading-none select-none">{c.flag}</span>
                        <span>{c.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Alumni Proof Footer */}
          <div className={`${marketingInsetCardClass} flex flex-col items-center justify-between gap-8 p-8 md:flex-row`}>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {(alumniAvatars || []).map((avatar, index) => (
                  <div
                    key={index}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[10px] font-black text-white shadow-xl dark:border-[rgb(var(--bg-primary))]"
                  >
                    {avatar}
                  </div>
                ))}
              </div>
              <div className="max-w-[300px]">
                <p className="text-xs leading-snug text-[rgb(var(--text-secondary))]">
                  <span className="font-black text-[rgb(var(--text-primary))]">{alumniTitle}</span>: {alumniText}
                  <strong className="ml-1 text-sm font-black italic tracking-tighter text-emerald-600 dark:text-emerald-400">{alumniHighlight}</strong>
                  — juhtivatest Eesti ettevõtetest.
                </p>
              </div>
            </div>
            
            <a 
              href={ctaLink} 
              className="border-b border-blue-500/20 pb-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {ctaText} →
            </a>
          </div>

      </MarketingContainer>
    </Section>
  )
}

export default CertificateSection