import { BlogPostPreview } from '@/types/blog'
import BlogCard from './BlogCard'

interface BlogGridProps {
  posts: BlogPostPreview[]
  showFeatured?: boolean
  emptyStateText?: string
  featuredBadgeText?: string
  featuredReadMoreText?: string
  cardReadMoreText?: string
  readTimeSuffix?: string
  categoryMeta?: Record<string, { label: string; tagBackground?: string; tagTextColor?: string }>
}

export default function BlogGrid({
  posts,
  showFeatured = true,
  emptyStateText = 'Artikleid ei leitud.',
  featuredBadgeText,
  featuredReadMoreText,
  cardReadMoreText,
  readTimeSuffix,
  categoryMeta = {},
}: BlogGridProps) {
  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          {emptyStateText}
        </p>
      </div>
    )
  }

  const featuredPost = showFeatured ? posts.find(post => post.featured) : null
  const regularPosts = showFeatured 
    ? posts.filter(post => !post.featured)
    : posts

  return (
    <div className="space-y-8 md:space-y-10">
      {featuredPost && (
        <BlogCard
          post={featuredPost}
          featured={true}
          featuredBadgeText={featuredBadgeText}
          readMoreText={featuredReadMoreText || cardReadMoreText}
          readTimeSuffix={readTimeSuffix}
          categoryLabel={categoryMeta[featuredPost.category]?.label}
          categoryColor={categoryMeta[featuredPost.category]?.tagBackground}
          categoryTextColor={categoryMeta[featuredPost.category]?.tagTextColor}
        />
      )}
      
      {regularPosts.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <BlogCard
              key={post._id}
              post={post}
              readMoreText={cardReadMoreText}
              readTimeSuffix={readTimeSuffix}
              categoryLabel={categoryMeta[post.category]?.label}
              categoryColor={categoryMeta[post.category]?.tagBackground}
              categoryTextColor={categoryMeta[post.category]?.tagTextColor}
            />
          ))}
        </div>
      )}
    </div>
  )
}
