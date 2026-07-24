# ARCHITECTURE

## Stack
React + TypeScript + Vite + Tailwind v4
@supabase/supabase-js | react-router-dom | zod | lucide-react
Tests: vitest + testing-library | Database: pgTAP

VERSIONS: resolved at install time, frozen in package-lock.json.
Never edit a version by hand. npm ci is mandatory in verification.

## Forbidden in package.json
flutter, dart, express, next, @google/genai, docker, bun, yarn, pnpm

## Layers (imports only go down, never up)
types -> config -> lib -> features -> components -> pages -> app

## Invariants
INV-01  A client-exposed table has RLS + policies matching its exposure.
INV-02  service_role never appears in the frontend. Never.
INV-03  Browser env vars start with VITE_.
INV-04  A layer never imports from a higher layer.
INV-05  Displayed data came from a real call. Mocks only in src/tests/.
INV-06  No catch converts a failure into a success.
INV-07  An applied migration is IMMUTABLE. A change = a new migration.
INV-08  Migrations are applied only via npx supabase db push.
INV-09  Every table is declared in MODULES.json before it exists.
INV-10  Every table has created_at and updated_at timestamptz.

## Error policy
FORBIDDEN: empty catch; catch that returns success; default that masks
missing data; optional dependency that pretends to work when null.

Canonical bug from the previous project:
  if (useCase != null) { ...real... } else { state = READY }
It reported ready while doing nothing. DO NOT REPEAT.

Every network operation has: 10s timeout, typed error, visible state, retry.
