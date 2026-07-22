import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Global Settings
      S.documentListItem()
        .schemaType('siteSettings')
        .title('Site Settings')
        .id('siteSettings')
        .icon(() => '⚙️'),

      S.divider(),

      // Main Page
      S.documentListItem()
        .schemaType('mainPage')
        .title('Main Page')
        .id('mainPage')
        .icon(() => '🏠'),
      
      // Trainer Profile
      S.documentListItem()
        .schemaType('andresProfile')
        .title('Trainer Profile')
        .id('andresProfile')
        .icon(() => '👤'),

      // Kontakt Page
      S.documentListItem()
        .schemaType('kontaktPage')
        .title('Kontakt Page')
        .id('kontaktPage')
        .icon(() => '📞'),

      S.divider(),
      
      // Partner Logos
      S.documentTypeListItem('partnerLogo').title('Partner Logos'),
      
      S.divider(),
      
      // Other document types
      ...S.documentTypeListItems().filter(
        (item) => !['mainPage', 'partnerLogo', 'andresProfile', 'siteSettings'].includes(item.getId() as string)
      ),
    ])
