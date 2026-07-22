/**
 * Unified site search across public singletons and blog posts.
 * Uses case-insensitive GROQ `match` on titles, hero copy, excerpts, and selected portable text.
 */
export const SITE_SEARCH_QUERY = `*[
  _type in [
    "blogPost",
    "post",
    "cases",
    "koolitusPage",
    "aboutPage",
    "opstarProfit",
    "galleryPage",
    "blogPage",
    "privacyPolicyPage",
    "kontaktPage",
    "mainPage"
  ]
  && (
    (_type == "blogPost" && (
      lower(title) match $p
      || (defined(excerpt) && lower(excerpt) match $p)
      || (defined(body) && lower(pt::text(body)) match $p)
    ))
    || (_type == "post" && (
      lower(title) match $p
      || (defined(excerpt) && lower(excerpt) match $p)
      || (defined(body) && lower(pt::text(body)) match $p)
      || (defined(content) && lower(pt::text(content)) match $p)
    ))
    || (_type == "koolitusPage" && (
      lower(title) match $p
      || lower(hero.headline) match $p
      || lower(hero.subtitle) match $p
      || lower(hero.description) match $p
      || (defined(hero.scriptHeadline) && lower(hero.scriptHeadline) match $p)
      || (defined(hero.eyebrow) && lower(hero.eyebrow) match $p)
    ))
    || (_type == "aboutPage" && (
      lower(title) match $p
      || lower(hero.headline) match $p
      || lower(hero.subtitle) match $p
      || lower(hero.description) match $p
      || (defined(keyAchievements.studentProjects) && count(keyAchievements.studentProjects[
        lower(projectTitle) match $p
        || lower(studentName) match $p
        || lower(university) match $p
        || lower(projectDescription) match $p
        || lower(result) match $p
      ]) > 0)
    ))
    || (_type == "opstarProfit" && (
      lower(title) match $p
      || lower(hero.mainTitle) match $p
      || lower(hero.subtitle) match $p
      || lower(hero.description) match $p
      || (defined(hero.tag) && defined(hero.tag.text) && lower(hero.tag.text) match $p)
    ))
    || (_type == "cases" && (
      lower(title) match $p
      || (defined(eyebrow) && lower(eyebrow) match $p)
      || (defined(subtitle) && lower(subtitle) match $p)
      || (defined(caseStudies) && count(caseStudies[lower(company) match $p || lower(industry) match $p || lower(location) match $p]) > 0)
    ))
    || (_type == "galleryPage" && (
      lower(title) match $p
      || lower(pageTitle) match $p
      || (defined(description) && lower(description) match $p)
      || (defined(pillText) && lower(pillText) match $p)
      || (defined(seo.metaTitle) && lower(seo.metaTitle) match $p)
      || (defined(seo.metaDescription) && lower(seo.metaDescription) match $p)
    ))
    || (_type == "blogPage" && (
      lower(title) match $p
      || lower(hero.title) match $p
      || (defined(hero.titleAccent) && lower(hero.titleAccent) match $p)
      || (defined(hero.description) && lower(hero.description) match $p)
      || (defined(hero.pillText) && lower(hero.pillText) match $p)
      || (defined(seo.metaTitle) && lower(seo.metaTitle) match $p)
      || (defined(seo.metaDescription) && lower(seo.metaDescription) match $p)
    ))
    || (_type == "privacyPolicyPage" && (
      lower(title) match $p
      || lower(pageTitle) match $p
      || (defined(eyebrow) && lower(eyebrow) match $p)
      || (defined(body) && lower(pt::text(body)) match $p)
      || (defined(seo.metaTitle) && lower(seo.metaTitle) match $p)
      || (defined(seo.metaDescription) && lower(seo.metaDescription) match $p)
    ))
    || (_type == "kontaktPage" && (
      lower(title) match $p
      || lower(hero.pageTitle) match $p
      || (defined(hero.intro) && lower(hero.intro) match $p)
      || (defined(hero.eyebrow) && lower(hero.eyebrow) match $p)
      || (defined(seo.metaTitle) && lower(seo.metaTitle) match $p)
      || (defined(seo.metaDescription) && lower(seo.metaDescription) match $p)
    ))
    || (_type == "mainPage" && (
      lower(title) match $p
      || lower(headline) match $p
      || (defined(scriptHeadline) && lower(scriptHeadline) match $p)
      || (defined(subtitle) && lower(subtitle) match $p)
      || (defined(eyebrow) && lower(eyebrow) match $p)
    ))
  )
] {
  _type,
  "href": select(
    _type == "blogPost" => "/blog/" + slug.current,
    _type == "post" => "/blog/" + slug.current,
    _type == "koolitusPage" => "/koolitus",
    _type == "aboutPage" => "/about",
    _type == "opstarProfit" => "/product",
    _type == "galleryPage" => "/galerii",
    _type == "blogPage" => "/blog",
    _type == "privacyPolicyPage" => "/privacy-policy",
    _type == "kontaktPage" => "/kontakt",
    _type == "cases" => "/#juhtumid",
    _type == "mainPage" => "/"
  ),
  "title": select(
    _type == "blogPost" => title,
    _type == "post" => title,
    _type == "blogPage" => coalesce(hero.title, title),
    _type == "galleryPage" => coalesce(pageTitle, title),
    _type == "privacyPolicyPage" => coalesce(pageTitle, title),
    _type == "kontaktPage" => coalesce(hero.pageTitle, title),
    _type == "mainPage" => coalesce(headline, title),
    _type == "koolitusPage" => coalesce(hero.headline, title),
    _type == "aboutPage" => coalesce(hero.headline, title),
    _type == "opstarProfit" => coalesce(hero.mainTitle, title),
    _type == "cases" => title,
    title
  ),
  "description": select(
    _type == "blogPost" => excerpt,
    _type == "post" => excerpt,
    _type == "mainPage" => subtitle,
    _type == "koolitusPage" => hero.subtitle,
    _type == "aboutPage" => hero.subtitle,
    _type == "opstarProfit" => hero.subtitle,
    _type == "galleryPage" => description,
    _type == "blogPage" => hero.description,
    _type == "privacyPolicyPage" => seo.metaDescription,
    _type == "kontaktPage" => coalesce(hero.intro, seo.metaDescription),
    _type == "cases" => subtitle
  ),
  "category": select(
    _type == "blogPost" => "Blogi",
    _type == "post" => "Blogi",
    _type == "mainPage" => "Pealeht",
    _type == "koolitusPage" => "Koolitus",
    _type == "aboutPage" => "About",
    _type == "opstarProfit" => "Product Name",
    _type == "galleryPage" => "Galerii",
    _type == "blogPage" => "Blogi",
    _type == "privacyPolicyPage" => "Privaatsus",
    _type == "kontaktPage" => "Kontakt",
    _type == "cases" => "Juhtumid"
  ),
  publishedAt
} | order(coalesce(publishedAt, _updatedAt) desc) [0...24]`

export type SiteSearchHit = {
  _type: string
  href: string
  title: string | null
  description: string | null
  category: string | null
}
