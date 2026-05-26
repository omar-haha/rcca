"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useCart } from "@/components/providers/CartProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Moon, Sun, ShoppingBag, Menu, X } from "lucide-react";
import { RccaLogo } from "./RccaLogo";

export function AppleNav() {
  const { theme, toggleTheme } = useTheme();
  const { cartCount, setCartOpen } = useCart();
  const { lang, toggle: toggleLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(rect.left + rect.width / 2);
    const y = Math.round(rect.top + rect.height / 2);
    const root = document.documentElement;

    if (!("startViewTransition" in document)) { toggleTheme(); return; }

    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-anim", "vt-ripple");
    root.style.setProperty("--vt-dur",  "800ms");
    const nextTheme = theme === "dark" ? "light" : "dark";

    (document as any).startViewTransition(() => {
      flushSync(() => {
        root.setAttribute("data-theme", nextTheme);
        toggleTheme();
      });
    }).finished.finally(() => {
      root.style.removeProperty("--vt-anim");
      root.style.removeProperty("--vt-dur");
    });
  };

  const handleLangToggle = () => {
    const root = document.documentElement;
    if (!("startViewTransition" in document)) { toggleLang(); return; }

    root.style.setProperty("--vt-anim", "vt-sweep");
    root.style.setProperty("--vt-dur",  "420ms");

    (document as any).startViewTransition(() => {
      flushSync(toggleLang);
    }).finished.finally(() => {
      root.style.removeProperty("--vt-anim");
      root.style.removeProperty("--vt-dur");
    });
  };

  const NAV_LINKS = [
    { label: t("nav_store"),   href: "/#store" },
    { label: t("nav_reviews"), href: "/reviews" },
    { label: t("nav_faq"),     href: "/faq" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] h-[44px] nav-blur transition-colors duration-300"
        style={{ backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="w-full h-full px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <a href="/" className="hover:opacity-80 transition-opacity no-underline flex items-center">
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
            {/* Language toggle */}
            <button
              onClick={handleLangToggle}
              className="text-primary opacity-70 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none flex items-center justify-center p-0 text-[11px] font-semibold tracking-widest"
              aria-label="Toggle language"
            >
              {lang === "en" ? "FR" : "EN"}
            </button>

            <button
              onClick={handleThemeToggle}
              className="text-primary opacity-80 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none flex items-center justify-center p-0"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative text-primary opacity-80 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none flex items-center justify-center p-0"
              aria-label="Open bag"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-accent rounded-full text-[9px] font-bold flex items-center justify-center">
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
        className="fixed top-[44px] left-0 right-0 z-[999] md:hidden overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: "var(--bg)",
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
