import { MarketingContainer, Section } from '@/components/ui';
import { WhiteButton } from '@/components/ui';
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge';
import React from 'react';
import { UserPlus, FileText } from 'lucide-react';
import { DEFAULT_FINAL_CTA_BANNER_BACKGROUND } from '@/lib/globalFinalCtaBanner';

export interface FinalCTAData {
  title?: string;
  subtitle?: string;
  nextGroupInfo?: string;
  spotsInfo?: string;
  supportInfo?: string;
  supportPrefix?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  footerText?: string;
}

interface FinalCTAProps {
  data?: FinalCTAData;
  /** Resolved CSS background (gradient or solid); drives the blue banner only. */
  bannerBackground?: string;
}

export default function FinalCTA({ data, bannerBackground }: FinalCTAProps) {
  const bg = bannerBackground?.trim() || DEFAULT_FINAL_CTA_BANNER_BACKGROUND

  return (
    <Section variant="band">
      <MarketingContainer elevated>
        <div
          className="final-cta-panel relative overflow-hidden rounded-3xl border border-white/15 px-8 py-14 text-center shadow-[0_35px_90px_-45px_rgba(0,0,0,0.8)] md:px-12 md:py-20"
          style={{ background: bg }}
        >
          <div className="final-cta-glow-left pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-[110px]" />
          <div className="final-cta-glow-right pointer-events-none absolute -bottom-20 -right-14 h-72 w-72 rounded-full bg-indigo-300/20 blur-[110px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_65%_at_50%_0%,rgba(255,255,255,0.22),transparent_65%)] final-cta-radial-overlay" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-7 flex flex-wrap items-center justify-center gap-2.5">
              <EyebrowPillBadge 
                text={data?.spotsInfo || 'Viimased kohad saadaval'} 
                tone="onDark" 
              />
              <EyebrowPillBadge 
                text={data?.nextGroupInfo || 'Järgmine grupp peagi'} 
                tone="onDark" 
              />
              <EyebrowPillBadge 
                text={`${data?.supportPrefix || 'Toetus kuni'} ${data?.supportInfo || '80%'}`} 
                tone="onDark" 
              />
            </div>

            <h2 className="mb-4 text-balance text-3xl font-black leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
              {data?.title || 'Oled valmis oma tehase uuele tasemele viima?'}
            </h2>

            <p className="final-cta-subtitle mx-auto mb-10 max-w-2xl text-balance text-base font-medium text-blue-100/85 md:text-lg">
              {data?.subtitle || 'Liitu Eesti kõige praktilisema tootmisjuhtimise programmiga.'}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <WhiteButton
                href={data?.primaryButtonLink || '#'}
                icon={UserPlus}
              >
                {data?.primaryButtonText || 'Registreeru koolitusele'}
              </WhiteButton>

              <a
                href={data?.secondaryButtonLink || '#'}
                className="final-cta-secondary-btn group inline-flex items-center justify-center gap-2.5 px-6 md:px-8 h-12 md:h-14 min-w-[160px] md:min-w-[200px] rounded-full font-black uppercase tracking-widest text-xs md:text-sm border border-white/40 bg-white/10 text-white backdrop-blur-xl transition-all duration-200 hover:bg-white/20 hover:border-white/60 hover:shadow-lg hover:shadow-white/5 active:scale-95 w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2.5 w-full">
                  <span className="final-cta-secondary-icon flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/80 text-white transition-transform group-hover:translate-x-0.5 duration-300">
                    <FileText className="h-2.5 w-2.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-xs md:text-sm font-black uppercase tracking-widest text-white leading-none">
                    {data?.secondaryButtonText || 'Vaata kava'}
                  </span>
                </span>
              </a>
            </div>

            <div className="final-cta-divider mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <p className="final-cta-footer mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              {data?.footerText || 'Sertifikaat hinna sees • 100% praktiline • Personaalne mentorlus'}
            </p>
          </div>
        </div>
      </MarketingContainer>
    </Section>
  );
}