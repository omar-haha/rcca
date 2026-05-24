"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { RccaLogo } from "./RccaLogo";

interface GlassVialProps {
  productName: string;
  weight: number;
  unit: string;
  className?: string;
  blur?: boolean;
  showLabel?: boolean;
}

export function GlassVial({ productName, weight: _weight, unit, className, blur = false, showLabel = true }: GlassVialProps) {
  const productNameSize = `${Math.min(11, Math.max(6.5, 90 / productName.length))}cqi`;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center transition-transform duration-700",
        blur ? "blur-[8px] opacity-60 scale-90" : "hover:scale-105",
        className
      )}
      style={{ perspective: "800px" }}
    >
      <div className="relative w-full h-full pointer-events-none flex justify-center">
        <Image
          src="/images/vial-rembg-cropped.png"
          alt={`${productName} vial`}
          width={385}
          height={883}
          className="w-full h-auto object-contain drop-shadow-2xl transition-all duration-300"
          priority
        />
      </div>

      {!blur && showLabel && (
        <div
          className="vial-label absolute z-20 flex flex-col overflow-hidden pointer-events-none"
          style={{
            top: "40%",
            width: "74%",
            height: "44%",
            left: "50%",
            transform: "translateX(-50%) rotateX(2deg)",
            background: "linear-gradient(180deg, var(--label-bg) 0%, var(--label-bg-end) 100%)",
            borderRadius: "4px",
            containerType: "inline-size",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3), inset 0 0 0 0.5cqi rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex flex-col w-full h-full p-[6cqi] min-w-0">
            <div className="flex items-end justify-between gap-[2cqi] pb-[2cqi] border-b-[0.8cqi] border-label mb-[3cqi] min-w-0">
              <RccaLogo className="h-[7cqi] w-auto max-w-[52%] text-label shrink-0" />
              <div
                className="shrink-0 border-[0.5cqi] border-label bg-label-badge px-[2cqi] py-[0.5cqi] font-bold tracking-tight"
                style={{ fontSize: "4.5cqi" }}
              >
                {unit}
              </div>
            </div>

            <div
              className="font-[family-name:var(--font-orbitron)] font-semibold tracking-[0.04em] uppercase text-label leading-none w-full"
              style={{ fontSize: productNameSize }}
            >
              {productName}
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-[2cqi] pb-[2cqi] border-b-[0.8cqi] border-label mb-[2cqi]">
              <div
                className="bg-label-badge px-[1.5cqi] py-[0.5cqi] font-bold uppercase tracking-widest"
                style={{ fontSize: "3cqi" }}
              >
                USAGE LAB
              </div>
              <div className="flex flex-col leading-none">
                <div className="text-label-muted font-mono tracking-widest uppercase" style={{ fontSize: "3.5cqi" }}>
                  Composé Lyophilisé
                </div>
                <div className="text-label-muted font-mono tracking-widest uppercase opacity-60" style={{ fontSize: "2.6cqi" }}>
                  Lyophilized Compound
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex flex-col border-l-[1cqi] border-label pl-[2cqi]">
                <div className="text-label font-mono tracking-widest uppercase leading-[1.4]" style={{ fontSize: "3.5cqi" }}>
                  LOT: <span className="font-bold">7290X</span>
                </div>
                <div className="text-label font-mono tracking-widest uppercase leading-[1.4]" style={{ fontSize: "3.5cqi" }}>
                  EXP: <span className="font-bold">12/28</span>
                </div>
              </div>
              <div className="flex flex-col text-right leading-[1.3] max-w-[50%]">
                <div
                  className="text-label font-bold tracking-tight uppercase"
                  style={{ fontSize: "3.5cqi" }}
                >
                  À fins de recherche
                </div>
                <div
                  className="text-label font-bold tracking-tight uppercase opacity-60"
                  style={{ fontSize: "2.6cqi" }}
                >
                  For Research Only
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: [
                "linear-gradient(to right, rgba(0,0,0,0.28) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.22) 100%)",
                "linear-gradient(to bottom, rgba(255,255,255,0.13) 0%, transparent 40%, rgba(0,0,0,0.08) 100%)",
                "linear-gradient(105deg, rgba(255,255,255,0) 28%, rgba(255,255,255,0.32) 43%, rgba(255,255,255,0) 58%)",
              ].join(", "),
            }}
          />
        </div>
      )}
    </div>
  );
}
