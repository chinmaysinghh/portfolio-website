import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen px-6 py-24 md:px-12 md:py-32 bg-bg text-ink flex items-center justify-center">
      <div className="max-w-2xl w-full rounded-4xl border border-[rgba(243,239,230,0.08)] bg-bg-raised/80 px-8 py-12 md:px-12 md:py-16 text-center shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-6">Coming Soon</p>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight text-ink mb-4">
          This achievement page is being prepared.
        </h1>
        <p className="text-ink-dim text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
          The external credential or reference is not available yet. Check back later for the full link.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(243,239,230,0.12)] bg-[rgba(243,239,230,0.03)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim transition-colors hover:border-accent/40 hover:text-accent hover:bg-[rgba(47,214,167,0.06)]"
        >
          <span>Return home</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
