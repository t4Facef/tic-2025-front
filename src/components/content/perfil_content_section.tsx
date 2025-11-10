import { useState, useEffect, useRef } from "react";
import GenericBlueButton from "../buttons/generic_blue_button"
import GenericFormField from "../forms/generic_form_field";
import { EDUCATION_TYPES, CONTRACT_TYPES, EDUCATION_STATUS } from "../../data/constants/select_options";
import { PenLine } from "lucide-react";

interface InfoType {
    id?: number;
    formationType?: string;
    institut: string;
    course: string;
    startDate: string;
    endDate: string;
    status?: string;
    desc: string;
}

interface PerfilContentSectionProps {
    title: string;
    info: InfoType[];
    description?: string;
    edit?: boolean;
    type: "formacao" | "experiencia";
    onUpdate?: (items: InfoType[]) => void;
}

export default function PerfilContentSection({ title, info, description, type, edit = false, onUpdate }: PerfilContentSectionProps) {
    const [isAdding, setIsAdding] = useState(false)
    const [newInfoType, setNewInfoType] = useState<InfoType>({} as InfoType)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [localInfo, setLocalInfo] = useState<InfoType[]>(info)
    const [editingData, setEditingData] = useState<InfoType>({} as InfoType)
    const isFormation = type === "formacao"
    const formRef = useRef<HTMLDivElement>(null)

    // Sincronizar com props quando mudar
    useEffect(() => {
        setLocalInfo(info)
    }, [info])

    // Inicializar dados de edição quando começar a editar
    useEffect(() => {
        if (editingIndex !== null && localInfo[editingIndex]) {
            setEditingData(localInfo[editingIndex])
        } else if (editingIndex === null) {
            setEditingData({} as InfoType)
        }
    }, [editingIndex, localInfo])

    // Resetar estado de edição quando sair do modo de edição
    useEffect(() => {
        if (!edit) {
            setEditingIndex(null)
            setEditingData({} as InfoType)
            setIsAdding(false)
            setNewInfoType({} as InfoType)
        }
    }, [edit])

    // Notificar pai quando dados mudarem
    const updateParent = (newData: InfoType[]) => {
        setLocalInfo(newData)
        onUpdate?.(newData)
    }
    return (
        <div className="w-full space-y-4">
            {title && (
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                </div>
            )}
            {description && (
                <p className="text-slate-600 mb-6">{description}</p>
            )}
            
            <div className="space-y-4">
                {isAdding && (
                    <div ref={formRef} className="bg-blue1 border border-blue2 rounded-xl p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-blue3 mb-4">
                                Adicionando {isFormation ? 'Nova Formação' : 'Nova Experiência'}
                            </h3>
                            <div className="space-y-4">
                                <GenericFormField 
                                    id="tipo" 
                                    type="select" 
                                    placeholder="Selecione" 
                                    options={isFormation ? EDUCATION_TYPES : CONTRACT_TYPES} 
                                    onChange={(e) => setNewInfoType(prev => ({ ...prev, formationType: e.target.value }))} 
                                    value={newInfoType.formationType || ""}
                                >
                                    {isFormation ? "Tipo de Formação" : "Tipo de Contrato"}
                                </GenericFormField>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <GenericFormField 
                                        id="curso" 
                                        onChange={(e) => setNewInfoType(prev => ({ ...prev, course: e.target.value }))} 
                                        value={newInfoType.course || ""}
                                    >
                                        {isFormation ? "Curso" : "Título/Cargo"}
                                    </GenericFormField>
                                    <GenericFormField 
                                        id="local" 
                                        onChange={(e) => setNewInfoType(prev => ({ ...prev, institut: e.target.value }))} 
                                        value={newInfoType.institut || ""}
                                    >
                                        {isFormation ? "Instituição" : "Empresa"}
                                    </GenericFormField>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <GenericFormField 
                                        id="startDate" 
                                        type="date" 
                                        onChange={(e) => setNewInfoType(prev => ({ ...prev, startDate: e.target.value }))} 
                                        value={newInfoType.startDate || ""}
                                    >
                                        Data de Início
                                    </GenericFormField>
                                    <GenericFormField 
                                        id="endDate" 
                                        type="date" 
                                        onChange={(e) => setNewInfoType(prev => ({ ...prev, endDate: e.target.value }))} 
                                        value={newInfoType.endDate || ""}
                                    >
                                        Data de Finalização
                                    </GenericFormField>
                                    {isFormation && (
                                        <GenericFormField 
                                            id="status" 
                                            type="select" 
                                            options={EDUCATION_STATUS} 
                                            onChange={(e) => setNewInfoType(prev => ({ ...prev, status: e.target.value }))} 
                                            value={newInfoType.status || ""}
                                        >
                                            Status
                                        </GenericFormField>
                                    )}
                                </div>
                                <GenericFormField 
                                    id="descricao" 
                                    type="textarea" 
                                    rows={4}
                                    onChange={(e) => setNewInfoType(prev => ({ ...prev, desc: e.target.value }))} 
                                    value={newInfoType.desc || ""}
                                >
                                    Descrição
                                </GenericFormField>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <GenericBlueButton color={3} size="sm" onClick={() => {
                                setIsAdding(false)
                                setNewInfoType({} as InfoType)
                            }}>
                                Cancelar
                            </GenericBlueButton>
                            <GenericBlueButton color={2} size="sm" onClick={() => {
                                const updatedData = [newInfoType, ...localInfo]
                                updateParent(updatedData)
                                setIsAdding(false)
                                setNewInfoType({} as InfoType)
                            }}>
                                Adicionar
                            </GenericBlueButton>
                        </div>
                    </div>
                )}
                
                {localInfo.map((item, index) => {
                    const isEditing = editingIndex === index
                    if (!isEditing) return (
                        <div key={index} className="bg-blue1 border border-blue2 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <span className="bg-blue2 text-white text-xs px-3 py-1 rounded-full font-medium">
                                            {item.formationType}
                                        </span>
                                        {item.status && (
                                            <span className="bg-blue3 text-white text-xs px-3 py-1 rounded-full font-medium">
                                                {item.status}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-blue3 mb-2 break-words">
                                        {item.course}
                                    </h3>
                                    <p className="text-blue3 font-medium mb-2 break-words">{item.institut}</p>
                                    <p className="text-blue2 text-sm mb-3">{item.startDate} até {item.endDate}</p>
                                    {item.desc && (
                                        <div className="bg-white p-4 rounded-lg border border-blue2">
                                            <h4 className="font-semibold text-blue3 mb-2 text-sm">Descrição</h4>
                                            <p className="text-blue3 text-sm leading-relaxed break-words overflow-wrap-anywhere">{item.desc}</p>
                                        </div>
                                    )}
                                </div>
                                {edit && (
                                    <div className="flex-shrink-0">
                                        <button 
                                            className="p-2 bg-white hover:bg-blue2 hover:text-white text-blue3 rounded-lg transition-colors"
                                            onClick={() => setEditingIndex(isEditing ? null : index)}
                                        >
                                            <PenLine size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                    else {
                        // Convert MM/YYYY to YYYY-MM-DD for date inputs
                        const formatDateForInput = (dateStr: string) => {
                            if (!dateStr) return ''
                            
                            // Check if it's already in ISO format (YYYY-MM-DD)
                            if (dateStr.includes('-') && dateStr.length === 10) {
                                return dateStr
                            }
                            
                            // Convert MM/YYYY to YYYY-MM-01 (first day of month)
                            const [month, year] = dateStr.split('/')
                            return `${year}-${month.padStart(2, '0')}-01`
                        }

                        const updateEditingData = (field: string, value: string) => {
                            setEditingData(prev => ({ ...prev, [field]: value }))
                        }

                        return (
                            <div key={index} className="bg-blue1 border border-blue2 rounded-xl p-6">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-blue3 mb-4">
                                        Editando {isFormation ? 'formação' : 'experiência'}
                                    </h3>
                                    <div className="space-y-4">
                                        <GenericFormField 
                                            id="tipo" 
                                            type="select" 
                                            placeholder="Selecione" 
                                            options={isFormation ? EDUCATION_TYPES : CONTRACT_TYPES} 
                                            onChange={(e) => updateEditingData('formationType', e.target.value)} 
                                            value={editingData.formationType || item.formationType}
                                        >
                                            {isFormation ? "Tipo de Formação" : "Tipo de Contrato"}
                                        </GenericFormField>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <GenericFormField 
                                                id="curso" 
                                                onChange={(e) => updateEditingData('course', e.target.value)} 
                                                value={editingData.course || item.course}
                                            >
                                                {isFormation ? "Curso" : "Título/Cargo"}
                                            </GenericFormField>
                                            <GenericFormField 
                                                id="local" 
                                                onChange={(e) => updateEditingData('institut', e.target.value)} 
                                                value={editingData.institut || item.institut}
                                            >
                                                {isFormation ? "Instituição" : "Empresa"}
                                            </GenericFormField>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <GenericFormField 
                                                id="startDate" 
                                                type="date" 
                                                onChange={(e) => updateEditingData('startDate', e.target.value)} 
                                                value={formatDateForInput(editingData.startDate || item.startDate)}
                                            >
                                                Data de Início
                                            </GenericFormField>
                                            <GenericFormField 
                                                id="endDate" 
                                                type="date" 
                                                onChange={(e) => updateEditingData('endDate', e.target.value)} 
                                                value={formatDateForInput(editingData.endDate || item.endDate)}
                                            >
                                                Data de Finalização
                                            </GenericFormField>
                                            {isFormation && (
                                                <GenericFormField 
                                                    id="status" 
                                                    type="select" 
                                                    options={EDUCATION_STATUS} 
                                                    onChange={(e) => updateEditingData('status', e.target.value)} 
                                                    value={editingData.status || item.status}
                                                >
                                                    Status
                                                </GenericFormField>
                                            )}
                                        </div>
                                        <GenericFormField 
                                            id="descricao" 
                                            type="textarea" 
                                            rows={4}
                                            onChange={(e) => updateEditingData('desc', e.target.value)} 
                                            value={editingData.desc || item.desc}
                                        >
                                            Descrição
                                        </GenericFormField>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <GenericBlueButton color={3} size="sm" onClick={() => {
                                        setEditingIndex(null)
                                        setEditingData({} as InfoType)
                                    }}>
                                        Cancelar
                                    </GenericBlueButton>
                                    <GenericBlueButton color={2} size="sm" onClick={() => {
                                        const updatedData = [...localInfo]
                                        const finalData = { ...editingData, id: item.id }
                                        updatedData[index] = finalData
                                        updateParent(updatedData)
                                        setEditingIndex(null)
                                        setEditingData({} as InfoType)
                                    }}>
                                        Finalizar
                                    </GenericBlueButton>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            
            {edit && (
                <div className="flex justify-center mt-6">
                    <GenericBlueButton 
                        color={2} 
                        size="md" 
                        onClick={() => {
                            if (!isAdding) {
                                setIsAdding(true)
                                setTimeout(() => {
                                    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }, 100)
                            } else {
                                setIsAdding(false)
                            }
                        }}
                    >
                        {isAdding ? "Cancelar" : `Adicionar ${isFormation ? 'Formação' : 'Experiência'}`}
                    </GenericBlueButton>
                </div>
            )}
        </div>
    )
}

