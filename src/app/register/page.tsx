import type { Metadata } from 'next'
import Link from 'next/link'
import CourseRegistrationForm from '@/components/CourseRegistrationForm'
import RegistrationCohortSummary from '@/components/RegistrationCohortSummary'
import RegistrationPackageSummary from '@/components/RegistrationPackageSummary'
import { getRegisterCohortById } from '@/lib/sanity/registerCohort'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { buildPageMetadata } from '@/lib/seo/metadata'
import CourseRegistrationClient from '@/components/CourseRegistrationClient'
import RegistrationBackLink from '@/components/RegistrationBackLink'

export const metadata: Metadata = buildPageMetadata({
  title: 'Register for course | Site Name',
  description: 'Kursusele registreerumine — privaatsus ja õppetingimused.',
  path: '/register',
})

type RegisterPageProps = {
  searchParams: Promise<{
    cohort?: string | string[]
    package?: string | string[]
    price?: string | string[]
    desc?: string | string[]
    features?: string | string[]
    corporate?: string | string[]
  }>
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const sp = await searchParams
  const cohortRaw = sp.cohort
  const cohortParam = Array.isArray(cohortRaw) ? cohortRaw[0] : cohortRaw
  const defaultCohortId = cohortParam?.trim() || undefined
  const cohort = defaultCohortId ? await getRegisterCohortById(defaultCohortId) : null
  const cohortMissingInCms = Boolean(defaultCohortId) && !cohort

  const packageRaw = sp.package
  const packageParam = Array.isArray(packageRaw) ? packageRaw[0] : packageRaw
  const selectedPackage = packageParam?.trim() || undefined

  const priceRaw = sp.price
  const priceParam = Array.isArray(priceRaw) ? priceRaw[0] : priceRaw
  const selectedPrice = priceParam?.trim() || undefined

  const descRaw = sp.desc
  const descParam = Array.isArray(descRaw) ? descRaw[0] : descRaw
  const selectedDesc = descParam?.trim() || undefined

  const featuresRaw = sp.features
  const featuresParam = Array.isArray(featuresRaw) ? featuresRaw[0] : featuresRaw
  const selectedFeatures = featuresParam ? featuresParam.split('|').map((f) => f.trim()).filter(Boolean) : undefined

  const corporateRaw = sp.corporate
  const corporateParam = Array.isArray(corporateRaw) ? corporateRaw[0] : corporateRaw
  const isCorporate = corporateParam === 'true'

  let defaultNote = selectedPackage
    ? `Soovin registreeruda paketile: ${selectedPackage}`
    : cohort
      ? ''
      : undefined

  const packageLower = selectedPackage?.toLowerCase() || ''
  const isMultiPersonPackage = packageLower.includes('kahekesi') || packageLower.includes('grupi') || packageLower.includes('mitu')

  if (isMultiPersonPackage) {
    defaultNote = defaultNote ? defaultNote + '\n\nPalun sisesta siia ka teiste osalejate nimed ja e-posti aadressid:\n1. ' : 'Palun sisesta siia ka teiste osalejate nimed ja e-posti aadressid:\n1. '
  }

  return (
    <>
      <style>{`
        @keyframes register-aurora-1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.9; }
          50% { transform: translate3d(-3%, 2%, 0) scale(1.06); opacity: 1; }
        }
        @keyframes register-aurora-2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.75; }
          50% { transform: translate3d(4%, -3%, 0) scale(1.08); opacity: 0.95; }
        }
        @keyframes register-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .register-aurora-a { animation: register-aurora-1 24s ease-in-out infinite; }
        .register-aurora-b { animation: register-aurora-2 32s ease-in-out infinite; }
        .register-aurora-c { animation: register-aurora-1 20s ease-in-out infinite reverse; }
        .register-edge-shimmer {
          background-size: 200% 200%;
          animation: register-shimmer 8s ease-in-out infinite;
        }
      `}</style>

      <main className="relative isolate min-h-screen overflow-hidden bg-[#e8eef8] text-slate-900 selection:bg-blue-200/60 selection:text-slate-900 dark:bg-[#040814] dark:text-slate-100 dark:selection:bg-sky-500/35 dark:selection:text-white dark:[color-scheme:dark]">
        {/* Base wash */}
        <div
          className="pointer-events-none fixed inset-0 bg-gradient-to-b from-white via-[#eef2fb] to-[#dce6f7] dark:from-[#080f1c] dark:via-[#0b1528] dark:to-[#03060e]"
          aria-hidden
        />

        {/* Aurora blobs — tume: tugevam sära, et klaas ei upuks musta */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
          <div
            className="register-aurora-a absolute -left-[min(40%,12rem)] top-[-20%] h-[min(85vh,52rem)] w-[min(95vw,56rem)] rounded-full bg-gradient-to-br from-sky-300/55 via-indigo-400/35 to-transparent blur-[100px] dark:from-blue-500/45 dark:via-indigo-500/35 dark:to-cyan-400/20"
          />
          <div
            className="register-aurora-b absolute -right-[min(35%,10rem)] top-[10%] h-[min(70vh,44rem)] w-[min(90vw,48rem)] rounded-full bg-gradient-to-bl from-violet-400/40 via-blue-300/30 to-transparent blur-[90px] dark:from-violet-500/38 dark:via-blue-500/32 dark:to-sky-600/15"
          />
          <div
            className="register-aurora-c absolute bottom-[-25%] left-[15%] h-[min(55vh,36rem)] w-[min(80vw,40rem)] rounded-full bg-gradient-to-t from-cyan-200/50 via-blue-200/25 to-transparent blur-[110px] dark:from-teal-500/28 dark:via-blue-600/22 dark:to-indigo-900/25"
          />
        </div>

        {/* Fine grid — hele / tume eraldi loetavus */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.35] dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59,130,246,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59,130,246,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 65% at 50% 42%, black 20%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 42%, black 20%, transparent 72%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 hidden opacity-[0.38] dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(147,197,253,0.09) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(147,197,253,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 82% 68% at 50% 40%, black 18%, transparent 76%)',
            WebkitMaskImage: 'radial-gradient(ellipse 82% 68% at 50% 40%, black 18%, transparent 76%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(255,255,255,0.5),transparent_55%)] dark:bg-[radial-gradient(ellipse_95%_55%_at_50%_-5%,rgba(56,189,248,0.14),transparent_52%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 hidden dark:block dark:bg-[radial-gradient(ellipse_100%_70%_at_50%_100%,rgba(0,0,0,0.5),transparent_55%)]"
          aria-hidden
        />

        {/* Film grain */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.045] mix-blend-overlay dark:opacity-[0.09] dark:mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
          aria-hidden
        />

        <div
          className={`relative z-10 mx-auto px-4 pb-24 pt-28 sm:px-6 sm:pt-32 ${cohort ? 'max-w-2xl' : 'max-w-lg lg:max-w-xl'}`}
        >
          {/* Eyebrow chip */}
          <div className="flex justify-center">
            <EyebrowPillBadge text="Registreerumine" />
          </div>

          <h1 className="mt-6 text-center text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl sm:leading-[1.06]">
            <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 bg-clip-text text-transparent dark:from-white dark:via-slate-50 dark:to-sky-200/95">
              Kursusele registreerumine
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-slate-600/95 dark:text-slate-300 sm:text-base">
            Täida väljad — võtame ühendust koolituse ja järgmiste gruppide osas.
          </p>

          {/* Glass panel: outer glossy rim */}
          <div className="relative mt-12">
            <div
              className="register-edge-shimmer absolute -inset-px rounded-[2rem] bg-gradient-to-br from-white via-sky-100/80 to-indigo-200/90 p-px opacity-90 dark:from-sky-400/35 dark:via-indigo-500/30 dark:to-blue-600/35 dark:opacity-100"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-b from-white/70 via-white/45 to-white/25 shadow-[0_4px_1px_0_rgba(255,255,255,0.65)_inset,0_32px_64px_-24px_rgba(37,99,235,0.28),0_24px_80px_-32px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/[0.18] dark:from-slate-950/88 dark:via-slate-950/78 dark:to-slate-950/92 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset,0_0_0_1px_rgba(56,189,248,0.06),0_40px_100px_-36px_rgba(59,130,246,0.42),0_28px_70px_-34px_rgba(0,0,0,0.75)]">
              {/* Specular highlight */}
              <div
                className="pointer-events-none absolute -left-1/4 top-0 h-1/2 w-[150%] bg-gradient-to-b from-white/50 to-transparent opacity-60 dark:from-sky-100/[0.09] dark:via-transparent dark:opacity-100"
                aria-hidden
              />
              <div className="relative px-6 py-9 sm:px-10 sm:py-11">
                {cohort ? <RegistrationCohortSummary cohort={cohort} /> : null}
                {cohortMissingInCms ? (
                  <div className="mb-8 rounded-2xl border border-amber-300/60 bg-amber-50/80 px-4 py-3 text-center text-xs font-semibold text-amber-950 shadow-sm backdrop-blur-sm dark:border-amber-500/35 dark:bg-amber-950/40 dark:text-amber-100">
                    Selle ID-ga grupi kirjet ei leitud (või see on eemaldatud). Palun kontrolli{' '}
                    <Link href="/koolitus" className="font-black underline underline-offset-2">
                      koolituslehe
                    </Link>{' '}
                    grupitabelit — märkusel on siiski grupi ID.
                  </div>
                ) : null}
                
                {selectedPackage && !cohort ? (
                  <CourseRegistrationClient
                    packageName={selectedPackage}
                    basePrice={selectedPrice}
                    description={selectedDesc}
                    features={selectedFeatures}
                    isCorporate={isCorporate}
                    cohortMissingInCms={cohortMissingInCms}
                    defaultCohortId={defaultCohortId}
                    defaultNote={defaultNote}
                    isMultiPersonPackage={isMultiPersonPackage}
                    upsells={[
                      { id: 'pro', label: 'Lisa rakendamise tugi 3 kuud (Professionaal)', price: 500 },
                      { id: 'partner', label: 'Lisa Juhtimispartner 12 kuud (Partner)', price: 1000 }
                    ]}
                  />
                ) : (
                  <>
                    {isMultiPersonPackage ? (
                      <div className="mb-6 rounded-2xl border border-sky-300/60 bg-sky-50/80 px-4 py-3 text-center text-xs font-medium text-sky-950 shadow-sm backdrop-blur-sm dark:border-sky-500/35 dark:bg-sky-950/40 dark:text-sky-100">
                        Mitmanda osaleja registreerimisel palun lisa teiste osalejate nimed ja e-posti aadressid allolevasse <strong>Märkuse</strong> lahtrisse.
                      </div>
                    ) : null}
                    <CourseRegistrationForm
                      visualPreset="glass"
                      defaultCohortId={defaultCohortId}
                      defaultNote={defaultNote}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-slate-500/90 dark:text-slate-400">
            <RegistrationBackLink
              showArrow
              className="group inline-flex items-center gap-1.5 font-semibold text-blue-800 underline decoration-blue-400/40 underline-offset-[3px] transition hover:text-blue-950 hover:decoration-blue-600/60 dark:text-sky-200 dark:decoration-sky-400/45 dark:hover:text-white dark:hover:decoration-sky-200/55"
            >
              Tagasi hinnakirja juurde
            </RegistrationBackLink>
          </p>
        </div>
      </main>
    </>
  )
}
