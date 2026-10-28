import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { services, type Service } from "@/lib/content";

const LAYER_STYLES: Record<Service["layerTone"], string> = {
  server: "border-halo/30 bg-halo/10 text-halo",
  client: "border-icy/30 bg-icy/10 text-icy",
  hybrid: "border-white/25 bg-white/[0.07] text-white",
};

export default function Services() {
  return (
    <section id="services" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Services"
          title={<>Four disciplines, one coherent build.</>}
          intro="Server-side logic, client mods and visual assets are different layers with different constraints. Each engagement states clearly which layer a feature lives on."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.code} delay={i * 80}>
              <article className="lit-edge group relative flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[linear-gradient(158deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)_60%)] p-7 transition-colors duration-500 hover:border-white/[0.16] md:p-8">
                <header className="flex items-start justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.7rem] tracking-[0.2em] text-fog transition-colors duration-300 group-hover:text-icy">
                      {service.code}
                    </span>
                    <h3 className="max-w-[14ch] text-[1.35rem] font-medium leading-tight tracking-[-0.02em] text-white">
                      {service.title}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${LAYER_STYLES[service.layerTone]}`}
                  >
                    {service.layer}
                  </span>
                </header>

                <p className="mt-4 text-[0.93rem] leading-relaxed text-mist">{service.summary}</p>

                <ul className="mt-6 space-y-3 border-t border-white/[0.07] pt-6">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-3.5 text-[0.93rem] text-chalk/85">
                      <span
                        aria-hidden
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rotate-45 bg-gradient-to-br from-icy to-spark"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* layer clarification */}
        <Reveal delay={120}>
          <div className="mt-8 flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 sm:flex-row sm:items-start sm:gap-5">
            <span className="label shrink-0 text-icy">Note</span>
            <p className="text-[0.9rem] leading-relaxed text-mist">
              Server-side features apply to every player automatically. Mods and resource packs are{" "}
              <span className="text-white">client-side</span>: they only affect players who install
              them. Where a feature needs both — animated equipment, for example — the server
              handles logic while the client handles rendering, and the setup documentation spells
              out what players must download.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
