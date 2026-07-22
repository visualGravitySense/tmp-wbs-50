"use client"

import { MarketingContainer, SplitHeader, EyebrowPillBadge } from '@/components/ui'
import React, { useState } from 'react'
import { Calendar, Users, Coffee, Utensils, Factory, Clock, ChevronDown } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { KoolitusTrainingScheduleBlock } from '@/types/koolitusSections'
import { buildTrainingModuleCalendarUrl, generateAllModulesIcs } from '@/lib/googleCalendar'
import { renderTextWithLinks } from '@/lib/linkify'

const DEFAULT_SCHEDULE = [
  { time: '09:00', title: 'Kogunemine & kohv', desc: 'Hommikukohv, muljed ja saiake' },
  { time: '09:30 – 11:00', title: 'Esimene sessioon', desc: '' },
  { time: '11:00 – 11:15', title: 'Väike paus', desc: '' },
  { time: '11:15 – 12:30', title: 'Teine sessioon', desc: '' },
  { time: '12:30 – 13:00', title: 'Lõuna', desc: 'Restoranis' },
  { time: '13:00 – 14:30', title: 'Kolmas sessioon', desc: '' },
  { time: '14:30 – 14:45', title: 'Väike paus', desc: '' },
  { time: '14:45 – 16:00', title: 'Neljas sessioon', desc: 'Päeva lõpp' }
]

const DEFAULT_MODULES = [
  { num: '01', type: 'normal', week: 'Nädal 42', date: 'Neljapäev, 22.10.2026', details: 'Sissejuhatus LEAN mõtteviisi ja Toyota Tootmissüsteemi (TPS) alustesse. Keskendume väärtusloomele ja raiskamiste tuvastamisele tootmises.' },
  { num: '02', type: 'normal', week: 'Nädal 45', date: 'Neljapäev, 12.11.2026', details: 'Just-In-Time (JIT) ja tõmbesüsteemid. Õpime, kuidas luua voolavust ning vähendada pooltoodangut ja laovarusid.' },
  { num: '03', type: 'special', title: 'Esimene ettevõtte külastus', desc: 'Lepime kokku koolitusel', details: 'Koolituse käigus lepime ühiselt kokku esimese külastatava ettevõtte, et näha TPS põhimõtteid reaalses tootmiskeskkonnas.' },
  { num: '04', type: 'normal', week: 'Nädal 49', date: 'Neljapäev, 10.12.2026', details: 'Jidoka ja sisseehitatud kvaliteet. Kuidas peatada liin probleemi ilmnemisel og luua veakindlaid (Poka-Yoke) lahendusi.' },
  { num: '05', type: 'normal', week: 'Nädal 2', date: 'Neljapäev, 14.01.2027', details: 'Standardiseeritud töö ja 5S. Uurime, kuidas luua stabiilne, turvaline ja visuaalselt juhitud töökeskkond.' },
  { num: '06', type: 'normal', week: 'Nädal 4', date: 'Neljapäev, 28.01.2027', details: 'Pideva parendamise (Kaizen) kultuur. Kuidas kaasata kogu meeskonda igapäevaste väikeste parenduste tegemisse.' },
  { num: '07', type: 'special', title: 'Teine ettevõtte külastus', desc: 'Lepime kokku koolitusel', details: 'Koolituse käigus lepime ühiselt kokku teise külastatava ettevõtte, et näha TPS põhimõtete toimimist ja juurutamist praktikas.' },
  { num: '08', type: 'normal', week: 'Nädal 8', date: 'Neljapäev, 25.02.2027', details: 'Probleemide lahendamise metoodikad. PDCA tsükkel, A3 raportid ja juurpõhjuste analüüs (näiteks 5 Miks meetod).' },
  { num: '09', type: 'normal', week: 'Nädal 10', date: 'Neljapäev, 11.03.2027', details: 'Programmi kokkuvõte ja edasised sammud. Kuidas tagada muutuste püsivus ja luua ettevõttes jätkusuutlik juhtimissüsteem.' },
]

