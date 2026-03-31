"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroCTA() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-espresso relative">
      {/* Subtle top gradient to blend with canvas */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-espresso to-transparent" />

      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-ivory to-amber tracking-tight">
          Drink something real.
        </h2>

        <p className="mt-6 font-serif text-xl md:text-2xl text-ivory/80">
          Handcrafted coffee. Every single day.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/menu"
            className="pointer-events-auto px-8 py-3 bg-amber text-espresso font-sans text-sm uppercase tracking-widest-plus rounded-sm hover:bg-amber-light transition-colors duration-300"
          >
            Explore Our Menu
          </Link>
          <a
            href="https://maps.google.com/?q=2150+N+122nd+St+Seattle+WA+98133"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto px-8 py-3 border border-amber/40 text-amber font-sans text-sm uppercase tracking-widest-plus rounded-sm hover:border-amber hover:text-amber-light transition-colors duration-300"
          >
            Find Us
          </a>
        </div>

        <p className="mt-8 text-xs uppercase tracking-widest text-ivory/30">
          Open daily. Sourced honestly. Served with care.
        </p>
      </motion.div>
    </section>
  );
}
