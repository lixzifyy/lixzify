import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "split";
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  align = "split",
}: SectionHeadingProps) {
  return (
    <div className={align === "split" ? "grid gap-6 md:grid-cols-[1fr_0.8fr] md:gap-12" : ""}>
      <Reveal>
        <p className="label flex items-center gap-3 text-fog">
          <span className="text-icy">{index}</span>
          <span className="h-px w-6 bg-white/20" />
          {eyebrow}
        </p>
        <h2 className="mt-5 max-w-[18ch] text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
          {title}
        </h2>
      </Reveal>

      {intro ? (
        <Reveal delay={110} className="md:pt-9">
          <p className="max-w-[52ch] text-[0.975rem] leading-relaxed text-mist">{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
