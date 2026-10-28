import Reveal from "./Reveal";
import VenomCollaborateButton from "./VenomCollaborateButton";
import { collaborate, contact } from "@/lib/content";

/** Final conversion band on the home page — hands off to /collaborate. */
export default function Collaborate() {
  return (
    <section id="collaborate" className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 100% at 50% 100%, rgba(255,122,201,0.14), transparent 70%), radial-gradient(50% 80% at 15% 10%, rgba(155,107,255,0.10), transparent 70%)",
        }}
      />
      <div aria-hidden className="noise pointer-events-none absolute inset-0 -z-10" />

      <div className="shell flex flex-col items-center text-center">
        <Reveal>
          <p className="label flex items-center justify-center gap-3 text-icy">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-icy" />
            {collaborate.buttonLabel}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-icy" />
          </p>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="mt-6 max-w-[16ch] text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.035em] text-white">
            {collaborate.headline}
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-mist">
            {collaborate.copy}
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-12">
          <VenomCollaborateButton
            href="/collaborate"
            label={collaborate.buttonLabel}
            variant="onDark"
            minWidth={360}
            height={70}
            fontSize={16}
          />
        </Reveal>

        <Reveal delay={320} className="mt-14">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-fog">
            Discord {contact.discord}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
