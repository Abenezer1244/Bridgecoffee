"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

export default function LoadingScreen({
  progress,
  isLoaded,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-ivory mb-8">
            Bridge Coffee
          </h2>

          {/* Progress bar */}
          <div className="w-[min(192px,60vw)] h-[2px] bg-espresso-light rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          <p className="mt-4 text-xs uppercase tracking-widest text-amber-light/50">
            {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
