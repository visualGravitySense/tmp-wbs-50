import CaseMetaRail from '@/components/CaseMetaRail'
import { MarketingContainer, Section, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'

interface Metric {
  label: string
  value: string
}

interface CaseStudy {
  company: string
  industry: string
  employees: string
  location: string
  year: number
  beforeMetrics: Metric[]
  afterMetrics: Metric[]
  resultMain: string
  resultTime: string
}

interface CasesProps {
  casesData: {
    title: string
    eyebrow: string
    subtitle?: string
    caseStudies: CaseStudy[]
  }
  className?: string
}

export default function Cases({ casesData, className = '' }: CasesProps) {
  const { title, eyebrow, subtitle, caseStudies = [] } = casesData

  return (
    <Section variant="band" className={`overflow-x-hidden sm:overflow-hidden ${className}`} id="casestudy">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80 dark:opacity-100">
        <div className="absolute right-0 top-1/4 h-[min(340px,70vw)] w-[min(340px,70vw)] rounded-full bg-blue-500/12 blur-[100px] dark:bg-blue-600/18" />
        <div className="absolute bottom-[15%] left-0 h-[min(280px,65vw)] w-[min(280px,65vw)] rounded-full bg-emerald-500/10 blur-[90px] dark:bg-emerald-600/14" />
      </div>

      <MarketingContainer elevated className="relative z-10 min-w-0">
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <EyebrowPillBadge text={eyebrow} centered />
          <h2 className="mb-3 text-3xl font-black leading-[1.05] tracking-tighter text-[rgb(var(--text-primary))] sm:mb-4 sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-sm font-medium leading-snug text-[rgb(var(--text-secondary))] opacity-80 sm:text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mx-auto grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-7">
          {caseStudies.map((caseStudy, index) => (
            <div key={index} className="relative min-w-0">
              <div
                className="pointer-events-none absolute -inset-3 rounded-[1.35rem] bg-[radial-gradient(ellipse_75%_60%_at_70%_0%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(ellipse_55%_45%_at_10%_100%,rgba(16,185,129,0.08),transparent_50%)] blur-2xl dark:bg-[radial-gradient(ellipse_75%_60%_at_70%_0%,rgba(59,130,246,0.18),transparent_52%),radial-gradient(ellipse_55%_45%_at_10%_100%,rgba(52,211,153,0.12),transparent_48%)] md:-inset-4"
                aria-hidden
              />

              <article className={`group relative overflow-hidden !p-0 ${marketingInsetCardClass}`}>
                  <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.42)_0%,transparent_42%,rgba(59,130,246,0.04)_100%)] dark:bg-[linear-gradient(165deg,rgba(255,255,255,0.05)_0%,transparent_44%,rgba(16,185,129,0.06)_100%)]"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-85 dark:inset-x-5 dark:via-white/25"
                    aria-hidden
                  />

                  {/* Card header */}
                  <div className="relative border-b border-slate-200/70 bg-gradient-to-br from-white/80 via-slate-50/35 to-white/40 px-4 py-4 backdrop-blur-sm dark:border-white/[0.07] dark:from-white/[0.05] dark:via-black/15 dark:to-white/[0.03] sm:px-5 sm:py-4 md:px-5 md:py-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-lg font-black uppercase italic leading-tight tracking-tight text-[rgb(var(--text-primary))] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 sm:text-xl md:text-[1.35rem]">
                          {caseStudy.company}
                        </div>
                        <div className="mt-2">
                          <CaseMetaRail
                            industry={caseStudy.industry}
                            employees={caseStudy.employees}
                            location={caseStudy.location}
                          />
                        </div>
                      </div>
                      <div className={`shrink-0 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-blue-800 dark:text-blue-300 ${marketingMicroPillClass}`}>
                        {caseStudy.year}
                      </div>
                    </div>
                  </div>

                  {/* Before / After */}
                  <div className="relative grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-4 sm:gap-x-5 sm:px-5 sm:py-5 md:gap-x-6">
                    <div
                      className="pointer-events-none absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300/70 to-transparent dark:via-white/12"
                      aria-hidden
                    />

                    <div className="min-w-0 space-y-3">
                      <div className="text-[9px] font-black uppercase tracking-[0.18em] text-red-500/65 dark:text-red-400/55">
                        Enne
                      </div>
                      {caseStudy.beforeMetrics.map((metric, mIdx) => (
                        <div key={mIdx} className="min-w-0">
                          <span className="mb-0.5 block text-[9px] font-bold uppercase tracking-tight text-slate-500 dark:text-gray-500">
                            {metric.label}
                          </span>
                          <span className="text-xs font-bold italic leading-snug text-slate-400 line-through opacity-75 dark:text-gray-500 dark:opacity-55 sm:text-[13px]">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="min-w-0 space-y-3">
                      <div className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                        Pärast
                      </div>
                      {caseStudy.afterMetrics.map((metric, mIdx) => (
                        <div key={mIdx} className="min-w-0">
                          <span className="mb-0.5 block text-[9px] font-bold uppercase tracking-tight text-slate-500 dark:text-gray-500">
                            {metric.label}
                          </span>
                          <span className="text-sm font-black italic leading-snug tracking-tight text-[rgb(var(--text-primary))] transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400 sm:text-base">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result */}
                  <div className="relative px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
                    <div className="relative overflow-hidden rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md transition-colors duration-500 hover:border-emerald-500/35 hover:bg-emerald-500/[0.09] dark:border-emerald-500/20 dark:bg-emerald-950/25 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-emerald-950/35 md:rounded-2xl md:p-4">
                      <div
                        className="pointer-events-none absolute -right-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-500/20"
                        aria-hidden
                      />
                      <div className="relative z-10">
                        <div className="mb-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                          Põhiline tulemus
                        </div>
                        <div className="mb-1 text-sm font-black uppercase italic leading-snug tracking-tight text-[rgb(var(--text-primary))] sm:text-base md:text-[1.05rem]">
                          {caseStudy.resultMain}
                        </div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-500 sm:text-[10px]">
                          {caseStudy.resultTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-700 ease-out group-hover:w-full" />
                </article>
            </div>
          ))}
        </div>
      </MarketingContainer>
    </Section>
  )
}
