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
            cascadeInfo
          };
        }

        case 'subtipo': {
          const cascadeInfo = {
            willBeDeleted: [] as Array<{ type: string; name: string; reason: string }>,
            willBeDisassociated: [] as Array<{ type: string; name: string; reason: string }>
          };
          
          // Verificar barreiras vinculadas
          const barreirasResponse = await fetch(`${API_BASE_URL}/api/barreiras/subtipo/${entityId}`);
          if (barreirasResponse.ok) {
            const barreiras = await barreirasResponse.json();
            usageDetails.barreiras = barreiras.length;
            usageCount += barreiras.length;
            
            for (const barreira of barreiras) {
              // Por enquanto, assumir que barreiras serão excluídas (lógica mais complexa depois)
              cascadeInfo.willBeDeleted.push({
                type: 'barreira',
                name: barreira.descricao || `Barreira ID: ${barreira.id}`,
                reason: 'SERÁ DELETADA - pertence apenas a este subtipo'
              });
            }
          }

          canDelete = true;
          warningMessage = usageCount > 0 
            ? `Este subtipo possui ${usageDetails.barreiras} barreira(s). Veja abaixo o que será excluído.`
            : 'Este subtipo não possui barreiras vinculadas e pode ser removido com segurança.';
            
          return {
            canDelete,
            usageCount,
            usageDetails,
            warningMessage,
            cascadeInfo
          };
        }

        case 'barreira': {
          const cascadeInfo = {
            willBeDeleted: [] as Array<{ type: string; name: string; reason: string }>,
            willBeDisassociated: [] as Array<{ type: string; name: string; reason: string }>
          };
          
          // Verificar acessibilidades vinculadas
          const acessibilidadesResponse = await fetch(`${API_BASE_URL}/api/acessibilidades/barreira/${entityId}`);
          if (acessibilidadesResponse.ok) {
            const acessibilidades = await acessibilidadesResponse.json();
            usageDetails.acessibilidades = acessibilidades.length;
            usageCount += acessibilidades.length;
            
            for (const acessibilidade of acessibilidades) {
              // Por enquanto, assumir desassociação (implementar verificação de uso por empresas)
              cascadeInfo.willBeDisassociated.push({
                type: 'acessibilidade',
                name: acessibilidade.nome || `Acessibilidade ID: ${acessibilidade.id}`,
                reason: 'SERÁ DESVINCULADA - pode estar em outras barreiras'
              });
            }
          }

          // Verificar candidatos que têm esta barreira
          try {
            const candidatoBarreiraResponse = await fetch(`${API_BASE_URL}/api/candidato-barreira/barreira/${entityId}`);
            if (candidatoBarreiraResponse.ok) {
              const candidatoBarreiras = await candidatoBarreiraResponse.json();
              usageDetails.candidatos = candidatoBarreiras.length;
              
              if (candidatoBarreiras.length > 0) {
                cascadeInfo.willBeDisassociated.push({
                  type: 'candidatos',
                  name: `${candidatoBarreiras.length} candidato(s)`,
                  reason: 'SERÃO DESVINCULADOS - não deletados'
                });
              }
            }
          } catch {
            // Ignorar erro se endpoint não existir
          }

          canDelete = true;
          warningMessage = usageCount > 0 
            ? `Esta barreira possui vínculos. Veja abaixo o que será desvinculado.`
            : 'Esta barreira não possui vínculos e pode ser removida com segurança.';
            
          return {
            canDelete,
            usageCount,
            usageDetails,
            warningMessage,
            cascadeInfo
          };
        }

        case 'acessibilidade': {
          const cascadeInfo = {
            willBeDeleted: [] as Array<{ type: string; name: string; reason: string }>,
            willBeDisassociated: [] as Array<{ type: string; name: string; reason: string }>
          };

          // Verificar empresas que oferecem esta acessibilidade
          try {
            const empresasResponse = await fetch(`${API_BASE_URL}/api/acessibilidades/${entityId}`);
            if (empresasResponse.ok) {
              const data = await empresasResponse.json();
              if (data.EmpresaAcessibilidade) {
                usageDetails.empresas = data.EmpresaAcessibilidade.length;
                usageCount += data.EmpresaAcessibilidade.length;
                
                // Adicionar empresas que serão desassociadas
                data.EmpresaAcessibilidade.forEach((empresaAcess: any) => {
                  cascadeInfo.willBeDisassociated.push({
                    type: 'empresa',
                    name: empresaAcess.empresa?.nomeFantasia || empresaAcess.empresa?.razaoSocial || `Empresa ID: ${empresaAcess.empresaId}`,
                    reason: 'SERÁ DESVINCULADA - não deletada'
                  });
                });
              }
            }
          } catch {
            // Tentar endpoint alternativo
            try {
              const empresasResponse = await fetch(`${API_BASE_URL}/api/acessibilidades/empresa`);
              if (empresasResponse.ok) {
                const allEmpresas = await empresasResponse.json();
                const empresasComAcessibilidade = allEmpresas.filter((empresa: { acessibilidades?: { id: number }[] }) => 
                  empresa.acessibilidades && empresa.acessibilidades.some((acc) => acc.id === entityId)
                );
                usageDetails.empresas = empresasComAcessibilidade.length;
                usageCount += empresasComAcessibilidade.length;
                
                // Adicionar empresas que serão desassociadas
                empresasComAcessibilidade.forEach((empresa: any) => {
                  cascadeInfo.willBeDisassociated.push({
                    type: 'empresa',
                    name: empresa.nomeFantasia || empresa.razaoSocial || `Empresa ID: ${empresa.id}`,
                    reason: 'SERÁ DESVINCULADA - não deletada'
                  });
                });
              }
            } catch {
              // Ignorar se não conseguir buscar
            }
          }

          // Verificar barreiras vinculadas
          try {
            const barreirasResponse = await fetch(`${API_BASE_URL}/api/barreiras`);
            if (barreirasResponse.ok) {
              const todasBarreiras = await barreirasResponse.json();
              const barreirasComAcessibilidade = todasBarreiras.filter((barreira: any) => 
                barreira.acessibilidades && barreira.acessibilidades.some((acc: any) => acc.id === entityId)
              );
              
              if (barreirasComAcessibilidade.length > 0) {
                usageDetails.barreiras = barreirasComAcessibilidade.length;
                usageCount += barreirasComAcessibilidade.length;
                
                barreirasComAcessibilidade.forEach((barreira: any) => {
                  cascadeInfo.willBeDisassociated.push({
                    type: 'barreira',
                    name: barreira.descricao || `Barreira ID: ${barreira.id}`,
                    reason: 'SERÁ DESVINCULADA - não deletada'
                  });
                });
              }
            }
          } catch {
            // Ignorar se endpoint não existir
          }

          // SEMPRE permitir exclusão com desassociação automática (onDelete: Cascade)
          canDelete = true;
          if (usageCount > 0) {
            warningMessage = `Esta acessibilidade está vinculada a ${usageCount} entidade(s). Todas as vinculações serão automaticamente desfeitas.`;
          } else {
            warningMessage = 'Esta acessibilidade não está vinculada a nenhuma entidade e pode ser removida com segurança.';
          }

          return {
            canDelete,
            usageCount,
            usageDetails,
            warningMessage,
            cascadeInfo
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