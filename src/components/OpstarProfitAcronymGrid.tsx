const CELLS = [
  {
    id: 'op',
    acronym: 'OP',
    title: 'Operatsioonide juhtimine',
    details: 'Protsess, Põhjalikkus, Detailid ja Sisu.',
  },
  {
    id: 'st',
    acronym: 'ST',
    title: 'Strateegiline juhtimine',
    details: 'Nägemus, Plaan, Tegevused, Terviklikkus, Eristumine.',
  },
  {
    id: 'star',
    acronym: 'STAR',
    title: 'Püüdlemine, enesetunne',
    details: 'Pühendumine, Vastutus, Hoolimine, Hing.',
  },
  {
    id: 'pro',
    acronym: 'PRO',
    title: 'Professionaalsus',
    details: 'Teadmine, Oskused, Faktid, Tulemus.',
  },
  {
    id: 'fit',
    acronym: 'FIT',
    title: 'Integreeritus, seotus',
    details: 'Sobivus, Sidusus, Seostatus.',
  },
  {
    id: 'profit',
    acronym: 'PROFIT',
    title: 'Kasum',
    details: 'Väärtus, Jätkusuutlikkus, Areng, Kasv.',
  },
] as const

function acronymSizeClass(acronym: string) {
  if (acronym.length >= 5) return 'text-[clamp(1.25rem,4.5vw,1.75rem)] sm:text-[clamp(1.35rem,3.2vw,1.9rem)]'
  return 'text-[clamp(1.5rem,5vw,2.15rem)] sm:text-[clamp(1.65rem,3.5vw,2.25rem)]'
}

export default function OpstarProfitAcronymGrid() {
  return (
    <section
      className="relative overflow-hidden border-t border-[var(--border)]/40 bg-[rgb(var(--bg-primary))] px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
      aria-labelledby="opstar-acronym-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-600/14" />
        <div className="absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-cyan-500/8 blur-[90px] dark:bg-cyan-600/12" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <h2
          id="opstar-acronym-heading"
          className="mb-8 text-center text-[clamp(1rem,2.6vw,1.3rem)] font-black uppercase italic leading-tight tracking-tight text-[rgb(var(--text-primary))] sm:mb-10 md:text-xl"
        >
          <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-200 dark:via-sky-200 dark:to-cyan-200">
            OPSTAR PROFIT – SÜSTEEMNE INIMKESKSUS JUHTIMISES
          </span>
        </h2>

        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[rgb(var(--text-secondary))] sm:mb-8 sm:text-xs">
          <span className="max-sm:hidden">Fokuseeri klaviatuuriga — iga täheühendi taga on mõte</span>
          <span className="sm:hidden">Igal lahtril on tähendus all nähtav</span>
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {CELLS.map((cell) => (
            <div
              key={cell.id}
              tabIndex={0}
              className="group relative flex flex-col items-center rounded-2xl border border-slate-200/90 bg-white/85 px-3 py-4 text-center shadow-[0_14px_40px_-28px_rgba(15,23,42,0.2)] outline-none ring-blue-500/0 transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-blue-500/45 dark:border-white/[0.1] dark:bg-[rgb(var(--bg-secondary))]/0.85 dark:shadow-[0_20px_50px_-36px_rgba(0,0,0,0.65)] sm:rounded-[1.35rem] sm:px-4 sm:py-5"
            >
              <span
                className={`font-black leading-none tracking-tight text-blue-600 dark:text-blue-400 ${acronymSizeClass(cell.acronym)}`}
              >
                {cell.acronym}
              </span>
              <span className="mt-2 max-w-[12.5rem] text-[11px] font-bold leading-snug text-[rgb(var(--text-primary))] underline decoration-slate-300/85 underline-offset-[3px] dark:decoration-white/18 sm:text-xs">
                {cell.title}
              </span>

              {/* Mobiil: alati näha; sm+: hover / focus-within */}
              <div
                className="mt-2.5 w-full border-t border-[var(--border)]/55 pt-2.5 sm:max-h-0 sm:overflow-hidden sm:border-t-0 sm:pt-0 sm:opacity-0 sm:transition-all sm:duration-300 sm:ease-out sm:group-hover:max-h-56 sm:group-hover:border-t sm:group-hover:border-[var(--border)]/55 sm:group-hover:pt-2.5 sm:group-hover:opacity-100 sm:group-focus-within:max-h-56 sm:group-focus-within:border-t sm:group-focus-within:border-[var(--border)]/55 sm:group-focus-within:pt-2.5 sm:group-focus-within:opacity-100"
                role="note"
              >
                <p className="text-[10px] font-medium leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[11px]">
                  {cell.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
