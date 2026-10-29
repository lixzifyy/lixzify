/**
 * ---------------------------------------------------------------------------
 * EDITABLE CONTENT
 * ---------------------------------------------------------------------------
 * Everything a visitor reads lives here. Update this file to change copy,
 * contact details, projects, skills and process stages — no component edits
 * are required.
 */

export const site = {
  brand: "LIXZIFY",
  person: "Mukul",
  tagline: "Independent Minecraft systems developer",
  /** Used for <title>, OpenGraph and JSON-LD. */
  url: "https://lixzify.dev",
  /** Copyright year shown in the footer. Update when the site is refreshed. */
  copyrightYear: 2026,
  description:
    "Independent developer building custom Minecraft server plugins, Fabric mods, resource packs and animated equipment for servers that want something bespoke.",
  keywords: [
    "Minecraft server developer",
    "custom Minecraft plugins",
    "Fabric mod developer",
    "Minecraft resource packs",
    "Minecraft plugin development",
    "Paper API",
    "Bukkit API",
    "freelance Minecraft developer",
  ],
} as const;

export const contact = {
  /** Your Discord handle — shown to visitors and copied by the collaborate flow. */
  discord: "@lixzify.productions",
  /**
   * Optional: your numeric Discord profile link (https://discord.com/users/<id>).
   * Discord does not resolve profile URLs from a username alone, so leave this
   * null and the collaborate bar opens Discord directly while visitors copy
   * your handle. Paste the ID-based link here to deep-link straight to it.
   */
  discordProfileUrl: null as string | null,
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "Collaborate", href: "#collaborate" },
] as const;

export const hero = {
  eyebrow: "Independent Developer · Minecraft Ecosystem",
  headline: "I build the systems behind extraordinary Minecraft experiences.",
  subheading:
    "Custom server plugins, Fabric mods, bespoke resource packs, animated equipment, and gameplay systems engineered around your vision.",
  primaryCta: { label: "Explore My Work", href: "#services" },
  secondaryCta: { label: "Let's Build Something", href: "/collaborate" },
  availability: "Available for select projects.",
} as const;

export const about = {
  intro: [
    "I'm an independent developer working on Minecraft server customization, gameplay engineering and interactive systems — the layer where a server's idea becomes something players actually feel.",
    "Most of my work starts with a mechanic that doesn't exist yet: a weapon that behaves a certain way, a progression loop that needs to hold up under load, or a set of visuals that has to match a network's identity. I build it from the ground up rather than bolting together pre-made pieces.",
  ],
  principles: [
    {
      title: "Project-driven",
      body: "Scope is defined by what your server actually needs. Every decision traces back to a gameplay goal, not a feature checklist.",
    },
    {
      title: "Custom by default",
      body: "Bespoke implementations instead of generic plugin configuration — mechanics built around your vision rather than a marketplace preset.",
    },
    {
      title: "Performance-conscious",
      body: "Tick budget, memory footprint and player count are considered from architecture onward, not patched in after launch.",
    },
    {
      title: "Detail and balance",
      body: "Frame timing, particle pacing, cooldown curves and readability all matter. A mechanic has to look right and play right.",
    },
    {
      title: "Built to collaborate",
      body: "Comfortable working alongside server owners, moderators and other developers, with clear communication at each stage.",
    },
  ],
} as const;

export const experience = {
  /** Omit by setting `statement` to null if it is not independently accurate. */
  statement: "Six years of TypeScript experience.",
  supporting: [
    "Production TypeScript across server and tooling work.",
    "Java plugin and Fabric mod development for live server environments.",
    "Asset pipelines running through Blockbench, texture work and model export.",
  ],
} as const;

export type Service = {
  code: string;
  title: string;
  layer: string;
  layerTone: "server" | "client" | "hybrid";
  summary: string;
  items: string[];
};

