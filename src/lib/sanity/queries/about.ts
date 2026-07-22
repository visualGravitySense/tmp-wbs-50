import { KKK_SECTION_GROQ } from '@/lib/sanity/kkkGroq'
import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'
import { singletonPageFilter } from '@/lib/sanity/singletonPageFilters'

export const ABOUT_PAGE_QUERY = `
  *[${singletonPageFilter('aboutPage')}][0] {
    title,
    ${MARKETING_SECTIONS_QUERY}
    featuredReviews[]->{
      _id,
      author,
      label,
      text
    },
    hero {
      eyebrow,
      headline,
      subtitle,
      description,
      linkedinUrl,
      image {
        asset-> {
          _id,
          url
        }
      },
      floatingBadges[] {
        label,
        text,
        icon,
        positionX,
        positionY
      },
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      },
      badges[] {
        text,
        color,
        size
      },
      technologyBadges[] {
        text,
        color,
        size
      },
      stat1Number,
      stat1Label,
      stat2Number,
      stat2Label,
      stat3Number,
      stat3Label
    },
    quoteSection {
      eyebrow,
      subtitle,
      cardLabel,
      secondBadgeText,
      quotes[] {
        quote,
        author
      },
      quote,
      author,
      backgroundColor
    },
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
      badges[] {
        text,
        color,
        size
      },
      experienceCards[] {
        title,
        subtitle,
        year,
        description,
        emoji,
        color
      }
    }
    },
    experienceSection {
      title,
      subtitle,
      eyebrow,
      layoutVariant,
      fundamentalsTitle,
      fundamentalsDescription,
      statsTitle,
      showStatistics,
      stats[] {
        value,
        label
      },
      backgroundColor,
      experienceItems[] {
        icon,
        title,
        description,
        year,
        color
      },
      factsEyebrow,
      factsDescription,
      factsItems[] {
        text,
        colorTheme
      }
    },
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
    },
    keyAchievements {
      title,
      description,
      achievements[] {
        title,
        description,
        icon
      },
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
    },
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
    },
    expertise[] {
      title,
      description,
      icon
    },
    testimonialsSection {
      title,
      subtitle,
      buttonText,
      buttonLink
    },
    testimonials[] {
      name,
      company,
      role,
      testimonial,
      rating
    },
    kkkDocument->{
      ${KKK_SECTION_GROQ}
    },
    kkk {
      ${KKK_SECTION_GROQ}
    },
    services {
      title,
      subtitle,
      services[] {
        title,
        description,
        features,
        price
      }
    },
    contactSection {
      title,
      description,
      backgroundColor,
      email,
      phone,
      address
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
