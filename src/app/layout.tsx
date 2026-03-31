import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bridge Coffee | Artisan Coffee in North Seattle",
  description:
    "Comfortable coffee shop serving handcrafted lattes, French press coffee, and fresh pastries. Located in North Seattle. Open Monday-Friday.",
  openGraph: {
    title: "Bridge Coffee | Artisan Coffee in North Seattle",
    description:
      "Handcrafted coffee served with purpose. A neighborhood coffee shop trying to brighten everyone's day, one cup at a time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-espresso text-[rgba(245,237,214,0.65)] font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
