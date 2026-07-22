import { KKK_SECTION_GROQ } from '@/lib/sanity/kkkGroq'

/** GROQ projections for aboutPage page-builder blocks. */

export const ABOUT_SECTIONS_GROQ = `

      _type == "aboutQuoteBlock" => {
        quoteSection {
          eyebrow,
          subtitle,
          cardLabel,
          secondBadgeText,
          quotes[] { quote, author },
          quote,
          author,
          backgroundColor
        }
      },
      _type == "aboutCohortsBlock" => {
        "cohortsDummy": true
      },
      _type == "aboutNarrativeBlock" => {
        aboutSection {
          title,
          scriptTitle,
          eyebrow,
          content,
          rightSideContent {
            introText,
            title,
            descriptionText,
            badgesLabel,
            image {
              asset-> {
                _id,
                url
              }
            },
            badges[] { text, color, size },
            experienceCards[] {
              title,
              subtitle,
              year,
              description,
              emoji,
              color
            }
          }
        }
      },
      _type == "aboutExperienceBlock" => {
        experienceSection {
          title,
          subtitle,
          eyebrow,
          layoutVariant,
          fundamentalsTitle,
          fundamentalsDescription,
          statsTitle,
          showStatistics,
          stats[] { value, label },
          backgroundColor,
          experienceItems[] { icon, title, description, year, color },
          factsEyebrow,
          factsDescription,
          factsItems[] { text, colorTheme }
        }
      },
      _type == "aboutGuaranteeBlock" => {
        guaranteeSection {
          eyebrow,
          headline,
          subtext,
          pillars[] { icon, title, text },
          primaryButton { text, link },
          secondaryButton { text, link }
        }
      },
      _type == "aboutCtaBlock" => {
        ctaSection {
          title,
          subtitle,
          backgroundColor,
          description,
          primaryButtonText,
          primaryButtonUrl,
          secondaryButtonText,
          secondaryButtonUrl,
          primaryButtonIcon,
          secondaryButtonIcon,
          trustFootnote
        }
      },
      _type == "aboutKeyAchievementsBlock" => {
        keyAchievements {
          title,
          description,
          achievements[] { title, description, icon },
          studentProjects[] {
            projectTitle,
            studentName,
            university,
            projectDescription,
            year,
            category,
            result
          },
          "fallbackProjects": *[_type == "thesis" && !(_id in path('drafts.**')) && showOnAndresPage == true] | order(year desc) [0...3] {
            "projectTitle": title,
            "studentName": author,
            "university": school,
            "projectDescription": abstract,
            year,
            category,
            "result": achievement
          }
        }
      },
      _type == "aboutWorldVisitsBlock" => {
        worldManufacturingVisits {
          title,
          subtitle,
          manufacturingCompanies[] {
            companyName,
            country,
            industry,
            visitYear,
            visitPurpose,
            keyInsights
          }
        }
      },
      _type == "aboutKkkBlock" => {
        kkkDocument->{
          ${KKK_SECTION_GROQ}
        },
        kkk {
          ${KKK_SECTION_GROQ}
        }
      },
      _type == "aboutContactBlock" => {
        contactSection {
          title,
          description,
          backgroundColor,
          email,
          phone,
          address
        }
      },
`
