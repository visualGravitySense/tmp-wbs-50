import kontaktHeroBlock from './kontaktHeroBlock'
import kontaktQuickBlock from './kontaktQuickBlock'
import kontaktFormBlock from './kontaktFormBlock'
import kontaktAndresBlock from './kontaktAndresBlock'
import kontaktOpstarBlock from './kontaktOpstarBlock'
import kontaktServicesBlock from './kontaktServicesBlock'
import kontaktLegalNoteBlock from './kontaktLegalNoteBlock'

export {
  kontaktHeroBlock,
  kontaktQuickBlock,
  kontaktFormBlock,
  kontaktAndresBlock,
  kontaktOpstarBlock,
  kontaktServicesBlock,
  kontaktLegalNoteBlock,
}

export const kontaktPageBuilderBlocks = [
  kontaktHeroBlock,
  kontaktQuickBlock,
  kontaktFormBlock,
  kontaktAndresBlock,
  kontaktOpstarBlock,
  kontaktServicesBlock,
  kontaktLegalNoteBlock,
]

export const kontaktSectionTypes = kontaktPageBuilderBlocks.map((b) => ({
  type: b.name,
})) as { type: string }[]
