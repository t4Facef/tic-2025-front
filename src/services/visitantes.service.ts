import { API_BASE_URL } from '../config/api';

interface VisitanteData {
  origem?: string;
}

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

export const visitantesService = {
  async registrarVisitante(data: VisitanteData = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/visitantes/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao registrar visitante');
      }
      
      return await response.json();
    } catch (error) {
      console.log('Erro silencioso ao registrar visitante:', error);
      // Não vamos mostrar erro para o usuário, é tracking silencioso
      return null;
    }
  },

  async obterEstatisticas(token: string): Promise<EstatisticasVisitantes | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/visitantes/estatisticas`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Erro ao obter estatísticas');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao obter estatísticas de visitantes:', error);
      return null;
    }
  },
};