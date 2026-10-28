"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

/* --------------------------------------------------------------------------
 * VenomCollaborateButton
 *
 * A liquid-glass bar. Symbiote particles orbit its outline; when the cursor
 * comes within range they wake, stretch toward it, and once it is close enough
 * they bind it — the pointer is magnetically pulled onto the button while
 * strands bridge the gap between bar, blob and cursor.
 * ------------------------------------------------------------------------ */

type Particle = {
  a: number; // base angle around the bar
  x: number; // current position (canvas space)
  y: number;
  vx: number; // velocity for the spring
  vy: number;
  ox: number; // strand origin, on the button outline
  oy: number;
  ph: number; // idle bob phase
  ph0: number; // bob speed
  sz: number; // blob radius
  mag: number; // 0..1 magnetism toward the cursor
  str: number; // current strand visibility
  wob: number;
};

const TETHER_MAX = 300; // cursor acquire range around the bar (px)
const HALO = 170; // canvas padding around the bar
const BIND_RADIUS = 52; // closer than this == bound
const PULL = 260; // particle proximity falloff
const RING = 26; // radius of the swarm around the cursor
const TINT = [255, 122, 201]; // #ff7ac9
const NEAR_BLACK = [10, 10, 13];

type Variant = "onDark" | "onLight";

