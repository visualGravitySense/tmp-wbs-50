import { KKK_SECTION_GROQ } from '@/lib/sanity/kkkGroq'
import { KOOLITUS_SECTIONS_GROQ } from '@/lib/sanity/koolitusSectionsGroq'
import { OPSTAR_SECTIONS_GROQ } from '@/lib/sanity/opstarSectionsGroq'
import { ABOUT_SECTIONS_GROQ } from '@/lib/sanity/aboutSectionsGroq'
import { kontaktSectionsGroq } from '@/lib/sanity/queries/kontaktSectionsGroq'
import { LEGACY_SECTIONS_GROQ } from '@/lib/sanity/legacySectionsGroq'
import {
  ABOUT_ANDRES_SECTION_GROQ,
  BEFORE_AFTER_SECTION_GROQ,
  FINAL_CTA_GROQ,
  GRANT_SECTION_GROQ,
  HELP_FORM_TEASER_GROQ,
  NINE_DAYS_MINI_GROQ,
  PHOTO_MARQUEE_SECTION_GROQ,
  PRICING_SECTION_GROQ,
  QUIZ_SECTION_GROQ,
  SEO_CONVERSION_SECTION_GROQ,
  PROGRAM_DAYS_TABS_GROQ,
} from '@/lib/sanity/mainPageSectionGroq'

