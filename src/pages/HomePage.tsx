import FeatureFlagsStatus from '../features/featureFlags/FeatureFlagsStatus';
import AuthWidget from '../features/auth/AuthWidget';

export function HomePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">VIVA+ Dashboard</h2>
        <p className="text-slate-600">Module 4 — Authentication & Profile Isolation (RLS).</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AuthWidget />
        <FeatureFlagsStatus />
      </div>
    </div>
  );
}
