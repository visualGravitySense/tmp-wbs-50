import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section } from '@/components/ui'
import { BUSINESS_CONTACT, BUSINESS_LINKS } from '@/lib/contact/businessInfo'

export const metadata: Metadata = {
  title: 'Product — Site Name',
  description: 'Overview of the product or methodology offered by this site.',
}

export default function ProductPage() {
  return (
    <main>
      <Section variant="band" className="py-16 md:py-24">
        <Container>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-blue-600">Product</p>
          <h1 className="mb-4 text-3xl font-black tracking-tight text-[rgb(var(--text-primary))] md:text-5xl">
            {BUSINESS_CONTACT.frameworkName}
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-[rgb(var(--text-secondary))]">
            {BUSINESS_CONTACT.frameworkTagline}. Replace this template page with CMS-driven sections for
            your methodology, comparison blocks, and CTAs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={BUSINESS_LINKS.register}
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Get started
            </Link>
            <Link
              href="/kontakt"
              className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-secondary))]"
            >
              Talk to us
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  )
}
