# DECISIONS (ADR)

## ADR-001 — React, not Flutter
The previous project had React at the root and Flutter in apps/mobile/.
Neither worked. Replit offers no emulator and no Docker.
DECISION: React + TS + Vite. Flutter discarded. Mobile via PWA/Capacitor (M13).

## ADR-002 — Resolved versions, not pinned ones
Pinning versions by hand caused an error in the previous diagnosis.
DECISION: npm create vite@latest resolves; package-lock.json freezes;
npm ci in verification. Never edit a version by hand.

## ADR-003 — No allowedHosts:true
allowedHosts: true exposes the dev server to DNS rebinding.
DECISION: explicit host. If Replit blocks, add THE domain, not all of them.

## ADR-004 — No policy for service_role
service_role bypasses RLS; a policy for it never runs.
DECISION: grant only. No policy with to service_role.

## ADR-005 — No public.schema_migrations
Supabase already maintains supabase_migrations.schema_migrations.
DECISION: use the native history. npx supabase migration list is the source.

## ADR-006 — SQL via db push, not via SQL Editor
Applying SQL in the Editor diverges the database from the repository.
DECISION: SQL becomes a file in supabase/migrations and goes up via db push.
SQL Editor is for READING and checking only.

## ADR-007 — Minimal governance
Excess documentation becomes a second product.
DECISION: 6 documents, 4 guards. Expand only when a real violation occurs.

## ADR-008 — server_only without a policy is intentional
admin_audit_logs has RLS and no policy on purpose.
DECISION: record exposure in MODULES.json so nobody "fixes" it later.
