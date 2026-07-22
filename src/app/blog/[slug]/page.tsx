import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import client from '@/lib/sanity/client'
import {
  POST_BY_SLUG_QUERY,
  RELATED_POSTS_QUERY,
  ALL_SLUGS_QUERY,
  PREV_POST_QUERY,
  NEXT_POST_QUERY,
} from '@/lib/sanity/queries/blog'
import {
  BLOG_NEWSLETTER_SETTINGS_QUERY,
  resolveBlogNewsletterSettings,
  type BlogNewsletterSettings,
} from '@/lib/sanity/queries/blogPage'
import { BlogPost, BlogPostPreview } from '@/types/blog'
import { urlFor } from '@/lib/sanity/client'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { CATEGORY_CONFIG } from '@/types/blog'
import { extractBlogTocAndHeadingIds } from '@/lib/blog/blogPostHeadings'
import { portableTextBlocksToPlain } from '@/lib/blog/postCardLead'
import BlogPostPortableBody from '@/components/blog/BlogPostPortableBody'
import BlogPostToc from '@/components/blog/BlogPostToc'
import BlogPostShare from '@/components/blog/BlogPostShare'
import BlogPostRelatedSidebar from '@/components/blog/BlogPostRelatedSidebar'
import BlogPostArticleCta from '@/components/blog/BlogPostArticleCta'
import BlogPostStickyRail from '@/components/blog/BlogPostStickyRail'
import BlogNewsletterForm from '@/components/blog/BlogNewsletterForm'
import { Container, Section } from '@/components/ui'
import { getSiteUrl } from '@/lib/site/siteUrl'

const blogArticleContainerClass =
  'px-6 sm:px-10 lg:px-[60px]'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

type AdjacentPost = { _id: string; title: string; slug: { current: string } } | null

function authorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase()
}

export async function generateStaticParams() {
  const slugs = await client.fetch(ALL_SLUGS_QUERY, {}, { next: { revalidate: 60 } })
  if (!Array.isArray(slugs)) return []
  return slugs
    .filter((post: { slug?: { current?: string | null } }) => Boolean(post?.slug?.current))
    .map((post: { slug: { current: string } }) => ({
      slug: post.slug.current,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return buildPageMetadata({
      title: 'Artiklit ei leitud',
      path: `/blog/${slug}`,
      noIndex: true,
    })
  }

  let ogImage: string | undefined
  if (post.coverImage) {
    try {
      ogImage = urlFor(post.coverImage).url()
    } catch {
      // ignore invalid Sanity image reference
    }
  }

  const descriptionRaw = post.excerpt?.trim() || portableTextBlocksToPlain(post.body)

  return buildPageMetadata({
    title: post.title,
    description: descriptionRaw || undefined,
    path: `/blog/${slug}`,
    ogImage,
    ogType: 'article',
  })
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60 } })
  if (!post) return null
  return {
    ...post,
    body: Array.isArray(post.body) ? post.body : [],
  }
}

async function getRelatedPosts(category: string, currentId: string): Promise<BlogPostPreview[]> {
  const posts = await client.fetch(RELATED_POSTS_QUERY, { category, currentId }, { next: { revalidate: 60 } })
  if (!Array.isArray(posts)) return []
  return posts.filter((p: BlogPostPreview) => Boolean(p?.slug?.current))
}

async function getAdjacentPosts(publishedAt: string): Promise<{ prev: AdjacentPost; next: AdjacentPost }> {
  const [prev, next] = await Promise.all([
    client.fetch(PREV_POST_QUERY, { publishedAt }, { next: { revalidate: 60 } }),
    client.fetch(NEXT_POST_QUERY, { publishedAt }, { next: { revalidate: 60 } }),
  ])
  return { prev, next }
}

