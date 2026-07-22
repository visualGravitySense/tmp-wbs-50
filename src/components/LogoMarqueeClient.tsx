'use client';

import React, { useState, useEffect } from 'react';
import { MarketingContainer, Section } from '@/components/ui';
import { sectionBandBorderClass, sectionBandEyebrowClass, sectionBandPadClass } from '@/components/ui/marketing-layout-styles';
import { urlFor as urlForImage } from '@/sanity/lib/image';

interface LogoMarqueeClientProps {
  logos: any[];
  title?: string;
}

const LogoMarqueeClient: React.FC<LogoMarqueeClientProps> = ({ 
  logos = [], 
  title = "Osalenud ettevõtted" 
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile (if not marquee mode), we show a simple swipeable single row
  // On desktop, we duplicate the logos to ensure seamless looping without gaps
  const doubledLogos = React.useMemo(() => {
    if (logos.length === 0) return [];
    
    // Performance Item #11: Limit to max 25 logos (already limited in GROQ)
    const premiumLogos = logos;
    
    if (!isMounted || isMobile) return premiumLogos; // Single row on mobile/SSR
    
    const minLogosRequired = 12;
    const loopMultiplier = Math.ceil(minLogosRequired / premiumLogos.length);
    return Array.from({ length: loopMultiplier * 2 }).flatMap(() => premiumLogos);
  }, [logos, isMounted, isMobile]);

  // Adjust animation duration based on total items in the loop
  const animationDuration = React.useMemo(() => {
    const activeLength = Math.min(logos.length, 25);
    return Math.max(12, activeLength * 4);
  }, [logos.length]);

  return (
    <Section variant="minimal" className={`border-y ${sectionBandBorderClass} bg-transparent ${sectionBandPadClass}`}>
      <MarketingContainer elevated className="mb-8 text-center">
        <p className={sectionBandEyebrowClass}>
          {title}
        </p>
      </MarketingContainer>

      {/* Masking container that fades the logos at both edges of the screen */}
      <div className="relative w-full flex overflow-x-auto md:overflow-x-hidden md:[mask-image:_linear-gradient(to_right,_transparent_0%,_white_15%,_white_85%,_transparent_100%)] snap-x snap-mandatory scroll-smooth scroll-pl-4 scroll-pr-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        
        {/* Single marquee track using w-max and translateX(-50%) for perfect reliability */}
        <div 
          className={`flex shrink-0 items-center whitespace-nowrap py-2 ${
            isMounted && !isMobile 
              ? 'w-max animate-marquee-slow hover:[animation-play-state:paused] motion-reduce:animate-none' 
              : 'min-w-full justify-around max-md:!animate-none'
          }`}
          style={isMounted && !isMobile ? { animationDuration: `${animationDuration}s` } : undefined}
        >
          {doubledLogos.map((item, index) => (
            <div 
              key={`logo-${item._id}-${index}`} 
              className="mx-5 flex min-w-[100px] shrink-0 items-center justify-center snap-center sm:mx-8 md:mx-12"
            >
              {item.displayType === 'logo' && item.logo ? (
                /* ВАРИАНТ 1: ЛОГОТИП */
                <div className="relative flex h-10 w-[150px] items-center justify-center rounded-md px-1">
                  <img
                    src={urlForImage(item.logo)
                      .ignoreImageParams()
                      .width(300)
                      .height(64)
                      .fit('max')
                      .format('webp')
                      .url()}
                    alt={item.logo?.alt || item.name || 'Partneri logo'}
                    width={150}
                    height={32}
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-full object-contain opacity-40 grayscale contrast-125 mix-blend-multiply transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:[filter:none] dark:opacity-90 dark:brightness-0 dark:invert dark:hover:opacity-100 dark:mix-blend-normal dark:contrast-100"
                  />
                </div>
              ) : (
                /* ВАРИАНТ 2: ТЕКСТ */
                <span className="max-w-[140px] truncate text-sm font-black tracking-tighter text-[rgb(var(--text-primary)/0.3)] hover:text-blue-500 transition-colors duration-300 cursor-default uppercase italic sm:max-w-none sm:text-lg md:text-xl">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </Section>
  );
};

export default LogoMarqueeClient;
