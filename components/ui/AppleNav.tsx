"use client";

import { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useCart } from "@/components/providers/CartProvider";
import { Moon, Sun, ShoppingCart, Menu, X } from "lucide-react";
import { RccaLogo } from "./RccaLogo";

const NAV_LINKS = [
  { label: "Store",   href: "#store" },
  { label: "Quality", href: "#quality" },
  { label: "Legal",   href: "#legal" },
  { label: "Contact", href: "#contact" },
];

export function AppleNav() {
  const { theme, toggleTheme } = useTheme();
  const { cartCount, setCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] h-[44px] nav-blur transition-colors duration-300"
        style={{ backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-[1024px] mx-auto h-full px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <a href="#" className="hover:opacity-80 transition-opacity no-underline flex items-center">
              <RccaLogo className="h-[16px] w-auto text-logo" />
            </a>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center justify-center gap-8 text-[12px] font-normal tracking-wide flex-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-primary opacity-80 hover:opacity-100 transition-opacity duration-300 no-underline"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex-1 flex items-center justify-end gap-4">
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
              <ShoppingCart size={16} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-[#0071e3] rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-primary opacity-80 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none flex items-center justify-center p-0"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className="fixed top-[44px] left-0 right-0 z-[999] md:hidden nav-blur overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: "var(--nav-bg)",
          borderBottom: mobileOpen ? "1px solid var(--border)" : "none",
          maxHeight: mobileOpen ? "220px" : "0px",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-primary text-[15px] font-normal opacity-80 hover:opacity-100 transition-opacity no-underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
