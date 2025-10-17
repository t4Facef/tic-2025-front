// [TODO] - Adicionar condicionais para se existe ou não um ou resultado para a caixa (se não existir descrição, não mostrar o titulo "descrição" e por ai vai)
// [TODO] - Adicionar visualização dependendo do usario (se for dono da conta consegue editar, se não só visualizar)
// [TODO] - Adicionar um componente proprio para alteração na própria pagina, ao invés de usar um botão genérico de link
// [TODO] - Procurar um icone de setinha e implementar abrir e fechar

import { useState } from "react";
import GenericBlueButton from "../buttons/generic_blue_button"
import GenericFormField from "../forms/generic_form_field";
import { EDUCATION_TYPES, CONTRACT_TYPES, EDUCATION_STATUS } from "../../data/constants/select_options";

interface InfoType {
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
    onAdd?: (newItem: InfoType) => Promise<void> | void;
}

export default function PerfilContentSection({ title, info, description, type, edit = false, onAdd }: PerfilContentSectionProps) {
    const [isAdding, setIsAdding] = useState(false)
    const [newInfoType, setNewInfoType] = useState<InfoType>({} as InfoType)
    const isFormation = type === "formacao"
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
                    {info.map((item, index) => (
                        <div key={index} className="p-4 bg-blue4 rounded-lg">
                            <div className="py-3">
                                <p className="text-[13px]">{item.formationType}</p>
                                <p className="text-[22px] font-medium">{item.course} - {item.institut}</p>
                                <p className="text-[15px]">{item.startDate} até {item.endDate} - {item.status}</p>
                            </div>
                            <h2 className="font-bold text-lg mt-4 mb-2">Descrição</h2>
                            <p className="mb-4">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                    {isAdding && <div className="p-4 bg-blue4 rounded-lg">
                        <div className="py-3 space-y-1">
                            <p className="font-semibold">Adicionando {isFormation ? 'Nova Formação' : 'Nova Experiência'}</p>
                            <GenericFormField id="tipo" type="select" placeholder="Selecione" options={isFormation ? EDUCATION_TYPES : CONTRACT_TYPES} onChange={(e) => setNewInfoType((prev) => ({...prev, formationType: e.target.value}))}>{isFormation ? "Tipo de Formação" : "Tipo de Contrato"}</GenericFormField>
                            <div className="flex gap-8">
                                <GenericFormField id="curso" onChange={(e) => setNewInfoType((prev) => ({...prev, course: e.target.value}))}>{isFormation ? "Curso" : "Título/Cargo"}</GenericFormField>
                                <GenericFormField id="local" onChange={(e) => setNewInfoType((prev) => ({...prev, institut: e.target.value}))}>{isFormation ? "Instituição" : "Empresa"}</GenericFormField>
                            </div>
                            <div className="flex gap-8">
                                <GenericFormField id="startDate" type="date" onChange={(e) => setNewInfoType((prev) => ({...prev, startDate: e.target.value}))}>Data de Início</GenericFormField>
                                <GenericFormField id="endDate" type="date" onChange={(e) => setNewInfoType((prev) => ({...prev, endDate: e.target.value}))}>Data de Finalização</GenericFormField>
                                {isFormation && <GenericFormField id="status" type="select" options={EDUCATION_STATUS} onChange={(e) => setNewInfoType((prev) => ({...prev, status: e.target.value}))}>Status</GenericFormField>}
                            </div>
                        </div>
                        <GenericFormField id="descricao" type="textarea" onChange={(e) => setNewInfoType((prev) => ({...prev, desc: e.target.value}))}>Descrição</GenericFormField>
                    </div>
                    }
                </div>
                {edit && (
                    <div className="flex justify-end gap-5 m-3">
                        <GenericBlueButton color={3} size="md" onClick={async () => {
                            if (isAdding) {
                                await onAdd?.(newInfoType)
                                setNewInfoType({} as InfoType)
                            }
                            setIsAdding(!isAdding)
                        }}>{isAdding ? "Concluir" : "Adicionar"}</GenericBlueButton>
                    </div>
                )}
            </div>
        </div>
    )
}

