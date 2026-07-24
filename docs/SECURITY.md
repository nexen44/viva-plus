# SECURITY

## Keys
MAY go to the client: anon / publishable (eyJ... or sb_publishable_)
NEVER in the client:  service_role, sb_secret_*
NEVER in the repository: sbp_* (Personal Access Token — ADMIN token)

## Storage
Replit Secrets. Never a committed .env. .env.example holds placeholders only.

## RLS by exposure classification
public_read   -> RLS on + select policy for anon/authenticated
owner_only    -> RLS on + policy with auth.uid() = user_id
server_only   -> RLS on + revoke from anon/authenticated + grant to service_role
                 NO POLICY. The absence is INTENTIONAL.

Do not create a policy for service_role: service_role bypasses RLS,
so the policy never runs. A grant is enough.

No grant to the public role. No using (true) on a user-data table.

## Health data
Isolated by owner RLS. Never in logs. Retention declared per table.
