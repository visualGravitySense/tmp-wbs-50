import { type ReactNode } from 'react'
import { Clock, ExternalLink, LucideIcon, Mail, MapPin, Phone } from 'lucide-react'
import { BrandVibrantButton, glassPanelVariantClasses } from '@/components/ui'
import KontaktQuickContactForm from '@/components/kontakt/KontaktQuickContactForm'
import { mapsUrl } from '@/lib/contact/businessInfo'
import { cn } from '@/lib/utils'

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)]/80 bg-blue-500/10 text-blue-600 dark:text-blue-400">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[rgb(var(--text-secondary))]">
          {label}
        </p>
        <div className="mt-1 text-sm font-medium text-[rgb(var(--text-primary))] sm:text-[15px]">{children}</div>
      </div>
    </div>
  )
}

interface KontaktQuickProps {
  block: any
}

export default function KontaktQuick({ block: q }: KontaktQuickProps) {
  return (
    <section
      className={cn(glassPanelVariantClasses.card, 'h-full space-y-6 !p-6 sm:!p-8')}
      aria-labelledby="quick-contact-heading"
    >
      <h2
        id="quick-contact-heading"
        className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
      >
        {q.sectionTitle}
      </h2>

      <div className="space-y-5">
        <ContactRow icon={Mail} label={q.labelEmail}>
          <ul className="space-y-2">
            {q.emails?.map((item: any) => (
              <li key={item.address}>
                {item.label ? (
                  <span className="block text-xs text-[rgb(var(--text-secondary))]">{item.label}</span>
                ) : null}
                <a
                  href={`mailto:${item.address}`}
                  className="break-all underline-offset-2 transition-colors hover:text-blue-600 hover:underline"
                >
                  {item.address}
                </a>
              </li>
            ))}
          </ul>
        </ContactRow>

        <ContactRow icon={Phone} label={q.labelPhone}>
          <a
            href={`tel:${q.phoneTel}`}
            className="underline-offset-2 transition-colors hover:text-blue-600 hover:underline"
          >
            {q.phoneDisplay}
          </a>
        </ContactRow>

        <ContactRow icon={MapPin} label={q.labelAddress}>
          <address className="not-italic leading-relaxed">
            {q.addressStreet}
            <br />
            {q.addressPostalCode} {q.addressCity}, {q.addressCountry}
          </address>
          <a
            href={mapsUrl(q.mapQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
          >
            {q.mapLinkLabel}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </ContactRow>

        <ContactRow icon={Clock} label={q.labelResponse}>
          <p>{q.responseNote}</p>
        </ContactRow>
      </div>

      <KontaktQuickContactForm />

      <div className="flex flex-col gap-3 border-t border-[var(--border)]/70 pt-6 sm:flex-row">
        <BrandVibrantButton href={`mailto:${q.primaryEmailForButtons || (q.emails?.[0]?.address)}`} className="justify-center">
          {q.emailButtonText}
        </BrandVibrantButton>
        <a
          href={`tel:${q.phoneTel}`}
          className="inline-flex items-center justify-center rounded-full border-2 border-[var(--border)] bg-transparent px-6 py-3 text-sm font-bold text-[rgb(var(--text-primary))] transition-colors hover:border-blue-400/50 hover:bg-blue-500/5"
        >
          {q.phoneButtonText}
        </a>
      </div>
    </section>
  )
}
