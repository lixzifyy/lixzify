import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projects, type Project } from "@/lib/content";

/* ---------------------------------------------------------------------------
 * Concept artwork. These are generated placeholders, clearly labelled as such,
 * until real screenshots or video are supplied per project.
 * ------------------------------------------------------------------------- */

function ArtCombat() {
  return (
    <g>
      <circle cx="340" cy="140" r="96" fill="none" stroke="rgba(255,158,201,0.35)" strokeWidth="2" strokeDasharray="150 460" />
      <circle cx="340" cy="140" r="72" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeDasharray="80 380" />
      <circle cx="340" cy="140" r="44" fill="none" stroke="rgba(155,107,255,0.5)" strokeWidth="1.5" />
      <path d="M340 84 L340 196 M284 140 L396 140" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <path d="M70 300 L210 120 L236 148 L96 328 Z" fill="url(#p-streak)" opacity="0.85" />
      <path d="M130 320 L250 168" stroke="#ff9ec9" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <g fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
        <path d="M180 76 L204 104 L182 112 L208 144" />
        <path d="M470 268 L446 292 L468 300 L444 330" />
      </g>
      <rect x="70" y="356" width="164" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
      <rect x="70" y="356" width="104" height="8" rx="4" fill="url(#p-streak)" />
      <rect x="250" y="356" width="164" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="250" y="356" width="58" height="8" rx="4" fill="rgba(155,107,255,0.7)" />
    </g>
  );
}

function ArtCrystal() {
  return (
    <g>
      <path d="M250 60 L318 176 L250 268 L182 176 Z" fill="url(#p-crystal)" opacity="0.95" />
      <path d="M250 60 L250 268 L182 176 Z" fill="rgba(120,110,150,0.55)" />
      <path d="M250 96 L292 176 L250 228 L208 176 Z" fill="rgba(255,255,255,0.55)" />
      <path d="M132 214 L172 282 L132 340 L92 282 Z" fill="url(#p-crystal)" opacity="0.7" />
      <path d="M370 236 L404 292 L370 344 L336 292 Z" fill="url(#p-crystal)" opacity="0.6" />
      <path d="M410 120 L434 164 L410 204 L386 164 Z" fill="rgba(255,255,255,0.35)" />
      <g fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
        <path d="M96 110 L134 154 L108 164 L146 210" />
        <path d="M432 296 L404 328 L428 338 L400 372" />
      </g>
      <g fill="none" stroke="#ff9ec9" strokeWidth="2" strokeLinecap="round" opacity="0.75">
        <path d="M330 60 L306 96 L330 106 L304 140" />
      </g>
    </g>
  );
}

function ArtConsole() {
  const lines = [
    [70, 60, 180, "rgba(255,255,255,0.55)"],
    [70, 92, 300, "rgba(255,158,201,0.75)"],
    [70, 124, 240, "rgba(203,182,255,0.7)"],
    [70, 156, 340, "rgba(255,255,255,0.35)"],
    [70, 188, 200, "rgba(255,255,255,0.5)"],
    [70, 220, 288, "rgba(255,158,201,0.55)"],
    [70, 252, 150, "rgba(255,255,255,0.3)"],
    [70, 284, 236, "rgba(203,182,255,0.5)"],
    [70, 316, 116, "rgba(255,255,255,0.45)"],
  ] as const;
  return (
    <g>
      <rect x="48" y="44" width="424" height="316" rx="12" fill="rgba(10,10,14,0.9)" stroke="rgba(255,255,255,0.14)" />
      <path d="M48 88 H472" stroke="rgba(255,255,255,0.12)" />
      <g fill="rgba(255,255,255,0.35)">
        <circle cx="74" cy="66" r="5" />
        <circle cx="94" cy="66" r="5" />
        <circle cx="114" cy="66" r="5" />
      </g>
      {lines.map(([x, y, w, c]) => (
        <rect key={y} x={x} y={y} width={w} height="9" rx="4.5" fill={c} opacity="0.7" />
      ))}
      <rect x="70" y="330" width="14" height="16" rx="2" fill="#ff9ec9" opacity="0.9" />
      <path d="M356 130 L392 176 L356 220 L320 176 Z" fill="url(#p-crystal)" opacity="0.75" />
      <path d="M356 130 L356 220 L320 176 Z" fill="rgba(120,110,150,0.6)" />
    </g>
  );
}

