'use client'

import { useState, useTransition, useEffect } from 'react'
import Link from 'next/link'
import { marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'
import { BrandVibrantButton } from '@/components/ui/BrandVibrantButton'
import { Spinner } from '@/components/ui/Spinner'
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ClipboardCheck, 
  Mail, 
  User, 
  ShieldAlert, 
  Sparkles,
  BarChart3,
  Zap,
  MailCheck
} from 'lucide-react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'

interface QuizQuestion {
  question: string
  options: string[]
}

const AUDIT_QUESTIONS: QuizQuestion[] = [
  {
    question: 'Mis on teie tootmise peamine kitsaskoht täna?',
    options: [
      'Tarnekindlus (lubatud tähtaegadest mittekinnipidamine)',
      'Madal tootlikkus ja seadmete efektiivsus (OEE)',
      'Liiga pikk tootmistsükkel ja suured pooltoodete laod',
      'Kvaliteediprobleemid, praak ja pidevad korduvtööd'
    ]
  },
  {
    question: 'Kuidas teostate tootmise planeerimist ja graafikute koostamist?',
    options: [
      'Manuaalselt (tahvlil, paberil või ühe planeerija peas)',
      'Exceli tabelites (mis nõuavad pidevat igapäevast käsitööd)',
      'ERP/planeerimistarkvaras (aga poolikult või ebausaldusväärsete andmetega)',
      'Automatiseeritult ja dünaamiliselt reaalajas andmete põhjal'
    ]
  },
  {
    question: 'Kuidas mõõdate ja jälgite seadmete efektiivsust (OEE)?',
    options: [
      'Ei mõõda üldse või teeme seda vahel tunde järgi',
      'Mõõdame käsitsi (paberil või Excelis vahetuse lõpus)',
      'Mõõdame digitaalselt (MES-süsteem või masinate otseliidesed)',
      'Mõõdame reaalajas ja analüüsime seisakute põhjuseid automaatselt'
    ]
  },
  {
    question: 'Kuidas on kaardistatud teie tootmise väärtusahel (VSM)?',
    options: [
      'Protsessi voolavus ei ole kaardistatud, liikumine on stiihiline',
      'VSM on paberil tehtud, kuid seda ei uuendata ega kasutata parendusteks',
      'Meil on kaardistatud väärtusahel ja vähendame pidevalt raiskamisi'
    ]
  },
  {
    question: 'Milline on teie meeskonna kaasatus parendustegevustesse (Lean/Kaizen)?',
    options: [
      'Parendustegevusi ei toimu, tegeleme pidevalt tulekahjude kustutamisega',
      'Juhtkond algatab parendusi, kuid operaatorid ei ole kaasatud',
      'Töötajad teevad ise ettepanekuid ja rakendavad neid igapäevaselt'
    ]
  },
  {
    question: 'Kuidas toimub tootmise infovahetus ja igapäevased seisukoosolekud?',
    options: [
      'Puudub kindel süsteem, info liigub juhuslikult',
      'Toimuvad koosolekud, kuid ilma selgete andmete ja visuaalse juhtimiseta',
      'Toimub reeglipärane visuaalne igapäevajuhtimine (Shop Floor Management)'
    ]
  }
]

