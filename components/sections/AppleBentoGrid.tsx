"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { useCart } from "@/components/providers/CartProvider";
import { GlassVial } from "@/components/ui/GlassVial";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All Products",
  peptide: "Peptides",
  misc: "Miscellaneous",
};

export function AppleBentoGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAdd = (p: typeof products[number]) => {
    addToCart(p, 1);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1100);
  };

  const filteredProducts = (
    activeFilter === "all" ? products : products.filter((p) => p.cat === activeFilter)
  ).slice().sort((a, b) => {
    if (a.stock === "out" && b.stock !== "out") return 1;
    if (a.stock !== "out" && b.stock === "out") return -1;
    return 0;
  });

  return (
    <section id="store" className="py-[80px] md:py-[120px] bg-primary">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
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
              {CATEGORY_LABELS[cat] ?? cat}
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
                  "bg-secondary rounded-[24px] overflow-hidden flex flex-col items-center pt-8 md:pt-12 relative group",
                  oos && "opacity-60 grayscale-[0.4]"
                )}
              >
                {/* Text Content */}
                <div className="text-center px-5 md:px-8 z-10 w-full mb-6 md:mb-8">
                  <div className="text-[11px] md:text-[12px] font-semibold tracking-widest uppercase text-tertiary mb-2 md:mb-3">
                    {p.cat}
                  </div>
                  <h3 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.01em] text-primary mb-1 md:mb-2">
                    {p.name}
                  </h3>
                  <div className="text-[14px] md:text-[15px] text-secondary font-normal mb-4 md:mb-5">
                    {p.unit} · {p.purity} Purity
                  </div>

                  <div className="flex flex-col items-center gap-2 md:gap-3">
                    <span className="text-[17px] md:text-[18px] text-primary font-medium">
                      ${p.price.toFixed(2)}
                    </span>
                    <button
                      disabled={oos}
                      onClick={() => !oos && handleAdd(p)}
                      className={cn(
                        "rounded-full px-5 py-2 text-[13px] font-medium no-underline cursor-pointer border-none",
                        oos
                          ? "bg-surface text-tertiary cursor-not-allowed"
                          : addedId === p.id
                          ? "bg-green-500 text-white transition-colors duration-200"
                          : "bg-[#0071e3] text-white hover:bg-[#0077ed] hover:scale-[1.02] transition-transform"
                      )}
                      style={addedId === p.id ? { animation: "btn-pop 0.3s ease forwards" } : undefined}
                    >
                      {oos ? "Out of Stock" : addedId === p.id ? "Added ✓" : "Add to Cart"}
                    </button>
                  </div>
                </div>

                {/* Vial */}
                <div className="w-full h-[200px] md:h-[300px] mt-auto relative flex justify-center items-end">
                  <div className="absolute -bottom-[30px] md:-bottom-[40px] w-[120px] md:w-[160px] pointer-events-none group-hover:scale-[1.05] transition-transform duration-700">
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
