"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MenuItem } from "@/types";
import { fetchMenuItems } from "@/lib/fetchMenu";
import { useCart } from "@/contexts/CartContext";

const categories = [
  { key: "all", label: "All" },
  { key: "espresso", label: "Espresso" },
  { key: "drip", label: "Drip" },
  { key: "cold_brew", label: "Cold Brew" },
  { key: "tea", label: "Tea" },
  { key: "pastry", label: "Pastries" },
  { key: "seasonal", label: "Seasonal" },
];

export default function MenuClient({ initialItems }: { initialItems: MenuItem[] }) {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState("all");
  const { itemCount, total } = useCart();

  useEffect(() => {
    fetchMenuItems().then((data) => {
      if (data !== initialItems) setItems(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-espresso pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-7xl text-espresso tracking-tight">
            Our Menu
          </h1>
          <p className="mt-4 text-base text-stone-500">
            Herkimer-roasted coffee and pastries baked the morning you&apos;re
            drinking them. Most drinks under $6.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex overflow-x-auto gap-1.5 sm:gap-2 mb-12 pb-1 justify-start md:justify-center scrollbar-none [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 text-xs uppercase tracking-widest-plus rounded-sm transition-colors duration-200 ${
                activeCategory === cat.key
                  ? "bg-amber text-espresso"
                  : "text-stone-500 hover:text-espresso border border-stone-300 hover:border-amber/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

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

        {filtered.length === 0 && (
          <p className="text-center text-stone-400 py-20">
            No items in this category.
          </p>
        )}
      </div>

      {/* Floating cart summary — only when cart has items */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <Link
              href="/order"
              className="flex items-center gap-4 pl-4 pr-2 py-3 bg-amber text-espresso rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="text-xs uppercase tracking-widest-plus font-medium">
                {itemCount} {itemCount === 1 ? "item" : "items"} · $
                {total.toFixed(2)}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-espresso text-amber rounded-full text-xs uppercase tracking-widest-plus">
                Checkout
                <span aria-hidden>→</span>
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const { cart, addItem, updateQuantity } = useCart();
  const inCart = cart.find((c) => c.menuItem.id === item.id);

  return (
    <div className="group flex flex-col p-6 rounded-sm border border-stone-200 hover:border-amber/40 bg-white transition-colors duration-300">
      <div className="flex-1 flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-serif text-xl text-espresso group-hover:text-amber transition-colors">
            {item.name}
          </h3>
          {item.description && (
            <p className="mt-2 text-sm text-stone-500 leading-relaxed">{item.description}</p>
          )}
          {item.dietary_tags.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {item.dietary_tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] uppercase tracking-widest bg-amber/10 text-amber/80 rounded-sm"
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

      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-end">
        {inCart ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, inCart.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center border border-amber/30 text-amber rounded-sm hover:bg-amber/10 transition-colors"
              aria-label={`Remove one ${item.name}`}
            >
              −
            </button>
            <span className="w-8 text-center text-espresso text-sm tabular-nums">
              {inCart.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, inCart.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-amber/30 text-amber rounded-sm hover:bg-amber/10 transition-colors"
              aria-label={`Add another ${item.name}`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem(item)}
            className="px-4 py-1.5 text-xs uppercase tracking-widest-plus border border-amber/30 text-amber rounded-sm hover:bg-amber/10 hover:border-amber/60 transition-colors"
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
}
