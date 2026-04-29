"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ImageFrame } from "@/types";

interface UseImageSequenceReturn {
  isLoaded: boolean;
  loadProgress: number;
  draw: (canvas: HTMLCanvasElement, progress: number) => void;
  getCurrentAlt: (progress: number) => string;
}

// Cubic ease-in-out for smooth dissolves
function easeInOutCubic(t: number): number {
  return t * t * (3 - 2 * t);
}

// Draw an image with cover-fit (like CSS object-fit: cover)
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  parallaxOffset: number,
  scale: number = 1
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth: number;
  let drawHeight: number;

  if (imgRatio > canvasRatio) {
    // Image is wider than canvas — fit height
    drawHeight = canvasHeight * scale;
    drawWidth = drawHeight * imgRatio;
  } else {
    // Image is taller than canvas — fit width
    drawWidth = canvasWidth * scale;
    drawHeight = drawWidth / imgRatio;
  }

  const x = (canvasWidth - drawWidth) / 2;
  const y = (canvasHeight - drawHeight) / 2 + parallaxOffset;

  ctx.drawImage(img, x, y, drawWidth, drawHeight);
}

// Draw radial vignette overlay
function drawVignette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.max(width, height) * 0.7;

  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    radius * 0.3,
    centerX,
    centerY,
    radius
  );
  gradient.addColorStop(0, "rgba(13, 10, 7, 0)");
  gradient.addColorStop(1, "rgba(13, 10, 7, 0.3)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

export function useImageSequence(
  frames: ImageFrame[]
): UseImageSequenceReturn {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const reducedMotionRef = useRef(false);

  // Preload all images
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let loadedCount = 0;
    const total = frames.length;
    const images: HTMLImageElement[] = new Array(total);

    const onLoad = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / total) * 100));
      if (loadedCount === total) {
        imagesRef.current = images;
        setIsLoaded(true);
      }
    };

    frames.forEach((frame, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = onLoad;
      img.onerror = onLoad; // Count errors as loaded to avoid stuck state
      img.src = frame.src;
      images[i] = img;
    });

    return () => {
      // Cleanup: cancel any pending loads
      images.forEach((img) => {
        if (img) img.src = "";
      });
    };
  }, [frames]);

  // Get the current alt text based on progress
  const getCurrentAlt = useCallback(
    (progress: number): string => {
      for (let i = frames.length - 1; i >= 0; i--) {
        if (progress >= frames[i].startProgress) {
          return frames[i].alt;
        }
      }
      return frames[0].alt;
    },
    [frames]
  );

  // Draw the current frame to canvas
  const draw = useCallback(
    (canvas: HTMLCanvasElement, progress: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx || imagesRef.current.length === 0) return;

      const { width, height } = canvas;
      const reducedMotion = reducedMotionRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Fill with background color in case images don't cover
      ctx.fillStyle = "#0D0A07";
      ctx.fillRect(0, 0, width, height);

      // Find current and next frame indices
      let currentIndex = 0;
      for (let i = frames.length - 1; i >= 0; i--) {
        if (progress >= frames[i].startProgress) {
          currentIndex = i;
          break;
        }
      }

      const currentFrame = frames[currentIndex];
      const currentImg = imagesRef.current[currentIndex];

      if (!currentImg || !currentImg.naturalWidth) return;

      // Calculate blend factor within current frame's range
      const frameRange = currentFrame.endProgress - currentFrame.startProgress;
      const frameProgress =
        (progress - currentFrame.startProgress) / frameRange;

      // Parallax offset (images move at 0.6x scroll speed)
      const parallaxOffset = reducedMotion
        ? 0
        : (progress - 0.5) * height * 0.1;

      // Ken Burns effect on first image (hero)
      const kenBurnsScale =
        currentIndex === 0 && !reducedMotion
          ? 1 + frameProgress * 0.05
          : 1;

      // Draw current image
      ctx.globalAlpha = 1;
      drawImageCover(ctx, currentImg, width, height, parallaxOffset * 0.6, kenBurnsScale);

      // Cross-dissolve to next image in the transition zone
      const nextIndex = currentIndex + 1;
      if (nextIndex < frames.length) {
        const nextImg = imagesRef.current[nextIndex];
        if (nextImg && nextImg.naturalWidth) {
          // Start dissolving in the last 40% of each frame's range
          const dissolveStart = 0.6;
          if (frameProgress > dissolveStart) {
            const dissolveProgress =
              (frameProgress - dissolveStart) / (1 - dissolveStart);
            const blendFactor = reducedMotion
              ? dissolveProgress > 0.5
                ? 1
                : 0
              : easeInOutCubic(dissolveProgress);

            ctx.globalAlpha = blendFactor;
            drawImageCover(ctx, nextImg, width, height, parallaxOffset * 0.6, 1);
          }
        }
      }

      // Dark overlay — improves text contrast on all images
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = "#0D0A07";
      ctx.fillRect(0, 0, width, height);

      // Draw vignette overlay
      ctx.globalAlpha = 1;
      drawVignette(ctx, width, height);
    },
    [frames, isLoaded]
  );

  return { isLoaded, loadProgress, draw, getCurrentAlt };
}
