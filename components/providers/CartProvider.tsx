"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/products";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  qty: number;
};

interface CartContextType {
  cartItems: Record<string, CartItem>;
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (p: Product, qty: number) => void;
  updateQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  lastAdded: { name: string; unit: string } | null;
  clearLastAdded: () => void;
  // Stock still available to add for a given variant, given what's already
  // in the bag. null = no live stock data for this id, don't restrict.
  getRemainingStock: (id: string) => number | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Record<string, CartItem>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<{ name: string; unit: string } | null>(null);
  const [stockMap, setStockMap] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/stock")
      .then((r) => r.json())
      .then(setStockMap)
      .catch(() => {});
  }, []);

  const cartArray = Object.values(cartItems);
  const cartCount = cartArray.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartArray.reduce((s, i) => s + i.price * i.qty, 0);

  const getRemainingStock = (id: string): number | null => {
    if (!(id in stockMap)) return null;
    const inCart = cartItems[id]?.qty ?? 0;
    return Math.max(0, stockMap[id] - inCart);
  };

  const addToCart = (p: Product, qty: number) => {
    setCartItems((prev) => {
      const current = prev[p.id]?.qty ?? 0;
      const cap = p.id in stockMap ? stockMap[p.id] : Infinity;
      const newQty = Math.min(current + qty, cap);
      if (newQty <= 0) return prev;
      return {
        ...prev,
        [p.id]: { id: p.id, name: p.name, price: p.price, unit: p.unit, qty: newQty },
      };
    });
    setLastAdded({ name: p.name, unit: p.unit });
    setTimeout(() => setLastAdded(null), 2500);
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      const cap = id in stockMap ? stockMap[id] : Infinity;
      const newQty = Math.min(next[id].qty + delta, cap);
      if (newQty <= 0) {
        delete next[id];
      } else {
        next[id] = { ...next[id], qty: newQty };
      }
      return next;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const clearLastAdded = () => setLastAdded(null);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        lastAdded,
        clearLastAdded,
        getRemainingStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
