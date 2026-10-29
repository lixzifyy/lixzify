# Lixzify — Mukul · Portfolio

A dark, minimalist portfolio for an independent Minecraft server developer and
software engineer. Built with **Next.js 16 (App Router)**, **React 19**,
**TypeScript** and **Tailwind CSS v4**.

Instead of a contact form, every primary CTA is a **Venom symbiote button**: a
black liquid-glass bar that attracts and binds the visitor's cursor, leading to
a dedicated `/collaborate` page that hands off to Discord.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm run lint
```

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the static
site and deploys it to GitHub Pages whenever changes are pushed to `main`.
In the repository's **Settings → Pages**, set the build and deployment source
to **GitHub Actions**. The first deployment will publish the site URL shown in
that settings page.

The workflow handles GitHub project-site paths automatically, and uses the
domain root for a user or organization site (`<owner>.github.io`). For a custom
domain, add its domain name in `public/CNAME` and configure that domain in
GitHub Pages; the workflow will then build for the domain root.

## Editing your content

**All visitor-facing copy lives in [`lib/content.ts`](lib/content.ts).** You do not
need to touch any component to update the site.

| What to change | Where in `lib/content.ts` |
| --- | --- |
| Discord handle | `contact` |
| Hero headline, subheading, buttons | `hero` |
| About copy and the five principles | `about` |
| Experience statement | `experience` |
| The four services and their bullet lists | `services` |
| The four projects (name, overview, tech, status, links) | `projects` |
| Skills by category | `skills` |
| The four process stages | `process` |
| Collaborate copy (home band + `/collaborate` page) | `collaborate` |
| Site name, SEO description, keywords, canonical URL | `site` |

### Discord & Instagram

`contact.discord` is set to `@lixzifycreations` and `contact.instagram` to
`@lixzifycreations`, shown in the home page's collaborate band, the footer and
the mobile nav. Discord is also copied to the clipboard from `/collaborate`.

Discord profile URLs require a **numeric user ID**, not a username, so the bar
opens Discord directly. If you want it to deep-link straight to your profile,
turn on Developer Mode in Discord, copy your user ID, and set:

```ts
discordProfileUrl: "https://discord.com/users/<your-id>",
```

### Projects

Each project in `projects` has a `repo` and a `demo` field. Set them to a URL to
show a working link, or leave them `null` to show a "link pending" chip. The
`visual` field picks the generated concept artwork (`combat`, `crystal`,
`console`, `fabric`) that stands in until you add real screenshots.

## The Venom collaborate button

`components/VenomCollaborateButton.tsx` renders a liquid-glass pill with a
canvas behind it. Symbiote particles orbit its outline; as the cursor closes in
they wake, stretch toward it, throw tendrils and finally **bind** it — the
pointer is magnetically pulled onto the bar while strands bridge the gap.
Clicking opens the target (`/collaborate` on the home page, Discord on the
collaborate page).

Tuning constants live at the top of that file: `TETHER_MAX` (acquire range),
`BIND_RADIUS` (cursor capture distance), `PULL` (particle falloff) and `RING`
(swatch radius around the cursor).

Under `prefers-reduced-motion` the particles render as a static halo and the
animation is skipped entirely.

## The Minecraft dog

`components/MineDog.tsx` draws a tamed Minecraft wolf on a fixed full-screen
canvas — built from rectangles in sprite units so it stays blocky, with a red
collar and the vanilla fur palette. It walks the floor of the viewport, picks a
visible card or heading to wander to, sits and wags when you bring the cursor
near, tracks your cursor with its head and eyes, twitches its ears, blinks, and
jumps with a burst of pixel hearts when you click it.

It is rendered on the home page only, so the minimal `/collaborate` page stays
clean. It has `pointer-events: none`, so it never blocks a link or button.

## Structure

```
app/
  layout.tsx            fonts, metadata, OpenGraph, JSON-LD, skip link
  page.tsx              composes the sections
  collaborate/page.tsx  white collaborate page → Discord
  globals.css           design tokens, venom button styles, reduced-motion rules
  icon.svg              favicon
  opengraph-image.tsx   social preview card
  robots.ts, sitemap.ts SEO
components/
  Nav.tsx               fixed nav + mobile menu
  Hero.tsx              hero section
  CrystalSword.tsx      the SVG crystalline sword asset
  ParticleField.tsx     canvas particle field (static under reduced motion)
  VenomCollaborateButton.tsx   the symbiote CTA
  DiscordHandoff.tsx    copy-@lixzifycreations + open Discord
  MineDog.tsx           the 2D Minecraft wolf companion
  About.tsx  Services.tsx  Projects.tsx  SkillsProcess.tsx  Collaborate.tsx
  SectionHeading.tsx  Reveal.tsx  Footer.tsx
lib/
  content.ts            ← every editable string and list
```

## Accessibility & motion

- Scroll-reveal animations, the sword, the particle field and the Venom button
  all respect `prefers-reduced-motion`.
- Visible focus rings, a skip-to-content link, labelled form controls on the
  remaining interactive elements, and a keyboard-closable mobile menu.
- The Venom bar is a real `<a>` — it works with the keyboard and on touch, where
  the cursor-binding simply never triggers.

## Design notes

Deep black surfaces, thin `rgba(255,255,255,0.07)` borders, glassmorphism panels
and restrained icy-pink / electric-violet accents. The hero sword, favicon and
project previews are all inline SVG, so the page ships with no image payload.
`/collaborate` deliberately inverts to a white page so the black symbiote bar
and its near-black tendrils read at full contrast.
