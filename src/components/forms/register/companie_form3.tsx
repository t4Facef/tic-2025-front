import { useEffect, useState } from "react";
import { CompanieForm3Data } from "../../../types/forms/companie";
import TagContainer from "../../content/tag_container";

export default function CompanieForm3({ formFunc, formId, initialData }: { formFunc: (data: CompanieForm3Data) => void, formId: string, initialData?: CompanieForm3Data }) {
    const [form3, setForm3] = useState<CompanieForm3Data>(initialData || {} as CompanieForm3Data)
    const [acessibilidades, setAcessibilidades] = useState<{nome: string, id: number}[]>([])
    const [options, setOptions] = useState<string[]>([]) 
    const API_BASE_URL = "http://localhost:3001"

    useEffect(() => {
        const fetchAcessibilidades = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/acessibilidades/nomes`)
                const data = await res.json()
                setAcessibilidades(data)

                const opt = data.map((acessibilidade: { nome: string }) => acessibilidade.nome).sort()
                setOptions(opt)
            } catch (error){
                console.log("Erro ao buscar as acessibilidades: " + error)
            }
        }

        fetchAcessibilidades()
    }, [])
    
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
                options={options}
            >
                Capacidades de Apoio
            </TagContainer>
        </form>
    )
}