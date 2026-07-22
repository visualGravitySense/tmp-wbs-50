/** Matches `FinalCTA` default when Sanity has no override. */
export const DEFAULT_FINAL_CTA_BANNER_BACKGROUND =
  'linear-gradient(120deg, #1140b4 0%, #0f2f93 45%, #1d1d6a 100%)'

export type GlobalFinalCtaBannerPreset = {
  key?: string | null
  label?: string | null
  gradientCss?: string | null
}

export type GlobalFinalCtaBannerConfig = {
  activePresetKey?: string | null
  gradientPresets?: GlobalFinalCtaBannerPreset[] | null
} | null

export type SiteSettingsWithGlobalCtaBanner = {
  globalFinalCtaBanner?: GlobalFinalCtaBannerConfig
} | null

export function resolveGlobalFinalCtaBannerBackground(
  siteSettings: SiteSettingsWithGlobalCtaBanner | undefined | null
): string {
  const cfg = siteSettings?.globalFinalCtaBanner
  const activeKey = cfg?.activePresetKey?.trim()
  if (!activeKey) {
    return DEFAULT_FINAL_CTA_BANNER_BACKGROUND
  }
  const match = cfg?.gradientPresets?.find((p) => p.key?.trim() === activeKey)
  const css = match?.gradientCss?.trim()
  if (css) {
    return css
  }
  return DEFAULT_FINAL_CTA_BANNER_BACKGROUND
}
