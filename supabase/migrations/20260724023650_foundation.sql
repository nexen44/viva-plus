-- Module 2: Foundation Tables

CREATE TABLE IF NOT EXISTS public.app_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.feature_flags (
  key text PRIMARY KEY,
  enabled boolean NOT NULL DEFAULT false,
  description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid, -- Will reference auth.users(id) in Module 4
  action text NOT NULL,
  target text,
  details jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Read access for settings and flags)
CREATE POLICY "app_settings: read access for everyone" ON public.app_settings FOR SELECT USING (true);
CREATE POLICY "feature_flags: read access for everyone" ON public.feature_flags FOR SELECT USING (true);
-- Note: admin_audit_logs remains isolated (no policies for anon/authenticated, strictly blocked)

-- Insert the 8 required flags
INSERT INTO public.feature_flags (key, enabled, description) VALUES
  ('habits_module', false, 'Module 5: Habits'),
  ('journeys_module', false, 'Module 6: Journeys'),
  ('challenges_module', false, 'Module 7: Challenges'),
  ('admin_module', false, 'Module 9: Admin'),
  ('community_module', false, 'Module 10: Community'),
  ('store_module', false, 'Module 11: Store'),
  ('payments_module', false, 'Module 12: Payments'),
  ('ai_module', false, 'Module 13: AI')
ON CONFLICT (key) DO NOTHING;
