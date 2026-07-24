import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <AlertCircle className="h-16 w-16 text-slate-400" />
      <h2 className="text-3xl font-bold text-slate-700">404</h2>
      <p className="text-slate-500">Page not found.</p>
      <Link to="/" className="text-blue-600 hover:underline font-medium">Back to Home</Link>
    </div>
  );
}
