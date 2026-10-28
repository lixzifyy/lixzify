import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { about, experience } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-64"
        style={{ background: "linear-gradient(to bottom, rgba(155,107,255,0.06), transparent)" }}
      />
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={<>Custom systems, built around your vision.</>}
          intro="An independent developer focused on Minecraft server customization, gameplay engineering and interactive systems."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* bio */}
          <div>
            <Reveal>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-mist">
                {about.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            {/* experience statement */}
            <Reveal delay={120}>
              <div className="glass mt-10 rounded-xl p-6">
                <p className="label text-fog">Experience</p>
                <p className="mt-3 text-xl font-medium tracking-[-0.02em] text-white">
                  {experience.statement}
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-white/[0.07] pt-5">
                  {experience.supporting.map((line) => (
                    <li key={line} className="flex gap-3 text-sm text-mist">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 rotate-45 bg-icy/80" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* principles */}
          <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {about.principles.map((principle, i) => (
              <Reveal as="li" key={principle.title} delay={i * 70} className="group">
                <div className="flex gap-5 py-6 transition-colors duration-300 group-hover:bg-white/[0.015] md:gap-8">
                  <span className="label w-8 shrink-0 pt-1 text-fog transition-colors duration-300 group-hover:text-icy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-medium tracking-[-0.01em] text-white">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-[56ch] text-[0.95rem] leading-relaxed text-mist">
                      {principle.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
