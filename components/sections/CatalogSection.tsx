"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "../providers/CartProvider";
import { cn } from "@/lib/utils";

export function CatalogSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [qtys, setQtys] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, 1]))
  );
  const { addToCart } = useCart();

  const filteredProducts =
    activeFilter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeFilter);

  const changeQty = (id: string, delta: number) => {
    setQtys((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }));
  };

  return (
    <section id="catalog" className="py-[120px] bg-secondary">
      <div className="max-w-[1080px] mx-auto px-6">
        <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-blue-500 mb-5">
          Compound Catalog
        </p>
        <h2 className="text-[clamp(36px,5vw,52px)] font-light tracking-[-0.03em] leading-[1.1] mb-4 text-primary">
          Research-grade<br />compounds.
        </h2>
        <p className="text-[17px] text-secondary max-w-[540px] leading-[1.58] font-light mb-14">
          A curated selection of peptides, SARMs, and nootropics — each independently verified
          and shipped with full documentation.
        </p>

        <div className="flex gap-2 flex-wrap mb-14">
          {["all", "peptide", "sarm", "nootropic", "misc"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "bg-transparent border py-2 px-5 rounded-full text-[13px] font-medium transition-all tracking-tight cursor-pointer",
                activeFilter === cat
                  ? "bg-primary text-secondary border-primary"
                  : "border-secondary text-tertiary hover:border-tertiary hover:text-secondary"
              )}
            >
              {cat === "all"
                ? "All"
                : cat.charAt(0).toUpperCase() + cat.slice(1) + (cat === "misc" ? "ellaneous" : "s")}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[2px] bg-secondary border border-secondary rounded-[20px] overflow-hidden">
          {filteredProducts.map((p) => {
            const oos = p.stock === "out";
            return (
              <div
                key={p.id}
                className={cn(
                  "bg-secondary p-8 px-7 relative transition-colors hover:bg-surface group",
                  oos && "opacity-45 pointer-events-none"
                )}
              >
                {oos && (
                  <div className="absolute top-6 right-6 text-[10px] font-semibold tracking-[0.12em] uppercase text-tertiary border border-secondary py-1 px-2.5 rounded bg-secondary">
                    Out of stock
                  </div>
                )}
                
                <div className="text-[11px] font-medium tracking-[0.14em] uppercase text-tertiary mb-4">
                  {p.cat}
                </div>
                <div className="text-[18px] font-normal tracking-[-0.02em] mb-1 text-primary">
                  {p.name}
                </div>
                <div className="text-[12px] text-tertiary font-mono mb-5">
                  CAS {p.cas}
                </div>
                
                <div className="flex gap-4 mb-7">
                  <div className="text-[12px] text-secondary">
                    <strong className="text-primary font-medium">{p.unit}</strong> per vial
                  </div>
                  <div className="text-[12px] text-secondary">
                    <strong className="text-primary font-medium">{p.purity}</strong> purity
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-secondary">
                  <div>
                    <div className="text-[20px] font-light tracking-[-0.02em] text-primary">
                      <sup className="text-[12px] font-medium inline-block align-top mt-1 mr-0.5">$</sup>
                      {p.price.toFixed(2)}
                    </div>
                    {!oos && (
                      <span
                        className={cn(
                          "text-[10px] font-semibold tracking-[0.1em] uppercase py-1 px-2.5 rounded-full mt-1 inline-block",
                          p.stock === "in"
                            ? "text-green-500 bg-green-500/10"
                            : "text-amber-500 bg-amber-500/10"
                        )}
                      >
                        {p.stock === "in" ? "In stock" : "Low stock"}
                      </span>
                    )}
                  </div>
                  
                  {oos ? (
                    <span className="text-[13px] text-tertiary tracking-tight">Unavailable</span>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => changeQty(p.id, -1)}
                        className="w-7 h-7 rounded-full border border-secondary bg-transparent text-primary flex items-center justify-center cursor-pointer transition-colors hover:bg-surface2"
                      >
                        −
                      </button>
                      <span className="text-[14px] min-w-[18px] text-center font-mono">
                        {qtys[p.id] ?? 1}
                      </span>
                      <button
                        onClick={() => changeQty(p.id, 1)}
                        className="w-7 h-7 rounded-full border border-secondary bg-transparent text-primary flex items-center justify-center cursor-pointer transition-colors hover:bg-surface2"
                      >
                        +
                      </button>
                      <button
                        onClick={() => addToCart(p, qtys[p.id] ?? 1)}
                        className="bg-blue-600 text-white border-none py-[9px] px-5 rounded-full text-[13px] font-medium cursor-pointer transition-colors hover:bg-blue-700 ml-1"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
