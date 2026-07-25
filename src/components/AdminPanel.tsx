import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAdminRole() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Verificar papel administrativo na tabela de profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        setIsAdmin(profile?.role === 'admin');
      } catch (err) {
        console.error('Erro ao verificar privilégios de admin:', err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    }

    checkAdminRole();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Verificando permissões administrativas...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <h3 className="font-bold">Acesso Restrito</h3>
        <p>Você não possui privilégios administrativos para visualizar este painel.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Painel de Administração — Viva+</h2>
      <p className="text-gray-600 mb-4">Bem-vindo à área restrita de gestão de sistema, feature flags e auditoria.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 border rounded-md">
          <h3 className="font-semibold text-gray-800">Feature Flags</h3>
          <p className="text-sm text-gray-500 mt-1">Gerenciador de chaves de ativação global.</p>
        </div>
        <div className="p-4 bg-gray-50 border rounded-md">
          <h3 className="font-semibold text-gray-800">Auditoria de Segurança</h3>
          <p className="text-sm text-gray-500 mt-1">Logs de acesso e modificações sensíveis.</p>
        </div>
      </div>
    </div>
  );
}
