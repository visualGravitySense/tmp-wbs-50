/** GROQ projections for deprecated page-builder blocks (pre-migration CMS data). */

const ABOUT_HERO_NESTED_GROQ = `
  hero {
    eyebrow,
    headline,
    subtitle,
    description,
    linkedinUrl,
    image {
      asset-> { _id, url, "blurDataURL": metadata.lqip },
      alt
    },
    floatingBadges[] { label, text, icon, positionX, positionY },
    primaryButton { text, link },
    secondaryButton { text, link },
    badges[] { text, color, size },
    technologyBadges[] { text, color, size }
  }
`

const KOOLITUS_HERO_NESTED_GROQ = `
  hero {
    headline,
    scriptHeadline,
    subtitle,
    eyebrow,
    description,
    backgroundColor,
    primaryButton { text, link },
    secondaryButton { text, link },
    heroImage,
    badges[] { text, color, size },
    quickFactsCard {
      eyebrow,
      title,
      durationPill,
      rows[] { _key, label, value, hint, icon },
      subsidyText,
      priceText,
      stats[] { _key, animatedValue, decimals, suffix, label }
    }
  }
`

export const LEGACY_SECTIONS_GROQ = `
      _type == "aboutHeroBlock" => {
        ${ABOUT_HERO_NESTED_GROQ}
      },
      _type == "koolitusHeroBlock" => {
        ${KOOLITUS_HERO_NESTED_GROQ}
      },
      _type == "homeChallengesBlock" => {
        challenges {
          title,
          managerTitle,
          participantTitle,
          collectiveTitle,
          managerChallenges,
          participantChallenges,
          collectiveChallenges,
          conclusion
        }
      },
      _type == "painBlock" => {
        eyebrow,
        heading,
        subheading,
        items[]{ title, description },
        bottomText,
        ctaText,
        ctaLink
      },
      _type == "opstarKoImSammastBlock" => {
        kolmSammast {
          title,
          eyebrow,
          subtitle,
          steps[] {
            stepNumber,
            title,
            description
          }
        }
      },
      _type == "koolitusAudienceBlock" => {
        audienceSection {
          eyebrow,
          title,
          socialProofIntro,
          cards[]{ quote, behavior, percentage, revealText, revealLink },
          confirmButtonText,
          transformBar { beforeLabel, beforeText, afterLabel, afterText },
          goalSection { label, placeholder, confirmText },
          directorPath { title, description, linkText, linkUrl },
          ctaText,
          ctaLink
        }
      },
`