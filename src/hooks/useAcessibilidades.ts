import { useState, useEffect, useCallback } from 'react';
import { acessibilidadesService, Acessibilidade, AcessibilidadeWithCreated } from '../services/acessibilidades.service';

interface UseAcessibilidadesReturn {
  acessibilidades: Acessibilidade[];
  loading: boolean;
  error: string | null;
  buscarSimilares: (termo: string) => Acessibilidade[];
  criarAcessibilidade: (nome: string) => Promise<Acessibilidade | null>;
  refetch: () => Promise<void>;
  forceRefresh: () => Promise<void>;
}

export function useAcessibilidades(): UseAcessibilidadesReturn {
  const [acessibilidades, setAcessibilidades] = useState<Acessibilidade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAcessibilidades = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await acessibilidadesService.listar();
      setAcessibilidades(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar acessibilidades');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAcessibilidades();
  }, [fetchAcessibilidades]);

  const buscarSimilares = useCallback((termo: string): Acessibilidade[] => {
    if (!termo.trim()) return acessibilidades;
    
    const termoLower = termo.toLowerCase().trim();
    
    return acessibilidades.filter(acessibilidade => 
      acessibilidade.nome.toLowerCase().includes(termoLower)
    ).sort((a, b) => {
      // Priorizar matches exatos
      const aExact = a.nome.toLowerCase() === termoLower;
      const bExact = b.nome.toLowerCase() === termoLower;
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Priorizar matches que começam com o termo
      const aStarts = a.nome.toLowerCase().startsWith(termoLower);
      const bStarts = b.nome.toLowerCase().startsWith(termoLower);
      
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      // Ordenar alfabeticamente
      return a.nome.localeCompare(b.nome);
    });
  }, [acessibilidades]);

  const criarAcessibilidade = useCallback(async (nome: string): Promise<Acessibilidade | null> => {
    try {
      const nomeNormalizado = nome.trim();
      
      if (!nomeNormalizado) {
        throw new Error('Nome da acessibilidade não pode estar vazio');
      }
      
      // Usar o serviço autenticado para buscar ou criar
      const acessibilidade: AcessibilidadeWithCreated = await acessibilidadesService.buscarOuCriar(nomeNormalizado);
      
      // SEMPRE buscar a lista atualizada do servidor após criar/encontrar
      setTimeout(async () => {
        try {
          const listaAtualizada = await acessibilidadesService.listar();
          setAcessibilidades(listaAtualizada.sort((a, b) => a.nome.localeCompare(b.nome)));
        } catch (err) {
          console.error('Erro ao atualizar lista:', err);
        }
      }, 500); // Pequeno delay para garantir que o backend processou
      
      return acessibilidade;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar acessibilidade');
      return null;
    }
  }, []);

  return {
    acessibilidades,
    loading,
    error,
    buscarSimilares,
    criarAcessibilidade,
    refetch: fetchAcessibilidades,
    forceRefresh: fetchAcessibilidades,
  };
}