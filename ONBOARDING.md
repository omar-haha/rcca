# RCCA — Developer Handoff

## What this is

RCCA Inc. is a Canadian research-chemicals e-commerce storefront. It is a Next.js 15.5 App Router project with a strict Apple-aesthetic design system, bilingual (EN/FR) vial labels, and a full bag/checkout flow. Deployed on Vercel; hosted at GitHub: `omar-haha/rcca`.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15.5 (App Router, React 19) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Language | TypeScript (strict) |
| Animations | framer-motion v12 |
| Smooth scroll | Lenis |
| Icons | lucide-react |
| Font (labels) | Orbitron (Google Fonts, via `next/font`) |
| Deployment | Vercel (auto-deploy on push to `main`) |

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # must pass before pushing — Vercel uses strict TS check
```

---

## Theme system

Defined in [app/globals.css](app/globals.css).

- **Default theme is light.** `:root` holds light values; `[data-theme="dark"]` overrides to dark.
- An inline `<script>` in [app/layout.tsx](app/layout.tsx) reads `localStorage.theme` and sets `data-theme` on `<html>` **before React hydrates** — prevents flash.
- [components/providers/ThemeProvider.tsx](components/providers/ThemeProvider.tsx) initialises state as `"light"` and syncs via `toggleTheme`.

### Key CSS variables

```css
--bg             /* page background */
--bg-alt         /* alternate section background */
--surface        /* card/panel background */
--surface-hover  /* interactive surface hover */
--border         /* subtle border */
--text           /* primary text */
--text-muted     /* secondary text */
--text-legal     /* tertiary / legal text */
--accent         /* #0071e3 light / #2997ff dark */
--nav-bg         /* frosted glass nav background */
```

### Tailwind utility aliases (defined in globals.css)

```
bg-primary     → var(--bg)
bg-secondary   → var(--bg-alt)
bg-surface     → var(--surface)
text-primary   → var(--text)
text-secondary → var(--text-muted)
text-tertiary  → var(--text-legal)
border-primary → var(--border)
```

**Important:** `bg-surface-hover` is NOT defined as a utility. Use `bg-[var(--surface-hover)]` inline or add it to globals.css if needed.

---

## File map

```
app/
  layout.tsx               Root layout — fonts, providers, anti-flash script
  page.tsx                 Single page: AgeGateModal, AppleNav, AppleHero, AppleBentoGrid, QualitySection, AppleFooter
  globals.css              Theme variables, utility aliases, button utilities, keyframe animations
  loading.tsx              Global suspense loading shell with centered Spinner
  icon.svg                 Favicon — black rounded square with RCCA wordmark centred (auto-discovered by Next.js App Router)
  products/
    [id]/
      page.tsx             Async server component; resolves params, finds product by id, passes to ProductDetail; generateStaticParams pre-renders all 9 product pages; generateMetadata sets per-product title/description

components/
  providers/
    ThemeProvider.tsx         Dark/light toggle, persists to localStorage
    CartProvider.tsx          Bag state (items, qty, lastAdded toast)
    SmoothScrollProvider.tsx  Lenis smooth-scroll wrapper (duration 1.2s)
    PageTransitionProvider.tsx  framer-motion fade/slide between routes

  ui/
    AppleNav.tsx        Fixed top nav, hamburger mobile menu, bag badge, theme toggle
    GlassVial.tsx       Renders vial PNG + bilingual label overlay
    RccaLogo.tsx        SVG logo, colour via CSS currentColor
    CartToast.tsx       Toast shown after addToCart (uses CartProvider.lastAdded), clickable
    Spinner.tsx         Smooth Apple-style SVG spinner for loading states

  sections/
    AppleHero.tsx       Full-viewport hero section (variant: primary/secondary/tertiary); CTA uses scrollIntoView to avoid URL hash side-effects
    AppleBentoGrid.tsx  Product catalog grid with semantic filter pills (Best Sellers / In Stock / All); cards navigate to /products/[id] on click; Add to Bag stopPropagation prevents card navigation; AnimatePresence handles filter transitions; IntersectionObserver controls initial reveal
    ProductDetail.tsx   "use client" full product page: AppleNav + AgeGateModal + cart stack included; two-column layout (vial image with zoom overlay, product info); qty stepper; Add to Bag with press + text-warp animations; specs table (CAS, unit, purity, category); Best Seller + stock badges
    QualitySection.tsx  Quality assurance cards + legal disclosures
    AppleFooter.tsx     Footer with 2-line disclaimer, Explore/Contact/Legal columns, #contact anchor

  modals/
    AgeGateModal.tsx    Blurred popup age gate; province selector sets minimum age automatically; persists rc_age_ok to localStorage; age confirmation only (no research credentials)
    CartDrawer.tsx      Slide-in "Bag" panel; body scroll locked while open; deletion collapses item with animation; qty steppers
    CheckoutModal.tsx   Checkout form: Contact Information (name + email), Shipping Address, Payment Method; no compliance attestations
