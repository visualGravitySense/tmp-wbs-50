import React from 'react'
import { MarketingContainer } from '@/components/ui'

export interface ContactSectionProps {
  title?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  backgroundColor?: 'blue-purple' | 'purple-pink' | 'green-blue' | 'orange-red' | 'blue-lightblue'
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  description,
  email,
  phone,
  address,
  backgroundColor = 'blue-lightblue'
}) => {
  const getGradientClass = (bgColor: string) => {
    switch (bgColor) {
      case 'blue-purple':
        return 'bg-gradient-to-r from-blue-600 to-purple-600'
      case 'purple-pink':
        return 'bg-gradient-to-r from-purple-600 to-pink-600'
      case 'green-blue':
        return 'bg-gradient-to-r from-green-600 to-blue-600'
      case 'orange-red':
        return 'bg-gradient-to-r from-orange-600 to-red-600'
      case 'blue-lightblue':
        return 'bg-gradient-to-r from-blue-600 to-blue-800'
      default:
        return 'bg-gradient-to-r from-blue-600 to-blue-800'
    }
  }

  return (
    <section id="contact" className={`relative overflow-x-clip overflow-y-visible ${getGradientClass(backgroundColor)} py-16 text-white md:py-24`}>
      <div className="section-edge-fade-t" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.12)_0%,_transparent_55%)]" />
      <MarketingContainer elevated className="relative z-10 text-center">
        {title && (
          <h2 className="mb-5 text-3xl font-black tracking-tight md:text-4xl">
            {title}
          </h2>
        )}
        {description && (
          <p className="mx-auto mb-9 max-w-2xl text-lg font-medium text-blue-50/95 md:text-xl">
            {description}
          </p>
        )}
        {(email || phone) && (
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            {email && (
              <a 
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-700 dark:text-blue-400 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] transition-all hover:scale-[1.02] hover:bg-blue-50 active:scale-[0.98] sm:text-base"
              >
                Kirjuta e-kirjaga
              </a>
            )}
            {phone && (
              <a 
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center rounded-full border-2 border-white/70 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-blue-700 dark:hover:text-blue-400 sm:text-base"
              >
                Helista
              </a>
            )}
          </div>
        )}
        {address && (
          <p className="mt-9 text-sm font-medium text-blue-100/90 md:text-base">
            {address}
          </p>
        )}
      </MarketingContainer>
    </section>
  )
}

export default ContactSection
