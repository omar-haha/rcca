"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Minus, Plus, ZoomIn } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { GlassVial } from "@/components/ui/GlassVial";
import { AppleNav } from "@/components/ui/AppleNav";
import { AppleFooter } from "@/components/sections/AppleFooter";
import { CartDrawer } from "@/components/modals/CartDrawer";
import { CartToast } from "@/components/ui/CartToast";
import { CheckoutModal } from "@/components/modals/CheckoutModal";
import { AgeGateModal } from "@/components/modals/AgeGateModal";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";

const STOCK_CONFIG = {
  in:  { label: "In Stock",     color: "var(--success)" },
  low: { label: "Low Stock",    color: "#f59e0b" },
  out: { label: "Out of Stock", color: "var(--error)" },
} as const;

export function ProductDetail({ product: initial }: { product: Product }) {
  const variants = products.filter((p) => p.name === initial.name);
  const { addToCart } = useCart();
  const [selected, setSelected] = useState<Product>(initial);
  const [qty, setQty] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const p = selected;
  const oos = p.stock === "out";
  const stock = STOCK_CONFIG[p.stock];

  const handleAdd = () => {
    if (oos) return;
    addToCart(p, qty);
    setClicked(true);
    setTimeout(() => setClicked(false), 420);
  };

  const SPECS = [
    ["CAS Number",  p.cas],
    ["Unit Size",   p.unit],
    ["Purity",      p.purity],
    ["Category",    p.cat.charAt(0).toUpperCase() + p.cat.slice(1)],
  ];

  return (
    <>
      <AgeGateModal />
      <AppleNav />
      <CartToast />
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />

      {/* Zoom overlay */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[5000] flex items-center justify-center cursor-zoom-out"
            style={{ backdropFilter: "blur(28px) saturate(180%)", backgroundColor: "rgba(0,0,0,0.72)" }}
            onClick={() => setZoomOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" as const, stiffness: 320, damping: 26 }}
              className="w-[min(300px,72vw)]"
              onClick={(e) => e.stopPropagation()}
            >
              <GlassVial productName={p.name} weight={20} unit={p.unit} />
            </motion.div>
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer text-[13px] font-medium"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-[44px] min-h-screen bg-primary">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-10 md:py-16">

          {/* Back link */}
          <Link
            href="/#store"
            className="inline-flex items-center gap-1 text-[14px] text-secondary hover:text-primary transition-colors no-underline mb-10 md:mb-14"
          >
            <ChevronLeft size={16} strokeWidth={2} />
            All Products
          </Link>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

            {/* Vial — click to zoom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="w-full md:w-[400px] shrink-0"
            >
              <div
                className="relative rounded-[28px] overflow-hidden flex items-end justify-center cursor-zoom-in group"
                style={{ backgroundColor: "var(--bg-alt)", paddingTop: "56px", minHeight: "480px" }}
                onClick={() => setZoomOpen(true)}
              >
                <div className="w-[180px] md:w-[210px] transition-transform duration-700 group-hover:scale-[1.04] group-hover:-translate-y-3">
                  <GlassVial productName={p.name} weight={20} unit={p.unit} />
                </div>
                {/* Zoom hint */}
                <div
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ backgroundColor: "rgba(0,0,0,0.30)", color: "#fff" }}
                >
                  <ZoomIn size={14} strokeWidth={2} />
                </div>
              </div>
            </motion.div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="flex-1 min-w-0 pt-2"
            >
              {/* Badges */}
              <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-tertiary">
                  {p.cat}
                </span>
                {p.bestSeller && (
                  <span
                    className="text-[11px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: "var(--accent)22", color: "var(--accent)" }}
                  >
                    Best Seller
                  </span>
                )}
                <span
                  className="text-[11px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: stock.color + "22", color: stock.color }}
                >
                  {stock.label}
                </span>
              </div>

              <h1 className="text-[36px] md:text-[48px] font-semibold tracking-[-0.02em] text-primary leading-[1.05] mb-3">
                {p.name}
              </h1>

              <p className="text-[16px] text-secondary mb-5">
                {p.unit} · {p.purity} Purity
              </p>

              {/* Variant selector */}
              {variants.length > 1 && (
                <div className="mb-6">
                  <p className="text-[11px] font-semibold tracking-widest uppercase mb-2.5" style={{ color: "var(--text-legal)" }}>
                    Select Dose
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => {
                      const isActive = v.id === p.id;
                      const vOos = v.stock === "out";
                      const doseLabel = v.unit.split(" ×")[0];
                      return (
                        <button
                          key={v.id}
                          type="button"
                          disabled={vOos}
                          onClick={() => { setSelected(v); setQty(1); setClicked(false); }}
                          className="rounded-full px-4 py-1.5 text-[13px] font-medium border cursor-pointer transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                          style={
                            isActive
                              ? { backgroundColor: "var(--accent)", borderColor: "var(--accent)", color: "#fff" }
                              : { backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--text-muted)" }
                          }
                        >
                          {doseLabel} · ${v.price}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="text-[34px] font-semibold tracking-tight text-primary mb-8">
                ${p.price.toFixed(2)}
              </div>

              {/* Qty stepper + Add to Bag */}
              <div className="flex items-center gap-3 mb-10">
                <div
                  className="flex items-center rounded-full border shrink-0 overflow-hidden"
                  style={{ borderColor: "var(--border)" }}
                >
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty === 1 || oos}
                    className="w-11 h-11 flex items-center justify-center border-none cursor-pointer active:translate-y-px disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                    style={{ backgroundColor: "var(--surface-hover)", color: "var(--text)" }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} strokeWidth={2.5} />
                  </button>
                  <span
                    className="px-4 text-[15px] font-semibold tabular-nums select-none"
                    style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    disabled={oos}
                    className="w-11 h-11 flex items-center justify-center border-none cursor-pointer active:translate-y-px disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                    style={{ backgroundColor: "var(--surface-hover)", color: "var(--text)" }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} strokeWidth={2.5} />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={oos}
                  onClick={handleAdd}
                  className={cn(
                    "flex-1 py-[13px] rounded-full text-[15px] font-medium text-white border-none cursor-pointer relative z-10",
                    oos
                      ? "bg-surface text-tertiary cursor-not-allowed"
                      : clicked
                      ? "bg-accent animate-btn-pop"
                      : "bg-accent hover:bg-[color:var(--accent-hover)] btn-physical btn-physical-accent"
                  )}
                >
                  <span
                    className={clicked ? "animate-text-warp" : undefined}
                    style={{ pointerEvents: "none" }}
                  >
                    {oos ? "Out of Stock" : "Add to Bag"}
                  </span>
                </button>
              </div>

              {/* Specs table */}
              <div className="rounded-[16px] overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                {SPECS.map(([label, value], i) => (
                  <div
                    key={label}
                    className="flex justify-between items-center px-5 py-3.5 text-[14px]"
                    style={{
                      borderBottom: i < SPECS.length - 1 ? "1px solid var(--border)" : "none",
                      backgroundColor: i % 2 === 0 ? "var(--surface)" : "var(--bg-alt)",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>{label}</span>
                    <span className="font-medium font-mono text-[13px]" style={{ color: "var(--text)" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <AppleFooter />
    </>
  );
}
