/** Shared field chrome for Input / Textarea — register, glass, panel surfaces. */
export type FormControlVariant = 'default' | 'glass' | 'panel'

export const formControlBase =
  'w-full text-sm outline-none transition focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'

export const formControlVariantClasses: Record<FormControlVariant, string> = {
  default:
    'rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/25 dark:border-white/15 dark:bg-white/[0.06] dark:text-[rgb(var(--text-primary))] dark:placeholder:text-slate-500',
  glass:
    'rounded-2xl border border-white/35 bg-white/45 px-4 py-3.5 text-slate-900 caret-blue-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65),0_4px_24px_-8px_rgba(59,130,246,0.2)] backdrop-blur-md placeholder:text-slate-400 focus:border-blue-400/80 focus:ring-blue-500/30 dark:border-white/[0.26] dark:bg-slate-950/45 dark:text-slate-100 dark:caret-sky-300 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_8px_36px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(56,189,248,0.06)] dark:backdrop-blur-xl dark:placeholder:text-slate-400 dark:focus:border-sky-400/55 dark:focus:ring-sky-400/22',
  panel:
    'rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--color-input))]/80 px-3.5 py-2.5 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))]/70 focus:border-blue-500/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] dark:focus:border-blue-400/35 dark:focus:shadow-[0_0_0_3px_rgba(96,165,250,0.12)] aria-invalid:border-red-500/50',
}

export const textareaPanelClass = 'resize-none py-3 leading-relaxed'
