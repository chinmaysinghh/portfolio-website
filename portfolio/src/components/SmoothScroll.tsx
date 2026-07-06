"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetElement = document.querySelector(href) as HTMLElement | null;
      if (!targetElement) return;

      event.preventDefault();
      lenis.scrollTo(targetElement, {
        offset: 0,
        lerp: 0.08,
        duration: 1.1,
      });
    };

    document.addEventListener("click", handleAnchorClick);

    const onChange = () => {
      if (prefersReducedMotion.matches) {
        lenis.destroy();
        window.cancelAnimationFrame(rafId);
      }
    };

    prefersReducedMotion.addEventListener("change", onChange);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      prefersReducedMotion.removeEventListener("change", onChange);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
