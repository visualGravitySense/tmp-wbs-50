import React from 'react';
import { BrandVibrantButton, MarketingContainer, Section, SplitHeader } from '@/components/ui';
import NineDaysPlan from './ui/NineDaysPlan';
import GlassAccordion from './ui/GlassAccordion';
import type { NineDaysMiniDay } from '@/lib/nineDays/nineDaysMiniDefaults';
import { applyNineDaysMiniContentDefaults } from '@/lib/nineDays/nineDaysMiniContentDefaults';
import {
  resolveNineDaysMiniDays,
  type NineDaysMiniDaysSource,
  type NineDaysMiniProgramDays,
} from '@/lib/nineDays/resolveNineDaysMiniDays';

interface NineDaysMiniData extends NineDaysMiniDaysSource {
  eyebrow?: string;
  mainHeading?: string;
  mainTitle?: Array<{ children?: Array<{ text?: string }> }>;
  italicTitle?: string;
  subtitle?: string;
  greenButtonText?: string;
  greenButtonLink?: string;
  whiteButtonText?: string;
  whiteButtonLink?: string;
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
  programDays?: NineDaysMiniProgramDays;
  days?: NineDaysMiniDay[];
  faqSection?: {
    question?: string;
    testimonials?: Array<{
      quote?: string;
      author?: string;
    }>;
  };
}

interface Props {
  data?: NineDaysMiniData;
  themeMode?: 'classic' | 'glass' | 'holiday';
}

export default function NineDaysMini({ data }: Props) {
  const resolvedDays = resolveNineDaysMiniDays(data);
  const content = applyNineDaysMiniContentDefaults({
    ...(data || {}),
    days: resolvedDays,
  }) as NineDaysMiniData;
  const mainHeading = content.mainHeading?.trim();

  // Homepage mini: single primary CTA always routes to the full course page.
  const ctaHref = '/koolitus'
  const ctaLabel = 'Tutvu programmiga'

  return (
    /* 
       Используем системные переменные из globals.css для адаптации к теме.
       bg-[rgb(var(--color-background))] обеспечивает смену фона при переключении темы.
    */
    <Section variant="band" className="min-h-screen bg-[rgb(var(--color-background))] font-sans transition-colors duration-500">
      <MarketingContainer elevated className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
        
        {/* ЛЕВАЯ КОЛОНКА: Контент и призывы к действию */}
        <div className="nine-days-mini-left-col space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left">
          {(() => {
            const mainText = mainHeading
              ? mainHeading
              : (content.mainTitle?.map((block: any) => block.children?.map((child: any) => child.text).join('')).join('\n') || '')

            const calculatedTitle = mainText.includes(',')
              ? mainText
              : (content.italicTitle ? `${mainText}, ${content.italicTitle}` : mainText)

            return (
              <SplitHeader
                title={calculatedTitle}
                eyebrow={content.eyebrow}
                subtitle={content.subtitle}
                align="responsive"
              />
            )
          })()}
 
          {/* Single primary CTA — Next.js Link via BrandVibrantButton → /koolitus */}
          <div className="nine-days-mini-btns flex flex-col gap-4 w-full max-w-sm mx-auto lg:mx-0">
            <BrandVibrantButton href={ctaHref} className="w-full justify-center">
              {ctaLabel}
              <span className="sr-only"> (arenguprogramm)</span>
            </BrandVibrantButton>
          </div>

          {/* Дополнительный интерактивный элемент: Аккордеон */}
          <div className="pt-4">
            <GlassAccordion data={content.faqSection} />
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: Интерактивный план с Sanity данными */}
        <div className="relative min-w-0 space-y-8">
          {/* Декоративное свечение на фоне (опционально) */}
          <div className="nine-days-mini-glow absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <NineDaysPlan data={content} />
        </div>
        
      </MarketingContainer>
    </Section>
  );
}
