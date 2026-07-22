import { createOpstarSectionBlock } from '../opstar/createOpstarSectionBlock'

/** @deprecated Typo alias — use opstarKolmSammastBlock. Kept for Studio validation on old CMS data. */
export default createOpstarSectionBlock({
  name: 'opstarKoImSammastBlock',
  title: 'Kolm sammast (legacy typo)',
  fieldName: 'kolmSammast',
  previewTitlePath: 'kolmSammast.title',
  previewSubtitle: '→ opstarKolmSammastBlock',
})