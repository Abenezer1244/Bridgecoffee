"use client";

import { motion } from "framer-motion";

interface StoryBeatProps {
  progress: number;
  progressStart: number;
  progressEnd: number;
  alignment: "left" | "center" | "right";
  children: React.ReactNode;
}

export default function StoryBeat({
  progress,
  progressStart,
  progressEnd,
  alignment,
  children,
}: StoryBeatProps) {
  const range = progressEnd - progressStart;
  const fadeInEnd = progressStart + range * 0.2;
  const fadeOutStart = progressEnd - range * 0.15;

  // Calculate opacity: fade in, stay, fade out
  let opacity = 0;
  if (progress < progressStart) {
    opacity = 0;
  } else if (progress < fadeInEnd) {
    opacity = (progress - progressStart) / (fadeInEnd - progressStart);
  } else if (progress < fadeOutStart) {
    opacity = 1;
  } else if (progress < progressEnd) {
    opacity = 1 - (progress - fadeOutStart) / (progressEnd - fadeOutStart);
  }

  // Slide direction based on alignment
  const slideOffset =
    alignment === "left" ? -40 : alignment === "right" ? 40 : 0;
  const yOffset = alignment === "center" ? 20 : 0;

  const translateX = slideOffset * (1 - Math.min(1, opacity * 2));
  const translateY = yOffset * (1 - Math.min(1, opacity * 2));

  const alignmentClass =
    alignment === "left"
      ? "items-start text-left pl-4 sm:pl-8 md:pl-16 lg:pl-24"
      : alignment === "right"
        ? "items-end text-right pr-4 sm:pr-8 md:pr-16 lg:pr-24"
        : "items-center text-center px-6";

  if (opacity <= 0.01) return null;

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col justify-center ${alignmentClass} max-w-full sm:max-w-5xl mx-auto`}
      style={{
        opacity,
        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
        textShadow: "0 2px 16px rgba(0,0,0,0.75), 0 1px 4px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </motion.div>
  );
}
