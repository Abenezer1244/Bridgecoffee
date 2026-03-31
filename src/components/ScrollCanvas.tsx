"use client";

import { useRef, useEffect, useCallback } from "react";

interface ScrollCanvasProps {
  progress: number;
  draw: (canvas: HTMLCanvasElement, progress: number) => void;
  currentAlt: string;
}

export default function ScrollCanvas({
  progress,
  draw,
  currentAlt,
}: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastProgressRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    // Force redraw after resize
    lastProgressRef.current = -1;
  }, []);

  // Handle canvas resize
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only redraw if progress actually changed
    if (Math.abs(progress - lastProgressRef.current) < 0.0001) return;
    lastProgressRef.current = progress;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      // Reset transform before drawing (since we scaled for DPR)
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.save();
        // Draw at logical pixels (DPR scaling already applied)
        draw(canvas, progress);
        ctx.restore();
      }
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [progress, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="sticky top-0 w-full h-screen"
      style={{ willChange: "transform" }}
      role="img"
      aria-label={currentAlt}
    />
  );
}
