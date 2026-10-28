"use client";

import { useEffect, useRef } from "react";
import { donate } from "@/lib/content";

/* ---------------------------------------------------------------------------
 * MineDog — a 2D Minecraft wolf companion.
 *
 * Drawn from rectangles in "sprite units" so it stays crisp and blocky like a
 * real Minecraft mob, then scaled to screen. It walks the floor of the viewport,
 * hops between whatever cards and headings are on screen, sits and wags when
 * you bring the cursor close, and jumps when you click it. Get close enough
 * and it grins, lolls its tongue and asks for a bone. Clicking it opens the
 * donation link — set `donate.paypalUrl` in lib/content.ts.
 * ------------------------------------------------------------------------ */

/** palette lifted from the Minecraft wolf texture */
const FUR = "#d5d5d3";
const FUR_MID = "#c2c2c0";
const FUR_DARK = "#a9a9a7";
const FUR_SHADE = "#8d8d8b";
const MUZZLE = "#e7e7e5";
const NOSE = "#2c2c2e";
const EYE = "#1b1b1d";
const COLLAR = "#c8242c";
const COLLAR_DK = "#8f141b";

type Rect = { x: number; y: number; w: number; h: number; c: string };

/* The sprite is authored bottom-left origin, facing +x (right). Units. */
const BODY: Rect[] = [
  { x: 2, y: 7, w: 12, h: 7, c: FUR },
  { x: 2, y: 7, w: 12, h: 2, c: FUR_SHADE },
  { x: 2, y: 12, w: 12, h: 2, c: FUR_MID },
];

const HEAD: Rect[] = [
  { x: 13, y: 8, w: 8, h: 8, c: FUR },
  { x: 13, y: 8, w: 8, h: 2, c: FUR_MID },
  { x: 20, y: 10, w: 4, h: 4, c: MUZZLE },
  { x: 22, y: 11, w: 2, h: 2, c: NOSE },
];

const EAR: Rect[] = [
  { x: 14, y: 15, w: 2, h: 3, c: FUR_DARK },
  { x: 18, y: 15, w: 2, h: 3, c: FUR_DARK },
];

const COLLAR_RECT: Rect[] = [
  { x: 12.5, y: 8, w: 1.6, h: 7, c: COLLAR },
  { x: 12.5, y: 8, w: 1.6, h: 2, c: COLLAR_DK },
];

function drawRects(ctx: CanvasRenderingContext2D, rects: Rect[], s: number) {
  for (const r of rects) {
    ctx.fillStyle = r.c;
    ctx.fillRect(r.x * s, r.y * s, r.w * s, r.h * s);
  }
}

/** A leg drawn as a rotating block, pivoting from its top (hip). */
function drawLeg(
  ctx: CanvasRenderingContext2D,
  x: number,
  topY: number,
  len: number,
  swing: number,
  s: number,
  shade: string,
) {
  ctx.save();
  ctx.translate(x * s, topY * s);
  ctx.rotate(swing);
  // sprite space is bottom-origin, so the leg hangs below the hip
  ctx.fillStyle = FUR;
  ctx.fillRect(-1.4 * s, -len * s, 2.8 * s, len * s);
  ctx.fillStyle = shade;
  ctx.fillRect(-1.4 * s, -len * s, 2.8 * s, 1.6 * s);
  ctx.restore();
}

function drawTail(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  s: number,
) {
  ctx.save();
  ctx.translate(x * s, y * s);
  ctx.rotate(angle);
  ctx.fillStyle = FUR;
  ctx.fillRect(-5 * s, -1.1 * s, 5 * s, 2.2 * s);
  ctx.fillStyle = FUR_DARK;
  ctx.fillRect(-6.6 * s, -0.9 * s, 1.8 * s, 1.8 * s);
  ctx.restore();
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, a: number) {
  ctx.save();
  ctx.globalAlpha = a;
  ctx.fillStyle = "#ff5f7a";
  const u = s / 5;
  ctx.fillRect(x, y, 2 * u, u);
  ctx.fillRect(x + 3 * u, y, 2 * u, u);
  ctx.fillRect(x - u, y + u, 7 * u, u);
  ctx.fillRect(x, y + 2 * u, 5 * u, u);
  ctx.fillRect(x + u, y + 3 * u, 3 * u, u);
  ctx.fillRect(x + 2 * u, y + 4 * u, u, u);
  ctx.restore();
}

