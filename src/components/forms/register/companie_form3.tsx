import { useState } from "react";
import { CompanieForm3Data } from "../../../types/forms/companie";
import TagContainer from "../../content/tag_container";

export default function CompanieForm3({ formFunc, formId, initialData }: { formFunc: (data: CompanieForm3Data) => void, formId: string, initialData?: CompanieForm3Data }) {
    const [form3, setForm3] = useState<CompanieForm3Data>(initialData || {} as CompanieForm3Data)
    
    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={(e) => {
            e.preventDefault();
            formFunc(form3)
        }}>
            <h2 className="font-semibold text-[1.3rem]">Informações de Inclusão</h2>
            <p className="text-gray-700 leading-relaxed">
                    Informe as capacidades de apoio que sua empresa oferece para pessoas com deficiência. 
                Essas informações ajudam os candidatos a entender como sua empresa promove a inclusão 
                e quais recursos estão disponíveis para garantir um ambiente de trabalho acessível e acolhedor.
            </p>
            <TagContainer 
                edit={true} 
                tags={form3.supportCapabilities || []} 
                onChange={(tags) => setForm3(prev => ({...prev, supportCapabilities: tags}))}
                options={[
                    "Rampa de acesso", "Elevador", "Banheiro adaptado", "Intérprete de Libras", 
                    "Software leitor de tela", "Mesa ajustável", "Cadeira ergonômica", 
                    "Iluminação adequada", "Piso tátil", "Sinalização em Braille",
                    "Apoio psicológico", "Flexibilidade de horário", "Transporte adaptado",
                    "Tecnologia assistiva", "Acompanhamento especializado"
                ]}
            >
                Capacidades de Apoio
            </TagContainer>
        </form>
    )
}