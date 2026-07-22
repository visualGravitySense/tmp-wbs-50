'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'

export interface LogoItem {
  title: string
  url: string
}

interface ClientLogosMarqueeProps {
  logos: LogoItem[]
}

export default function ClientLogosMarquee({ logos = [] }: ClientLogosMarqueeProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!logos || logos.length === 0) return null

  // Ensure we have enough logos to span the screen for a seamless loop without gaps
  const minLogosRequired = 10
  const loopMultiplier = Math.ceil(minLogosRequired / logos.length)
  const doubledLogos = Array.from({ length: loopMultiplier * 2 }).flatMap(() => logos)

  // Adjust animation duration based on total items in the loop to keep scroll speed visually consistent
  const animationDuration = Math.max(12, logos.length * 4)

  return (
    <div className="w-full py-10 bg-gradient-to-b from-transparent to-[#F7F8FA]/50 dark:to-slate-900/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Ettevõtted, kes usaldavad meie süsteeme
        </p>
      </div>

      {/* Masking container that fades the logos at both edges of the screen */}
      <div className="relative w-full flex overflow-x-hidden [mask-image:_linear-gradient(to_right,_transparent_0%,_white_15%,_white_85%,_transparent_100%)]">
        
        {/* Single marquee track using w-max and translateX(-50%) for perfect reliability */}
        <div 
          className={`flex shrink-0 items-center whitespace-nowrap py-4 gap-16 ${
            isMounted 
              ? 'w-max animate-marquee-slow hover:[animation-play-state:paused] motion-reduce:animate-none' 
              : 'min-w-full justify-around'
          }`}
          style={isMounted ? { animationDuration: `${animationDuration}s` } : undefined}
        >
          {doubledLogos.map((logo, index) => (
            <div
              key={`logo-${index}`}
              className="group relative flex h-12 w-32 shrink-0 items-center justify-center transition-all duration-300"
            >
              <Image
                src={logo.url}
                alt={`${logo.title} logo`}
                fill
                className="object-contain opacity-40 grayscale contrast-200 mix-blend-multiply transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 dark:opacity-90 dark:brightness-0 dark:invert dark:group-hover:opacity-100 dark:mix-blend-normal dark:contrast-100"
                sizes="128px"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