export const services: Service[] = [
  {
    code: "A",
    title: "Custom Minecraft Plugins",
    layer: "Server-side",
    layerTone: "server",
    summary:
      "Server-side gameplay systems written against the Paper and Bukkit APIs, running without any client installation.",
    items: [
      "Custom gameplay mechanics",
      "Commands, permissions, and administrative systems",
      "Custom abilities, weapons, armour, and progression",
      "Economy, rewards, and event systems",
      "Server-side integrations and configuration",
    ],
  },
  {
    code: "B",
    title: "Minecraft Mod Development",
    layer: "Client-side mod",
    layerTone: "client",
    summary:
      "Fabric mods that extend the game client and require installation by the players who run them.",
    items: [
      "Fabric mod development",
      "Custom mechanics and items",
      "Interactive abilities and effects",
      "Compatibility-conscious implementation",
      "Performance optimization",
    ],
  },
  {
    code: "C",
    title: "Custom Resource Packs",
    layer: "Client-side assets",
    layerTone: "client",
    summary:
      "Visual assets delivered to the player's client — they change what things look like, never how the server calculates.",
    items: [
      "Custom item textures and models",
      "Unique weapons, tools, armour, and cosmetics",
      "Custom-model-data or item-model-based assets where appropriate",
      "Resource-pack delivery for supported multiplayer environments",
      "Server-distributed visual assets",
    ],
  },
  {
    code: "D",
    title: "Animated Custom Equipment",
    layer: "Hybrid",
    layerTone: "hybrid",
    summary:
      "Server logic paired with client-side models and effects: the plugin drives state, the pack and assets render it.",
    items: [
      "Crystalline weapons and armour",
      "Lightning effects and particle systems",
      "Animated item showcases",
      "Custom visual identities for server networks",
      "Model and texture workflows using Blockbench",
    ],
  },
];


export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "Java", "JavaScript"],
  },
  {
    group: "Minecraft Development",
    items: [
      "Fabric API",
      "Paper API",
      "Bukkit API",
      "Minecraft resource packs",
      "Custom models",
      "Commands",
      "Events",
      "Server integrations",
    ],
  },
  {
    group: "Creative Tools",
    items: ["Blockbench", "Texture creation", "Model design", "Particle-effect design"],
  },
  {
    group: "Development Tools",
    items: ["Git", "GitHub", "Gradle", "Maven", "IDE tooling"],
  },
] as const;

export const process = [
  {
    index: "01",
    title: "Discovery",
    body: "Understand the server's requirements and gameplay vision.",
  },
  {
    index: "02",
    title: "Architecture",
    body: "Choose an appropriate implementation and define the scope.",
  },
  {
    index: "03",
    title: "Development",
    body: "Build, test, and refine the solution.",
  },
  {
    index: "04",
    title: "Delivery",
    body: "Provide the agreed deliverables, setup instructions, and documentation.",
  },
] as const;

export const collaborate = {
  /** Section anchor on the home page. */
  headline: "Have an idea worth building?",
  copy: "Tell me what you're planning for your server. Let's turn the concept into a working experience.",
  buttonLabel: "Collaborate",
  /** Landing page reached from every Collaborate button. */
  pageEyebrow: "Collaborate",
  pageTitle: "Hit me up on Discord.",
  pageCopy:
    "Discord is where every project conversation starts — scope, timeline, screenshots, all of it. Add me, tell me what you're building, and we'll take it from there.",
  discordCta: "Open Discord",
  copyCta: "Copy username",
  copiedCta: "Copied",
  hint: "Move your cursor close to the bar — the symbiote will find you.",
  backLabel: "Back to home",
} as const;

export const donate = {
  /**
   * Clicking the dog opens this in a new tab. Set it to null and the dog still
   * jumps and showers hearts — it just doesn't navigate anywhere.
   */
  paypalUrl: "https://www.paypal.com/ncp/payment/5EEXEDPX4TRES" as string | null,
  /** Shown in the pixel speech bubble when the cursor gets close. */
  hint: "a bone makes me happy :D (click my head)",
} as const;
