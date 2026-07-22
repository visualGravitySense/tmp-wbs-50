/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAboutPageCached } from "@/lib/sanity/getAboutPageCached";
import { getAndresProfile, getSiteSettings } from "@/lib/sanity";
import { ABOUT_PAGE_QUERY } from "@/lib/sanity/queries/about";
import { MAIN_PAGE_PARTNERS_QUERY } from "@/lib/sanity/queries/mainPagePartners";
import { sanityFetch } from "@/sanity/lib/live";
import { AboutPage } from "@/types/about";
import { resolveKkkSection } from "@/lib/sanity/resolveKkkSection";
import { resolveQuoteSection } from "@/lib/sanity/resolveQuoteSection";
import AboutQuoteCarousel from "@/components/about/AboutQuoteCarousel";
import { Avatar, BrandVibrantButton, WhiteButton, SectionBadge, marketingMicroPillClass, Container } from "@/components/ui";
import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import MarketingPageAmbient from "@/components/MarketingPageAmbient";
import { urlFor } from "@/lib/sanity/client";
import { buildPageMetadata } from "@/lib/seo/metadata";
import CTASection from '@/components/CTASection'
import ContactSection from '@/components/ContactSection'
import AboutExperienceSection from '@/components/about/AboutExperienceSection'
import AboutNarrativeSection from '@/components/about/AboutNarrativeSection'
import AboutKeyAchievementsSection from '@/components/about/AboutKeyAchievementsSection'
import AboutWorldManufacturingVisitsSection from '@/components/about/AboutWorldManufacturingVisitsSection'
import Kkk from '@/components/Kkk'
import { MarketingPageBuilderLayer } from '@/components/page-builder/MarketingPageBuilderLayer'
import { getAboutBuilderSkipFlags } from '@/lib/sanity/aboutBuilderSkipFlags'
import { getPageBuilderState } from '@/lib/sanity/pageBuilderState'
import AndresBlock from '@/components/AndresBlock'
import CohortsSection from '@/components/CohortsSection'

export const revalidate = 60

/** KKK when Sanity has no FAQs yet (About Page + optional `kkk` document). */
const ABOUT_KKK_FALLBACK = {
  title: 'Korduma kippuvad kÃ¼simused',
  eyebrow: 'KKK',
  subtitle: 'LÃ¼hivastused Andrese kogemuse, koostÃ¶Ã¶ ja koolituste kohta.',
  showEyebrowDots: true,
  faqs: [
    {
      question: 'Mis on Andrese peamine fookus konsultatsioonis ja koolituses?',
      answer:
        'Praktiline tootmis- ja juhtimiskogemus: LEAN, protsessid ja mÃµÃµdetav tulemus â€” mitte ainult teooria. Programmid kohandatakse sinu ettevÃµtte kontekstile.',
    },
    {
      question: 'Kuidas alustada koostÃ¶Ã¶d vÃµi kÃ¼sida pakkumist?',
      answer:
        'Kirjuta vÃµi helista â€” leiad kontaktid lehe lÃµpus. LÃ¼hikese vestluse jÃ¤rel saame kokku leppida jÃ¤rgmised sammud (vajadusel ka tehase kÃ¼lastus vÃµi koolituse eelarutelu).',
    },
    {
      question: 'Kas pakute koolitusi ka ettevÃµttes kohapeal?',
      answer:
        'Jah, paljud programmid saab viia lÃ¤bi sinu ettevÃµttes, kui grupp ja ruumid seda vÃµimaldavad. TÃ¤pse Ã¼levaate saad koolituslehelt vÃµi otse Ã¼hendust vÃµttes.',
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
    stega: false,
  })

  const fallbackTitle = 'Andres Kase — tootmisjuhtimise ekspert'
  const fallbackDescription =
    '20+ aasta kogemus tootmisjuhtimises, LEAN-is ja tehase automatiseerimises. Koolitused ja konsultatsioonid Eesti tootmisettevõtetele.'

  if (!page) {
    return buildPageMetadata({
      title: fallbackTitle,
      description: fallbackDescription,
      path: '/andres-kase',
    })
  }

  let ogImage: string | undefined
  if (page.seo?.ogImage) {
    try {
      ogImage = urlFor(page.seo.ogImage).url()
    } catch {
      // ignore invalid Sanity image reference
    }
  }

  return buildPageMetadata({
    title: page.seo?.metaTitle || page.title || fallbackTitle,
    description: page.seo?.metaDescription || page.hero?.description || fallbackDescription,
    keywords: page.seo?.metaKeywords,
    path: '/andres-kase',
    ogImage,
  })
}

