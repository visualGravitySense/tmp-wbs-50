import ContactPageForm from '@/components/kontakt/ContactPageForm'
import { cn } from '@/lib/utils'
import { glassPanelVariantClasses } from '@/components/ui'

interface KontaktFormProps {
  block: any
}

export default function KontaktForm({ block }: KontaktFormProps) {
  return (
    <section
      className={cn(glassPanelVariantClasses.card, 'h-full !p-6 sm:!p-8')}
      aria-labelledby="form-heading"
    >
      <h2
        id="form-heading"
        className="mb-2 text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
      >
        {block.sectionTitle}
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
        {block.sectionDescription}
      </p>
      <ContactPageForm copy={block} />
    </section>
  )
}
