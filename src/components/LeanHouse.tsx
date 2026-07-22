import { Container, SplitHeader, EyebrowPillBadge } from '@/components/ui'
import React from 'react'

interface LeanHouseProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundColor?: string
  roof?: {
    title?: string
    subtitle?: string
  }
  leftPillar?: {
    title?: string
    shortTitle?: string
    items?: string[]
  }
  center?: {
    title?: string
    systems?: Array<{
      name?: string
      description?: string
    }>
  }
  rightPillar?: {
    title?: string
    shortTitle?: string
    items?: string[]
  }
  foundation?: {
    title?: string
    items?: Array<{
      title?: string
      description?: string
    }>
  }
  sideAnnotations?: {
    left?: {
      title?: string
      subtitle?: string
    }
    right?: {
      title?: string
      subtitle?: string
    }
  }
  benefits?: Array<{
    icon?: string
    title?: string
    description?: string
  }>
}

export default function LeanHouse({ 
  title = "LEAN Süsteemi Arhitektuur", 
  subtitle = "LEAN MAJA Mudel",
  description = "Mõista, kuidas LEAN süsteem töötab läbi tõestatud LEAN MAJA raamistiku",
  backgroundColor = "bg-transparent", // Light/Dark base
  roof,
  leftPillar,
  center,
  rightPillar,
  foundation,
  benefits
}: LeanHouseProps) {
  const resolvedBenefits = Array.isArray(benefits)
    ? benefits.filter(
        (item): item is { icon?: string; title?: string; description?: string } =>
          Boolean(item && typeof item === 'object'),
      )
    : undefined

  const resolvedLeftItems = Array.isArray(leftPillar?.items)
    ? leftPillar.items.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : undefined

  const resolvedRightItems = Array.isArray(rightPillar?.items)
    ? rightPillar.items.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : undefined

  const resolvedFoundationItems = Array.isArray(foundation?.items)
    ? foundation.items.filter(
        (item): item is { title?: string; description?: string } =>
          Boolean(item && typeof item === 'object' && item.title),
      )
    : undefined

  const resolvedCenterSystems = Array.isArray(center?.systems)
    ? center.systems.filter(
        (item): item is { name?: string; description?: string } =>
          Boolean(item && typeof item === 'object'),
      )
    : undefined

  const resolvedBg = 'bg-transparent';

  const getBenefitIconTheme = (title?: string) => {
    return 'shadow-inner border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800'
  }

  const renderBenefitIcon = (title?: string, fallbackIcon?: string) => {
    if (title?.includes('40%')) {
      return (
        <img 
          src="/raiskamine.png" 
          alt={title} 
          className="w-full h-full object-cover z-10" 
        />
      )
    }
    if (title?.includes('Kvaliteedi')) {
      return (
        <img 
          src="/kvaliteet.png" 
          alt={title} 
          className="w-full h-full object-cover z-10" 
        />
      )
    }
    if (title?.includes('50%')) {
      return (
        <img 
          src="/kiirem-tarne.png" 
          alt={title} 
          className="w-full h-full object-cover z-10" 
        />
      )
    }
    return (
      <svg className="w-6 h-6 text-slate-400 dark:text-slate-500 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  }

  return (
    <section className={`relative overflow-hidden ${resolvedBg} py-24 sm:py-32 font-sans transition-colors duration-500`}>
      {/* Background Layers */}
      {resolvedBg !== 'bg-transparent' && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50 dark:from-blue-900/20 dark:via-[#030712] dark:to-[#030712] transition-colors duration-500" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 dark:opacity-30" />

      <Container size="5xl" padding="default" className="relative z-10">
        
        {/* Header section */}
        <div className="mx-auto mb-16 flex justify-center">
          <SplitHeader
            eyebrow={<EyebrowPillBadge text={subtitle} />}
            title={title}
            subtitle={description}
            align="center"
          />
        </div>

        {/* --- THE LEAN HOUSE STRUCTURE --- */}
        <div className="mx-auto max-w-6xl">
          
          {/* 1. ROOF - High-tech / Glassmorphic top banner */}
          <div className="group relative mb-8 rounded-[32px] border border-slate-200/50 bg-white/30 dark:border-white/10 dark:bg-slate-900/30 shadow-sm backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_30px_60px_rgba(59,130,246,0.08)] px-6 py-12 md:px-12 md:py-16 overflow-hidden">
            
            {/* Inner top glow line */}
            <div className="absolute top-0 left-1/2 w-3/4 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:via-blue-500/50" />
            
            <div className="mb-12 text-center relative z-10">
              <div role="heading" aria-level={3} className="mb-3 text-3xl font-black tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-white dark:to-slate-400 md:text-4xl lg:text-5xl dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] uppercase">
                {roof?.title || 'TOOTLIKKUS JA KVALITEET'}
              </div>
              <p className="text-xs font-bold tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
                {roof?.subtitle || 'Maksimaalne väärtus kliendile'}
              </p>
            </div>

            {/* Roof Cards (Glassmorphic) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 relative z-10">
              {(resolvedBenefits || [
                { icon: '📉', title: '40% Vähem Raiskamist', description: 'Kõrvalda väärtustmitte lisavad tegevused' },
                { icon: '✅', title: 'Kvaliteedi Üleolek', description: 'Sisseehitatud kvaliteet igas sammus' },
                { icon: '⚡', title: '50% Kiirem Tarne', description: 'Voolujooneline ja täpne tootmisprotsess' }
              ]).map((benefit, i) => {
                let textClassLight = "text-slate-800";
                let textClassDark = "dark:text-white";
                
                if (benefit.title?.includes('40%')) {
                  textClassLight = "text-red-600";
                  textClassDark = "dark:text-red-400 dark:drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]";
                }
                if (benefit.title?.includes('50%')) {
                  textClassLight = "text-orange-600";
                  textClassDark = "dark:text-orange-400 dark:drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]";
                }
                if (benefit.title?.includes('Kvaliteedi')) {
                  textClassLight = "text-green-600";
                  textClassDark = "dark:text-green-400 dark:drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]";
                }

                return (
                  <div 
                    key={i} 
                    className="group/card flex flex-col items-center rounded-2xl border border-slate-200/40 bg-white/30 p-8 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-350 hover:bg-white/55 hover:shadow-md dark:border-white/5 dark:bg-white/[0.01] dark:shadow-none dark:hover:border-white/10 dark:hover:bg-white/[0.03]"
                  >
                    <div
                      className={`mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/40 bg-slate-50 shadow-inner relative overflow-hidden transition-transform duration-500 group-hover/card:scale-110 dark:border-white/10 dark:bg-black/40 ${getBenefitIconTheme(benefit.title)}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none dark:from-white/10" />
                      {renderBenefitIcon(benefit.title, benefit.icon)}
                    </div>
                    <div role="heading" aria-level={4} className={`mb-3 text-base font-extrabold uppercase tracking-tight ${textClassLight} ${textClassDark}`}>
                      {benefit.title}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-stretch">
            
            {/* 2. LEFT PILLAR - JIT */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="group h-full flex flex-col rounded-[24px] border border-slate-200/40 bg-white/30 p-8 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.05)] relative overflow-hidden dark:border-white/10 dark:bg-slate-900/30 dark:shadow-none dark:hover:border-blue-500/40 dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] text-slate-900 dark:text-white">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity dark:via-blue-500/50" />
                <span className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-500 dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                  Just-In-Time
                </span>
                <div role="heading" aria-level={4} className="mb-8 text-lg font-extrabold uppercase leading-tight text-slate-900 dark:text-white tracking-tight">
                  {leftPillar?.title || 'Õigel ajal tarnimine'}
                </div>
                <ul className="flex w-full flex-col gap-4 mt-auto">
                  {(resolvedLeftItems || ['PULL süsteem', 'Taktiaeg', 'Voolavus']).map((item, i) => (
                    <li key={i} className="flex items-center justify-center border-b border-slate-200/60 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 dark:hover:text-blue-400 dark:border-white/5 dark:text-slate-300 dark:hover:text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. CENTER - Core Systems (Glowing Core) */}
            <div className="md:col-span-4 lg:col-span-6 relative flex flex-col justify-center">
              {/* Magic Energy Core Effect - Soft in Light, Vivid in Dark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-500/5 dark:bg-cyan-500/20 blur-[80px] animate-pulse pointer-events-none" />
              
              <div className="group h-full flex flex-col items-center justify-center rounded-[24px] border border-slate-200/40 bg-white/40 dark:border-cyan-500/30 dark:bg-slate-900/30 p-8 shadow-[0_20px_50px_rgba(59,130,246,0.05)] dark:shadow-[0_20px_50px_rgba(6,182,212,0.2)] relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-blue-300 dark:hover:border-cyan-400 hover:shadow-[0_25px_60px_rgba(59,130,246,0.12)] dark:hover:shadow-[0_25px_60px_rgba(6,182,212,0.35)] text-slate-900 dark:text-white">
                {/* Specular glass glare */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/25 dark:via-cyan-400/50 to-transparent opacity-80" />

                <div role="heading" aria-level={4} className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-cyan-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.15)] dark:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                  {center?.title || 'KESKSED SÜSTEEMID'}
                </div>

                {/* Animated Glowing Orb */}
                <div className="relative my-6 flex h-52 w-full max-w-[280px] items-center justify-center overflow-visible">
                  {/* Backdrop Glow layers */}
                  <div className="absolute h-40 w-40 rounded-full bg-blue-500/15 dark:bg-cyan-500/30 blur-2xl animate-pulse" />
                  <div className="absolute h-28 w-28 rounded-full bg-cyan-500/10 dark:bg-blue-500/25 blur-xl animate-ping opacity-60" />
                  
                  {/* The Orb Shape */}
                  <div className="absolute h-44 w-44 rounded-full bg-gradient-to-br from-cyan-300 via-blue-500/60 to-indigo-600/40 dark:from-cyan-400/80 dark:via-blue-600/40 dark:to-indigo-950/90 shadow-[inset_0_4px_12px_rgba(255,255,255,0.8),0_12px_40px_rgba(59,130,246,0.2),inset_0_-8px_20px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_4px_12px_rgba(255,255,255,0.6),0_12px_40px_rgba(6,182,212,0.4),inset_0_-8px_20px_rgba(0,0,0,0.8)] border border-blue-200/50 dark:border-cyan-300/40 backdrop-blur-sm animate-[pulse_6s_ease-in-out_infinite]">
                    {/* Inner glowing core */}
                    <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)] animate-pulse" />
                  </div>

                  {/* SVG Particle Net Mesh Overlay */}
                  <div className="absolute h-48 w-48 animate-[spin_40s_linear_infinite] opacity-70 dark:opacity-80 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400/30 dark:text-cyan-300/45">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 2" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 1" />
                      <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.2" />
                      <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="currentColor" strokeWidth="0.15" strokeDasharray="3 3" />
                      
                      {/* Dots */}
                      <circle cx="50" cy="10" r="1" fill="currentColor" />
                      <circle cx="50" cy="90" r="1" fill="currentColor" />
                      <circle cx="10" cy="50" r="1" fill="currentColor" />
                      <circle cx="90" cy="50" r="1" fill="currentColor" />
                      <circle cx="22" cy="22" r="1" fill="currentColor" />
                      <circle cx="78" cy="78" r="1" fill="currentColor" />
                      <circle cx="22" cy="78" r="1" fill="currentColor" />
                      <circle cx="78" cy="22" r="1" fill="currentColor" />
                      
                      {/* Constellation lines */}
                      <path d="M22 22 Q50 30 78 22 Q70 50 78 78 Q50 70 22 78 Q30 50 22 22" fill="none" stroke="currentColor" strokeWidth="0.25" />
                    </svg>
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute inset-0 animate-[spin_25s_linear_infinite] opacity-60 pointer-events-none">
                    <div className="absolute top-10 left-12 h-1.5 w-1.5 rounded-full bg-blue-400 dark:bg-cyan-300 blur-[0.5px]" />
                    <div className="absolute bottom-12 right-10 h-2 w-2 rounded-full bg-cyan-400 dark:bg-blue-300 blur-[0.5px] animate-ping" />
                    <div className="absolute top-20 right-8 h-1 w-1 rounded-full bg-slate-400 dark:bg-white" />
                  </div>

                  {/* Core Word - Beautiful Serif Italic with strong contrast */}
                  <div className="absolute z-10 text-center select-none filter drop-shadow-[0_2px_12px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_4px_18px_rgba(6,182,212,0.95)]">
                    <span className="font-sans text-[2rem] sm:text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 dark:from-white dark:via-cyan-200 dark:to-white bg-clip-text text-transparent tracking-widest uppercase leading-none block">
                      {resolvedCenterSystems?.[0]?.name || center?.systems?.[0]?.name || 'INIMLIKKUS'}
                    </span>
                  </div>
                </div>

                {/* Vundament Pointer Badge */}
                <div className="relative mt-2 flex flex-col items-center select-none">
                  {/* Up pointer triangle */}
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-blue-500/10 dark:border-b-cyan-500/20" />
                  <div className="rounded-xl border border-blue-500/20 bg-blue-50/80 dark:border-cyan-500/30 dark:bg-slate-900/90 px-5 py-2 shadow-[0_4px_12px_rgba(59,130,246,0.05)] dark:shadow-[0_4px_12px_rgba(6,182,212,0.15)] flex items-center justify-center">
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-blue-700 dark:text-blue-400">
                      Vundament
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* 4. RIGHT PILLAR - Jidoka */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="group h-full flex flex-col rounded-[24px] border border-slate-200/40 bg-white/30 p-8 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.05)] relative overflow-hidden dark:border-white/10 dark:bg-slate-900/30 dark:shadow-none dark:hover:border-emerald-500/40 dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] text-slate-900 dark:text-white">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity dark:via-emerald-500/50" />
                <span className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-500 dark:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                  Jidoka
                </span>
                <div role="heading" aria-level={4} className="mb-8 text-lg font-extrabold uppercase leading-tight text-slate-900 dark:text-white tracking-tight">
                  {rightPillar?.title || 'Sisseehitatud kvaliteet'}
                </div>
                <ul className="flex w-full flex-col gap-4 mt-auto">
                  {(resolvedRightItems || ['Andon', 'Poka-Yoke', 'Probleemide lahendus']).map((item, i) => (
                    <li key={i} className="flex items-center justify-center border-b border-slate-200/60 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:border-white/5 dark:text-slate-300 dark:hover:text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* 5. FOUNDATION - Heavy Base */}
          <div className="mt-8 group relative rounded-[24px] border border-slate-200/40 bg-white/30 px-8 py-10 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:border-slate-800 dark:bg-slate-900/40">
            {/* Glowing top line */}
            <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-slate-400/50 to-transparent opacity-80 dark:via-cyan-500/70" />
            
            <div role="heading" aria-level={4} className="mb-10 text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
              {foundation?.title || 'STABIILNE VUNDAMENT'}
            </div>
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              {(resolvedFoundationItems || [
                { title: 'Heijunka', description: 'Koormuse tasandamine' },
                { title: 'Visuaalne juhtimine', description: '5S ja info läbipaistvus' },
                { title: 'Stabiilsus', description: 'Seadmete ja protsesside töökindlus' }
              ]).map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <p className="mb-2 text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </Container>
    </section>
  )
}