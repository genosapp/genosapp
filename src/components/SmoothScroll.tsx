"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerSections, updateScroll } from "@/lib/scrollProgress";

const SECTION_IDS = ["top", "services", "work", "aura", "process", "contact"];

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const unregister = registerSections(SECTION_IDS);
    // Seed initial state before any scroll event fires.
    updateScroll(window.scrollY);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      const onScroll = () => updateScroll(window.scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        unregister();
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      updateScroll(scroll);
    });

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      unregister();
    };
  }, []);

  return <>{children}</>;
}
