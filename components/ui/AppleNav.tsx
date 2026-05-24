"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { useCart } from "@/components/providers/CartProvider";
import { Moon, Sun, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppleNav() {
  const { theme, toggleTheme } = useTheme();
  const { cartCount, setCartOpen } = useCart();

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-[1000] h-[44px] nav-blur transition-colors duration-300"
      style={{ backgroundColor: "var(--nav-bg)" }}
    >
      <div className="max-w-[1024px] mx-auto h-full px-4 flex items-center justify-between">
        {/* Apple Logo Placeholder -> RCCA text logo */}
        <a href="#" className="text-primary hover:opacity-80 transition-opacity duration-300 text-lg font-semibold tracking-tight no-underline">
          RCCA
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center justify-center gap-8 text-[12px] font-normal tracking-wide flex-1">
          <a href="#store" className="text-primary opacity-80 hover:opacity-100 transition-opacity duration-300 no-underline">Store</a>
          <a href="#peptides" className="text-primary opacity-80 hover:opacity-100 transition-opacity duration-300 no-underline">Peptides</a>
          <a href="#quality" className="text-primary opacity-80 hover:opacity-100 transition-opacity duration-300 no-underline">Quality</a>
          <a href="#support" className="text-primary opacity-80 hover:opacity-100 transition-opacity duration-300 no-underline">Support</a>
        </div>

        {/* Right side Actions */}
        <div className="flex items-center gap-5">
          <button
            onClick={toggleTheme}
            className="text-primary opacity-80 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none flex items-center justify-center p-0"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>
          
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-primary opacity-80 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none flex items-center justify-center p-0"
            aria-label="Cart"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-[#0071e3] rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
