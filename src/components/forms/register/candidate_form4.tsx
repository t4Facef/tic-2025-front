// [TODO] - Linkar as APIs para o o conteúdo do Select, pegando dados especificos de subtipo de necessidade dependendo do tipo

import { useEffect, useState } from "react";
import { CandidateForm4Data } from "../../../types/forms/candidate";
import TagContainer from "../../content/tag_container";
import GenericFormField from "../generic_form_field";
import { API_BASE_URL } from "../../../config/api";
import { useFormValidation } from '../../../hooks/useFormValidation';


export default function CandidateForm4({ formFunc, formId, initialData, fileStorage }: { formFunc: (data: CandidateForm4Data) => void, formId: string, initialData?: CandidateForm4Data, fileStorage: { saveFile: (key: string, file: File) => void, hasFile: (key: string) => boolean, getFile: (key: string) => File | undefined } }) {
    const [form4, setForm4] = useState<CandidateForm4Data>(initialData || {} as CandidateForm4Data)
    const [tipos, setTipos] = useState<{ nome: string, id: number }[]>([])
    const [subTipos, setSubTipos] = useState<{ nome: string, id: number }[]>([])
    const [barreirasMapeamento, setBarreirasMapeamento] = useState<{ [descricao: string]: number }>({})
    const [allBarreirasOptions, setAllBarreirasOptions] = useState<string[]>([])
    const [tipoId, setTipoId] = useState<number>()
    const [subTipoId, setSubTipoId] = useState<number>()
    
    const { errors, validateForm } = useFormValidation({
        necessityType: { required: true, message: 'Tipo de necessidade é obrigatório' },
        necessitySubtype: { required: true, message: 'Subtipo de necessidade é obrigatório' },
        medicalReport: { 
            required: true, 
            message: 'Laudo médico é obrigatório'
        }
    })

    const handleFileUpload = (file: File, tipo: string) => {
        fileStorage.saveFile(tipo, file)
    }

    const handleBarreirasChange = (newBarreiras: string[]) => {
        // Atualizar supportNeeds e calcular IDs das barreiras
        const barreiraIds = newBarreiras.map(desc => barreirasMapeamento[desc] || 0).filter(id => id > 0)
        
        setForm4(prev => ({
            ...prev,
            supportNeeds: newBarreiras,
            selectedBarreirasIds: barreiraIds
        }))
    }

    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/tipos`)
                const data = await response.json()
                setTipos(data)
            }
            catch (e) {
                console.error('Erro ao buscar tipos:', e)
            }
        }

        fetchTipos()
    }, [])

    // Buscar todas as barreiras disponíveis para options
    useEffect(() => {
        const fetchAllBarreiras = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/barreiras`)
                const data = await response.json()
                
                // Criar mapeamento de descrição -> ID
                const mapeamento: { [descricao: string]: number } = {}
                const opcoes: string[] = []
                
                data.forEach((barreira: { id: number; descricao: string }) => {
                    mapeamento[barreira.descricao] = barreira.id
                    opcoes.push(barreira.descricao)
                })
                
                setBarreirasMapeamento(mapeamento)
                setAllBarreirasOptions(opcoes)
            } catch (error) {
                console.error('Erro ao buscar todas as barreiras:', error)
            }
        }

        fetchAllBarreiras()
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
                // Carregar barreiras quando subtipo for recuperado
                fetchBarreiras(foundSubTipo.id)
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
                console.error('Erro ao buscar subtipos:', e)
            }
        }

        fetchSubTipos()
    }, [tipoId])

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setForm4((prev) => ({ ...prev, necessityType: e.target.value }))
        setTipoId(tipos.find(tipo => tipo.nome === e.target.value)?.id || 0)
        // Limpar subtipo quando mudar o tipo
        setForm4((prev) => ({ ...prev, necessitySubtype: "", supportNeeds: [] }))
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
            
            // Extrair descrições das barreiras do subtipo (padrão)
            const barreiraDescricoes = data.map((barreira: { descricao: string }) => barreira.descricao)
            
            // Definir automaticamente as barreiras padrão no formulário
            setForm4(prev => ({ 
                ...prev, 
                supportNeeds: barreiraDescricoes,
                selectedBarreirasIds: data.map((b: { id: number }) => b.id)
            }))
            
        } catch (error) {
            console.error('Erro ao buscar barreiras:', error)
            // Fallback para opções padrão
            const fallbackBarreiras = [
                "Rampa de acesso", "Elevador", "Banheiro adaptado", "Intérprete de Libras", 
                "Software leitor de tela", "Mesa ajustável", "Cadeira ergonômica", 
                "Iluminação adequada", "Piso tátil", "Sinalização em Braille",
                "Apoio psicológico", "Flexibilidade de horário", "Transporte adaptado",
                "Tecnologia assistiva", "Acompanhamento especializado"
            ]
            
            setForm4(prev => ({ 
                ...prev, 
                supportNeeds: fallbackBarreiras 
            }))
        }
    }

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={(e) => {
            e.preventDefault();
            
            // Validar campos obrigatórios primeiro
            const formDataForValidation = {
                necessityType: form4.necessityType || '',
                necessitySubtype: form4.necessitySubtype || '',
                medicalReport: 'valid' // Sempre válido se chegou até aqui
            };
            
            if (!validateForm(formDataForValidation)) {
                return; // Para aqui se houver erros de validação
            }
            
            // Verificar se laudo foi enviado
            if (!fileStorage.hasFile('laudo')) {
                alert('Por favor, anexe o laudo médico.');
                return;
            }
            
            // Salvar o ID do subtipo, não do tipo
            const cleanedData = { ...form4, necessitySubtype: String(subTipoId) || '0'}
            formFunc(cleanedData)
        }}>
            <h2 className="font-semibold text-[1.3rem]">Informações sobre acessibilidade</h2>
            <div className="flex flex-row gap-24">
                <GenericFormField id="candidate_type_register" type="select" options={tipos.map(tipo => tipo.nome) || []} placeholder="Selecione" required onChange={(e) => handleTypeChange(e)} value={form4.necessityType || ""} error={errors.necessityType}>Tipo de Necessidade</GenericFormField>
                <GenericFormField id="candidate_sub_type_register" type="select" options={subTipos.map(subTipo => subTipo.nome) || []} placeholder="Selecione" required onChange={(e) => handleSubTypeChange(e)} value={form4.necessitySubtype || ""} error={errors.necessitySubtype}>Subtipo de Necessidade</GenericFormField>
            </div>
            <div>
                <GenericFormField 
                    id="candidate_medical_report_register" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    required={!fileStorage.hasFile('laudo')}
                    onChange={(e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) {
                            setForm4((prev) => ({ ...prev, medicalReport: file }))
                            handleFileUpload(file, 'laudo')
                        }
                    }}
                    error={!fileStorage.hasFile('laudo') ? errors.medicalReport : undefined}
                >
                    Laudo Médico {fileStorage.hasFile('laudo') ? '(Arquivo já enviado)' : ''}
                </GenericFormField>
                {fileStorage.hasFile('laudo') && (
                    <p className="text-green-600 text-sm mt-1">✅ Arquivo salvo: {fileStorage.getFile('laudo')?.name}</p>
                )}
            </div>
            <TagContainer 
                edit={true}
                tags={form4.supportNeeds || []}
                options={allBarreirasOptions}
                onChange={handleBarreirasChange}
            >
                Limitações Identificadas
            </TagContainer>
        </form>
    )
}