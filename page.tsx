import type { Metadata } from "next";
import Link from "next/link";
import DiscordHandoff from "@/components/DiscordHandoff";
import { collaborate, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Collaborate",
  description: `${collaborate.pageCopy} Reach ${site.person} on Discord at ${site.brand}.`,
  alternates: { canonical: "/collaborate" },
  openGraph: {
    title: `${collaborate.buttonLabel} — ${site.brand}`,
    description: collaborate.pageCopy,
    url: "/collaborate",
  },
};

export default function CollaboratePage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-white">
      {/* faint symbiote halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 44%, rgba(255,122,201,0.14), transparent 72%), radial-gradient(44% 40% at 82% 88%, rgba(155,107,255,0.10), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <header className="shell flex items-center justify-between py-7">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-black transition-opacity hover:opacity-60"
          >
            <span
              aria-hidden
              className="h-6 w-6 rotate-45 rounded-[6px] bg-gradient-to-br from-white via-[#ff9ec9] to-[#9b6bff] ring-1 ring-black/10 transition-transform duration-500 group-hover:rotate-[135deg]"
            />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.24em]">{site.brand}</span>
          </Link>

          <Link
            href="/"
            className="text-sm text-black/50 transition-colors hover:text-black"
          >
            {collaborate.backLabel}
          </Link>
        </header>

        <div className="shell flex flex-1 flex-col items-center justify-center py-14 text-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-black/45">
            {collaborate.pageEyebrow}
          </p>

          <h1 className="mt-7 max-w-[13ch] text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-black">
            {collaborate.pageTitle}
          </h1>

          <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-black/55">
            {collaborate.pageCopy}
          </p>

          <div className="mt-16">
            <DiscordHandoff />
          </div>
        </div>

        <footer className="shell flex items-center justify-between gap-6 border-t border-black/10 py-7">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-black/40">
            {site.person} — {site.tagline}
          </p>
          <p className="hidden font-mono text-[0.68rem] uppercase tracking-[0.2em] text-black/40 sm:block">
            © {site.copyrightYear}
          </p>
        </footer>
      </div>
    </main>
  );
}
