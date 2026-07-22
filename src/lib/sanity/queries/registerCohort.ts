/** Single cohort row from koolitusPage for /register summary (by cohort `id`). */
export const REGISTER_COHORT_BY_ID_QUERY = `
  *[_type == "koolitusPage" && _id == "koolitusPage"][0] {
    "cohort": coalesce(
      sections[_type == "koolitusCohortsBlock"][0].cohortsSection.cohorts[id == $cohortId][0],
      cohortsSection.cohorts[id == $cohortId][0]
    ) {
      id,
      name,
      trainingTitle,
      location,
      dates,
      daysUntil,
      timing,
      badges[] { text, type },
      spotsAvailable,
      spotsTotal,
      spotsFilled,
      statusLabel,
      statusTone,
      price,
      priceNote,
      preRegistrationInfo,
      preRegistrationBenefits,
      isCompleted
    }
  }.cohort
`
