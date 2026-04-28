"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import type { MenuItem, CartItem } from "@/types";

type CartAction =
  | { type: "ADD"; item: MenuItem }
  | { type: "REMOVE"; itemId: string }
  | { type: "UPDATE_QTY"; itemId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "HYDRATE":
      return action.items;
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

interface CartContextValue {
  cart: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clear: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "bridge-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {
      // Malformed storage — ignore
    }
  }, []);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Quota exceeded or private mode — non-fatal
    }
  }, [cart]);

  const value: CartContextValue = {
    cart,
    addItem: (item) => dispatch({ type: "ADD", item }),
    removeItem: (itemId) => dispatch({ type: "REMOVE", itemId }),
    updateQuantity: (itemId, quantity) =>
      dispatch({ type: "UPDATE_QTY", itemId, quantity }),
    clear: () => dispatch({ type: "CLEAR" }),
    itemCount: cart.reduce((sum, c) => sum + c.quantity, 0),
    total: cart.reduce((sum, c) => sum + c.menuItem.price * c.quantity, 0),
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