/** GROQ fragment for `mainPage.sections` page-builder blocks (Phase 1–2). */
export const MAIN_PAGE_SECTIONS_QUERY = `
    sections[]{
      _type,
      _key,
      hideFromScrollNav,
      navLabel,
      isVisible,
      _type == "homeHeroBlock" => {
        eyebrow,
        headline,
        scriptHeadline,
        description,
        heroImage,
        primaryCta{
          text,
          link{
            linkType,
            url,
            reference->{ _type, slug }
          }
        },
        secondaryCta{
          text,
          link{
            linkType,
            url,
            reference->{ _type, slug }
          }
        },
        socialProof,

      },
      _type == "marketingSplitHeroBlock" => {
        eyebrow,
        headline,
        scriptHeadline,
        description,
        rightComponentType,
        heroImage,
        linkedinUrl,
        floatingBadges[]{
          ...,
          "iconUrl": icon.asset->url,
          label,
          text,
          icon,
          positionX,
          positionY
        },
        badges,
        quickFactsCard,
        "globalStats": *[_type == "siteSettings"][0].globalStats,
        opstarProfitBlockRef->,
        primaryCta{
          text,
          link{
            linkType,
            url,
            reference->{ _type, slug }
          }
        },
        secondaryCta{
          text,
          link{
            linkType,
            url,
            reference->{ _type, slug }
          }
        },
        stats[]{
          value,
          label
        }
      },
      _type == "homePartnersBlock" => {
        partnersTitle,
        "partners": select(
          defined(partners) && count(partners) > 0 => partners[]->{
            _id,
            name,
            displayType,
            logo,
            url,
            order
          },
          *[_type == "partnerLogo"] | order(order asc)[0...25]{
            _id,
            name,
            displayType,
            logo,
            url,
            order
          }
        )
      },
      _type == "statsBlock" => {
        heading,
        showDivider,
        stats[]{
          number,
          suffix,
          label
        }
      },
      _type == "homeHeroFeaturesBlock" => {
        eyebrow,
        title,
        scriptSubtitle,
        description,
        features[]{
          title,
          description,
          icon,
          svgIcon
        }
      },
      _type == "homeTestimonialsBlock" => {
        featuredReviews[]->{
          _id,
          author,
          label,
          text
        },
        testimonialReferences[]->{
          _id,
          name,
          role,
          company,
          text,
          rating,
          avatar{
            asset->,
            alt
          },
          tags
        },
        testimonials{
          title,
          subtitle,
          testimonials[]{
            name,
            role,
            company,
            content,
            rating,
            avatar{
              asset->,
              alt
            }
          },
          buttonText,
          buttonLink
        }
      },
      _type == "homeQuizBandBlock" => {
        quiz{${QUIZ_SECTION_GROQ}},
        helpFormTeaser{${HELP_FORM_TEASER_GROQ}}
      },
      _type == "homeSeoConversionBlock" => {
        seoConversionSection{${SEO_CONVERSION_SECTION_GROQ}}
      },

      _type == "homeNineDaysMiniBlock" => {
        nineDaysMini{${NINE_DAYS_MINI_GROQ}}
      },
      _type == "homeGrantBlock" => {
        grantSection{${GRANT_SECTION_GROQ}}
      },
      _type == "homeAboutBlock" => {
        aboutAndres{${ABOUT_ANDRES_SECTION_GROQ}}
      },
      _type == "homePhotoMarqueeBlock" => {
        photoMarquee{${PHOTO_MARQUEE_SECTION_GROQ}}
      },
      _type == "homeBeforeAfterBlock" => {
        beforeAfter{${BEFORE_AFTER_SECTION_GROQ}}
      },
      _type == "homePricingBlock" => {
        pricingSection{${PRICING_SECTION_GROQ}}
      },
      _type == "homeFinalCtaBlock" => {
        finalCTA{${FINAL_CTA_GROQ}}
      },
      _type == "newsletterBlock" => {
        title,
        subtitle,
        placeholder,
        buttonText,
        successMessage,
        note,
        "smallNote": note,
        tag,
        source,
        variant
      },
      _type == "programDaysTabs" => {
        ${PROGRAM_DAYS_TABS_GROQ}
      },
      _type == "helpFormTeaserBlock" => {
        ${HELP_FORM_TEASER_GROQ}
      },

      _type == "painPointsBlock" => {
        variant,
        title,
        scriptTitle,
        "challenges": {
          eyebrow,
          title,
          scriptTitle,
          subheading,
          managerTitle,
          participantTitle,
          collectiveTitle,
          managerChallenges,
          participantChallenges,
          collectiveChallenges,
          conclusion
        },
        eyebrow,
        "heading": title,
        subheading,
        items[]{ title, description },
        bottomText,
        ctaText,
        ctaLink,
        contactModalTitle,
        contactModalDescription,
        contactModalSuccessTitle,
        contactModalSuccessText,
        socialProofIntro,
        cards[]{ quote, behavior, percentage, revealText, revealLink },
        confirmButtonText,
        transformBar{ beforeLabel, beforeText, afterLabel, afterText },
        goalSection{ label, placeholder, confirmText },
        directorPath{ title, description, linkText, linkUrl }
      },
      _type == "andresBlock" => {
        variant,
        name,
        eyebrow,
        subtitle,
        quote,
        shortBio,
        bio,
        tags,
        stats,
        fieldExperience,
        timeline,
        methodologyTitle,
        methodologyText,
        methodology,
        ctaLabel,
        ctaLink,
        photo{
          asset->{
            _id,
            url,
            "blurDataURL": metadata.lqip
          },
          alt
        },
        secondaryPhotos[]{
          asset->{
            _id,
            url,
            "blurDataURL": metadata.lqip
          },
          alt
        }
      },
      _type == "casesBlock" => {
        eyebrow,
        heading,
        subheading,
        cases[]{
          companyName,
          year,
          sector,
          employeesCount,
          location,
          beforeOee,
          beforePraak,
          beforeUletunnid,
          afterOee,
          afterPraak,
          afterUletunnid,
          summaryResult,
          duration
        }
      },
      _type == "thesesGridBlock" => {
        variant,
        sectionTitle,
        sectionSubtitle,
        "theses": coalesce(
          select(
            defined(theses) && count(theses) > 0 => theses[]->{
              _id,
              title,
              author,
              school,
              year,
              type,
              category,
              industry,
              keywords,
              abstract,
              achievement,
              sourceUrl,
              mentorComment
            }
          ),
          *[_type == "thesis" && !(_id in path('drafts.**')) && showOnAndresPage == true] | order(year desc) {
            _id,
            title,
            author,
            school,
            year,
            type,
            category,
            industry,
            keywords,
            abstract,
            achievement,
            sourceUrl,
            mentorComment
          }
        )
      },
      _type == "homeKkkBlock" => {
        kkkSection {
          ${KKK_SECTION_GROQ}
        }
      },
      _type == "clientsHeaderBlock" => {
        clientsEyebrow,
        clientsMainHeadline,
        clientsScriptHeadline,
        clientsDescription
      },
      ${LEGACY_SECTIONS_GROQ}
      ${KOOLITUS_SECTIONS_GROQ}
      ${OPSTAR_SECTIONS_GROQ}
      ${ABOUT_SECTIONS_GROQ}
      ${kontaktSectionsGroq}
    },
`
