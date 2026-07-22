/** Native articles use `blogPost`; WordPress imports use `post` (same fields in Studio). */
const BLOG_TYPES = `["blogPost", "post"]`

const bodyLead = `"bodyLead": select(
  _type == "blogPost" && defined(body) => body[0..5],
  _type == "post" && defined(body) => body[0..5],
  _type == "post" && defined(content) => content[0..5]
)`

export const BLOG_INDEX_POSTS_QUERY = `*[_type in ${BLOG_TYPES} && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  ${bodyLead},
  coverImage,
  "category": coalesce(category, "juhtimine"),
  "readTime": coalesce(readTime, 5),
  "featured": coalesce(featured, false),
  "author": coalesce(author, {"name": "Andres Kase", "role": "Tootmisjuhtimise koolitaja"})
}`

export const ALL_POSTS_QUERY = `*[_type in ${BLOG_TYPES}] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  ${bodyLead},
  coverImage,
  "category": coalesce(category, "juhtimine"),
  "readTime": coalesce(readTime, 5),
  "featured": coalesce(featured, false),
  "author": coalesce(author, {"name": "Andres Kase", "role": "Tootmisjuhtimise koolitaja"})
}`

export const POST_BY_SLUG_QUERY = `*[_type in ${BLOG_TYPES} && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  excerpt,
  coverImage,
  "category": coalesce(category, "juhtimine"),
  "readTime": coalesce(readTime, 5),
  "featured": coalesce(featured, false),
  "author": coalesce(author, {"name": "Andres Kase", "role": "Tootmisjuhtimise koolitaja"}),
  "body": coalesce(body, content)
}`

export const FEATURED_POSTS_QUERY = `*[_type in ${BLOG_TYPES} && coalesce(featured, false) == true] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  ${bodyLead},
  coverImage,
  "category": coalesce(category, "juhtimine"),
  "readTime": coalesce(readTime, 5),
  "featured": coalesce(featured, false),
  "author": coalesce(author, {"name": "Andres Kase", "role": "Tootmisjuhtimise koolitaja"})
}`

export const POSTS_BY_CATEGORY_QUERY = `*[_type in ${BLOG_TYPES} && coalesce(category, "juhtimine") == $category] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  ${bodyLead},
  coverImage,
  "category": coalesce(category, "juhtimine"),
  "readTime": coalesce(readTime, 5),
  "featured": coalesce(featured, false),
  "author": coalesce(author, {"name": "Andres Kase", "role": "Tootmisjuhtimise koolitaja"})
}`

export const RELATED_POSTS_QUERY = `*[_type in ${BLOG_TYPES} && coalesce(category, "juhtimine") == $category && _id != $currentId && defined(slug.current)] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  ${bodyLead},
  coverImage,
  "category": coalesce(category, "juhtimine"),
  "readTime": coalesce(readTime, 5),
  "featured": coalesce(featured, false),
  "author": coalesce(author, {"name": "Andres Kase", "role": "Tootmisjuhtimise koolitaja"})
}`

export const ALL_SLUGS_QUERY = `*[_type in ${BLOG_TYPES} && defined(slug.current)] {
  slug
}`

export const NEXT_POST_QUERY = `*[_type in ${BLOG_TYPES} && publishedAt > $publishedAt && defined(slug.current)] | order(publishedAt asc) [0] {
  _id,
  title,
  slug
}`

export const PREV_POST_QUERY = `*[_type in ${BLOG_TYPES} && publishedAt < $publishedAt && defined(slug.current)] | order(publishedAt desc) [0] {
  _id,
  title,
  slug
}`
