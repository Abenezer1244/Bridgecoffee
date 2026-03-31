"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "/menu" },
  { label: "Craft", href: "#craft" },
  { label: "Location", href: "#location" },
  { label: "Order", href: "/order" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-[rgba(13,10,7,0.82)] backdrop-blur-[12px]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: Brand */}
          <Link href="/" className="font-serif text-xl text-ivory tracking-tight">
            Bridge Coffee
          </Link>

          {/* Center: Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/order"
              className="hidden md:inline-flex px-5 py-2 border border-amber/60 text-amber text-xs uppercase tracking-widest-plus rounded-sm hover:border-amber hover:shadow-[0_0_12px_rgba(200,135,58,0.15)] hover:scale-[1.02] transition-all duration-300"
            >
              Order Now
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block w-5 h-[1.5px] bg-ivory transition-transform duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-ivory transition-opacity duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-ivory transition-transform duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(13,10,7,0.95)] backdrop-blur-[16px] flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                {link.href.startsWith("#") ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="font-sans text-2xl uppercase tracking-widest-plus text-ivory/70 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-sans text-2xl uppercase tracking-widest-plus text-ivory/70 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              <Link
                href="/order"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-3 border border-amber/60 text-amber text-sm uppercase tracking-widest-plus rounded-sm"
              >
                Order Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}) {
  const isInternal = !href.startsWith("#");
  const className =
    "relative font-sans text-xs uppercase tracking-widest-plus text-ivory/60 hover:text-ivory transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-amber after:transition-all after:duration-300 hover:after:w-full";

  if (isInternal) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
