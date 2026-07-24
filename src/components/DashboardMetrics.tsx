import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function DashboardMetrics() {
  const [habitsCount, setHabitsCount] = useState<number | string>('-');
  const [journeysCount, setJourneysCount] = useState<number | string>('-');
  const [challengesProgress, setChallengesProgress] = useState<number | string>('-');

  useEffect(() => {
    async function loadMetrics() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. Contar hábitos concluídos ou registros
        const { count: habits } = await supabase
          .from('habit_records')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('completed', true);
        setHabitsCount(habits ?? 0);

        // 2. Contar jornadas ativas
        const { count: journeys } = await supabase
          .from('user_journeys')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
        setJourneysCount(journeys ?? 0);

        // 3. Progresso em desafios (total de pontos)
        const { data: logs } = await supabase
          .from('challenge_logs')
          .select('value')
          .eq('user_id', user.id);
        
        const totalPoints = logs ? logs.reduce((acc, curr) => acc + curr.value, 0) : 0;
        setChallengesProgress(`${totalPoints} pts`);
      } catch (err) {
        console.error('Erro ao carregar métricas do dashboard:', err);
      }
    }

    loadMetrics();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Painel Geral — Viva+</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-sm text-blue-600 font-medium">Hábitos Concluídos</p>
          <span className="text-2xl font-bold text-blue-950">{habitsCount}</span>
        </div>
        <div className="p-4 bg-green-50 rounded-md border border-green-100">
          <p className="text-sm text-green-600 font-medium">Jornadas Ativas</p>
          <span className="text-2xl font-bold text-green-950">{journeysCount}</span>
        </div>
        <div className="p-4 bg-purple-50 rounded-md border border-purple-100">
          <p className="text-sm text-purple-600 font-medium">Progresso em Desafios</p>
          <span className="text-2xl font-bold text-purple-950">{challengesProgress}</span>
        </div>
      </div>
    </div>
  );
}
