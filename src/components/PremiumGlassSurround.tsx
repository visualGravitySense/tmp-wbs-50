import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Chromatic rim + frosted inner panel — not used elsewhere in the app yet.
 * Layers: ambient halo → 1px gradient bezel → blurred glass slab + diagonal wash + top hairline specular.
 */
export function PremiumGlassSurround({
  children,
  className,
  panelClassName,
  compact,
  backgroundColor = 'blue-purple',
}: {
  children: ReactNode
  className?: string
  /** Padding / radius passed to inner panel */
  panelClassName?: string
  compact?: boolean
  backgroundColor?: string
}) {
  const rOuter = compact ? 'rounded-[1.15rem]' : 'rounded-[1.35rem]'
  const rInner = compact ? 'rounded-[calc(1.15rem-1px)]' : 'rounded-[calc(1.35rem-1px)]'

  // Define dynamic glow radial gradients based on selected backgroundColor
  let glowLight = 'bg-[radial-gradient(ellipse_78%_70%_at_50%_-8%,rgba(59,130,246,0.16),transparent_52%),radial-gradient(ellipse_48%_40%_at_100%_88%,rgba(139,92,246,0.1),transparent_48%),radial-gradient(ellipse_42%_36%_at_0%_92%,rgba(6,182,212,0.09),transparent_46%)]'
  let glowDark = 'dark:bg-[radial-gradient(ellipse_78%_70%_at_50%_-8%,rgba(59,130,246,0.22),transparent_52%),radial-gradient(ellipse_46%_38%_at_100%_85%,rgba(147,112,219,0.14),transparent_46%),radial-gradient(ellipse_40%_34%_at_0%_90%,rgba(34,211,238,0.1),transparent_44%)]'
  
  let bevelClass = 'bg-gradient-to-br from-white via-blue-100/45 to-indigo-100/35 dark:from-white/[0.14] dark:via-blue-500/[0.12] dark:to-violet-500/[0.1]'
  
  let bloomTopRight = 'bg-blue-400/18 dark:bg-blue-500/22'
  let bloomBottomLeft = 'bg-violet-400/14 dark:bg-violet-500/18'
  
  if (backgroundColor === 'purple-pink') {
    glowLight = 'bg-[radial-gradient(ellipse_78%_70%_at_50%_-8%,rgba(168,85,247,0.16),transparent_52%),radial-gradient(ellipse_48%_40%_at_100%_88%,rgba(236,72,153,0.1),transparent_48%),radial-gradient(ellipse_42%_36%_at_0%_92%,rgba(99,102,241,0.09),transparent_46%)]'
    glowDark = 'dark:bg-[radial-gradient(ellipse_78%_70%_at_50%_-8%,rgba(168,85,247,0.22),transparent_52%),radial-gradient(ellipse_46%_38%_at_100%_85%,rgba(236,72,153,0.14),transparent_46%),radial-gradient(ellipse_40%_34%_at_0%_90%,rgba(99,102,241,0.1),transparent_44%)]'
    bevelClass = 'bg-gradient-to-br from-white via-purple-100/45 to-pink-100/35 dark:from-white/[0.14] dark:via-purple-500/[0.12] dark:to-pink-500/[0.1]'
    bloomTopRight = 'bg-purple-400/18 dark:bg-purple-500/22'
    bloomBottomLeft = 'bg-pink-400/14 dark:bg-pink-500/18'
  } else if (backgroundColor === 'green-blue') {
    glowLight = 'bg-[radial-gradient(ellipse_78%_70%_at_50%_-8%,rgba(16,185,129,0.16),transparent_52%),radial-gradient(ellipse_48%_40%_at_100%_88%,rgba(59,130,246,0.1),transparent_48%),radial-gradient(ellipse_42%_36%_at_0%_92%,rgba(13,148,136,0.09),transparent_46%)]'
    glowDark = 'dark:bg-[radial-gradient(ellipse_78%_70%_at_50%_-8%,rgba(16,185,129,0.22),transparent_52%),radial-gradient(ellipse_46%_38%_at_100%_85%,rgba(59,130,246,0.14),transparent_46%),radial-gradient(ellipse_40%_34%_at_0%_90%,rgba(13,148,136,0.1),transparent_44%)]'
    bevelClass = 'bg-gradient-to-br from-white via-green-100/45 to-blue-100/35 dark:from-white/[0.14] dark:via-green-500/[0.12] dark:to-blue-500/[0.1]'
    bloomTopRight = 'bg-green-400/18 dark:bg-green-500/22'
    bloomBottomLeft = 'bg-blue-400/14 dark:bg-blue-500/18'
  } else if (backgroundColor === 'orange-red') {
    glowLight = 'bg-[radial-gradient(ellipse_78%_70%_at_50%_-8%,rgba(249,115,22,0.18),transparent_52%),radial-gradient(ellipse_48%_40%_at_100%_88%,rgba(239,68,68,0.12),transparent_48%),radial-gradient(ellipse_42%_36%_at_0%_92%,rgba(245,158,11,0.1),transparent_46%)]'
    glowDark = 'dark:bg-[radial-gradient(ellipse_78%_70%_at_50%_-8%,rgba(249,115,22,0.24),transparent_52%),radial-gradient(ellipse_46%_38%_at_100%_85%,rgba(239,68,68,0.16),transparent_46%),radial-gradient(ellipse_40%_34%_at_0%_90%,rgba(245,158,11,0.12),transparent_44%)]'
    bevelClass = 'bg-gradient-to-br from-white via-orange-100/45 to-red-100/35 dark:from-white/[0.14] dark:via-orange-500/[0.12] dark:to-red-500/[0.1]'
    bloomTopRight = 'bg-orange-400/18 dark:bg-orange-500/22'
    bloomBottomLeft = 'bg-red-400/14 dark:bg-red-500/18'
  } else if (backgroundColor === 'blue-lightblue') {
    glowLight = 'bg-[radial-gradient(ellipse_78%_70%_at_50%_-8%,rgba(37,99,235,0.16),transparent_52%),radial-gradient(ellipse_48%_40%_at_100%_88%,rgba(14,165,233,0.1),transparent_48%),radial-gradient(ellipse_42%_36%_at_0%_92%,rgba(79,70,229,0.09),transparent_46%)]'
    glowDark = 'dark:bg-[radial-gradient(ellipse_78%_70%_at_50%_-8%,rgba(37,99,235,0.22),transparent_52%),radial-gradient(ellipse_46%_38%_at_100%_85%,rgba(14,165,233,0.14),transparent_46%),radial-gradient(ellipse_40%_34%_at_0%_90%,rgba(79,70,229,0.1),transparent_44%)]'
    bevelClass = 'bg-gradient-to-br from-white via-blue-100/45 to-sky-100/35 dark:from-white/[0.14] dark:via-blue-500/[0.12] dark:to-sky-500/[0.1]'
    bloomTopRight = 'bg-blue-400/18 dark:bg-blue-500/22'
    bloomBottomLeft = 'bg-sky-400/14 dark:bg-sky-500/18'
  }

  return (
    <div className={cn('relative min-w-0', className)}>
      <div
        className={cn(
          'pointer-events-none absolute -inset-3 blur-2xl opacity-95 dark:opacity-100 md:-inset-5',
          rOuter,
          glowLight,
          glowDark
        )}
        aria-hidden
      />

      <div className="relative p-px">
        <div
          className={cn(
            'absolute inset-0 opacity-95',
            bevelClass,
            rOuter
          )}
          aria-hidden
        />
        <div
          className={cn(
            'relative overflow-hidden border border-white/75 shadow-[0_22px_60px_-34px_rgba(15,23,42,0.28),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-[26px] backdrop-saturate-[1.42] dark:border-white/[0.1] dark:bg-[rgb(var(--bg-secondary))/0.44] dark:shadow-[0_28px_70px_-40px_rgba(0,0,0,0.82),inset_0_1px_0_rgba(255,255,255,0.08)]',
            rInner,
            'bg-white/[0.38]',
            panelClassName
          )}
          style={{ WebkitBackdropFilter: 'blur(26px) saturate(1.42)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(168deg,rgba(255,255,255,0.5)_0%,transparent_42%,rgba(59,130,246,0.05)_92%)] opacity-95 dark:bg-[linear-gradient(168deg,rgba(255,255,255,0.06)_0%,transparent_44%,rgba(99,102,241,0.1)_92%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-85 dark:inset-x-8 dark:via-white/35"
            aria-hidden
          />
          {/* Corner bloom — premium sparkle */}
          <div
            className={cn(
              "pointer-events-none absolute -right-12 -top-10 h-[min(140px,40vw)] w-[min(140px,40vw)] rounded-full blur-3xl",
              bloomTopRight
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute -bottom-14 -left-10 h-[min(120px,35vw)] w-[min(120px,35vw)] rounded-full blur-3xl",
              bloomBottomLeft
            )}
            aria-hidden
          />

          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
