import { useState } from 'react';

export function App() {
  const [activeTab, setActiveTab] = useState('store');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">VIVA+</h1>
          <span className="text-sm font-semibold text-gray-700">VIVA+ Dashboard</span>
          <span className="text-sm text-gray-500">Modo Visitante / Convidado</span>
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

        {activeTab === 'store' ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Catálogo de Recompensas</h2>
            <p className="text-gray-600">Bem-vindo à loja do VIVA+! Resgate seus pontos aqui.</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Planos e Assinaturas</h2>
            <p className="text-gray-600">Escolha o plano ideal para você e gerencie sua assinatura.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
