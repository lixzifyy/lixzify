"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { contact, nav, site } from "@/lib/content";

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="mark-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#ff9ec9" />
          <stop offset="100%" stopColor="#9b6bff" />
        </linearGradient>
      </defs>
      <path d="M16 2 L29 16 L16 30 L3 16 Z" fill="url(#mark-g)" opacity="0.95" />
      <path d="M16 8 L23.5 16 L16 24 L8.5 16 Z" fill="#08080b" opacity="0.65" />
      <path d="M16 2 L16 30" stroke="#08080b" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/[0.07] bg-[rgba(6,6,9,0.78)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
          aria-label={`${site.brand} — back to top`}
        >
          <Mark className="h-7 w-7 transition-transform duration-500 group-hover:rotate-90" />
          <span className="label text-[0.78rem] text-white">{site.brand}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-mist transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/collaborate"
            className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white transition-all duration-300 hover:border-icy/60 hover:bg-icy/10 sm:inline-flex"
          >
            Let&apos;s Build Something
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-white/25 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-4 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-white/[0.07] bg-[rgba(6,6,9,0.97)] backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col gap-1 py-6">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-white/[0.05] py-3.5 text-lg text-chalk transition-colors hover:text-icy"
            >
              <span className="label text-fog">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
          <Link
            href="/collaborate"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-icy to-spark px-5 py-3 text-sm font-medium text-[#08080b]"
          >
            Let&apos;s Build Something
          </Link>
          <p className="label mt-5 flex flex-wrap gap-x-6 gap-y-2 text-fog">
            <span>Discord {contact.discord}</span>
            <span>Instagram {contact.instagram}</span>
          </p>
        </nav>
      </div>
    </header>
  );
}
