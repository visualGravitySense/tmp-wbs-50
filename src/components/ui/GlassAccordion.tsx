"use client";

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';

interface AccordionQuote {
  quote?: string;
  author?: string;
}

interface GlassAccordionData {
  question?: string;
  testimonials?: AccordionQuote[];
}

interface GlassAccordionProps {
  data?: GlassAccordionData;
}

export default function GlassAccordion({ data }: GlassAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const question = data?.question?.trim() ?? '';
  const quotes = (data?.testimonials ?? []).filter(
    (item) => item.quote?.trim() || item.author?.trim(),
  );

  if (!question && quotes.length === 0) {
    return null;
  }

  return (
    <GlassPanel className={`max-w-2xl w-full transition-all duration-500 ${isOpen ? 'shadow-2xl' : ''}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-6 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight">{question}</h3>

        <div
          className={`flex-shrink-0 w-10 h-10 bg-white/50 rounded-full flex items-center justify-center border border-white/80 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}
      >
        <div className="space-y-6 border-t border-[var(--border)] pt-6">
          {quotes.map((item, idx) => (
            <React.Fragment key={`${item.author || 'quote'}-${idx}`}>
              <div className="space-y-2">
                <p className="italic text-[var(--text-primary)] text-lg">
                  &ldquo;{item.quote?.trim()}&rdquo;
                </p>
                {item.author?.trim() ? (
                  <p className="text-sm text-[var(--text-secondary)] font-medium">
                    &mdash; {item.author.trim()}
                  </p>
                ) : null}
              </div>
              {idx < quotes.length - 1 ? <div className="h-px bg-[var(--border)] w-full" /> : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}
