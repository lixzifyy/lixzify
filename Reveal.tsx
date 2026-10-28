"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Element to render; useful for semantic sectioning. */
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * Scroll-triggered entrance. The element is hidden by CSS until it enters the
 * viewport, then fades up once. Reduced-motion users get the final state
 * immediately (see globals.css).
 */
export default function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement>}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
