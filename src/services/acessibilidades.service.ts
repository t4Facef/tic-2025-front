import { api } from './api';

export interface Acessibilidade {
  id: number;
  nome: string;
  createdAt: string;
  updatedAt: string;
}

export interface AcessibilidadeWithCreated extends Acessibilidade {
  wasCreated?: boolean;
}

export const acessibilidadesService = {
  // Buscar todas as acessibilidades
  async listar(): Promise<Acessibilidade[]> {
    return api.get('/api/acessibilidades');
  },

  // Buscar apenas os nomes
  async listarNomes(): Promise<string[]> {
    return api.get('/api/acessibilidades/nomes');
  },

  // Busca inteligente por nome
  async buscar(termo: string): Promise<Acessibilidade[]> {
    return api.get(`/api/acessibilidades/search?q=${encodeURIComponent(termo)}`);
  },

  // Buscar por ID
  async buscarPorId(id: number): Promise<Acessibilidade> {
    return api.get(`/api/acessibilidades/${id}`);
  },

  // Criar nova acessibilidade (requer auth admin)
  async criar(nome: string): Promise<Acessibilidade> {
    return api.post('/api/acessibilidades', { nome });
  },

  // Buscar ou criar acessibilidade (requer auth admin)
  async buscarOuCriar(nome: string): Promise<AcessibilidadeWithCreated> {
    return api.post('/api/acessibilidades/find-or-create', { nome });
  },

  // Vincular com barreira (requer auth admin)
  async vincularBarreira(acessibilidadeId: number, barreiraId: number): Promise<void> {
    return api.post('/api/acessibilidades/vincular-barreira', { 
      acessibilidadeId, 
      barreiraId 
    });
  },

  // Atualizar acessibilidade (requer auth admin)
  async atualizar(id: number, nome: string): Promise<Acessibilidade> {
    return api.put(`/api/acessibilidades/${id}`, { nome });
  },

  // Deletar acessibilidade (requer auth admin)
  async deletar(id: number): Promise<void> {
    return api.delete(`/api/acessibilidades/${id}`);
  }
};