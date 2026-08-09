"use client";

import { useEffect, useState, RefObject } from "react";

/**
 * Returns a 0→1 progress value as the user scrolls through `ref`'s element.
 * 0 = top of the section just reached the top of the viewport.
 * 1 = section has scrolled past by (section height - viewport height).
 *
 * Give the section extra height (e.g. min-h-[220vh]) and pin its content
 * with `sticky top-0 h-screen` so there's scroll distance to sample from.
 */
export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    function calc() {
      const rect = el!.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = -rect.top;
      const p = Math.min(Math.max(scrolled / total, 0), 1);
      setProgress(p);
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    }

    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return progress;
}

/** Linear interpolation helper for driving transforms off scroll progress. */
export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

// Shared fade window so multiple elements (image, nav) vanish in sync.
// Fully visible until FADE_START, eases to 0 by FADE_END (fractions of
// the 0→1 scroll progress). Separating this from the position lerp is
// what makes elements glide out and disappear, rather than just parking
// in a corner and sitting on top of the content below forever.
const FADE_START = 0.55;
const FADE_END = 0.9;

export function fadeOpacity(progress: number) {
  if (progress <= FADE_START) return 1;
  if (progress >= FADE_END) return 0;
  const t = (progress - FADE_START) / (FADE_END - FADE_START);
  return 1 - t * t; // ease-out: lingers a touch, then drops away
}