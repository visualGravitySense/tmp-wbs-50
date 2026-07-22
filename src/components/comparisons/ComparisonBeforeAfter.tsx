import React from 'react';
import { SplitHeader, marketingInsetCardClass } from '@/components/ui';
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge';

interface TransformationItem {
  before?: string;
  after?: string;
}

interface BeforeAfterData {
  title?: string;
  eyebrow?: string;
  highlightText?: string;
  transformations?: TransformationItem[];
  materialsTitle?: string;
  materialsDescription?: string;
  bookTitle?: string;
  bookDescription?: string;
  resultTitle?: string;
  resultDescription?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface BeforeAfterProps {
  data?: BeforeAfterData;
}

export default function ComparisonBeforeAfter({ data }: BeforeAfterProps) {
  const transformationData = data?.transformations?.length ? data.transformations : [
    { before: 'Reaktiivne tegutseja', after: 'Süsteemne juht' },
    { before: 'Taktikaline käitumine', after: 'Strateegiline sünkroniseeritus' },
    { before: 'Raiskamine nähtamatu', after: 'Väärtus mõõdetav' },
    { before: 'Vastutus hajutatud', after: 'Rollid selged, süsteem töötab' },
  ];

  return (
    <>
        {/* Main transformation block */}
        <div className="w-full">
          <SplitHeader
            title={`${data?.title || 'Programmi mõju sinu'}, ${data?.highlightText || 'tööriistakastile'}`}
            eyebrow={<EyebrowPillBadge text={data?.eyebrow || 'Mõõda → Mõista → Muuda → Tulemus'} />}
            align="responsive"
            className="mb-10"
          />

          {/* Consolidated comparison list in one unified container */}
          <div className={marketingInsetCardClass}>
            {/* Column labels (Enne / Pärast) on desktop */}
            <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 pb-4 border-b border-slate-100 dark:border-slate-800/30 text-xs font-bold uppercase tracking-widest text-slate-400">
              <div>Enne</div>
              <div className="w-8" />
              <div>Pärast programmi</div>
            </div>

            {/* List of transformations with clean divider lines */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/30">
              {transformationData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8 py-4 first:pt-2 last:pb-2"
                >
                  {/* Left Column ("Enne"): Muted, low-contrast, line-through */}
                  <div className="text-slate-500 dark:text-slate-400 font-medium text-base md:text-lg line-through decoration-slate-300 dark:decoration-slate-800">
                    {item.before}
                  </div>

                  {/* Center Column (Transition Arrow) */}
                  <div className="flex justify-start md:justify-center">
                    <div className="text-blue-500 bg-blue-50 dark:bg-blue-950/40 p-2 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                      <svg
                        className="h-4 w-4 rotate-90 md:rotate-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Right Column ("Pärast"): Hero, bold, deep navy */}
                  <div className="text-slate-900 dark:text-white font-semibold tracking-tight text-base md:text-lg">
                    {item.after}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compact bottom info cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800/30 pt-8">
            
            {/* Materials Card */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-4 md:p-5 dark:border-slate-800/50 dark:bg-slate-900/10">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {data?.materialsTitle || 'Materjalid'}
              </p>
              <p className="text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-355">
                {data?.materialsDescription || 'Kõik vajalikud tabelid, tööriistad ja kontroll-lehed, mis jäävad sulle päriseks.'}
              </p>
            </div>

            {/* Book Card */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-4 md:p-5 dark:border-slate-800/50 dark:bg-slate-900/10">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {data?.bookTitle || 'Raamat'}
              </p>
              <p className="text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-355">
                {data?.bookDescription || 'Eksklusiivne tootmisjuhtimise käsiraamat koos parimate praktikatega.'}
              </p>
            </div>

            {/* Result Card: stands out with premium soft tint */}
            <div className="rounded-xl border border-blue-100/50 bg-blue-50/60 p-4 md:p-5 dark:border-blue-900/20 dark:bg-blue-950/20">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {data?.resultTitle || 'Tulemus'}
              </p>
              <p className="text-xs font-bold leading-relaxed text-slate-900 dark:text-white">
                {data?.resultDescription || 'Valmis süsteem, mida saad koheselt oma tehases juurutama hakata.'}
              </p>
            </div>

          </div>
        </div>
    </>
  );
}
