import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export type FeatureFlag = {
  key: string;
  enabled: boolean;
  description: string | null;
};

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; flags: FeatureFlag[] };

export function useFeatureFlags(): State {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('key, enabled, description')
        .order('key');

      if (cancelled) return;

      if (error) {
        setState({ status: 'error', message: error.message });
        return;
      }

      setState({ status: 'ready', flags: data ?? [] });
    }

    load();

    const channel = supabase
      .channel('feature_flags_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'feature_flags' },
        () => {
          if (!cancelled) load();
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return state;
}
