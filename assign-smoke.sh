#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://localhost:3000/api/v1"
AUTH="Authorization: Bearer dev-token"
REQ="x-request-id: assign-$(date +%s)"

echo "== CREATE WORKER =="
WORKER_BODY=$(curl -sS -H "$REQ" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"name":"Juan","role":"Tech","seniority":"junior"}' \
  "$BASE_URL/workers")
echo "$WORKER_BODY"
WID=$(echo "$WORKER_BODY" | sed -n 's/.*"id":"\([^"]*\)".*/\1/p')
echo "WID=$WID"
[ -n "$WID" ] || { echo "ERROR: no id returned in WORKER create"; exit 1; }

echo -e "\n== CREATE PROJECT =="
PROJ_BODY=$(curl -sS -H "$REQ" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"name":"P1","clientName":"C1","startDate":"2026-02-01"}' \
  "$BASE_URL/projects")
echo "$PROJ_BODY"
PID=$(echo "$PROJ_BODY" | sed -n 's/.*"id":"\([^"]*\)".*/\1/p')
echo "PID=$PID"
[ -n "$PID" ] || { echo "ERROR: no id returned in PROJECT create"; exit 1; }

echo -e "\n== ASSIGN (204) =="
curl -i --max-time 10 -H "$REQ" -H "$AUTH" -H "Content-Type: application/json" \
  -d "{\"workerId\":\"$WID\"}" \
  "$BASE_URL/projects/$PID/workers"

echo -e "\n== ASSIGN AGAIN (409 expected) =="
curl -i --max-time 10 -H "$REQ" -H "$AUTH" -H "Content-Type: application/json" \
  -d "{\"workerId\":\"$WID\"}" \
  "$BASE_URL/projects/$PID/workers"

echo -e "\n== UNASSIGN (204) =="
curl -i --max-time 10 -H "$REQ" -H "$AUTH" \
  -X DELETE "$BASE_URL/projects/$PID/workers/$WID"

echo -e "\n== UNASSIGN AGAIN (404 expected) =="
curl -i --max-time 10 -H "$REQ" -H "$AUTH" \
  -X DELETE "$BASE_URL/projects/$PID/workers/$WID"