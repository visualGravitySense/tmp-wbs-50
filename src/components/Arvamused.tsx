import { Container, GlassPanel, Section } from '@/components/ui'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'

interface Review {
  rating: number
  quote: string
  authorName: string
  authorRole: string
  authorCompany: string
  avatarInitials: string
  avatarGradient: string
}

interface ArvamusedProps {
  arvamusedData: {
    title: string
    eyebrow: string
    subtitle?: string
    reviews: Review[]
    totalReviews: number
    averageRating: string
    recommendationPercentage: string
  }
  className?: string
}

export default function Arvamused({ 
  arvamusedData, 
  className = '' 
}: ArvamusedProps) {
  const {
    title,
    eyebrow,
    subtitle,
    reviews = [],
    totalReviews,
    averageRating,
    recommendationPercentage
  } = arvamusedData

  return (
    <Section variant="default" className={`${className} relative overflow-hidden`} id="arvamused">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 dark:bg-amber-500/3 blur-[150px] rounded-full -z-10 select-none pointer-events-none" />
      
      <Container padding="wide" elevated>
        {/* Header */}
        <div className="text-center mb-20">
          <div className="mb-6 flex justify-center">
            <EyebrowPillBadge text={eyebrow} showDots />
          </div>
          <h2 className="ak-h1 mb-6 text-4xl font-black leading-none tracking-tighter text-[rgb(var(--text-primary))] md:text-6xl uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto font-medium opacity-70">
              {subtitle}
            </p>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 mb-16 max-w-6xl mx-auto pt-6">
          {reviews.map((review, index) => (
            <GlassPanel
              key={index}
              className="testimonial-card group relative rounded-2xl border border-slate-200/80 bg-white/70 p-8 pt-10 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-300/60 hover:bg-white/90 dark:border-white/5 dark:bg-white/[0.01] dark:shadow-none dark:hover:border-blue-500/20 dark:hover:bg-white/[0.03] flex flex-col min-h-[280px]"
            >
              {/* Testimonial Avatar centered at top */}
              <div className="testimonial-avatar-wrapper absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                <div 
                  className="testimonial-avatar flex h-12 w-12 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 text-xs font-black text-white shadow-md transition-transform duration-500 group-hover:scale-110"
                  style={{ background: review.avatarGradient }}
                >
                  {review.avatarInitials}
                </div>
              </div>
              
              {/* Quote Quote Marks Container */}
              <div className="flex flex-col flex-grow relative mt-2">
                {/* Quote Icon Open */}
                <span className="testimonial-quote-icon text-3xl font-serif text-slate-300 dark:text-slate-800 leading-none select-none transition-colors duration-300">
                  &ldquo;
                </span>
                
                {/* Quote Text */}
                <blockquote className="testimonial-quote my-2 text-[14px] md:text-[15px] font-medium italic leading-relaxed text-[rgb(var(--text-secondary))] transition-colors group-hover:text-slate-900 dark:group-hover:text-white flex-grow">
                  {review.quote}
                </blockquote>

                {/* Quote Icon Close */}
                <span className="testimonial-quote-icon text-3xl font-serif text-slate-300 dark:text-slate-800 leading-none select-none text-right block transition-colors duration-300">
                  &rdquo;
                </span>
              </div>
              
              {/* Author */}
              <div className="testimonial-author mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="testimonial-author-name text-xs font-black uppercase tracking-wider text-[rgb(var(--text-primary))]">
                  &mdash; {review.authorName}
                </div>
                <div className="testimonial-author-role text-[9px] uppercase tracking-widest text-slate-500 dark:text-gray-500 mt-1">
                  {review.authorRole} · {review.authorCompany}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>

        {/* Reviews Meta - Glass Stats Bar */}
        <GlassPanel className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-xl dark:border-white/5 dark:bg-white/[0.01] max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-6 text-center md:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600 dark:bg-blue-500 vip-stats-dot" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-gray-400">
                {totalReviews} Tagasisidet
              </span>
            </div>

            <div className="hidden h-1 w-1 rounded-full bg-slate-300 md:block dark:bg-gray-700" />

            <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-gray-400">
              Keskmine{' '}
              <span className="font-black italic text-[rgb(var(--text-primary))] dark:text-white">{averageRating} / 5</span>
            </div>

            <div className="hidden h-1 w-1 rounded-full bg-slate-300 md:block dark:bg-gray-700" />

            <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-gray-400">
              <span className="font-black italic text-emerald-600 dark:text-emerald-400">{recommendationPercentage}</span> Soovitavad
            </div>
          </div>
        </GlassPanel>
      </Container>
    </Section>
  )
}