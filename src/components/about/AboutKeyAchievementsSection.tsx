import { MarketingContainer, Section, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import type { KeyAchievementsSection } from '@/types/about'
import AboutStudentProjectsShowcase from '@/components/about/AboutStudentProjectsShowcase'
import { getIconByName } from '@/lib/about-fontawesome-icons'

type Props = {
  data: KeyAchievementsSection
}

export default function AboutKeyAchievementsSection({ data }: Props) {
  const hasAchievements = Boolean(data.achievements && data.achievements.length > 0)
  const resolvedProjects = data.studentProjects && data.studentProjects.length > 0
    ? data.studentProjects
    : data.fallbackProjects
  const hasStudentProjects = Boolean(resolvedProjects && resolvedProjects.length > 0)

  return (
    <Section variant="band">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[12%] h-[min(420px,70vw)] w-[min(420px,70vw)] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.22),transparent_62%)] blur-[90px]" />
        <div className="absolute bottom-[8%] right-[6%] h-[min(380px,65vw)] w-[min(380px,65vw)] rounded-full bg-[radial-gradient(circle_at_70%_50%,rgba(129,140,248,0.14),transparent_58%)] blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[min(280px,55vw)] w-[min(280px,55vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_65%)] blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_0%,transparent_25%,transparent_75%,rgba(0,0,0,0.06)_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,transparent_70%,rgba(0,0,0,0.25)_100%)]" />
      </div>

      <MarketingContainer elevated>
        <div className={cn('text-center', hasAchievements || !hasStudentProjects ? 'mb-20' : 'mb-10')}>
          <div className="mb-6 flex justify-center"><EyebrowPillBadge text="Edu & mõju" /></div>
          <h2 className="mb-6 text-4xl font-black leading-none tracking-tighter text-[rgb(var(--text-primary))] md:text-6xl">
            {data.title}
          </h2>
          {data.description && (
            <p className="mx-auto max-w-4xl text-xl font-medium italic leading-relaxed text-[rgb(var(--text-secondary))] opacity-90">
              {data.description}
            </p>
          )}
          <div className="mx-auto mt-10 flex max-w-md items-center gap-3 px-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent opacity-70 dark:via-white/15" />
            <div className="flex gap-1.5">
              <span className="h-1 w-1 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.45)] dark:shadow-[0_0_14px_rgba(29,97,255,0.5)]" />
              <span className="h-1 w-1 rounded-full bg-blue-600/35 dark:bg-blue-400/30" />
              <span className="h-1 w-1 rounded-full bg-blue-600/15 dark:bg-blue-400/15" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[rgb(var(--border))] to-transparent opacity-70 dark:via-white/15" />
          </div>
        </div>

        {data.achievements && data.achievements.length > 0 && (
          <div className="mx-auto mb-24 grid w-full gap-8 md:grid-cols-3">
            {data.achievements.map((achievement, index) => (
              <div key={index} className="group/key h-full">
                <div className={`h-full !p-8 text-center ${marketingInsetCardClass}`}>
                  <div className="relative mb-6 flex justify-center">
                    <div className="absolute inset-0 m-auto h-24 w-24 scale-90 rounded-3xl bg-blue-500/15 opacity-0 blur-2xl transition-all duration-500 group-hover/key:scale-100 group-hover/key:opacity-100 dark:bg-blue-500/30" />
                    <div className={`relative flex h-16 w-16 items-center justify-center ${marketingMicroPillClass}`}>
                      <span className="text-[2.15rem] leading-none text-blue-600 transition-transform duration-500 group-hover/key:scale-110 group-hover/key:-rotate-6 dark:text-blue-400">
                        {achievement.icon && (() => {
                          const Icon = getIconByName(achievement.icon as string)
                          return <Icon className="h-[2.15rem] w-[2.15rem] text-blue-600 dark:text-blue-400" />
                        })()}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 text-xl font-black uppercase italic tracking-tight text-[rgb(var(--text-primary))] transition-colors duration-300 group-hover/key:text-blue-700 dark:group-hover/key:text-blue-400">
                    {achievement.title}
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-[rgb(var(--text-secondary))]">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {hasStudentProjects && (
          <AboutStudentProjectsShowcase
            projects={resolvedProjects!}
            hasContentAbove={hasAchievements}
          />
        )}
      </MarketingContainer>
    </Section>
  )
}
