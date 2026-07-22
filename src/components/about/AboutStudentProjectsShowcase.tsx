'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { GraduationCap, TrendingUp } from 'lucide-react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { BrandVibrantButton } from '@/components/ui/BrandVibrantButton'
import { marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { StudentProject } from '@/types/about'

const CATEGORY_LABELS: Record<StudentProject['category'], string> = {
  lean: 'LEAN',
  process: 'PROCESS',
  quality: 'QUALITY',
  strategic: 'STRATEGIC',
  supplychain: 'SUPPLY CHAIN',
  other: 'OTHER',
}

function MetaBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[10px] font-700 tracking-wider uppercase text-slate-600 dark:text-slate-400',
        marketingMicroPillClass,
        className,
      )}
    >
      {children}
    </span>
  )
}

function StudentProjectCard({ project, index }: { project: StudentProject; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const categoryLabel =
    CATEGORY_LABELS[project.category] ?? project.category.toUpperCase()
  
  // A rough estimate: 150 characters is typically around 3-4 lines depending on the container width
  const hasLongDescription = project.projectDescription && project.projectDescription.length > 150

  return (
    <article
      className="group/project relative flex h-full flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div
        className={cn(
          'relative flex h-full flex-col overflow-hidden !p-8 transition-all duration-300 group-hover/project:border-blue-400/40 group-hover/project:shadow-md dark:group-hover/project:border-blue-500/30',
          marketingInsetCardClass,
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-blue-100/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-blue-400/[0.07] blur-3xl dark:bg-blue-500/15"
          aria-hidden
        />

        <div className="relative flex flex-1 flex-col">
          <div className="mb-6 flex items-start justify-between gap-3">
            <MetaBadge>{project.year}</MetaBadge>
            <MetaBadge>{categoryLabel}</MetaBadge>
          </div>

          <div className="text-xl font-700 text-slate-900 dark:text-white mt-4 leading-snug transition-colors duration-300 group-hover/project:text-blue-800 dark:group-hover/project:text-blue-400">
            {project.projectTitle}
          </div>

          <p className="text-xs font-600 tracking-widest text-slate-400 dark:text-slate-500 uppercase mt-2 mb-6">
            {project.studentName}
          </p>

          {project.university?.trim() ? (
            <div className="flex items-center gap-2 mt-6 mb-6">
              <GraduationCap className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500 shrink-0" />
              <span className="text-xs font-600 tracking-wider text-slate-700 dark:text-slate-300 uppercase">
                {project.university}
              </span>
            </div>
          ) : null}

          {project.projectDescription?.trim() ? (
            <div className="flex-1 mb-6">
              <p className={cn("text-xs leading-relaxed text-[rgb(var(--text-secondary))]/85 transition-all duration-300", !isExpanded && "line-clamp-4")}>
                {project.projectDescription}
              </p>
              {hasLongDescription && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-[11px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  {isExpanded ? 'Näita vähem' : 'Vaata kogu teksti'}
                </button>
              )}
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {project.result?.trim() ? (
            <div className="mt-auto border-t border-slate-200/80 pt-5 dark:border-white/[0.08]">
              <div
                className={cn(
                  'rounded-xl p-4',
                  'bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 text-emerald-950',
                  'dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300',
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-200/80 bg-emerald-50 dark:border-emerald-500/25 dark:bg-emerald-500/10">
                    <TrendingUp
                      className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="mb-1 text-[9px] font-black uppercase tracking-[0.22em] text-emerald-700/80 dark:text-emerald-400/80">
                      Tulemus:
                    </p>
                    <p className="text-[12px] font-medium leading-snug text-slate-800 dark:text-slate-200">
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

type Props = {
  projects: StudentProject[]
  eyebrow?: string
  /** True when achievement cards sit above this block (adds top breathing room). */
  hasContentAbove?: boolean
}

export default function AboutStudentProjectsShowcase({
  projects,
  eyebrow = 'Õpilaste Edulood',
  hasContentAbove = false,
}: Props) {
  if (!projects.length) return null

  return (
    <div className={cn('relative', hasContentAbove ? 'mt-20' : 'mt-0')}>
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-64 -z-10">
        <div className="absolute left-1/2 top-0 h-[min(320px,70vw)] w-[min(720px,95vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.14),transparent_68%)] blur-[80px]" />
        <div className="absolute bottom-0 left-[15%] h-48 w-48 rounded-full bg-indigo-400/[0.08] blur-[70px] dark:bg-indigo-500/15" />
        <div className="absolute bottom-4 right-[12%] h-40 w-40 rounded-full bg-cyan-400/[0.06] blur-[60px] dark:bg-cyan-500/12" />
      </div>

      <div className="relative z-10 mb-10 flex justify-center">
        <EyebrowPillBadge text={eyebrow} showDots />
      </div>

      <div className="relative z-10 mx-auto grid w-full gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {projects.map((project, index) => (
          <StudentProjectCard
            key={`${project.projectTitle}-${project.year}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>

      <div className="relative z-10 mt-14 flex justify-center sm:mt-16">
        <BrandVibrantButton href="/juhendatud-loputood" variant="marketing">
          Vaata kõiki lõputöid
        </BrandVibrantButton>
      </div>
    </div>
  )
}
