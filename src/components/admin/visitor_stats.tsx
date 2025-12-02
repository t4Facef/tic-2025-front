import { useState, useEffect } from "react";
import { visitantesService } from "../../services/visitantes.service";
import { useAuth } from "../../hooks/useAuth";
import { Eye, Users, Calendar, TrendingUp } from "lucide-react";
import VisitorCharts from "./visitor_charts";

interface EstatisticasVisitantes {
  totalVisitantes: number;
  visitantesRecentes: number;
  visitantesPorDia: Array<{
    data: string;
    total: number;
  }>;
  visitantesPorOrigem: Array<{
    origem: string;
    _count: {
      id: number;
    };
  }>;
  visitantesPorSemana: Array<{
    diaSemana: string;
    total: number;
  }>;
  visitantesPorMes: Array<{
    mes: string;
    total: number;
  }>;
}

export default function VisitorStats() {
  const { token } = useAuth();
  const [stats, setStats] = useState<EstatisticasVisitantes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        const data = await visitantesService.obterEstatisticas(token);
        setStats(data);
        setError(null);
      } catch {
        setError('Erro ao carregar estatísticas de visitantes');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Eye className="w-6 h-6 text-blue2" />
          <h2 className="text-xl font-semibold text-gray-800">Visitantes</h2>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Eye className="w-6 h-6 text-red2" />
          <h2 className="text-xl font-semibold text-gray-800">Visitantes</h2>
        </div>
        <p className="text-red2">{error || 'Dados não disponíveis'}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Eye className="w-6 h-6 text-blue2" />
        <h2 className="text-xl font-semibold text-gray-800">Estatísticas de Visitantes</h2>
      </div>

      {/* Cards de estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Geral</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVisitantes.toLocaleString()}</p>
            </div>
            <div className="bg-blue3 p-2 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Últimos 30 dias</p>
              <p className="text-2xl font-bold text-gray-900">{stats.visitantesRecentes.toLocaleString()}</p>
            </div>
            <div className="bg-blue2 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Média Diária</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.visitantesPorDia.length > 0 
                  ? Math.round(stats.visitantesPorDia.reduce((acc, curr) => acc + Number(curr.total), 0) / stats.visitantesPorDia.length)
                  : 0
                }
              </p>
            </div>
            <div className="bg-blue4 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fontes de Origem</p>
              <p className="text-2xl font-bold text-gray-900">{stats.visitantesPorOrigem.length}</p>
            </div>
            <div className="bg-blue1 p-2 rounded-lg">
              <Eye className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Visitantes por dia (últimos 7 dias) */}
      {stats.visitantesPorDia.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Visitantes por Dia (Últimos 7 dias)</h3>
          <div className="space-y-2">
            {stats.visitantesPorDia.map((dia, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">
                  {new Date(dia.data).toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    day: '2-digit', 
                    month: '2-digit' 
                  })}
                </span>
                <div className="flex items-center space-x-3">
                  <div 
                    className="h-2 bg-blue2 rounded-full"
                    style={{ 
                      width: `${Math.max((Number(dia.total) / Math.max(...stats.visitantesPorDia.map(d => Number(d.total)))) * 100, 5)}px`,
                      minWidth: '20px'
                    }}
                  ></div>
                  <span className="font-semibold text-blue3 min-w-[30px] text-right">
                    {Number(dia.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visitantes por origem */}
      {stats.visitantesPorOrigem.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Origem dos Visitantes (Últimos 30 dias)</h3>
          <div className="space-y-2">
            {stats.visitantesPorOrigem.slice(0, 10).map((origem, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 capitalize">
                  {origem.origem.replace(/-/g, ' ').replace(/cold start/g, 'Inicialização')}
                </span>
                <div className="flex items-center space-x-3">
                  <div 
                    className="h-2 bg-blue3 rounded-full"
                    style={{ 
                      width: `${Math.max((origem._count.id / Math.max(...stats.visitantesPorOrigem.map(o => o._count.id))) * 100, 5)}px`,
                      minWidth: '20px'
                    }}
                  ></div>
                  <span className="font-semibold text-blue3 min-w-[30px] text-right">
                    {origem._count.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gráficos de Visitantes */}
      {stats && stats.visitantesPorSemana && stats.visitantesPorMes && (
        <VisitorCharts 
          visitantesPorSemana={stats.visitantesPorSemana}
          visitantesPorMes={stats.visitantesPorMes}
        />
      )}
    </div>
  );
}