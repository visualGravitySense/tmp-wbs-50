import { SectionBadge, sanitizeEyebrowText, type SectionBadgeProps } from './SectionBadge'

export type EyebrowPillBadgeProps = Omit<SectionBadgeProps, 'children'> & {
  text: string
}

export function EyebrowPillBadge({
  text,
  showDots = true,
  className,
  centered = false,
  flow = false,
  wrapperClassName,
  tone = 'default',
}: EyebrowPillBadgeProps) {
  return (
    <SectionBadge
      showDots={showDots}
      className={className}
      centered={centered}
      flow={flow}
      wrapperClassName={wrapperClassName}
      tone={tone}
    >
      {sanitizeEyebrowText(text)}
    </SectionBadge>
  )
}
