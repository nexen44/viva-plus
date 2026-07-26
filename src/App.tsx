import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { DashboardMetrics } from './components/DashboardMetrics';
import { StoreCatalog } from './components/StoreCatalog';
import { PaymentCheckout } from './components/PaymentCheckout';
import { CommunityFeed } from './components/CommunityFeed';
import { AdminPanel } from './components/AdminPanel';

function NavBar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 text-sm font-medium rounded transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-2">
      <div className="container mx-auto flex flex-wrap gap-2 max-w-5xl">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/store" className={linkClass}>Loja</NavLink>
        <NavLink to="/community" className={linkClass}>Comunidade</NavLink>
        <NavLink to="/checkout" className={linkClass}>Assinaturas</NavLink>
        <NavLink to="/admin" className={linkClass}>Admin</NavLink>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            element={
              <>
                <NavBar />
                <AppLayout />
              </>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<DashboardMetrics />} />
            <Route path="store" element={<StoreCatalog />} />
            <Route path="community" element={<CommunityFeed />} />
            <Route path="checkout" element={<PaymentCheckout />} />
            <Route path="admin" element={<AdminPanel />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
