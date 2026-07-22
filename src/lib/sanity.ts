import { cache } from 'react'
import { createClient } from '@sanity/client'

import { fetchWithRetry } from './sanity/fetchWithRetry'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url'

import { MAIN_PAGE_QUERY } from './sanity/mainPageQuery'
import { NINE_DAYS_PROGRAM_GROQ } from './sanity/nineDaysProgramGroq'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-04-28' as const,
  useCdn: false, // Disable CDN to prevent caching
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
    studioUrl: '/studio'
  }
}

export const client = createClient(config)

const builder = createImageUrlBuilder(client)

export const urlForImage = (source: any): ImageUrlBuilder => {
  return builder.image(source)
}

// GROQ Queries
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  ...,
  nineDaysProgram {
    ${NINE_DAYS_PROGRAM_GROQ}
  },
  "globalNineDaysProgramDoc": *[_type == "nineDaysProgram" && _id == "nineDaysProgram"][0]{
    ${NINE_DAYS_PROGRAM_GROQ}
  },
  theme{
    primaryColor,
    accentColor,
    themeStyle
  },
  layout{
    footerVariant
  },
  header{
    logo,
    navLinks[]{ name, href },
    contactButtonText,
    mobileContactButtonText,
    contactButtonLink
  },
  footer{
    brandBadge,
    brandTitle,
    brandDescription,
    socialLinks[]{ platform, url, label },
    servicesTitle,
    servicesLinks[]{ label, href },
    infoTitle,
    infoLinks[]{ label, href },
    contactTitle,
    emailLabel,
    email,
    phoneLabel,
    phone,
    locationLabel,
    location,
    partnerBadgeText,
    partnerBadgeLink,
    registryCode,
    vatNumber,
    copyrightText,
    bottomTagline
  }
}`

export const ANDRES_PROFILE_QUERY = `*[_type == "andresProfile"][0]`

export const PAGE_QUERY = (slug: string) => `
  *[_type == "page" && slug.current == $slug][0]{
    ...,
    content[]{
      ...,
      testimonials[]->{
        ...,
        avatar
      }
    }
  }
`

export const TRAINING_QUERY = `
  *[_type == "training"][0]{
    ...,
    instructors[],
    testimonials[]->{
      ...,
      avatar
    }
  }
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(featured desc, name asc)
`

export const FEATURED_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && featured == true] | order(name asc)
`

export const PARTNER_LOGOS_QUERY = `
  *[_type == "partnerLogo"] | order(order asc, name asc) {
    _id,
    name,
    displayType,
    logo,
    url,
    order
  }
`

export const GLOBAL_STATS_QUERY = `
  *[_type == "siteSettings"][0].globalStats.stats
`

export const QUIZ_QUERY = `
  *[_type == "compactQuiz"][0]{
    title,
    eyebrow,
    questions[]{
      question,
      options[]{
        text,
        points
      }
    },
    results[]{
      minScore,
      title,
      description,
      ctaLink
    }
  }
`

export { MAIN_PAGE_QUERY }

// Helper functions
export const getSiteSettings = cache(async () => {
  return fetchWithRetry(
    () =>
      client.fetch(SITE_SETTINGS_QUERY, {}, {
        next: { revalidate: 60 },
        stega: false,
      }),
    { label: 'siteSettings' },
  )
})

export const getAndresProfile = cache(async () => {
  return fetchWithRetry(
    () =>
      client.fetch(ANDRES_PROFILE_QUERY, {}, {
        next: { revalidate: 60 },
        stega: false,
      }),
    { label: 'andresProfile' },
  )
})

export async function getPage(slug: string) {
  return await client.fetch(PAGE_QUERY(slug), { slug })
}

export async function getTraining() {
  return await client.fetch(TRAINING_QUERY)
}

export async function getTestimonials() {
  return await client.fetch(TESTIMONIALS_QUERY)
}

export async function getFeaturedTestimonials() {
  return await client.fetch(FEATURED_TESTIMONIALS_QUERY)
}

export const getPartnerLogos = cache(async () => {
  return fetchWithRetry(
    () =>
      client.fetch(PARTNER_LOGOS_QUERY, {}, {
        next: { revalidate: 60 },
        stega: false,
      }),
    { label: 'partnerLogos' },
  )
})

export const getGlobalStats = cache(async () => {
  return fetchWithRetry(
    () =>
      client.fetch(GLOBAL_STATS_QUERY, {}, {
        next: { revalidate: 60 },
      }),
    { label: 'globalStats' },
  )
})

export async function getQuiz() {
  return await client.fetch(QUIZ_QUERY)
}

export async function getMainPage() {
  return await client.fetch(MAIN_PAGE_QUERY)
}
