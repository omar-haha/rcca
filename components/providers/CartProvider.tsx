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
  removeFromCart: (id: string, e?: React.MouseEvent) => void;
  clearCart: () => void;
  poofEffect: { x: number; y: number; id: number } | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Record<string, CartItem>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [poofEffect, setPoofEffect] = useState<{ x: number; y: number; id: number } | null>(null);

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
  };

  const removeFromCart = (id: string, e?: React.MouseEvent) => {
    if (e) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setPoofEffect({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, id: Date.now() });
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        poofEffect,
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
