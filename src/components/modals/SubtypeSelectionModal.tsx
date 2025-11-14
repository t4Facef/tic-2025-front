import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';
import { X } from 'lucide-react';

interface Subtipo {
  id: number;
  nome: string;
}

interface SubtypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipoId: number;
  selectedSubtypes: Subtipo[];
  onConfirm: (selectedSubtypes: Subtipo[]) => void;
}

export default function SubtypeSelectionModal({
  isOpen,
  onClose,
  tipoId,
  selectedSubtypes,
  onConfirm
}: SubtypeSelectionModalProps) {
  const [subtipos, setSubtipos] = useState<Subtipo[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && tipoId) {
      fetchSubtipos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, tipoId]);

  useEffect(() => {
    setSelectedIds(selectedSubtypes.map(st => st.id));
  }, [selectedSubtypes]);

  const fetchSubtipos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/subtipos/tipoId/${tipoId}`);
      const data = await response.json();
      setSubtipos(data);
    } catch (error) {
      console.error('Erro ao buscar subtipos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (subtipoId: number) => {
    setSelectedIds(prev => 
      prev.includes(subtipoId)
        ? prev.filter(id => id !== subtipoId)
        : [...prev, subtipoId]
    );
  };

  const handleConfirm = () => {
    const selectedSubtiposData = subtipos.filter(st => selectedIds.includes(st.id));
    onConfirm(selectedSubtiposData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Selecionar Subtipos de Deficiência</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X size={20} />
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Carregando subtipos...</div>
        ) : (
          <div className="space-y-3 mb-6">
            {subtipos.map((subtipo) => (
              <label key={subtipo.id} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(subtipo.id)}
                  onChange={() => handleCheckboxChange(subtipo.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{subtipo.nome}</span>
              </label>
            ))}
          </div>
        )}
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 bg-blue3 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Concluir ({selectedIds.length} selecionados)
          </button>
        </div>
      </div>
    </div>
  );
}