// [TODO] - Adicionar condicionais para se existe ou não um ou resultado para a caixa (se não existir descrição, não mostrar o titulo "descrição" e por ai vai)
// [TODO] - Adicionar visualização dependendo do usario (se for dono da conta consegue editar, se não só visualizar)
// [TODO] - Adicionar um componente proprio para alteração na própria pagina, ao invés de usar um botão genérico de link
// [TODO] - Procurar um icone de setinha e implementar abrir e fechar

import GenericBlueButton from "../buttons/generic_blue_button"

interface PerfilContentSectionProps {
    title: string;
    formationType?: string;
    course?: string;
    institut: string;
    startDate: string;
    endDate: string;
    status: string;
    description?: string;
}

export default function PerfilContentSection({title, formationType, course, institut, startDate, endDate, status, description}: PerfilContentSectionProps){
    return (
        <div className="bg-blue4 mt-8 px-6 rounded-xl">
            <div>
                <div className="font-semibold text-[22px] py-1">
                    {title}
                    <img src="" alt="" />
                </div>
                <hr className="border-black"/>
                <div className="py-3">
                    <p className="text-[13px]">{formationType}</p>
                    <p className="text-[22px] font-medium">{course} - {institut}</p>
                    <p className="text-[15px]">{startDate} até {endDate} - {status}</p>
                </div>
                <h2 className="font-bold text-lg mt-4 mb-2">Descrição</h2>
                <p className="mb-4">
                    {description}
                </p>
                <div className="flex justify-end">
                    {<GenericBlueButton color={3} link="" classEdit="max-h-10 flex items-center m-3">Remover</GenericBlueButton>}
                    {<GenericBlueButton color={3} link="" classEdit="max-h-10 flex items-center m-3">Adicionar</GenericBlueButton>}
                </div>
            </div>
        </div>
    )
}