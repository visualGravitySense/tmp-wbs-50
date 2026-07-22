import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section } from '@/components/ui'
import { BUSINESS_CONTACT, BUSINESS_LINKS } from '@/lib/contact/businessInfo'

export const metadata: Metadata = {
  title: 'About — Site Name',
  description: 'About our team, approach, and how we work with clients.',
}

export default function AboutPage() {
  return (
    <main>
      <Section variant="band" className="py-16 md:py-24">
        <Container>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-blue-600">About</p>
          <h1 className="mb-4 text-3xl font-black tracking-tight text-[rgb(var(--text-primary))] md:text-5xl">
            {BUSINESS_CONTACT.personName}
          </h1>
          <p className="mb-2 text-lg text-[rgb(var(--text-secondary))]">{BUSINESS_CONTACT.personRole}</p>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-[rgb(var(--text-secondary))]">
            Replace this page with your team story, credentials, and proof points. Content can also be
            driven from Sanity (about page / expert profile documents).
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={BUSINESS_LINKS.koolitus}
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Training
            </Link>
            <Link
              href="/kontakt"
              className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-secondary))]"
            >
              Contact
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  )
}
