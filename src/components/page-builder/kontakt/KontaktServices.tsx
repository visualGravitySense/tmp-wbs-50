import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BrandVibrantButton } from '@/components/ui'

interface KontaktServicesProps {
  block: any
}

export default function KontaktServices({ block }: KontaktServicesProps) {
  return (
    <section
      className={cn('mt-8 !p-6 sm:!p-8', 'md:!px-0')}
      aria-labelledby="services-heading"
    >
      <h2
        id="services-heading"
        className="mb-4 text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
      >
        {block.sectionTitle}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {block.items?.map((item: any) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[var(--border)]/70 bg-[rgb(var(--bg-secondary))]/50 p-4 sm:p-5"
          >
            <h3 className="font-bold text-[rgb(var(--text-primary))]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">{item.text}</p>
            {item.href ? (
              <Link
                href={item.href}
                className="mt-3 inline-flex text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                {item.label} →
              </Link>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-start gap-4 border-t border-[var(--border)]/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm text-[rgb(var(--text-secondary))]">
          {block.registerNote}
        </p>
        {block.registerButtonHref && (
          <BrandVibrantButton href={block.registerButtonHref}>
            {block.registerButtonText}
          </BrandVibrantButton>
        )}
      </div>
    </section>
  )
}
