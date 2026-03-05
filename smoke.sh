#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://localhost:3000/api/v1"
AUTH="Authorization: Bearer dev-token"
REQ="x-request-id: smoke-$(date +%s)"

curlt() { curl -i --max-time 10 "$@"; }

echo "== HEALTH ==" && curlt -H "$REQ" "$BASE_URL/health"

echo -e "\n\n== LIST ==" && curlt -H "$REQ" "$BASE_URL/projects"

echo -e "\n\n== CREATE =="
CREATE_RES=$(curl --max-time 10 -sS -i -H "$REQ" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"name":"Proyecto A","clientName":"Cliente X","startDate":"2026-02-01","endDate":"2026-03-01"}' \
  "$BASE_URL/projects" | tee /dev/tty)

PROJECT_ID=$(echo "$CREATE_RES" | grep -oE '"id":"[^"]+"' | head -n1 | cut -d':' -f2 | tr -d '"')
echo -e "\nPROJECT_ID=$PROJECT_ID"
[ -n "$PROJECT_ID" ] || { echo "ERROR: no id returned in CREATE"; exit 1; }

echo -e "\n\n== GET ==" && curlt -H "$REQ" "$BASE_URL/projects/$PROJECT_ID"

echo -e "\n\n== PATCH ==" && curlt -X PATCH -H "$REQ" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"name":"Proyecto A (edit)"}' \
  "$BASE_URL/projects/$PROJECT_ID"

echo -e "\n\n== PATCH invalid dates ==" && curlt -X PATCH -H "$REQ" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"startDate":"2026-05-01","endDate":"2026-04-01"}' \
  "$BASE_URL/projects/$PROJECT_ID"

echo -e "\n\n== DELETE ==" && curlt -X DELETE -H "$REQ" -H "$AUTH" "$BASE_URL/projects/$PROJECT_ID"