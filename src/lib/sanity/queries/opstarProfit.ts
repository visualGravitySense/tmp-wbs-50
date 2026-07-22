import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'

import { singletonPageFilter } from '@/lib/sanity/singletonPageFilters'

export const OPSTAR_PROFIT_QUERY = `
  *[${singletonPageFilter('opstarProfit')}][0] {
    title,
    ${MARKETING_SECTIONS_QUERY}
    featuredReviews[]->{
      _id,
      author,
      label,
      text
    },
    comparisonPartnerLogos[]->{
      _id,
      name,
      displayType,
      logo,
      url,
      order
    },
    "orbitBlock": coalesce(
      orbitBlockRef->{
        title,
        eyebrow,
        subtitle,
        leftColumn {
          title,
          acronymItems[] { code, label, description }
        },
        rightColumn {
          title,
          acronymItems[] { code, label, description }
        },
        illustration {
          centralText,
          illustrationItems[] {
            title,
            description,
            position {
              x,
              y
            }
          },
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
      },
      *[_id == "opstarProfitBlock"][0]{
        title,
        eyebrow,
        subtitle,
        leftColumn {
          title,
          acronymItems[] { code, label, description }
        },
        rightColumn {
          title,
          acronymItems[] { code, label, description }
        },
        illustration {
          centralText,
          illustrationItems[] {
            title,
            description,
            position {
              x,
              y
            }
          },
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
      },
      *[_type == "opstarProfitBlock"][0]{
        title,
        eyebrow,
        subtitle,
        leftColumn {
          title,
          acronymItems[] { code, label, description }
        },
        rightColumn {
          title,
          acronymItems[] { code, label, description }
        },
        illustration {
          centralText,
          illustrationItems[] {
            title,
            description,
            position {
              x,
              y
            }
          },
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
      }
    ),
    hero {
      tag {
        text,
        showDot
      },
      mainTitle,
      showTrademark,
      subtitle,
      description,
      primaryButton {
        text,
        url,
        showArrow
      },
      secondaryButton {
        text,
        url
      },
      heroImage {
        asset->{
          _id,
          url
        }
      },
      statistics[] {
        text,
        showStar
      }
    },
    contentSections[] {
      title,
      description,
      features[] {
        title,
        description
      }
    },
    comparison {
      title,
      eyebrow,
      subtitle,
      comparisonItems[] {
        isNot,
        is
      },
      backgroundColor,
      titleColor,
      isNotColor,
      isColor
    },
    kolmSammast {
      title,
      subtitle,
      steps[] {
        stepNumber,
        title,
        description,
        icon
      },
      backgroundColor,
      titleColor,
      stepColor
    },
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
    },
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
    },
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
      cta {
        text,
        subtitle,
        buttonText,
        buttonUrl
      },
      backgroundColor,
      titleColor,
      eyebrowColor,
      opstarColumnColor
    },
    meodetavadTulemused {
      title,
      eyebrow,
      subtitle,
      results[] {
        value,
        valueColor,
        label,
        description
      },
      source,
      backgroundColor,
      titleColor,
      eyebrowColor
    },
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
        beforeMetrics[] {
          label,
          value
        },
        afterMetrics[] {
          label,
          value
        },
        resultMain,
        resultTime
      },
      backgroundColor,
      titleColor,
      eyebrowColor
    },
    arvamused {
      title,
      eyebrow,
      subtitle,
      reviews[] {
        rating,
        quote,
        authorName,
        authorRole,
        authorCompany,
        avatarInitials,
        avatarGradient
      },
      totalReviews,
      averageRating,
      recommendationPercentage,
      backgroundColor,
      titleColor,
      eyebrowColor
    },
    kkk {
      title,
      eyebrow,
      showEyebrowDots,
      subtitle,
      questions[]->{
        question,
        answer[] {
          ...,
          markDefs[] {
            ...,
            _type == "link" => { _key, _type, href }
          }
        }
      },
      faqs[] {
        question,
        answer[] {
          ...,
          markDefs[] {
            ...,
            _type == "link" => { _key, _type, href }
          }
        }
      },
      backgroundColor,
      titleColor,
      eyebrowColor,
      questionBackgroundColor,
      questionTextColor,
      answerBackgroundColor,
      answerTextColor
    },
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
    },
    seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      ogImage {
        asset-> {
          _id,
          url
        }
      }
    }
  }
`
