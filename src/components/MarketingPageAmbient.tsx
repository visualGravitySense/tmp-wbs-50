/** Fixed ambient blurs — canonical dark/light tone (matches /blog). */
export default function MarketingPageAmbient() {
  return (
    <div className="marketing-page-ambient" aria-hidden>
      <div className="marketing-page-ambient__orb marketing-page-ambient__orb--blue" aria-hidden="true" />
      <div className="marketing-page-ambient__orb marketing-page-ambient__orb--cyan" aria-hidden="true" />
      <div className="marketing-page-ambient__orb marketing-page-ambient__orb--indigo" aria-hidden="true" />
    </div>
  )
}
