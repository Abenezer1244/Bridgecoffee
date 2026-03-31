"use client";

import { useEffect, useState, useRef, RefObject } from "react";

export function useScrollProgress(containerRef: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = container.offsetHeight;
      const scrollableDistance = containerHeight - windowHeight;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      // How far past the top of the container we've scrolled
      const scrolled = -rect.top;
      const raw = scrolled / scrollableDistance;
      const clamped = Math.max(0, Math.min(1, raw));

      setProgress(clamped);
    };

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [containerRef]);

  return progress;
}
