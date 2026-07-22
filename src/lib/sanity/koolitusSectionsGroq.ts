import { KKK_SECTION_GROQ } from '@/lib/sanity/kkkGroq'
import { NINE_DAYS_PROGRAM_GROQ } from '@/lib/sanity/nineDaysProgramGroq'

/**
 * GROQ projections for koolitus page-builder blocks.
 * Field shapes match legacy `koolitusPage` (see queries/koolitus.ts).
 */

export const KOOLITUS_SECTIONS_GROQ = `

      _type == "koolitusNineDaysProgramBlock" => {
        "programData": coalesce(
          nineDaysProgramDocument->{${NINE_DAYS_PROGRAM_GROQ}},
          *[_type == "nineDaysProgram" && _id == "nineDaysProgram"][0]{${NINE_DAYS_PROGRAM_GROQ}}
        )
      },

      _type == "koolitusStatsBlock" => {
        "heading": coalesce(heading, *[_type == "siteSettings"][0].globalStats.heading),
        showDivider,
        "stats": coalesce(
          stats[]{
            number,
            suffix,
            label
          },
          *[_type == "siteSettings"][0].globalStats.stats[]{
            number,
            suffix,
            label
          }
        )
      },

      _type == "koolitusProjectsBlock" => {
        eyebrow,
        title,
        description,
        items[]{
          _key,
          title,
          description,
          tag,
          image{
            asset->,
            alt
          }
        }
      },
      _type == "koolitusPhotoGalleryBlock" => {
        title,
        subtitle,
        images[]{
          _key,
          asset->,
          tag,
          alt,
          size
        }
      },
      _type == "koolitusLogoMarqueeBlock" => {
        title
      },
      _type == "koolitusFeaturesBlock" => {
        featuresSection {
          eyebrow,
          title,
          subtitle,
          mainFeature {
            title,
            description,
            difference,
            factoryBadges[] { name, isActive },
            expandContent,
            ctaText,
            ctaLink
          },
          features[] { id, title, description, insight, isHighlighted, relevantHabit },
          miniCards[] { title, description, proof },
          shortcutCTA {
            text,
            primaryLink,
            primaryText,
            secondaryLink,
            secondaryText
          }
        }
      },
      _type == "koolitusBuildingsBlock" => {
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
            stats { label, value },
            buttonText,
            buttonLink
          }
        }
      },
      _type == "koolitusLeanHouseBlock" => {
        leanHouseSection {
          title,
          subtitle,
          description,
          backgroundColor,
          roof { title, subtitle },
          leftPillar { title, shortTitle, items },
          center { title, systems[] { name, description } },
          rightPillar { title, shortTitle, items },
          foundation { title, items { title, description } },
          sideAnnotations {
            left { title, subtitle },
            right { title, subtitle }
          },
          benefits { icon, title, description }
        }
      },
      _type == "koolitusInvestmentBlock" => {
        investmentSection {
          eyebrow,
          title,
          titleHighlight,
          contemplationQuestion,
          contemplationLabel,
          benefitsTitle,
          benefits[] { title, subtitle, isHidden },
          price,
          priceDaily,
          priceReframe,
          roiCalculator {
            label,
            sizes[] { label, sublabel, result },
            defaultResult,
            sendRoiText
          },
          guarantee { text },
          primaryButtonText,
          secondaryButtonText,
          peerProof { avatarInitials, text, highlight },
          contactInfo { text, phone, email },
          backgroundColor
        }
      },
      _type == "koolitusLeadFormBlock" => {
        leadFormTeaser {
          enabled,
          eyebrow,
          title,
          description,
          buttonText,
          formUrl,
          image,
          questions[] { question, options }
        }
      },
      _type == "koolitusCohortsBlock" => {
        cohortsSection {
          eyebrow,
          title,
          filterLabel,
          filters[] { label, value, active },
          alertBanner { message },
          subsidyFooter { text, linkText, linkHref },
          chooserSection {
            title,
            cards[] { eyebrow, title, description }
          },
          cohorts[] {
            id,
            name,
            trainingTitle,
            location,
            dates,
            daysUntil,
            timing,
            badges[] { text, type },
            spotsAvailable,
            spotsTotal,
            spotsFilled,
            socialProof { initials, text },
            countdown,
            buttonText,
            buttonUrl,
            buttonStyle,
            calendarLabel,
            calendarLinks,
            trainingDates[] { date, startTime, endTime, location },
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
            buttons[] { label, icon, response }
          },
          backgroundColor
        }
      },
      _type == "koolitusCertificateBlock" => {
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
          meaningPills[] { label, value, active, responseText, responseExample },
          meaningResponses {
            career { text, example },
            client { text, example },
            confidence { text, example }
          },
          useCasesTitle,
          useCases[] { icon, text, author, role, company, timeframe },
          requirementsTitle,
          requirements,
          certName,
          certTitle,
          certSubtitle,
          certificateImage { asset->{_id, url} },
          certMeta[] { label, value },
          countriesTitle,
          countriesSubtitle,
          countries[] { flag, name },
          alumniTitle,
          alumniText,
          alumniHighlight,
          alumniAvatars,
          ctaText,
          ctaLink,
          backgroundColor
        }
      },
      _type == "koolitusKkkBlock" => {
        kkkDocument->{
          ${KKK_SECTION_GROQ}
        },
        kkk {
          ${KKK_SECTION_GROQ}
        }
      },
      _type == "koolitusCtaBlock" => {
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
      _type == "koolitusContactBlock" => {
        contactSection {
          title,
          description,
          backgroundColor,
          email,
          phone,
          address
        }
      },
      _type == "koolitusLocationBlock" => {
        addressTitle,
        addressText,
        transportNote,
        contactText,
        phone,
        email,
        mapEmbedUrl,
        mapButtonUrl,
        subsidyText,
        subsidyLink
      },
      _type == "koolitusTrainingScheduleBlock" => {
        enabled,
        headerTitle,
        headerSubtitle,
        image,
        description1,
        description2,
        tag1,
        tag2,
        dailyScheduleTitle,
        dailyScheduleItems[] { time, title, desc },
        foodCardText,
        infoBannerSub,
        infoBannerTitle,
        modules[] { num, type, week, date, title, desc, details },
        footerNote
      },
`
