"use client";

import { Trash2, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "../providers/CartProvider";
import { GlassVial } from "@/components/ui/GlassVial";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function Poof({ x, y }: { x: number; y: number }) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setActive(false), 400);
    return () => clearTimeout(t);
  }, []);

  if (!active) return null;

  return (
    <div
      className="fixed pointer-events-none z-[3000]"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: "5px",
            height: "5px",
            backgroundColor: "var(--accent)",
            animation: "poof-particle 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards",
            transformOrigin: "center",
            transform: `rotate(${i * 45}deg) translateY(-2px)`,
          }}
        />
      ))}
    </div>
  );
}

export function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { cartItems, cartTotal, cartOpen, setCartOpen, removeFromCart, updateQty, poofEffect } = useCart();
  const items = Object.values(cartItems);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (cartOpen) {
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [cartOpen]);

  const handleRemove = (id: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const pos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id, pos);
      setRemovingId(null);
    }, 420);
  };

  const handleBrowseStore = () => {
    setCartOpen(false);
    setTimeout(() => {
      document.getElementById("store")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <>
      {poofEffect && <Poof x={poofEffect.x} y={poofEffect.y} />}

      <div
        className={cn(
          "fixed inset-0 z-[2000] pointer-events-none",
          cartOpen && "pointer-events-auto"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-400 pointer-events-none",
            cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          )}
          onClick={() => setCartOpen(false)}
        />

        {/* Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-full sm:w-[420px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none",
            cartOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full"
          )}
          style={{ backgroundColor: "var(--bg)" }}
        >
          {/* Header */}
          <div className="pt-12 pb-6 px-6 flex items-center justify-between shrink-0">
            <h2 className="text-[28px] font-semibold tracking-tight m-0" style={{ color: "var(--text)" }}>Cart</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors border-none text-[13px] font-medium"
              style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)" }}
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-3 pb-4">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-20">
                <ShoppingCart size={48} strokeWidth={1} className="opacity-30" style={{ color: "var(--text-muted)" }} />
                <p className="text-[17px] tracking-tight" style={{ color: "var(--text-muted)" }}>Your cart is empty.</p>
                <button
                  onClick={handleBrowseStore}
                  className="mt-2 px-6 py-3 rounded-full text-[15px] font-medium cursor-pointer border-none transition-all hover:scale-[1.03]"
                  style={{ backgroundColor: "var(--accent)", color: "#ffffff" }}
                >
                  Browse Store
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={item.id}
                  className="transition-all duration-350 overflow-hidden"
                  style={{
                    maxHeight: removingId === item.id ? "0px" : "300px",
                    marginBottom: removingId === item.id ? "-12px" : "0px",
                    opacity: removingId === item.id ? 0 : 1,
                  }}
                >
                <div
                  className={cn(
                    "relative rounded-[18px] border overflow-hidden",
                    removingId === item.id
                      ? "opacity-0 scale-0"
                      : "opacity-100 scale-100"
                  )}
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--surface)",
                    transformOrigin: "center center",
                    transition: removingId === item.id
                      ? "transform 0.35s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.25s ease-in"
                      : "none",
                    animation: mounted
                      ? `cart-item-in 0.4s ${idx * 60}ms cubic-bezier(0.32,0.72,0,1) both`
                      : "none",
                  }}
                >
                  {/* Trash button — top right */}
                  <button
                    onClick={(e) => handleRemove(item.id, e)}
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center border-none cursor-pointer transition-all hover:scale-110"
                    style={{ backgroundColor: "var(--surface-hover)", color: "var(--text-muted)" }}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={13} strokeWidth={2} />
                  </button>

                  <div className="flex items-stretch gap-0">
                    {/* Vial thumbnail */}
                    <div
                      className="w-[100px] shrink-0 flex items-end justify-center pt-6 pb-0 overflow-hidden"
                      style={{ backgroundColor: "var(--bg-alt)" }}
                    >
                      <div className="w-[72px]">
                        <GlassVial
                          productName={item.name}
                          weight={20}
                          unit={item.unit}
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between p-4 pr-10 min-w-0">
                      <div>
                        <div
                          className="text-[15px] font-semibold leading-tight tracking-tight truncate"
                          style={{ color: "var(--text)" }}
                        >
                          {item.name}
                        </div>
                        <div className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {item.unit}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Qty stepper */}
                        <div
                          className="flex items-center gap-0 rounded-full overflow-hidden border"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            disabled={item.qty === 1}
                            className="w-7 h-7 flex items-center justify-center border-none cursor-pointer transition-colors hover:opacity-70 disabled:opacity-25 disabled:cursor-not-allowed"
                            style={{ backgroundColor: "var(--surface-hover)", color: "var(--text)" }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} strokeWidth={2.5} />
                          </button>
                          <span
                            className="px-3 text-[13px] font-semibold tabular-nums"
                            style={{ color: "var(--text)", backgroundColor: "var(--surface)" }}
                          >
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center border-none cursor-pointer transition-colors hover:opacity-70"
                            style={{ backgroundColor: "var(--surface-hover)", color: "var(--text)" }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} strokeWidth={2.5} />
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="text-[15px] font-medium tracking-tight" style={{ color: "var(--text)" }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-6 pb-10 pt-4 shrink-0">
              <div
                className="flex justify-between text-[17px] font-semibold mb-5 tracking-tight pt-4"
                style={{ color: "var(--text)", borderTop: "1px solid var(--border)" }}
              >
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  setCartOpen(false);
                  onCheckout();
                }}
                className="w-full text-white border-none py-4 rounded-full text-[17px] font-normal transition-transform hover:scale-[1.02] cursor-pointer"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Check Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
