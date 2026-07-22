import { cn } from '@/lib/utils'

/** Micro trust ribbon: gradient lines framing three frost dots — unused elsewhere until now */
export default function GlassRibbonDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-400/45 to-slate-500/65 sm:w-16 dark:via-white/25 dark:to-white/35" />
        <div className="flex gap-2 rounded-full border border-white/60 bg-white/45 px-2.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md dark:border-white/[0.12] dark:bg-[rgb(var(--bg-secondary))/0.4] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600/85 shadow-[0_0_8px_rgba(37,99,235,0.45)] dark:bg-blue-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500/85 shadow-[0_0_8px_rgba(139,92,246,0.38)] dark:bg-violet-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.38)] dark:bg-emerald-400" />
        </div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent via-slate-400/45 to-slate-500/65 sm:w-16 dark:via-white/25 dark:to-white/35" />
      </div>
    </div>
  )
}
