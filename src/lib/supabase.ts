import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    '[Viva+] VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required. ' +
    'Please add them to Replit Secrets.'
  );
}

export const supabase = createClient(url, key);
