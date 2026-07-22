import { KKK_SECTION_GROQ } from '@/lib/sanity/kkkGroq'
import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'

export const KOOLITUS_PAGE_QUERY = `
  *[_type == "koolitusPage" && _id == "koolitusPage"][0] {
    title,
    ${MARKETING_SECTIONS_QUERY}
    featuredReviews[]->{
      _id,
      author,
      label,
      text
    },
    hero {
      headline,
      scriptHeadline,
      subtitle,
      eyebrow,
      description,
      backgroundColor,
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      },
      heroImage,
      badges[] {
        text,
        color,
        size
      },
      quickFactsCard {
        eyebrow,
        title,
        durationPill,
        rows[] {
          _key,
          label,
          value,
          hint,
          icon
        },
        subsidyText,
        priceText,
        stats[] {
          _key,
          animatedValue,
          decimals,
          suffix,
          label
        }
      }
    },
    audienceSection {
      eyebrow,
      title,
      socialProofIntro,
      cards[] {
        quote,
        behavior,
        percentage,
        revealText,
        revealLink
      },
      confirmButtonText,
      transformBar {
        beforeLabel,
        beforeText,
        afterLabel,
        afterText
      },
      goalSection {
        label,
        placeholder,
        confirmText
      },
      directorPath {
        title,
        description,
        linkText,
        linkUrl
      }
    },
    nineDaysProgram {
      eyebrow,
      title,
      titleHighlight,
      subtitle,
      habitsQuestionTitle,
      habitsQuestionSubtitle,
      dayPickerTitle,
      viewedCountLabel,
      continueButtonText,
      dayGoalLabel,
      dayFocusLabel,
      dayExtraInfoTitle,
      nextDayLabel,
      finalDayMessage,
      dayLinkPrefix,
      dayLinkText,
      dayLinkHref,
      popupTitle,
      popupSubtitle,
      sidebarCtas {
        registerText,
        registerUrl,
        readMoreText,
        readMoreUrl
      },
      habits[] {
        id,
        name,
        popularity,
        day,
        title,
        description,
        icon,
        benefit
      },
      oppepaevad[]->{
        dayNumber,
        tag,
        title,
        habitsFocus,
        companyPain,
        shortSolution,
        fullProgram,
        infoCards[] {
          title,
          body
        }
      },
      days[] {
        dayNumber,
        habit,
        tag,
        title,
        description,
        infoCards[] {
          title,
          body
        }
      },
      testimonials[] {
        quote,
        author,
        company,
        position
      },
      completionSection {
        title,
        description,
        selectedHabits,
        nextCourseInfo,
        buttonText
      },
      faqSection {
        question,
        testimonials[] {
          quote,
          author,
          company,
          position
        }
      }
    },
    testimonialsSection {
      eyebrow,
      title,
      subtitle,
      buttonText,
      buttonLink,
      testimonials[] {
        "name": coalesce(name, author),
        role,
        company,
        "content": coalesce(content, quote),
        avatar,
        rating
      }
    },
    kkkDocument->{
      ${KKK_SECTION_GROQ}
    },
    kkk {
      ${KKK_SECTION_GROQ}
    },
    featuresSection {
      eyebrow,
      title,
      subtitle,
      mainFeature {
        title,
        description,
        difference,
        factoryBadges[] {
          name,
          isActive
        },
        expandContent,
        ctaText,
        ctaLink
      },
      features[] {
        id,
        title,
        description,
        insight,
        isHighlighted,
        relevantHabit
      },
      miniCards[] {
        title,
        description,
        proof
      },
      shortcutCTA {
        text,
        primaryLink,
        primaryText,
        secondaryLink,
        secondaryText
      }
    },
    buildingsSection {
      eyebrow,
      title,
      subtitle,
      backgroundGradient,
      showStats,
      buildings[] {
        id,
        title,
        description,
        features,
        icon,
        color,
        size,
        isHighlighted,
        stats {
          label,
          value
        },
        buttonText,
        buttonLink
      }
    },
    leanHouseSection {
      title,
      subtitle,
      description,
      backgroundColor,
      roof {
        title,
        subtitle
      },
      leftPillar {
        title,
        shortTitle,
        items
      },
      center {
        title,
        systems[] {
          name,
          description
        }
      },
      rightPillar {
        title,
        shortTitle,
        items
      },
      foundation {
        title,
        items {
          title,
          description
        }
      },
      sideAnnotations {
        left {
          title,
          subtitle
        },
        right {
          title,
          subtitle
        }
      },
      benefits {
        icon,
        title,
        description
      }
    },
    investmentSection {
      eyebrow,
      title,
      titleHighlight,
      contemplationQuestion,
      contemplationLabel,
      benefitsTitle,
      benefits[] {
        title,
        subtitle,
        isHidden
      },
      price,
      priceDaily,
      priceReframe,
      roiCalculator {
        label,
        sizes[] {
          label,
          sublabel,
          result
        },
        defaultResult,
        sendRoiText
      },
      guarantee {
        text
      },
      primaryButtonText,
      secondaryButtonText,
      peerProof {
        avatarInitials,
        text,
        highlight
      },
      contactInfo {
        text,
        phone,
        email
      },
      backgroundColor
    },
    leadFormTeaser {
      enabled,
      eyebrow,
      title,
      description,
      buttonText,
      formUrl,
      image
    },
    cohortsSection {
      eyebrow,
      title,
      filterLabel,
      filters[] {
        label,
        value,
        active
      },
      alertBanner {
        message
      },
      subsidyFooter {
        text,
        linkText,
        linkHref
      },
      chooserSection {
        title,
        cards[] {
          eyebrow,
          title,
          description
        }
      },
      cohorts[] {
        id,
        name,
        trainingTitle,
        location,
        dates,
        daysUntil,
        timing,
        badges[] {
          text,
          type
        },
        spotsAvailable,
        spotsTotal,
        spotsFilled,
        socialProof {
          initials,
          text
        },
        countdown,
        buttonText,
        buttonUrl,
        buttonStyle,
        calendarLabel,
        calendarLinks,
        trainingDates[] {
          date,
          startTime,
          endTime,
          location
        },
        preRegistrationInfo,
        preRegistrationBenefits,
        statusLabel,
        statusTone,
        price,
        priceNote,
        ctaVariant,
        isHighlighted,
        isCompleted
      },
      maxParticipantsNote,
      jtbdSection {
        title,
        subtitle,
        buttons[] {
          label,
          icon,
          response
        }
      },
      backgroundColor
    },
    trainingPrograms {
      title,
      subtitle,
      programs[] {
        id,
        title,
        subtitle,
        description,
        duration,
        level,
        price,
        topics,
        outcomes,
        color,
        icon
      }
    },
    workshops {
      title,
      subtitle,
      workshops[] {
        title,
        duration,
        description,
        price
      }
    },
    methodology {
      title,
      subtitle,
      methodologyItems[] {
        icon,
        title,
        description
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
    certificateSection {
      eyebrow,
      title,
      titleHighlight,
      subtitle,
      proofText,
      proofNumber,
      habitLabel,
      habitText,
      habitHighlight,
      meaningLabel,
      meaningPills[] {
        label,
        value,
        active,
        responseText,
        responseExample
      },
      meaningResponses {
        career {
          text,
          example
        },
        client {
          text,
          example
        },
        confidence {
          text,
          example
        }
      },
      useCasesTitle,
      useCases[] {
        icon,
        text,
        author,
        role,
        company,
        timeframe
      },
      requirementsTitle,
      requirements,
      certName,
      certTitle,
      certSubtitle,
      certificateImage { asset->{_id, url} },
      certMeta[] {
        label,
        value
      },
      countriesTitle,
      countriesSubtitle,
      countries[] {
        flag,
        name
      },
      alumniTitle,
      alumniText,
      alumniHighlight,
      alumniAvatars,
      ctaText,
      ctaLink,
      backgroundColor
    },
    pricesSection {
      eyebrow,
      title,
      subtitle,
      priceCards[] {
        type,
        price,
        priceVat,
        featuredBadge,
        eisSupport,
        features,
        buttonText,
        buttonLink,
        buttonStyle,
        isFeatured
      },
      backgroundColor
    },
    contactSection {
      title,
      description,
      backgroundColor,
      email,
      phone,
      address
    },
    finalCTA {
      title,
      subtitle,
      nextGroupInfo,
      spotsInfo,
      supportInfo,
      supportPrefix,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      footerText
    },
    seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      ogImage {
        asset-> {
          url
        }
      }
    }
  }
`
