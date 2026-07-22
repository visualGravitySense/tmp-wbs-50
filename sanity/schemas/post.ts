import { defineType } from 'sanity'
import { blogArticleFields, blogArticlePreview } from './objects/blogArticleFields'

/**
 * WordPress-imported articles (`scripts/import-posts.mjs`).
 * Same Studio fields as native `blogPost` — only `_type` differs for stable import IDs.
 */
export default defineType({
  name: 'post',
  title: 'Blog Post (WordPress import)',
  type: 'document',
  fields: blogArticleFields,
  preview: {
    ...blogArticlePreview,
    prepare(selection) {
      const base = blogArticlePreview.prepare(selection)
      return {
        ...base,
        subtitle: base.subtitle ? `${base.subtitle} · WordPress` : 'WordPress import',
      }
    },
  },
})
