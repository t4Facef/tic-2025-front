import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

export interface Barreira {
  id: number;
  descricao: string;
  createdAt: string;
  updatedAt: string;
}

export interface BarreiraWithCreated extends Barreira {
  wasCreated?: boolean;
}

interface UseBarreirasReturn {
  barreiras: Barreira[];
  loading: boolean;
  error: string | null;
  buscarSimilares: (termo: string) => Barreira[];
  criarBarreira: (descricao: string) => Promise<Barreira | null>;
  refetch: () => Promise<void>;
  forceRefresh: () => Promise<void>;
}

export const useBarreiras = (): UseBarreirasReturn => {
  const [barreiras, setBarreiras] = useState<Barreira[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBarreiras = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/barreiras`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setBarreiras(data);
    } catch (err) {
      console.error('Erro ao buscar barreiras:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarreiras();
  }, []);

  const buscarSimilares = (termo: string): Barreira[] => {
    if (!termo.trim()) return [];
    
    const termoLower = termo.toLowerCase().trim();
    
    return barreiras
      .filter(barreira => 
        barreira.descricao.toLowerCase().includes(termoLower)
      )
      .sort((a, b) => {
        // Priorizar matches exatos no início
        const aStartsWith = a.descricao.toLowerCase().startsWith(termoLower);
        const bStartsWith = b.descricao.toLowerCase().startsWith(termoLower);
        
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        
        // Ordenar alfabeticamente
        return a.descricao.localeCompare(b.descricao);
      });
  };

  const criarBarreira = async (descricao: string): Promise<Barreira | null> => {
    try {
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/barreiras/find-or-create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ descricao: descricao.trim() })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const novaBarreira: BarreiraWithCreated = await response.json();
      
      // Se foi criada nova, adicionar à lista local
      if (novaBarreira.wasCreated) {
        setBarreiras(prev => [...prev, novaBarreira].sort((a, b) => a.descricao.localeCompare(b.descricao)));
      }
      
      return novaBarreira;
    } catch (err) {
      console.error('Erro ao criar barreira:', err);
      setError(err instanceof Error ? err.message : 'Erro ao criar barreira');
      return null;
    }
  };

  const refetch = async () => {
    await fetchBarreiras();
  };

  const forceRefresh = async () => {
    setBarreiras([]);
    await fetchBarreiras();
  };

  return {
    barreiras,
    loading,
    error,
    buscarSimilares,
    criarBarreira,
    refetch,
    forceRefresh
  };
};