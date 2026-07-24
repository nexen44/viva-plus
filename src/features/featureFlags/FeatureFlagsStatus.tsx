import { useFeatureFlags } from './useFeatureFlags';

export default function FeatureFlagsStatus() {
  const state = useFeatureFlags();

  if (state.status === 'loading') {
    return (
      <div className="text-slate-400 text-sm">Loading feature flags from database…</div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="text-red-400 text-sm">
        Connection error: {state.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <p className="text-emerald-600 text-xs uppercase tracking-widest font-semibold mb-2">
        Feature Flags — Realtime Database Status
      </p>
      {state.flags.map((f) => (
        <div
          key={f.key}
          className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm shadow-sm"
        >
          <span className="text-slate-700 font-mono font-medium">{f.key}</span>
          <span
            className={`px-2.5 py-0.5 rounded text-xs font-bold ${
              f.enabled
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {f.enabled ? 'ON' : 'OFF'}
          </span>
        </div>
      ))}
    </div>
  );
}
