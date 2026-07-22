/** Prefer singleton id `opstarProfitBlock`; fallback if an older doc exists without that id. */
export const OPSTAR_PROFIT_BLOCK_QUERY = `
  coalesce(*[_id == "opstarProfitBlock"][0], *[_type == "opstarProfitBlock"][0]) {
    title,
    subtitle,
    leftColumn {
      title,
      acronymItems[] { code, label, description }
    },
    rightColumn {
      title,
      acronymItems[] { code, label, description }
    },
    illustration {
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
    },
    backgroundColor,
    textColor
  }
`
