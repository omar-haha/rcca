# RCCA — Developer Handoff

## What this is

RCCA Inc. is a Canadian research-chemicals e-commerce storefront. It is a Next.js 15.5 App Router project with a strict Apple-aesthetic design system, bilingual (EN/FR) vial labels, and a full bag/checkout flow. It is deployed on Vercel and hosted at GitHub: `omar-haha/rcca`.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15.5 (App Router, React 19) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Language | TypeScript (strict) |
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
bg-primary   → var(--bg)
bg-secondary → var(--bg-alt)
bg-surface   → var(--surface)
text-primary → var(--text)
text-secondary → var(--text-muted)
text-tertiary  → var(--text-legal)
border-primary → var(--border)
```

**Important:** `bg-surface-hover` is NOT defined as a utility. Use `bg-[var(--surface-hover)]` inline or add it to globals.css if needed.

---

## File map

```
app/
  layout.tsx          Root layout — fonts, providers, anti-flash script
  page.tsx            Single page: AgeGateModal, AppleNav, AppleHero, AppleBentoGrid, QualitySection, AppleFooter
  globals.css         Theme variables, utility aliases, keyframe animations
  loading.tsx         Global suspense loading shell with centered Spinner

components/
  providers/
    ThemeProvider.tsx   Dark/light toggle, persists to localStorage
    CartProvider.tsx    Bag state (items, qty, lastAdded toast)
    LanguageProvider.tsx  (legacy, not currently used in main page)

  ui/
    AppleNav.tsx        Fixed top nav, hamburger mobile menu, bag badge, theme toggle
    GlassVial.tsx       Renders vial PNG + bilingual label overlay; weight prop kept for API compat
    RccaLogo.tsx        SVG logo, colour via CSS `currentColor`
    CartToast.tsx       Toast shown after addToCart (uses CartProvider.lastAdded), clickable
    Spinner.tsx         Smooth Apple-style SVG spinner for loading states

  sections/
    AppleHero.tsx       Full-viewport hero section (variant: primary/secondary/tertiary)
    AppleBentoGrid.tsx  Product catalog grid with filter pills + "Added ✓" button animation
    QualitySection.tsx  Quality assurance cards + legal disclosures
    AppleFooter.tsx     Footer with #contact anchor

  modals/
    AgeGateModal.tsx    Blurred popup age gate with entrance/exit scale animations; province selector sets minimum age automatically; persists "rc_age_ok" to localStorage
    CartDrawer.tsx      Slide-in "Bag" panel; delete button is a frosted pill; deletion uses a haptic press animation; qty steppers animate on press
    CheckoutModal.tsx   Multi-step checkout form with simulated `isSubmitting` spinner state
```

---

## Products

Defined in [lib/products.ts](lib/products.ts). Each product has:

```ts
{ id, name, cas, cat: 'peptide' | 'misc', price, unit, purity, stock: 'in' | 'low' | 'out' }
```

- `stock: 'out'` cards are greyed out and sorted to the end of the grid.
- To add a product: append an entry to the `products` array — it automatically appears in the bento grid.

---

## GlassVial component

`<GlassVial productName unit className blur? showLabel? weight />` renders:

- The vial PNG (`/public/images/vial-rembg-cropped.png`) — RGBA, 385×883px
- A bilingual label overlay (EN + FR text, uses `cqi` container-query units for font scaling)
- `weight` prop is accepted but unused (kept for call-site compatibility)
- Label background variables: `--label-bg`, `--label-bg-end`, `--label-fg`, etc. are scoped to `.vial-label` in globals.css — they are always white regardless of theme

---

## Cart system (The Bag)

`CartProvider` holds state in memory (no persistence). Key methods:

| Method | What it does |
|---|---|
| `addToCart(product, qty)` | Upserts item, sets `lastAdded` (triggers CartToast) |
| `updateQty(id, delta)` | Increments/decrements; removes item if qty drops to 0 |
| `removeFromCart(id)` | Deletes item instantly, triggers haptic press UI animation in CartDrawer |
| `clearCart()` | Wipes all items (called after checkout confirmation) |
| `clearLastAdded()` | Dismisses the current toast |

---

## Age gate

- Shows once per browser session via `localStorage.rc_age_ok`
- User selects a Canadian province → minimum age auto-populates (no manual age input)
- Confirmation checkbox required
- Renders as a blurred-backdrop popup card with fluid enter/exit animations, themed via CSS variables

---

## Animations (globals.css keyframes)

| Name | Used by |
|---|---|
| `cart-item-in` | CartDrawer — staggered slide-in for bag items on open |
| `btn-pop` | AppleBentoGrid — Haptic scale depression (`0.96`) for buttons |
| `ring-pulse` | AppleBentoGrid — Expanding green ring for "Added ✓" confirmation |
| `.animate-btn-pop` | Utility class combining both `btn-pop` and `ring-pulse` |

---

## Known decisions / gotchas

- **Vercel build is strict TypeScript.** The dev server will run with import errors that Vercel will reject. Always run `npm run build` before pushing.
- **Inline styles win over Tailwind hover classes.** If a button uses `style={{ backgroundColor: ... }}`, Tailwind `hover:bg-*` won't override it. Use `bg-[var(--variable)]` Tailwind syntax instead so hover utilities work.
- **`h-full` inside auto-height flex containers** resolves to auto in most browsers — this is used intentionally in GlassVial so the image sizes naturally.
- **`flex-shrink` bug:** The CartDrawer items map must have `shrink-0` to avoid flexbox implicitly shrinking the cards and hiding their quantity stepper buttons.
- **`perspective: 800px`** on the GlassVial outer div is required for the label's `rotateX(2deg)` to render with depth. Do not remove it.
- The white powder gradient that was previously inside GlassVial was removed because it showed through the semi-transparent PNG glass and looked like a background artifact.

---

## Deployment

Push to `main` → Vercel deploys automatically. No staging environment. Check the Vercel dashboard for build logs if a push fails.
