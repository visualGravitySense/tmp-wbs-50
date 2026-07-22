import Link from 'next/link'
import Image from 'next/image'
import { marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'
import { BlogPostPreview, CATEGORY_CONFIG } from '@/types/blog'
import { urlFor } from '@/sanity/lib/image'
import { postCardLeadText } from '@/lib/blog/postCardLead'

interface BlogCardProps {
  post: BlogPostPreview
  featured?: boolean
  categoryLabel?: string
  categoryColor?: string
  categoryTextColor?: string
  featuredBadgeText?: string
  readMoreText?: string
  readTimeSuffix?: string
}

export default function BlogCard({
  post,
  featured = false,
  categoryLabel,
  categoryColor,
  categoryTextColor,
  featuredBadgeText,
  readMoreText = 'Loe edasi →',
  readTimeSuffix = 'min',
}: BlogCardProps) {
  const defaultCategory = CATEGORY_CONFIG[post.category] || {
    label: post.category,
    color: '#F3F4F6',
    textColor: '#111827',
  }
  const finalLabel = categoryLabel || defaultCategory.label
  const finalBg = categoryColor || defaultCategory.color
  const finalColor = categoryTextColor || defaultCategory.textColor || '#111827'
  const hasCoverImage = Boolean(post.coverImage?.asset?._ref)
  const fallbackGradientByCategory: Record<string, string> = {
    lean: 'from-[#e1f5ee] to-[#9fe1cb]',
    kaizen: 'from-[#faeeda] to-[#fac775]',
    juhtimine: 'from-[#eeedfe] to-[#cecbf6]',
    vsm: 'from-[#e6f1fb] to-[#b5d4f4]',
    tps: 'from-[#eaf3de] to-[#c0dd97]',
  }
  const fallbackGradient =
    fallbackGradientByCategory[post.category] || 'from-[#dce8f8] to-[#b8d4f5]'

  const leadText = postCardLeadText(post)

  return (
    <Link 
      href={`/blog/${post.slug.current}`}
      className={cn(
        'group block overflow-hidden !p-0 transition-all duration-300 hover:-translate-y-1.5',
        marketingInsetCardClass,
        featured ? 'col-span-1 md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-2' : '',
      )}
    >
      <div className={`relative ${featured ? 'h-56 lg:h-full' : 'h-44'}`}>
        {hasCoverImage ? (
          <Image
            src={urlFor(post.coverImage!).url()}
            alt={post.coverImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={featured}
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-blue-50/40 to-indigo-50/50 dark:from-slate-900 dark:via-[#0a192f] dark:to-[#0055E5]/20 flex items-center justify-center p-6"
            aria-hidden
          >
            {/* Ambient glows to look expensive and abstract */}
            <div className="absolute top-[20%] left-[20%] w-24 h-24 rounded-full bg-blue-400/10 blur-xl dark:bg-blue-500/10 pointer-events-none" />
            <div className="absolute bottom-[20%] right-[20%] w-20 h-20 rounded-full bg-indigo-400/10 blur-xl dark:bg-indigo-500/10 pointer-events-none" />
            
            {/* Subtle mesh/grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] pointer-events-none" />
            
            {/* Blend fade to seamlessly merge with the card body */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/70 via-white/10 to-transparent dark:from-[rgb(var(--bg-secondary))]/80 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
              {/* Ultra-clean minimalist circular glass badge with brand logo */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
                <img
                  src="/placeholder-logo.svg"
                  alt="Logo"
                  className="h-7 w-7 object-contain opacity-90 transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent dark:from-black/45" />
        {featured && featuredBadgeText && (
          <div
            className={cn(
              'absolute left-4 top-4 border-blue-600/40 bg-blue-600 px-3 py-1 text-[11px] font-semibold text-white shadow-lg',
              marketingMicroPillClass,
            )}
          >
            {featuredBadgeText}
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              'inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-md backdrop-blur',
              marketingMicroPillClass,
              featured && featuredBadgeText ? 'mt-9' : '',
            )}
            style={{ backgroundColor: finalBg, color: finalColor }}
          >
            {finalLabel}
          </span>
        </div>
      </div>
      
      <div className={`relative p-6 ${featured ? 'flex flex-col justify-center lg:p-9' : ''}`}>
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />
        <h3 className={`mb-2 font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 ${
          featured ? 'text-2xl leading-tight' : 'line-clamp-2 text-lg'
        }`}>
          {post.title}
        </h3>
        {leadText && (
          <p
            className={`text-[rgb(var(--text-secondary))] dark:text-gray-400 ${
              featured ? 'mb-5 text-base leading-relaxed line-clamp-4' : 'mb-4 line-clamp-3 text-sm leading-relaxed sm:text-[15px]'
            }`}
          >
            {leadText}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('et-EE', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
            <span>·</span>
            <span>{post.readTime} {readTimeSuffix}</span>
          </div>
          
          {post.author && (
            <div className="flex items-center space-x-2">
              <span>{post.author.name}</span>
            </div>
          )}
        </div>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
          {readMoreText}
        </span>
      </div>
    </Link>
  )
}
