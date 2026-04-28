import type { Metadata } from "next";
import { fallbackMenuItems } from "@/lib/menu-data";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu | Bridge Coffee House",
  description:
    "Herkimer-roasted espresso, seasonal lattes, and fresh pastries baked daily. Most drinks under $6. Open Mon–Fri, 8 AM – 3 PM at 2150 N 122nd St, North Seattle.",
};

export default function MenuPage() {
  return <MenuClient initialItems={fallbackMenuItems} />;
}
