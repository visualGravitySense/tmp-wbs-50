import { marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ExperienceCardProps {
  title: string
  subtitle?: string
  year: string
  description: string
  emoji?: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
  className?: string
}

const accentStripes = {
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-emerald-500 to-teal-500',
  purple: 'from-purple-500 to-fuchsia-500',
  orange: 'from-orange-500 to-amber-500',
} as const

type ExperienceIconKey = 'tootmine' | 'koolitamine' | 'konsultatsioon' | 'fallback'

export default function ExperienceCard({
  title,
  subtitle,
  year,
  description,
  emoji,
  color = 'blue',
  className = '',
}: ExperienceCardProps) {
  const accentStripe = accentStripes[color]

  const getIconKey = (t: string): ExperienceIconKey => {
    const titleLower = t.toLowerCase()
    if (titleLower.includes('tootmine') || titleLower.includes('manufacturing') || titleLower.includes('lean')) return 'tootmine'
    if (titleLower.includes('koolit') || titleLower.includes('training') || titleLower.includes('development')) return 'koolitamine'
    if (titleLower.includes('konsultat') || titleLower.includes('consult')) return 'konsultatsioon'
    return 'fallback'
  }

  const renderPremiumIcon = (iconKey: ExperienceIconKey) => {
    switch (iconKey) {
      case 'tootmine':
        return (
          <svg width="24" height="24" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <defs>
              <radialGradient id="exp-b1" cx="30%" cy="20%" r="75%">
                <stop offset="0%" stopColor="#a8edff" />
                <stop offset="45%" stopColor="#2196f3" />
                <stop offset="100%" stopColor="#0040c8" />
              </radialGradient>
              <radialGradient id="exp-b1hi" cx="40%" cy="20%" r="70%">
                <stop offset="0%" stopColor="rgba(255,255,255,.9)" />
                <stop offset="100%" stopColor="rgba(180,230,255,.35)" />
              </radialGradient>
            </defs>
            <rect x="10" y="8" width="14" height="22" rx="5" fill="url(#exp-b1)" />
            <rect x="12" y="10" width="6" height="8" rx="2.5" fill="url(#exp-b1hi)" opacity=".7" />
            <rect x="28" y="14" width="12" height="16" rx="4.5" fill="url(#exp-b1)" />
            <rect x="30" y="16" width="5" height="6" rx="2" fill="url(#exp-b1hi)" opacity=".65" />
            <rect x="6" y="32" width="68" height="38" rx="14" fill="url(#exp-b1)" />
            <rect x="10" y="36" width="28" height="12" rx="6" fill="url(#exp-b1hi)" opacity=".55" />
            <rect x="14" y="52" width="12" height="10" rx="4" fill="url(#exp-b1hi)" opacity=".45" />
            <rect x="31" y="52" width="12" height="10" rx="4" fill="url(#exp-b1hi)" opacity=".45" />
            <rect x="48" y="52" width="12" height="10" rx="4" fill="url(#exp-b1hi)" opacity=".45" />
          </svg>
        )
      case 'koolitamine':
        return (
          <svg width="24" height="24" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <defs>
              <radialGradient id="exp-b2" cx="30%" cy="20%" r="75%">
                <stop offset="0%" stopColor="#b9fbc0" />
                <stop offset="42%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#14532d" />
              </radialGradient>
              <radialGradient id="exp-b2hi" cx="35%" cy="22%" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,.88)" />
                <stop offset="100%" stopColor="rgba(180,255,200,.16)" />
              </radialGradient>
            </defs>
            <path d="M8 30L40 14L72 30L40 46L8 30Z" fill="url(#exp-b2)" />
            <path d="M20 37V50C20 56 29 62 40 62C51 62 60 56 60 50V37" fill="url(#exp-b2)" />
            <path d="M60 33V50" stroke="url(#exp-b2)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="60" cy="55" r="5" fill="url(#exp-b2)" />
            <path d="M30 30L40 35L52 27" stroke="url(#exp-b2hi)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'konsultatsioon':
        return (
          <svg width="24" height="24" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <defs>
              <radialGradient id="exp-b3" cx="30%" cy="20%" r="75%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="42%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
              <radialGradient id="exp-b3hi" cx="35%" cy="22%" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,.9)" />
                <stop offset="100%" stopColor="rgba(255,210,140,.2)" />
              </radialGradient>
            </defs>
            <path d="M24 44C18 38 13 33 13 26C13 20 18 15 24 15C29 15 33 18 36 22C39 18 43 15 48 15C54 15 59 20 59 26C59 33 54 38 48 44L36 55L24 44Z" fill="url(#exp-b3)" />
            <path d="M50 42C45 37 41 33 41 28C41 23 45 20 49 20C53 20 56 22 58 25C60 22 63 20 67 20C71 20 75 23 75 28C75 33 71 37 66 42L58 50L50 42Z" fill="url(#exp-b3)" opacity=".9" />
            <path d="M21 26C21 22 24 19 28 19C31 19 33 20.5 34.5 22.5" stroke="url(#exp-b3hi)" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M48 28C48 25 50 23 53 23C55 23 56.5 24 57.5 25.5" stroke="url(#exp-b3hi)" strokeWidth="2.4" strokeLinecap="round" opacity=".85" />
          </svg>
        )
      default:
        return <span className="text-xl">{emoji || '✨'}</span>
    }
  }

  const iconKey = getIconKey(title)

  return (
    <div className={cn('group/card relative', className)}>
      <div className={cn('relative overflow-hidden !p-6 !pl-9 transition-all duration-500', marketingInsetCardClass)}>
        <div
          className={cn(
            'pointer-events-none absolute bottom-6 left-3 top-6 w-[3px] rounded-full bg-gradient-to-b opacity-90',
            accentStripe,
          )}
        />

        <div className="relative z-10">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <div
                className={cn(
                  'relative flex h-12 w-12 shrink-0 items-center justify-center',
                  marketingMicroPillClass,
                )}
              >
                {renderPremiumIcon(iconKey)}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold leading-snug tracking-tight text-[rgb(var(--text-primary))]">
                  {title}
                </h3>
                {subtitle ? (
                  <p className="mt-1 text-sm font-medium leading-snug text-[rgb(var(--text-secondary))]">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>
            <span className={cn('shrink-0 px-3 py-1 text-[11px] font-bold tabular-nums', marketingMicroPillClass)}>
              {year}
            </span>
          </div>

          <p className="text-sm font-medium leading-relaxed text-[rgb(var(--text-secondary))]">{description}</p>
        </div>
      </div>
    </div>
  )
}