export default function VenomCollaborateButton({
  href = "/collaborate",
  label = "Collaborate",
  variant = "onDark",
  minWidth = 340,
  height = 66,
  fontSize = 15,
  className = "",
}: {
  href?: string;
  label?: string;
  variant?: Variant;
  minWidth?: number;
  height?: number;
  fontSize?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, inside: false, active: false });
  const frameRef = useRef({ cx: 0, cy: 0, rx: 0, ry: 0, w: 0, h: 0, dpr: 1 });
  const motionOkRef = useRef(true);

  const [hovered, setHovered] = useState(false);

  const style = {
    "--vm-w": `${minWidth}px`,
    "--vm-h": `${height}px`,
    "--vm-fs": `${fontSize}px`,
  } as CSSProperties;

  const build = useCallback(() => {
    const { cx, cy, rx, ry } = frameRef.current;
    const pad = 24;
    const sx = rx + pad;
    const sy = ry + pad;
    const n = Math.max(46, Math.min(86, Math.round((rx + ry) * 0.62)));
    const prev = particlesRef.current;
    const list: Particle[] = [];

    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const ux = Math.cos(a);
      const uy = Math.sin(a);
      const p = prev[i];
      list.push({
        a,
        x: p ? p.x : cx + ux * sx * (1 + Math.random() * 0.5),
        y: p ? p.y : cy + uy * sy * (1 + Math.random() * 0.5),
        vx: 0,
        vy: 0,
        ox: cx + ux * rx * 0.97,
        oy: cy + uy * ry * 0.97,
        ph: p ? p.ph : Math.random() * Math.PI * 2,
        ph0: 0.008 + Math.random() * 0.016,
        sz: 1.3 + Math.random() * 2.5,
        mag: p ? p.mag : 0,
        str: p ? p.str : 0,
        wob: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = list;
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionMq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    motionOkRef.current = !motionMq?.matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w < 4 || h < 4) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = w + HALO * 2;
      const ch = h + HALO * 2;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      // pin the canvas so its centre lands exactly on the button centre
      canvas.style.left = `${-HALO}px`;
      canvas.style.top = `${-HALO}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const bw = Math.min(minWidth, w - 8);
      frameRef.current = {
        cx: cw / 2,
        cy: ch / 2,
        rx: bw / 2,
        ry: h / 2,
        w: cw,
        h: ch,
        dpr,
      };
      build();
      drawStatic();
    };

    const drawStatic = () => {
      const { cx, cy, rx, ry, w, h } = frameRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle =
        variant === "onLight"
          ? `rgba(${NEAR_BLACK[0]},${NEAR_BLACK[1]},${NEAR_BLACK[2]},0.45)`
          : `rgba(${TINT[0]},${TINT[1]},${TINT[2]},0.62)`;
      for (const p of particlesRef.current) {
        const x = cx + Math.cos(p.a) * (rx + 24);
        const y = cy + Math.sin(p.a) * (ry + 24);
        ctx.beginPath();
        ctx.arc(x, y, p.sz, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* ── idle patrol ──────────────────────────────────────────── */
    const idle = () => {
      const { cx, cy, rx, ry, w, h } = frameRef.current;
      const list = particlesRef.current;
      const sx = rx + 24;
      const sy = ry + 24;
      ctx.clearRect(0, 0, w, h);

      for (const p of list) {
        p.mag += (0 - p.mag) * 0.05;
        p.str += (0 - p.str) * 0.1;
        p.ph += p.ph0;

        const swell = Math.sin(p.ph) * 7;
        const tx = cx + Math.cos(p.a) * (sx + swell);
        const ty = cy + Math.sin(p.a) * (sy + swell * 0.7);
        p.vx = (p.vx + (tx - p.x) * 0.09) * 0.78;
        p.vy = (p.vy + (ty - p.y) * 0.09) * 0.78;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz * 0.78, 0, Math.PI * 2);
        ctx.fillStyle =
          variant === "onLight"
            ? `rgba(${NEAR_BLACK[0]},${NEAR_BLACK[1]},${NEAR_BLACK[2]},0.4)`
            : `rgba(${TINT[0]},${TINT[1]},${TINT[2]},0.6)`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(idle);
    };

    /* ── hunt: particles converge, strands bind, cursor tethered ─ */
    const hunt = () => {
      const { cx, cy, rx, ry, w, h } = frameRef.current;
      const pointer = pointerRef.current;
      const list = particlesRef.current;
      const heavy = variant === "onLight" ? 1.3 : 1;

      ctx.clearRect(0, 0, w, h);

      const rect = buttonRef.current?.getBoundingClientRect();
      const canvasBox = canvas.getBoundingClientRect();
      const curX = pointer.x;
      const curY = pointer.y;
      const distC = Math.hypot(curX - cx, curY - cy);

      const bound = Boolean(rect) && pointer.inside && distC < BIND_RADIUS;
      let bx = 0;
      let by = 0;
      if (bound && rect) {
        const btnCx = rect.left + rect.width / 2 - canvasBox.left;
        const btnCy = rect.top + rect.height / 2 - canvasBox.top;
        bx = curX + (btnCx - curX) * 0.09;
        by = curY + (btnCy - curY) * 0.09;
      }

      for (const p of list) {
        // proximity of this particle's resting spot to the cursor drives it
        const restX = cx + Math.cos(p.a) * (rx + 24);
        const restY = cy + Math.sin(p.a) * (ry + 24);
        const dRest = Math.hypot(curX - restX, curY - restY);
        const proximity = Math.max(0, 1 - dRest / PULL);
        const activity = pointer.inside ? proximity : 0;

        p.mag += (activity - p.mag) * 0.09;
        p.ph += p.ph0 * (1 + p.mag * 3);

        // orbit, offset by a small ring once magnetised so blobs don't stack
        const swell = Math.sin(p.ph) * (7 - p.mag * 5);
        const ox = cx + Math.cos(p.a) * (rx + 24 + swell);
        const oy = cy + Math.sin(p.a) * (ry + 24 + swell * 0.7);
        const ringX = curX + Math.cos(p.a) * RING * heavy;
        const ringY = curY + Math.sin(p.a) * RING * 0.72;

        const tx = ox + (ringX - ox) * p.mag;
        const ty = oy + (ringY - oy) * p.mag;

        p.vx = (p.vx + (tx - p.x) * 0.14) * 0.74;
        p.vy = (p.vy + (ty - p.y) * 0.14) * 0.74;
        p.x += p.vx;
        p.y += p.vy;

        const wantStr = p.mag > 0.28 && dRest < 300;
        p.str += ((wantStr ? 1 : 0) - p.str) * 0.14;

        const blobA = variant === "onLight" ? 0.45 + 0.42 * p.mag : 0.4 + 0.45 * p.mag;
        const fill =
          variant === "onLight"
            ? `rgba(${NEAR_BLACK[0]},${NEAR_BLACK[1]},${NEAR_BLACK[2]},${blobA})`
            : `rgba(${TINT[0]},${TINT[1]},${TINT[2]},${blobA})`;

        /* strand: button outline → blob */
        if (p.str > 0.03) {
          const segs = 10;
          ctx.beginPath();
          for (let s = 0; s <= segs; s++) {
            const t = s / segs;
            const mx = p.ox + (p.x - p.ox) * t;
            const my = p.oy + (p.y - p.oy) * t;
            const sag = Math.sin(t * Math.PI) * 8 * Math.sin(p.ph + t * 3);
            const nx = Math.cos(p.a + Math.PI / 2);
            const ny = Math.sin(p.a + Math.PI / 2);
            const px = mx + nx * sag;
            const py = my + ny * sag;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          const lw = (0.5 + p.sz * 0.4) * p.str * heavy;
          ctx.lineWidth = Math.max(0.4, lw);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.strokeStyle =
            variant === "onLight"
              ? "rgba(10,10,13,0.45)"
              : `rgba(${TINT[0]},${TINT[1]},${TINT[2]},${0.3 + 0.4 * p.str})`;
          ctx.stroke();

          /* tendril: blob → cursor */
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          const tn = 6;
          for (let s = 1; s <= tn; s++) {
            const t = s / tn;
            const tx2 = p.x + (curX - p.x) * t;
            const ty2 = p.y + (curY - p.y) * t;
            const jitter = Math.sin(p.ph * 2 + t * 7) * 4 * (1 - t) * p.str;
            ctx.lineTo(tx2 + jitter, ty2 - jitter);
          }
          ctx.lineWidth = Math.max(0.4, lw * 0.65);
          ctx.strokeStyle =
            variant === "onLight"
              ? "rgba(10,10,13,0.4)"
              : `rgba(${TINT[0]},${TINT[1]},${TINT[2]},${0.24 + 0.42 * p.mag})`;
          ctx.stroke();
        }

        /* blob */
        const rad = p.sz * heavy * (1 + p.mag * 0.45);
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();

        if (p.mag > 0.45 && variant === "onDark") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * 0.36, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.55 * p.mag})`;
          ctx.fill();
        }
      }

      /* bind the pointer: drag it onto the bar */
      if (bx !== 0 || by !== 0) {
        if (Math.hypot(bx - curX, by - curY) > 1.5) {
          try {
            window.dispatchEvent(
              new MouseEvent("mousemove", { clientX: bx, clientY: by, bubbles: true }),
            );
          } catch {
            /* synthetic events are a progressive enhancement */
          }
          pointer.x = bx;
          pointer.y = by;
        }
      }

      rafRef.current = requestAnimationFrame(hunt);
    };

    const startIdle = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(idle);
    };
    const startHunt = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(hunt);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const pointer = pointerRef.current;
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside =
        pointer.x > -TETHER_MAX &&
        pointer.x < rect.width + TETHER_MAX &&
        pointer.y > -TETHER_MAX &&
        pointer.y < rect.height + TETHER_MAX;

      if (!pointer.active && pointer.inside) {
        pointer.active = true;
        if (motionOkRef.current) startHunt();
      } else if (pointer.active && !pointer.inside) {
        pointer.active = false;
        if (motionOkRef.current) startIdle();
        else drawStatic();
      }
    };

    const onLeave = () => {
      pointerRef.current.inside = false;
      pointerRef.current.active = false;
      if (motionOkRef.current) startIdle();
      else drawStatic();
    };

    const startOrDraw = () => {
      if (motionOkRef.current) startIdle();
      else drawStatic();
    };
    startOrDraw();

    // The preference can change while the page is open — honour it live,
    // rather than only at mount, so toggling it needs no reload.
    const onMotionPref = () => {
      const next = !motionMq?.matches;
      if (next === motionOkRef.current) return;
      motionOkRef.current = next;
      startOrDraw();
    };
    motionMq?.addEventListener?.("change", onMotionPref);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      motionMq?.removeEventListener?.("change", onMotionPref);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [build, minWidth, variant]);

  const dark = variant === "onDark";

  return (
    <div ref={wrapRef} className={`vm-wrap ${className}`} style={style}>
      <canvas ref={canvasRef} aria-hidden="true" className="vm-canvas" />
      <Link
        ref={buttonRef}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className={`vm-btn ${dark ? "vm-btn--dark" : "vm-btn--light"} ${hovered ? "is-hot" : ""}`}
      >
        <span className="vm-skin" aria-hidden="true" />
        <span className="vm-label">{label}</span>
        <span className="vm-arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path
              d="M4.5 11.5L11.5 4.5M5.5 4.5h6v6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}
