"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/types";
import { fallbackMenuItems } from "@/lib/menu-data";

const categories = [
  { key: "all", label: "All" },
  { key: "espresso", label: "Espresso" },
  { key: "drip", label: "Drip" },
  { key: "cold_brew", label: "Cold Brew" },
  { key: "tea", label: "Tea" },
  { key: "pastry", label: "Pastries" },
  { key: "seasonal", label: "Seasonal" },
];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        // Try Supabase first
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-supabase")) {
          const { supabase } = await import("@/lib/supabase");
          const { data, error } = await supabase
            .from("menu_items")
            .select("*")
            .eq("available", true)
            .order("sort_order");

          if (!error && data && data.length > 0) {
            setItems(data as MenuItem[]);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Fall through to fallback
      }

      // Use fallback data
      setItems(fallbackMenuItems);
      setLoading(false);
    }

    fetchMenu();
  }, []);

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-ivory to-amber tracking-tight">
            Our Menu
          </h1>
          <p className="mt-4 text-base text-ivory/50">
            Handcrafted with care. Priced from $1–$10.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-xs uppercase tracking-widest-plus rounded-sm transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-amber text-espresso"
                  : "text-ivory/50 hover:text-ivory border border-amber/20 hover:border-amber/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-amber/30 border-t-amber rounded-full animate-spin" />
          </div>
        )}

        {/* Menu grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {!loading && filtered.length === 0 && (
          <p className="text-center text-ivory/30 py-20">
            No items in this category.
          </p>
        )}
      </div>
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group p-6 rounded-sm border border-amber/10 hover:border-amber/25 bg-espresso-light/50 transition-all duration-300">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-serif text-xl text-ivory group-hover:text-amber-light transition-colors">
            {item.name}
          </h3>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed">{item.description}</p>
          )}
          {item.dietary_tags.length > 0 && (
            <div className="mt-3 flex gap-2">
              {item.dietary_tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] uppercase tracking-widest bg-amber/10 text-amber/70 rounded-sm"
                >
                  {tag.replace("_", " ")}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="font-sans text-lg text-amber font-medium shrink-0">
          ${item.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
