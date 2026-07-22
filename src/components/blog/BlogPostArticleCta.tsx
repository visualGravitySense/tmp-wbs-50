import Link from 'next/link'

/**
 * Inline CTA mirroring doc/blogi-post.html — drives traffic to koolitus registration.
 */
export default function BlogPostArticleCta() {
  return (
    <div className="relative my-10 overflow-hidden rounded-[28px] border border-white/30 bg-gradient-to-br from-[#0040a8] via-[#0063d4] to-[#0b7dff] px-8 py-8 text-white shadow-[0_28px_70px_-34px_rgba(0,83,191,0.7)] backdrop-blur-2xl sm:px-9 sm:py-9">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_82%_48%,rgba(255,255,255,0.16)_0%,transparent_62%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_38%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-18px_46px_rgba(0,43,102,0.2)]" aria-hidden />
      <h3 className="relative z-[1] mb-2 text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-tight tracking-[-0.02em]">
        Õpi LEAN-i rakendama päriselt — 9 päevaga
      </h3>
      <p className="relative z-[1] mb-6 max-w-xl text-[15px] leading-relaxed text-white/88">
        OPSTAR PROFIT™ programm ühendab teooria päris tehasekülastustega. Vaata järgmisi gruppe ja vabu kohti.
      </p>
      <Link
        href="/koolitus#registreeru"
        className="relative z-[1] inline-flex items-center gap-2 rounded-full border border-white/80 bg-white px-8 py-3.5 text-[13px] font-black uppercase tracking-[0.08em] text-blue-700 dark:text-blue-400 shadow-[0_12px_28px_-14px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-16px_rgba(0,0,0,0.55)]"
      >
        Registreeru koolitusele →
      </Link>
    </div>
  )
}
