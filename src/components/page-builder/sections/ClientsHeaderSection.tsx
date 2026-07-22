import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import type { ClientsHeaderBlock } from '@/types/mainPageSections'

type Props = {
  block: ClientsHeaderBlock
  clientsCount?: number
}

export function ClientsHeaderSection({ block, clientsCount }: Props) {
  const eyebrowText = block.clientsEyebrow || (clientsCount ? `${clientsCount}+ ettevõtet` : 'Kliendid')
  const mainHeadline = block.clientsMainHeadline || 'Meie Kliendid &'
  const scriptHeadline = block.clientsScriptHeadline || 'Partnerid'
  const description = block.clientsDescription || 'Oleme aidanud optimeerida tootmist ja juurutada LEAN-põhimõtteid paljudes edukates ettevõtetes. Siin on valik meie klientidest.'

  return (
    <div className="relative z-10 pt-28 pb-16 md:pt-36">
      <Container size="6xl" className="relative mx-auto px-4 md:px-8">
        <Section variant="minimal" className="relative mb-0 flex flex-col items-center text-center">
          <EyebrowPillBadge flow text={eyebrowText} />

          <h1 className="mb-6 min-w-0 overflow-visible break-words pb-2 text-3xl font-extrabold leading-[1.1] tracking-tight text-[#122136] hyphens-auto dark:text-white sm:pb-3 sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block text-[rgb(var(--text-primary))] break-words">
              {mainHeadline}
            </span>
            {scriptHeadline && (
              <span className="text-marketing-accent-shell mt-2 block overflow-visible pt-1 pb-3 font-serif font-normal italic text-[#0055E5] dark:text-sky-400 normal-case tracking-normal sm:pb-4">
                <span className="hero-headline-accent block whitespace-pre-line">
                  {scriptHeadline}
                </span>
              </span>
            )}
          </h1>

          <p className="mt-3 mb-8 md:mb-10 text-slate-600 dark:text-slate-400 max-w-xl text-sm lg:text-base leading-relaxed mx-auto">
            {description}
          </p>
        </Section>
      </Container>
    </div>
  )
}
