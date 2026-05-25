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
      page.tsx             Async server component; resolves params, finds product by id, passes to ProductDetail; generateStaticParams pre-renders all product pages; generateMetadata sets per-product title/description

components/
  providers/
    ThemeProvider.tsx         Dark/light toggle, persists to localStorage
    CartProvider.tsx          Bag state (items, qty, lastAdded toast)
    SmoothScrollProvider.tsx  Lenis smooth-scroll wrapper (duration 1.2s)
    PageTransitionProvider.tsx  framer-motion fade/slide between routes

  ui/
    AppleNav.tsx        Fixed top nav, hamburger mobile menu, bag badge, theme toggle; all href links use absolute paths (/, /#store, /#quality, etc.) so they resolve correctly from product pages
    GlassVial.tsx       Renders vial PNG + bilingual label overlay
    RccaLogo.tsx        SVG logo, colour via CSS currentColor
    CartToast.tsx       Toast shown after addToCart (uses CartProvider.lastAdded), clickable
    Spinner.tsx         Smooth Apple-style SVG spinner for loading states

  sections/
    AppleHero.tsx       Full-viewport hero section (variant: primary/secondary/tertiary); CTA uses scrollIntoView to avoid URL hash side-effects
    AppleBentoGrid.tsx  Product catalog — 3-column grid, grouped by product family (one card per name); filter pills (Best Sellers / In Stock / All); all cards show "Select Options"; clicking a card opens ProductPickerModal; AnimatePresence + IntersectionObserver handle filter transitions and initial reveal
    ProductDetail.tsx   "use client" full product page: AppleNav + AgeGateModal + cart stack included; two-column layout (vial zoom, product info); variant dose-pill selector for multi-SKU products; qty stepper; Add to Bag with press + text-warp animations; specs table (CAS, unit, Purity (Supplier), category)
    QualitySection.tsx  "High Purity. Every Order." headline + one supporting sentence + 3 icon badges (Verified Suppliers, Research Grade, Fast Delivery); animated gradient blobs in background; followed by 5-section legal disclosures + universal disclaimer
    AppleFooter.tsx     "use client"; 3-column layout: Explore (left) | Contact Us popup (centre) | Legal (right); Contact opens an upward popup matching the button's shape; Legal links open LegalModal; no disclaimer text in footer body

  modals/
    AgeGateModal.tsx        Blurred popup age gate; province selector sets minimum age automatically; persists rc_age_ok to localStorage
    CartDrawer.tsx          Slide-in "Bag" panel; body scroll locked while open; deletion collapses item with animation; qty steppers
    CheckoutModal.tsx       Checkout: Contact (name, email, industry dropdown) + Shipping + Payment (Interac e-Transfer or Cryptocurrency only); copy button for payment details; success modal echoes exact payment instruction for chosen method; savedTotal captures cart total before clearCart()
    ProductPickerModal.tsx  Variant picker popup — opens when a bento card is clicked; shows dose pills, qty stepper, Add to Bag, "View product page →" link; spring animation in/out
    LegalModal.tsx          Shared popup for Privacy Policy, Terms of Use, and Refund Policy; body-scroll locked while open; click outside to close; same frosted backdrop + rounded card style as other modals; scrollable body only (overflow-hidden on card clips scrollbar to rounded corners)
```

---

## Products

Defined in [lib/products.ts](lib/products.ts). Each product has:

```ts
{ id, name, cas, cat: 'peptide' | 'misc', price, unit, purity, stock: 'in' | 'low' | 'out', bestSeller?: boolean }
```

The catalog contains **42 SKUs** across **26 product families** sourced from the supplier price list. Multi-dose products (e.g. Tirzepatide 20mg / 30mg / 60mg) each have a separate entry sharing the same `name`.

- `purity` — use `≥99%` / `≥98%` for single-compound peptides with supplier data; use `'High Purity'` for blends and proprietary formulations (Glow, Klow80, Lemon Bottle, Most-C, combos, CJC+IPA).
- `stock: 'out'` cards are greyed out and sorted to the end automatically.
- `bestSeller: true` marks a product for the "Best Sellers" filter. Keep exactly **3** so they fill the 3-column grid.
- To add a product: append an entry — it automatically appears in the grid and gets a statically pre-rendered product page.

### ProductFamily

`getProductFamilies()` (also in `lib/products.ts`) groups all products by `name` and returns `ProductFamily[]`:

```ts
{ name, variants: Product[], cat, minPrice, bestSeller? }
```

Used by `AppleBentoGrid` (one card per family) and `ProductPickerModal` (dose pills = one per variant).

---

## Product pages

Route: `/products/[id]` — one page per SKU, all pre-rendered at build time via `generateStaticParams`.

**`app/products/[id]/page.tsx`** is a server component. Resolves `params`, finds product by id, returns 404 if missing, renders `<ProductDetail product={p} />`.

**`components/sections/ProductDetail.tsx`** is the full client page. It includes its own `AppleNav`, `AgeGateModal`, `CartDrawer`, `CartToast`, and `CheckoutModal` so the bag works on every product page without changes to the root layout.

Key features:
- **Variant selector** — if the product name has multiple SKUs in `products`, dose pills appear above the price. Selecting a pill swaps all displayed data (price, unit, CAS, specs) in place via local state; no navigation.
- **Vial image panel** — hover lifts vial; click opens a framer-motion zoom overlay
- **Qty stepper** — defaults to 1, disabled when out of stock
- **Add to Bag** — `btn-physical` + `animate-btn-pop` + `animate-text-warp`
- **Specs table** — CAS number, unit size, Purity (Supplier), category in alternating-row style
- **Back link** — `← All Products` navigates to `/#store`

---

## ProductPickerModal

`components/modals/ProductPickerModal.tsx` — opened by clicking any bento card.

- Receives `family: ProductFamily | null`; `null` = closed.
- Internal `PickerContent` component is keyed by `family.name` so state resets between products.
- Dose pills: one per variant, shows unit + price; selected pill fills accent blue.
- Single-variant families skip the pill section.
- Add to Bag → calls `addToCart`, then closes the modal after 480ms.
- "View product page →" link navigates to `/products/[selectedVariant.id]`.

---

## Checkout

`components/modals/CheckoutModal.tsx` — payment methods: **Interac e-Transfer** and **Cryptocurrency (BTC / ETH / USDT)** only.

- Contact section includes: First Name, Last Name, Email, and an **Industry dropdown** (6 options: Analytical / Scientific Research, Biotech / Pharmaceutical R&D, Industrial / Manufacturing, Chemical / Material Sciences, Academic / University Research, Private / Independent Laboratory Research).
- Two toggle cards select the payment method; the active card gets an accent outline.
- **Interac panel**: shows `pay@rcca.ca` with a copy button + memo instructions.
- **Crypto panel**: BTC / ETH / USDT tabs switch the wallet address; copy button per address.
- Placing an order generates a random order ID, clears the cart, and opens the success modal.
- **Success modal** echoes the exact payment details (e-transfer email + order # as memo, or wallet address + USD amount) for the chosen method. `savedTotal` captures the cart total before `clearCart()` so the amount is accurate.

---

## Legal modals

`components/modals/LegalModal.tsx` — shared modal for Privacy Policy, Terms of Use, and Refund Policy.

- `LegalPage` type: `"privacy" | "terms" | "refund" | null`. Pass `null` to close.
- Triggered by footer Legal column buttons in `AppleFooter`.
- Body scroll locked while open (`document.body.style.overflow = "hidden"`).
- Click outside the card to close; X button in header also closes.
- `overflow-hidden` on the card wrapper clips the scrollbar to the rounded corners — do not remove it.
- Content is defined inline as a `CONTENT` constant — edit there to update legal text.

---

## Footer

`components/sections/AppleFooter.tsx` — `"use client"`. Three-column layout:

- **Left** — Explore links (Shop, Quality & Sourcing); text left-aligned.
- **Centre** — Contact Us popup trigger: a card with mail icon, title, subtitle, chevron. Clicking opens a form as an upward popup (`position: absolute; bottom: calc(100% + 8px)`) that matches the button's exact shape (`rounded-[16px]`, same border/bg). A full-screen invisible backdrop closes it on click-outside. Form fields: First Name, Last Name, Email, Phone, Message, Submit.
- **Right** — Legal links (Privacy Policy, Terms of Use, Refund Policy); text right-aligned. Each opens `LegalModal`.

No disclaimer text in the footer body — covered by `QualitySection` legal disclosures.

---

## Quality section

`components/sections/QualitySection.tsx` — two visual blocks:

**Quality note** (`id="quality"`, `bg-secondary`):
- Headline: "High Purity. Every Order."
- One supporting sentence about research suitability.
- Three icon badges: ShieldCheck / Verified Suppliers, Microscope / Research Grade, Truck / Fast Delivery — icons use `var(--text-muted)`, tiles use `var(--surface)` with border.
- Animated background blobs: three `radial-gradient` divs with CSS keyframe animations (`blob-drift-1/2/3` defined in `globals.css`); `overflow-hidden` + `position: relative` contain them. Blob keyframes are 14s / 18s / 22s ease-in-out loops.

**Legal disclosures** (`id="legal"`, `bg-primary`): 5 sections in a 2-column grid:
1. Research Use Only
2. Not Regulatory Approved
3. Purchaser Eligibility
4. Export & Import Controls
5. Limitation of Liability

Plus a Universal Disclaimer box at the bottom.

---

## Favicon

`app/icon.svg` — Next.js App Router auto-discovers this file and injects `<link rel="icon">`. Black rounded square with RCCA wordmark centred, `stroke-width="14"` for legibility at tab size. To change: edit `app/icon.svg` only.

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

All primary CTA buttons use CSS utility classes defined in `globals.css`:

- **`.btn-physical`** — flat 2D button; on `:active` an inset shadow blooms from the top and side inner edges (40ms in, 220ms fade out on release), giving a tactile press feel without any translateY.
- **`.btn-physical-accent`** — sets `--inset-shadow` to a deep dark blue (`rgba(0,25,110,0.55)`); dark-mode variant included.

The "Add to Bag" / confirm button also applies:
- **`.animate-btn-pop`** — plays `btn-press-confirm` keyframe (inset shadow bloom + fade, 0.4s) triggered via React state.
- **`.animate-text-warp`** on the inner `<span>` — plays `text-warp-confirm` (blur + squish out, hold, return, 0.42s) simultaneously.

---

## Animations (globals.css keyframes)

| Name | Used by |
|---|---|
| `blob-drift-1/2/3` | QualitySection — slow-moving radial gradient blobs in background (14s / 18s / 22s loops) |
| `cart-item-in` | CartDrawer — staggered slide-in for bag items on open |
| `btn-press-confirm` | `.animate-btn-pop` — inset shadow bloom + fade for button press confirmation |
| `text-warp-confirm` | `.animate-text-warp` — button text blurs and squishes out then snaps back on click |

framer-motion handles all other entry/scroll animations (spring variants in AppleHero, AppleBentoGrid, ProductPickerModal, PageTransitionProvider).

**framer-motion v12 gotcha:** `type: "spring"` in variant objects must be typed as `"spring" as const` — plain string is not assignable to `AnimationGeneratorType`. Same applies to `staggerDirection: -1 as const`.

---

## Known decisions / gotchas

- **Vercel build is strict TypeScript.** The dev server will run with import errors that Vercel will reject. Always run `npm run build` before pushing.
- **All nav/footer links are absolute paths** (`/`, `/#store`, `/#quality`, etc.). Bare hash hrefs like `#store` resolve relative to the current page — on `/products/[id]` they become `/products/[id]#store`. Always use the `/#` prefix.
- **Inline styles win over Tailwind hover classes.** If a button uses `style={{ backgroundColor: ... }}`, Tailwind `hover:bg-*` won't override it. Use `bg-[var(--variable)]` Tailwind syntax instead so hover utilities work.
- **`h-full` inside auto-height flex containers** resolves to auto in most browsers — used intentionally in GlassVial so the image sizes naturally.
- **CartDrawer `shrink-0`:** Each cart item wrapper needs `shrink-0` to prevent flexbox from squashing cards and hiding qty steppers.
- **`perspective: 800px`** on the GlassVial outer div is required for the label's `rotateX(2deg)` to render with depth. Do not remove it.
- **Body scroll lock:** CartDrawer, AgeGateModal, CheckoutModal, and LegalModal all set `document.body.style.overflow = "hidden"` while open and restore it on close/unmount.
- **LegalModal scrollbar clipping:** The card wrapper has `overflow-hidden` — this clips the scrollbar to the rounded corners. Removing it will cause the scrollbar to break out of the shape.
- **Footer contact popup z-index:** The popup wrapper is `z-[50]`; the invisible backdrop is `fixed inset-0 z-[40]` so clicks outside the popup hit the backdrop and close it, while clicks inside the popup stop propagation.
- **Shop Now scroll:** The CTA `<a>` intercepts hash link clicks with `e.preventDefault()` and calls `scrollIntoView` so the URL never changes to `#store`.
- **Add to Bag inner `<span>`** has `pointer-events: none` so all clicks in the button's padding area route to the button element, not the span.
- **AnimatePresence + IntersectionObserver in AppleBentoGrid:** `whileInView` with `once: true` only fires on first scroll. The grid uses `IntersectionObserver` for initial reveal, then `AnimatePresence mode="wait"` with `key={activeFilter}` to animate items out and in on filter change.
- **Purity labels:** Never claim RCCA independently tests products. Single-compound peptides show supplier-reported percentages (e.g. `≥99%`); blends/combos use `'High Purity'`. Purity data shown on product pages is labelled "(supplier-reported)".

---

## Deployment

Push to `main` → Vercel deploys automatically. No staging environment. Check the Vercel dashboard for build logs if a push fails.
