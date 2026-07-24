import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function AuthWidget() {
  const { user, profile, loading, signIn, signUp, signOut } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (loading) {
    return <div className="text-slate-400 text-sm">Loading auth session…</div>;
  }

  if (user) {
    return (
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">User Profile (RLS Protected)</h3>
          <button
            onClick={signOut}
            className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded border border-red-200"
          >
            Sign Out
          </button>
        </div>
        <div className="space-y-1 text-sm">
          <p><strong className="text-slate-600">ID:</strong> <span className="font-mono text-xs text-slate-800">{user.id}</span></p>
          <p><strong className="text-slate-600">Email:</strong> {user.email}</p>
          <p><strong className="text-slate-600">Full Name (Profile):</strong> {profile?.full_name || 'N/A'}</p>
          <p><strong className="text-slate-600">Role:</strong> <span className="px-2 py-0.5 text-xs font-mono bg-blue-50 text-blue-700 rounded">{profile?.role || 'user'}</span></p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (isSignUp) {
      const { error } = await signUp(email, password, fullName);
      if (error) setErrorMsg(error.message);
    } else {
      const { error } = await signIn(email, password);
      if (error) setErrorMsg(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4 max-w-md">
      <h3 className="text-lg font-bold text-slate-800">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h3>
      {errorMsg && (
        <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded">
          {errorMsg}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        {isSignUp && (
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded shadow-sm"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-xs text-blue-600 hover:underline block text-center w-full"
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}
