import Link from "next/link";

const hours = [
  { day: "Monday", time: "8 AM – 3 PM" },
  { day: "Tuesday", time: "8 AM – 3 PM" },
  { day: "Wednesday", time: "8 AM – 3 PM" },
  { day: "Thursday", time: "8 AM – 3 PM" },
  { day: "Friday", time: "8 AM – 3 PM" },
  { day: "Saturday", time: "Closed" },
  { day: "Sunday", time: "Closed" },
];

export default function Footer() {
  return (
    <footer id="location" className="bg-espresso-light border-t border-amber/10">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-ivory mb-4">
              Bridge Coffee
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              A non-profit cafe in North Seattle since 2012. Coffee,
              community, and a table for whoever needs one.
            </p>
            <p className="mt-4 text-xs text-ivory/30">
              Inside North Seattle Church · 2150 N 122nd St
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest-plus text-amber mb-4">
              Hours
            </h4>
            <div className="space-y-1.5">
              {hours.map(({ day, time }) => (
                <div
                  key={day}
                  className="flex justify-between text-sm max-w-[220px]"
                >
                  <span className="text-ivory/50">{day}</span>
                  <span className={time === "Closed" ? "text-ivory/30" : "text-ivory/70"}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest-plus text-amber mb-4">
              Visit Us
            </h4>
            <address className="not-italic space-y-2 text-sm">
              <a
                href="https://maps.google.com/?q=2150+N+122nd+St+Seattle+WA+98133"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-ivory/70 hover:text-amber transition-colors"
              >
                2150 N 122nd St
                <br />
                Seattle, WA 98133
              </a>
              <a
                href="tel:+12064578690"
                className="block text-ivory/70 hover:text-amber transition-colors"
              >
                (206) 457-8690
              </a>
            </address>

            <div className="mt-6 flex gap-4 flex-wrap">
              <Link
                href="/menu"
                className="text-xs uppercase tracking-widest-plus text-ivory/40 hover:text-amber transition-colors"
              >
                Menu
              </Link>
              <Link
                href="/order"
                className="text-xs uppercase tracking-widest-plus text-ivory/40 hover:text-amber transition-colors"
              >
                Order
              </Link>
              <Link
                href="/about"
                className="text-xs uppercase tracking-widest-plus text-ivory/40 hover:text-amber transition-colors"
              >
                About
              </Link>
              <a
                href="https://www.instagram.com/bridgecoffee.seattle/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest-plus text-ivory/40 hover:text-amber transition-colors"
                aria-label="Bridge Coffee on Instagram"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-amber/5 text-center">
          <p className="text-xs text-ivory/20">
            &copy; {new Date().getFullYear()} Bridge Coffee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
