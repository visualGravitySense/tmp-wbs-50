import SeoConversionSection, { SeoConversionSectionData } from '@/components/SeoConversionSection'

export type HomeSeoConversionBandProps = {
  seoConversionSection?: any
}

export default function HomeSeoConversionBand({
  seoConversionSection,
}: HomeSeoConversionBandProps) {
  return (
    <div className="relative">
      <SeoConversionSection data={seoConversionSection as any} />
    </div>
  )
}
