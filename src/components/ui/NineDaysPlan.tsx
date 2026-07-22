"use client";

import React, { useEffect, useRef, useState } from 'react';
import { BrandVibrantButton, GlassPanel } from '@/components/ui';
import type { NineDaysMiniDay } from '@/lib/nineDays/nineDaysMiniDefaults';
import {
  NINE_DAYS_MINI_DAY_COUNT,
  resolveNineDaysMiniDays,
  type NineDaysMiniDaysSource,
} from '@/lib/nineDays/resolveNineDaysMiniDays';

/** Lühike silt päevanupu all (nt «Mõtteviis» → MÕTTEVIIS). */
function shortDayTag(day: NineDaysMiniDay): string {
  const title = day.title?.trim() ?? ''
  const sep = title.indexOf(' — ')
  if (sep > 0) {
    const tag = title.slice(0, sep).trim()
    if (tag.length > 0 && tag.length <= 14) return tag.toUpperCase()
  }
  if (day.dayNumber === 1) return 'PÄEV'
  return `PÄEV ${day.dayNumber ?? ''}`.trim()
}

interface NineDaysPlanData extends NineDaysMiniDaysSource {
  overviewLabel?: string;
  dayPickerLabel?: string;
  progressLabel?: string;
  dayBadgePrefix?: string;
  habitLabel?: string;
  planCtaPrefix?: string;
  planCtaLinkText?: string;
  planCtaLinkUrl?: string;
  planButtonText?: string;
  planButtonLink?: string;
  days?: NineDaysMiniDay[];
}

interface NineDaysPlanProps {
  data?: NineDaysPlanData;
}

function formatProgressLabel(template: string, viewed: number, total: number): string {
  return template.replace('{viewed}', String(viewed)).replace('{total}', String(total));
}

