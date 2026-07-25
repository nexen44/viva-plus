import { useEffect, useState } from 'react';
import { StoreCatalog } from './components/StoreCatalog';
import { PaymentCheckout } from './components/PaymentCheckout';
import { supabase } from './lib/supabase';

export function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'store' | 'payment'>('store');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 font-medium">Carregando Viva+...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">VIVA+</h1>
          <span className="text-sm font-semibold text-gray-700">VIVA+ Dashboard</span>
          {session ? (
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-sm text-red-600 hover:underline"
            >
              Sair
            </button>
          ) : (
            <span className="text-sm text-gray-500">Modo Visitante / Convidado</span>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('store')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition ${
              activeTab === 'store'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            Loja (Recompensas)
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition ${
              activeTab === 'payment'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            Assinaturas (Checkout)
          </button>
        </div>

        {activeTab === 'store' ? <StoreCatalog /> : <PaymentCheckout />}
      </main>
    </div>
  );
}

export default App;
