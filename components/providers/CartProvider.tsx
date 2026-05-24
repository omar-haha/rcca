"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
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
  removeFromCart: (id: string, pos?: { x: number; y: number }) => void;
  clearCart: () => void;
  poofEffect: { x: number; y: number; id: number } | null;
  lastAdded: { name: string; unit: string } | null;
  clearLastAdded: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Record<string, CartItem>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [poofEffect, setPoofEffect] = useState<{ x: number; y: number; id: number } | null>(null);
  const [lastAdded, setLastAdded] = useState<{ name: string; unit: string } | null>(null);

  const cartArray = Object.values(cartItems);
  const cartCount = cartArray.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartArray.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (p: Product, qty: number) => {
    setCartItems((prev) => ({
      ...prev,
      [p.id]: prev[p.id]
        ? { ...prev[p.id], qty: prev[p.id].qty + qty }
        : { id: p.id, name: p.name, price: p.price, unit: p.unit, qty },
    }));
    setLastAdded({ name: p.name, unit: p.unit });
    setTimeout(() => setLastAdded(null), 2500);
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      const newQty = next[id].qty + delta;
      if (newQty <= 0) {
        delete next[id];
      } else {
        next[id] = { ...next[id], qty: newQty };
      }
      return next;
    });
  };

  const removeFromCart = (id: string, pos?: { x: number; y: number }) => {
    if (pos) {
      setPoofEffect({ x: pos.x, y: pos.y, id: Date.now() });
      setTimeout(() => setPoofEffect(null), 500);
    }
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
        poofEffect,
        lastAdded,
        clearLastAdded,
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
