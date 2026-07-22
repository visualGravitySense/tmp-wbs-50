import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BrandVibrantButton, WhiteButton, Container, SectionBadge } from '@/components/ui';
import { sanitizeEyebrowText } from '@/components/ui/SectionBadge';
import { GradientStatValue } from '@/components/GradientStatValue';
import { GraduationCap, Phone } from 'lucide-react';

export type AboutSplitHeroProps = {
  eyebrow?: string;
  headline: string;
  subtitle?: string;
  description?: string;
  linkedinUrl?: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  stats?: {
    stat1Number?: string;
    stat1Label?: string;
    stat2Number?: string;
    stat2Label?: string;
    stat3Number?: string;
    stat3Label?: string;
  };
  floatingBadges?: Array<{
    text: string;
    label?: string;
    icon?: string;
    positionX?: number;
    positionY?: number;
  }>;
};

export default function AboutSplitHero({
  eyebrow,
  headline,
  subtitle,
  description,
  linkedinUrl,
  primaryButton,
  secondaryButton,
  image,
  stats,
  floatingBadges,
}: AboutSplitHeroProps) {
  return (
    <section className="site-hero site-hero--about-split relative w-full overflow-hidden bg-[#F8F9FB] pt-28 pb-16 text-slate-900 dark:bg-slate-950 dark:text-white md:pt-36">
      <Container size="6xl" className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Side Content */}
          <div className="order-last flex w-full flex-col items-center justify-center text-center lg:order-first lg:col-span-7 lg:items-start lg:text-left">
            <SectionBadge flow>
              {sanitizeEyebrowText(eyebrow || 'Koolitaja')}
            </SectionBadge>
            
            <h1 className="mb-2 mt-4 font-sans text-3xl font-extrabold leading-[1.05] tracking-tight text-[#122136] dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {headline || 'Your Name'}
            </h1>
            
            <h2 className="text-blue-600 dark:text-blue-400 font-[600] text-base lg:text-lg xl:text-xl mt-2">
              Tootmisjuhtimine, LEAN-AGILE ekspert
            </h2>
            
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl text-sm lg:text-base">
              25 aastat tootmispõrandal — õpetan seda, mida olen ise teinud, mitte seda, mida raamatutest lugesin.
            </p>
            
            <div className="site-hero-cta-row mt-6 flex flex-wrap justify-center gap-4 lg:justify-start">
              {primaryButton ? (
                <BrandVibrantButton href="/kontakt" icon={Phone}>
                  {primaryButton.text?.replace(/\s*(?:->|=>|→|>|›)\s*$/, '') || 'Kontakt'}
                </BrandVibrantButton>
              ) : null}
              
              {secondaryButton ? (
                <WhiteButton href="/koolitus" icon={GraduationCap}>
                  {secondaryButton.text?.replace(/\s*(?:->|=>|→|>|›)\s*$/, '') || 'Koolitused'}
                </WhiteButton>
              ) : null}
            </div>

            {/* Bottom Stat Bar */}
            <div className="mt-8">
              <div className="flex flex-wrap gap-x-12 gap-y-8 lg:gap-x-16 px-2">
                
                {/* Stat 1 */}
                <div className="flex flex-col text-center">
                  <GradientStatValue value={stats?.stat1Number || '147+'} numberClassName="!text-xl lg:!text-2xl xl:!text-3xl font-[700]" />
                  <div className="mt-2 text-[10px] lg:text-xs font-bold uppercase tracking-wider text-[rgb(var(--color-foreground)/0.4)] dark:text-slate-400">
                    {stats?.stat1Label || 'LÕPETAJAT'}
                  </div>
                </div>
                
                {/* Stat 2 */}
                <div className="flex flex-col text-center">
                  <GradientStatValue value={stats?.stat2Number || '+31%'} numberClassName="!text-xl lg:!text-2xl xl:!text-3xl font-[700]" />
                  <div className="mt-2 text-[10px] lg:text-xs font-bold uppercase tracking-wider text-[rgb(var(--color-foreground)/0.4)] dark:text-slate-400">
                    {stats?.stat2Label || 'OEE KASV'}
                  </div>
                </div>

                {/* Stat 3 (New - Tehast) */}
                <div className="flex flex-col text-center">
                  <GradientStatValue value="100+" numberClassName="!text-xl lg:!text-2xl xl:!text-3xl font-[700]" />
                  <div className="mt-2 text-[10px] lg:text-xs font-bold uppercase tracking-wider text-[rgb(var(--color-foreground)/0.4)] dark:text-slate-400">
                    TEHAST
                  </div>
                </div>
                
                {/* Stat 4 */}
                <div className="flex flex-col text-center">
                  <GradientStatValue value={stats?.stat3Number || '4.9/5'} numberClassName="!text-xl lg:!text-2xl xl:!text-3xl font-[700]" />
                  <div className="mt-2 text-[10px] lg:text-xs font-bold uppercase tracking-wider text-[rgb(var(--color-foreground)/0.4)] dark:text-slate-400">
                    {stats?.stat3Label || 'HINNANG'}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side Photo Wrapper */}
          <div className="w-full lg:col-span-5 flex justify-center items-center order-first lg:order-last px-6 sm:px-0">
            {/* Base Card Container with overflow-visible to prevent clipping */}
            <div className="relative w-full max-w-sm mx-auto transition-all duration-500 hover:scale-[1.015] overflow-visible">
              
              {/* Dynamic Floating Ambient Badges */}
              {(floatingBadges && floatingBadges.length > 0 ? floatingBadges : [
                { label: 'VISIIDID', text: '100+ tehast külastatud', icon: 'factory', positionX: 5, positionY: 20 },
                { label: 'HINNANG', text: '4.9 / 5 koolituse hinnang', icon: 'star', positionX: 5, positionY: 75 }
              ]).map((badge, idx) => {
                const x = badge.positionX ?? (idx === 0 ? 5 : 5);
                const y = badge.positionY ?? (idx === 0 ? 20 : 75);
                const isStar = badge.icon === 'star';

                return (
                  <div
                    key={idx}
                    className="absolute bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-100 dark:border-white/5 p-3 rounded-xl shadow-md z-10 flex items-center gap-2.5 min-w-[170px] max-w-[190px] select-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {isStar ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-500 shrink-0">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )}
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-black uppercase text-slate-700 dark:text-slate-300 leading-tight">
                        {badge.label || (isStar ? 'Hinnang' : 'Visiidid')}
                      </span>
                      <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 leading-tight">
                        {badge.text}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Portrait Container */}
              <div className="relative aspect-[4/5] w-full rounded-t-[24px] overflow-hidden shadow-lg border-t border-x border-slate-100 dark:border-white/5">
                {image?.src ? (
                  <Image
                    src={image.src}
                    alt={image.alt || 'Your Name'}
                    fill
                    sizes="(max-w-768px) 384px, 450px"
                    className="w-full h-full object-cover object-top filter-none"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
                )}
              </div>

              {/* Lower Competency & Info Panel */}
              <div className="bg-white border-x border-b border-slate-100 rounded-b-[24px] p-5 dark:bg-slate-900 dark:border-white/5 shadow-md flex items-end justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="space-y-0.5 text-left">
                    <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                      Your Name
                    </h3>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mt-1">
                      LEAN · TPS koolitaja · Product Name
                    </p>
                  </div>

                  {/* Competency Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["LEAN", "TPS", "Kaizen", "VSM"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/30 uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Premium LinkedIn Social Icon Link */}
                <Link
                  href={linkedinUrl || "https://www.linkedin.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group flex items-center justify-center shrink-0 border-2 border-[#0055E5] bg-gradient-to-br from-[#EEF4FF] to-white text-[#0055E5] p-3 rounded-xl transition-all hover:scale-105 shadow-sm dark:border-sky-500/40 dark:from-sky-950/20 dark:to-slate-900/40 dark:text-sky-400 overflow-hidden"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(0, 85, 229, 0.04) 0px, rgba(0, 85, 229, 0.04) 2px, transparent 2px, transparent 8px)'
                  }}
                  title="Your Name LinkedIn profiil"
                >
                  {/* Premium Hover Glow Effect */}
                  <div className="absolute inset-0 bg-[#0055E5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Custom Minimalist Vector SVG for 'in' Branding */}
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3c0-2.07-1.12-3.13-2.67-3.13-1.25 0-1.81.69-2.12 1.18v-1H11v8.38h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </Link>
              </div>

            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
