import React from 'react';
import Link from 'next/link';
import { MapPin, Train, Phone, Mail, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarketingContainer, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui';

interface TrainingLocationProps {
  data: {
    addressTitle?: string;
    addressText?: string;
    transportNote?: string;
    contactText?: string;
    phone?: string;
    email?: string;
    mapEmbedUrl?: string;
    mapButtonUrl?: string;
    subsidyText?: string;
    subsidyLink?: string;
  };
}

export default function TrainingLocation({ data }: TrainingLocationProps) {
  const {
    addressTitle = 'Grand Hotel Viljandi',
    addressText = 'Tartu 11 / Lossi 29, 71004 Viljandi.',
    transportNote = 'Tallinn–Viljandi–Tallinn rongisõidu graafik sobib koolituse aegadega.',
    contactText = 'Lisateave koolitusele registreerimiseks:',
    phone = '51 38 403',
    email = 'andreskase@tootmisjuhtimine.ee',
    mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2144.33!2d25.5954!3d58.3639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4694a9776f8a5413%3A0x6b2b!2sGrand%20Hotel%20Viljandi!',
    mapButtonUrl = 'https://maps.app.goo.gl/PyDBcqDtnqWEJMhf7',
    subsidyText = 'Võimalik on taotleda koolitustoetust Töötukassast — kuni 80% koolituse hinnast.',
    subsidyLink = '/standard',
  } = data || {};

  return (
    <section className="relative overflow-hidden bg-transparent py-16 md:py-24">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-transparent" />
      
      <MarketingContainer elevated className="relative z-10">
        
        {/* 1. Header */}
        <div className="mb-10 flex items-center gap-3 md:mb-12">
          <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold tracking-tight text-[rgb(var(--text-primary))] sm:text-3xl">
            Koolituse asukoht
          </h2>
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 items-start">
          
          {/* 2. Left Column: Interactive Map */}
          <div className={`relative order-1 group flex h-[350px] w-full flex-col overflow-hidden md:h-[450px] ${marketingInsetCardClass}`}>
            {mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                className="h-full w-full border-0 transition-opacity duration-700"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Koolituse asukoht kaardil"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-medium text-[rgb(var(--text-secondary))]">
                Kaarti pole lisatud
              </div>
            )}

            {/* Floating "Open in Maps" Button */}
            {mapButtonUrl && (
              <a
                href={mapButtonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-5 top-5 flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2.5 text-xs font-semibold tracking-wide text-slate-800 shadow-md backdrop-blur transition-all duration-300 hover:bg-white hover:shadow-lg dark:bg-slate-900/90 dark:text-white dark:hover:bg-slate-900"
              >
                <span>Ava kaardil</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/5 dark:ring-white/10" />
          </div>

          {/* 3. Right Column: Details Cards */}
          <div className="order-2 flex flex-col gap-6 pt-0 md:pt-4">
            
            {/* A) Hotel Card */}
            <div className={`p-6 md:p-8 transition-all hover:shadow-md ${marketingInsetCardClass}`}>
              <h3 className="mb-1 text-xl md:text-2xl font-bold tracking-tight text-[rgb(var(--text-primary))]">
                {addressTitle}
              </h3>
              <p className="text-sm md:text-base text-[rgb(var(--text-secondary))]">
                {addressText}
              </p>
            </div>

            {/* B) Train Hack Card */}
            {transportNote && (
              <div className={`flex items-start gap-4 p-6 md:p-8 transition-all hover:bg-blue-100/50 dark:hover:bg-blue-900/30 ${marketingMicroPillClass} bg-blue-50/80 dark:bg-blue-900/20`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800/50 dark:text-blue-300">
                  <Train className="h-5 w-5" />
                </div>
                <div>
                  <div role="heading" aria-level={4} className="mb-1 font-semibold text-[rgb(var(--text-primary))]">Logistika</div>
                  <p className="text-sm md:text-base leading-relaxed text-[rgb(var(--text-secondary))]">
                    {transportNote}
                  </p>
                </div>
              </div>
            )}

            {/* C) Contacts Card */}
            {(phone || email) && (
              <div className={`p-6 md:p-8 transition-all hover:shadow-md ${marketingInsetCardClass}`}>
                <div role="heading" aria-level={4} className="mb-4 text-sm font-medium text-[rgb(var(--text-secondary))]">
                  {contactText}
                </div>
                <div className="flex flex-col gap-4">
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="group flex w-fit items-center gap-3 text-[rgb(var(--text-primary))] transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Phone className="h-5 w-5 text-slate-400 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400" strokeWidth={1.5} />
                      <span className="font-semibold underline decoration-transparent underline-offset-4 transition-all group-hover:decoration-blue-600/30 dark:group-hover:decoration-blue-400/30">
                        {phone}
                      </span>
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="group flex w-fit items-center gap-3 text-[rgb(var(--text-primary))] transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Mail className="h-5 w-5 text-slate-400 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400" strokeWidth={1.5} />
                      <span className="font-semibold underline decoration-transparent underline-offset-4 transition-all group-hover:decoration-blue-600/30 dark:group-hover:decoration-blue-400/30">
                        {email}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
              {/* 4. Bottom Banner: Töötukassa Subsidy */}
        {subsidyText && (
          <div className="mt-12 w-full md:mt-16">
            <div
              className="group relative flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-6 overflow-hidden rounded-[24px] bg-[#F4FBF9] p-8 shadow-sm ring-1 ring-emerald-100 transition-all duration-300 hover:shadow-md hover:ring-emerald-200 dark:bg-emerald-950/20 dark:ring-emerald-900/30 md:p-10"
            >
              <div className="flex items-start sm:items-center gap-5 sm:gap-6">
                {/* Neon glow icon container */}
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-[#00A884] shadow-[0_0_20px_rgba(0,168,132,0.2)] dark:bg-emerald-950/50">
                  <ShieldCheck className="h-7 w-7" strokeWidth={2} />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-emerald-500/20" />
                </div>
                <div className="flex flex-col gap-2.5">
                  <p className="max-w-2xl text-base leading-relaxed tracking-wide text-slate-800 dark:text-slate-200 sm:text-lg">
                    {(() => {
                      // Normalize CMS text
                      const raw = subsidyText.trim();
                      // Simple sentence case: First char upper, rest lower, drop 'NB! '
                      const clean = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase().replace(/^nb!\s*/i, '');
                      
                      // Highlight "kuni 80% koolituse hinnast" or similar
                      const highlightRegex = /(kuni\s+\d+%[^.]*)/i;
                      const parts = clean.split(highlightRegex);

                      return parts.map((part, i) => 
                        highlightRegex.test(part) ? (
                          <strong key={i} className="font-bold text-[#00A884]">
                            {part}
                          </strong>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      );
                    })()}
                  </p>
                  <Link
                    href={subsidyLink || '#'}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00A884] transition-colors group-hover:text-emerald-500 after:absolute after:inset-0 after:rounded-[24px]"
                  >
                    Tutvu koolitusstandardiga
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </MarketingContainer>
    </section>
  );
}
