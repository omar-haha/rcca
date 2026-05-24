"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "../providers/ThemeProvider";

interface GlassVialProps {
  productName: string;
  weight: number; // in mg
  unit: string;
  className?: string;
  blur?: boolean;
}

export function GlassVial({ productName, weight, unit, className, blur = false }: GlassVialProps) {
  const { theme } = useTheme();
  
  // Scale powder height based on weight (e.g. 2mg -> 12%, 100mg -> 45%)
  const maxWeight = 100;
  const powderHeightPercent = Math.min(12 + (weight / maxWeight) * 35, 55);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center transition-transform duration-700",
        blur ? "blur-[8px] opacity-60 scale-90" : "hover:scale-105",
        className
      )}
      style={{ perspective: "800px" }}
    >
      {/* Background Powder Puck (Lyophilized Cake) */}
      <div
        className="absolute bottom-[3%] w-[76%] left-[52%] -translate-x-1/2 overflow-hidden"
        style={{
          height: `${powderHeightPercent}%`,
          background: "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.85) 70%, rgba(255,255,255,0.4) 100%)",
          boxShadow: "inset 0px -15px 20px rgba(0,0,0,0.15), inset 0px 5px 10px rgba(255,255,255,0.9), 0px 5px 15px rgba(0,0,0,0.1)",
          borderRadius: "5% 5% 45% 45% / 5% 5% 25% 25%",
          zIndex: 0,
        }}
      >
        {/* Powder Texture Noise */}
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-multiply" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
            backgroundSize: "40px 40px"
          }} 
        />
      </div>

      {/* Transparent Glass Image */}
      <div className="relative z-10 w-full h-full pointer-events-none flex justify-center">
        <Image
          src="/images/vial-rembg-cropped.png"
          alt={`${productName} vial`}
          width={385}
          height={883}
          className="w-full h-auto object-contain drop-shadow-2xl transition-all duration-300"
          priority
        />
      </div>

      {/* 3D Curved Label (Perfectly Sized & Research Grade) */}
      {!blur && (
        <div
          className="absolute z-20 flex overflow-hidden pointer-events-none"
          style={{
            top: "28%",
            width: "74%",
            height: "44%",
            left: "52%",
            transform: "translateX(-50%) rotateX(2deg)",
            background: theme === "dark" 
              ? "linear-gradient(90deg, #181818 0%, #2a2a2a 20%, #2a2a2a 80%, #181818 100%)" 
              : "linear-gradient(90deg, #e5e5e5 0%, #ffffff 20%, #ffffff 80%, #e5e5e5 100%)",
            boxShadow: theme === "dark"
              ? "inset -10px 0 20px rgba(0,0,0,0.8), inset 10px 0 20px rgba(0,0,0,0.8), 0 4px 15px rgba(0,0,0,0.8)"
              : "inset -10px 0 20px rgba(0,0,0,0.08), inset 10px 0 20px rgba(0,0,0,0.08), 0 4px 15px rgba(0,0,0,0.2)",
            borderRadius: "4px",
          }}
        >
          {/* Label Content */}
          <div className="flex w-full h-full p-2 gap-2 relative">
            
            {/* Top color strip for class distinction (Blue) */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#0071e3]" />

            {/* Simulated Barcode Left Side */}
            <div className={cn("h-full w-[15%] flex flex-col justify-end items-center pt-2", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
               <div className="flex-1 w-full flex justify-between gap-[1px]">
                 <div className="w-[1px] h-full bg-current" />
                 <div className="w-[2px] h-full bg-current" />
                 <div className="w-[1px] h-full bg-current" />
                 <div className="w-[3px] h-full bg-current" />
                 <div className="w-[1px] h-full bg-current" />
                 <div className="w-[2px] h-full bg-current" />
               </div>
               <span className="text-[0.25rem] font-mono mt-0.5" style={{ transform: "scale(0.8)" }}>89211</span>
            </div>

            {/* Main Label Body */}
            <div className="flex-1 flex flex-col justify-between pt-1">
              {/* Header */}
              <div className="flex justify-between items-start">
                <p className={cn("text-[0.35rem] font-bold tracking-widest uppercase", theme === "dark" ? "text-gray-400" : "text-gray-500")}>
                  RCCA BIOSCIENCES
                </p>
                <div className={cn("text-[0.3rem] font-mono text-right leading-tight", theme === "dark" ? "text-gray-500" : "text-gray-400")}>
                  LOT: {productName.length * 1042}X<br/>
                  EXP: 12/28
                </div>
              </div>

              {/* Title & Unit */}
              <div className="flex flex-col">
                <h3 className={cn("text-sm font-bold tracking-tight leading-none mb-0.5", theme === "dark" ? "text-white" : "text-black")}>
                  {productName}
                </h3>
                <p className={cn("text-[0.55rem] font-semibold", theme === "dark" ? "text-[#3291ff]" : "text-[#0071e3]")}>
                  {unit} <span className="text-[0.4rem] text-gray-500 font-normal ml-1">LYOPHILIZED</span>
                </p>
              </div>

              {/* Footer Warning */}
              <div className="w-full">
                <div className={cn("h-[1px] w-full mb-0.5", theme === "dark" ? "bg-gray-700" : "bg-gray-300")} />
                <p className="text-[0.3rem] font-bold tracking-widest text-red-500 uppercase leading-tight">
                  FOR RESEARCH USE ONLY.<br/>NOT FOR HUMAN CONSUMPTION.
                </p>
              </div>
            </div>
          </div>

          {/* Glossy overlay for realism */}
          <div
            className="absolute inset-0 z-30"
            style={{
              background: theme === "dark"
                ? "linear-gradient(105deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 60%)"
                : "linear-gradient(105deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0) 60%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