const POP_FONT = "600 14px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Greedy word-wrap into at most 2 lines; the tail joins the second. */
function wrapMessage(
  ctx: CanvasRenderingContext2D,
  message: string,
  maxW: number,
): string[] {
  if (ctx.measureText(message).width <= maxW) return [message];
  const words = message.split(" ");
  let first = "";
  let i = 0;
  for (; i < words.length; i++) {
    const test = first ? `${first} ${words[i]}` : words[i];
    if (ctx.measureText(test).width > maxW) break;
    first = test;
  }
  // a single word wider than the plate — let it overflow rather than clip
  if (!first) return [message];
  return [first, words.slice(i).join(" ")];
}

/** A small Minecraft-flavoured speech bubble: dark plate, hairline, drop shadow. */
function drawBubble(
  ctx: CanvasRenderingContext2D,
  dog: DogState,
  feetY: number,
  viewW: number,
  alpha: number,
  message: string,
) {
  if (alpha < 0.04) return;

  ctx.save();
  ctx.globalAlpha = Math.min(1, alpha);
  ctx.font = POP_FONT;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  const pad = 12;
  const lh = 16;
  const lines = wrapMessage(ctx, message, Math.max(150, viewW - 40 - pad * 2));
  const bh = lines.length > 1 ? pad + lh * lines.length + 4 : 32;
  let tw = 0;
  for (const l of lines) tw = Math.max(tw, ctx.measureText(l).width);
  const bw = tw + pad * 2;
  const bx = Math.max(10, Math.min(viewW - bw - 10, dog.x - bw / 2));
  const by = feetY - 80 - bh;

  // pointer back down to the dog
  ctx.fillStyle = "rgba(8,8,11,0.94)";
  ctx.beginPath();
  ctx.moveTo(dog.x - 7, by + bh - 1);
  ctx.lineTo(dog.x + 7, by + bh - 1);
  ctx.lineTo(dog.x, by + bh + 11);
  ctx.closePath();
  ctx.fill();

  roundRectPath(ctx, bx, by, bw, bh, 5);
  ctx.fillStyle = "rgba(8,8,11,0.94)";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.stroke();

  const tx = bx + pad;
  const ty = by + (bh - lh * (lines.length - 1)) / 2 + 0.5;
  for (let i = 0; i < lines.length; i++) {
    const ly = ty + i * lh;
    ctx.fillStyle = "rgba(0,0,0,0.72)";
    ctx.fillText(lines[i], tx + 1.5, ly + 1.5);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(lines[i], tx, ly);
  }
  ctx.restore();
}

type Mode = "idle" | "walk" | "sit";

type Heart = { x: number; y: number; vy: number; life: number; s: number };

type DogState = {
  x: number;
  y: number;
  vy: number;
  dir: 1 | -1;
  mode: Mode;
  jumping: boolean;
  /** 0..1 blend into sitting */
  sit: number;
  gait: number;
  gaitSpeed: number;
  tail: number;
  tailSpeed: number;
  lookX: number;
  lookY: number;
  blink: number;
  blinkTimer: number;
  twitch: number;
  twitchTimer: number;
  restTimer: number;
  hopTimer: number;
  wanderTimer: number;
  targetX: number | null;
  hearts: Heart[];
  squish: number;
  /** 0..1 blend toward the pleased face — squinting with tongue out */
  happy: number;
  /** 0..1 fade for the speech bubble */
  bubble: number;
};

