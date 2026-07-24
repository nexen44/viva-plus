# VIVA+ — Project Contract

## Identity
Name: Viva+
Domain: habit transformation, integral health, personal development
Language: pt-BR | Timezone: America/Bahia

## What Viva+ IS
Web/PWA application, single-tenant per user, backend exclusively Supabase.

## What Viva+ IS NOT (negative boundaries — binding)
- NOT a native Flutter/Dart app
- NOT multi-tenant
- NO backend of its own (Express, Next API routes, etc.)
- NO Docker in development
- NO AI before Module 12

## Data
Handles sensitive health data. LGPD art. 11 applies.
Mandatory isolation via RLS: auth.uid() = user_id.

## Environment
Dev: Replit (no Docker, no local Postgres)
Database: remote Supabase, applied via npx supabase db push
Source of truth for code: Git
