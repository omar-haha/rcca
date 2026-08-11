# VESSEL — Full-Stack E-Commerce Portfolio Demo

**Live demo:** [vessel-demoversion.vercel.app](https://vessel-demoversion.vercel.app)

A complete e-commerce storefront built to demonstrate production-grade patterns end to end — not a live business. The catalog (supplements), branding, and legal copy are fictional; the architecture, checkout flow, admin tooling, and deployment pipeline are the same ones used in a real production project this demo was adapted from.

**This is a demo, not a live store.** Payment details shown at checkout are placeholder values (public example crypto addresses, a fictional e-transfer email) and nothing here processes real payments. See [ONBOARDING.md](ONBOARDING.md) for the full developer handoff — file map, component behavior, and the gotchas that came from actually building and running this.

---

## What this demonstrates

- **A real checkout flow, not a toy one** — server-side price re-derivation (client-supplied totals are never trusted), live stock validation with an oversell guard, a required consent checkbox, and an order-before-email write ordering so a customer never gets payment instructions for an order that doesn't exist.
- **Defensive backend patterns** — every Supabase write degrades gracefully when a migration hasn't been applied yet (retries without the new columns, logs a warning) instead of taking checkout down. Rate limiting fails *open*, not closed, so an outage in a third-party dependency never blocks a real customer.
- **A genuinely bilingual UI** — EN/FR throughout, type-checked (`TranslationKey`), not just a language switcher bolted onto English-only content.
- **Consent-gated analytics** — GA4 loads only after explicit opt-in, per Law 25/PIPEDA (notice alone isn't consent).
- **A verified-review system with teeth** — a "Verified Buyer" badge that's only ever shown when a review is actually matched to a real order (order number + email), not a badge shown by default.
- **A self-hosted deployment pipeline, demonstrated but not wired live here** — Docker + Caddy on a VPS, GitHub Actions driving push-to-deploy over SSH, with a documented reason for every non-obvious decision in the pipeline. This repo's own auto-deploy hook has been intentionally removed (see Deployment below) so a portfolio-demo push can never touch real infrastructure; the pipeline files remain as a demonstrated capability.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- npm
- Optional, only if you want the backend features live: free-tier accounts for Supabase, Resend, and Upstash

### Install dependencies

```bash
npm install
```

### Environment variables

```bash
cp .env.example .env.local
```

The UI renders fine with no environment variables set at all — stock/review fetches fail soft and the catalog falls back to static data. Fill in `.env.local` only if you want orders, reviews, and rate limiting actually working end to end. See `.env.example` for what each variable is for.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion, Lenis (smooth scroll) |
| Icons / Fonts | Lucide React · Inter, Orbitron (`next/font`) |
| Database | Supabase (Postgres) — orders, stock, reviews |
| Rate limiting | Upstash Redis (sliding-window, fails open if unreachable) |
| Transactional email | Resend (SMTP + API, domain-authenticated with DKIM/SPF) |
| Analytics | Google Analytics 4, opt-in only (Law 25 / PIPEDA-aware consent banner) |
| Hosting (live demo) | Vercel |
| Hosting (pipeline demonstrated in-repo) | Docker + Caddy on a VPS, GitHub Actions push-to-deploy — see Deployment |

---

## Project Structure

```
app/
  page.tsx              # Homepage: hero, catalog, quality section, footer
  layout.tsx             # Root layout, metadata, Organization JSON-LD
  products/[id]/         # Per-product pages, static-generated, Product JSON-LD
  admin/                 # Password-gated dashboard: orders, stock, reviews
  api/
    order/                # Checkout submission — validates stock, records order, sends emails
    reviews/, stock/       # Public read endpoints (in-process cached)
    admin/                 # Auth'd endpoints backing the admin dashboard
    contact/               # Contact form → email
  robots.ts, sitemap.ts   # SEO
components/
  modals/                # CartDrawer, CheckoutModal, ProductPickerModal, LegalModal
  providers/             # Theme, Cart (stock-aware), SmoothScroll, PageTransition, Language
  sections/              # Hero, product grid, quality/legal disclosures, reviews, footer
  ui/                    # Nav, product image + label component, CartToast, Spinner, logo
  Analytics.tsx          # GA4, gated behind explicit consent
lib/
  products.ts             # Product catalog
  legalContent.ts         # Single source of truth for all legal copy (EN/FR)
  i18n.ts                 # Bilingual translation strings
  supabase.ts, resend.ts  # Lazily-constructed clients (safe to import at build time)
  ratelimit.ts            # Upstash-backed per-endpoint rate limiters
deploy/
  migrations/             # Supabase SQL migrations, applied manually via the SQL editor
  setup-server.sh         # One-time server bootstrap
  keepalive.sh            # Cron job preventing Supabase/Upstash free-tier inactivity pause
Dockerfile, docker-compose.yml, Caddyfile
  # Self-hosted deployment pipeline — not currently wired to auto-deploy from this
  # repo (see Deployment below); kept as a demonstrated capability.
```

---

## Features

- Dark / light theme, persisted; bilingual EN/FR throughout
- Product catalog with live stock levels (cart quantities are capped to real inventory, both client- and server-side)
- Cart, checkout with Interac e-Transfer and cryptocurrency payment (placeholder values in this demo), order confirmation emails
- Click-wrap consent and a required order-notes field at checkout, both enforced server-side and stored with the order
- Customer reviews with a truthfully-earned "Verified Buyer" badge (only when a review is matched to a real order)
- Admin dashboard: order management, stock editing, review moderation
- Legal disclosures and legal copy maintained from one source for both the full legal page and the footer modal
- Opt-in analytics consent banner; no tracking before acceptance

---

## Deployment

The live demo runs on **Vercel**, deployed automatically on push to `main` via Vercel's GitHub integration — no workflow file needed for that path.

This repo was adapted from a production project that deploys differently: Docker + Caddy on a self-hosted VPS, with `.github/workflows/deploy.yml` driving push-to-deploy over SSH. That workflow has been **intentionally removed from this repo** — keeping it would mean a portfolio-demo push could SSH into and overwrite a real server. The Dockerfile, Caddyfile, and `deploy/` scripts remain as a demonstrated self-hosting capability; see [ONBOARDING.md](ONBOARDING.md) and `deploy/setup-server.sh` if you want to actually stand that path up against your own host.

Database schema changes ship as numbered SQL files in `deploy/migrations/`, applied manually via the Supabase SQL editor — they are not run automatically as part of either deploy path.
