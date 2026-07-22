import siteSettings from './siteSettings'
import page from './page'
import training from './training'
import testimonial from './testimonial'
import blogPost from './blogPost'
import post from './post'
import testimonialsPage from './testimonialsPage'
import blogPage from './blogPage'
import privacyPolicyPage from './privacyPolicyPage'
import eduStandardsPage from './eduStandardsPage'
import galleryPage from './galleryPage'
import galleryCategory from './galleryCategory'
import thesis from './thesis'
import juhendatudLoputoodPage from './juhendatudLoputoodPage'
import kontaktPage from './kontaktPage'
import aboutPage from './aboutPage'
import koolitusPage from './koolitusPage'
import opstarProfit from './opstarProfit'
import opstarProfitIllustration from './opstarProfitIllustration'
import opstarProfitBlock from './opstarProfitBlock'
import kliendidPage from './kliendidPage'
import opstarProfitComparison from './opstarProfitComparison'
import kolmSammast from './kolmSammast'
import opstarProfit8Components from './opstarProfit8Components'
import leanVsOpstar from './leanVsOpstar'
import meodetavadTulemused from './meodetavadTulemused'
import cases from './cases'
import arvamused from './arvamused'
import kkk from './kkk'
import opstarProfitCta from './opstarProfitCta'
import finalCtaBlock from './finalCtaBlock'
import helpFormTeaserBlock from './helpFormTeaserBlock'
import { withScrollSpyNavFields } from './pageBuilder/withScrollSpyNavFields'
import mainPage from './mainPage'
import partnerLogo from './partnerLogo'
import faqItem from './faqItem'
import link from './objects/link'
import footer from './objects/footer'
import kkkSection from './objects/kkkSection'
import ctaSection from './objects/ctaSection'
import { nineDaysMini, nineDaysMiniDay, nineDaysMiniProgramDays } from './objects/nineDaysMini'
import floatingBadge from './objects/floatingBadge'
import quizContent from './objects/home/quizContent'
import seoConversionSectionContent from './objects/home/seoConversionSectionContent'
import grantSectionContent from './objects/home/grantSectionContent'
import aboutAndresSectionContent from './objects/home/aboutAndresSectionContent'
import beforeAfterSectionContent from './objects/home/beforeAfterSectionContent'
import photoMarqueeSectionContent from './objects/home/photoMarqueeSectionContent'
import pricingSectionContent from './objects/home/pricingSectionContent'
import compactQuiz from './quiz'
import review from '../../src/sanity/schemas/review'
import testimonialQuizOption from './objects/testimonialQuizOption'
import sharedHero from './objects/sharedHero'
import sharedAudience from './objects/sharedAudience'

// Page Builder blocks
import heroBlock from './pageBuilder/heroBlock'
import featuresBlock from './pageBuilder/featuresBlock'
import testimonialsBlock from './pageBuilder/testimonialsBlock'
import ctaBlock from './pageBuilder/ctaBlock'
import textBlock from './pageBuilder/textBlock'
import painItem from './pageBuilder/home/painItem'
import caseItem from './pageBuilder/home/caseItem'
import casesBlock from './pageBuilder/home/casesBlock'
import careerFactItem from './pageBuilder/home/careerFactItem'
import { marketingPageBuilderBlocks } from './pageBuilder/registry'
import oppepaev from './documents/oppepaev'
import nineDaysProgram from './documents/nineDaysProgram'
import andresProfile from './documents/andresProfile'

export const schemaTypes = [
  oppepaev,
  nineDaysProgram,
  andresProfile,
  siteSettings,
  page,
  training,
  testimonial,
  blogPost,
  post,
  testimonialsPage,
  blogPage,
  privacyPolicyPage,
  eduStandardsPage,
  galleryPage,
  galleryCategory,
  thesis,
  juhendatudLoputoodPage,
  kontaktPage,
  aboutPage,
  koolitusPage,
  opstarProfit,
  opstarProfitIllustration,
  opstarProfitBlock,
  kliendidPage,
  opstarProfitComparison,
  kolmSammast,
  opstarProfit8Components,
  leanVsOpstar,
  meodetavadTulemused,
  cases,
  arvamused,
  kkk,
  opstarProfitCta,
  finalCtaBlock,
  withScrollSpyNavFields(helpFormTeaserBlock),
  mainPage,
  partnerLogo,
  faqItem,
  link,
  footer,
  kkkSection,
  ctaSection,
  nineDaysMiniDay,
  nineDaysMiniProgramDays,
  nineDaysMini,
  quizContent,
  seoConversionSectionContent,
  grantSectionContent,
  aboutAndresSectionContent,
  beforeAfterSectionContent,
  photoMarqueeSectionContent,
  pricingSectionContent,
  heroBlock,
  featuresBlock,
  testimonialsBlock,
  ctaBlock,
  textBlock,
  ...marketingPageBuilderBlocks,
  painItem,
  caseItem,
  careerFactItem,
  compactQuiz,
  review,
  testimonialQuizOption,
  floatingBadge,
  sharedHero,
  sharedAudience,
]
