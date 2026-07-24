#!/usr/bin/env bash
set -uo pipefail
FOUND=0
shopt -s nullglob
for f in supabase/migrations/*.sql; do
  if grep -q '^\\i' "$f"; then
    echo "  ^ $f: uses \\i (psql metacommand, not SQL) — ADR-006"
    FOUND=1
  fi
  if grep -qi 'public\.schema_migrations' "$f"; then
    echo "  ^ $f: creates its own schema_migrations — ADR-005"
    FOUND=1
  fi
  if grep -qiE 'create +policy[^;]*to +service_role' "$f"; then
    echo "  ^ $f: policy for service_role — ADR-004"
    FOUND=1
  fi
  if grep -qiE 'grant[^;]+ to +public *;' "$f"; then
    echo "  ^ $f: grant to the public role"
    FOUND=1
  fi
  if grep -qi 'create table' "$f" && ! grep -qi 'enable row level security' "$f"; then
    echo "  ^ $f: creates a table without enabling RLS — INV-01"
    FOUND=1
  fi
done
exit $FOUND
