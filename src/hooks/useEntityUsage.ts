import { useState } from 'react';
import { API_BASE_URL } from '../config/api';

export interface UsageInfo {
  canDelete: boolean;
  usageCount: number;
  usageDetails: {
    tipos?: number;
    subtipos?: number;
    barreiras?: number;
    acessibilidades?: number;
    empresas?: number;
    candidatos?: number;
    vagas?: number;
  };
  warningMessage: string;
  isDelete?: boolean; // Flag para determinar se é exclusão ou desassociação
  cascadeInfo?: {
    willBeDeleted: Array<{
      type: string;
      name: string;
      reason: string;
    }>;
    willBeDisassociated: Array<{
      type: string;
      name: string;
      reason: string;
    }>;
  };
}

interface UseEntityUsageReturn {
  checkUsage: (entityType: string, entityId: number) => Promise<UsageInfo | null>;
  loading: boolean;
  error: string | null;
}

export const useEntityUsage = (): UseEntityUsageReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkUsage = async (entityType: string, entityId: number): Promise<UsageInfo | null> => {
    setLoading(true);
    setError(null);

    try {
      let usageCount = 0;
      const usageDetails: UsageInfo['usageDetails'] = {};
      let canDelete = true;
      let warningMessage = '';

      switch (entityType) {
        case 'tipo': {
          const cascadeInfo = {
            willBeDeleted: [] as Array<{ type: string; name: string; reason: string }>,
            willBeDisassociated: [] as Array<{ type: string; name: string; reason: string }>
          };

          const isDelete = true; // Tipos sempre são excluídos (não desassociados)
          
          // Verificar subtipos vinculados
          const subtiposResponse = await fetch(`${API_BASE_URL}/api/subtipos/tipoId/${entityId}`);
          if (subtiposResponse.ok) {
            const subtipos = await subtiposResponse.json();
            usageDetails.subtipos = subtipos.length;
            usageCount += subtipos.length;
            
            // Para cada subtipo, verificar se pode ser excluído ou apenas desassociado
            for (const subtipo of subtipos) {
              // Verificar se subtipo tem barreiras
              try {
                const barreirasResponse = await fetch(`${API_BASE_URL}/api/barreiras/subtipo/${subtipo.id}`);
                if (barreirasResponse.ok) {
                  const barreiras = await barreirasResponse.json();
                  
                  if (barreiras.length === 0) {
                    // Subtipo sem barreiras - pode ser excluído
                    cascadeInfo.willBeDeleted.push({
                      type: 'subtipo',
                      name: subtipo.nome,
                      reason: 'Não possui barreiras vinculadas'
                    });
                  } else {
                    // Subtipo tem barreiras - será excluído em cascata
                    cascadeInfo.willBeDeleted.push({
                      type: 'subtipo',
                      name: subtipo.nome,
                      reason: `SERÁ DELETADO - tem ${barreiras.length} barreira(s)`
                    });
                    
                    // Adicionar barreiras à análise (implementar lógica mais complexa depois)
                    for (const barreira of barreiras) {
                      cascadeInfo.willBeDeleted.push({
                        type: 'barreira',
                        name: barreira.descricao,
                        reason: 'SERÁ DELETADA - pertence apenas a este subtipo'
                      });
                    }
                  }
                } else {
                  cascadeInfo.willBeDeleted.push({
                    type: 'subtipo',
                    name: subtipo.nome,
                    reason: 'Sem barreiras vinculadas'
                  });
                }
              } catch {
                cascadeInfo.willBeDeleted.push({
                  type: 'subtipo',
                  name: subtipo.nome,
                  reason: 'Erro na verificação'
                });
              }
            }
          }

          // Sempre permite exclusão com cascata para tipos
          canDelete = true;
          warningMessage = usageCount > 0 
            ? `Este tipo possui ${usageDetails.subtipos} subtipo(s). Veja abaixo o que será excluído ou desassociado.`
            : 'Este tipo não possui subtipos vinculados e pode ser removido com segurança.';
            
          return {
            canDelete,
            usageCount,
            usageDetails,
            warningMessage,
            cascadeInfo,
            isDelete
          };
        }

        case 'subtipo': {
          const cascadeInfo = {
            willBeDeleted: [] as Array<{ type: string; name: string; reason: string }>,
            willBeDisassociated: [] as Array<{ type: string; name: string; reason: string }>
          };

          let isDelete = false;

          // Verificar barreiras vinculadas a este subtipo
          try {
            const barreirasResponse = await fetch(`${API_BASE_URL}/api/barreiras/subtipo/${entityId}`);
            if (barreirasResponse.ok) {
              const barreiras = await barreirasResponse.json();
              usageDetails.barreiras = barreiras.length;
              usageCount = 1; // Sempre 1 item (o próprio subtipo)

              // Para subtipos, sempre excluir (não tem lógica de desassociação por enquanto)
              isDelete = true;
              if (barreiras.length > 0) {
                cascadeInfo.willBeDeleted.push({
                  type: 'subtipo',
                  name: `Subtipo será excluído`,
                  reason: `Vinculado a ${barreiras.length} barreira(s) - todas as vinculações serão removidas`
                });
                
                warningMessage = `Este subtipo possui ${barreiras.length} barreira(s) vinculada(s). Todas as vinculações serão removidas.`;
              } else {
                cascadeInfo.willBeDeleted.push({
                  type: 'subtipo',
                  name: `Subtipo será excluído`,
                  reason: 'Não possui barreiras vinculadas'
                });
                
                warningMessage = 'Este subtipo não possui barreiras vinculadas e será removido com segurança.';
              }
            }
          } catch (error) {
            console.error('Erro ao verificar vínculos do subtipo:', error);
            warningMessage = 'Não foi possível verificar os vínculos. Prossiga com cautela.';
            isDelete = true;
          }

          canDelete = true;

          return {
            canDelete,
            usageCount,
            usageDetails,
            warningMessage,
            cascadeInfo,
            isDelete
          };
        }

        case 'barreira': {
          const cascadeInfo = {
            willBeDeleted: [] as Array<{ type: string; name: string; reason: string }>,
            willBeDisassociated: [] as Array<{ type: string; name: string; reason: string }>
          };

          let isDelete = false;

          // Verificar acessibilidades e subtipos vinculados a esta barreira
          try {
            // Verificar acessibilidades
            const acessibilidadesResponse = await fetch(`${API_BASE_URL}/api/acessibilidades/barreira/${entityId}`);
            let totalAcessibilidades = 0;
            if (acessibilidadesResponse.ok) {
              const acessibilidades = await acessibilidadesResponse.json();
              totalAcessibilidades = acessibilidades.length;
              usageDetails.acessibilidades = totalAcessibilidades;
            }

            // Verificar subtipos (buscar na API de subtipos)
            let totalSubtipos = 0;
            try {
              const subtiposResponse = await fetch(`${API_BASE_URL}/api/subtipos`);
              if (subtiposResponse.ok) {
                const todosSubtipos = await subtiposResponse.json();
                const subtiposVinculados = todosSubtipos.filter((subtipo: { barreiras?: { barreiraId: number }[] }) => {
                  return subtipo.barreiras && subtipo.barreiras.some((b: { barreiraId: number }) => b.barreiraId === entityId);
                });
                totalSubtipos = subtiposVinculados.length;
                usageDetails.subtipos = totalSubtipos;
              }
            } catch {
              // Ignorar se não conseguir verificar subtipos
            }

            usageCount = 1; // Sempre 1 item (a própria barreira)

            // Para barreiras, sempre excluir (não tem lógica de desassociação por enquanto)
            isDelete = true;
            const totalVinculos = totalAcessibilidades + totalSubtipos;
            
            if (totalVinculos > 0) {
              cascadeInfo.willBeDeleted.push({
                type: 'barreira',
                name: `Barreira será excluída`,
                reason: `Vinculada a ${totalAcessibilidades} acessibilidade(s) e ${totalSubtipos} subtipo(s) - todas as vinculações serão removidas`
              });
              
              warningMessage = `Esta barreira possui ${totalVinculos} vínculo(s). Todas as vinculações serão removidas.`;
            } else {
              cascadeInfo.willBeDeleted.push({
                type: 'barreira',
                name: `Barreira será excluída`,
                reason: 'Não possui vínculos'
              });
              
              warningMessage = 'Esta barreira não possui vínculos e será removida com segurança.';
            }

          } catch (error) {
            console.error('Erro ao verificar vínculos da barreira:', error);
            warningMessage = 'Não foi possível verificar os vínculos. Prossiga com cautela.';
            isDelete = true;
          }

          canDelete = true;

          return {
            canDelete,
            usageCount,
            usageDetails,
            warningMessage,
            cascadeInfo,
            isDelete
          };
        }

        case 'acessibilidade': {
          const cascadeInfo = {
            willBeDeleted: [] as Array<{ type: string; name: string; reason: string }>,
            willBeDisassociated: [] as Array<{ type: string; name: string; reason: string }>
          };

          let isDelete = false; // Para mudar o texto do botão

          // Verificar quantas barreiras esta acessibilidade está vinculada
          try {
            const acessibilidadeResponse = await fetch(`${API_BASE_URL}/api/acessibilidades/${entityId}`);
            if (acessibilidadeResponse.ok) {
              const data = await acessibilidadeResponse.json();
              
              // Contar barreiras vinculadas através das relações BarreiraAcessibilidade
              const totalBarreiras = data.barreiras ? data.barreiras.length : 0;
              usageDetails.barreiras = totalBarreiras;
              usageCount = 1; // Sempre 1 item (a própria acessibilidade)

              if (totalBarreiras <= 1) {
                // Se está vinculada a apenas 1 barreira (ou nenhuma), será excluída
                isDelete = true;
                cascadeInfo.willBeDeleted.push({
                  type: 'acessibilidade',
                  name: data.nome || `Acessibilidade ID: ${entityId}`,
                  reason: totalBarreiras === 1 
                    ? 'Vinculada apenas a esta barreira - será excluída completamente'
                    : 'Não vinculada a nenhuma barreira - será excluída'
                });
                
                warningMessage = totalBarreiras === 1 
                  ? 'Esta acessibilidade está vinculada apenas a esta barreira e será completamente excluída.'
                  : 'Esta acessibilidade não está vinculada a nenhuma barreira e será excluída.';
              } else {
                // Se está vinculada a múltiplas barreiras, será apenas desassociada
                isDelete = false;
                cascadeInfo.willBeDisassociated.push({
                  type: 'acessibilidade',
                  name: data.nome || `Acessibilidade ID: ${entityId}`,
                  reason: `Será apenas desvinculada desta barreira (permanece em ${totalBarreiras - 1} outra(s))`
                });
                
                warningMessage = `Esta acessibilidade está vinculada a ${totalBarreiras} barreiras. Será apenas desvinculada desta barreira.`;
              }
            }
          } catch (error) {
            console.error('Erro ao verificar vínculos da acessibilidade:', error);
            warningMessage = 'Não foi possível verificar os vínculos. Prossiga com cautela.';
            isDelete = true; // Default para excluir em caso de erro
          }

          // SEMPRE permitir a operação
          canDelete = true;

          return {
            canDelete,
            usageCount,
            usageDetails,
            warningMessage,
            cascadeInfo,
            isDelete // Adicionar flag para o botão
          };
        }

        default:
          warningMessage = 'Verificação de uso não disponível para este tipo de entidade.';
      }

      return {
        canDelete,
        usageCount,
        usageDetails,
        warningMessage
      };
    } catch (err) {
      console.error('Erro ao verificar uso da entidade:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    checkUsage,
    loading,
    error
  };
};