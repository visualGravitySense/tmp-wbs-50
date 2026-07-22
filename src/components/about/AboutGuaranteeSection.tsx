import { Calendar, MessageCircle, Shield, type LucideIcon } from 'lucide-react'

import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import {
  BrandVibrantButton,
  Card,
  CardContent,
  MarketingContainer,
  Section,
  WhiteButton,
  marketingInsetCardClass,
  marketingMicroPillClass,
} from '@/components/ui'
import type { GuaranteePillar, GuaranteeSection } from '@/types/about'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, LucideIcon> = {
  shield: Shield,
  calendar: Calendar,
  'message-circle': MessageCircle,
}

const DEFAULT_DATA: GuaranteeSection = {
  eyebrow: 'RISKIVABA OSALEMINE',
  headline: 'Kui ei sobi — raha tagasi',
  subtext:
    'Osale esimesel koolituspäeval. Kui tunned, et programm ei vasta ootustele — annan kogu osalustasu tagasi. Küsimusteta.',
  pillars: [
    {
      icon: 'shield',
      title: '100% tagatis',
      text: 'Esimene päev on riskivaba. Ei meeldi — saad raha tagasi.',
    },
    {
      icon: 'calendar',
      title: '14 päeva järelmõtlemist',
      text: 'Pärast registreerumist saad 14 päeva otsust muuta.',
    },
    {
      icon: 'message-circle',
      title: 'Aus vestlus enne',
      text: 'Pole kindel kas sobib? Räägime enne läbi — tasuta 30min kõne.',
    },
  ],
  primaryButton: {
    text: 'Registreeru riskivabalt',
    link: '#registreeru',
  },
  secondaryButton: {
    text: 'Broneeri tasuta kõne',
    link: '/kontakt',
  },
}

type Props = {
  data?: GuaranteeSection | null
}

function resolveIcon(name?: string): LucideIcon {
  return ICON_MAP[name ?? ''] ?? Shield
}

function mergeGuaranteeData(data?: GuaranteeSection | null): GuaranteeSection {
  if (!data) return DEFAULT_DATA

  return {
    eyebrow: data.eyebrow?.trim() || DEFAULT_DATA.eyebrow,
    headline: data.headline?.trim() || DEFAULT_DATA.headline,
    subtext: data.subtext?.trim() || DEFAULT_DATA.subtext,
    pillars:
      data.pillars?.length && data.pillars.some((p) => p.title?.trim())
        ? data.pillars.map((pillar, index) => ({
            icon: pillar.icon || DEFAULT_DATA.pillars[index]?.icon || 'shield',
            title: pillar.title?.trim() || DEFAULT_DATA.pillars[index]?.title || '',
            text: pillar.text?.trim() || DEFAULT_DATA.pillars[index]?.text || '',
          }))
        : DEFAULT_DATA.pillars,
    primaryButton: {
      text: data.primaryButton?.text?.trim() || DEFAULT_DATA.primaryButton.text,
      link: data.primaryButton?.link?.trim() || DEFAULT_DATA.primaryButton.link,
    },
    secondaryButton: {
      text: data.secondaryButton?.text?.trim() || DEFAULT_DATA.secondaryButton.text,
      link: data.secondaryButton?.link?.trim() || DEFAULT_DATA.secondaryButton.link,
    },
  }
}

function GuaranteePillarCard({ pillar }: { pillar: GuaranteePillar }) {
  const Icon = resolveIcon(pillar.icon)

  return (
    <Card className={cn(marketingInsetCardClass, 'h-full border-[rgb(var(--border))]/60 bg-[rgb(var(--bg-primary))]/80')}>
      <CardContent className="flex h-full flex-col items-center p-6 text-center sm:p-8">
        <div
          className={cn(
            'mb-5 flex h-14 w-14 items-center justify-center',
            marketingMicroPillClass,
          )}
        >
          <Icon
            className="h-7 w-7 text-[rgb(var(--color-primary))] dark:text-blue-400"
            strokeWidth={1.75}
            aria-hidden
          />
        </div>
        <h3 className="mb-3 text-lg font-black tracking-tight text-[rgb(var(--text-primary))]">
          {pillar.title}
        </h3>
        <p className="text-sm font-medium leading-relaxed text-[rgb(var(--text-secondary))]">
          {pillar.text}
        </p>
      </CardContent>
    </Card>
  )
}

export default function AboutGuaranteeSection({ data }: Props) {
  const content = mergeGuaranteeData(data)

  return (
    <Section variant="band" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[rgb(var(--bg-secondary))]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(var(--color-primary),0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(var(--color-primary),0.08),transparent_50%)]" />
      </div>

      <div
        className="pointer-events-none absolute -right-8 top-1/2 -z-10 hidden -translate-y-1/2 opacity-[0.07] lg:block xl:-right-4"
        aria-hidden
      >
        <Shield className="h-[min(28rem,50vw)] w-[min(28rem,50vw)] text-[rgb(var(--color-primary))]" strokeWidth={0.75} />
      </div>

      <MarketingContainer elevated>
        <div className="relative mx-auto max-w-3xl text-center">
          {content.eyebrow ? (
            <div className="mb-6 flex justify-center">
              <EyebrowPillBadge text={content.eyebrow} />
            </div>
          ) : null}
          <h2 className="mb-5 text-3xl font-black leading-tight tracking-tight text-[rgb(var(--text-primary))] md:text-5xl">
            {content.headline}
          </h2>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-[rgb(var(--text-secondary))] md:text-lg">
            {content.subtext}
          </p>
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-8">
          {content.pillars.map((pillar, index) => (
            <GuaranteePillarCard key={`${pillar.title}-${index}`} pillar={pillar} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <BrandVibrantButton href={content.primaryButton.link} icon={Shield} className="w-full sm:w-auto">
            {content.primaryButton.text}
          </BrandVibrantButton>
          <WhiteButton href={content.secondaryButton.link} icon={MessageCircle} className="w-full sm:w-auto">
            {content.secondaryButton.text}
          </WhiteButton>
        </div>
      </MarketingContainer>
    </Section>
  )
}
