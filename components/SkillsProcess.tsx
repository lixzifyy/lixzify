import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { process, skills } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.015), transparent 40%)" }}
      />
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Technical Skills"
          title={<>The working toolkit.</>}
          intro="Technologies I genuinely build with, grouped by where they sit in a project."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col bg-[#08080c] p-6 transition-colors duration-500 hover:bg-[#0c0c12]">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.68rem] tracking-[0.2em] text-icy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[0.95rem] font-medium tracking-[-0.01em] text-white">
                    {group.group}
                  </h3>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-white/[0.09] bg-white/[0.03] px-2.5 py-1.5 text-[0.8rem] text-chalk/85 transition-colors duration-300 hover:border-icy/40 hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Development Process"
          title={<>Four stages, no guesswork.</>}
          intro="A predictable path from first conversation to documented handover."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-4">
          {process.map((stage, i) => (
            <Reveal as="li" key={stage.index} delay={i * 90} className="h-full">
              <div className="group relative flex h-full flex-col bg-[#08080c] p-7 transition-colors duration-500 hover:bg-[#0c0c12]">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-icy/70 via-spark/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[2rem] font-medium leading-none tracking-[-0.04em] text-white/10 transition-colors duration-500 group-hover:text-icy/70">
                    {stage.index}
                  </span>
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-white/20 transition-colors duration-500 group-hover:bg-icy" />
                </div>

                <h3 className="mt-8 text-lg font-medium tracking-[-0.02em] text-white">
                  {stage.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-mist">{stage.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
