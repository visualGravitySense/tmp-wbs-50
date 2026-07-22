import OpstarProfitHeroDiagram from '@/components/OpstarProfitHeroDiagram'
import { MarketingContainer, Section, marketingInsetCardClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import { cn } from '@/lib/utils'

interface IllustrationItem {
  title: string
  position: { x: number; y: number }
}

interface AcronymItem {
  code: string
  label: string
  description: string
}

interface OpstarProfitBlockProps {
  blockData: {
    title: string
    eyebrow?: string
    subtitle?: string
    leftColumn: { title: string; acronymItems?: AcronymItem[] }
    rightColumn: { title: string; acronymItems?: AcronymItem[] }
    illustration?: {
      centralText: string
      illustrationItems: IllustrationItem[]
    }
    heroDiagramMeta?: {
      eyebrowLabel?: string
      cardTitle?: string
      badgeText?: string
      tagPills?: string
    }
    heroMetrics?: Array<{ value: string; label: string }>
  }
}

const DEFAULT_LEFT_ACRONYMS: AcronymItem[] = [
  {
    code: 'OP',
    label: 'Operatsioonide juhtimine',
    description: 'Tootmise ja teenuste valmistamise juhtimine.',
  },
  {
    code: 'ST',
    label: 'Strateegiline juhtimine',
    description: 'Millal, kellega ja kuidas me eesmärgini jõuame?',
  },
  {
    code: 'STAR',
    label: 'Visioon & Eesmärk',
    description: 'Mille nimel ja miks me oma asja teeme? Meie unistus.',
  },
]

const DEFAULT_RIGHT_ACRONYMS: AcronymItem[] = [
  {
    code: 'PRO',
    label: 'Professionaalsus',
    description: 'Teadmine, kompetentsid, oskused, koostöö. Andmed, faktid.',
  },
  {
    code: 'FIT',
    label: 'Sidusus',
    description: 'Sobivus, integreeritus, seostatus, põhjendatus OPSTAR-le.',
  },
  {
    code: 'PROFIT',
    label: 'Kasum',
    description: 'Tootlikkus, väärtus, areng, tulemuslikkus.',
  },
]

const sidePanelClass = marketingInsetCardClass

function AcronymStack({
  items,
  align = 'left',
}: {
  items: AcronymItem[]
  align?: 'left' | 'right'
}) {
  return (
    <ul className={cn('space-y-5', align === 'right' && 'lg:text-right')}>
      {items.map((item) => (
        <li key={item.code} className="space-y-1">
          <p className="text-sm font-black uppercase tracking-wide text-[rgb(var(--text-primary))] sm:text-[15px]">
            <span className="text-[#0055E5] [.dark_&]:text-sky-400">{item.code}</span>
            <span className="mx-1.5 text-slate-400">—</span>
            <span>{item.label}</span>
          </p>
          <p className="text-xs leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[13px]">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  )
}

function SideColumn({
  title,
  items,
  align,
}: {
  title: string
  items: AcronymItem[]
  align: 'left' | 'right'
}) {
  return (
    <div className={sidePanelClass}>
      <div
        className={cn(
          'absolute top-6 h-9 w-0.5 bg-[#0055E5] shadow-[0_0_12px_rgba(0,85,229,0.35)] [.dark_&]:bg-sky-400',
          align === 'left' ? 'left-0' : 'right-0',
        )}
      />
      <div
        className={cn(
          'mb-5 text-sm font-black uppercase tracking-wide text-[rgb(var(--text-primary))] sm:text-base',
          align === 'right' && 'lg:text-right',
        )}
      >
        {title}
      </div>
      <AcronymStack items={items} align={align} />
    </div>
  )
}

export default function OpstarProfitBlock({ blockData }: OpstarProfitBlockProps) {
  const {
    title,
    eyebrow,
    subtitle,
    leftColumn,
    rightColumn,
    illustration,
    heroDiagramMeta,
    heroMetrics,
  } = blockData

  const meta = heroDiagramMeta ?? {}
  const tagPills = meta.tagPills
    ? meta.tagPills.split(',').map((t) => t.trim()).filter(Boolean)
    : undefined

  return (
    <Section variant="band" className="overflow-x-clip">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-1/2 top-1/2 h-[min(420px,90vw)] w-[min(420px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/6 blur-[90px] [.dark_&]:bg-blue-600/12" />
      </div>

      <MarketingContainer elevated>
        <div className="mb-8 text-center sm:mb-10">
          {eyebrow && (
            <EyebrowPillBadge 
              text={eyebrow} 
              centered 
              wrapperClassName="mb-4"
            />
          )}
          <h2 className="mb-2 text-3xl font-black uppercase tracking-tighter text-[rgb(var(--text-primary))] sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700 opacity-90 sm:text-sm [.dark_&]:text-blue-400">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mx-auto grid w-full items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-8">
          <div className="order-2 lg:order-1">
            <SideColumn
              title={leftColumn.title || 'TÄHEÜHEND'}
              items={leftColumn.acronymItems?.length ? leftColumn.acronymItems : DEFAULT_LEFT_ACRONYMS}
              align="left"
            />
          </div>

          <div className="order-1 lg:order-2">
            <OpstarProfitHeroDiagram
              eyebrowLabel={meta.eyebrowLabel || undefined}
              cardTitle={meta.cardTitle || undefined}
              badgeText={meta.badgeText || undefined}
              tagPills={tagPills}
              centralText={illustration?.centralText || undefined}
              nodes={
                illustration?.illustrationItems?.length
                  ? illustration.illustrationItems
                  : undefined
              }
              metrics={heroMetrics?.length ? heroMetrics : undefined}
            />
          </div>

          <div className="order-3">
            <SideColumn
              title={rightColumn.title || 'TÄHEÜHEND'}
              items={rightColumn.acronymItems?.length ? rightColumn.acronymItems : DEFAULT_RIGHT_ACRONYMS}
              align="right"
            />
          </div>
        </div>
      </MarketingContainer>
    </Section>
  )
}
