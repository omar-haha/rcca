"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/components/providers/CartProvider";
import { GlassVial } from "@/components/ui/GlassVial";
import { cn } from "@/lib/utils";

export function AppleBentoGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { addToCart } = useCart();

  const filteredProducts =
    activeFilter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeFilter);

  return (
    <section id="store" className="py-[120px] bg-primary">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="apple-headline mb-4">Research Store.</h2>
          <p className="apple-subheadline text-secondary">
            Precision-synthesized compounds for your next breakthrough.
          </p>
        </div>

        {/* Apple Style Filter Pills */}
        <div className="flex justify-center gap-2 flex-wrap mb-12">
          {["all", "peptide", "misc"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-[14px] font-medium transition-colors duration-300 border-none cursor-pointer",
                activeFilter === cat
                  ? "bg-primary text-secondary border border-primary shadow-[0_0_0_1px_var(--text)]"
                  : "bg-surface text-secondary hover:text-primary hover:bg-surface-hover"
              )}
            >
              {cat === "all"
                ? "All Products"
                : cat.charAt(0).toUpperCase() + cat.slice(1) + (cat === "misc" ? "ellaneous" : "s")}
            </button>
          ))}
        </div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((p) => {
            const oos = p.stock === "out";
            return (
              <div
                key={p.id}
                className={cn(
                  "bg-secondary rounded-[24px] overflow-hidden flex flex-col items-center pt-12 relative group",
                  oos && "opacity-60 grayscale-[0.4]"
                )}
              >
                {/* Text Content Top Aligned */}
                <div className="text-center px-8 z-10 w-full mb-8">
                  <div className="text-[12px] font-semibold tracking-widest uppercase text-tertiary mb-3">
                    {p.cat}
                  </div>
                  <h3 className="text-[28px] font-semibold tracking-[-0.01em] text-primary mb-2">
                    {p.name}
                  </h3>
                  <div className="text-[15px] text-secondary font-normal mb-5">
                    {p.unit} · {p.purity} Purity
                  </div>
                  
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[18px] text-primary font-medium">
                      ${p.price.toFixed(2)}
                    </span>
                    <button
                      disabled={oos}
                      onClick={() => addToCart(p, 1)}
                      className={cn(
                        "rounded-full px-5 py-2 text-[13px] font-medium transition-transform no-underline cursor-pointer border-none",
                        oos
                          ? "bg-surface text-tertiary cursor-not-allowed"
                          : "bg-[#0071e3] text-white hover:bg-[#0077ed] hover:scale-[1.02]"
                      )}
                    >
                      {oos ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>

                {/* Product Image breaking padding at the bottom */}
                <div className="w-full h-[300px] mt-auto relative flex justify-center items-end overflow-hidden">
                  <div className="absolute -bottom-[20px] w-[110px] pointer-events-none group-hover:scale-[1.05] transition-transform duration-700">
                    <GlassVial productName={p.name} weight={20} unit={p.unit} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
