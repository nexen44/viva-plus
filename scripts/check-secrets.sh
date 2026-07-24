#!/usr/bin/env bash
set -uo pipefail
FOUND=0
scan() {
  if grep -rInE "$1" --include='*.ts' --include='*.tsx' --include='*.js' \
       --include='*.json' --include='*.sql' --include='*.sh' . \
       --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist \
       --exclude='*.example' --exclude='check-secrets.sh' 2>/dev/null; then
    echo "  ^ VIOLATION: $2"
    FOUND=1
  fi
}
scan 'sbp_[A-Za-z0-9]{20,}'    'Supabase Personal Access Token'
scan 'sb_secret_[A-Za-z0-9]+'  'Supabase secret key'
scan 'eyJ[A-Za-z0-9_-]{30,}\.' 'Literal JWT in code'
if [ -d src ] && grep -rIn 'service_role' --include='*.ts' --include='*.tsx' src/ 2>/dev/null; then
  echo "  ^ VIOLATION: service_role referenced in the frontend"
  FOUND=1
fi
exit $FOUND
