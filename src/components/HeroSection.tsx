import React from 'react';
import { Container, EyebrowPillBadge } from '@/components/ui';
import HeroCtaButtons from './HeroCtaButtons';
import { cn } from '@/lib/utils';

export interface HeroSectionProps {
  variant: 'centered' | 'split' | 'page-header' | 'plain';
  eyebrow?: string | null;
  headline: string;
  scriptLine?: string | null;
  description?: string | null;
  primaryCTA?: { text?: string | null; link?: any };
  secondaryCTA?: { text?: string | null; link?: any };
  bottomLeftContent?: React.ReactNode;
  children?: React.ReactNode;
}

export default function HeroSection({
  variant,
  eyebrow,
  headline,
  scriptLine,
  description,
  primaryCTA,
  secondaryCTA,
  bottomLeftContent,
  children,
}: HeroSectionProps) {
  // Determine layout classes based on variant
  const isCentered = variant === 'centered';
  const isSplit = variant === 'split';
  const isPageHeader = variant === 'page-header';
  const isPlain = variant === 'plain';

  const heroHeadlineClass =
    'mb-4 sm:mb-6 min-w-0 break-words hyphens-auto font-heading font-extrabold tracking-tight leading-[1.1] text-[#122136] dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl'

  return (
    <section className="relative w-full max-w-full overflow-x-hidden overflow-y-visible bg-transparent pt-28 md:pt-36 pb-16">
      <Container size="6xl" className="mx-auto w-full min-w-0 max-w-full px-4 md:px-8">
        <div
          className={cn(
            'relative z-10 w-full min-w-0 max-w-full',
            isCentered && 'mx-auto flex max-w-4xl flex-col items-center px-2 text-center sm:px-4',
            isSplit && 'grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:items-start md:gap-12',
            isPageHeader && 'max-w-3xl text-left',
            isPlain && 'text-left'
          )}
        >
          {/* Left / Main Content Side */}
          <div
            className={cn(
              'flex w-full min-w-0 flex-col text-center items-center',
              isCentered && 'items-center text-center',
              isSplit && 'md:items-start md:text-left',
              (isPageHeader || isPlain) && 'items-start text-left',
            )}
          >
            {eyebrow && (
              <EyebrowPillBadge
                flow
                text={eyebrow}
                className="shadow-[0_8px_26px_-18px_rgba(59,130,246,0.35)] dark:shadow-none"
              />
            )}

            <h1
              className={cn(heroHeadlineClass)}
            >
              <span className="block">{headline}</span>
              {scriptLine && (
                <span className="block pt-2 sm:pt-4">
                  <span className="hero-headline-accent whitespace-pre-line">
                    {scriptLine}
                  </span>
                </span>
              )}
            </h1>

            {description && (
              <div
                className={cn(
                  'text-sm sm:text-base md:text-lg font-medium leading-relaxed text-[var(--text-secondary)]',
                  isCentered && 'mx-auto text-center max-w-2xl',
                  isSplit && 'mx-auto max-w-xl text-center md:mx-0 md:text-left',
                  isPageHeader && 'max-w-3xl text-left mt-2',
                  isPlain && 'mt-4 text-left'
                )}
              >
                {description}
              </div>
            )}

            {/* CTAs */}
            {(primaryCTA?.text || secondaryCTA?.text) && (
              <div
                className={cn(
                  'mt-8 w-full max-w-full sm:mt-10',
                  isCentered && 'flex justify-center',
                  isSplit && 'flex justify-center md:justify-start',
                  isPageHeader && 'flex justify-start',
                  isPlain && 'flex justify-start',
                )}
              >
                <HeroCtaButtons
                  align={isCentered ? 'center' : 'start'}
                  primaryCtaText={primaryCTA?.text ?? undefined}
                  primaryCtaLink={primaryCTA?.link}
                  secondaryCtaText={secondaryCTA?.text ?? undefined}
                  secondaryCtaLink={secondaryCTA?.link}
                />
              </div>
            )}

            {/* Bottom Left Content */}
            {bottomLeftContent && (
              <div className="mt-8 sm:mt-10 w-full max-w-xl self-start">
                {bottomLeftContent}
              </div>
            )}

            {/* For centered variant, children can render below CTAs */}
            {isCentered && children && (
              <div className="mt-12 w-full">
                {children}
              </div>
            )}
          </div>

          {/* Right Side (Only for Split Variant) */}
          {isSplit && children && (
            <div className="relative flex min-h-[300px] w-full items-center justify-center md:justify-end lg:h-full">
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
