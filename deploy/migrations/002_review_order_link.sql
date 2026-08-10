-- 002_review_order_link.sql
--
-- Links a review to the order it came from, so the "Verified Buyer" badge can be
-- shown truthfully.
--
-- The badge was previously rendered on every review, including seeded fictional
-- ones — a representation of verified customer activity we could not support. It
-- is now rendered only where order_id is set, and order_id is only set when the
-- submitter supplied an order number whose stored email matches the one they
-- entered. Reviews without a link still publish; they just don't carry a badge.
--
-- The submitter's email is used only to verify that match and is NOT stored on
-- the review row — a published review should not carry a contact address.
--
-- Apply in the Supabase SQL editor (or via psql) before deploying. Safe to
-- re-run. app/api/reviews/route.ts degrades to unverified reviews if the column
-- is missing, and logs a warning when it does.

ALTER TABLE reviews ADD COLUMN IF NOT EXISTS order_id text;

CREATE INDEX IF NOT EXISTS reviews_order_id_idx ON reviews (order_id);

COMMENT ON COLUMN reviews.order_id IS
  'Order this review was verified against (orders.id). Non-null means the reviewer proved order ownership by matching order number + email; drives the "Verified Buyer" badge. Never set this by hand.';
