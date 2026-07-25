import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Post {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
}

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data, error } = await supabase
          .from('community_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          console.warn('Tabela community_posts pode ainda não existir nas migrações:', error.message);
          setPosts([]);
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        console.error('Erro ao carregar feed:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Carregando feed da comunidade...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Comunidade — Viva+</h2>
      <p className="text-gray-600 mb-6">Compartilhe suas conquistas e interaja com outros membros.</p>
      
      {posts.length === 0 ? (
        <p className="text-sm text-gray-500 italic">Nenhuma postagem encontrada no momento.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 bg-gray-50 border rounded-md">
              <p className="text-gray-800">{post.content}</p>
              <span className="text-xs text-gray-400 mt-2 block">
                {new Date(post.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