export default async function AndresKasePage() {
  const [page, partnersResult, andresProfileData, siteSettingsData] = await Promise.all([
    getAboutPageCached(),
    sanityFetch({ query: MAIN_PAGE_PARTNERS_QUERY }),
    getAndresProfile(),
    getSiteSettings(),
  ])

  const partners = (partnersResult.data as { partners?: unknown[] } | null)?.partners ?? []

  const featured = page?.featuredReviews

  const kkkSectionData = resolveKkkSection(
    page?.kkkDocument,
    page?.kkk,
    ABOUT_KKK_FALLBACK,
  )
  const pb = getPageBuilderState(page as { sections?: unknown })
  const skip = pb.usePageBuilder
    ? getAboutBuilderSkipFlags(pb.builderBlockTypes)
    : null

  // Use fallback data if Sanity doesn't have data yet
  const aboutPageData: AboutPage = page || {
    title: 'About Andres Kase',
    hero: {
      headline: 'Andres Kase',
      subtitle: 'Professional Business Consultant & Trainer',
      description: 'With over 15 years of experience in business consulting and professional training, I help organizations and individuals achieve their full potential through strategic guidance and skill development.',
      primaryButton: {
        text: 'Get in Touch',
        link: '#contact'
      },
      secondaryButton: {
        text: 'View Expertise',
        link: '#expertise'
      },
      badges: [
        { text: '15+ Years Experience', color: 'blue' as const, size: 'md' as const },
        { text: '500+ Clients', color: 'green' as const, size: 'md' as const },
        { text: 'Expert Consultant', color: 'yellow' as const, size: 'md' as const }
      ],
      technologyBadges: [
        { text: 'Lean & Agile', color: 'purple' as const, size: 'sm' as const },
        { text: 'Scrum', color: 'blue' as const, size: 'sm' as const },
        { text: 'Kanban', color: 'green' as const, size: 'sm' as const }
      ]
    },
    quoteSection: {
      eyebrow: 'Tsitaat',
      cardLabel: 'Andres Kase',
      quotes: [
        {
          quote:
            'Tootmisjuht ei pea olema see, kes kustutab tulesid. Ta peab ehitama sÃ¼steemi kus tulekahju ei toimu.',
          author: 'Andres Kase',
        },
      ],
      backgroundColor: 'gray' as const,
    },
    aboutSection: {
      title: 'Praktiline kogemus',
      scriptTitle: 'õpihimu ja õpetamine',
      eyebrow: 'Koolitaja',
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Andres Kase is a seasoned business consultant and professional trainer with a passion for helping organizations and individuals achieve excellence. With a background in business management and extensive experience across various industries, Andres brings a unique perspective to every engagement.'
            }
          ],
          rightSideContent: {
            introText: 'Koolitaja Andres Kase on eelkÃµige strateegiliselt mÃµtlev ja tegutsev praktik-elluviija.',
            title: 'Praktiline kogemus, Ãµpihimu ja Ãµpetamine',
            descriptionText: 'Andresel on pikaajalised kogemused ja pÃµhjalikud teadmised tootmis- ja tÃ¶Ã¶stusjuhtimise alal ning LEAN-tootmisest ja ettevÃµtte arendamisest juba alates 2003. aastast.',
            badgesLabel: 'Tunnustused & Kompetentsid',
            badges: [
              { text: 'LEAN Expert', color: 'blue' as const, size: 'sm' as const },
              { text: 'Industry Knowledge', color: 'green' as const, size: 'sm' as const },
              { text: 'Strategic Thinker', color: 'purple' as const, size: 'sm' as const }
            ],
            experienceCards: [
              {
                title: 'LEAN Manufacturing',
                subtitle: 'Expert',
                year: '2003-Present',
                description: 'Deep expertise in LEAN manufacturing methodologies and continuous improvement processes across multiple industries.',
                emoji: '??',
                color: 'blue' as const
              },
              {
                title: 'Strategic Management',
                subtitle: 'Senior Level',
                year: '2010-Present',
                description: 'Strategic thinking and implementation of business optimization solutions for manufacturing and industrial companies.',
                emoji: '??',
                color: 'green' as const
              },
              {
                title: 'Training & Development',
                subtitle: 'Certified Trainer',
                year: '2015-Present',
                description: 'Professional training and coaching for teams and individuals in LEAN principles and operational excellence.',
                emoji: '??',
                color: 'purple' as const
              }
            ]
          }
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'His approach combines strategic thinking with practical implementation, ensuring that clients not only understand the concepts but can effectively apply them in their real-world scenarios.'
            }
          ]
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Whether working with large corporations or individual professionals, Andres is committed to delivering measurable results and sustainable growth.'
            }
          ]
        }
      ]
    },
    experienceSection: {
      title: 'Kogemus ja ekspertiis',
      subtitle: 'AastakÃ¼mnete pikkune kogemus mitmes valdkonnas',
      eyebrow: 'Areng lÃ¤bi aastate',
      layoutVariant: 'default',
      fundamentalsTitle: 'PÃµhialused',
      fundamentalsDescription:
        'AastakÃ¼mnete pikkune kogemus mitmes valdkonnas on andnud mulle sÃ¼gavaima teadmise ja praktiliste oskuste kogumi.',
      statsTitle: 'Oluline statistika',
      stats: [
        { value: '20+', label: 'Aastat' },
        { value: '100+', label: 'Klienti' },
        { value: '50+', label: 'Koolitust' },
        { value: '4', label: 'Valdkonda' },
      ],
      backgroundColor: 'light-blue' as const,
      experienceItems: [
        {
          icon: '??',
          title: 'LEAN Manufacturing',
          description: 'SÃ¼steemne lÃ¤henemine tootmisprotsesside optimeerimisele ja jÃ¤tkusuutlikkuse parandamisele LEAN meetodite abil.',
          year: '2003-Present',
          color: 'blue' as const
        },
        {
          icon: '??',
          title: 'Strateegiline Juhtimine',
          description: 'EttevÃµtte strateegia arendamine ja juhtimine, keskendudes kasvule ja efektiivsusele.',
          year: '2010-Present',
          color: 'green' as const
        },
        {
          icon: '??',
          title: 'Koolitus ja Areng',
          description: 'Professionaalsed koolitused ja arenguprogrammid tiimidele ja juhtidele.',
          year: '2015-Present',
          color: 'purple' as const
        },
        {
          icon: '??',
          title: 'Konsultatsioonid',
          description: 'NÃµustamisteenused tootmis- ja teenindusettevÃµtetele protsesside parandamiseks.',
          year: '2008-Present',
          color: 'orange' as const
        }
      ]
    },
    ctaSection: {
      title: 'Valmis koostööks?',
      subtitle: 'Hakime koos tegema suuri muutusi teie ettevõttes',
      backgroundColor: 'blue-purple' as const,
      description:
        'Kas olete valmis viima oma ettevõtte järgmisele uuele tasemele? Andres Kase pakub professionaalset nõustamist ja koolitusi, mis aitab teil saavutada märgitud eesmärgid.',
      primaryButtonText: 'Võta ühendust',
      primaryButtonUrl: '/contact',
      secondaryButtonText: 'Vaata teenuseid',
      secondaryButtonUrl: '/services',
      trustFootnote: 'Kohtade arv on piiratud',
    },
    keyAchievements: {
      title: 'Key Achievements',
      description: 'Over the years, I have had the privilege of mentoring talented students who have completed remarkable projects under my supervision. These achievements represent the practical application of lean methodologies and process improvement principles in real-world scenarios.',
      achievements: [
        {
          icon: 'trophy',
          title: '500+ Students Mentored',
          description: 'Successfully guided hundreds of students through complex business challenges and process improvement initiatives.'
        },
        {
          icon: 'graduation-cap',
          title: 'Academic Excellence',
          description: 'Multiple student projects have received recognition for innovation and practical impact in their respective industries.'
        },
        {
          icon: 'industry',
          title: 'Industry Partnerships',
          description: 'Established strong connections between academic institutions and industry leaders for practical learning experiences.'
        }
      ],
      studentProjects: [
        {
          projectTitle: 'Lean Implementation in Manufacturing',
          studentName: 'Maria Kask',
          university: 'Tallinn University of Technology',
          projectDescription: 'Comprehensive lean manufacturing implementation that reduced production waste by 35% and improved overall efficiency.',
          year: '2023',
          category: 'lean' as const,
          result: 'Achieved 35% waste reduction and 20% efficiency improvement within 6 months.'
        },
        {
          projectTitle: 'Supply Chain Optimization',
          studentName: 'Jaan Tamm',
          university: 'University of Tartu',
          projectDescription: 'Redesigned supply chain processes resulting in significant cost savings and improved delivery times.',
          year: '2023',
          category: 'supplychain' as const,
          result: 'Reduced logistics costs by 25% and improved delivery reliability by 40%.'
        },
        {
          projectTitle: 'Quality Management System',
          studentName: 'Kristiina Oja',
          university: 'Tallinn University of Technology',
          projectDescription: 'Development and implementation of ISO 9001 compliant quality management system for mid-sized enterprise.',
          year: '2022',
          category: 'quality' as const,
          result: 'Successful ISO certification and 30% reduction in quality-related issues.'
        }
      ]
    },
    worldManufacturingVisits: {
      title: 'World Manufacturing Visits',
      subtitle: 'Extensive experience visiting manufacturing facilities worldwide to implement lean principles and process improvements',
      manufacturingCompanies: [
        {
          companyName: 'Toyota Motor Corporation',
          country: 'Japan',
          industry: 'automotive' as const,
          visitYear: '2022',
          visitPurpose: 'Lean manufacturing implementation and process optimization consulting',
          keyInsights: 'Observed world-class JIT systems and continuous improvement culture. Key learnings in waste reduction and standardized work implementation.'
        },
        {
          companyName: 'Bosch Production Facility',
          country: 'Germany',
          industry: 'electronics' as const,
          visitYear: '2021',
          visitPurpose: 'Quality management system audit and Industry 4.0 integration assessment',
          keyInsights: 'Advanced automation and smart factory implementations. Integration of IoT technologies with traditional manufacturing processes.'
        },
        {
          companyName: 'NestlÃ© Production Plant',
          country: 'Switzerland',
          industry: 'food' as const,
          visitYear: '2020',
          visitPurpose: 'Food safety protocols and production line efficiency optimization',
          keyInsights: 'Stringent quality control systems and HACCP implementation. Efficient batch processing and traceability systems.'
        },
        {
          companyName: 'Volvo Production Facility',
          country: 'Sweden',
          industry: 'automotive' as const,
          visitYear: '2019',
          visitPurpose: 'Safety systems integration and production flow analysis',
          keyInsights: 'Integrated safety systems with production efficiency. Worker safety protocols without compromising productivity.'
        },
        {
          companyName: 'Samsung Electronics',
          country: 'South Korea',
          industry: 'electronics' as const,
          visitYear: '2018',
          visitPurpose: 'Semiconductor manufacturing process optimization',
          keyInsights: 'Clean room protocols and precision manufacturing. Advanced quality control in microelectronics production.'
        }
      ]
    },
    testimonialsSection: {
      title: 'Kuidas me aitasime teisi',
      subtitle: 'Kliendid rÃ¤Ã¤givad',
      buttonText: 'Vaata kÃµik tagasisideid',
      buttonLink: '/testimonials',
    },
    testimonials: [],
    services: {
      title: 'Services',
      subtitle: 'Professional training and consulting services',
      services: []
    },
    contactSection: {
      title: "Let's Work Together",
      description: 'Ready to take your business to the next level? Get in touch with me today to discuss how we can work together to achieve your goals.',
      backgroundColor: 'blue-lightblue' as const,
      email: 'andres@kase.ee',
      phone: '+372 555 1234',
      address: 'Tallinn, Estonia'
    },
    seo: {
      metaTitle: 'About Andres Kase',
      metaDescription: 'Professional business consultant and trainer'
    }
  }

  const quoteSectionData = resolveQuoteSection(page?.quoteSection)

  return (
    <div
      className="marketing-page-shell"
      data-page-builder={pb.usePageBuilder ? 'on' : 'off'}
    >
      <MarketingPageAmbient />
      <MarketingPageBuilderLayer
        doc={page as { sections?: unknown }}
        aboutContext={{
          aboutPageData,
          sanityPage: page,
          kkkFallback: ABOUT_KKK_FALLBACK,
          cohorts: siteSettingsData?.cohorts,
        }}
        legacyFeaturedReviews={featured}
        hideHeroGlobalStatsStrip
      />
      {(!skip || !skip.skipHero) ? (
      <HeroSection
        variant="split"
        eyebrow={aboutPageData.hero.eyebrow || 'KOOLITAJA ANDRES'}
        headline={aboutPageData.hero.headline || 'Andres Kase'}
        scriptLine={aboutPageData.hero.subtitle || 'Tootmisjuhtimine, LEAN-AGILE ekspert'}
        description={aboutPageData.hero.description || '25 aastat tootmispõrandal — õpetan seda, mida olen ise teinud.'}
        primaryCTA={{
          text: aboutPageData.hero.primaryButton?.text?.replace(/\s*(?:->|=>|→|>|›)\s*$/, '') || 'Võta ühendust',
          link: aboutPageData.hero.primaryButton?.link || '#'
        }}
        secondaryCTA={{
          text: aboutPageData.hero.secondaryButton?.text?.replace(/\s*(?:->|=>|→|>|›)\s*$/, '') || 'Vaata teenuseid',
          link: aboutPageData.hero.secondaryButton?.link || '#'
        }}
      >
        <div className="w-full flex justify-center items-center px-6 sm:px-0">
          <div className="relative w-full max-w-sm mx-auto transition-all duration-500 hover:scale-[1.015] overflow-visible">
            
            {/* Dynamic Floating Ambient Badges */}
            {(aboutPageData.hero.floatingBadges && aboutPageData.hero.floatingBadges.length > 0 ? aboutPageData.hero.floatingBadges : [
              { label: 'VISIIDID', text: '100+ tehast külastatud', icon: 'factory', positionX: 5, positionY: 20 },
              { label: 'HINNANG', text: '4.9 / 5 koolituse hinnang', icon: 'star', positionX: 5, positionY: 75 }
            ]).map((badge: any, idx: number) => {
              const x = badge.positionX ?? (idx === 0 ? 5 : 5);
              const y = badge.positionY ?? (idx === 0 ? 20 : 75);
              const isStar = badge.icon === 'star';

              return (
                <div
                  key={idx}
                  className={`absolute z-10 flex min-w-[170px] max-w-[190px] -translate-x-1/2 -translate-y-1/2 transform select-none items-center gap-2.5 p-3 shadow-md transition-all duration-300 ${marketingMicroPillClass}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {isStar ? (
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-500 shrink-0">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-black uppercase text-slate-700 dark:text-slate-300 leading-tight">
                      {badge.label || (isStar ? 'Hinnang' : 'Visiidid')}
                    </span>
                    <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 leading-tight">
                      {badge.text}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Portrait Container */}
            <div className="relative aspect-[4/5] w-full rounded-t-[24px] overflow-hidden shadow-lg border-t border-x border-slate-100 dark:border-white/5 max-h-[35vh] lg:max-h-[50vh] min-h-[200px]">
              {aboutPageData.hero.image ? (
                <Image
                  src={urlFor(aboutPageData.hero.image).width(800).height(800).fit('crop').url()}
                  alt={aboutPageData.hero.headline || 'Andres Kase'}
                  fill
                  sizes="(max-w-768px) 384px, 450px"
                  className="w-full h-full object-cover object-top filter-none"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
              )}
            </div>

            {/* Lower Competency & Info Panel */}
            <div className="bg-white border-x border-b border-slate-100 rounded-b-[24px] p-5 dark:bg-slate-900 dark:border-white/5 shadow-md flex items-end justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="space-y-0.5 text-left">
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                    Andres Kase
                  </h3>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mt-1">
                    LEAN · TPS koolitaja · OPSTAR PROFIT™
                  </p>
                </div>

                {/* Competency Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["LEAN", "TPS", "Kaizen", "VSM"].map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-blue-600 dark:text-sky-300 ${marketingMicroPillClass}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Premium LinkedIn Social Icon Link */}
              <Link
                href={aboutPageData.hero.linkedinUrl || "https://ee.linkedin.com/in/andres-kase-7833075"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex items-center justify-center shrink-0 border-2 border-[#0055E5] bg-gradient-to-br from-[#EEF4FF] to-white text-[#0055E5] p-3 rounded-xl transition-all hover:scale-105 shadow-sm dark:border-sky-500/40 dark:from-sky-950/20 dark:to-slate-900/40 dark:text-sky-400 overflow-hidden"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(0, 85, 229, 0.04) 0px, rgba(0, 85, 229, 0.04) 2px, transparent 2px, transparent 8px)'
                }}
                title="Andres Kase LinkedIn profiil"
              >
                <div className="absolute inset-0 bg-[#0055E5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3c0-2.07-1.12-3.13-2.67-3.13-1.25 0-1.81.69-2.12 1.18v-1H11v8.38h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </HeroSection>
      ) : null}

      {/* Logo marquee — osalenud ettevõtted */}
      {(!skip || !skip.skipLogoMarquee) ? (
        <LogoMarquee logos={partners && partners.length > 0 ? partners : undefined} title="Osalenud ettevõtted" />
      ) : null}

      {(!skip || !skip.skipQuote) && quoteSectionData ? (
        <AboutQuoteCarousel data={quoteSectionData} />
      ) : null}

      {(!skip || !skip.skipNarrative) ? (
        <AndresBlock variant="full" data={andresProfileData} />
      ) : null}

      {(!skip || !skip.skipKkk) ? <Kkk kkkData={kkkSectionData} /> : null}

      {/* Services Section */}
      {/*  {aboutPageData.services && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {aboutPageData.services.title}
              </h2>
              {aboutPageData.services.subtitle && (
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {aboutPageData.services.subtitle}
                </p>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {aboutPageData.services.services && aboutPageData.services.services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </section>
      )}
        */}

      {/* Contact Section */}
      {(!skip || !skip.skipContact) && aboutPageData.contactSection && (
        <ContactSection
          title={aboutPageData.contactSection.title}
          description={aboutPageData.contactSection.description}
          backgroundColor={aboutPageData.contactSection.backgroundColor}
          email={aboutPageData.contactSection.email}
          phone={aboutPageData.contactSection.phone}
          address={aboutPageData.contactSection.address}
        />
      )}
    </div>
  )
}
