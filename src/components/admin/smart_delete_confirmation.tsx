import { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, CheckCircle, X, Shield } from 'lucide-react';
import { useEntityUsage, UsageInfo } from '../../hooks/useEntityUsage';

interface SmartDeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (usageInfo?: UsageInfo) => void; // Modificado para passar usageInfo
  entityType: string;
  entityId: number;
  entityName: string;
  title?: string;
}

const SmartDeleteConfirmation: React.FC<SmartDeleteConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  entityType,
  entityId,
  entityName,
  title
}) => {
  const [usageInfo, setUsageInfo] = useState<UsageInfo | null>(null);
  const { checkUsage, loading } = useEntityUsage();

  useEffect(() => {
    if (isOpen && entityId) {
      checkUsage(entityType, entityId).then(setUsageInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, entityType, entityId]);

  const handleConfirm = () => {
    if (usageInfo?.canDelete) {
      onConfirm(usageInfo); // Passa usageInfo para a função
      onClose();
    } else if (!usageInfo?.canDelete) {
      alert('Esta entidade não pode ser excluída no momento devido às dependências.');
    }
  };

  const getEntityTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      tipo: 'Tipo',
      subtipo: 'Subtipo', 
      barreira: 'Barreira',
      acessibilidade: 'Acessibilidade'
    };
    return labels[type] || type;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${
              usageInfo?.canDelete === false 
                ? 'bg-red-100 text-red-600' 
                : 'bg-yellow-100 text-yellow-600'
            }`}>
              {usageInfo?.canDelete === false ? (
                <Shield className="h-5 w-5" />
              ) : (
                <AlertTriangle className="h-5 w-5" />
              )}
            </div>
            <h3 className="text-lg font-semibold">
              {title || `${usageInfo?.isDelete === false ? 'Desassociar' : 'Excluir'} ${getEntityTypeLabel(entityType)}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Entity Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600 mb-1">
                  {getEntityTypeLabel(entityType)} selecionado:
                </p>
                <p className="font-medium text-gray-900">{entityName}</p>
              </div>

              {/* Usage Analysis */}
              {usageInfo && (
                <div className={`rounded-lg p-4 border ${
                  usageInfo.canDelete 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start space-x-2">
                    <div className={`mt-0.5 ${
                      usageInfo.canDelete ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {usageInfo.canDelete ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Shield className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        usageInfo.canDelete ? 'text-blue-800' : 'text-red-800'
                      }`}>
                        {usageInfo.canDelete 
                          ? (usageInfo.cascadeInfo && (usageInfo.cascadeInfo.willBeDeleted.length > 0 || usageInfo.cascadeInfo.willBeDisassociated.length > 0)
                              ? 'Exclusão em cascata disponível'
                              : 'Exclusão simples disponível')
                          : 'Exclusão bloqueada'
                        }
                      </p>
                      <p className={`text-xs mt-1 ${
                        usageInfo.canDelete ? 'text-blue-700' : 'text-red-700'
                      }`}>
                        {usageInfo.warningMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cascade Information */}
              {usageInfo?.cascadeInfo && (usageInfo.cascadeInfo.willBeDeleted.length > 0 || usageInfo.cascadeInfo.willBeDisassociated.length > 0) && (
                <div className="space-y-4">
                  {/* Items to be deleted */}
                  {usageInfo.cascadeInfo.willBeDeleted.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
                        🗑️ Serão excluídos permanentemente ({usageInfo.cascadeInfo.willBeDeleted.length})
                      </h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {usageInfo.cascadeInfo.willBeDeleted.map((item, index) => (
                          <div key={index} className="text-xs text-red-700 flex items-start gap-2">
                            <span className="font-medium capitalize">{item.type}:</span>
                            <div className="flex-1">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-red-600 ml-1">({item.reason})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Items to be disassociated */}
                  {usageInfo.cascadeInfo.willBeDisassociated.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                        🔗 Serão apenas desvinculados ({usageInfo.cascadeInfo.willBeDisassociated.length})
                      </h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {usageInfo.cascadeInfo.willBeDisassociated.map((item, index) => (
                          <div key={index} className="text-xs text-yellow-700 flex items-start gap-2">
                            <span className="font-medium capitalize">{item.type}:</span>
                            <div className="flex-1">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-yellow-600 ml-1">({item.reason})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Simple Confirmation */}
              {usageInfo?.canDelete && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 font-medium">⚠️ Confirmação de Exclusão</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Esta ação é irreversível. Tem certeza de que deseja excluir permanentemente?
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          
          {usageInfo?.canDelete && (
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>
                {usageInfo.isDelete === false ? 'Desassociar' : 'Excluir Permanentemente'}
              </span>
            </button>
          )}
          
          {usageInfo?.canDelete === false && (
            <div className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium">
              Exclusão não permitida
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartDeleteConfirmation;