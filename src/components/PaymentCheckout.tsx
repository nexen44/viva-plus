import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function PaymentCheckout() {
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCheckout = async (plan: string) => {
    setLoading(true);
    setSuccessMessage(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Você precisa estar autenticado para realizar um pagamento.');
        setLoading(false);
        return;
      }

      // Simulação segura de registro de transação pendente
      console.log(`Iniciando checkout para o plano: ${plan} (Usuário: ${user.id})`);
      setTimeout(() => {
        setSuccessMessage(`Checkout do plano "${plan}" simulado com sucesso!`);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Erro no checkout:', err);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Assinaturas e Pagamentos — Viva+</h2>
      <p className="text-gray-600 mb-6">Escolha o plano ideal para acelerar sua jornada de transformação.</p>
      
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 border rounded-md flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Plano Mensal Premium</h3>
            <p className="text-sm text-gray-600 mt-1">Acesso completo a todos os recursos avançados de hábitos, jornadas e IA.</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900">R$ 29,90 / mês</span>
            <button 
              onClick={() => handleCheckout('Mensal Premium')}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Assinar'}
            </button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border rounded-md flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Plano Anual VIP</h3>
            <p className="text-sm text-gray-600 mt-1">Economize com o plano anual e tenha prioridade máxima nas mentorias e IA.</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900">R$ 249,90 / ano</span>
            <button 
              onClick={() => handleCheckout('Anual VIP')}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Assinar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
