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
