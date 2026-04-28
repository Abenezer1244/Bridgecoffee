import OpenNowBadge from "./OpenNowBadge";

export default function TopInfoBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-espresso-warm/95 backdrop-blur-sm border-b border-amber/10">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between text-[10px] uppercase tracking-widest-plus text-ivory/50">
        <OpenNowBadge />

        {/* Desktop: address + phone */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://maps.google.com/?q=2150+N+122nd+St+Seattle+WA+98133"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ivory transition-colors"
          >
            2150 N 122nd · Seattle
          </a>
          <span className="text-ivory/20" aria-hidden>·</span>
          <a
            href="tel:+12064578690"
            className="hover:text-amber transition-colors"
          >
            (206) 457-8690
          </a>
        </div>

        {/* Mobile: just phone */}
        <a
          href="tel:+12064578690"
          className="md:hidden hover:text-amber transition-colors"
        >
          Call
        </a>
      </div>
    </div>
  );
}
