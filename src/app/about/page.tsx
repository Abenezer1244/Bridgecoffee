"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const shopPhotos = [
  { src: "/images/shop/unnamed-7.webp", alt: "Bridge Coffee interior" },
  { src: "/images/shop/unnamed-6.webp", alt: "Bridge Coffee seating area" },
  { src: "/images/shop/unnamed-5.webp", alt: "Bridge Coffee counter" },
  { src: "/images/shop/unnamed-4.webp", alt: "Bridge Coffee atmosphere" },
  { src: "/images/shop/unnamed-3.webp", alt: "Bridge Coffee natural light" },
  { src: "/images/shop/2024-09-19-1.webp", alt: "Bridge Coffee art on walls" },
  { src: "/images/shop/unnamed-2.webp", alt: "Bridge Coffee community space" },
  { src: "/images/shop/2024-09-18-2.webp", alt: "Bridge Coffee windows" },
  { src: "/images/shop/2024-09-18-1.webp", alt: "Bridge Coffee interior view" },
  { src: "/images/shop/2024-09-18.webp", alt: "Bridge Coffee warm lighting" },
  { src: "/images/shop/unnamed-1.webp", alt: "Bridge Coffee cozy corner" },
  { src: "/images/shop/2024-09-19.webp", alt: "Bridge Coffee exterior" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const },
  viewport: { once: true, margin: "-80px" as const },
};

const hours = [
  { day: "Monday", time: "8 AM – 3 PM" },
  { day: "Tuesday", time: "8 AM – 3 PM" },
  { day: "Wednesday", time: "8 AM – 4 PM" },
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
          alt="Bridge Coffee shop interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-espresso/70" />
        <motion.div className="relative text-center z-10" {...fadeInUp}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-ivory to-amber tracking-tight">
            Our Story
          </h1>
          <p className="mt-4 text-lg text-ivory/60">
            A neighborhood coffee shop in North Seattle.
          </p>
        </motion.div>
      </section>

      {/* Origin */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp}>
            <h2 className="font-serif text-3xl md:text-5xl text-ivory tracking-tight mb-8">
              More than just coffee.
            </h2>
            <div className="space-y-5 text-base md:text-lg leading-relaxed">
              <p>
                Bridge Coffee was born from a simple idea: that a great cup of
                coffee can brighten anyone&apos;s day. Nestled inside North
                Seattle Church at 2150 N 122nd Street, we&apos;re a
                neighborhood gathering place where the coffee is always fresh,
                the staff is always friendly, and everyone is welcome.
              </p>
              <p>
                We&apos;re not trying to be fancy. We&apos;re just trying to
                serve great coffee — lattes pulled with care, French press
                brewed to perfection, and pastries baked with real ingredients.
                Our caramel lattes and orange hazelnut buns have become local
                favorites.
              </p>
              <p className="text-ivory/40 italic">
                &ldquo;We&apos;re just a neighborhood coffee shop trying to
                brighten everyone&apos;s day one cup at a time.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-28 px-6 bg-espresso-light">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp}>
            <h2 className="font-sans text-xs uppercase tracking-widest-plus text-amber mb-6">
              Our Philosophy
            </h2>
            <h3 className="font-serif text-3xl md:text-5xl text-ivory tracking-tight mb-8">
              Honest coffee,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light">
                honestly made.
              </span>
            </h3>
            <div className="space-y-5 text-base md:text-lg leading-relaxed">
              <p>
                Every cup starts with quality beans sourced from family farms
                and roasted in small batches. We care about what goes into your
                drink — no shortcuts, no artificial flavors, just real
                ingredients.
              </p>
              <p>
                Our baristas aren&apos;t just making drinks — they&apos;re
                crafting experiences. The perfect temperature, the right grind,
                the ideal extraction. It all matters, and we take the time to
                get it right.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Grid — The Space */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-serif text-3xl md:text-5xl text-ivory tracking-tight">
              The Space
            </h2>
            <p className="mt-4 text-base text-ivory/50">
              Big windows. Natural light. Local art. Great music.
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
                <div className={`relative ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-20 md:py-28 px-6 bg-espresso-light">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center" {...fadeInUp}>
            <h2 className="font-serif text-3xl md:text-5xl text-ivory tracking-tight mb-12">
              Come say hi.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Address & Contact */}
              <div className="text-left">
                <h3 className="font-sans text-xs uppercase tracking-widest-plus text-amber mb-4">
                  Location
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
                    Located in North Seattle Church
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

            <div className="mt-12">
              <Link
                href="/order"
                className="inline-flex px-8 py-3 bg-amber text-espresso font-sans text-sm uppercase tracking-widest-plus rounded-sm hover:bg-amber-light transition-colors duration-300"
              >
                Order for Pickup
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
