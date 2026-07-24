#!/usr/bin/env bash
set -uo pipefail
FOUND=0
for pkg in flutter dart express next @google/genai; do
  if node -e "
    const p=require('./package.json');
    const all={...(p.dependencies||{}), ...(p.devDependencies||{})};
    process.exit(all['$pkg']?0:1);
  " 2>/dev/null; then
    echo "  ^ VIOLATION: forbidden dependency '$pkg' (docs/ARCHITECTURE.md)"
    FOUND=1
  fi
done
for f in bun.lock yarn.lock pnpm-lock.yaml; do
  if [ -f "$f" ]; then
    echo "  ^ VIOLATION: $f present. Use npm."
    FOUND=1
  fi
done
if [ ! -f package-lock.json ]; then
  echo "  ^ VIOLATION: package-lock.json missing"
  FOUND=1
fi
exit $FOUND