export default function TrainingSchedule({ data }: { data?: KoolitusTrainingScheduleBlock }) {
  const headerTitle = data?.headerTitle || '2026-2027. aasta, koolitusprogramm'
  const headerSubtitle = data?.headerSubtitle || 'Toimub oktoober 2026 kuni märts 2027'
  const desc1 = data?.description1 || 'Tootmisjuhtimise 2026-2027. aasta koolitus algab oktoobris 2026 ja kestab kuus kuud kuni märtsini 2027.'
  const desc2 = data?.description2 || 'Koolitus toimub näidatud ajakava alusel – varu need päevad juba varakult, et saaksid osaleda kõikidel kohtumistel. Kahe ettevõtete külastuse detailid lepime kokku kursuse alguses.'
  const tag1 = data?.tag1 || '140 kalendripäeva'
  const tag2 = data?.tag2 || '9 kohtumist'
  const dailyTitle = data?.dailyScheduleTitle || 'Koolituse päevakava'
  const dailyItems = data?.dailyScheduleItems?.length ? data.dailyScheduleItems : DEFAULT_SCHEDULE
  const foodCard = data?.foodCardText || 'Rikkalik ja maitsev lõunasöök sisaldub koolituse hinnas ning toimub hubases restoranis.'
  const infoSub = data?.infoBannerSub || 'Kohtume Sinuga 9 korral – kokku'
  const infoTitle = data?.infoBannerTitle || '64 akadeemilist kontakttundi'
  
  let rawModules = data?.modules?.length ? data.modules : DEFAULT_MODULES
  
  // De-duplicate module details for SEO (preventing identical paragraphs)
  const modules = rawModules.map((mod: any) => {
    if (mod.num === '03' && mod.details?.includes('Koolituse käigus lepime ühiselt kokku külastatavad ettevõtted')) {
      return {
        ...mod,
        title: mod.title === 'Ettevõtete külastus' ? 'Esimene ettevõtte külastus' : mod.title,
        details: 'Koolituse käigus lepime ühiselt kokku esimese külastatava ettevõtte, et näha TPS põhimõtteid reaalses tootmiskeskkonnas.'
      }
    }
    if (mod.num === '07' && mod.details?.includes('Koolituse käigus lepime ühiselt kokku külastatavad ettevõtted')) {
      return {
        ...mod,
        title: mod.title === 'Ettevõtete külastus' ? 'Teine ettevõtte külastus' : mod.title,
        details: 'Koolituse käigus lepime ühiselt kokku teise külastatava ettevõtte, et näha TPS põhimõtete toimimist ja juurutamist praktikas.'
      }
    }
    return mod
  })
  const footerNote = data?.footerNote || '* Muudatustest annan teada.'
  
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [expandedScheduleStep, setExpandedScheduleStep] = useState<number | null>(null);

  const toggleModule = (idx: number) => {
    setExpandedModule(expandedModule === idx ? null : idx);
  };

  const toggleScheduleStep = (idx: number) => {
    setExpandedScheduleStep(expandedScheduleStep === idx ? null : idx);
  };

  const handleDownloadIcs = () => {
    const icsContent = generateAllModulesIcs(modules);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'opstar-profit-koik-koolituspaevad.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      // `id="ajakava"` is applied by page-builder ScrollSpySection; keep `schedule` as alias for in-page CTAs.
      id="schedule"
      className="relative scroll-mt-24 overflow-hidden bg-transparent py-16 font-sans transition-colors duration-500 md:py-24"
    >
      
      <MarketingContainer elevated className="relative z-10">
        
        {/* Header section */}
        <div className="mx-auto mb-16 flex justify-center">
          <SplitHeader
            eyebrow={<EyebrowPillBadge text="AJAKAVA JA MOODULID" />}
            title={headerTitle}
            subtitle={headerSubtitle}
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: intro + daily schedule (narrower — modules get emphasis on the right) */}
          <div className="lg:col-span-4">
            <div className="group h-full rounded-[24px] border border-slate-200/50 bg-white/30 p-8 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-slate-900/25 dark:shadow-none">
              
              <div className="mb-8 relative w-1/2 mx-auto aspect-[1.05/1] rounded-[2.5rem] overflow-hidden bg-white/20 dark:bg-slate-900/20 border border-slate-200/50 dark:border-white/5 flex flex-col items-center justify-center">
                {data?.image ? (
                  <img 
                    src={urlFor(data.image).width(800).url()} 
                    alt={headerTitle || 'Koolitus'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src="/placeholder-image.svg" 
                    alt="Training" 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                )}
              </div>

              {/* Description */}
              <div className="mb-10 space-y-6">
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  {desc1}
                </p>
                <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                  {desc2}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-12 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1.5 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  <Calendar className="h-4 w-4" />
                  {tag1}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                  <Users className="h-4 w-4" />
                  {tag2}
                </span>
              </div>

              {/* Daily Schedule */}
              <div className="rounded-2xl bg-white/30 p-6 shadow-sm ring-1 ring-slate-200/40 backdrop-blur-sm dark:bg-slate-900/20 dark:ring-slate-800/40">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                  <Clock className="h-5 w-5 text-blue-500" />
                  {dailyTitle}
                </h3>
                
                <div className="relative space-y-5">
                  <div className="absolute left-[5px] top-2 bottom-2 w-[2px] rounded-full bg-slate-100 dark:bg-slate-700/50" />
                  {dailyItems.map((step, idx) => {
                    const hasDesc = Boolean(step.desc?.trim())
                    const isExpanded = expandedScheduleStep === idx

                    return (
                      <div key={idx} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500 shadow-sm dark:border-slate-800 dark:bg-blue-400" />

                        <div className="grid grid-cols-[minmax(5.75rem,auto)_1fr] items-start gap-x-3 gap-y-0.5">
                          <span className="whitespace-nowrap pt-0.5 text-xs font-bold leading-tight text-blue-600 dark:text-blue-400">
                            {step.time}
                          </span>
                          <div className="min-w-0">
                            {hasDesc ? (
                              <button
                                type="button"
                                onClick={() => toggleScheduleStep(idx)}
                                className="group/step flex w-full items-start gap-1.5 text-left"
                                aria-expanded={isExpanded}
                              >
                                <span className="text-sm font-bold leading-snug text-slate-800 dark:text-slate-200">
                                  {step.title}
                                </span>
                                <ChevronDown
                                  className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 group-hover/step:text-blue-500 dark:text-slate-500 dark:group-hover/step:text-blue-400 ${isExpanded ? 'rotate-180 text-blue-500 dark:text-blue-400' : ''}`}
                                  aria-hidden
                                />
                              </button>
                            ) : (
                              <span className="text-sm font-bold leading-snug text-slate-800 dark:text-slate-200">
                                {step.title}
                              </span>
                            )}
                            {hasDesc && isExpanded ? (
                              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                {step.desc}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Footer Food Card */}
              <div className="flex items-start gap-4 rounded-2xl border border-orange-100 bg-orange-50/80 p-5 dark:border-orange-900/30 dark:bg-orange-950/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">
                  <Utensils className="h-5 w-5" />
                </div>
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {foodCard}
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: module track (wider — primary focus) */}
          <div className="lg:col-span-8">
            
            {/* Top Info Banner and Download Button */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1 w-full rounded-2xl border border-blue-200/60 bg-blue-50/50 px-6 py-4 shadow-sm backdrop-blur-md dark:border-blue-900/50 dark:bg-blue-900/10 dark:shadow-none flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{infoSub}</p>
                  <p className="text-lg font-black text-blue-700 dark:text-blue-400">{infoTitle}</p>
                </div>
              </div>
              
              <button 
                onClick={handleDownloadIcs}
                className="w-full sm:w-auto shrink-0 rounded-2xl border border-blue-200 bg-white px-5 py-4 text-sm font-bold text-blue-600 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700 flex items-center justify-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Lisa kõik 9 päeva kalendrisse
              </button>
            </div>

            {/* Modules Grid */}
            <div className="relative space-y-3">
              {/* Magic background glow for dark mode behind the list */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-3/4 -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[100px] dark:bg-blue-500/10" />
              
              {modules.map((mod, idx) => {
                if (mod.type === 'special') {
                  // Factory Special Module
                  return (
                    <div 
                      key={idx} 
                      className={`group relative rounded-xl border transition-all duration-300 shadow-sm backdrop-blur-md cursor-pointer overflow-hidden ${
                        expandedModule === idx 
                          ? 'border-emerald-350 bg-emerald-50/50 shadow-md dark:border-emerald-500/40 dark:bg-emerald-950/25' 
                          : 'border-emerald-200/30 bg-emerald-50/30 hover:-translate-y-[2px] hover:border-emerald-300 hover:shadow-md dark:border-emerald-500/15 dark:bg-emerald-950/15 dark:shadow-none dark:hover:border-emerald-500/40'
                      }`}
                      onClick={() => toggleModule(idx)}
                    >
                      <div className="flex items-center gap-4 p-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 shadow-inner">
                          <Factory className="h-6 w-6" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:flex-nowrap">
                          <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                            Moodul {mod.num}
                          </span>
                          <span className="hidden text-slate-300 sm:inline" aria-hidden>·</span>
                          <span className="text-sm font-black text-slate-900 dark:text-white sm:text-base">
                            {mod.title}
                          </span>
                          {mod.desc ? (
                            <>
                              <span className="hidden text-slate-300 sm:inline" aria-hidden>·</span>
                              <span className="text-xs text-slate-600 dark:text-slate-400">{mod.desc}</span>
                            </>
                          ) : null}
                        </div>
                        <div className="shrink-0 pl-2 text-emerald-400">
                          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${expandedModule === idx ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      
                      {/* Accordion Content */}
                      <div 
                        className={`grid transition-all duration-300 ease-in-out ${expandedModule === idx ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0'}`}
                      >
                        <div className="overflow-hidden px-4">
                          <div className="pt-2 pb-2 pl-[4.5rem] border-t border-emerald-200/30 dark:border-emerald-800/30 mt-2">
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {renderTextWithLinks(mod.details)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                // Normal Module
                const calendarUrl = buildTrainingModuleCalendarUrl(mod)

                return (
                  <div 
                    key={idx} 
                    className={`group relative rounded-xl border transition-all duration-300 shadow-sm backdrop-blur-md cursor-pointer overflow-hidden ${
                      expandedModule === idx
                        ? 'border-blue-350 bg-white/60 shadow-md dark:border-blue-500/40 dark:bg-slate-800/60'
                        : 'border-slate-200/40 bg-white/30 hover:-translate-y-[2px] hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/20 dark:shadow-none dark:hover:border-blue-500/40'
                    }`}
                    onClick={() => toggleModule(idx)}
                  >
                    <div className="flex items-center gap-4 p-4 sm:gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-xl font-black text-slate-400 shadow-inner transition-colors group-hover:text-blue-500 dark:border-white/5 dark:bg-black/20 dark:text-slate-500 dark:group-hover:text-blue-400 dark:group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                        {mod.num}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:flex-nowrap">
                        <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                          Moodul {mod.num} • {mod.week}
                        </span>
                        <span className="hidden text-slate-300 sm:inline" aria-hidden>·</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-200 sm:text-base">
                          {mod.date}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 pl-2 sm:gap-3 sm:pr-2">
                        {calendarUrl ? (
                          <a
                            href={calendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-slate-500 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                            aria-label={`Lisa Google kalendrisse: ${mod.date}`}
                            title="Lisa Google kalendrisse"
                          >
                            <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                          </a>
                        ) : null}
                        <ChevronDown
                          className={`h-5 w-5 text-slate-300 transition-transform duration-300 group-hover:text-blue-300 dark:text-slate-600 dark:group-hover:text-blue-500 ${expandedModule === idx ? 'rotate-180 text-blue-500' : ''}`}
                        />
                      </div>
                    </div>
                    
                    {/* Accordion Content */}
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${expandedModule === idx ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden px-4 sm:px-6">
                        <div className="pt-3 pb-2 sm:pl-[4.5rem] border-t border-slate-200/50 dark:border-white/5 mt-2">
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {renderTextWithLinks(mod.details)}
                          </p>
                          {calendarUrl ? (
                            <a
                              href={calendarUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <Calendar className="h-4 w-4" />
                              Lisa Google kalendrisse
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <p className="text-right text-xs text-slate-500 dark:text-slate-500 italic mt-4 px-2">
                {footerNote}
              </p>
            </div>

          </div>
        </div>
      </MarketingContainer>
    </section>
  )
}
