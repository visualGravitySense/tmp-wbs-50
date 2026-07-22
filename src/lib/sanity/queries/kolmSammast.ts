export const KOLM_SAMMAST_QUERY = `
  *[_type == "kolmSammast"][0] {
    title,
    subtitle,
    steps[] {
      stepNumber,
      title,
      description,
      icon
    },
    backgroundColor,
    titleColor,
    stepColor
  }
`
