import { KKK_SECTION_GROQ } from '@/lib/sanity/kkkGroq'

/** GROQ projections for opstarProfit page-builder blocks. */

const ORBIT_BLOCK_GROQ = `
        title,
        eyebrow,
        subtitle,
        leftColumn { title, acronymItems[] { code, label, description } },
        rightColumn { title, acronymItems[] { code, label, description } },
        illustration {
          centralText,
          illustrationItems[] { title, description, position { x, y } },
          backgroundColor,
          centralCircleColor
        },
        heroMetrics[] { value, label },
        heroDiagramMeta {
          eyebrowLabel,
          cardTitle,
          badgeText,
          tagPills
        },
        backgroundColor,
        textColor
`

export const OPSTAR_SECTIONS_GROQ = `

      _type == "opstarAcronymGridBlock" => {
        enabled
      },
      _type == "opstarOrbitBlock" => {
        "orbitBlock": coalesce(
          orbitBlockRef->{${ORBIT_BLOCK_GROQ}},
          *[_id == "opstarProfitBlock"][0]{${ORBIT_BLOCK_GROQ}},
          *[_type == "opstarProfitBlock"][0]{${ORBIT_BLOCK_GROQ}}
        )
      },
      _type == "opstarComparisonBlock" => {
        comparison {
          title,
          eyebrow,
          subtitle,
          comparisonItems[] { isNot, is },
          backgroundColor,
          titleColor,
          isNotColor,
          isColor
        }
      },
      _type == "opstarKolmSammastBlock" => {
        kolmSammast {
          title,
          eyebrow,
          subtitle,
          steps[] { stepNumber, title, description, icon },
          backgroundColor,
          titleColor,
          stepColor
        }
      },
      _type == "opstarFrameworkBlock" => {
        framework {
          eyebrow,
          title,
          subtitle,
          parts[] {
            code,
            fullTitle,
            explanation,
            painQuote,
            ctaText,
            ctaHref
          }
        }
      },
      _type == "opstarEightComponentsBlock" => {
        eightComponents {
          title,
          eyebrow,
          subtitle,
          components[] {
            number,
            title,
            tags,
            whatIs,
            howItWorks,
            result,
            resultMetric
          },
          backgroundColor,
          titleColor,
          eyebrowColor
        }
      },
      _type == "opstarLeanVsOpstarBlock" => {
        leanVsOpstar {
          title,
          eyebrow,
          subtitle,
          comparisonItems[] {
            criterion,
            leanValue,
            opstarValue,
            opstarHasAdvantage
          },
          cta { text, subtitle, buttonText, buttonUrl },
          backgroundColor,
          titleColor,
          eyebrowColor,
          opstarColumnColor
        }
      },
      _type == "opstarMeasuredResultsBlock" => {
        meodetavadTulemused {
          title,
          eyebrow,
          subtitle,
          results[] { value, valueColor, label, description },
          source,
          backgroundColor,
          titleColor,
          eyebrowColor
        }
      },
      _type == "opstarCasesBlock" => {
        cases {
          title,
          eyebrow,
          subtitle,
          caseStudies[] {
            company,
            industry,
            employees,
            location,
            year,
            beforeMetrics[] { label, value },
            afterMetrics[] { label, value },
            resultMain,
            resultTime
          },
          backgroundColor,
          titleColor,
          eyebrowColor
        }
      },
      _type == "opstarKkkBlock" => {
        kkk {
          ${KKK_SECTION_GROQ},
          backgroundColor,
          titleColor,
          eyebrowColor,
          questionBackgroundColor,
          questionTextColor,
          answerBackgroundColor,
          answerTextColor
        }
      },
      _type == "opstarCtaBlock" => {
        cta {
          title,
          subtitle,
          description,
          backgroundColor,
          primaryButtonText,
          primaryButtonUrl,
          primaryButtonIcon,
          secondaryButtonText,
          secondaryButtonUrl,
          secondaryButtonIcon,
          trustFootnote
        }
      },
      _type == "opstarContentSectionsBlock" => {
        contentSections[] {
          title,
          description,
          features[] { title, description }
        }
      },
`
