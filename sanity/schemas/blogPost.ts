import { defineType } from 'sanity'
import { blogArticleFields, blogArticlePreview } from './objects/blogArticleFields'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: blogArticleFields,
  preview: blogArticlePreview,
})
