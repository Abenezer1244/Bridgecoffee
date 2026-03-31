"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useImageSequence } from "@/hooks/useImageSequence";
import { imageSequence } from "@/lib/images";
import ScrollCanvas from "./ScrollCanvas";
import LoadingScreen from "./LoadingScreen";

interface ScrollSectionProps {
  children?: (progress: number) => React.ReactNode;
}

export default function ScrollSection({ children }: ScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);
  const { isLoaded, loadProgress, draw, getCurrentAlt } =
    useImageSequence(imageSequence);

  return (
    <>
      <LoadingScreen progress={loadProgress} isLoaded={isLoaded} />

      <div
        ref={containerRef}
        className="relative"
        style={{ height: "500vh" }}
      >
        <ScrollCanvas
          progress={progress}
          draw={draw}
          currentAlt={getCurrentAlt(progress)}
        />

        {/* Story beats overlay — positioned above canvas */}
        {children && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="sticky top-0 h-screen flex items-center">
              {children(progress)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
