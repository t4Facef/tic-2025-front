// [TODO] - Adicionar condicionais para se existe ou não um ou resultado para a caixa (se não existir descrição, não mostrar o titulo "descrição" e por ai vai)
// [TODO] - Adicionar visualização dependendo do usario (se for dono da conta consegue editar, se não só visualizar)
// [TODO] - Adicionar um componente proprio para alteração na própria pagina, ao invés de usar um botão genérico de link
// [TODO] - Procurar um icone de setinha e implementar abrir e fechar

import GenericBlueButton from "../buttons/generic_link_blue_button"

interface PerfilContentSectionProps {
    title: string;
    formation_type: string;
}

export default function PerfilContentSection({title, formation_type}: PerfilContentSectionProps){
    return (
        <div className="bg-blue4 mt-8 px-6">
            <div>
                <div className="font-semibold text-[22px] py-1">
                    {title}
                    <img src="" alt="" />
                </div>
                <hr className="border-black"/>
                <div className="py-3">
                    <p>{formation_type}</p>
                    Curso - Instituição
                    XXXX/XXXX - Situação
                </div>

                <h2>Descrição</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia alias aliquid velit veritatis, dolores dolore dolor ipsa, aspernatur doloremque non provident illum, natus corrupti officiis. Tenetur dolorum saepe sit iste.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quisquam quasi temporibus reprehenderit rem, earum repudiandae ipsum dolore, non eos aspernatur odio optio illo sint sed alias iste officia voluptates!
                </p>
                <div className="flex justify-end">
                    {<GenericBlueButton color={3} link="" classEdit="max-h-10 flex items-center m-3">Remover</GenericBlueButton>}
                    {<GenericBlueButton color={3} link="" classEdit="max-h-10 flex items-center m-3">Adicionar</GenericBlueButton>}
                </div>
            </div>
        </div>
    )
}