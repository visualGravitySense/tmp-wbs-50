'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { BrandVibrantButton } from './BrandVibrantButton'
import { CTAButton } from './CTAButton'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import { marketingInsetCardClass, marketingMicroPillClass } from './marketing-layout-styles'

const DEFAULT_PROGRAM_LINK = '/koolitus'

interface Option {
  text: string
  points: number
}

interface Question {
  question: string
  options: Option[]
}

interface LegacyQuestion {
  text: string
}

interface ResultThreshold {
  minScore: number
  title: string
  description: string
  ctaLink?: string
}

type ParsedResultDescription = {
  diagnosis?: string
  recommendation?: string
  fallback?: string
}

function parseResultDescription(description: string): ParsedResultDescription {
  const text = description.trim()
  if (!text) return {}

  const diagnosisMatch = text.match(/Diagnoos:\s*/i)
  const recommendationMatch = text.match(/Soovitus:\s*/i)

  if (!diagnosisMatch && !recommendationMatch) {
    return { fallback: text }
  }

  const diagnosisIndex = text.search(/Diagnoos:\s*/i)
  const recommendationIndex = text.search(/Soovitus:\s*/i)

  if (diagnosisIndex >= 0 && recommendationIndex > diagnosisIndex) {
    const diagnosis = text
      .slice(diagnosisIndex)
      .replace(/^Diagnoos:\s*/i, '')
      .split(/Soovitus:\s*/i)[0]
      ?.trim()
    const recommendation = text
      .slice(recommendationIndex)
      .replace(/^Soovitus:\s*/i, '')
      .trim()

    return {
      diagnosis: diagnosis || undefined,
      recommendation: recommendation || undefined,
    }
  }

  if (recommendationIndex >= 0) {
    return {
      recommendation: text.slice(recommendationIndex).replace(/^Soovitus:\s*/i, '').trim(),
      diagnosis:
        recommendationIndex > 0
          ? text.slice(0, recommendationIndex).replace(/^Diagnoos:\s*/i, '').trim()
          : undefined,
    }
  }

  if (diagnosisIndex >= 0) {
    return {
      diagnosis: text.slice(diagnosisIndex).replace(/^Diagnoos:\s*/i, '').trim(),
    }
  }

  return { fallback: text }
}

function QuizResultDescription({ description }: { description: string }) {
  const parsed = parseResultDescription(description)

  if (parsed.fallback) {
    return (
      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
        {parsed.fallback}
      </p>
    )
  }

  return (
    <div className="mt-4 space-y-4">
      {parsed.diagnosis ? (
        <div className="rounded-xl border border-amber-200/70 bg-amber-50/60 px-4 py-3 dark:border-amber-400/20 dark:bg-amber-500/10">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300">
            Diagnoos
          </p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--text-primary)] md:text-base">
            {parsed.diagnosis}
          </p>
        </div>
      ) : null}
      {parsed.recommendation ? (
        <div className="rounded-xl border border-blue-200/70 bg-blue-50/50 px-4 py-3 dark:border-blue-400/20 dark:bg-blue-500/10">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">
            Soovitus
          </p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--text-primary)] md:text-base">
            {parsed.recommendation}
          </p>
        </div>
      ) : null}
    </div>
  )
}

interface QuizProps {
  quizData?: {
    title?: string
    eyebrow?: string
    subtitle?: string
    questions?: Question[] | LegacyQuestion[]
    results?: ResultThreshold[]
    resultText?: string
    ctaText?: string
  }
}

export default function Quiz({ quizData }: QuizProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const {
    title = 'Kas see programm on Sulle?',
    eyebrow = 'Kiirtest',
    subtitle,
    questions: parsedQuestions,
    results: parsedResults,
    resultText,
  } = quizData ?? {}

  const rawQuestions = parsedQuestions || []
  const rawResults = parsedResults || []

  const primaryCtaText = quizData?.ctaText || 'Alusta'

  const questions: Question[] = rawQuestions.map((question) =>
    'question' in question
      ? question
      : {
          question: question.text,
          options: [
            { text: 'JAH', points: 1 },
            { text: 'EI', points: 0 },
          ],
        },
  )

  const results: ResultThreshold[] =
    rawResults.length > 0
      ? rawResults
      : [
          {
            minScore: 0,
            title: 'Tulemus',
            description:
              resultText ??
              'Kui vastasid kasvõi ühele küsimusele "EI", siis see programm on sulle.',
          },
        ]

  const handleAnswer = (points: number) => {
    const nextScore = score + points
    setScore(nextScore)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const getFinalResult = () => {
    return [...results].sort((a, b) => b.minScore - a.minScore).find(r => score >= r.minScore) || results[0]
  }

  const totalSteps = questions.length || 1
  const progressPercent = Math.min(100, Math.round(((currentStep + 1) / totalSteps) * 100))

  const resetQuiz = () => {
    setCurrentStep(0)
    setScore(0)
    setShowResult(false)
    setIsStarted(false)
  }

  const cardBaseClass = `compact-quiz-section w-full ${marketingInsetCardClass} md:p-8`

  // Result screen
  if (showResult) {
    const result = getFinalResult()
    return (
      <section className={cardBaseClass}>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            TULEMUS
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]/80">
            Valmis
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-black leading-tight text-[var(--text-primary)] md:text-3xl">
          {result.title}
        </h3>
        <QuizResultDescription description={result.description} />

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CTAButton
            variant="secondaryMarketing"
            onClick={resetQuiz}
            className="w-full sm:w-auto"
          >
            <span className="text-xs font-black uppercase tracking-widest md:text-sm">Tee uuesti</span>
          </CTAButton>
          <BrandVibrantButton
            href={result.ctaLink?.trim() || DEFAULT_PROGRAM_LINK}
            className="w-full sm:w-auto"
          >
            Vaata programmi
          </BrandVibrantButton>
        </div>
      </section>
    )
  }

  // Start screen
  if (!isStarted) {
    return (
      <section className={cardBaseClass}>
        <EyebrowPillBadge text={eyebrow} />
        <h3 className="mt-4 text-2xl font-black leading-tight text-[var(--text-primary)] md:text-3xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
            {subtitle}
          </p>
        )}
        {!questions.length && (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
            Küsimused puuduvad. Lisa quizData.questions, et testi kuvada.
          </p>
        )}

        <BrandVibrantButton
          onClick={() => setIsStarted(true)}
          disabled={!questions.length}
          icon={Play}
          className="mt-7 w-full"
        >
          {primaryCtaText}
        </BrandVibrantButton>
      </section>
    )
  }

  // Questions screen
  return (
    <section className={cardBaseClass}>
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]/80">
            Samm {currentStep + 1} / {totalSteps}
          </span>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">
            {progressPercent}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[var(--border)]/70 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-black leading-tight text-[var(--text-primary)] md:text-2xl">
        {questions[currentStep]?.question}
      </h3>

      <div className="mt-5 space-y-3">
        {questions[currentStep]?.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option.points)}
            className={`group flex w-full items-start gap-3 px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-sm dark:hover:border-blue-400/45 dark:hover:bg-white/10 ${marketingMicroPillClass}`}
          >
            <span className="compact-quiz-option-index mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
              {idx + 1}
            </span>
            <span className="text-sm font-medium leading-relaxed text-[var(--text-primary)] md:text-base">
              {option.text}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={resetQuiz}
        className="mt-5 text-sm font-medium text-[var(--text-secondary)] underline-offset-4 transition hover:text-[var(--text-primary)] hover:underline"
      >
        Alusta algusest
      </button>
    </section>
  )
}