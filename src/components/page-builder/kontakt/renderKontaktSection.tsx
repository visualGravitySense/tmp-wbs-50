import { lazy, Suspense } from 'react'
import { Container } from '@/components/ui'

const KontaktHero = lazy(() => import('./KontaktHero'))
const KontaktQuick = lazy(() => import('./KontaktQuick'))
const KontaktForm = lazy(() => import('./KontaktForm'))
const KontaktAndres = lazy(() => import('./KontaktAndres'))
const KontaktOpstar = lazy(() => import('./KontaktOpstar'))
const KontaktServices = lazy(() => import('./KontaktServices'))
const KontaktLegalNote = lazy(() => import('./KontaktLegalNote'))

interface RenderKontaktSectionProps {
  section: any
}

export function renderKontaktSectionInner(section: any) {
  switch (section._type) {
    case 'kontaktHeroBlock':
      return (
        <Suspense fallback={<div className="h-48 w-full animate-pulse bg-slate-100 rounded-3xl" />}>
          <KontaktHero block={section} />
        </Suspense>
      )
    case 'kontaktQuickBlock':
      return (
        <Suspense fallback={<div className="h-48 w-full animate-pulse bg-slate-100 rounded-3xl" />}>
          <KontaktQuick block={section} />
        </Suspense>
      )
    case 'kontaktFormBlock':
      return (
        <Suspense fallback={<div className="h-48 w-full animate-pulse bg-slate-100 rounded-3xl" />}>
          <KontaktForm block={section} />
        </Suspense>
      )
    case 'kontaktAndresBlock':
      return (
        <Suspense fallback={<div className="h-48 w-full animate-pulse bg-slate-100 rounded-3xl" />}>
          <KontaktAndres block={section} />
        </Suspense>
      )
    case 'kontaktOpstarBlock':
      return (
        <Suspense fallback={<div className="h-48 w-full animate-pulse bg-slate-100 rounded-3xl" />}>
          <KontaktOpstar block={section} />
        </Suspense>
      )
    case 'kontaktServicesBlock':
      return (
        <Suspense fallback={<div className="h-48 w-full animate-pulse bg-slate-100 rounded-3xl" />}>
          <KontaktServices block={section} />
        </Suspense>
      )
    case 'kontaktLegalNoteBlock':
      return (
        <Suspense fallback={<div className="h-8 w-full animate-pulse bg-slate-100 rounded-lg" />}>
          <KontaktLegalNote block={section} />
        </Suspense>
      )
    default:
      return null
  }
}

export function renderKontaktSection({ section }: RenderKontaktSectionProps) {
  const content = (() => {
    if (section._type === 'kontaktGridGroupBlock') {
      const is57 = section.variant === '5-7'
      const col1Class = is57 
        ? (section.col1._type === 'kontaktQuickBlock' ? 'lg:col-span-5' : 'lg:col-span-7')
        : ''
      const col2Class = is57
        ? (section.col2._type === 'kontaktQuickBlock' ? 'lg:col-span-5' : 'lg:col-span-7')
        : ''
      
      return (
        <div className={`grid gap-6 lg:gap-8 ${is57 ? 'lg:grid-cols-12' : 'lg:grid-cols-2'}`}>
          <div className={col1Class}>
            {renderKontaktSectionInner(section.col1)}
          </div>
          <div className={col2Class}>
            {renderKontaktSectionInner(section.col2)}
          </div>
        </div>
      )
    }

    return renderKontaktSectionInner(section)
  })()

  if (!content) return null

  return (
    <Container size="6xl" className="py-4 sm:py-6 lg:py-8">
      {content}
    </Container>
  )
}
