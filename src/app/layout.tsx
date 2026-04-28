import type { Metadata } from "next";
import { Young_Serif, Figtree } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopInfoBar from "@/components/TopInfoBar";
import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Bridge Coffee House",
  description:
    "Non-profit neighborhood cafe inside North Seattle Church since 2012.",
  url: "https://bridgecoffee.vercel.app",
  telephone: "+12064578690",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2150 N 122nd St",
    addressLocality: "Seattle",
    addressRegion: "WA",
    postalCode: "98133",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "15:00",
    },
  ],
  servesCuisine: "Coffee and Pastries",
  priceRange: "$",
  image: "https://bridgecoffee.vercel.app/images/shop/unnamed-7.webp",
};

export const metadata: Metadata = {
  title: "Bridge Coffee House | Non-profit neighborhood cafe in North Seattle",
  description:
    "A non-profit cafe inside North Seattle Church since 2012. Herkimer-roasted espresso, fresh pastries, Wi-Fi, kids' room, and a side porch with heat lamps. 2150 N 122nd St. Mon–Fri, 8 AM – 3 PM.",
  openGraph: {
    title: "Bridge Coffee House | A non-profit cafe in North Seattle",
    description:
      "The living room of 122nd Street. Non-profit cafe, handcrafted coffee, open Mon–Fri. Come meet the neighborhood.",
    type: "website",
    images: [{ url: "/images/shop/unnamed-7.webp", width: 1200, height: 630, alt: "Bridge Coffee interior — warm lighting, wood tables, community cafe in North Seattle" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${figtree.variable}`}>
      <body className="bg-espresso font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <TopInfoBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
