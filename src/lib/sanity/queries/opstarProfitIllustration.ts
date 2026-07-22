export const OPSTAR_PROFIT_ILLUSTRATION_QUERY = `
  *[_type == "opstarProfitIllustration"][0] {
    title,
    centralText,
    illustrationItems[] {
      title,
      position {
        x,
        y
      }
    },
    backgroundColor,
    centralCircleColor
  }
`
