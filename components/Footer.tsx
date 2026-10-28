import { contact, nav, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-[#060608]">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="label text-white">{site.brand}</p>
          <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-fog">
            {site.person} — {site.tagline.toLowerCase()}.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-mist transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a href="#collaborate" className="text-sm text-mist transition-colors hover:text-white">
            Contact
          </a>
        </nav>

        <div className="flex flex-col gap-2.5 text-sm">
          <span className="label text-fog">Discord</span>
          <span className="text-mist">{contact.discord}</span>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-white/[0.06] py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fog">
          © {site.copyrightYear} {site.person}. All rights reserved.
        </p>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-fog">
          Built with Next.js · TypeScript · Tailwind
        </p>
      </div>
    </footer>
  );
}
