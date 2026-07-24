#!/usr/bin/env bash
set -uo pipefail
FAIL=0
step() {
  printf '%-24s' "$1"
  if eval "$2" >/tmp/verify.log 2>&1; then
    echo "OK"
  else
    echo "FAILED"
    sed 's/^/    /' /tmp/verify.log | tail -30
    FAIL=1
  fi
}
echo "=== VERIFY — Viva+ ==="
step "deps (npm ci)"  "npm ci --silent"
step "typecheck"      "npm run typecheck"
step "test"           "npm run test"
step "build"          "npm run build"
step "secrets"        "bash scripts/check-secrets.sh"
step "stack"          "bash scripts/check-stack.sh"
step "migrations"     "bash scripts/check-migrations.sh"
echo "======================"
if [ $FAIL -eq 0 ]; then
  echo "INTACT"
  exit 0
else
  echo "BLOCKED"
  exit 1
fi
