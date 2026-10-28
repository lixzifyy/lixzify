import sharp from "sharp";
import fs from "node:fs";

const W = 1200;
const H = 630;
const PAD = 72;
const SANS = "Segoe UI, system-ui, Arial, sans-serif";

const brand = "LIXZIFY";
const headline = [
  "I build the systems behind",
  "extraordinary Minecraft",
  "experiences.",
];
const eyebrow = "Independent Developer · Minecraft Ecosystem";
const host = "lixzify.dev";

// vertical rhythm mirrors the original ImageResponse: 3 children, space-between
const topH = 46;
const bottomLH = 31;
const fsHead = 74;
const lineH = Math.round(fsHead * 1.06);
const blockH = headline.length * lineH;

const topY = PAD + topH;
const bottomY = H - PAD - bottomLH;
const avail = bottomY - topY;
const blockTop = topY + (avail - blockH) / 2;

const baseline = (centerY, size) => Math.round(centerY + size * 0.35);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="gPink" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1"
      gradientTransform="translate(${W * 0.85} ${H * 0.15}) scale(${W * 0.7} ${H * 0.9})">
      <stop offset="0" stop-color="#ff6fae" stop-opacity="0.30"/>
      <stop offset="0.65" stop-color="#ff6fae" stop-opacity="0"/>
      <stop offset="1" stop-color="#ff6fae" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gViolet" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1"
      gradientTransform="translate(${W * 0.1} ${H * 0.9}) scale(${W * 0.6} ${H * 0.8})">
      <stop offset="0" stop-color="#9b6bff" stop-opacity="0.26"/>
      <stop offset="0.65" stop-color="#9b6bff" stop-opacity="0"/>
      <stop offset="1" stop-color="#9b6bff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.55" stop-color="#ff9ec9"/>
      <stop offset="1" stop-color="#9b6bff"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#050507"/>
  <rect width="${W}" height="${H}" fill="url(#gPink)"/>
  <rect width="${W}" height="${H}" fill="url(#gViolet)"/>

  <g transform="translate(${PAD + 23} ${PAD + 23}) rotate(45)">
    <rect x="-23" y="-23" width="46" height="46" rx="8" fill="url(#mark)"/>
  </g>
  <text x="${PAD + 46 + 18}" y="${baseline(PAD + 23, 26)}" font-family="${SANS}"
    font-size="26" letter-spacing="8" fill="#ff9ec9">${brand}</text>

  ${headline
    .map((ln, i) => {
      const centerY = blockTop + i * lineH + lineH / 2;
      return `<text x="${PAD}" y="${baseline(centerY, fsHead)}" font-family="${SANS}" font-size="${fsHead}" font-weight="700" letter-spacing="-2.5" fill="#ffffff">${ln}</text>`;
    })
    .join("\n  ")}

  <text x="${PAD}" y="${baseline(H - PAD - bottomLH / 2, 26)}" font-family="${SANS}"
    font-size="26" fill="#9c9caa">${eyebrow}</text>
  <text x="${W - PAD}" y="${baseline(H - PAD - bottomLH / 2, 26)}" font-family="${SANS}"
    font-size="26" text-anchor="end" fill="#cbb6ff">${host}</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toBuffer().then((buf) => {
  fs.writeFileSync("public/og.png", buf);
  console.log("wrote public/og.png", buf.length, "bytes");
});
