import { createKoolitusSectionBlock } from '../koolitus/createKoolitusSectionBlock'

/** @deprecated Use marketingSplitHeroBlock (rightComponentType: quickFacts). Kept for CMS backward compatibility. */
export default createKoolitusSectionBlock({
  name: 'koolitusHeroBlock',
  title: 'Hero (legacy — koolitus)',
  fieldName: 'hero',
  previewTitlePath: 'hero.headline',
  previewSubtitle: 'Legacy → marketingSplitHeroBlock',
})