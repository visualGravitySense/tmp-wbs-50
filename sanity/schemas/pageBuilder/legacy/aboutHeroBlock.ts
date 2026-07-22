import { createAboutSectionBlock } from '../about/createAboutSectionBlock'

/** @deprecated Use marketingSplitHeroBlock (rightComponentType: aboutAndres). Kept for CMS backward compatibility. */
export default createAboutSectionBlock({
  name: 'aboutHeroBlock',
  title: 'Hero (legacy — about)',
  fieldName: 'hero',
  previewTitlePath: 'hero.headline',
  previewSubtitle: 'Legacy → marketingSplitHeroBlock',
})