export default function MineDog() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionMq.matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let last = performance.now();
    let mouse = { x: -9999, y: -9999, has: false };

    const SPRITE_SCALE = 4.6; // px per sprite unit
    const GROUND_OFFSET = 46; // sits above the viewport floor
    const REACH = 260; // cursor influence radius

    const dog: DogState = {
      x: 140,
      y: 0,
      vy: 0,
      dir: 1,
      mode: "idle",
      jumping: false,
      sit: 0,
      gait: 0,
      gaitSpeed: 0,
      tail: 0,
      tailSpeed: 1.6,
      lookX: 1,
      lookY: 0,
      blink: 0,
      blinkTimer: 1.5,
      twitch: 0,
      twitchTimer: 3,
      restTimer: 0,
      hopTimer: 0,
      wanderTimer: 2,
      targetX: null,
      hearts: [],
      squish: 0,
      happy: 0,
      bubble: 0,
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dog.x = Math.min(Math.max(dog.x, 60), w - 60);
    };
    resize();

    const floor = () => h - GROUND_OFFSET;

    /* ── pick something to jump to ────────────────────────────── */
    const pickTarget = () => {
      const vh = window.innerHeight;
      const nodes = document.querySelectorAll<HTMLElement>(
        "main article, main h2, main h3, main .vm-wrap, main .reveal.is-visible",
      );
      const cands: { el: HTMLElement; cx: number; bottom: number; top: number }[] = [];
      nodes.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 40 || r.height < 12) return;
        if (r.bottom < 60 || r.top > vh - 60) return;
        cands.push({ el, cx: r.left + r.width / 2, bottom: r.bottom, top: r.top });
      });
      if (!cands.length) return null;

      // pick something a real walk away, currently on screen
      const viable = cands.filter((c) => {
        const dist = Math.abs(c.cx - dog.x);
        return dist > 110 && dist < w * 0.8;
      });
      const pool = viable.length ? viable : cands;
      return pool[Math.floor(Math.random() * pool.length)];
    };

    /* ── click: bark, jump, hearts ────────────────────────────── */
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const feet = floor() + dog.sit * 6;
      const nearX = Math.abs(px - dog.x) < 60 * SPRITE_SCALE * 0.28;
      const nearY = py > feet - 90 && py < feet + 30;
      if (!nearX || !nearY) return;
      dog.mode = "walk";
      dog.sit = 0;
      if (!dog.jumping) {
        dog.jumping = true;
        dog.vy = -6.4;
        dog.dir = px < dog.x ? -1 : 1;
      }
      dog.tailSpeed = 5.5;
      dog.hopTimer = 0.6;
      dog.bubble = 1;
      // donation link — wired up once donate.paypalUrl is set in lib/content.ts
      if (donate.paypalUrl) {
        window.open(donate.paypalUrl, "_blank", "noopener,noreferrer");
      }
      for (let i = 0; i < 5; i++) {
        dog.hearts.push({
          x: dog.x + (Math.random() - 0.5) * 30,
          y: feet - 44 - Math.random() * 16,
          vy: -34 - Math.random() * 26,
          life: 1,
          s: 11 + Math.random() * 6,
        });
      }
    };
    window.addEventListener("pointerdown", onClick);

    const onMove = (e: PointerEvent) => {
      mouse = { x: e.clientX, y: e.clientY, has: true };
    };
    const onLeave = () => {
      mouse = { ...mouse, has: false };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    /* ── per-frame simulation ─────────────────────────────────── */
    const step = (dt: number) => {
      const f = floor();
      const mx = mouse.x - dog.x;
      const my = mouse.y - (f - 46);
      const mDist = Math.hypot(mx, my);
      const cursorNear = mouse.has && mDist < REACH;

      /* idle timers */
      dog.blinkTimer -= dt;
      if (dog.blinkTimer <= 0) {
        dog.blink = 1;
        dog.blinkTimer = 1.8 + Math.random() * 3.4;
      }
      if (dog.blink > 0) dog.blink = Math.max(0, dog.blink - dt * 9);

      dog.twitchTimer -= dt;
      if (dog.twitchTimer <= 0) {
        dog.twitch = 1;
        dog.twitchTimer = 2.4 + Math.random() * 3.6;
      }
      if (dog.twitch > 0) dog.twitch = Math.max(0, dog.twitch - dt * 4.5);

      if (dog.hopTimer > 0) dog.hopTimer -= dt;

      /* look at the cursor when it is close, otherwise scan ahead */
      if (cursorNear) {
        dog.lookX += (Math.sign(mx || 1) - dog.lookX) * 0.12;
        dog.lookY += (Math.max(-1, Math.min(1, my / 160)) - dog.lookY) * 0.1;
      } else {
        dog.lookX += (dog.dir - dog.lookX) * 0.05;
        dog.lookY += (0 - dog.lookY) * 0.06;
      }

      /* ── decide what to do ─────────────────────────────── */
      if (cursorNear && mDist < 110) {
        dog.mode = "sit";
        dog.targetX = null;
      } else if (cursorNear) {
        dog.mode = "walk";
        dog.targetX = dog.x + mx * 0.65;
      } else {
        dog.mode = "walk";
        // only scout for a new destination while parked
        if (dog.targetX === null) {
          dog.wanderTimer -= dt;
          if (dog.wanderTimer <= 0 && !dog.jumping) {
            const target = pickTarget();
            if (target) {
              const jitter =
                (Math.random() - 0.5) *
                Math.min(target.el.getBoundingClientRect().width * 0.6, 150);
              dog.targetX = Math.max(50, Math.min(w - 50, target.cx + jitter));
            } else {
              dog.targetX = Math.max(50, Math.min(w - 50, dog.x + (Math.random() - 0.5) * 420));
            }
            // guarantee a real hop rather than a shuffle
            if (Math.abs(dog.targetX - dog.x) < 110) {
              const dir = Math.random() < 0.5 ? -1 : 1;
              dog.targetX = Math.max(
                50,
                Math.min(w - 50, dog.x + dir * (130 + Math.random() * 200)),
              );
            }
            dog.wanderTimer = 2.4 + Math.random() * 2.6;
          }
        }
      }

      /* ── move ─────────────────────────────────────────── */
      const wantSit = dog.mode === "sit" ? 1 : 0;
      dog.sit += (wantSit - dog.sit) * Math.min(1, dt * 6);

      let moving = false;
      if (dog.targetX !== null && !dog.jumping && dog.sit < 0.35) {
        const dx = dog.targetX - dog.x;
        if (Math.abs(dx) > 6) {
          const speed = Math.min(230, 105 + Math.abs(dx) * 0.55);
          dog.x += Math.sign(dx) * speed * dt;
          dog.dir = dx > 0 ? 1 : -1;
          moving = true;
        } else {
          dog.targetX = null;
        }
      }

      if (dog.jumping) {
        dog.vy += 20 * dt;
        dog.y += dog.vy * dt * 60;
        if (dog.y >= 0) {
          dog.y = 0;
          dog.jumping = false;
          dog.vy = 0;
          dog.squish = 1;
        }
      }
      if (dog.squish > 0) dog.squish = Math.max(0, dog.squish - dt * 4);

      /* idle hop when it has been still a while */
      if (!moving && !dog.jumping && dog.mode !== "sit") {
        dog.restTimer += dt;
        if (dog.restTimer > 3.4) {
          dog.restTimer = 0;
          dog.jumping = true;
          dog.vy = -4.6;
        }
      } else dog.restTimer = 0;

      /* gait */
      dog.gaitSpeed = moving ? 9.5 : 0;
      dog.gait += dog.gaitSpeed * dt;
      if (!moving) dog.gait *= 0.86;

      const happyTarget = cursorNear ? 1 : 0;
      dog.happy += (happyTarget - dog.happy) * Math.min(1, dt * 7);
      const bubbleTarget = cursorNear && mDist < 190 ? 1 : 0;
      dog.bubble += (bubbleTarget - dog.bubble) * Math.min(1, dt * 5);

      const happy = dog.mode === "sit" || mDist < REACH;
      dog.tailSpeed = dog.hopTimer > 0 ? 5.5 : happy ? 4.4 : 1.7;
      dog.tail += dog.tailSpeed * dt * (moving ? 1.4 : 1);

      dog.x = Math.max(46, Math.min(w - 46, dog.x));

      /* hearts */
      for (const ht of dog.hearts) {
        ht.y += ht.vy * dt;
        ht.vy += 18 * dt;
        ht.life -= dt * 0.75;
      }
      dog.hearts = dog.hearts.filter((ht) => ht.life > 0);
      if (dog.mode === "sit" && Math.random() < dt * 0.55) {
        dog.hearts.push({
          x: dog.x + dog.dir * 14 + (Math.random() - 0.5) * 14,
          y: f - 62,
          vy: -22,
          life: 1,
          s: 10,
        });
      }
    };

    /* ── render ───────────────────────────────────────────── */
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      const s = SPRITE_SCALE;
      const f = floor();
      const feetY = f + dog.y + dog.sit * 6;
      const squash = 1 - dog.squish * 0.16;
      const stretch = 1 + dog.squish * 0.2;

      // soft contact shadow
      const shW = (14 + (dog.jumping ? -Math.min(6, -dog.y / 14) : 0)) * s;
      ctx.save();
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.ellipse(dog.x, f + 8, Math.max(10, shW * 0.62), 3.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(dog.x, feetY);
      // sprite is authored bottom-origin; flip Y so it renders upright
      ctx.scale(dog.dir, -1);
      ctx.scale(stretch, squash);
      ctx.translate(0, dog.sit * 4);

      const swing = Math.sin(dog.gait) * 0.62;
      const swingB = Math.sin(dog.gait + Math.PI) * 0.62;
      const sitLift = dog.sit * 3.2;

      /* far legs (darker, behind body) */
      drawLeg(ctx, 5, 9, 6.2 - sitLift * 0.5, swingB * (1 - dog.sit), s, FUR_SHADE);
      drawLeg(ctx, 15, 9, 6.2 - sitLift * 0.5, swing * (1 - dog.sit), s, FUR_SHADE);

      /* tail */
      const wag = Math.sin(dog.tail) * (0.5 + dog.tailSpeed * 0.06);
      drawTail(ctx, 3, 11.4 + sitLift * 0.4, -0.5 - wag * 0.75, s);

      /* body — rises at the front when sitting */
      ctx.save();
      ctx.translate(0, sitLift);
      drawRects(ctx, BODY, s);
      drawRects(ctx, COLLAR_RECT, s);

      /* near legs (in front of body) */
      ctx.restore();
      drawLeg(ctx, 6.6, 9, 6.2 - sitLift * 0.5, swing * (1 - dog.sit), s, FUR_DARK);
      drawLeg(ctx, 16.6, 9, 6.2 - sitLift * 0.5, swingB * (1 - dog.sit), s, FUR_DARK);

      /* sitting front legs stay planted and lengthen */
      if (dog.sit > 0.02) {
        ctx.save();
        ctx.globalAlpha = dog.sit;
        drawLeg(ctx, 16.6, 9 + sitLift, 6.2 + sitLift, 0, s, FUR_DARK);
        ctx.restore();
      }

      /* head */
      ctx.save();
      ctx.translate(0, sitLift);
      const tilt = -dog.lookY * 0.16 + (dog.twitch > 0 ? Math.sin(dog.twitch * 12) * 0.04 : 0);
      ctx.translate(15, 12);
      ctx.rotate(tilt);
      ctx.translate(-15, -12);
      drawRects(ctx, HEAD, s);

      // ears — flick with the twitch
      const earFlick = dog.twitch > 0 ? Math.sin(dog.twitch * 14) * 0.22 : 0;
      for (const e of EAR) {
        ctx.save();
        ctx.translate((e.x + 1) * s, e.y * s);
        ctx.rotate(earFlick);
        ctx.fillStyle = e.c;
        ctx.fillRect(-s, 0, e.w * s, e.h * s);
        ctx.restore();
      }

      // eye — blinks and tracks the cursor; squints when pleased
      const eyeH = Math.max(0.4, 2 - Math.max(dog.blink, dog.happy * 1.5) * 1.7) * s;
      ctx.fillStyle = MUZZLE;
      ctx.fillRect(16 * s, 12.4 * s, 2.6 * s, 2.6 * s);
      ctx.fillStyle = EYE;
      ctx.fillRect(16.4 * s, 12.3 * s + (2.6 * s - eyeH) * 0.5, 1.9 * s, eyeH);

      // tongue lolling out of the muzzle
      if (dog.happy > 0.04) {
        ctx.save();
        ctx.globalAlpha = dog.happy;
        ctx.fillStyle = "#ef7f8c";
        ctx.fillRect(20.6 * s, 10.4 * s, 2.6 * s, 5.4 * s);
        ctx.fillStyle = "#d7626f";
        ctx.fillRect(21.75 * s, 10.4 * s, 0.5 * s, 5.4 * s);
        ctx.fillStyle = "#c95665";
        ctx.fillRect(20.6 * s, 10.4 * s, 2.6 * s, 0.7 * s);
        ctx.restore();
      }
      ctx.restore();

      ctx.restore();

      /* speech bubble */
      drawBubble(ctx, dog, feetY, w, dog.bubble, donate.hint);

      /* hearts */
      for (const ht of dog.hearts) {
        drawHeart(ctx, ht.x, ht.y, ht.s, Math.max(0, Math.min(1, ht.life)));
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(dt);
      render();
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    if (reduced) {
      // static standing pose, no simulation
      dog.x = Math.min(window.innerWidth - 90, window.innerWidth * 0.5);
      render();
    } else {
      startLoop();
    }

    const onResize = () => {
      resize();
      if (reduced) render();
    };
    window.addEventListener("resize", onResize);

    // The preference can change while the page is open — honour it live,
    // rather than only at mount, so toggling it needs no reload.
    const onMotionPref = () => {
      const next = motionMq.matches;
      if (next === reduced) return;
      reduced = next;
      if (reduced) {
        stopLoop();
        render();
      } else {
        startLoop();
      }
    };
    motionMq.addEventListener("change", onMotionPref);

    return () => {
      stopLoop();
      motionMq.removeEventListener("change", onMotionPref);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerdown", onClick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
