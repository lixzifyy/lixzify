"use client";

import { useState } from "react";
import VenomCollaborateButton from "./VenomCollaborateButton";
import { collaborate, contact } from "@/lib/content";

/**
 * Discord handoff on /collaborate. Discord profile URLs need a numeric user ID,
 * not a username, so the bar opens Discord and the handle is one click to copy
 * unless `contact.discordProfileUrl` is filled in with the ID-based link.
 */
export default function DiscordHandoff() {
  const [copied, setCopied] = useState(false);
  const handle = contact.discord.replace(/^@/, "");

  const target = contact.discordProfileUrl ?? "https://discord.com/app";

  async function copy() {
    try {
      await navigator.clipboard.writeText(handle);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <VenomCollaborateButton
        href={target}
        label={collaborate.buttonLabel}
        variant="onLight"
        minWidth={380}
        height={74}
        fontSize={17}
      />

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/[0.04] px-4 py-2.5">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#ff7ac9]" />
          <span className="font-mono text-[0.95rem] tracking-tight text-black">{contact.discord}</span>
        </span>

        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:border-black/40 hover:bg-black hover:text-white"
          aria-live="polite"
        >
          {copied ? collaborate.copiedCta : collaborate.copyCta}
        </button>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-gradient-to-r from-[#ff9ec9] via-[#b06bff] to-[#8a5cff] p-[1.5px] transition-transform duration-300 hover:-translate-y-0.5"
          aria-label={`Instagram ${contact.instagram}`}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3">
            <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
              <defs>
                <linearGradient id="ig-glyph" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff6fb5" />
                  <stop offset="55%" stopColor="#b06bff" />
                  <stop offset="100%" stopColor="#8a5cff" />
                </linearGradient>
              </defs>
              <rect x="3" y="3" width="18" height="18" rx="5.5" fill="none" stroke="url(#ig-glyph)" strokeWidth="1.9" />
              <circle cx="12" cy="12" r="4.3" fill="none" stroke="url(#ig-glyph)" strokeWidth="1.9" />
              <circle cx="17.3" cy="6.7" r="1.25" fill="url(#ig-glyph)" />
            </svg>
            <span className="bg-gradient-to-r from-[#ff6fb5] via-[#b06bff] to-[#8a5cff] bg-clip-text font-mono text-[0.95rem] tracking-tight text-transparent">
              {contact.instagram}
            </span>
          </span>
        </a>

        <span className="font-mono text-[0.8rem] tracking-tight text-black/45">&lt;— click it</span>
      </div>

      <p className="mt-7 max-w-[46ch] text-center text-[0.9rem] leading-relaxed text-black/50">
        Opens Discord — search <span className="font-mono text-black/75">{contact.discord}</span>{" "}
        to add me.
      </p>

      <p className="mt-14 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-black/35">
        {collaborate.hint}
      </p>
    </div>
  );
}
