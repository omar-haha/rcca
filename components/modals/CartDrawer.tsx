"use client";

import { X, ShoppingBag } from "lucide-react";
import { useCart } from "../providers/CartProvider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { cartItems, cartTotal, cartOpen, setCartOpen, removeFromCart, poofEffect } = useCart();
  const items = Object.values(cartItems);

  // Poof Animation Component
  const Poof = ({ x, y }: { x: number; y: number }) => {
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
            className="absolute bg-[#0071e3] rounded-full"
            style={{
              width: "5px",
              height: "5px",
              animation: `poof-particle 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
              transformOrigin: "center",
              transform: `rotate(${i * 45}deg) translateY(-2px)`,
            }}
          />
        ))}
        <style jsx>{`
          @keyframes poof-particle {
            0% { transform: rotate(var(--rot, 0deg)) translateY(0) scale(1); opacity: 1; }
            100% { transform: rotate(var(--rot, 0deg)) translateY(-24px) scale(0); opacity: 0; }
          }
        `}</style>
      </div>
    );
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
            "absolute top-0 right-0 bottom-0 w-full sm:w-[420px] bg-primary flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none",
            cartOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full"
          )}
        >
          {/* Header */}
          <div className="pt-12 pb-6 px-8 flex items-center justify-between">
            <h2 className="text-[28px] font-semibold tracking-tight text-primary m-0">Bag</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="w-8 h-8 rounded-full bg-secondary text-primary border-none flex items-center justify-center cursor-pointer hover:bg-surface-hover transition-colors"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-8 flex flex-col gap-6">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-secondary gap-3 py-20">
                <ShoppingBag size={48} strokeWidth={1} className="opacity-40" />
                <p className="text-[17px] tracking-tight">Your Bag is empty.</p>
              </div>
            ) : (
              items.map((i) => (
                <div key={i.id} className="flex gap-4 pb-6 border-b border-primary last:border-b-0">
                  <div className="w-[72px] h-[72px] bg-secondary rounded-[12px] flex items-center justify-center shrink-0">
                    {/* Placeholder for product thumbnail if needed, sticking to minimalist */}
                    <div className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Item</div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between pt-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="text-[17px] font-semibold leading-tight tracking-tight text-primary">{i.name}</div>
                        <div className="text-[13px] text-secondary mt-1">{i.unit}</div>
                      </div>
                      <div className="text-[17px] font-medium tracking-tight text-primary whitespace-nowrap">
                        ${(i.price * i.qty).toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-[13px] text-primary flex items-center gap-1">
                        Qty <span className="font-semibold">{i.qty}</span>
                      </div>
                      <button
                        onClick={(e) => removeFromCart(i.id, e)}
                        className="bg-transparent border-none text-[#0071e3] hover:underline cursor-pointer p-0 text-[13px] font-normal"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-10 pt-6">
            <div className="flex justify-between text-[17px] font-semibold mb-6 tracking-tight text-primary border-t border-primary pt-6">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              disabled={items.length === 0}
              onClick={() => {
                setCartOpen(false);
                onCheckout();
              }}
              className="w-full bg-[#0071e3] text-white border-none py-4 rounded-full text-[17px] font-normal transition-transform hover:scale-[1.02] hover:bg-[#0077ed] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
