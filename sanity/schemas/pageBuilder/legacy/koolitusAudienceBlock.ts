import { createKoolitusSectionBlock } from '../koolitus/createKoolitusSectionBlock'

/** @deprecated Use painPointsBlock (variant: audience). */
export default createKoolitusSectionBlock({
  name: 'koolitusAudienceBlock',
  title: 'Sihtrühm (legacy)',
  fieldName: 'audienceSection',
  previewTitlePath: 'audienceSection.title',
  previewSubtitle: '→ painPointsBlock audience',
})