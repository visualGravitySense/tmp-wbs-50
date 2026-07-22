'use client'

import { Package, CreditCard, Sparkles, Check } from 'lucide-react'
import RegistrationBackLink from '@/components/RegistrationBackLink'

export type RegistrationPackageSummaryProps = {
  packageName: string
  price?: string
  description?: string
  features?: string[]
  isCorporate?: boolean
}

export default function RegistrationPackageSummary({
  packageName,
  price: propPrice,
  description: propDescription,
  features: propFeatures,
  isCorporate: propIsCorporate,
}: RegistrationPackageSummaryProps) {
  let price = propPrice || ''
  let description = propDescription || ''
  let features = propFeatures || []
  let isCorporate = propIsCorporate || false

  // Fallbacks if detailed props are missing
  if (!propPrice && !propFeatures) {
    const nameUpper = packageName.toUpperCase()
    if (nameUpper.includes('STANDARD')) {
      price = '1490'
      description = 'Ideaalne alustavale tootmisjuhile'
      features = ['9 õppepäeva', 'Õppematerjalid', 'Visiidid tehastesse', 'Sertifikaat']
    } else if (nameUpper.includes('PROFESSIONAL') || nameUpper.includes('PRO')) {
      price = '2190'
      description = 'Kõige populaarsem valik'
      features = ['Kõik Standard paketis', 'Personaalne mentorlus', 'KPI analüüs', 'Ligipääs kogukonnale']
    } else if (nameUpper.includes('EXECUTIVE')) {
      price = '3490'
      description = 'Täielik strateegiline tugi'
      features = ['Kõik Pro paketis', '1-on-1 strateegia sessioon', 'Meeskonna koolitus', 'Eelisjärjekorras tugi']
    } else if (
      nameUpper.includes('KAHEKESI') ||
      nameUpper.includes('KOLLEEG')
    ) {
      price = '1796'
      description = 'Ideaalne baasprobleemide tuvastamiseks ja esmase tegevuskava loomiseks'
      features = ['9 õppepäeva', 'Õppematerjalid', 'Visiidid tehastesse', 'Sertifikaat']
    } else if (
      nameUpper.includes('GRUPP') ||
      nameUpper.includes('ETTEVÕT') ||
      nameUpper.includes('CORPORATE') ||
      nameUpper.includes('PAKKUMIS')
    ) {
      price = '990'
      description = 'Individuaalne lähenemine — teie meeskonnale kohandatud programm'
      features = ['Alates 5 osalejast', 'Kohandatud õppeprogramm', 'Koolitus teie kontoris', 'Eraldi äriklient haldur']
      isCorporate = true
    } else {
      price = ''
      description = 'Koolitusprogramm'
    }
  }

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
              <h2 className="text-xl font-black leading-snug tracking-tight text-slate-900 dark:text-white sm:text-2xl flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600 dark:text-sky-400 shrink-0" />
                {packageName}
              </h2>
              {description ? (
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {description}
                </p>
              ) : null}
            </div>
            <span
              className="inline-flex w-fit shrink-0 items-center gap-2 self-start rounded-full border border-sky-400/45 bg-sky-50/90 text-sky-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm dark:border-sky-400/30 dark:bg-sky-500/12 dark:text-sky-100"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-sky-500 dark:bg-sky-400" />
              AKTIIVNE
            </span>
          </div>

          <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/70 bg-white/55 px-4 py-3 dark:border-white/10 dark:bg-white/[0.05]">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <CreditCard className="h-3.5 w-3.5" />
                Hind
              </div>
              {price ? (
                <div className="mt-1.5 flex items-end gap-1">
                  {isCorporate && <span className="text-xs font-semibold text-slate-500 mr-1 pb-1">alates</span>}
                  <span className="text-2xl font-black leading-none text-slate-900 dark:text-white">{price}</span>
                  <span className="pb-0.5 font-bold text-slate-800 dark:text-slate-200 text-lg">€</span>
                  <span className="ml-1 pb-0.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">{isCorporate ? '+ KM / in' : '+ KM'}</span>
                </div>
              ) : (
                <p className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white">Küsi pakkumist</p>
              )}
            </div>

            {features.length > 0 ? (
              <div className="rounded-xl border border-white/70 bg-white/55 px-4 py-3 dark:border-white/10 dark:bg-white/[0.05]">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  Sisaldab
                </div>
                <ul className="space-y-1.5">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <Check className="h-3 w-3 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={3} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <p className="relative mt-5 text-center text-[11px] font-medium leading-relaxed text-slate-500 dark:text-slate-500 sm:text-left">
            Registreerud just sellele paketile. Kui soovid teist paketti või koolituse ajakava,{' '}
            <RegistrationBackLink className="font-bold text-blue-800 underline-offset-2 hover:underline dark:text-sky-300">
              vaata hinnakirja
            </RegistrationBackLink>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
