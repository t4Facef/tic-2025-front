import { useState, useEffect } from 'react';

interface EditableTagContainerProps {
    children: string; // título
    availableOptions: { id: number; descricao: string }[]; // barreiras disponíveis
    selectedIds: number[]; // IDs selecionados
    onSelectionChange: (selectedIds: number[]) => void; // callback quando seleção muda
    edit?: boolean; // se permite edição
}

export default function EditableTagContainer({ 
    children, 
    availableOptions, 
    selectedIds, 
    onSelectionChange, 
    edit = true 
}: EditableTagContainerProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempSelected, setTempSelected] = useState<number[]>(selectedIds);

    useEffect(() => {
        setTempSelected(selectedIds);
    }, [selectedIds]);

    const handleSave = () => {
        onSelectionChange(tempSelected);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempSelected(selectedIds);
        setIsEditing(false);
    };

    const handleToggleOption = (optionId: number) => {
        setTempSelected(prev => 
            prev.includes(optionId) 
                ? prev.filter(id => id !== optionId)
                : [...prev, optionId]
        );
    };

    const selectedOptions = availableOptions.filter(option => selectedIds.includes(option.id));

    if (isEditing && edit) {
        return (
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">{children}</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                            Salvar
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {availableOptions.map(option => (
                        <label
                            key={option.id}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={tempSelected.includes(option.id)}
                                onChange={() => handleToggleOption(option.id)}
                                className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">{option.descricao}</span>
                        </label>
                    ))}
                </div>
                
                {tempSelected.length === 0 && (
                    <p className="text-gray-500 text-sm mt-2">Nenhuma barreira selecionada</p>
                )}
            </div>
        );
    }

    return (
        <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">{children}</h3>
                {edit && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                        Editar
                    </button>
                )}
            </div>
            
            <div className="flex flex-wrap gap-2">
                {selectedOptions.length > 0 ? (
                    selectedOptions.map(option => (
                        <span
                            key={option.id}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                            {option.descricao}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-500 text-sm">Nenhuma barreira selecionada</span>
                )}
            </div>
        </div>
    );
}