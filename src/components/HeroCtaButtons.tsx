'use client';

import React from 'react';
import { CalendarCheck, Eye } from 'lucide-react';
import { BrandVibrantButton, WhiteButton } from '@/components/ui';
import { resolveLink, type SanityLink } from '@/lib/resolveLink';
import { cn } from '@/lib/utils';

interface HeroCtaButtonsProps {
  primaryCtaText?: string;
  primaryCtaLink?: SanityLink;
  secondaryCtaText?: string;
  secondaryCtaLink?: SanityLink;
  /** `center` for centered heroes; `start` for split heroes (left-aligned from md+). */
  align?: 'center' | 'start';
}

export default function HeroCtaButtons({
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  align = 'center',
}: HeroCtaButtonsProps) {
  const isStart = align === 'start';

  return (
    <div
      className={cn(
        'site-hero-cta-row relative z-10 mb-2 flex w-full max-w-full flex-col gap-3 sm:mb-4 sm:gap-4',
        isStart ? 'items-center md:items-start' : 'items-center',
        isStart ? 'justify-center md:justify-start' : 'justify-center',
      )}
    >
      <div
        className={cn(
          'flex w-full max-w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4',
          isStart ? 'sm:justify-start' : 'sm:justify-center',
        )}
      >
        <BrandVibrantButton
          href={primaryCtaLink ? resolveLink(primaryCtaLink) : '/kontakt'}
          icon={CalendarCheck}
          className="site-hero-cta w-full sm:w-auto"
        >
          {primaryCtaText?.replace(/\s*(?:->|=>|→|>|›)\s*$/, '') || 'Broneeri koht'}
        </BrandVibrantButton>

        {(secondaryCtaText || secondaryCtaLink) && (
          <WhiteButton
            href={secondaryCtaLink ? resolveLink(secondaryCtaLink) : '#'}
            icon={Eye}
            className="site-hero-cta-secondary w-full cursor-pointer sm:w-auto"
          >
            {secondaryCtaText?.replace(/\s*(?:->|=>|→|>|›)\s*$/, '') || 'Vaata programmi'}
          </WhiteButton>
        )}
      </div>
    </div>
  );
}