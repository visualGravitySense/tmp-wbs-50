import Link from 'next/link'
import { weekLabelFromEstonianDateString } from '@/lib/dates/estonianTrainingDates'
import type { RegisterCohortDetail } from '@/lib/sanity/registerCohort'

function PinIcon(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function CalendarIcon(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function statusPillClass(tone?: string, completed?: boolean) {
  if (completed || tone === 'finished') {
    return 'border-slate-300/80 bg-slate-100/90 text-slate-700 dark:border-white/15 dark:bg-white/[0.08] dark:text-slate-300'
  }
  if (tone === 'active') {
    return 'border-amber-400/50 bg-amber-50/95 text-amber-950 dark:border-amber-500/35 dark:bg-amber-500/15 dark:text-amber-100'
  }
  return 'border-sky-400/45 bg-sky-50/90 text-sky-950 dark:border-sky-400/30 dark:bg-sky-500/12 dark:text-sky-100'
}

function spotsLine(c: RegisterCohortDetail) {
  const total = c.spotsTotal ?? 0
  if (total <= 0) return null
  const filled = c.spotsFilled ?? Math.max(0, total - (c.spotsAvailable ?? 0))
  return `${filled} / ${total} täidetud`
}

export type RegistrationCohortSummaryProps = {
  cohort: RegisterCohortDetail
}

export default function RegistrationCohortSummary({ cohort }: RegistrationCohortSummaryProps) {
  const title = cohort.trainingTitle || cohort.name || 'Koolitus'
  const week = weekLabelFromEstonianDateString(cohort.dates)
  const spots = spotsLine(cohort)
  const statusLabel =
    cohort.statusLabel ||
    (cohort.isCompleted ? 'Lõpetatud' : cohort.timing === 'soon' ? 'Aktiivne' : 'Tulemas')

  return (
    <div className="mb-10">
      <div className="relative overflow-hidden rounded-2xl border border-white/55 bg-gradient-to-br from-white/75 via-white/50 to-sky-50/40 p-px shadow-[0_20px_50px_-28px_rgba(37,99,235,0.35)] backdrop-blur-xl dark:border-white/[0.12] dark:from-slate-900/75 dark:via-slate-900/55 dark:to-sky-950/35 dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)]">
        <div className="relative rounded-[15px] bg-gradient-to-b from-white/85 to-white/40 px-5 py-6 sm:px-7 sm:py-7 dark:from-slate-950/92 dark:to-slate-950/70">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-sky-400/25 to-transparent blur-3xl dark:from-sky-500/20" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-indigo-400/20 to-transparent blur-3xl dark:from-indigo-500/15" aria-hidden />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0 flex-1 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-800/80 dark:text-sky-300/90">
                Sinu valik
              </p>
              <h2 className="text-xl font-black leading-snug tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                {title}
              </h2>
              {cohort.location ? (
                <p className="flex items-start gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-sky-400" />
                  <span>{cohort.location}</span>
                </p>
              ) : null}
              {cohort.badges?.some((b) => b.text) ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {cohort.badges
                    ?.filter((b) => b.text)
                    .map((b, i) => (
                      <span
                        key={i}
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide ${
                          b.type === 'urgent'
                            ? 'border-amber-400/60 bg-amber-100/90 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-100'
                            : 'border-slate-200/90 bg-white/80 text-slate-700 dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-200'
                        }`}
                      >
                        {b.text}
                      </span>
                    ))}
                </div>
              ) : null}
            </div>
            <span
              className={`inline-flex w-fit shrink-0 items-center gap-2 self-start rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm ${statusPillClass(cohort.statusTone, cohort.isCompleted)}`}
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  cohort.isCompleted || cohort.statusTone === 'finished'
                    ? 'bg-slate-400'
                    : cohort.statusTone === 'active'
                      ? 'bg-amber-500'
                      : 'bg-sky-500 dark:bg-sky-400'
                }`}
              />
              {statusLabel}
            </span>
          </div>

          <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
            {cohort.dates ? (
              <div className="rounded-xl border border-white/70 bg-white/55 px-4 py-3 dark:border-white/10 dark:bg-white/[0.05]">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Kuupäevad
                </div>
                <p className="mt-1.5 text-sm font-bold leading-snug text-slate-900 dark:text-slate-100">{cohort.dates}</p>
                {week ? <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-400">{week}</p> : null}
                {cohort.daysUntil ? (
                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-500">{cohort.daysUntil}</p>
                ) : null}
              </div>
            ) : null}

            {(cohort.price || spots) && (
              <div className="rounded-xl border border-white/70 bg-white/55 px-4 py-3 dark:border-white/10 dark:bg-white/[0.05]">
                {cohort.price ? (
                  <>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Hind</p>
                    <p className="mt-1.5 text-lg font-black text-slate-900 dark:text-white">{cohort.price}</p>
                    {cohort.priceNote ? (
                      <p className="mt-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400/95">{cohort.priceNote}</p>
                    ) : null}
                  </>
                ) : null}
                {spots ? (
                  <p className={`text-xs font-bold text-slate-700 dark:text-slate-300 ${cohort.price ? 'mt-3 border-t border-slate-200/80 pt-3 dark:border-white/10' : ''}`}>
                    Osalejad: {spots}
                  </p>
                ) : null}
              </div>
            )}
          </div>

          {cohort.preRegistrationInfo ? (
            <div className="relative mt-4 rounded-xl border border-sky-200/60 bg-sky-50/50 px-4 py-3 text-xs leading-relaxed text-sky-950 dark:border-sky-500/25 dark:bg-sky-950/30 dark:text-sky-100/90">
              <span className="font-bold">{cohort.preRegistrationInfo}</span>
              {cohort.preRegistrationBenefits?.map((b, i) => (
                <span key={i} className="mt-1 block text-sky-900/90 dark:text-sky-100/80">
                  • {b}
                </span>
              ))}
            </div>
          ) : null}

          <p className="relative mt-5 text-center text-[11px] font-medium leading-relaxed text-slate-500 dark:text-slate-500 sm:text-left">
            Registreerud just sellele grupile. Kui soovid teist ajakava,{' '}
            <Link href="/koolitus" className="font-bold text-blue-800 underline-offset-2 hover:underline dark:text-sky-300">
              vaata kõiki gruppe
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
