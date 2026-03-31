import Link from "next/link";

const hours = [
  { day: "Monday", time: "8 AM – 3 PM" },
  { day: "Tuesday", time: "8 AM – 3 PM" },
  { day: "Wednesday", time: "8 AM – 4 PM" },
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
              A neighborhood coffee shop trying to brighten everyone&apos;s day,
              one cup at a time.
            </p>
            <p className="mt-4 text-xs text-ivory/30">
              Located in North Seattle Church
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

            <div className="mt-6 flex gap-4">
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
