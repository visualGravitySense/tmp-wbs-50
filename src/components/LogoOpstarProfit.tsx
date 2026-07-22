import React from 'react';

// Цветовая палитра из брендбука
const colors = {
  bluePrimary: '#008DD2',
  blueLight: '#5FC6F1',
  richBlack: '#1C1B17',
  grayText: '#2B2A29',
  white: '#FEFEFE'
};

export const LogoOpstarProfit = ({ variant = 'centered', theme = 'light', scrolled = false }) => {
  const isDark = theme === 'dark';
  const isScrolled = scrolled;
  
  // Brand mark (logo image); themed via data-brand CSS where needed
  const BrandMark = () => (
    <div className="site-logo-mark relative w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
      {/* Plain <img>: next/image here caused SSR/client src mismatch inside client Header (hydration). */}
      <img
        src="/placeholder-logo.svg"
        alt="Site logo"
        width={32}
        height={32}
        className="h-full w-full object-contain drop-shadow-sm"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );

  if (variant === 'horizontal') {
    return (
      <div className="flex min-w-0 max-w-full items-center gap-1.5 sm:gap-2">
        <BrandMark />
        <div className="flex min-w-0 flex-col">
          <p
            className={`truncate text-[11px] font-serif leading-none tracking-tight sm:text-sm md:text-base ${isDark ? 'text-white' : 'text-[#1C1B17]'}`}
            style={{ fontFamily: '"Optima", "URW Classico", sans-serif', fontWeight: 700 }}
          >
            Site Name
          </p>
          <div className="my-0.5 h-px w-full bg-gradient-to-r from-[#008DD2] to-transparent" />
          <p
            className={`block truncate text-[9px] italic leading-tight md:text-xs ${
              isDark ? 'text-blue-100/90' : 'text-gray-500'
            }`}
            style={{ fontFamily: '"Gill Sans", "Myriad Pro", sans-serif' }}
          >
            Your tagline here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <BrandMark />
      <div className="mt-6">
        <p className={`text-4xl md:text-6xl font-serif tracking-tighter ${isDark ? 'text-white' : 'text-[#1C1B17]'}`}
            style={{ fontFamily: '"Optima", "URW Classico", sans-serif', fontWeight: 800 }}>
          Site Name
        </p>
        <div className="w-full h-[1px] bg-[#008DD2] mt-2 mb-3" />
        <p className={`text-xl md:text-2xl italic tracking-wide ${isDark ? 'text-blue-100' : 'text-[#2B2A29]'}`}
           style={{ fontFamily: '"Gill Sans", "Myriad Pro", sans-serif' }}>
          Your tagline here
        </p>
      </div>
    </div>
  );
};
