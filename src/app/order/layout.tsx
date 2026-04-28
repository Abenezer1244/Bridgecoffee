import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order for Pickup | Bridge Coffee House",
  description:
    "Order ahead from Bridge Coffee. Pick up your Herkimer espresso, seasonal latte, or fresh pastry at the counter. Mon–Fri, 8 AM – 3 PM at 2150 N 122nd St, Seattle.",
  robots: { index: false },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
