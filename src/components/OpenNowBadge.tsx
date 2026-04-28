"use client";

import { useEffect, useState } from "react";

type Status =
  | { kind: "open"; closesAt: string; closingSoon: boolean }
  | { kind: "closed"; opensLabel: string };

// Bridge Coffee hours: Mon–Fri 8 AM – 3 PM, Sat/Sun closed
function getStatus(now: Date): Status {
  const day = now.getDay(); // 0=Sun, 6=Sat
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const openMin = 8 * 60;
  const closeMin = 15 * 60;
  const isWeekday = day >= 1 && day <= 5;

  if (isWeekday && nowMin >= openMin && nowMin < closeMin) {
    return {
      kind: "open",
      closesAt: "3 PM",
      closingSoon: closeMin - nowMin <= 30,
    };
  }

  // Determine next opening
  const isAfterCloseWeekday = isWeekday && nowMin >= closeMin;
  const isBeforeOpenWeekday = isWeekday && nowMin < openMin;

  let opensLabel: string;
  if (isBeforeOpenWeekday) {
    opensLabel = "today at 8 AM";
  } else if (day === 5 && isAfterCloseWeekday) {
    opensLabel = "Monday at 8 AM";
  } else if (day === 6) {
    opensLabel = "Monday at 8 AM";
  } else if (day === 0) {
    opensLabel = "tomorrow at 8 AM";
  } else {
    // Mon–Thu after close
    opensLabel = "tomorrow at 8 AM";
  }

  return { kind: "closed", opensLabel };
}

export default function OpenNowBadge() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  // SSR / first paint — neutral placeholder avoids hydration mismatch
  if (!now) {
    return (
      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest-plus text-ivory/40">
        <span className="w-1.5 h-1.5 rounded-full bg-ivory/30" aria-hidden />
        <span>Hours</span>
      </span>
    );
  }

  const status = getStatus(now);

  if (status.kind === "open") {
    const dotColor = status.closingSoon ? "bg-amber" : "bg-emerald-400";
    const label = status.closingSoon
      ? `Closing at ${status.closesAt}`
      : `Open until ${status.closesAt}`;
    return (
      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest-plus text-ivory/75">
        <span className="relative flex w-1.5 h-1.5" aria-hidden>
          <span
            className={`absolute inset-0 rounded-full ${dotColor} animate-ping opacity-60`}
          />
          <span className={`relative w-1.5 h-1.5 rounded-full ${dotColor}`} />
        </span>
        <span>{label}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest-plus text-ivory/50">
      <span className="w-1.5 h-1.5 rounded-full bg-ivory/30" aria-hidden />
      <span>Closed · opens {status.opensLabel}</span>
    </span>
  );
}
