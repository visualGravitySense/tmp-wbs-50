'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { MarketingContainer, Section } from '@/components/ui'
import { renderTextWithLinks } from '@/lib/linkify'
import { normalizeKkkFaqs } from '@/lib/sanity/resolveKkkSection'
import type { AboutKkkData } from '@/types/about'

interface FAQ {
  question: string
  /** Portable Text blocks from Sanity; plain string supported for legacy fallbacks. */
  answer: unknown
}

interface KkkProps {
  kkkData: {
    title: string
    eyebrow: string
    subtitle?: string
    /** CMS: matches hero pill; default true when omitted. */
    showEyebrowDots?: boolean
    faqs?: FAQ[]
    questions?: FAQ[]
  } & AboutKkkData
  className?: string
}

function AnswerBody({ answer }: { answer: unknown }) {
  if (typeof answer === 'string') {
    const t = answer.trim()
    if (!t) return null
    return <p className="whitespace-pre-wrap italic">{renderTextWithLinks(t)}</p>
  }
  if (Array.isArray(answer) && answer.length > 0) {
    return (
      <div className="prose prose-sm prose-slate max-w-none italic text-[rgb(var(--text-secondary))] prose-p:mb-2 prose-p:last:mb-0 prose-strong:text-[rgb(var(--text-primary))] prose-a:text-blue-700 dark:prose-invert">
        <PortableText value={answer as never} />
      </div>
    )
  }
  return null
}

function getPlainTextFromAnswer(answer: unknown): string {
  if (typeof answer === 'string') {
    return answer.trim()
  }
  if (Array.isArray(answer)) {
    return answer
      .map((block) => {
        if (block._type === 'block' && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || '').join('')
        }
        return ''
      })
      .filter(Boolean)
      .join('\n')
  }
  return ''
}

export default function Kkk({ kkkData, className = '' }: KkkProps) {
  const [openItems, setOpenItems] = useState<number[]>([])
  const { title, eyebrow, subtitle, showEyebrowDots = true } = kkkData
  const faqs =
    Array.isArray(kkkData.faqs) && kkkData.faqs.length > 0
      ? kkkData.faqs
      : normalizeKkkFaqs(kkkData)

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: getPlainTextFromAnswer(faq.answer),
            },
          })),
        }
      : null

  return (
    <Section
      variant="band"
      id="kkk"
      className={`!overflow-x-clip !overflow-y-visible ${className}`}
    >
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <div className="pointer-events-none absolute -top-20 right-0 h-[min(300px,60vw)] w-[min(300px,60vw)] rounded-full bg-blue-500/10 blur-[90px] dark:bg-blue-600/14" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-[min(260px,55vw)] w-[min(260px,55vw)] rounded-full bg-cyan-500/8 blur-[85px] dark:bg-cyan-500/10" />

      <MarketingContainer elevated className="overflow-visible">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-3 flex justify-center">
            <EyebrowPillBadge text={eyebrow} showDots={showEyebrowDots} />
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-[rgb(var(--text-primary))] sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-[rgb(var(--text-secondary))] sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mx-auto max-w-3xl space-y-2.5 overflow-visible sm:space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index)
            return (
              <div
                key={index}
                className={`group relative overflow-visible rounded-xl border p-px transition-shadow duration-300 sm:rounded-2xl ${
                  isOpen
                    ? 'border-blue-300/60 shadow-[0_16px_38px_-24px_rgba(37,99,235,0.3)] dark:border-blue-500/28'
                    : 'border-slate-200/80 hover:border-slate-300/90 hover:shadow-[0_12px_30px_-24px_rgba(15,23,42,0.18)] dark:border-white/[0.08] dark:hover:border-white/[0.14]'
                }`}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white via-blue-50/35 to-cyan-50/25 opacity-85 dark:from-white/[0.1] dark:via-blue-500/[0.08] dark:to-cyan-500/[0.05]" />
                <div className="relative overflow-visible rounded-[calc(0.75rem-1px)] border border-white/70 bg-white/[0.5] shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-[20px] backdrop-saturate-[1.35] dark:border-white/[0.1] dark:bg-[rgb(var(--bg-secondary))/0.42] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:rounded-[calc(1rem-1px)]">
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-4"
                  >
                    <span
                      className={`text-[15px] font-black uppercase italic leading-snug tracking-tight transition-colors sm:text-base ${
                        isOpen
                          ? 'text-blue-700 dark:text-blue-400'
                          : 'text-[rgb(var(--text-primary))]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`relative h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <div className="absolute left-0 top-1/2 h-0.5 w-full rounded-full bg-blue-500" />
                      <div
                        className={`absolute left-1/2 top-0 h-full w-0.5 rounded-full bg-blue-500 transition-transform duration-300 ${
                          isOpen ? 'scale-y-0' : 'scale-y-100'
                        }`}
                      />
                    </div>
                  </button>

                  {/*
                    Natural height only — no max-h / vh / overflow-y scroll.
                    Collapsed: hidden. Expanded: block that grows with content.
                  */}
                  {isOpen ? (
                    <div className="overflow-visible px-4 pb-4 text-[13px] font-medium leading-relaxed opacity-90 sm:px-5 sm:pb-5 sm:text-sm">
                      <AnswerBody answer={faq.answer} />
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </MarketingContainer>
    </Section>
  )
}
