/**
 * Frosted meta chips for case studies — not used elsewhere yet.
 * Shows sector, headcount, and location as compact glass pills.
 */
export default function CaseMetaRail({
  industry,
  employees,
  location,
}: {
  industry: string
  employees: string
  location: string
}) {
  const items = [
    { key: 'industry', text: industry },
    { key: 'employees', text: employees },
    { key: 'location', text: location },
  ].filter((x) => x.text?.trim())

  if (items.length === 0) return null

  return (
    <div
      className="flex flex-wrap gap-1.5 md:gap-2"
      aria-label="Case metadata"
    >
      {items.map(({ key, text }) => (
        <span
          key={key}
          className="inline-flex max-w-full items-center rounded-full border border-slate-200/80 bg-white/55 px-2.5 py-1 text-[9px] font-black uppercase leading-none tracking-[0.14em] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md dark:border-white/[0.12] dark:bg-[rgb(var(--bg-secondary))/0.45] dark:text-slate-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:text-[10px] sm:tracking-[0.16em]"
        >
          <span className="truncate">{text.trim()}</span>
        </span>
      ))}
    </div>
  )
}
