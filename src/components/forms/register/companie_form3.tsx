import { useEffect, useState } from "react";
import { CompanieForm3Data } from "../../../types/forms/companie";
import TagContainer from "../../content/tag_container";
import { API_BASE_URL } from "../../../config/api";

export default function CompanieForm3({ formFunc, formId, initialData }: { formFunc: (data: CompanieForm3Data) => void, formId: string, initialData?: CompanieForm3Data }) {
    const [acessibilityTags, setAcessibilityTags] = useState<string[]>([])
    const [acessibilidades, setAcessibilidades] = useState<{ nome: string, id: number }[]>([])
    const [options, setOptions] = useState<string[]>([])


    useEffect(() => {
        const fetchAcessibilidades = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/acessibilidades/nomes`)
                const data = await res.json()
                setAcessibilidades(data)

                const opt = data.map((acessibilidade: { nome: string }) => acessibilidade.nome).sort()
                setOptions(opt)
            } catch (error) {
                console.log("Erro ao buscar as acessibilidades: " + error)
            }
        }

        fetchAcessibilidades()
    }, [])

    useEffect(() => {
        if(initialData?.supportCapabilities && acessibilidades.length > 0){
            const acessNames = initialData.supportCapabilities.map((acessIds: string) => {
                const found = acessibilidades.find((acessObj: { nome: string, id: number }) => acessObj.id === Number(acessIds))
                return found?.nome || ""
            }).filter(name => name !== "")
            setAcessibilityTags(acessNames)
        }
    }, [acessibilidades, initialData?.supportCapabilities])

    //Use effect pegando os dados do form3 pra colocar em acessibility tags quando voltar

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={(e) => {
            e.preventDefault();
            const ids = acessibilityTags.map((acessNome: string) => acessibilidades.find((acessObj: { nome: string, id: number }) => acessObj.nome === acessNome)?.id.toString() || "0")
            const cleanedData = {
                supportCapabilities: ids
            }
            formFunc(cleanedData)
        }}>
            <h2 className="font-semibold text-[1.3rem]">Informações de Inclusão</h2>
            <p className="text-gray-700 leading-relaxed">
                Informe as capacidades de apoio que sua empresa oferece para pessoas com deficiência.
                Essas informações ajudam os candidatos a entender como sua empresa promove a inclusão
                e quais recursos estão disponíveis para garantir um ambiente de trabalho acessível e acolhedor.
            </p>
            <TagContainer
                key={acessibilityTags.join(',')}
                edit={true}
                tags={acessibilityTags}
                onChange={(tags) => setAcessibilityTags(tags)}
                options={options}
            >
                Capacidades de Apoio
            </TagContainer>
        </form>
    )
}