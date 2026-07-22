import { Badge, MarketingContainer, Section, marketingInsetCardClass, marketingMicroPillClass, SplitHeader } from '@/components/ui'
import ExperienceCard from '@/components/ExperienceCard'
import type { AboutSection } from '@/types/about'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type Props = {
  data: AboutSection
}

export default function AboutNarrativeSection({ data }: Props) {
  return (
    <Section variant="band" className="relative overflow-hidden transition-colors duration-500">
      {/* Decorative background glow */}
      <div className="absolute -right-20 top-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-blue-600/5 blur-[120px]" />

      <MarketingContainer elevated className="relative z-10">
        <div className="mx-auto w-full">
          {/* Header */}
          <div className="mb-20 text-center">
            <SplitHeader 
              title={data.title}
              scriptTitle={data.scriptTitle}
              eyebrow={data.eyebrow}
              align="center"
              headingLevel="h2"
            />
            <div className="mt-4 flex justify-center gap-1">
              <div className="h-1 w-8 rounded-full bg-blue-600"></div>
              <div className="h-1 w-2 rounded-full bg-blue-600/40"></div>
            </div>
          </div>

          {/* Split Layout */}
          <div className="grid items-start gap-12 lg:grid-cols-12">
            {/* LEFT SIDE: Narrative Content (60%) */}
            <div className="lg:col-span-7">
              <div className={`relative !p-8 md:!p-12 ${marketingInsetCardClass}`}>
                <div className="pointer-events-none absolute right-0 top-0 p-8 opacity-10">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-blue-500"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                  {data.rightSideContent?.introText ? (
                    <div className="mb-10">
                      <p className="text-xl font-bold italic leading-relaxed tracking-tight text-blue-500 md:text-2xl">
                        {data.rightSideContent.introText}
                      </p>
                    </div>
                  ) : null}

                  <div className="space-y-6 text-[rgb(var(--text-secondary))]">
                    {data.content.map((block, index) => (
                      <div key={index} className="text-lg font-medium leading-relaxed">
                        {block.children?.map((child: { text?: string }, childIndex: number) => (
                          <span key={childIndex}>{child.text}</span>
                        ))}
                      </div>
                    ))}
                  </div>

                  {data.rightSideContent?.descriptionText ? (
                    <div className="mt-10 border-t border-white/5 pt-8">
                      <p className="text-lg italic leading-relaxed text-[rgb(var(--text-secondary))] opacity-80">
                        {data.rightSideContent.descriptionText}
                      </p>
                    </div>
                  ) : null}

                  {data.rightSideContent?.badges ? (
                    <div className={`mt-10 !p-6 ${marketingInsetCardClass}`}>
                      <p className="mb-4 text-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                        {data.rightSideContent.badgesLabel?.trim() ||
                          'Tunnustused & Kompetentsid'}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {data.rightSideContent.badges.map((badge, index) => (
                          <Badge
                            key={index}
                            text={badge.text}
                            color={badge.color}
                            size={badge.size}
                            className={marketingMicroPillClass}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Achievements & Experience (40%) */}
            {data.rightSideContent ? (
              <div className="space-y-6 lg:col-span-5">
                
                {/* Right Side Image — object-contain so diagrams/infographics are never clipped */}
                <div className="mb-8 relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40">
                  {data.rightSideContent.image ? (
                    <Image
                      src={urlFor(data.rightSideContent.image).width(800).fit('max').url()}
                      alt={data.rightSideContent.title || 'Praktiline kogemus ja õpetamine'}
                      width={800}
                      height={600}
                      className="w-full h-auto max-h-[450px] object-contain"
                    />
                  ) : (
                    <img src="/andres-koolitus-1.png" alt="Praktiline kogemus ja õpetamine" className="w-full h-auto max-h-[450px] object-contain" />
                  )}
                </div>

                <div className="mb-8 border-l-2 border-blue-600 pl-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500">
                    {data.rightSideContent.title}
                  </h3>
                </div>

                {data.rightSideContent.experienceCards ? (
                  <div className="space-y-5">
                    {data.rightSideContent.experienceCards.map((card, index) => {
                      const c = card.color ?? 'blue'
                      const hoverGlow =
                        c === 'green'
                          ? 'bg-emerald-600/14 dark:bg-emerald-500/22'
                          : c === 'purple'
                            ? 'bg-purple-600/14 dark:bg-purple-500/22'
                            : c === 'orange'
                              ? 'bg-orange-600/14 dark:bg-orange-500/22'
                              : 'bg-blue-600/14 dark:bg-blue-500/22'

                      return (
                        <div key={index} className="group/card-wrap relative">
                          <div
                            className={`pointer-events-none absolute -inset-3 rounded-[1.75rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover/card-wrap:opacity-100 ${hoverGlow}`}
                          />
                          <ExperienceCard
                            title={card.title}
                            subtitle={card.subtitle}
                            year={card.year}
                            description={card.description}
                            emoji={card.emoji}
                            color={c}
                          />
                        </div>
                      )
                    })}
                  </div>
                ) : null}


              </div>
            ) : null}
          </div>
        </div>
      </MarketingContainer>
    </Section>
  )
}