function ArtFabric() {
  const nodes: Array<[number, number]> = [
    [250, 200],
    [140, 116],
    [366, 116],
    [128, 288],
    [378, 284],
    [250, 60],
    [250, 344],
  ];
  return (
    <g>
      <g stroke="rgba(255,255,255,0.22)" strokeWidth="1.5">
        <path d="M250 200 L140 116 M250 200 L366 116 M250 200 L128 288 M250 200 L378 284 M250 200 L250 60 M250 200 L250 344" />
      </g>
      {nodes.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <rect
            x={x - 34}
            y={y - 34}
            width="68"
            height="68"
            rx="14"
            fill={i === 0 ? "url(#p-crystal)" : "rgba(18,18,24,0.95)"}
            stroke={i === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,158,201,0.45)"}
            strokeWidth="1.5"
          />
          {i !== 0 && (
            <rect x={x - 14} y={y - 14} width="28" height="28" rx="6" fill="rgba(155,107,255,0.55)" />
          )}
        </g>
      ))}
      <g fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round">
        <path d="M430 66 L452 94 L430 102 L454 132" />
      </g>
    </g>
  );
}

function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#08080c]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 65% 35%, rgba(255,111,174,0.16), transparent 70%), radial-gradient(55% 60% at 20% 80%, rgba(155,107,255,0.16), transparent 70%)",
        }}
      />

      <svg viewBox="0 0 520 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="p-crystal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#ffd9ea" />
            <stop offset="100%" stopColor="#ff8fc0" />
          </linearGradient>
          <linearGradient id="p-streak" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#9b6bff" />
            <stop offset="100%" stopColor="#ff9ec9" />
          </linearGradient>
        </defs>
        {kind === "combat" && <ArtCombat />}
        {kind === "crystal" && <ArtCrystal />}
        {kind === "console" && <ArtConsole />}
        {kind === "fabric" && <ArtFabric />}
      </svg>

      <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-white/25" />
      <span aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r border-t border-white/25" />
    </div>
  );
}

function PendingLink({ label }: { label: string }) {
  return (
    <span
      aria-disabled="true"
      className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-white/15 px-4 py-2 text-sm text-fog"
      title={`Add a ${label.toLowerCase()} URL in lib/content.ts`}
    >
      {label} — link pending
    </span>
  );
}

function LiveLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white transition-all duration-300 hover:border-icy/60 hover:bg-icy/10"
    >
      {label}
      <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5">
        <path
          d="M5 11L11 5M6 5h5v5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Featured Projects"
          title={<>Selected systems and equipment.</>}
          intro="Each entry lists its scope, stack and current development status. Replace the concept previews with real screenshots or video as builds land."
        />

        <div className="mt-16 space-y-16 md:space-y-20">
          {projects.map((project, i) => {
            const flipped = i % 2 === 1;
            return (
              <Reveal key={project.slug}>
                <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={flipped ? "lg:order-2" : ""}>
                    <ProjectVisual kind={project.visual} />
                  </div>

                  <div className={flipped ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[0.7rem] tracking-[0.22em] text-fog">
                        {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-mist">
                        {project.status}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[clamp(1.6rem,2.6vw,2.15rem)] font-medium leading-tight tracking-[-0.03em] text-white">
                      {project.name}
                    </h3>

                    <p className="mt-4 max-w-[58ch] text-[0.975rem] leading-relaxed text-mist">
                      {project.overview}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.7rem] tracking-wide text-chalk/80"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      {project.repo ? (
                        <LiveLink label="Repository" href={project.repo} />
                      ) : (
                        <PendingLink label="Repository" />
                      )}
                      {project.demo ? (
                        <LiveLink label="Live demo" href={project.demo} />
                      ) : (
                        <PendingLink label="Live demo" />
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