export default function NineDaysPlan({ data }: NineDaysPlanProps) {
  const resolvedDays = resolveNineDaysMiniDays(data);
  const daysData = resolvedDays.map((day, index) => ({
    id: day.dayNumber || index + 1,
    title: day.title || `Päev ${index + 1}`,
    subtitle: day.subtitle || '',
    habit: day.habit || '',
    tag: shortDayTag(day),
    companyPain: day.companyPain || [],
    companyPainTitle: day.companyPainTitle || '',
    shortSolution: day.shortSolution || [],
    participantWins: day.participantWins || '',
    companyWins: day.companyWins || '',
    typeLabel: day.typeLabel || '',
  }));
  const totalDays = daysData.length || NINE_DAYS_MINI_DAY_COUNT;
  const [activeDay, setActiveDay] = useState(1);
  const [visitedDays, setVisitedDays] = useState<number[]>([1]);
  const dayScrollRef = useRef<HTMLDivElement | null>(null);
  const dayItemRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const sectionLabel =
    data?.overviewLabel?.trim() ||
    data?.dayPickerLabel?.trim() ||
    '9-päevane teekond — ülevaade';
  const progressTemplate = data?.progressLabel?.trim() || '{viewed}/{total} päeva vaadatud';
  const dayBadgePrefix = data?.dayBadgePrefix?.trim() || 'Päev';

  /**
   * Обработчик клика по дню: обновляет активный день и историю посещений
   */
  const handleDayClick = (day: number) => {
    setActiveDay(day);
    if (!visitedDays.includes(day)) {
      setVisitedDays(prev => [...prev, day]);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(min-width: 768px)').matches) return;

    const container = dayScrollRef.current;
    const item = dayItemRefs.current[activeDay];
    if (!container || !item) return;

    const timer = setTimeout(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const target = item.offsetLeft - (container.clientWidth - item.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, Math.min(target, maxScroll)),
        behavior: 'smooth',
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [activeDay]);

  // Поиск данных для текущего отображаемого дня[cite: 6]
  const currentData = daysData.find((d) => d.id === activeDay) || {
    title: `Päev ${activeDay}`,
    subtitle: '',
    habit: '',
    tag: '',
    companyPain: [] as string[],
    companyPainTitle: '',
    shortSolution: [] as string[],
    participantWins: '',
    companyWins: '',
    typeLabel: '',
  };

  return (
    <div className="nine-days-plan-container relative mx-auto w-full min-w-0 max-w-4xl space-y-10 transition-colors duration-500">
      <div className="bg-premium-grid" />
      <div className="min-w-0 space-y-4 sticky top-[60px] z-40 max-md:-mx-4 max-md:px-4 max-md:py-3 max-md:bg-transparent max-md:backdrop-blur-md max-md:shadow-sm max-md:border-b max-md:border-slate-200/60 dark:max-md:border-white/10 md:static md:bg-transparent md:border-none md:shadow-none md:p-0 transition-all">
        <h2 className="nine-days-plan-section-label text-xs font-bold text-slate-400 uppercase tracking-widest text-center sm:text-left">
          {sectionLabel}
        </h2>
        
        {/* Päevad: mobiil — keritav riba taustaga; md+ — 9 nuppu ilma kastita */}
        <div className="nine-days-plan-nav relative min-w-0 max-md:overflow-x-hidden max-md:rounded-2xl max-md:border max-md:border-slate-200/70 max-md:bg-transparent max-md:p-3 max-md:shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:max-md:border-white/10 dark:max-md:bg-transparent">
          <div
            ref={dayScrollRef}
            className="flex min-w-0 items-stretch gap-2 overflow-x-auto overscroll-x-contain px-0.5 py-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory max-md:touch-auto md:justify-between md:gap-0 md:overflow-visible md:px-0 md:py-4 md:snap-none"
          >
            {daysData.map((dayItem) => {
              const day = dayItem.id;
              const isActive = activeDay === day;
              const isVisited = visitedDays.includes(day);
 
              return (
                <div
                  key={day}
                  ref={(el) => {
                    dayItemRefs.current[day] = el;
                  }}
                  className={`flex min-w-[4.25rem] shrink-0 snap-center flex-col items-center gap-1.5 md:min-w-0 md:flex-1 md:shrink md:snap-align-none ${
                    isActive ? 'md:z-10' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleDayClick(day)}
                    aria-label={`${dayBadgePrefix} ${day}: ${dayItem.title}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`
                      nine-days-plan-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold transition-all duration-300 ease-out cursor-pointer
                      md:h-11 md:w-11
                      ${isActive
                        ? 'day-active-vibrant z-10 text-white shadow-lg'
                        : isVisited
                          ? 'day-button-visited'
                          : 'day-button-inactive hover:border-blue-400'}
                    `}
                  >
                    {isActive || !isVisited ? (
                      <span>{day}</span>
                    ) : (
                      <svg className="h-5 w-5 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
 
                  <span
                    className={`max-w-[4.5rem] truncate text-center text-[9px] font-bold uppercase leading-tight tracking-wide transition-colors md:hidden ${
                      isActive
                        ? 'text-[#2563EB] dark:text-blue-300'
                        : isVisited
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {dayItem.tag}
                  </span>
 
                  <div
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-500 indicator-dot md:h-1.5 md:w-1.5 ${
                      isVisited
                        ? `scale-100 ${isActive ? 'bg-[#2563EB]' : 'bg-emerald-500'}`
                        : 'scale-0 opacity-0'
                    }`}
                    aria-hidden
                  />
                </div>
              );
            })}
          </div>
        </div>
 
        {/* Прогресс-бар на основе количества просмотренных дней */}
        <div className="space-y-2">
          <div className="w-full h-[2px] bg-[rgb(var(--color-foreground))/0.1] relative">
            <div 
              className="nine-days-plan-progress-fill absolute left-0 top-0 h-full bg-[#2563EB] transition-all duration-700 ease-out" 
              style={{ width: `${(visitedDays.length / totalDays) * 100}%` }}
            />
          </div>
          <p className="text-sm font-medium text-slate-400 progress-label">
            {formatProgressLabel(progressTemplate, visitedDays.length, totalDays)}
          </p>
        </div>
      </div>
 
      {/* Основная Glass карточка контента */}
      <GlassPanel key={activeDay} className="nine-days-plan-card w-full p-8 sm:p-10 space-y-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Декоративные эффекты из глобальных стилей */}
        <div className="mega-soft-glass-inner-glow" />
        <div className="mega-soft-glass-reflection" />
 
        {/* Верхняя панель: Инфо о текущем дне */}
        <div className="nine-days-plan-card-fraction flex justify-between items-center text-sm font-bold tracking-widest uppercase relative z-10">
          <span className="text-blue-600 flex items-center gap-2">
            <span>{dayBadgePrefix} {activeDay}</span>
            {currentData.typeLabel ? (
              <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/20">
                {currentData.typeLabel}
              </span>
            ) : null}
          </span>
          <span className="text-slate-400">{activeDay} / {totalDays}</span>
        </div>
 
        {/* Плашка с привычкой */}
        <GlassPanel variant="inner" className="nine-days-plan-habit-box relative z-10">
          <p className="text-xs italic text-slate-500 mb-2 tracking-wide uppercase font-bold text-label">
            {data?.habitLabel || 'Harjumus, mida sa omandad:'}
          </p>
          <p className="text-lg font-bold text-[rgb(var(--color-foreground))] leading-tight text-quote">
            <span className="text-quote-quote text-blue-500">"</span>
            {currentData.habit}
            <span className="text-quote-quote text-blue-500">"</span>
          </p>
        </GlassPanel>
 
        {/* Заголовок и подзаголовок */}
        <div className="space-y-4 relative z-10">
          <h3 className="text-3xl sm:text-4xl font-black text-[rgb(var(--color-foreground))] tracking-tight leading-none transition-colors duration-500 title">
            {currentData.title}
          </h3>
          <p className="text-lg text-[rgb(var(--color-foreground))/0.6] font-medium subtitle">
            {currentData.subtitle}
          </p>

          {/* VALU ETTEVÕTTES (companyPain) */}
          {currentData.companyPain && currentData.companyPain.length > 0 ? (
            <div className="mt-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100/60 dark:border-blue-800/30">
              <h4 className="text-[10px] font-black text-blue-700 dark:text-blue-400 tracking-widest mb-3">
                {currentData.companyPainTitle || 'Valu ettevõttes'}
              </h4>
              <ul className="space-y-2">
                {currentData.companyPain.map((pain: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <span className="text-blue-600/80 mt-0.5 flex-shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-[10px] font-bold">
                      •
                    </span>
                    <span className="leading-snug">{pain}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Mida sel päeval teeme */}
          <div className="mt-6 mb-6">
            <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Mida sel päeval teeme</h4>
            <ul className="space-y-2.5">
              {(currentData.shortSolution && currentData.shortSolution.length > 0
                ? currentData.shortSolution
                : ['Samm 1', 'Samm 2', 'Samm 3']
              ).map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 bg-slate-50/80 dark:bg-slate-900/40 rounded-lg p-2.5 px-3 border border-slate-200/60 dark:border-white/5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-700 text-[10px] font-black dark:bg-emerald-900/50 dark:text-emerald-300 shadow-sm">
                    {i + 1}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Osaleja saab & Juht võidab */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100/60 dark:border-blue-800/30">
              <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1.5">Osaleja saab</h4>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {currentData.participantWins || 'Kaardistab oma juhtimissüsteemi ja määratleb rolli selles selgelt'}
              </p>
            </div>
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-4 border border-emerald-100/60 dark:border-emerald-800/30">
              <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1.5">Juht / Org võidab</h4>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {currentData.companyWins || 'Selgem struktuur, kiirem otsustamine, vähem segadust'}
              </p>
            </div>
          </div>
        </div>

        {/* Внутренняя разделительная линия */}
        <div className="nine-days-plan-divider w-full h-[2px] bg-[rgb(var(--color-foreground))/0.1] relative z-10">
          <div 
            className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-1000 progress-line" 
            style={{ width: `${(activeDay / totalDays) * 100}%` }}
          />
        </div>

        {/* Призыв к действию и кнопка регистрации */}
        <div className="nine-days-plan-cta flex flex-col gap-8 relative z-10">
          <p className="text-[rgb(var(--color-foreground))/0.5] font-medium leading-relaxed cta-text">
            {(data?.planCtaPrefix || 'Päev {day} kõlab huvitavalt?').replace('{day}', String(activeDay))}{' '}
            <a
              href={`${data?.planCtaLinkUrl || '/koolitus'}?day=${activeDay}`}
              className="text-blue-600 underline decoration-2 underline-offset-4 hover:text-blue-700 dark:hover:text-blue-400 transition-colors cta-link"
            >
              {data?.planCtaLinkText || 'Registreeru ja ela see päev ise läbi.'}
            </a>
          </p>

          <div className="nine-days-plan-cta-btn">
            <BrandVibrantButton href={`${data?.planButtonLink || '/koolitus'}?day=${activeDay}`} variant="wide">
              <span>{data?.planButtonText || 'Registreeru programmi →'}</span>
              <span className="sr-only"> (valitud päev {activeDay})</span>
            </BrandVibrantButton>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
