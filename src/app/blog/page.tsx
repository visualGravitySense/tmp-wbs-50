import { Metadata } from 'next'
import { Suspense } from 'react'
import {
  MarketingPageBuilderLayer,
  marketingBuilderSkips,
} from '@/components/page-builder/MarketingPageBuilderLayer'
import { client } from '@/lib/sanity/client'
import { BLOG_INDEX_POSTS_QUERY } from '@/lib/sanity/queries/blog'
import { BLOG_PAGE_QUERY } from '@/lib/sanity/queries/blogPage'
import { BlogPageSettings, BlogPostPreview, BlogCategory } from '@/types/blog'
import BlogGrid from '@/components/blog/BlogGrid'
import BlogNewsletterForm from '@/components/blog/BlogNewsletterForm'
import BlogPagination from '@/components/blog/BlogPagination'
import CategoryFilter from '@/components/blog/CategoryFilter'
import MarketingSplitHero from '@/components/marketing/MarketingSplitHero'
import {
  MarketingContainer,
  Section,
  marketingInsetCardClass,
  marketingMicroPillClass,
} from '@/components/ui'
import { urlFor } from '@/lib/sanity/client'
import { Sparkles, BookOpen } from 'lucide-react'
import MarketingPageAmbient from '@/components/MarketingPageAmbient'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 60

interface BlogPageProps {
  searchParams: Promise<{
    category?: string
    page?: string
  }>
}

const FALLBACK_SETTINGS: BlogPageSettings = {
  seo: {
    metaTitle: 'Blogi — tootmisjuhtimine.ee',
    metaDescription: 'Praktilised artiklid LEAN, TPS ja OPSTAR PROFIT™ meetoditest.',
  },
  hero: {
    pillText: 'Praktilised artiklid tootmisjuhtidele',
    title: 'Tootmisjuhtimise blogi',
    titleAccent: 'ja praktilised teadmised',
    description:
      'Praktilised artiklid LEAN, TPS ja OPSTAR PROFIT™ meetoditest. Kõik põhineb päris tehastest saadud kogemusel.',
  },
  filterBar: {
    allLabel: 'Kõik',
    categories: [
      { value: 'lean', label: 'LEAN', tagBackground: '#E1F5EE', tagTextColor: '#085041' },
      { value: 'kaizen', label: 'Kaizen', tagBackground: '#FAEEDA', tagTextColor: '#633806' },
      { value: 'juhtimine', label: 'Juhtimine', tagBackground: '#EEEDFE', tagTextColor: '#3C3489' },
      { value: 'vsm', label: 'VSM', tagBackground: '#E6F1FB', tagTextColor: '#0C447C' },
      { value: 'tps', label: 'TPS', tagBackground: '#EAF3DE', tagTextColor: '#27500A' },
    ],
  },
  listUi: {
    featuredBadgeText: '✦ Toimetaja valik',
    featuredReadMoreText: 'Loe artiklit →',
    cardReadMoreText: 'Loe edasi →',
    emptyStateText: 'Artikleid ei leitud.',
    readTimeSuffix: 'min',
  },
  pagination: {
    enabled: true,
    postsPerPage: 6,
  },
  newsletter: {
    title: 'Telli uued postitused',
    description: 'Uus artikkel kord nädalas — otse postkasti. Rämpsposti ei saada.',
    placeholder: 'sinu@email.ee',
    buttonText: 'Telli →',
    note: '147+ tootmisjuhti on juba tellinud · loobu igal ajal',
  },
}

async function getPosts(): Promise<BlogPostPreview[]> {
  const rows = await client.fetch(BLOG_INDEX_POSTS_QUERY, {}, { next: { revalidate: 60 } })
  if (!Array.isArray(rows)) return []

  return rows
    .filter((r: { slug?: string }) => Boolean(r && typeof r.slug === 'string' && r.slug.trim()))
    .map(
      (r: {
        _id: string
        title?: string
        slug: string
        publishedAt?: string
        excerpt?: string
        bodyLead?: unknown[]
        coverImage?: BlogPostPreview['coverImage']
        category?: string
        readTime?: number
        featured?: boolean
        author?: BlogPostPreview['author']
      }): BlogPostPreview => ({
        _id: r._id,
        title: (r.title && String(r.title).trim()) || 'Ilma pealkirjata',
        slug: { current: r.slug.trim() },
        publishedAt: r.publishedAt || new Date().toISOString(),
        excerpt: r.excerpt?.trim() || undefined,
        bodyLead: r.bodyLead,
        coverImage: r.coverImage,
        category: (r.category && String(r.category).trim()) || 'juhtimine',
        readTime: typeof r.readTime === 'number' && r.readTime >= 1 ? r.readTime : 5,
        featured: Boolean(r.featured),
        author: r.author?.name
          ? r.author
          : { name: 'Andres Kase', role: 'Tootmisjuhtimise koolitaja' },
      }),
    )
}

