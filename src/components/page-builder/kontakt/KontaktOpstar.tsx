import Link from 'next/link'
import { Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { glassPanelVariantClasses } from '@/components/ui'

interface KontaktOpstarProps {
  block: any
}

export default function KontaktOpstar({ block }: KontaktOpstarProps) {
  return (
    <article
      className={cn(glassPanelVariantClasses.card, 'h-full space-y-4 !p-6 sm:!p-8')}
      aria-labelledby="opstar-heading"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          <Building2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
        <div>
          <h2
            id="opstar-heading"
            className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))]"
          >
            {block.name}
          </h2>
          <p className="text-sm text-[rgb(var(--text-secondary))]">{block.tagline}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
        {block.description}
      </p>
      <ul className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
        {block.bullets?.map((bullet: string) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <Link
        href={block.linkHref}
        className="inline-flex text-sm font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
      >
        {block.linkLabel}
      </Link>
    </article>
  )
}
