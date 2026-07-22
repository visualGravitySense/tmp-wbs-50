export const OPSTAR_PROFIT_COMPARISON_QUERY = `
  *[_type == "opstarProfitComparison"][0] {
    title,
    subtitle,
    comparisonItems[] {
      isNot,
      is
    },
    backgroundColor,
    titleColor,
    isNotColor,
    isColor
  }
`
