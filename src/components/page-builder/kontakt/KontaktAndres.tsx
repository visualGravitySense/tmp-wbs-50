import Link from 'next/link'
import { UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { glassPanelVariantClasses } from '@/components/ui'

function isWebsiteHighlight(label: string) {
  return label.trim().toLowerCase().startsWith('veeb')
}

interface KontaktAndresProps {
  block: any
}

export default function KontaktAndres({ block }: KontaktAndresProps) {
  return (
    <article
      className={cn(glassPanelVariantClasses.card, 'h-full space-y-4 !p-6 sm:!p-8')}
      aria-labelledby="about-andres-heading"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)]/80 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <UserRound className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
        <div>
          <h2
            id="about-andres-heading"
            className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))]"
          >
            {block.name}
          </h2>
          <p className="text-sm text-[rgb(var(--text-secondary))]">{block.role}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
        {block.description}
      </p>
      <ul className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
        {block.highlights?.map((item: any) => (
          <li key={`${item.label}-${item.text}`}>
            {item.label ? (
              <span className="font-semibold text-[rgb(var(--text-primary))]">{item.label}</span>
            ) : null}{' '}
            {isWebsiteHighlight(item.label || '') ? (
              <a
                href={block.websiteUrl}
                className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
              >
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </li>
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
