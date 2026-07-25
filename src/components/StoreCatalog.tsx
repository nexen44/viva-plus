import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Product {
  id: string;
  name: string;
  description: string;
  price_points: number;
  active: boolean;
}

export function StoreCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from('store_products')
          .select('*')
          .eq('active', true);

        if (error) {
          console.warn('Tabela store_products pode ainda não existir nas migrações:', error.message);
          setProducts([]);
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        console.error('Erro ao carregar catálogo da loja:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Carregando catálogo da loja...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Loja Viva+ — Recompensas</h2>
      <p className="text-gray-600 mb-6">Troque seus pontos acumulados por benefícios exclusivos.</p>
      
      {products.length === 0 ? (
        <p className="text-sm text-gray-500 italic">Nenhum produto disponível no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="p-4 bg-gray-50 border rounded-md flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-blue-600">{product.price_points} pontos</span>
                <button 
                  onClick={() => alert(`Resgate simulado para: ${product.name}`)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  Resgatar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