async function getBlogNewsletterSettings(): Promise<BlogNewsletterSettings> {
  const data = await client.fetch(
    BLOG_NEWSLETTER_SETTINGS_QUERY,
    {},
    { next: { revalidate: 60 } },
  )
  return resolveBlogNewsletterSettings(data, { preferSidebarSource: true })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const [relatedPosts, { prev: prevPost, next: nextPost }, newsletterData] =
    await Promise.all([
      getRelatedPosts(post.category, post._id),
      getAdjacentPosts(post.publishedAt),
      getBlogNewsletterSettings(),
    ])

  const { toc, headingIdByKey } = extractBlogTocAndHeadingIds(post.body)
  const categoryMeta = CATEGORY_CONFIG[post.category] || {
    label: post.category,
    color: '#E6F1FB',
    textColor: '#0C447C',
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? urlFor(post.coverImage).url() : undefined,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Your Name',
    },
  }

  const publishedLabel = new Date(post.publishedAt).toLocaleDateString('et-EE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const hasCover = Boolean(post.coverImage?.asset?._ref)
  const fallbackGradientByCategory: Record<string, string> = {
    lean: 'from-[#e1f5ee] to-[#9fe1cb]',
    kaizen: 'from-[#faeeda] to-[#fac775]',
    juhtimine: 'from-[#eeedfe] to-[#cecbf6]',
    vsm: 'from-[#e6f1fb] to-[#b5d4f4]',
    tps: 'from-[#eaf3de] to-[#c0dd97]',
  }
  const fallbackGradient =
    fallbackGradientByCategory[post.category] || 'from-[#dce8f8] to-[#b8d4f5]'
  const authorImg = post.author.avatar?.asset?._ref
  const profileHref = '/about'
  /** Stable absolute URL for share buttons (same on SSR + client → no hydration mismatch). */
  const shareUrl = `${getSiteUrl()}/blog/${slug}`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative min-h-screen bg-[rgb(var(--bg-primary))]">
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.018] dark:opacity-[0.04]" aria-hidden>
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="blogNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#blogNoise)" />
          </svg>
        </div>
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-36 -left-32 h-[520px] w-[520px] rounded-full bg-blue-500/12 blur-[115px] dark:bg-blue-500/18" />
          <div className="absolute top-[20%] -right-32 h-[480px] w-[480px] rounded-full bg-cyan-400/12 blur-[120px] dark:bg-cyan-500/16" />
        </div>

        {/* Breadcrumb — matches art-breadcrumb */}
        <Section variant="minimal" className="relative z-[1] pb-0 pt-24 lg:pt-[76px]">
        <Container
          size="6xl"
          padding="none"
          elevated
          className={blogArticleContainerClass}
        >
        <nav
          className="text-xs text-gray-400 dark:text-gray-500"
          aria-label="Asukoht"
        >
          <Link href="/" className="text-gray-400 transition-colors hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400">
            Avaleht
          </Link>
          <span className="mx-1.5 opacity-40">›</span>
          <Link href="/blog" className="text-gray-400 transition-colors hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400">
            Blogi
          </Link>
          <span className="mx-1.5 opacity-40">›</span>
          <span className="text-[rgb(var(--text-primary))]">{post.title}</span>
        </nav>

        {/* Hero — art-hero */}
        <header className="relative z-[1] pt-8 pb-0">
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em]"
                style={{ backgroundColor: categoryMeta.color, color: categoryMeta.textColor || '#0C447C' }}
              >
                {categoryMeta.label}
              </span>
              <span className="h-[3px] w-[3px] rounded-full bg-gray-400 dark:bg-gray-500" aria-hidden />
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{post.readTime} min lugemist</span>
              <span className="h-[3px] w-[3px] rounded-full bg-gray-400 dark:bg-gray-500" aria-hidden />
              <time className="text-xs font-medium text-gray-400 dark:text-gray-500" dateTime={post.publishedAt}>
                {publishedLabel}
              </time>
            </div>

            <h1 className="max-w-[760px] text-[clamp(1.875rem,4vw,3.25rem)] font-extrabold leading-[1.06] tracking-[-0.032em] text-[rgb(var(--text-primary))]">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="mt-4 max-w-[680px] text-lg leading-relaxed text-[rgb(var(--text-secondary))]">{post.excerpt}</p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              {authorImg ? (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-black/[0.06] dark:border-white/10">
                  <Image
                    src={urlFor(post.author.avatar!).width(80).height(80).url()}
                    alt={post.author.avatar?.alt || post.author.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5baeff] via-[#007aff] to-[#0040a8] text-[13px] font-bold text-white shadow-[0_2px_8px_rgba(0,113,227,0.35)]"
                  aria-hidden={!!authorImg}
                >
                  {authorInitials(post.author.name)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-[rgb(var(--text-primary))]">{post.author.name}</div>
                {post.author.role ? (
                  <div className="text-xs text-gray-400 dark:text-gray-500">{post.author.role}</div>
                ) : null}
              </div>
              <Link
                href={profileHref}
                className="ml-auto text-xs font-medium text-blue-600 transition-opacity hover:opacity-70 dark:text-blue-400"
              >
                Vaata profiili →
              </Link>
            </div>
        </header>
        </Container>
        </Section>

        {/* Cover — art-cover */}
        <div className="relative z-[1] mt-9 h-[260px] w-full overflow-hidden lg:h-[420px]">
          {hasCover && post.coverImage ? (
            <>
              <Image
                src={urlFor(post.coverImage).width(1600).height(840).url()}
                alt={post.coverImage.alt || post.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_65%)]" />
            </>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-tr from-slate-50 via-blue-50/40 to-indigo-50/50 dark:from-slate-900 dark:via-[#0a192f] dark:to-[#0055E5]/20">
              {/* Ambient glows to look expensive and abstract */}
              <div className="absolute top-[15%] left-[25%] w-48 h-48 rounded-full bg-blue-400/10 blur-2xl dark:bg-blue-500/10 pointer-events-none" />
              <div className="absolute bottom-[15%] right-[25%] w-44 h-44 rounded-full bg-indigo-400/10 blur-2xl dark:bg-indigo-500/10 pointer-events-none" />
              
              {/* Subtle mesh/grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:20px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_90%)] pointer-events-none" />
              
              {/* Blend fade to seamlessly merge with the page background */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgb(var(--bg-primary))]/90 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
                {/* Premium Glassmorphic Badge for single page cover fallback with brand logo */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md shadow-[0_12px_40px_0_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.3)]">
                  <img
                    src="/placeholder-logo.svg"
                    alt="Logo"
                    className="h-10 w-10 object-contain opacity-90 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              
              <span className="absolute bottom-6 left-6 sm:left-10 lg:left-[60px] text-xs font-semibold uppercase tracking-wider text-slate-400/80 dark:text-slate-500/80">
                Site Name
              </span>
            </div>
          )}
        </div>

        {/* Layout: art-layout */}
        <Section variant="minimal" className="relative z-[1]">
        <Container
          size="6xl"
          padding="none"
          elevated
          className={`${blogArticleContainerClass} grid items-start gap-8 py-12 lg:grid-cols-[minmax(0,1.25fr)_280px] lg:gap-10 lg:pb-20 lg:pt-12 xl:grid-cols-[minmax(0,1.3fr)_300px] xl:gap-12`}
        >
          <article className="min-w-0">
            {toc.length > 0 ? (
              <div className="mb-8 lg:hidden">
                <BlogPostToc items={toc} variant="collapsible" />
              </div>
            ) : null}
            {post.body?.length ? (
              <BlogPostPortableBody body={post.body} headingIdByKey={headingIdByKey} />
            ) : null}

            <BlogPostArticleCta />

            {/* Author box — matches author-box */}
            <div className="relative mt-10 overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/72 p-6 shadow-[0_24px_64px_-34px_rgba(15,23,42,0.34)] backdrop-blur-2xl dark:border-white/12 dark:bg-[rgb(var(--bg-secondary))]/68 dark:shadow-[0_28px_72px_-36px_rgba(0,0,0,0.78)] sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.04)_42%,rgba(255,255,255,0.28)_100%)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.08)_100%)]" aria-hidden />
              <div className="pointer-events-none absolute -top-20 right-0 h-44 w-44 rounded-full bg-blue-400/14 blur-3xl dark:bg-blue-500/18" aria-hidden />
              <div className="relative z-[1]">
              <div className="mb-3.5 flex items-center gap-3.5">
                {authorImg ? (
                  <div className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-full border border-white/70 shadow-[0_10px_24px_-12px_rgba(15,23,42,0.45)] dark:border-white/20">
                    <Image
                      src={urlFor(post.author.avatar!).width(104).height(104).url()}
                      alt={post.author.avatar?.alt || post.author.name}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full border border-white/65 bg-gradient-to-br from-[#5baeff] via-[#007aff] to-[#0040a8] text-[15px] font-bold text-white shadow-[0_10px_24px_-12px_rgba(0,96,255,0.6)]">
                    {authorInitials(post.author.name)}
                  </div>
                )}
                <div>
                  <div className="text-[2rem] leading-none tracking-[-0.02em] text-[rgb(var(--text-primary))] blog-article-display">{post.author.name}</div>
                  {post.author.role ? <div className="mt-1 text-[0.8rem] uppercase tracking-[0.08em] text-[rgb(var(--text-secondary))]">{post.author.role}</div> : null}
                </div>
              </div>
              <Link href={profileHref} className="inline-flex items-center gap-1.5 text-[1.05rem] font-semibold text-blue-700 transition-all hover:translate-x-0.5 hover:opacity-90 dark:text-blue-400 blog-article-display">
                Vaata täielikku profiili →
              </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-0 mt-8 flex flex-wrap gap-2 border-t border-black/[0.07] pt-6 dark:border-white/10">
              <span className="mb-1.5 w-full text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-400 dark:text-gray-500">
                Sildid
              </span>
              <Link
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                rel="nofollow"
                className="inline-flex items-center rounded-full border border-black/[0.12] bg-white px-3.5 py-1.5 text-xs font-semibold text-[rgb(var(--text-secondary))] transition-colors hover:border-blue-600 hover:bg-[rgba(0,113,227,0.10)] hover:text-blue-600 dark:border-white/15 dark:bg-[rgb(var(--bg-secondary))]/50"
              >
                {categoryMeta.label}
              </Link>
            </div>

            {/* Prev / next */}
            {(prevPost || nextPost) && (
              <nav
                className="mt-12 flex flex-col gap-4 border-t border-black/[0.07] pt-8 sm:flex-row sm:justify-between dark:border-white/10"
                aria-label="Artiklite navigatsioon"
              >
                <div className="min-w-0 flex-1">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug.current}`}
                      className="flex flex-col gap-1 rounded-[14px] border border-black/[0.07] bg-white/95 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-600 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-[rgb(var(--bg-secondary))]/60 dark:hover:shadow-[0_8px_32px_rgba(0,113,227,0.12)]"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">← Eelmine</span>
                      <span className="text-sm font-bold leading-snug text-[rgb(var(--text-primary))]">{prevPost.title}</span>
                    </Link>
                  ) : null}
                </div>
                <div className={`min-w-0 flex-1 ${prevPost ? 'sm:text-right' : ''}`}>
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug.current}`}
                      className={`flex flex-col gap-1 rounded-[14px] border border-black/[0.07] bg-white/95 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-600 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-[rgb(var(--bg-secondary))]/60 dark:hover:shadow-[0_8px_32px_rgba(0,113,227,0.12)] ${prevPost ? 'sm:ml-auto sm:max-w-full' : ''}`}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">Järgmine →</span>
                      <span className="text-sm font-bold leading-snug text-[rgb(var(--text-primary))]">{nextPost.title}</span>
                    </Link>
                  ) : null}
                </div>
              </nav>
            )}
          </article>

          <aside className="hidden flex-col gap-4 lg:sticky lg:top-14 lg:flex lg:h-fit lg:self-start xl:top-20 xl:gap-5">
            <BlogPostStickyRail>
              <div className="flex flex-col gap-5">
                {toc.length > 0 ? <BlogPostToc items={toc} /> : null}
                <BlogPostRelatedSidebar posts={relatedPosts} />
                <BlogPostShare url={shareUrl} />
                <BlogNewsletterForm
                  variant="sidebar"
                  title={newsletterData.title}
                  subtitle={newsletterData.subtitle}
                  placeholder={newsletterData.placeholder}
                  buttonText={newsletterData.buttonText}
                  successMessage={newsletterData.successMessage}
                  note={newsletterData.note}
                  smallNote={newsletterData.smallNote}
                  tag={newsletterData.tag || 'uudiskiri-sidebar'}
                  source={newsletterData.source || 'blog-sidebar'}
                />
              </div>
            </BlogPostStickyRail>
          </aside>
        </Container>
        </Section>

        {/* Below lg: related posts, share, newsletter (TOC is collapsible above article body) */}
        <Section variant="minimal" className="relative z-[1] lg:hidden">
        <Container
          size="6xl"
          padding="none"
          className={`${blogArticleContainerClass} space-y-5 pb-16`}
        >
          <BlogPostRelatedSidebar posts={relatedPosts} />
          <BlogPostShare url={shareUrl} />
          <BlogNewsletterForm
            variant="sidebar"
            title={newsletterData.title}
            subtitle={newsletterData.subtitle}
            placeholder={newsletterData.placeholder}
            buttonText={newsletterData.buttonText}
            successMessage={newsletterData.successMessage}
            note={newsletterData.note}
            smallNote={newsletterData.smallNote}
            tag={newsletterData.tag || 'uudiskiri-sidebar'}
            source={newsletterData.source || 'blog-sidebar'}
          />
        </Container>
        </Section>
      </div>
    </>
  )
}
