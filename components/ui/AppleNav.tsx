"use client";

import { useState } from "react";
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

    // Capture old bg before switching so overlay matches outgoing theme
    const oldBg = getComputedStyle(root).getPropertyValue("--bg").trim() || (theme === "dark" ? "#0a0a0a" : "#ffffff");

    const nextTheme = theme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    toggleTheme();

    // Old-theme overlay shrinks into the button — reveals new theme underneath
    const overlay = document.createElement("div");
    overlay.style.cssText = `position:fixed;inset:0;z-index:9998;pointer-events:none;background-color:${oldBg}`;
    document.body.appendChild(overlay);

    overlay.animate(
      [
        { clipPath: `circle(200vmax at ${x}px ${y}px)` },
        { clipPath: `circle(0px at ${x}px ${y}px)` },
      ],
      { duration: 1100, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    ).finished.then(() => overlay.remove());
  };

  const handleLangToggle = () => {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;z-index:9998;pointer-events:none;background-color:var(--bg)";
    document.body.appendChild(overlay);

    const timing = { duration: 300, easing: "cubic-bezier(0.4,0,0.2,1)" } as const;

    // Slide in from left, covering page
    overlay.animate(
      [{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }],
      { ...timing, fill: "forwards" }
    ).finished.then(() => {
      toggleLang();
      // Two rAFs ensure React flushes its re-render before uncovering
      return new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
    }).then(() => {
      // Slide out to right, revealing new language
      overlay.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }],
        timing
      ).finished.then(() => overlay.remove());
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
