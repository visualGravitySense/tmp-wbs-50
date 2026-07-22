import React from 'react'
import { Skeleton } from '@/components/ui'
import { cn } from '@/lib/utils'

/**
 * Skeleton loader for KoolitusHeroQuickFacts
 * Matches the layout and approximate height of the facts card.
 */
export function KoolitusCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[26px] border border-white/20 bg-white/10 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40",
        "flex h-[450px] w-full max-w-[400px] flex-col",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <div className="mb-4 flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>

      <div className="flex-1 space-y-3 pt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-xl" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-4 w-20" />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-2">
        <Skeleton className="h-10 w-full rounded-2xl" />
        <div className="mt-3 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton loader for OpstarProfitHeroDiagram
 * Matches the circular layout and dimensions of the Opstar card.
 */
export function OpstarCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[32px] border border-slate-200 bg-white/40 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40",
        "flex h-[400px] w-full max-w-[400px] flex-col justify-between",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-6 w-56" />
        </div>
        <Skeleton className="h-4 w-20 rounded-full" />
      </div>

      <div className="my-auto flex aspect-square w-full max-w-[280px] mx-auto items-center justify-center rounded-full border border-slate-200/50 dark:border-white/10">
        <Skeleton className="h-20 w-32 rounded-2xl" />
      </div>

      <div className="mt-4 flex justify-between gap-2 border-t border-slate-200 pt-4 dark:border-white/10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Skeleton loader for AndresBlock
 * Matches the layout of the portrait + bio card.
 */
export function ProfileCardSkeleton({
  variant = 'compact',
  className,
}: {
  variant?: 'compact' | 'medium' | 'full'
  className?: string
}) {
  if (variant === 'compact') {
    return (
      <div className={cn("mx-auto w-full max-w-6xl px-4 md:px-8 py-16 md:py-24", className)}>
        <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/40 sm:p-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="h-12 w-32 rounded-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Medium / Full variant skeleton
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 md:px-8 py-16 md:py-24", className)}>
      <div className="rounded-3xl border border-slate-200 bg-slate-50/50 shadow-sm dark:border-white/10 dark:bg-slate-900/40">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-white/10">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="p-5 lg:col-span-5 lg:border-r border-slate-200 dark:border-white/10 space-y-4">
            <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
              <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            </div>
          </div>
          <div className="p-5 lg:col-span-7 lg:p-10 space-y-8">
            <div className="space-y-3">
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <Skeleton className="h-20 w-full rounded-xl" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-slate-200 sm:grid-cols-4 dark:border-white/10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 border-r border-slate-200 dark:border-white/10 last:border-r-0">
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
