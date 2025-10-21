// [TODO] - Linkar as APIs para o o conteúdo do Select, pegando dados especificos de subtipo de necessidade dependendo do tipo

import { useEffect, useState } from "react";
import { CandidateForm4Data } from "../../../types/forms/candidate";
import TagContainer from "../../content/tag_container";
import GenericFormField from "../generic_form_field";
import { API_BASE_URL } from "../../../config/api";


export default function CandidateForm4({ formFunc, formId, initialData, archives }: { formFunc: (data: CandidateForm4Data) => void, formId: string, initialData?: CandidateForm4Data, archives: FormData }) {
    const [form4, setForm4] = useState<CandidateForm4Data>(initialData || {} as CandidateForm4Data)
    const [tipos, setTipos] = useState<{ nome: string, id: number }[]>([])
    const [subTipos, setSubTipos] = useState<{ nome: string, id: number }[]>([])
    const [barreiras, setBarreiras] = useState<string[]>([])
    const [tipoId, setTipoId] = useState<number>()
    const [subTipoId, setSubTipoId] = useState<number>()

    const handleFileUpload = (file: File, tipo: string) => {
        // Limpar arquivo anterior do mesmo tipo se existir
        if (archives.has(tipo)) {
            archives.delete(tipo)
        }
        // Adicionar novo arquivo
        archives.append(tipo, file)
    }



    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/tipos`)
                const data = await response.json()
                setTipos(data)
            }
            catch (e) {
                console.log(e)
            }
        }

        fetchTipos()
    }, [])

    // Inicializar tipoId quando tipos carregarem e houver necessityType no initialData
    useEffect(() => {
        if (tipos.length > 0 && form4.necessityType) {
            const foundTipo = tipos.find(tipo => tipo.nome === form4.necessityType)
            if (foundTipo) {
                setTipoId(foundTipo.id)
            }
        }
    }, [tipos, form4.necessityType])

    // Recuperar nome do subtipo quando subTipos carregarem e houver ID salvo
    useEffect(() => {
        if (subTipos.length > 0 && form4.necessitySubtype && !isNaN(Number(form4.necessitySubtype))) {
            // Se necessitySubtype é um ID (número), buscar o nome
            const subTipoId = Number(form4.necessitySubtype)
            const foundSubTipo = subTipos.find(subTipo => subTipo.id === subTipoId)
            if (foundSubTipo) {
                setForm4(prev => ({ ...prev, necessitySubtype: foundSubTipo.nome }))
                setSubTipoId(foundSubTipo.id)
            }
        }
    }, [subTipos, form4.necessitySubtype])

    useEffect(() => {
        if (!tipoId) return; // Não executa se tipoId for undefined/0
        
        const fetchSubTipos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/subtipos/tipoId/${tipoId}`)
                const data = await response.json()
                setSubTipos(data)
            }
            catch (e) {
                console.log(e)
            }
        }

        fetchSubTipos()
    }, [tipoId])

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setForm4((prev) => ({ ...prev, necessityType: e.target.value }))
        setTipoId(tipos.find(tipo => tipo.nome === e.target.value)?.id || 0)
        // Limpar subtipo quando mudar o tipo
        setForm4((prev) => ({ ...prev, necessitySubtype: "" }))
        setSubTipoId(undefined)
    }

    const handleSubTypeChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setForm4((prev) => ({ ...prev, necessitySubtype: e.target.value }))
        const selectedSubTipoId = subTipos.find(subTipo => subTipo.nome === e.target.value)?.id || 0
        setSubTipoId(selectedSubTipoId)
        
        // Buscar barreiras quando subtipo for selecionado
        if (selectedSubTipoId) {
            fetchBarreiras(selectedSubTipoId)
        }
    }
    
    const fetchBarreiras = async (subtipoId: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/barreiras/subtipo/${subtipoId}`)
            const data = await response.json()
            
            // Extrair descrições das barreiras
            const barreiraDescricoes = data.map((barreira: { descricao: string }) => barreira.descricao)
            setBarreiras(barreiraDescricoes)
            
            // Definir automaticamente as barreiras no formulário
            setForm4(prev => ({ ...prev, supportNeeds: barreiraDescricoes }))
            
        } catch (error) {
            console.log('Erro ao buscar barreiras:', error)
            // Fallback para opções padrão
            setBarreiras([
                "Rampa de acesso", "Elevador", "Banheiro adaptado", "Intérprete de Libras", 
                "Software leitor de tela", "Mesa ajustável", "Cadeira ergonômica", 
                "Iluminação adequada", "Piso tátil", "Sinalização em Braille",
                "Apoio psicológico", "Flexibilidade de horário", "Transporte adaptado",
                "Tecnologia assistiva", "Acompanhamento especializado"
            ])
        }
    }

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={(e) => {
            e.preventDefault();
            // Salvar o ID do subtipo, não do tipo
            const cleanedData = { ...form4, necessitySubtype: String(subTipoId) || '0'}
            formFunc(cleanedData)
        }}>
            <h2 className="font-semibold text-[1.3rem]">Informações sobre acessibilidade</h2>
            <div className="flex flex-row gap-24">
                <GenericFormField id="candidate_type_register" type="select" options={tipos.map(tipo => tipo.nome) || []} placeholder="Selecione" required onChange={(e) => handleTypeChange(e)} value={form4.necessityType || ""}>Tipo de Necessidade</GenericFormField>
                <GenericFormField id="candidate_sub_type_register" type="select" options={subTipos.map(subTipo => subTipo.nome) || []} placeholder="Selecione" required onChange={(e) => handleSubTypeChange(e)} value={form4.necessitySubtype || ""}>Subtipo de Necessidade</GenericFormField>
            </div>
            <GenericFormField 
                id="candidate_medical_report_register" 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png"
                required 
                onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) {
                        setForm4((prev) => ({ ...prev, medicalReport: file }))
                        handleFileUpload(file, 'laudo')
                    }
                }}
                value={form4.medicalReport?.name || ""}
            >
                Laudo Médico
            </GenericFormField>
            <TagContainer 
                edit={false} 
                tags={barreiras}
            >
                Limitações Identificadas
            </TagContainer>
        </form>
    )
}