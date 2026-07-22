import { type SchemaTypeDefinition } from 'sanity'
import partnerLogo from './partnerLogo'
import mainPage from './mainPage'
import andresProfile from './andresProfile'
import siteSettings from './siteSettings'
import kontaktPage from './kontaktPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [partnerLogo, mainPage, andresProfile, siteSettings, kontaktPage],
}
