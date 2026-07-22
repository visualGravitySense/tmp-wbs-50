import React from 'react';
import Image from 'next/image';
import EyebrowPillBadge from '@/components/EyebrowPillBadge';
import { urlFor as urlForImage } from '@/sanity/lib/image';
import { MessageSquare } from 'lucide-react';
import { BrandVibrantButton, MarketingContainer, Section, marketingInsetCardClass, marketingPanelClass } from '@/components/ui';

interface TestimonialItem {
  name?: string;
  role?: string;
  company?: string;
  content?: string;
  avatar?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
}

interface TestimonialsData {
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialItem[];
  buttonText?: string;
  buttonLink?: string;
}

interface TestimonialsProps {
  data?: TestimonialsData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  const testimonialsData = data?.testimonials?.length ? data.testimonials : [
    {
      name: "Margus Põld",
      role: "Tootmisjuht",
      company: "Tehnikum OÜ",
      content: "Andrese koolitus oli mängu muutev. Õppisime praktilikke meetodeid, mida saime kohe tehases rakendada. OEE tõusis 35% esimese 3 kuuga.",
    },
    {
      name: "Tiina Lepik",
      role: "Olemike juht",
      company: "Baltic Pack",
      content: "Parim investeering meie meeskonnale. Andres ei õpeta ainult teooriat, vaid näitab kuidas asju tegelikult tehases toimima paneb.",
    },
    {
      name: "Jaan Tamm",
      role: "CEO",
      company: "MetalWorks AS",
      content: "25+ aastat kogemust on näha. Andres räägib keelt, mida tootmisinimene mõistab ja usaldab. Soovitan kõigile tootmisjuhtidele.",
    }
  ];

  return (
    <Section variant="band">
      <MarketingContainer elevated>
        <div className={marketingPanelClass}>
          <div className="pointer-events-none absolute -left-20 top-0 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="mb-14 text-center">
            <EyebrowPillBadge text={data?.subtitle || 'Kliendid räägivad'} className="mx-auto" />
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-[-0.02em] text-[var(--text-primary)] md:text-5xl">
              {data?.title || 'Kuidas me aitasime teisi'}
            </h2>
          </div>

          <div className="flex min-w-0 flex-nowrap overflow-x-auto gap-6 pb-6 pt-2 scrollbar-none snap-x snap-mandatory touch-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 md:pt-0 md:overflow-visible">
        {testimonialsData.map((testimonial, index) => (
          <figure
            key={index}
            className={`group relative overflow-hidden p-7 transition-all duration-500 hover:-translate-y-1 hover:border-blue-300/60 hover:shadow-[0_28px_60px_-35px_rgba(37,99,235,0.45)] dark:hover:border-blue-500/45 max-md:flex-[0_0_calc(100%-2rem)] max-md:snap-center max-md:snap-always ${marketingInsetCardClass}`}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="mb-4 flex items-center justify-end">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]/70">
                Verified
              </span>
            </div>

            {/* Content */}
            <blockquote className="mb-7 text-[var(--text-secondary)] text-lg leading-relaxed font-medium">
              <span className="mb-2 block text-3xl leading-none text-blue-500/35">“</span>
              "{testimonial.content}"
            </blockquote>

            {/* Author */}
            <figcaption className="flex items-center gap-4">
              {testimonial.avatar ? (
                <Image
                  src={urlForImage(testimonial.avatar).width(96).height(96).fit('crop').url()}
                  alt={testimonial.avatar.alt || testimonial.name || 'Avatar'}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-white/40 object-cover shadow-lg"
                />
              ) : (
                <div aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-lg font-bold text-white shadow-lg">
                  {testimonial.name ? testimonial.name.charAt(0).toUpperCase() : 'A'}
                </div>
              )}
              <div>
                <div className="font-bold tracking-tight text-[var(--text-primary)]">
                  {testimonial.name || 'Nimi Puudub'}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {testimonial.role || 'Roll'}{testimonial.company && ` • ${testimonial.company}`}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
          </div>

          <div className="mt-12 flex flex-col items-center border-t border-[var(--border)]/70 pt-8">
            <BrandVibrantButton
              href={data?.buttonLink || '/testimonials'}
              variant="hero"
              className="group"
              icon={MessageSquare}
            >
              {data?.buttonText || 'Vaata kõik tagasisideid'}
            </BrandVibrantButton>
          </div>
        </div>
      </MarketingContainer>
    </Section>
  );
}
