import Link from 'next/link'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { BlogPostPreview, CATEGORY_CONFIG } from '@/types/blog'
import { urlFor } from '@/sanity/lib/image'

const THUMB_GRADIENT: Record<string, string> = {
  lean: 'linear-gradient(135deg,#e1f5ee,#9fe1cb)',
  kaizen: 'linear-gradient(135deg,#faeeda,#fac775)',
  juhtimine: 'linear-gradient(135deg,#eeedfe,#cecbf6)',
  vsm: 'linear-gradient(135deg,#e6f1fb,#b5d4f4)',
  tps: 'linear-gradient(135deg,#eaf3de,#c0dd97)',
}

type BlogPostRelatedSidebarProps = {
  posts: BlogPostPreview[]
  title?: string
  readTimeSuffix?: string
}

export default function BlogPostRelatedSidebar({
  posts,
  title = 'Seotud artiklid',
  readTimeSuffix = 'min',
}: BlogPostRelatedSidebarProps) {
  if (!posts.length) return null

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.08] bg-white/70 p-4 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.5)] backdrop-blur-2xl dark:border-white/12 dark:bg-[rgb(var(--bg-secondary))]/62 dark:shadow-[0_20px_50px_-34px_rgba(0,0,0,0.75)] xl:rounded-[20px] xl:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.26)_100%)] dark:bg-[linear-gradient(140deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.06)_100%)]" aria-hidden />
      <div className="pointer-events-none absolute -right-12 -top-14 h-28 w-28 rounded-full bg-blue-400/15 blur-2xl dark:bg-blue-500/18" aria-hidden />
      <div className="relative z-[1] mb-2.5 text-[11px] font-bold uppercase tracking-[0.11em] text-slate-400 dark:text-slate-500 xl:mb-3.5">{title}</div>
      <div className="relative z-[1] flex flex-col gap-3">
        {posts.map((post) => {
          const cat = CATEGORY_CONFIG[post.category] || {
            label: post.category,
            color: '#f3f4f6',
            textColor: '#111827',
          }
          const hasImage = Boolean(post.coverImage?.asset?._ref)
          const thumbStyle = !hasImage
            ? { background: THUMB_GRADIENT[post.category] || 'linear-gradient(135deg,#dce8f8,#b8d4f5)' }
            : undefined

          return (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group flex gap-2.5 rounded-[14px] border border-transparent p-1.5 no-underline transition-all duration-200 hover:border-black/[0.08] hover:bg-white/45 dark:hover:border-white/12 dark:hover:bg-white/[0.04]"
            >
              <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[12px] border border-black/[0.07] shadow-[0_8px_20px_-14px_rgba(15,23,42,0.45)] dark:border-white/10">
                {hasImage && post.coverImage ? (
                  <Image
                    src={urlFor(post.coverImage).width(104).height(104).url()}
                    alt={post.coverImage?.alt || post.title}
                    width={52}
                    height={52}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="relative flex h-full w-full items-center justify-center animate-pulse-slow"
                    style={thumbStyle}
                    aria-hidden
                  >
                    <div className="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-[1px]" />
                    <img
                      src="/opstar-brand-logo.webp"
                      alt="OPSTAR Logo"
                      className="relative z-10 h-5 w-5 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-[0.09em] text-blue-500 dark:text-blue-300">{cat.label}</div>
                <div className="line-clamp-2 text-[13px] font-semibold leading-snug text-[rgb(var(--text-primary))]">{post.title}</div>
                <div className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                  {post.readTime} {readTimeSuffix} ·{' '}
                  {new Date(post.publishedAt).toLocaleDateString('et-EE', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
