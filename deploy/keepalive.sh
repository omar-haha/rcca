#!/usr/bin/env bash
# Run periodically (via cron) to prevent free-tier auto-pause/archival:
#   - Supabase pauses projects after 7 days with no activity
#   - Upstash archives (deletes) Redis databases after 30 days with no activity
set -euo pipefail

ENV_FILE="/opt/rcca/.env.production"
if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

curl -s https://researchchemicals.ca/api/stock > /dev/null || true

if [ -n "${UPSTASH_REDIS_REST_URL:-}" ] && [ -n "${UPSTASH_REDIS_REST_TOKEN:-}" ]; then
  curl -s "$UPSTASH_REDIS_REST_URL/ping" -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN" > /dev/null || true
fi
