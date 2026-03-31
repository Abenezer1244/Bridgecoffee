"use client";

import { useState, useEffect, useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem, CartItem } from "@/types";
import { fallbackMenuItems } from "@/lib/menu-data";

// Cart reducer
type CartAction =
  | { type: "ADD"; item: MenuItem }
  | { type: "REMOVE"; itemId: string }
  | { type: "UPDATE_QTY"; itemId: string; quantity: number }
  | { type: "CLEAR" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((c) => c.menuItem.id === action.item.id);
      if (existing) {
        return state.map((c) =>
          c.menuItem.id === action.item.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...state, { menuItem: action.item, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter((c) => c.menuItem.id !== action.itemId);
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return state.filter((c) => c.menuItem.id !== action.itemId);
      }
      return state.map((c) =>
        c.menuItem.id === action.itemId
          ? { ...c, quantity: action.quantity }
          : c
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

// Generate pickup time options
function getPickupTimeOptions(): { label: string; value: string }[] {
  const options: { label: string; value: string }[] = [];
  const now = new Date();

  // Generate times for the next 5 business days
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = new Date(now);
    date.setDate(date.getDate() + dayOffset);
    const day = date.getDay();

    // Skip weekends
    if (day === 0 || day === 6) continue;

    const closeHour = day === 3 ? 16 : 15; // Wed closes 4 PM
    const startHour = dayOffset === 0 ? Math.max(8, now.getHours() + 1) : 8;

    for (let hour = startHour; hour < closeHour; hour++) {
      for (const min of [0, 30]) {
        if (dayOffset === 0 && hour === startHour && min < now.getMinutes()) continue;

        const timeDate = new Date(date);
        timeDate.setHours(hour, min, 0, 0);

        if (timeDate.getTime() <= now.getTime()) continue;

        const dayLabel = dayOffset === 0 ? "Today" : dayOffset === 1 ? "Tomorrow" : date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        const timeLabel = timeDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

        options.push({
          label: `${dayLabel} at ${timeLabel}`,
          value: timeDate.toISOString(),
        });
      }
    }

    if (options.length >= 20) break;
  }

  return options;
}

export default function OrderPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [customerName, setCustomerName] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    orderId: string;
    pickupTime: string;
    total: number;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMenu() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-supabase")) {
          const { supabase } = await import("@/lib/supabase");
          const { data } = await supabase
            .from("menu_items")
            .select("*")
            .eq("available", true)
            .order("sort_order");

          if (data && data.length > 0) {
            setMenuItems(data as MenuItem[]);
            return;
          }
        }
      } catch {
        // Fall through
      }
      setMenuItems(fallbackMenuItems);
    }
    fetchMenu();
  }, []);

  const total = cart.reduce(
    (sum, c) => sum + c.menuItem.price * c.quantity,
    0
  );

  const pickupOptions = getPickupTimeOptions();
  const canSubmit = customerName.trim().length > 0 && pickupTime && cart.length > 0;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          pickupTime,
          items: cart.map((c) => ({
            menuItemId: c.menuItem.id,
            quantity: c.quantity,
            price: c.menuItem.price,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSubmitting(false);
        return;
      }

      setConfirmation(data);
      dispatch({ type: "CLEAR" });
    } catch {
      setError("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Confirmation screen
  if (confirmation) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl text-ivory mb-2">Order Confirmed</h1>
          <p className="text-amber text-lg font-mono mb-6">#{confirmation.orderId}</p>
          <div className="space-y-2 text-sm">
            <p>
              Pickup at{" "}
              <span className="text-ivory">
                {new Date(confirmation.pickupTime).toLocaleString("en-US", {
                  weekday: "short",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </p>
            <p>
              Total: <span className="text-amber">${confirmation.total.toFixed(2)}</span>
            </p>
            <p className="text-ivory/40 mt-4">Pay at the counter when you pick up.</p>
          </div>
          <button
            onClick={() => setConfirmation(null)}
            className="mt-8 px-6 py-2 border border-amber/40 text-amber text-xs uppercase tracking-widest-plus rounded-sm hover:border-amber transition-colors"
          >
            Place Another Order
          </button>
        </motion.div>
      </div>
    );
  }

  // Group menu items by category for browsing
  const grouped = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryLabels: Record<string, string> = {
    espresso: "Espresso",
    drip: "Drip",
    cold_brew: "Cold Brew",
    tea: "Tea",
    pastry: "Pastries",
    seasonal: "Seasonal",
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-ivory to-amber tracking-tight">
            Order for Pickup
          </h1>
          <p className="mt-4 text-base text-ivory/50">
            Choose your items, we&apos;ll have them ready when you arrive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Menu browser */}
          <div className="space-y-8">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h2 className="font-sans text-xs uppercase tracking-widest-plus text-amber mb-4">
                  {categoryLabels[category] || category}
                </h2>
                <div className="space-y-2">
                  {items.map((item) => {
                    const inCart = cart.find((c) => c.menuItem.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 rounded-sm border border-amber/10 hover:border-amber/25 bg-espresso-light/30 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-base text-ivory truncate">
                              {item.name}
                            </span>
                            <span className="text-sm text-amber">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-ivory/40 mt-0.5 truncate">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {inCart ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "UPDATE_QTY",
                                    itemId: item.id,
                                    quantity: inCart.quantity - 1,
                                  })
                                }
                                className="w-7 h-7 flex items-center justify-center border border-amber/30 text-amber rounded-sm hover:bg-amber/10 transition-colors text-sm"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-ivory text-sm">
                                {inCart.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "UPDATE_QTY",
                                    itemId: item.id,
                                    quantity: inCart.quantity + 1,
                                  })
                                }
                                className="w-7 h-7 flex items-center justify-center border border-amber/30 text-amber rounded-sm hover:bg-amber/10 transition-colors text-sm"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => dispatch({ type: "ADD", item })}
                              className="px-3 py-1.5 text-xs uppercase tracking-widest-plus border border-amber/30 text-amber rounded-sm hover:bg-amber/10 transition-colors"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Cart & checkout */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="p-6 rounded-sm border border-amber/15 bg-espresso-light/50">
              <h2 className="font-sans text-xs uppercase tracking-widest-plus text-amber mb-4">
                Your Order
              </h2>

              {cart.length === 0 ? (
                <p className="text-sm text-ivory/30 py-4">
                  Add items from the menu to get started.
                </p>
              ) : (
                <AnimatePresence>
                  <div className="space-y-3 mb-6">
                    {cart.map((c) => (
                      <motion.div
                        key={c.menuItem.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-ivory/80">
                          {c.quantity}x {c.menuItem.name}
                        </span>
                        <span className="text-amber">
                          ${(c.menuItem.price * c.quantity).toFixed(2)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}

              {cart.length > 0 && (
                <>
                  <div className="border-t border-amber/10 pt-3 mb-6 flex justify-between items-center">
                    <span className="text-sm text-ivory/60">Total</span>
                    <span className="font-serif text-xl text-amber">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest-plus text-ivory/40 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="First name"
                        maxLength={100}
                        className="w-full px-3 py-2 bg-espresso border border-amber/20 rounded-sm text-ivory placeholder:text-ivory/20 focus:border-amber focus:outline-none transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest-plus text-ivory/40 mb-1.5">
                        Pickup Time
                      </label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full px-3 py-2 bg-espresso border border-amber/20 rounded-sm text-ivory focus:border-amber focus:outline-none transition-colors text-sm"
                      >
                        <option value="">Select a time</option>
                        {pickupOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {error && (
                      <p className="text-red-400 text-xs">{error}</p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit || submitting}
                      className={`w-full py-3 text-xs uppercase tracking-widest-plus rounded-sm transition-all duration-300 ${
                        canSubmit && !submitting
                          ? "bg-amber text-espresso hover:bg-amber-light"
                          : "bg-amber/20 text-ivory/30 cursor-not-allowed"
                      }`}
                    >
                      {submitting ? "Placing Order..." : "Place Order — Pay at Counter"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