export default function ProductionAuditQuiz({ blockQuestions }: { blockQuestions?: QuizQuestion[] }) {
  const [quizConfig, setQuizConfig] = useState<{
    eyebrow?: string
    title?: string
    description?: string
    questions?: QuizQuestion[]
  } | null>(null)

  const [currentStep, setCurrentStep] = useState<number>(-1) // -1 is start screen
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [emailStatus, setEmailStatus] = useState<'success' | 'error' | null>(null)

  useEffect(() => {
    fetch('/api/quiz-config')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Response is not JSON");
        }
        return res.json();
      })
      .then(data => {
        if (data?.questions?.length) {
          setQuizConfig(data)
        }
      })
      .catch(err => console.error('Failed to load dynamic quiz config from Sanity:', err))
  }, [])

  const questions = blockQuestions?.length ? blockQuestions : (quizConfig?.questions || AUDIT_QUESTIONS)
  const eyebrowText = quizConfig?.eyebrow || 'Tasuta eneseanalüüs'
  const titleText = quizConfig?.title || 'Tehase kiiraudit: leia oma tootmise varjatud kaod'
  const descriptionText = quizConfig?.description || 'Kas sinu seadmed töötavad täiskoormusel? Kas tootmise planeerimine võtab liiga palju aega? Vasta 6-le kiirele küsimusele ja saa detailne tagasiside oma tootmise kitsaskohtade kohta otse e-mailile.'

  const isQuestionsPhase = currentStep >= 0 && currentStep < questions.length
  const isCapturePhase = currentStep === questions.length
  const totalQuestions = questions.length
  const progressPercent = isQuestionsPhase 
    ? Math.min(100, Math.round(((currentStep + 1) / totalQuestions) * 100))
    : 0

  const handleSelectOption = (optionText: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentStep]: optionText
    }))

    // Small delay to make selection feel premium and visual
    setTimeout(() => {
      setCurrentStep(prev => prev + 1)
    }, 200)
  }

  const handleBack = () => {
    setErrorMsg(null)
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!name.trim()) {
      setErrorMsg('Palun sisestage oma nimi.')
      return
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Palun sisestage korrektne e-posti aadress.')
      return
    }

    startTransition(async () => {
      try {
        const payload = {
          name: name.trim(),
          email: email.trim(),
          answers: questions.map((q, idx) => ({
            question: q.question,
            selectedOption: answers[idx] || 'Vastus puudub'
          }))
        }

        const res = await fetch('/api/quiz-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.error || 'Serveri viga')
        }

        import('@/lib/integrations/leadResponse').then(({ warnSmailyIntegrationsInConsole }) => {
          if (data && data.ok) warnSmailyIntegrationsInConsole('tootmisaudit-quiz', data)
        })

        try {
          const { pdf } = await import('@react-pdf/renderer')
          const { AuditReportPDF } = await import('@/lib/pdf/AuditReportPDF')
          const blob = await pdf(
            AuditReportPDF({ 
              name: payload.name, 
              email: payload.email, 
              answers: payload.answers 
            })
          ).toBlob()
          
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `tootmisauditi-raport-${payload.name.replace(/\s+/g, '-').toLowerCase()}.pdf`
          a.rel = 'noopener noreferrer'
          document.body.appendChild(a)
          a.click()
          a.remove()
          setTimeout(() => URL.revokeObjectURL(url), 10000)
          
          setEmailStatus('success')
        } catch (pdfErr) {
          console.error('PDF generation error:', pdfErr)
          setEmailStatus('error')
        }

        setIsSuccess(true)
      } catch (err: any) {
        console.error('Quiz submit error:', err)
        setErrorMsg(err?.message || 'Ilmnes ootamatu viga. Palun proovige uuesti.')
      }
    })
  }

  const resetQuiz = () => {
    setCurrentStep(-1)
    setAnswers({})
    setName('')
    setEmail('')
    setIsSuccess(false)
    setErrorMsg(null)
    setEmailStatus(null)
  }

  // --- RENDERING SCREENS ---

  // 1. Success Screen
  if (isSuccess) {
    return (
      <div className={cn(marketingInsetCardClass, 'mx-auto max-w-xl text-center')}>
        <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-[50px]" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_24px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          
          <h3 className="text-2xl font-black leading-tight text-slate-900 dark:text-white md:text-3xl tracking-tight">
            Suur tänu täitmast!
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-gray-300 sm:text-base italic max-w-md">
            Teie tehase auditi andmed on edastatud. Personaalsed soovitused, OEE analüüs ja tootmise optimeerimise raport laetakse kohe alla.
          </p>

          {emailStatus === 'success' && (
            <div className="mt-6 w-full rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 text-center">
              PDF raport on alla laaditud!
            </div>
          )}
          {emailStatus === 'error' && (
            <div className="mt-6 w-full rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-sm font-semibold text-red-600 dark:text-red-400 text-center">
              PDF genereerimine ebaõnnestus. Palun proovi uuesti.
            </div>
          )}

          <div className="mt-8 w-full border-t border-slate-200 dark:border-white/10 pt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kui allalaadimine ei alanud automaatselt, kontrollige oma brauseri allalaadimiste (Downloads) kausta.
            </p>
          </div>

          <button
            onClick={resetQuiz}
            className="mt-8 text-sm font-bold tracking-wider text-[#0055E5] hover:text-[#003B9E] dark:text-sky-400 dark:hover:text-sky-300 uppercase transition underline underline-offset-4"
          >
            Alusta uut auditit
          </button>
        </div>
      </div>
    )
  }

  // 2. Start Screen
  if (currentStep === -1) {
    return (
      <div className={cn(marketingInsetCardClass, 'mx-auto max-w-2xl text-left')}>
        <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/25 blur-[55px]" />
        
        <div className="relative z-10">
          <EyebrowPillBadge text={eyebrowText} className="mb-4" />
          <h3 className="text-3xl font-black leading-[1.1] text-slate-900 dark:text-white tracking-tight md:text-4xl">
            {titleText}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-gray-300">
            {descriptionText}
          </p>

          <div className={cn('mt-6 flex flex-col gap-3 p-5', marketingMicroPillClass)}>
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-600 dark:text-gray-200">
                Personaalsed parendusettepanekud meeskonnalt
              </p>
            </div>
            <div className="flex items-start gap-3">
              <BarChart3 className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-600 dark:text-gray-200">
                OEE (seadmete efektiivsuse) hindamisskoor
              </p>
            </div>
          </div>

          <BrandVibrantButton
            onClick={() => setCurrentStep(0)}
            icon={Zap}
            className="mt-8 w-full cursor-pointer"
          >
            Alusta kiirauditit
          </BrandVibrantButton>
        </div>
      </div>
    )
  }

  // 3. Lead Capture Phase (Final Step)
  if (isCapturePhase) {
    return (
      <div className={cn(marketingInsetCardClass, 'mx-auto max-w-xl text-left text-slate-900 dark:text-white')}>
        <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-[50px]" />
        
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={isPending}
              className="inline-flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white disabled:opacity-50"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Tagasi vastuste juurde
            </button>
            <span className="text-xs font-bold text-[#0055E5] dark:text-sky-400 uppercase tracking-widest">
              Raport on valmis
            </span>
          </div>

          <h3 className="text-2xl font-black leading-tight text-slate-900 dark:text-white md:text-3xl tracking-tight">
            Teie tehase auditi raport on valmis!
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Sisestage oma andmed, et saada detailne analüüs, OEE hindamisskoor ja personaalsed soovitused tootmise optimeerimiseks otse oma e-mailile.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <label htmlFor="name" className="sr-only">Nimi</label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <User className="h-4 w-4" />
              </div>
              <input
                id="name"
                type="text"
                required
                disabled={isPending}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Teie ees- ja perekonnanimi"
                style={{
                  color: 'rgb(var(--color-foreground))',
                  backgroundColor: 'rgb(var(--color-background))',
                }}
                className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm font-semibold outline-none transition bg-white/50 border border-slate-200/80 focus:border-[#0055E5] focus:bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-800/40 dark:border-white/10 dark:focus:border-sky-500 dark:text-white dark:placeholder-slate-500 focus:ring-1 focus:ring-[#0055E5]/20 dark:focus:ring-sky-500/30"
              />
            </div>

            <div className="relative">
              <label htmlFor="email" className="sr-only">E-post</label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <Mail className="h-4 w-4" />
              </div>
              <input
                id="email"
                type="email"
                required
                disabled={isPending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Teie e-posti aadress"
                style={{
                  color: 'rgb(var(--color-foreground))',
                  backgroundColor: 'rgb(var(--color-background))',
                }}
                className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm font-semibold outline-none transition bg-white/50 border border-slate-200/80 focus:border-[#0055E5] focus:bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-800/40 dark:border-white/10 dark:focus:border-sky-500 dark:text-white dark:placeholder-slate-500 focus:ring-1 focus:ring-[#0055E5]/20 dark:focus:ring-sky-500/30"
              />
            </div>

            {errorMsg && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs font-semibold text-red-400">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <BrandVibrantButton
              type="submit"
              disabled={isPending}
              icon={isPending ? undefined : MailCheck}
              className="mt-6 w-full cursor-pointer"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="sm" className="text-white" label="Saatmine" /> Saatmine...
                </span>
              ) : (
                'Saa tulemused e-mailile'
              )}
            </BrandVibrantButton>
          </form>

          <p className="mt-4 text-center text-[10px] leading-relaxed text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            🛡️ Teie andmed on kaitstud ja neid ei jagata kunagi kolmandatele osapooltele
          </p>
        </div>
      </div>
    )
  }

  // 4. Questions Phase
  const currentQuestion = AUDIT_QUESTIONS[currentStep]

  return (
    <div className={cn(marketingInsetCardClass, 'mx-auto max-w-2xl text-left')}>
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-[50px]" />
      
      <div className="relative z-10">
        {/* Progress & Navigation Header */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="inline-flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 transition hover:text-slate-800 dark:hover:text-white"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Tagasi
            </button>
            <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Küsimus {currentStep + 1} / {totalQuestions}
            </span>
          </div>
          
          {/* Thin elegant progress bar */}
          <div className="h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-[#0055E5] dark:bg-sky-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-xl font-black leading-tight text-slate-900 dark:text-white md:text-2xl tracking-tight">
          {currentQuestion?.question}
        </h3>

        {/* Clickable answer option plates */}
        <div className="mt-6 space-y-3.5">
          {currentQuestion?.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(option)}
              className={cn(
                'group flex w-full cursor-pointer items-start gap-4 p-4 text-left transition-all duration-200 hover:scale-[1.015] hover:border-[#0055E5]/40 hover:bg-slate-50 hover:shadow-[0_8px_20px_-10px_rgba(0,85,229,0.15)] dark:hover:border-sky-500/40 dark:hover:bg-white/[0.06] dark:hover:shadow-[0_8px_20px_-10px_rgba(0,113,227,0.3)]',
                marketingMicroPillClass,
              )}
            >
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-black text-sky-500 dark:text-sky-400 group-hover:bg-[#0055E5] group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950 transition-colors duration-200">
                {idx + 1}
              </span>
              <span className="text-sm font-semibold leading-relaxed text-slate-600 md:text-base group-hover:text-slate-900 dark:text-gray-200 dark:group-hover:text-white transition-colors">
                {option}
              </span>
            </button>
          ))}
        </div>

        {/* Action Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-5">
          <button
            onClick={resetQuiz}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 underline-offset-4 transition hover:text-slate-800 hover:underline dark:hover:text-white uppercase tracking-wider"
          >
            Alusta algusest
          </button>
        </div>
      </div>
    </div>
  )
}
