import { marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'
import { GradientStatValue } from '@/components/GradientStatValue'

export type ExperienceStat = {
  value: string
  label: string
}

type ExperienceStatsGridProps = {
  stats: ExperienceStat[]
  className?: string
}

export default function ExperienceStatsGrid({ stats, className }: ExperienceStatsGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-x-4 gap-y-10', className)}>
      {stats.map((stat, i) => (
        <div key={`${stat.label}-${stat.value}-${i}`} className={cn('px-3 py-4 text-center', marketingMicroPillClass)}>
          <GradientStatValue value={stat.value} className="mb-1" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600/90 dark:text-blue-400/80">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