```

---

## Products

Defined in [lib/products.ts](lib/products.ts). Each product has:

```ts
{ id, name, cas, cat: 'peptide' | 'misc', price, unit, purity, stock: 'in' | 'low' | 'out', bestSeller?: boolean }
```

- `stock: 'out'` cards are greyed out and sorted to the end of the grid automatically.
- `bestSeller: true` marks a product for the "Best Sellers" filter tab.
- To add a product: append an entry to the `products` array — it automatically appears in the grid and gets a statically pre-rendered product page.

---

## Product pages

Route: `/products/[id]` — one page per product, all pre-rendered at build time via `generateStaticParams`.

**`app/products/[id]/page.tsx`** is a server component. It resolves `params` (a Promise in Next.js 15), finds the product by id, returns 404 if missing, and renders `<ProductDetail product={p} />`.

**`components/sections/ProductDetail.tsx`** is the full client page. It includes its own `AppleNav`, `AgeGateModal`, `CartDrawer`, `CartToast`, and `CheckoutModal` (same stack as `page.tsx`) so the bag works on every product page without changes to the root layout.

Key features:
- **Vial image panel** — hover lifts vial; click opens a framer-motion zoom overlay (blurred backdrop, spring scale animation, click-outside to close)
- **Qty stepper** — defaults to 1, disabled when out of stock
- **Add to Bag** — same `btn-physical` + `animate-btn-pop` + `animate-text-warp` as the grid; adds `qty` units
- **Specs table** — CAS number, unit size, purity, category in alternating-row style
- **Badges** — category pill, "Best Seller" accent pill (if `bestSeller: true`), stock status pill with colour coding
- **Back link** — `← All Products` navigates to `/#store`

---

## Favicon

`app/icon.svg` — Next.js App Router auto-discovers this file and injects `<link rel="icon">`. The SVG uses a 320×320 square `viewBox` centred on the RCCA lettermark paths (same geometry as `RccaLogo.tsx`) with a black rounded-rect background and white strokes thickened to `stroke-width="14"` for legibility at tab icon size.

To change the icon: edit `app/icon.svg`. No layout changes needed.

---

## GlassVial component

`<GlassVial productName unit className blur? showLabel? weight />` renders:

- The vial PNG (`/public/images/vial-rembg-cropped.png`) — RGBA, 385×883px
- A bilingual label overlay (EN + FR text, uses `cqi` container-query units for font scaling)
- `weight` prop is accepted but unused (kept for call-site compatibility)
- Label background variables (`--label-bg`, `--label-fg`, etc.) are scoped to `.vial-label` in globals.css — always white regardless of theme

---

## Cart system (The Bag)

`CartProvider` holds state in memory (no persistence). Key methods:

| Method | What it does |
|---|---|
| `addToCart(product, qty)` | Upserts item, sets `lastAdded` (triggers CartToast) |
| `updateQty(id, delta)` | Increments/decrements; removes item if qty drops to 0 |
| `removeFromCart(id)` | Deletes item, triggers collapse animation in CartDrawer |
| `clearCart()` | Wipes all items (called after checkout confirmation) |
| `clearLastAdded()` | Dismisses the current toast |

