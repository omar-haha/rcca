-- 001_research_intent.sql
--
-- Adds the checkout click-wrap record to the orders table.
--
--   research_intent — the purchaser's own typed description of their intended
--                     in-vitro research application, captured at checkout.
--   terms_accepted  — whether the purchaser affirmatively checked the
--                     research-use / Terms of Use declaration.
--
-- Why this is stored rather than only emailed: these two fields are the evidence
-- that a purchaser who later claims they were sold a consumable product made a
-- written misrepresentation to obtain it. A queryable order record is worth far
-- more than a thread in an inbox.
--
-- Apply in the Supabase SQL editor (or via psql) before deploying. Safe to
-- re-run. app/api/order/route.ts falls back to an insert without these columns
-- if the migration has not been applied yet, and logs a warning when it does.

ALTER TABLE orders ADD COLUMN IF NOT EXISTS research_intent text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS terms_accepted  boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN orders.research_intent IS
  'Purchaser-typed intended in-vitro research application, collected at checkout. Legal record — do not overwrite.';
COMMENT ON COLUMN orders.terms_accepted IS
  'True when the purchaser affirmatively accepted the research-use / Terms of Use click-wrap declaration at checkout.';
