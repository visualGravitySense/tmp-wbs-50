'use client'

import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

export default defineConfig({
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
  useCdn: false,
  // Disable real-time updates to prevent WebSocket errors
  document: {
    actions: [],
  },
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Main Page')
              .id('mainPageItem')
              .child(
                S.document()
                  .schemaType('mainPage')
                  .documentId('mainPage')
              ),
            S.listItem()
              .title('About Page')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
              ),
            S.listItem()
              .title('Koolitus Page')
              .child(
                S.document()
                  .schemaType('koolitusPage')
                  .documentId('koolitusPage')
              ),
            S.listItem()
              .title('Opstar Profit')
              .child(
                S.document()
                  .schemaType('opstarProfit')
                  .documentId('opstarProfit')
              ),
            S.listItem()
              .title('Opstar Profit Block')
              .child(
                S.document()
                  .schemaType('opstarProfitBlock')
                  .documentId('opstarProfitBlock')
              ),
                        S.listItem()
              .title('Blog Posts')
              .child(
                S.documentTypeList('blogPost')
                  .title('Blog Posts')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
          ]),
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