---

## Age gate

- Shows once per browser session via `localStorage.rc_age_ok`
- User selects a Canadian province → minimum age auto-populates (no manual age input)
- Confirmation checkbox required; no research credentials or attestations asked
- Renders as a blurred-backdrop popup card with fluid enter/exit animations, themed via CSS variables

---

## Button system

All primary CTA buttons use two CSS utility classes defined in `globals.css`:

- **`.btn-physical`** — raised `box-shadow: 0 4px 0 0` bottom edge that collapses to `1px` on `:active` with a `translateY(3px)` press, creating a physical push-down feel. Release transition is slower (150ms) than press (50ms) for a snappy feel.
- **`.btn-physical-accent`** — companion class that sets the shadow colour to match the accent button colour. Dark-mode variant included.

The "Add to Bag" button also applies:
- **`.animate-btn-pop`** — plays `btn-press-confirm` keyframe (programmatic press-down + spring-back, 0.4s) when `clickedId` matches the product. Triggered via React state so it plays on fast clicks regardless of how long the pointer is held.
- **`.animate-text-warp`** on the inner `<span>` — plays `text-warp-confirm` (blur + squish out, hold, return, 0.42s) simultaneously with the press animation for extra visual confirmation.

---

## Animations (globals.css keyframes)

| Name | Used by |
|---|---|
| `cart-item-in` | CartDrawer — staggered slide-in for bag items on open |
| `btn-press-confirm` | `.animate-btn-pop` — programmatic press-down + spring-back for Add to Bag |
| `text-warp-confirm` | `.animate-text-warp` — button text blurs and squishes out then snaps back on click |

framer-motion handles all other entry/scroll animations (spring variants in AppleHero, AppleBentoGrid, PageTransitionProvider).

**framer-motion v12 gotcha:** `type: "spring"` in variant objects must be typed as `"spring" as const` — plain string is not assignable to `AnimationGeneratorType`. Same applies to `staggerDirection: -1 as const`.

---

## Known decisions / gotchas

- **Vercel build is strict TypeScript.** The dev server will run with import errors that Vercel will reject. Always run `npm run build` before pushing.
- **Inline styles win over Tailwind hover classes.** If a button uses `style={{ backgroundColor: ... }}`, Tailwind `hover:bg-*` won't override it. Use `bg-[var(--variable)]` Tailwind syntax instead so hover utilities work.
- **`h-full` inside auto-height flex containers** resolves to auto in most browsers — used intentionally in GlassVial so the image sizes naturally.
- **CartDrawer `shrink-0`:** Each cart item wrapper needs `shrink-0` to prevent flexbox from squashing cards and hiding qty steppers.
- **`perspective: 800px`** on the GlassVial outer div is required for the label's `rotateX(2deg)` to render with depth. Do not remove it.
- **Body scroll lock:** CartDrawer and AgeGateModal both set `document.body.style.overflow = "hidden"` while open and restore it on close/unmount — intentional so only their panels scroll.
- **Shop Now scroll:** The CTA `<a>` intercepts hash link clicks with `e.preventDefault()` and calls `scrollIntoView` so the URL never changes to `#store`. Without this, re-clicking after scroll does nothing.
- **Add to Bag inner `<span>`** has `pointer-events: none` so all clicks in the button's padding area route to the button element, not the span. Removing this causes missed clicks at the button's edges.
- **AnimatePresence + IntersectionObserver in AppleBentoGrid:** `whileInView` with `once: true` only fires on first scroll — it won't re-trigger when the filter changes. The grid uses `IntersectionObserver` for the initial reveal state, then `AnimatePresence mode="wait"` with `key={activeFilter}` to animate items out and in on filter change.

---

## Deployment

Push to `main` → Vercel deploys automatically. No staging environment. Check the Vercel dashboard for build logs if a push fails.
