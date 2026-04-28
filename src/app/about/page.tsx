"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const shopPhotos = [
  { src: "/images/shop/unnamed-7.webp", alt: "Bridge Coffee interior with warm lighting and wood tables" },
  { src: "/images/shop/unnamed-6.webp", alt: "Seating area with natural light from floor-to-ceiling windows" },
  { src: "/images/shop/unnamed-5.webp", alt: "The counter at Bridge Coffee with the pastry case" },
  { src: "/images/shop/unnamed-4.webp", alt: "Cozy cafe corner with armchairs and pendant lighting" },
  { src: "/images/shop/unnamed-3.webp", alt: "Morning light pouring through the large east-facing windows" },
  { src: "/images/shop/2024-09-19-1.webp", alt: "Local artwork hung along the back wall" },
  { src: "/images/shop/unnamed-2.webp", alt: "Community tables where regulars work and meet" },
  { src: "/images/shop/2024-09-18-2.webp", alt: "Tall windows looking out onto 122nd Street" },
  { src: "/images/shop/2024-09-18-1.webp", alt: "Second interior view toward the kids' room doorway" },
  { src: "/images/shop/2024-09-18.webp", alt: "Warm amber lighting over the espresso bar at dusk" },
  { src: "/images/shop/unnamed-1.webp", alt: "A quiet reading corner with a cushioned bench" },
  { src: "/images/shop/2024-09-19.webp", alt: "Exterior of Bridge Coffee inside North Seattle Church" },
];

function PhotoCard({ photo, index }: { photo: { src: string; alt: string }; index: number }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative ${index === 0 ? "aspect-[4/3]" : "aspect-square"}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-espresso-light/40 animate-pulse" />
      )}
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className={`object-cover hover:scale-105 transition-transform duration-700 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const },
  viewport: { once: true, margin: "-80px" as const },
};

const hours = [
  { day: "Monday", time: "8 AM – 3 PM" },
  { day: "Tuesday", time: "8 AM – 3 PM" },
  { day: "Wednesday", time: "8 AM – 3 PM" },
  { day: "Thursday", time: "8 AM – 3 PM" },
  { day: "Friday", time: "8 AM – 3 PM" },
  { day: "Saturday", time: "Closed" },
  { day: "Sunday", time: "Closed" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/shop/unnamed-7.webp"
          alt="Bridge Coffee interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-espresso/70" />
        <motion.div className="relative text-center z-10" {...fadeInUp}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory tracking-tight">
            Our Story
          </h1>
          <p className="mt-4 text-lg text-ivory/60">
            A non-profit cafe in North Seattle since 2012.
          </p>
        </motion.div>
      </section>

      {/* Photo Grid — The Room */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-serif text-3xl md:text-5xl text-ivory tracking-tight">
              The Room
            </h2>
            <p className="mt-4 text-base text-ivory/50">
              Big windows. Good light. Kids&apos; room off the side.
              Bike rack out front.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {shopPhotos.slice(0, 9).map((photo, i) => (
              <motion.div
                key={photo.src}
                className={`relative overflow-hidden rounded-sm ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <PhotoCard photo={photo} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section id="find-us" className="py-20 md:py-28 px-6 bg-espresso-light">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center" {...fadeInUp}>
            <h2 className="font-serif text-3xl md:text-5xl text-ivory tracking-tight mb-12">
              Come say hi.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Address & Contact */}
              <div className="text-left">
                <h3 className="font-sans text-xs uppercase tracking-widest-plus text-amber mb-4">
                  Find Us
                </h3>
                <address className="not-italic space-y-2">
                  <a
                    href="https://maps.google.com/?q=2150+N+122nd+St+Seattle+WA+98133"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg text-ivory hover:text-amber transition-colors"
                  >
                    2150 N 122nd St
                    <br />
                    Seattle, WA 98133
                  </a>
                  <p className="text-sm text-ivory/40">
                    Inside North Seattle Church. Park in the church lot.
                  </p>
                  <a
                    href="tel:+12064578690"
                    className="block text-ivory/70 hover:text-amber transition-colors"
                  >
                    (206) 457-8690
                  </a>
                </address>
              </div>

              {/* Hours */}
              <div className="text-left">
                <h3 className="font-sans text-xs uppercase tracking-widest-plus text-amber mb-4">
                  Hours
                </h3>
                <div className="space-y-1.5">
                  {hours.map(({ day, time }) => (
                    <div key={day} className="flex justify-between text-sm max-w-[240px]">
                      <span className="text-ivory/50">{day}</span>
                      <span className={time === "Closed" ? "text-ivory/30" : "text-ivory/70"}>
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/order"
                className="inline-flex px-8 py-3 bg-amber text-espresso font-sans text-sm uppercase tracking-widest-plus rounded-sm hover:bg-amber-light transition-colors duration-300"
              >
                Order for Pickup
              </Link>
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJtz_tTE8RkFQRyyJO7XAnny4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 border border-amber/30 text-amber font-sans text-sm uppercase tracking-widest-plus rounded-sm hover:border-amber/60 transition-colors duration-300"
              >
                Leave a Review
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
