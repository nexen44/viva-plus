import { Outlet } from 'react-router-dom';
import { Activity } from 'lucide-react';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="bg-white border-b border-slate-200 p-4 shadow-sm">
        <div className="container mx-auto flex items-center gap-2">
          <Activity className="text-blue-600 h-6 w-6" />
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">VIVA+</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-6 w-full max-w-5xl">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-slate-400 p-4 text-center text-sm">
        &copy; {new Date().getFullYear()} VIVA+ | Module 1
      </footer>
    </div>
  );
}
