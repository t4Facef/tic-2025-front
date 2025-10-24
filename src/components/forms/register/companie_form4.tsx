import { useState, useEffect } from "react";
import { CompanieForm4Data } from "../../../types/forms/companie";
import TagContainer from "../../content/tag_container";
import { API_BASE_URL } from "../../../config/api";

interface Acessibilidade {
    id: number;
    nome: string;
}

export default function CompanieForm4({ formFunc, formId, initialData }: { formFunc: (data: CompanieForm4Data) => void, formId: string, initialData?: CompanieForm4Data }) {
    const [form4, setForm4] = useState<CompanieForm4Data>(initialData || { supportCapabilities: [] } as CompanieForm4Data)
    const [acessibilidades, setAcessibilidades] = useState<Acessibilidade[]>([])
    const [supportOptions, setSupportOptions] = useState<string[]>([])

    useEffect(() => {
        const fetchAcessibilidades = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/acessibilidades`)
                const data = await response.json()
                setAcessibilidades(data)
                setSupportOptions(data.map((acc: Acessibilidade) => acc.nome))
            } catch (error) {
                console.error('Erro ao carregar acessibilidades:', error)
            }
        }

        fetchAcessibilidades()
    }, [])

    const handleTagsChange = (tags: string[]) => {
        setForm4(prev => ({ ...prev, supportCapabilities: tags }))
    }

    return (
        <form id={formId} className="flex-col text-start space-y-6" onSubmit={(e) => {
            e.preventDefault()
            formFunc({ ...form4, acessibilidades })
        }}>
            <div className="space-y-4">
                <h2 className="font-semibold text-[1.3rem]">Capacidades de Apoio</h2>
                <p className="text-gray-700 leading-relaxed">Selecione ou adicione os tipos de acessibilidade e apoio que sua empresa pode oferecer aos colaboradores PCDs.</p>
            </div>

            <TagContainer 
                edit={true} 
                tags={form4.supportCapabilities} 
                onChange={handleTagsChange}
                options={supportOptions}
            >
                Capacidades de Apoio
            </TagContainer>
        </form>
    )
}