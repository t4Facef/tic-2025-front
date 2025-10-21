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
        <div className="bg-blue1 px-6 py-2 rounded-xl">
            <div className="py-2">
                <div className="font-semibold text-[22px] py-1 mb-4">
                    {title}
                    <img src="" alt="" />
                </div>
                {description && (
                    <p className="text-gray-600 text-sm mb-4 italic">{description}</p>
                )}
                <hr className="border-black mb-6" />
                <div className="space-y-4 mt-4">
                    {isAdding && <div ref={formRef} className="p-4 bg-blue4">
                        <div className="py-3 space-y-1">
                            <p className="font-semibold">Adicionando {isFormation ? 'Nova Formação' : 'Nova Experiência'}</p>
                            <GenericFormField id="tipo" type="select" placeholder="Selecione" options={isFormation ? EDUCATION_TYPES : CONTRACT_TYPES} onChange={(e) => setNewInfoType(prev => ({ ...prev, formationType: e.target.value }))} value={newInfoType.formationType || ""}>{isFormation ? "Tipo de Formação" : "Tipo de Contrato"}</GenericFormField>
                            <div className="flex gap-8">
                                <GenericFormField id="curso" onChange={(e) => setNewInfoType(prev => ({ ...prev, course: e.target.value }))} value={newInfoType.course || ""}>{isFormation ? "Curso" : "Título/Cargo"}</GenericFormField>
                                <GenericFormField id="local" onChange={(e) => setNewInfoType(prev => ({ ...prev, institut: e.target.value }))} value={newInfoType.institut || ""}>{isFormation ? "Instituição" : "Empresa"}</GenericFormField>
                            </div>
                            <div className="flex gap-8">
                                <GenericFormField id="startDate" type="date" onChange={(e) => setNewInfoType(prev => ({ ...prev, startDate: e.target.value }))} value={newInfoType.startDate || ""}>Data de Início</GenericFormField>
                                <GenericFormField id="endDate" type="date" onChange={(e) => setNewInfoType(prev => ({ ...prev, endDate: e.target.value }))} value={newInfoType.endDate || ""}>Data de Finalização</GenericFormField>
                                {isFormation && <GenericFormField id="status" type="select" options={EDUCATION_STATUS} onChange={(e) => setNewInfoType(prev => ({ ...prev, status: e.target.value }))} value={newInfoType.status || ""}>Status</GenericFormField>}
                            </div>
                        </div>
                        <GenericFormField id="descricao" type="textarea" onChange={(e) => setNewInfoType(prev => ({ ...prev, desc: e.target.value }))} value={newInfoType.desc || ""}>Descrição</GenericFormField>
                        <div className="flex w-full justify-end pt-3 gap-3">
                            <GenericBlueButton color={3} size="sm" onClick={() => {
                                setIsAdding(false)
                                setNewInfoType({} as InfoType)
                            }}>Cancelar</GenericBlueButton>
                            <GenericBlueButton color={3} size="sm" onClick={() => {
                                const updatedData = [newInfoType, ...localInfo]
                                updateParent(updatedData)
                                setIsAdding(false)
                                setNewInfoType({} as InfoType)
                            }}>Adicionar</GenericBlueButton>
                        </div>
                    </div>}
                    {localInfo.map((item, index) => {
                        const isEditing = editingIndex === index
                        if (!isEditing) return (
                            <div key={index} className="p-4 bg-blue4">
                                <div className="flex justify-between">
                                    <div className="py-3">
                                        <p className="text-[13px]">{item.formationType}</p>
                                        <p className="text-[22px] font-medium">{item.course} - {item.institut}</p>
                                        <p className="text-[15px]">{item.startDate} até {item.endDate} - {item.status}</p>
                                    </div>
                                    {edit && <div>
                                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-slate-50" onClick={() => setEditingIndex(isEditing ? null : index)}>
                                            <PenLine />
                                        </button>
                                    </div>}

                                </div>
                                <h2 className="font-bold text-lg mt-4 mb-2">Descrição</h2>
                                <p className="mb-4">
                                    {item.desc}
                                </p>
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

                            // useEffect já foi movido para o nível do componente

                            const updateEditingData = (field: string, value: string) => {
                                setEditingData(prev => ({ ...prev, [field]: value }))
                            }

                            return (
                                <div className="p-4 bg-blue4">
                                    <div className="py-3 space-y-1">
                                        <p className="font-semibold">Editando {isFormation ? 'formação' : 'experiência'}</p>
                                        <GenericFormField id="tipo" type="select" placeholder="Selecione" options={isFormation ? EDUCATION_TYPES : CONTRACT_TYPES} onChange={(e) => updateEditingData('formationType', e.target.value)} value={editingData.formationType || item.formationType}>{isFormation ? "Tipo de Formação" : "Tipo de Contrato"}</GenericFormField>
                                        <div className="flex gap-8">
                                            <GenericFormField id="curso" onChange={(e) => updateEditingData('course', e.target.value)} value={editingData.course || item.course}>{isFormation ? "Curso" : "Título/Cargo"}</GenericFormField>
                                            <GenericFormField id="local" onChange={(e) => updateEditingData('institut', e.target.value)} value={editingData.institut || item.institut}>{isFormation ? "Instituição" : "Empresa"}</GenericFormField>
                                        </div>
                                        <div className="flex gap-8">
                                            <GenericFormField id="startDate" type="date" onChange={(e) => updateEditingData('startDate', e.target.value)} value={formatDateForInput(editingData.startDate || item.startDate)}>Data de Início</GenericFormField>
                                            <GenericFormField id="endDate" type="date" onChange={(e) => updateEditingData('endDate', e.target.value)} value={formatDateForInput(editingData.endDate || item.endDate)}>Data de Finalização</GenericFormField>
                                            {isFormation && <GenericFormField id="status" type="select" options={EDUCATION_STATUS} onChange={(e) => updateEditingData('status', e.target.value)} value={editingData.status || item.status}>Status</GenericFormField>}
                                        </div>
                                    </div>
                                    <GenericFormField id="descricao" type="textarea" onChange={(e) => updateEditingData('desc', e.target.value)} value={editingData.desc || item.desc}>Descrição</GenericFormField>
                                    <div className="flex w-full justify-end pt-3">
                                        <GenericBlueButton color={3} size="sm" onClick={() => {
                                            const updatedData = [...localInfo]
                                            const finalData = { ...editingData, id: item.id }
                                            updatedData[index] = finalData
                                            updateParent(updatedData)
                                            setEditingIndex(null)
                                            setEditingData({} as InfoType)
                                        }}>Finalizar</GenericBlueButton>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                {edit && (
                    <div className="flex justify-end gap-5 m-3">
                        {isAdding && <GenericBlueButton color={3} size="md" onClick={() => {
                            setIsAdding(false)
                            setNewInfoType({} as InfoType)
                        }}>Cancelar</GenericBlueButton>}
                        <GenericBlueButton color={3} size="md" onClick={() => {
                            if (!isAdding) {
                                setIsAdding(true)
                                setTimeout(() => {
                                    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }, 100)
                            } else {
                                setIsAdding(false)
                            }
                        }}>{isAdding ? "Cancelar" : "Adicionar"}</GenericBlueButton>
                    </div>
                )}
            </div>
        </div>
    )
}