async function getBlogPageSettings(): Promise<BlogPageSettings> {
  const settings = await client.fetch(BLOG_PAGE_QUERY, {}, { next: { revalidate: 60 } })
  return { ...FALLBACK_SETTINGS, ...(settings || {}) }
}

function clampPage(value: string | undefined, max: number): number {
  const parsed = Number.parseInt(value || '1', 10)
  if (Number.isNaN(parsed) || parsed < 1) return 1
  return Math.min(parsed, Math.max(max, 1))
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogPageSettings()

  let ogImage: string | undefined
  if (settings.seo?.ogImage) {
    try {
      ogImage = urlFor(settings.seo.ogImage).url()
    } catch {
      // ignore invalid Sanity image reference
    }
  }

  return buildPageMetadata({
    title: settings.seo?.metaTitle || FALLBACK_SETTINGS.seo?.metaTitle || 'Blogi — Andres Kase',
    description:
      settings.seo?.metaDescription ||
      FALLBACK_SETTINGS.seo?.metaDescription ||
      'Praktilised artiklid LEAN, TPS ja OPSTAR PROFIT™ meetoditest.',
    keywords: settings.seo?.metaKeywords,
    path: '/blog',
    ogImage,
  })
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, page } = await searchParams
  const [allPosts, settings] = await Promise.all([getPosts(), getBlogPageSettings()])
  const rawSections = Array.isArray(settings?.sections) ? settings.sections : []
  const hasBuilderSplitHero = rawSections.some((s: any) => s?._type === 'marketingSplitHeroBlock')
  /** Newsletter blocks render after the post grid (footer placement), not in the top builder strip. */
  const newsletterSections = rawSections.filter((s: any) => s?._type === 'newsletterBlock')
  const sectionsWithoutNewsletter = rawSections.filter((s: any) => s?._type !== 'newsletterBlock')
  const hasNewsletterBlock = newsletterSections.length > 0
  const builder = marketingBuilderSkips(settings as { sections?: unknown })

  const categoryTyped = (category || undefined) as BlogCategory | undefined
  const configuredFilterCategories =
    settings.filterBar?.categories?.length
      ? settings.filterBar.categories
      : (FALLBACK_SETTINGS.filterBar?.categories || [])
  const dynamicCategories = Array.from(
    new Set(allPosts.map((post) => post.category).filter(Boolean))
  )
    .filter((value) => !configuredFilterCategories.some((cat) => cat.value === value))
    .map((value) => ({ value, label: value, tagBackground: '#E6F1FB', tagTextColor: '#0C447C' }))
  const filterCategories = [...configuredFilterCategories, ...dynamicCategories]

  const filteredPosts = categoryTyped
    ? allPosts.filter((post) => post.category === categoryTyped)
    : allPosts

  const counts = allPosts.reduce<Record<string, number>>(
    (acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1
      return acc
    },
    { all: allPosts.length }
  )
  filterCategories.forEach((cat) => {
    counts[cat.value] = allPosts.filter((post) => post.category === cat.value).length
  })

  const featuredPost = filteredPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => post._id !== featuredPost?._id)
  const paginationEnabled = settings.pagination?.enabled !== false
  const perPage = Math.max(1, settings.pagination?.postsPerPage || 6)
  const totalPages = paginationEnabled ? Math.max(1, Math.ceil(regularPosts.length / perPage)) : 1
  const currentPage = clampPage(page, totalPages)
  const pagePosts = paginationEnabled
    ? regularPosts.slice((currentPage - 1) * perPage, currentPage * perPage)
    : regularPosts
  const visiblePosts = currentPage === 1 && featuredPost ? [featuredPost, ...pagePosts] : pagePosts

  const categoryMeta = Object.fromEntries(
    filterCategories.map((cat) => [cat.value, cat])
  ) as Record<string, { label: string; tagBackground?: string; tagTextColor?: string }>

  // Legacy inline split hero — skipped when Page Builder renders marketingSplitHeroBlock
  // Cast: page-builder section shape is open-ended CMS JSON, not a fixed interface.
  const builderSplitHeroBlock = rawSections.find(
    (s) => s?._type === 'marketingSplitHeroBlock',
  ) as Record<string, any> | undefined
  const builderHomeHeroBlock = rawSections.find(
    (s) => s?._type === 'homeHeroBlock',
  ) as Record<string, any> | undefined
  const builderHeroBlock = builderSplitHeroBlock || builderHomeHeroBlock

  const heroEyebrow = builderHeroBlock?.eyebrow
    || settings.hero?.pillText
    || FALLBACK_SETTINGS.hero?.pillText

  const heroTitle = builderHeroBlock?.headline
    || settings.hero?.title
    || FALLBACK_SETTINGS.hero?.title
    || ''

  const heroTitleAccent = builderHeroBlock?.scriptHeadline
    || settings.hero?.titleAccent
    || FALLBACK_SETTINGS.hero?.titleAccent
    || ''

  const heroDescription = builderSplitHeroBlock?.description
    || builderHomeHeroBlock?.subtitle
    || settings.hero?.description
    || FALLBACK_SETTINGS.hero?.description

  const heroImg = builderHeroBlock?.heroImage
    || settings.hero?.heroImage

  const splitHeroStats = Array.isArray(builderSplitHeroBlock?.stats)
    ? (builderSplitHeroBlock.stats as Array<{ value?: string; label?: string }>)
    : []
  const homeHeroStats = Array.isArray(builderHomeHeroBlock?.stats)
    ? (builderHomeHeroBlock.stats as Array<{ number?: string; suffix?: string; label?: string }>)
    : []

  const mappedBuilderStats =
    splitHeroStats.length > 0
      ? splitHeroStats
      : homeHeroStats.map((stat) => ({
          value: `${stat.number || ''}${stat.suffix || ''}`,
          label: stat.label,
        }))

  const heroStats =
    mappedBuilderStats.length > 0
      ? mappedBuilderStats
      : settings.hero?.stats?.length
        ? settings.hero.stats
        : [
            { value: String(allPosts.length), label: 'Artiklit' },
            { value: String(filterCategories.length), label: 'Kategooriat' },
          ]

  const blogHeroStats = (
    <div className="flex flex-wrap justify-start gap-4">
      {heroStats.map((stat: any, index: number) => (
        <div key={index} className={`px-4 py-3 ${marketingMicroPillClass}`}>
          <div className="text-2xl font-extrabold tracking-tight text-[rgb(var(--text-primary))]">
            {stat.value}
          </div>
          <div className="text-xs font-medium uppercase tracking-[0.06em] text-[rgb(var(--text-secondary))]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )

  const makePageHref = (target: number) => {
    const params = new URLSearchParams()
    if (categoryTyped) params.set('category', categoryTyped)
    if (target > 1) params.set('page', String(target))
    const query = params.toString()
    return query ? `/blog?${query}` : '/blog'
  }

  const blogHeroFallback = (
    <div className="flex size-72 flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-6 text-center sm:size-80 md:size-96">
      <BookOpen className="h-14 w-14 text-blue-400" strokeWidth={1.25} aria-hidden />
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85">BLOGI</p>
      <p className="max-w-[11rem] text-xs font-medium leading-snug text-white/55">Artiklid, juhendid ja parimad praktikad.</p>
    </div>
  )

  return (
    <div
      className="marketing-page-shell"
      data-page-builder={builder.usePageBuilder ? 'on' : 'off'}
    >
      <MarketingPageAmbient />

      {!hasBuilderSplitHero ? (
        <MarketingSplitHero
          eyebrow={heroEyebrow}
          headline={heroTitle || 'Tootmisjuhtimise blogi'}
          scriptHeadline={heroTitleAccent || 'ja praktilised teadmised'}
          scriptHeadlineClassName="text-marketing-accent-shell block font-serif font-normal italic text-[#0055E5] dark:text-sky-400 normal-case tracking-normal mt-2"
          headlineClassName="mb-2 mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-[#122136] dark:text-white sm:text-4xl md:text-5xl lg:text-6xl"
          headlineMainClassName="leading-[1.1] tracking-tight"
          subtitle={undefined}
          description={heroDescription}
          descriptionVariant="muted"
          descriptionClassName="mt-3 mb-8 md:mb-10 text-slate-600 dark:text-slate-400 max-w-xl text-sm lg:text-base leading-relaxed"
          image={
            heroImg?.asset
              ? {
                  src: urlFor(heroImg).width(800).height(800).fit('crop').url(),
                  alt: heroTitle,
                  priority: true,
                }
              : featuredPost?.coverImage?.asset
              ? {
                  src: urlFor(featuredPost.coverImage).width(800).height(800).fit('crop').url(),
                  alt: featuredPost.title,
                  priority: true,
                }
              : undefined
          }
          imageFallback={blogHeroFallback}
          belowCtas={blogHeroStats}
          columnAlign="start"
        />
      ) : null}

      <MarketingPageBuilderLayer
        doc={{ ...(settings as object), sections: sectionsWithoutNewsletter } as { sections?: unknown }}
      />

      <Section
        variant="minimal"
        className="sticky top-14 z-20 border-y border-white/35 bg-white/55 py-4 backdrop-blur-2xl dark:border-white/10 dark:bg-[rgb(var(--bg-secondary))/0.55]"
      >
        <MarketingContainer elevated>
          <Suspense fallback={<div className="h-10" />}>
            <CategoryFilter
              currentCategory={categoryTyped}
              allLabel={settings.filterBar?.allLabel || FALLBACK_SETTINGS.filterBar?.allLabel || 'Kõik'}
              categories={filterCategories.map((cat) => ({ value: cat.value, label: cat.label }))}
              counts={counts}
            />
          </Suspense>
        </MarketingContainer>
      </Section>

      <Section variant="band">
        <MarketingContainer elevated>
          <BlogGrid
            posts={visiblePosts}
            showFeatured={currentPage === 1}
            emptyStateText={settings.listUi?.emptyStateText}
            featuredBadgeText={settings.listUi?.featuredBadgeText}
            featuredReadMoreText={settings.listUi?.featuredReadMoreText}
            cardReadMoreText={settings.listUi?.cardReadMoreText}
            readTimeSuffix={settings.listUi?.readTimeSuffix}
            categoryMeta={categoryMeta}
          />
          {paginationEnabled && totalPages > 1 ? (
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              makePageHref={makePageHref}
            />
          ) : null}
        </MarketingContainer>
      </Section>

      {hasNewsletterBlock
        ? newsletterSections.map((raw: any) => {
            const variant = raw.variant === 'sidebar' ? 'sidebar' : 'horizontal'
            const title = raw.title?.trim() || 'Telli uued postitused'
            const subtitle =
              raw.subtitle?.trim() ||
              'Uus artikkel kord nädalas — otse postkasti. Rämpsposti ei saada.'

            if (variant === 'sidebar') {
              return (
                <Section key={raw._key || 'newsletter'} variant="band">
                  <MarketingContainer elevated className="max-w-md">
                    <BlogNewsletterForm
                      variant="sidebar"
                      title={title}
                      description={subtitle}
                      placeholder={raw.placeholder}
                      buttonText={raw.buttonText}
                      successMessage={raw.successMessage}
                      note={raw.note}
                      tag={raw.tag}
                      source={raw.source}
                    />
                  </MarketingContainer>
                </Section>
              )
            }

            return (
              <Section key={raw._key || 'newsletter'} variant="band">
                <MarketingContainer elevated>
                  <div
                    className={`flex flex-col flex-wrap items-start justify-between gap-6 sm:flex-row sm:items-center !p-7 sm:!p-9 ${marketingInsetCardClass}`}
                  >
                    <div className="min-w-0 flex-1">
                      <h2 className="text-3xl font-extrabold tracking-tight text-[rgb(var(--text-primary))]">
                        {title}
                      </h2>
                      {subtitle ? (
                        <p className="mt-2 text-[rgb(var(--text-secondary))]">{subtitle}</p>
                      ) : null}
                    </div>
                    <BlogNewsletterForm
                      variant="horizontal"
                      title={title}
                      description={subtitle}
                      placeholder={raw.placeholder}
                      buttonText={raw.buttonText}
                      successMessage={raw.successMessage}
                      note={raw.note}
                      tag={raw.tag}
                      source={raw.source}
                    />
                  </div>
                </MarketingContainer>
              </Section>
            )
          })
        : (
          <Section variant="band">
            <MarketingContainer elevated>
              <div
                className={`flex flex-col flex-wrap items-start justify-between gap-6 sm:flex-row sm:items-center !p-7 sm:!p-9 ${marketingInsetCardClass}`}
              >
                <div className="min-w-0 flex-1">
                  <h2 className="text-3xl font-extrabold tracking-tight text-[rgb(var(--text-primary))]">
                    {settings.newsletter?.title || FALLBACK_SETTINGS.newsletter?.title}
                  </h2>
                  <p className="mt-2 text-[rgb(var(--text-secondary))]">
                    {settings.newsletter?.description || FALLBACK_SETTINGS.newsletter?.description}
                  </p>
                </div>
                <BlogNewsletterForm
                  variant="horizontal"
                  placeholder={
                    settings.newsletter?.placeholder || FALLBACK_SETTINGS.newsletter?.placeholder
                  }
                  buttonText={
                    settings.newsletter?.buttonText || FALLBACK_SETTINGS.newsletter?.buttonText
                  }
                  note={settings.newsletter?.note || FALLBACK_SETTINGS.newsletter?.note}
                />
              </div>
            </MarketingContainer>
          </Section>
        )}
    </div>
  )
}
