'use client'

import { useEffect, useState } from 'react'
import { Container, Section } from '@/components/ui'
import Image from 'next/image'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  avatar?: {
    asset: {
      _id: string
      url: string
    }
  }
}

export interface TestimonialsSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  testimonials: Testimonial[]
  backgroundColor?: string
  showStats?: boolean
  stats?: {
    graduates?: string
    companies?: string
    years?: string
    satisfaction?: string
  }
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  eyebrow = "Hinnangud",
  title,
  subtitle = "Üle 500 tootmisjuhi on juba muutnud oma tööd LEAN abil",
  testimonials,
  backgroundColor = "bg-transparent",
  showStats = true,
  stats = {
    graduates: "500+",
    companies: "40+",
    years: "10+",
    satisfaction: "98%"
  }
}) => {
  // Fallback testimonials data when no data is available from Sanity
  const fallbackTestimonials: Testimonial[] = [
    {
      quote: "See programm muutis täielikult meie tootmise protsessi. Oleme vähendanud raiskamist 40% ja suurendanud tootlikkust 25%. Investeering tasus end ära juba esimese 3 kuuga.",
      author: "Mart Kask",
      role: "Tootmisjuht",
      company: "ABB Estonia",
    },
    {
      quote: "Praktiline lähenemine ja reaalsed näited aitasid meil kiiresti rakendada LEAN põhimõtteid. Tulemused nähtavad kohe pärast esimesi treeninguid.",
      author: "Katrin Lõhmus",
      role: "Operatsioonijuht",
      company: "Cleveron",
    },
    {
      quote: "Parim investeering meie meeskonna arengusse. Õppisid, kuidas juhtida protsesse andmetel põhinevalt, mitte tundel.",
      author: "Taavi Raud",
      role: "Tehnik direktor",
      company: "Sievert",
    },
    {
      quote: "Programm andis mul selge struktuuri ja tööriistad, mida igapäevases töös kasutada. Soovitan kõigile tootmisjuhtidele.",
      author: "Liina Tamm",
      role: "Tööstusdisainer",
      company: "Ericsson",
    },
    {
      quote: "LEAN süsteemi juurutamine meie ettevõttes oli lihtne ja tulemusrikas. Treeneri kogemus oli hindamatu.",
      author: "Jaan Saar",
      role: "Tegevjuht",
      company: "Põltsamaa Fabrikel",
    },
    {
      quote: "Pärast programmi näen tootmist täiesti teise pilguga. Olen kindlam oma otsustes ja protsesside juhtimises.",
      author: "Eve Ojuland",
      role: "Qualiti juht",
      company: "Baltic Pack",
    }
  ]

  // Use state to ensure consistent rendering between server and client
  const [displayTestimonials, setDisplayTestimonials] = useState<Testimonial[]>(fallbackTestimonials)

  // Update testimonials on client side if Sanity data is available
  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      setDisplayTestimonials(testimonials)
    }
  }, [testimonials])
  return (
    <Section variant="minimal" className={`py-2 sm:py-4 ${backgroundColor}`}>
      <Container padding="tight">
        
          {eyebrow ? (
            <div className="mb-4 flex justify-center">
              <EyebrowPillBadge text={eyebrow} />
            </div>
          ) : null}
          
          <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-[rgb(var(--text-primary))] md:text-4xl">
            {title}
          </h2>
          
          {subtitle && (
            <p className="mx-auto mb-10 max-w-3xl text-center text-lg font-medium text-[rgb(var(--text-secondary))]">
              {subtitle}
            </p>
          )}
          
          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials && displayTestimonials.length > 0 ? (
              displayTestimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl border border-[var(--border)] bg-white/90 p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_28px_60px_-26px_rgba(37,99,235,0.18)] dark:bg-slate-900/75 dark:shadow-[0_24px_55px_-28px_rgba(30,64,175,0.25)]">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-4">
                    {testimonial.avatar?.asset?.url ? (
                      <Image
                        src={testimonial.avatar.asset.url}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                        <span className="text-lg font-semibold text-slate-600 dark:text-slate-200">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-[rgb(var(--text-primary))]">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-[rgb(var(--text-secondary))]/90">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-[rgb(var(--text-secondary))]/75">
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-[rgb(var(--text-secondary))]/80">No testimonials available yet.</p>
              </div>
            )}
          </div>

          {/* Stats Section */}
          {showStats && (
            <div className="mt-14 border-t border-[var(--border)] pt-10 sm:mt-16 sm:pt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">{stats.graduates}</div>
                  <div className="text-sm font-medium text-[rgb(var(--text-secondary))]">Lõpetajad</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">{stats.companies}</div>
                  <div className="text-sm font-medium text-[rgb(var(--text-secondary))]">Ettevõtted</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">{stats.years}</div>
                  <div className="text-sm font-medium text-[rgb(var(--text-secondary))]">Aastat kogemust</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">{stats.satisfaction}</div>
                  <div className="text-sm font-medium text-[rgb(var(--text-secondary))]">Rahulolu</div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="font-medium text-[rgb(var(--text-primary))]">
                  Liitu tuhandete rahulolevate klientidega ja muuda oma tootmine täna!
                </p>
              </div>
            </div>
          )}
      </Container>
    </Section>
  )
}

export default TestimonialsSection
