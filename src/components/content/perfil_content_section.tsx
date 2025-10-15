// [TODO] - Adicionar condicionais para se existe ou não um ou resultado para a caixa (se não existir descrição, não mostrar o titulo "descrição" e por ai vai)
// [TODO] - Adicionar visualização dependendo do usario (se for dono da conta consegue editar, se não só visualizar)
// [TODO] - Adicionar um componente proprio para alteração na própria pagina, ao invés de usar um botão genérico de link
// [TODO] - Procurar um icone de setinha e implementar abrir e fechar

import GenericBlueButton from "../buttons/generic_blue_button"

interface InfoType {
    formationType?: string;
    institut: string;
    course: string;
    startDate: string;
    endDate: string;
    status: string;
    desc: string;
}

interface PerfilContentSectionProps {
    title: string;
    info: InfoType[];
    description?: string;
    edit?: boolean;
}

export default function PerfilContentSection({title, info, description, edit = false}: PerfilContentSectionProps){
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
                <hr className="border-black mb-6"/>
                <div className="space-y-4 mt-4">
                    {info.map((item, index) => (
                        <div key={index} className="p-4 bg-slate-100 rounded-lg">
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
                </div>
                {edit && (
                    <div className="flex justify-end gap-5 m-3">
                        <GenericBlueButton color={3} size="md">Remover</GenericBlueButton>
                        <GenericBlueButton color={3} size="md">Adicionar</GenericBlueButton>
                    </div>
                )}
            </div>
        </div>
    )
}