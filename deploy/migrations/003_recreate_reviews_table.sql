-- 003_recreate_reviews_table.sql
--
-- The reviews table was found missing on 2026-08-03 -- confirmed gone via
-- information_schema (no matching relation in any schema), while orders and
-- stock were both intact in the same database. Root cause undetermined: the
-- Supabase plan in use only retains Postgres logs for 24h, and by the time
-- this was noticed the window had already passed. Nothing in this repo's
-- application code or migrations issues a DROP TABLE -- reviewed in full
-- alongside this fix.
--
-- Recreates the table as it should look now, i.e. including order_id
-- (originally added by 002_review_order_link.sql) from the start, so 002
-- does not need to be re-run afterward -- its ADD COLUMN IF NOT EXISTS would
-- just no-op against this.
--
-- The ~200 previously seeded fake reviews are not restored. They were fake
-- data slated for removal anyway (see LEGAL_COMPLIANCE_REVIEW.md §2.5) and
-- were already hidden from the live site before the table disappeared.
--
-- Safe to re-run.

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  location    text not null default '',
  product     text not null,
  rating      smallint not null check (rating between 1 and 5),
  body        text not null,
  date_label  text not null,
  approved    boolean not null default false,
  order_id    text
);

create index if not exists reviews_order_id_idx on public.reviews (order_id);

comment on column public.reviews.order_id is
  'Order this review was verified against (orders.id). Non-null means the reviewer proved order ownership by matching order number + email; drives the "Verified Buyer" badge. Never set this by hand.';

-- Belt-and-suspenders: the ALTER DEFAULT PRIVILEGES set up earlier in this
-- project should already cover new tables, but grant explicitly in case that
-- ever regresses -- a missing grant here reproduces the exact
-- "permission denied for table" outage this project already hit once.
grant all on public.reviews to service_role;

-- No direct anon/authenticated access is needed -- every read/write to this
-- table goes through the app's own API routes using service_role, which
-- bypasses RLS regardless. Enabling RLS with no policies just locks the table
-- down for any other role and satisfies Supabase's dashboard lint warning.
alter table public.reviews enable row level security;
