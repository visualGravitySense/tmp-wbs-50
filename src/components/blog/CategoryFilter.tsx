'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BlogCategory } from '@/types/blog'

interface CategoryFilterProps {
  currentCategory?: BlogCategory
  allLabel: string
  categories: Array<{
    value: string
    label: string
  }>
  counts: Record<string, number>
}

export default function CategoryFilter({ currentCategory, allLabel, categories, counts }: CategoryFilterProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleCategoryChange = (category: BlogCategory | null) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')
    
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    
    const query = params.toString()
    router.push(query ? `/blog?${query}` : '/blog')
  }

  const pillBase =
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest transition-all duration-300 ease-out'

  const activeClasses = 
    'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/50 transform scale-105'

  const activeBadgeClasses = 
    'rounded-full bg-white/20 px-2 py-0.5 backdrop-blur-sm shadow-inner shadow-black/10'

  const inactiveClasses =
    'bg-slate-50/60 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 shadow-sm hover:bg-white/80 dark:hover:bg-slate-800/70 hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300/80 dark:hover:border-slate-600/80'

  const inactiveBadgeClasses =
    'rounded-full bg-slate-200/60 dark:bg-slate-700/60 px-2 py-0.5 text-slate-500 dark:text-slate-400 border border-slate-300/30 dark:border-slate-600/30'

  return (
    <div className="flex flex-wrap items-center gap-3 py-1">
      <button
        type="button"
        onClick={() => handleCategoryChange(null)}
        className={cn(pillBase, !currentCategory ? activeClasses : inactiveClasses)}
      >
        <span>{allLabel}</span>
        <span className={!currentCategory ? activeBadgeClasses : inactiveBadgeClasses}>
          {counts.all ?? 0}
        </span>
      </button>

      {categories.map((category) => {
        const isActive = currentCategory === category.value
        return (
          <button
            key={category.value}
            type="button"
            onClick={() => handleCategoryChange(category.value)}
            className={cn(pillBase, isActive ? activeClasses : inactiveClasses)}
          >
            <span>{category.label}</span>
            <span className={isActive ? activeBadgeClasses : inactiveBadgeClasses}>
              {counts[category.value] ?? 0}
            </span>
          </button>
        )
      })}
    </div>
  )
}
