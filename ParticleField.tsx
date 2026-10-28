"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  hue: string;
  tw: number;
};

const COLORS = ["#ff9ec9", "#ffffff", "#9b6bff", "#ffb9d8", "#cbb6ff"];

/**
 * Restrained particle field behind the hero: a few dozen slow-drifting motes.
 * Renders a single static frame when the user prefers reduced motion.
 */
export default function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionMq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    let reduced = !!motionMq?.matches;

    let raf = 0;
    let width = 0;
    let height = 0;
    const particles: Particle[] = [];

    const seed = () => {
      const count = Math.min(56, Math.max(22, Math.round((width * height) / 26000)));
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.5,
          vx: (Math.random() - 0.5) * 0.14,
          vy: -(Math.random() * 0.22 + 0.05),
          a: Math.random() * 0.45 + 0.15,
          hue: COLORS[Math.floor(Math.random() * COLORS.length)],
          tw: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (advance: boolean) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (advance) {
          p.x += p.vx;
          p.y += p.vy;
          p.tw += 0.018;
          if (p.y < -6) {
            p.y = height + 6;
            p.x = Math.random() * width;
          }
          if (p.x < -6) p.x = width + 6;
          if (p.x > width + 6) p.x = -6;
        }
        const alpha = p.a * (0.65 + 0.35 * Math.sin(p.tw));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.hue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw(reduced);

    if (!reduced) start();

    const ro = new ResizeObserver(() => {
      resize();
      draw(reduced);
    });
    ro.observe(canvas);

    // The preference can change while the page is open — honour it live,
    // rather than only at mount, so toggling it needs no reload.
    const onMotionPref = () => {
      const next = !!motionMq?.matches;
      if (next === reduced) return;
      reduced = next;
      if (reduced) {
        stop();
        draw(false);
      } else {
        start();
      }
    };
    motionMq?.addEventListener?.("change", onMotionPref);

    return () => {
      stop();
      ro.disconnect();
      motionMq?.removeEventListener?.("change", onMotionPref);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
