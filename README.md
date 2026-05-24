# RCCA — Research Chemical Compounds of America

High-purity research peptides and compounds storefront built with Next.js 15, React 19, and Tailwind CSS v4. Apple-aesthetic UI with dark/light theme, animated cart, bilingual vial labels, and compliance-first checkout.

**Live site:** [researchchemicals.ca](https://www.researchchemicals.ca/)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node.js)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run start
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Icons | Lucide React |
| Fonts | Inter, Orbitron (Google Fonts) |
| Language | TypeScript |

---

## Project Structure

```
app/
  page.tsx          # Main page (hero, catalog, quality, footer)
  layout.tsx        # Root layout with providers
  globals.css       # CSS custom properties, keyframe animations
components/
  modals/
    AgeGateModal    # Age + province verification gate
    CartDrawer      # Slide-in cart with animated item cards
    CheckoutModal   # Multi-step checkout with compliance attestations
  providers/
    ThemeProvider   # Dark/light theme context (persisted)
    CartProvider    # Cart state, qty management, toast notifications
  sections/
    AppleHero       # Full-bleed hero ribbons
    AppleBentoGrid  # Product catalog with category filters
    QualitySection  # Quality assurance & legal disclosures
    AppleFooter     # Site footer with nav links
  ui/
    AppleNav        # Fixed top navigation bar
    GlassVial       # Animated 3D glass vial with bilingual label
    CartToast       # Add-to-cart confirmation pill
    RccaLogo        # SVG logo component
lib/
  products.ts       # Product catalog data
  utils.ts          # cn() class utility
```

---

## Features

- Dark / light theme toggle — persisted to `localStorage`
- Animated glass vial product renders with bilingual FR/EN labels
- Cart drawer with quantity steppers, delete animations, and poof effects
- Age gate with province selector and inline validation
- Compliance attestation checkboxes at checkout
- Fully responsive, Apple-inspired design system
