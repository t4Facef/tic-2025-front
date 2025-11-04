import { useState } from 'react';
import { Plus, Edit, Trash2, ChevronRight } from 'lucide-react';
import { TipoDeficiencia, SubtipoDeficiencia, Barreira, Acessibilidade } from '../../types/admin';
import AdminModal from './admin_modal';

interface DeficiencyManagerProps {
    tipos: TipoDeficiencia[];
    onAddTipo: (nome: string) => void;
    onDeleteTipo: (id: number) => void;
    onAddSubtipo: (tipoId: number, nome: string) => void;
    onDeleteSubtipo: (id: number) => void;
    onAddBarreira: (subtipoId: number, nome: string) => void;
    onDeleteBarreira: (id: number) => void;
    onAddAcessibilidade: (barreiraId: number, nome: string) => void;
    onDeleteAcessibilidade: (id: number) => void;
}

export default function DeficiencyManager({
    tipos,
    onAddTipo,
    onDeleteTipo,
    onAddSubtipo,
    onDeleteSubtipo,
    onAddBarreira,
    onDeleteBarreira,
    onAddAcessibilidade,
    onDeleteAcessibilidade
}: DeficiencyManagerProps) {
    const [modalType, setModalType] = useState<'tipo' | 'subtipo' | 'barreira' | 'acessibilidade' | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [newItemName, setNewItemName] = useState('');

    const handleAdd = () => {
        if (!newItemName.trim()) return;

        switch (modalType) {
            case 'tipo':
                onAddTipo(newItemName);
                break;
            case 'subtipo':
                if (selectedId) onAddSubtipo(selectedId, newItemName);
                break;
            case 'barreira':
                if (selectedId) onAddBarreira(selectedId, newItemName);
                break;
            case 'acessibilidade':
                if (selectedId) onAddAcessibilidade(selectedId, newItemName);
                break;
        }
        
        setNewItemName('');
        setModalType(null);
        setSelectedId(null);
    };

    const openModal = (type: typeof modalType, id?: number) => {
        setModalType(type);
        setSelectedId(id || null);
        setNewItemName('');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-blue3">Tipos de Deficiência</h3>
                <button
                    onClick={() => openModal('tipo')}
                    className="flex items-center gap-2 bg-blue3 text-white px-4 py-2 rounded-lg hover:bg-blue3H"
                >
                    <Plus size={16} />
                    Adicionar Tipo
                </button>
            </div>

            <div className="space-y-4">
                {tipos.map(tipo => (
                    <div key={tipo.id} className="border border-blue3 rounded-lg bg-blue1 p-6">
                        <div className="flex justify-between items-center mb-5">
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-blue3 text-white px-2 py-1 rounded-full font-medium">TIPO</span>
                                <h4 className="font-semibold text-blue3">{tipo.nome}</h4>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openModal('subtipo', tipo.id)}
                                    className="text-blue3 hover:text-blue3H"
                                    title="Adicionar Subtipo"
                                >
                                    <Plus size={16} />
                                </button>
                                <button
                                    onClick={() => onDeleteTipo(tipo.id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Excluir Tipo"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="ml-6 space-y-4">
                            {tipo.subtipos.map(subtipo => (
                                <div key={subtipo.id} className="bg-white border border-blue2 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs bg-blue2 text-white px-2 py-1 rounded-full font-medium">SUBTIPO</span>
                                            <span className="font-medium text-blue3">{subtipo.nome}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openModal('barreira', subtipo.id)}
                                                className="text-blue3 hover:text-blue3H"
                                                title="Adicionar Barreira"
                                            >
                                                <Plus size={14} />
                                            </button>
                                            <button
                                                onClick={() => onDeleteSubtipo(subtipo.id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Excluir Subtipo"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="ml-6 space-y-3">
                                        {(subtipo.barreiras || []).map(barreira => (
                                            <div key={barreira.id} className="bg-blue4 border border-blue5 rounded-lg p-3">
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs bg-blue5 text-white px-2 py-1 rounded-full font-medium">BARREIRA</span>
                                                        <span className="text-sm font-medium text-blue3">{barreira.nome}</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => openModal('acessibilidade', barreira.id)}
                                                            className="text-blue3 hover:text-blue3H"
                                                            title="Adicionar Acessibilidade"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                        <button
                                                            onClick={() => onDeleteBarreira(barreira.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                            title="Excluir Barreira"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="ml-6 space-y-2">
                                                    {(barreira.acessibilidades || []).map(acess => (
                                                        <div key={acess.id} className="bg-white border border-gray-200 rounded px-4 py-3 flex justify-between items-center">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">ACESSIBILIDADE</span>
                                                                <span className="text-xs text-blue3">{acess.nome}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => onDeleteAcessibilidade(acess.id)}
                                                                className="text-red-500 hover:text-red-700"
                                                                title="Excluir Acessibilidade"
                                                            >
                                                                <Trash2 size={10} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <AdminModal
                isOpen={modalType !== null}
                onClose={() => setModalType(null)}
                title={`Adicionar ${modalType === 'tipo' ? 'Tipo de Deficiência' : 
                       modalType === 'subtipo' ? 'Subtipo' :
                       modalType === 'barreira' ? 'Barreira' : 'Acessibilidade'}`}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome
                        </label>
                        <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue3 focus:border-transparent"
                            placeholder={`Digite o nome ${modalType === 'tipo' ? 'do tipo' : 
                                        modalType === 'subtipo' ? 'do subtipo' :
                                        modalType === 'barreira' ? 'da barreira' : 'da acessibilidade'}`}
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setModalType(null)}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleAdd}
                            disabled={!newItemName.trim()}
                            className="px-6 py-2 bg-blue3 text-white rounded-lg hover:bg-blue3H disabled:bg-gray-400"
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </AdminModal>
        </div>
    );
}