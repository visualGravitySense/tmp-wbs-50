import { StructureResolver } from 'sanity/structure'

/**
 * Curated Studio menu only — do not use `documentTypeListItems()` without a strict
 * whitelist, or every `type: 'document'` schema appears in the sidebar.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('nav-siteSettings')
        .title('Site settings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.listItem()
        .id('nav-nineDaysProgram')
        .title('9 päeva programm')
        .child(
          S.document()
            .schemaType('nineDaysProgram')
            .documentId('nineDaysProgram'),
        ),
      S.listItem()
        .id('nav-mainPage')
        .title('Main Page')
        .child(S.document().schemaType('mainPage').documentId('mainPage')),
      S.listItem()
        .id('nav-blogPage')
        .title('Blog Page')
        .child(S.document().schemaType('blogPage').documentId('blogPage')),
      S.listItem()
        .id('nav-privacyPolicyPage')
        .title('Privaatsuspoliitika')
        .child(
          S.document()
            .schemaType('privacyPolicyPage')
            .documentId('privacyPolicyPage'),
        ),
      S.listItem()
        .id('nav-eduStandardsPage')
        .title('Täienduskoolituse standardi leht')
        .child(
          S.document()
            .schemaType('eduStandardsPage')
            .documentId('eduStandardsPage'),
        ),
      S.listItem()
        .id('nav-galleryPage')
        .title('Galerii')
        .child(
          S.document().schemaType('galleryPage').documentId('galleryPage'),
        ),
      S.listItem()
        .id('nav-juhendatudLoputoodPage')
        .title('Juhendatud lõputööd')
        .child(
          S.document()
            .schemaType('juhendatudLoputoodPage')
            .documentId('juhendatudLoputoodPage'),
        ),
      S.listItem()
        .id('nav-kontaktPage')
        .title('Kontakt leht')
        .child(
          S.document().schemaType('kontaktPage').documentId('kontaktPage'),
        ),
      S.listItem()
        .id('nav-aboutPage')
        .title('About')
        .child(
          S.document().schemaType('aboutPage').documentId('aboutPage'),
        ),
      S.listItem()
        .id('nav-testimonialsPage')
        .title('Tagasiside leht')
        .child(
          S.document().schemaType('testimonialsPage').documentId('testimonialsPage'),
        ),
      S.listItem()
        .id('nav-koolitusPage')
        .title('Koolitus')
        .child(
          S.document().schemaType('koolitusPage').documentId('koolitusPage'),
        ),
      S.listItem()
        .id('nav-kliendidPage')
        .title('Kliendid')
        .child(
          S.document().schemaType('kliendidPage').documentId('kliendidPage'),
        ),
      S.listItem()
        .id('nav-opstarProfit')
        .title('Product Name')
        .child(
          S.document().schemaType('opstarProfit').documentId('opstarProfit'),
        ),
      S.listItem()
        .id('nav-opstarProfitBlock')
        .title('Product Name — orbit block')
        .child(
          S.document()
            .schemaType('opstarProfitBlock')
            .documentId('opstarProfitBlock'),
        ),
      S.divider(),
      S.listItem()
        .id('nav-blogPosts')
        .title('Blogi postitused')
        .child(
          S.documentList()
            .title('Blogi postitused')
            .filter('_type in ["blogPost", "post"]')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
        ),
      S.documentTypeListItem('kkk').title('KKK (FAQ) — ühised dokumendid'),
      S.documentTypeListItem('review').title('Tagasiside (reviews)'),
      S.documentTypeListItem('galleryCategory').title('Galerii kategooriad'),
      S.documentTypeListItem('thesis').title('Lõputööd'),
      S.documentTypeListItem('partnerLogo').title('Partnerite logod'),
      S.documentTypeListItem('oppepaev').title('Õppepäevad (1–9)'),
      S.documentTypeListItem('faqItem').title('KKK küsimused/vastused'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
    ])
