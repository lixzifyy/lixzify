import Link from "next/link";
import CrystalSword from "./CrystalSword";
import ParticleField from "./ParticleField";
import Reveal from "./Reveal";
import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* backdrop layers */}
      <div aria-hidden className="absolute inset-0 -z-10 grid-veil" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(155,107,255,0.20), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute -top-10 right-[-10%] -z-10 h-[460px] w-[560px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,111,174,0.16), transparent)" }}
      />
      <ParticleField className="absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden className="noise pointer-events-none absolute inset-0 -z-10" />

      <div className="shell grid items-center gap-14 pb-24 pt-36 md:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-32 lg:pt-48">
        {/* ── copy ─────────────────────────────────────────── */}
        <div>
          <Reveal>
            <p className="label flex items-center gap-3 text-icy/90">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-icy" />
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 max-w-[16ch] text-[clamp(2.4rem,6.4vw,4.6rem)] font-medium leading-[1.03] tracking-[-0.035em] text-white">
              I build the systems behind{" "}
              <span className="text-grad">extraordinary Minecraft</span> experiences.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-mist md:text-lg">
              {hero.subheading}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <a
                href={hero.primaryCta.href}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-icy to-spark px-7 py-3.5 text-[0.95rem] font-medium text-[#08080b] shadow-[0_10px_40px_-12px_rgba(255,111,174,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10">{hero.primaryCta.label}</span>
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path
                    d="M8 2v12M3 9l5 5 5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-[0.95rem] text-white backdrop-blur transition-all duration-300 hover:border-icy/60 hover:bg-icy/[0.08]"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-9 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-icy animate-ping-soft" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-icy shadow-[0_0_10px_rgba(255,158,201,0.9)]" />
              </span>
              <span className="text-sm text-mist">{hero.availability}</span>
            </div>
          </Reveal>
        </div>

        {/* ── asset ────────────────────────────────────────── */}
        <Reveal delay={200} className="relative">
          <div className="glass relative mx-auto w-full max-w-[440px] rounded-2xl p-5 pb-4 sm:p-7 sm:pb-6">
            {/* corner ticks */}
            <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-white/25" />
            <span aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r border-t border-white/25" />
            <span aria-hidden className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/25" />
            <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/25" />

            <CrystalSword className="mx-auto w-full max-w-[330px]" />

            <div className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-3.5">
              <span className="label text-fog">Asset — Crystalline Blade</span>
              <span className="label text-icy/80">Blockbench</span>
            </div>
          </div>

          {/* floating spec chips */}
          <div className="pointer-events-none absolute -left-2 top-10 hidden xl:block">
            <span className="hairline rounded-full bg-[rgba(8,8,11,0.85)] px-3 py-1.5 font-mono text-[0.68rem] tracking-wider text-mist backdrop-blur">
              particle: lightning
            </span>
          </div>
          <div className="pointer-events-none absolute -right-3 bottom-16 hidden xl:block">
            <span className="hairline rounded-full bg-[rgba(8,8,11,0.85)] px-3 py-1.5 font-mono text-[0.68rem] tracking-wider text-mist backdrop-blur">
              tint: #ff9ec9
            </span>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div className="shell hidden items-center gap-4 pb-10 md:flex">
        <span className="label text-fog">Scroll</span>
        <span className="h-px w-24 bg-gradient-to-r from-white/25 to-transparent" />
      </div>
    </section>
  );
}
