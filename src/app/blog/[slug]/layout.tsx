import type { ReactNode } from 'react'
import { Cormorant_Garamond, Source_Serif_4 } from 'next/font/google'

/**
 * Editorial serif pairing for blog article body — scoped to post routes only.
 */
const articleBody = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  variable: '--font-article-body',
  display: 'swap',
})

const articleDisplay = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-article-display',
  display: 'swap',
})

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  return <div className={`${articleBody.variable} ${articleDisplay.variable}`}>{children}</div>
}
