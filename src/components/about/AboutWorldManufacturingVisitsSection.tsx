import { Globe, Briefcase, Lightbulb } from 'lucide-react'
import type { ManufacturingCompany, WorldManufacturingVisits } from '@/types/about'
import { MarketingContainer, Section, marketingInsetCardClass, marketingMicroPillClass, SplitHeader } from '@/components/ui'
import { cn } from '@/lib/utils'

type Props = {
  data: WorldManufacturingVisits
}

function industryBadgeClass(industry: ManufacturingCompany['industry']) {
  const map: Record<string, string> = {
    automotive:
      'bg-blue-50/95 text-blue-900 ring-blue-200/90 dark:bg-blue-500/15 dark:text-blue-100 dark:ring-blue-400/30',
    electronics:
      'bg-purple-50/95 text-purple-900 ring-purple-200/90 dark:bg-purple-500/15 dark:text-purple-100 dark:ring-purple-400/30',
    food: 'bg-orange-50/95 text-orange-950 ring-orange-200/90 dark:bg-orange-500/15 dark:text-orange-100 dark:ring-orange-400/30',
    pharmaceutical:
      'bg-red-50/95 text-red-900 ring-red-200/90 dark:bg-red-500/12 dark:text-red-100 dark:ring-red-400/30',
    textile:
      'bg-pink-50/95 text-pink-900 ring-pink-200/90 dark:bg-pink-500/12 dark:text-pink-100 dark:ring-pink-400/30',
    chemical:
      'bg-yellow-50/95 text-yellow-950 ring-yellow-200/90 dark:bg-yellow-500/12 dark:text-yellow-100 dark:ring-yellow-400/25',
    metal:
      'bg-slate-100/95 text-slate-900 ring-slate-200/90 dark:bg-slate-500/15 dark:text-slate-100 dark:ring-slate-400/25',
    plastics:
      'bg-cyan-50/95 text-cyan-950 ring-cyan-200/90 dark:bg-cyan-500/12 dark:text-cyan-100 dark:ring-cyan-400/30',
    wood: 'bg-amber-50/95 text-amber-950 ring-amber-200/90 dark:bg-amber-500/12 dark:text-amber-100 dark:ring-amber-400/25',
    other:
      'bg-slate-100/95 text-slate-800 ring-slate-200/90 dark:bg-white/10 dark:text-slate-100 dark:ring-white/15',
  }
  return map[industry] ?? map.other
}

function ManufacturingVisitGlassCard({ company }: { company: ManufacturingCompany }) {
  return (
    <div className="group/card relative">
      <div className={cn('relative overflow-hidden !p-6 transition-all duration-500 sm:!p-7', marketingInsetCardClass)}>
          <div className="relative z-10">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-2 text-lg font-bold leading-snug tracking-tight text-[rgb(var(--text-primary))] transition-colors group-hover/card:text-blue-700 dark:group-hover/card:text-blue-400">
                  {company.companyName}
                </div>
                <div className="mb-2.5 flex items-center text-sm font-semibold text-emerald-700 dark:text-emerald-400/95">
                  <span className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-200/80 bg-emerald-50/90 dark:border-emerald-500/25 dark:bg-emerald-500/10">
                    <Globe className="h-[13px] w-[13px]" />
                  </span>
                  {company.country}
                </div>
                <span
                  className={cn(
                    'inline-flex px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide',
                    marketingMicroPillClass,
                    industryBadgeClass(company.industry)
                  )}
                >
                  {company.industry.charAt(0).toUpperCase() + company.industry.slice(1)}
                </span>
              </div>
              <div className={cn('shrink-0 px-2.5 py-1.5 text-xs font-bold tabular-nums text-[rgb(var(--text-secondary))] dark:text-slate-200', marketingMicroPillClass)}>
                {company.visitYear}
              </div>
            </div>

            <div className="mb-1 border-t border-[rgb(var(--border))]/50 pt-4 dark:border-white/[0.07]">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-blue-200/80 bg-blue-50/90 text-blue-700 dark:border-blue-500/25 dark:bg-blue-500/12 dark:text-blue-400">
                  <Briefcase className="h-[11px] w-[11px]" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">
                  Visit purpose
                </span>
              </div>
              <p className="pl-9 text-xs font-medium leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[13px]">
                {company.visitPurpose}
              </p>
            </div>

            {company.keyInsights && (
              <div className="mt-4 border-t border-[rgb(var(--border))]/50 pt-4 dark:border-white/[0.07]">
                <div className={cn('relative overflow-hidden p-3.5', marketingMicroPillClass)}>
                  <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-amber-200/12" />
                  <div className="relative flex gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-200/80 bg-amber-50/95 text-amber-700 dark:border-amber-400/25 dark:bg-amber-500/12 dark:text-amber-200">
                      <Lightbulb className="h-[12px] w-[12px]" />
                    </span>
                    <div className="min-w-0">
                      <div className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-900/80 dark:text-amber-200/90">
                        Key insights
                      </div>
                      <p className="text-xs font-medium leading-relaxed text-[rgb(var(--text-primary))] dark:text-[rgb(var(--text-secondary))] sm:text-[13px]">
                        {company.keyInsights}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  )
}

export default function AboutWorldManufacturingVisitsSection({ data }: Props) {
  return (
    <Section variant="band">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[6%] top-[18%] h-[min(380px,75vw)] w-[min(380px,75vw)] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.2),transparent_62%)] blur-[88px]" />
        <div className="absolute bottom-[12%] right-[8%] h-[min(320px,65vw)] w-[min(320px,65vw)] rounded-full bg-[radial-gradient(circle_at_70%_50%,rgba(129,140,248,0.14),transparent_58%)] blur-[96px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06)_0%,transparent_30%,transparent_70%,rgba(0,0,0,0.04)_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,transparent_65%,rgba(0,0,0,0.2)_100%)]" />
      </div>

      <MarketingContainer elevated>
        <div className="mb-14 text-center sm:mb-16">
          <SplitHeader
            title={data.title}
            eyebrow="Globaalne tootmine"
            subtitle={data.subtitle}
            align="center"
            headingLevel="h2"
          />
          <div className="mx-auto mt-8 flex max-w-xs items-center gap-3 px-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent opacity-75 dark:via-white/12" />
            <div className="flex gap-1">
              <span className="h-1 w-1 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.45)] dark:shadow-[0_0_12px_rgba(29,97,255,0.45)]" />
              <span className="h-1 w-1 rounded-full bg-blue-600/35 dark:bg-blue-400/35" />
              <span className="h-1 w-1 rounded-full bg-blue-600/12 dark:bg-blue-400/15" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[rgb(var(--border))] to-transparent opacity-75 dark:via-white/12" />
          </div>
        </div>

        {data.manufacturingCompanies && data.manufacturingCompanies.length > 0 && (
          <div className="mx-auto grid w-full gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.manufacturingCompanies.map((company, index) => (
              <ManufacturingVisitGlassCard key={index} company={company} />
            ))}
          </div>
        )}
      </MarketingContainer>
    </Section>
  )
}
