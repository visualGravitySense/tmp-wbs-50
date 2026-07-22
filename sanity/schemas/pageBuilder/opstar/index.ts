import opstarAcronymGridBlock from './opstarAcronymGridBlock'
import opstarOrbitBlock from './opstarOrbitBlock'
import opstarComparisonBlock from './opstarComparisonBlock'
import opstarKolmSammastBlock from './opstarKolmSammastBlock'
import opstarFrameworkBlock from './opstarFrameworkBlock'
import opstarEightComponentsBlock from './opstarEightComponentsBlock'
import opstarLeanVsOpstarBlock from './opstarLeanVsOpstarBlock'
import opstarMeasuredResultsBlock from './opstarMeasuredResultsBlock'
import opstarCasesBlock from './opstarCasesBlock'
import opstarKkkBlock from './opstarKkkBlock'
import opstarCtaBlock from './opstarCtaBlock'
import opstarContentSectionsBlock from './opstarContentSectionsBlock'

export {
  opstarAcronymGridBlock,
  opstarOrbitBlock,
  opstarComparisonBlock,
  opstarKolmSammastBlock,
  opstarFrameworkBlock,
  opstarEightComponentsBlock,
  opstarLeanVsOpstarBlock,
  opstarMeasuredResultsBlock,
  opstarCasesBlock,
  opstarKkkBlock,
  opstarCtaBlock,
  opstarContentSectionsBlock,
}

export const opstarPageBuilderBlocks = [
  opstarAcronymGridBlock,
  opstarOrbitBlock,
  opstarComparisonBlock,
  opstarKolmSammastBlock,
  opstarFrameworkBlock,
  opstarEightComponentsBlock,
  opstarLeanVsOpstarBlock,
  opstarMeasuredResultsBlock,
  opstarCasesBlock,
  opstarKkkBlock,
  opstarCtaBlock,
  opstarContentSectionsBlock,
]

export const opstarSectionTypes = opstarPageBuilderBlocks.map((b) => ({
  type: b.name,
})) as { type: string }[]
