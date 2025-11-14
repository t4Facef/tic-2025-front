import { useEffect, useState } from "react";
import { CandidateForm4Data } from "../../../types/forms/candidate";
import TagContainer from "../../content/tag_container";
import GenericFormField from "../generic_form_field";
import { API_BASE_URL } from "../../../config/api";
import { useFormValidation } from '../../../hooks/useFormValidation';
import SubtypeSelectionModal from "../../modals/SubtypeSelectionModal";
import { ChevronDown } from 'lucide-react';

interface Subtipo {
    id: number;
    nome: string;
}

export default function CandidateForm4({ formFunc, formId, initialData, fileStorage }: { formFunc: (data: CandidateForm4Data) => void, formId: string, initialData?: CandidateForm4Data, fileStorage: { saveFile: (key: string, file: File) => void, hasFile: (key: string) => boolean, getFile: (key: string) => File | undefined } }) {
    const [form4, setForm4] = useState<CandidateForm4Data>(initialData || { 
        necessityType: '',
        necessitySubtype: '',
        selectedSubtypes: [],
        medicalReport: null,
        supportNeeds: [],
        selectedBarreirasIds: []
    })
    const [tipos, setTipos] = useState<{ nome: string, id: number }[]>([])
    const [barreirasMapeamento, setBarreirasMapeamento] = useState<{ [descricao: string]: number }>({})
    const [allBarreirasOptions, setAllBarreirasOptions] = useState<string[]>([])
    const [tipoId, setTipoId] = useState<number>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const { errors, validateForm } = useFormValidation({
        necessityType: { required: true, message: 'Tipo de necessidade é obrigatório' },
        selectedSubtypes: { required: true, message: 'Pelo menos um subtipo deve ser selecionado' },
        medicalReport: { 
            required: true, 
            message: 'Laudo médico é obrigatório'
        }
    })

    const handleFileUpload = (file: File, tipo: string) => {
        fileStorage.saveFile(tipo, file)
    }

    const handleBarreirasChange = (newBarreiras: string[]) => {
        // Remover duplicatas e atualizar supportNeeds
        const uniqueBarreiras = Array.from(new Set(newBarreiras));
        const barreiraIds = uniqueBarreiras.map(desc => barreirasMapeamento[desc] || 0).filter(id => id > 0)
        
        setForm4(prev => ({
            ...prev,
            supportNeeds: uniqueBarreiras,
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

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setForm4((prev) => ({ 
            ...prev, 
            necessityType: e.target.value,
            selectedSubtypes: [],
            necessitySubtype: '',
            supportNeeds: [] 
        }))
        setTipoId(tipos.find(tipo => tipo.nome === e.target.value)?.id || 0)
    }

    const handleSubtypesConfirm = async (selectedSubtypes: Subtipo[]) => {
        setForm4(prev => ({
            ...prev,
            selectedSubtypes,
            necessitySubtype: selectedSubtypes.map(st => st.nome).join(', ')
        }))

        // Buscar barreiras dos subtipos selecionados
        if (selectedSubtypes.length > 0) {
            await fetchBarreirasFromSubtipos(selectedSubtypes.map(st => st.id))
        }
    }
    
    const fetchBarreirasFromSubtipos = async (subtipoIds: number[]) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/barreiras/multiplos-subtipos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subtipoIds })
            })
            
            if (!response.ok) {
                throw new Error('Erro ao buscar barreiras')
            }
            
            const data = await response.json()
            
            // Extrair descrições das barreiras (removendo duplicatas)
            const barreiraDescricoes = Array.from(new Set(data.map((barreira: { descricao: string }) => barreira.descricao))) as string[]
            
            // Definir automaticamente as barreiras padrão no formulário
            setForm4(prev => ({ 
                ...prev, 
                supportNeeds: barreiraDescricoes,
                selectedBarreirasIds: Array.from(new Set(data.map((b: { id: number }) => b.id))) as number[]
            }))
            
        } catch (error) {
            console.error('Erro ao buscar barreiras:', error)
            // Fallback para manter as barreiras existentes
        }
    }

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={(e) => {
            e.preventDefault();
            
            // Validar campos obrigatórios primeiro
            const formDataForValidation = {
                necessityType: form4.necessityType || '',
                selectedSubtypes: form4.selectedSubtypes.length > 0 ? 'valid' : '',
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
            
            // Preparar dados para envio
            const cleanedData = { 
                ...form4, 
                necessitySubtype: form4.selectedSubtypes.map(st => st.id).join(',') // IDs separados por vírgula
            }
            formFunc(cleanedData)
        }}>
            <h2 className="font-semibold text-[1.3rem]">Informações sobre acessibilidade</h2>
            
            <div className="space-y-6">
                <GenericFormField 
                    id="candidate_type_register" 
                    type="select" 
                    options={tipos.map(tipo => tipo.nome) || []} 
                    placeholder="Selecione" 
                    required 
                    onChange={(e) => handleTypeChange(e)} 
                    value={form4.necessityType || ""} 
                    error={errors.necessityType}
                >
                    Tipo de Necessidade
                </GenericFormField>
                
                <div className="space-y-2">
                    <label className="font-medium text-gray-700">Subtipos de Necessidade</label>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        disabled={!tipoId}
                        className="w-full p-3 border border-gray-300 rounded-lg text-left hover:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed flex justify-between items-center bg-white"
                    >
                        <span className={form4.selectedSubtypes.length === 0 ? "text-gray-500" : "text-gray-900"}>
                            {form4.selectedSubtypes.length === 0 
                                ? "Clique para selecionar subtipos..." 
                                : `${form4.selectedSubtypes.length} subtipo(s) selecionado(s)`
                            }
                        </span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </button>
                    {form4.selectedSubtypes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {form4.selectedSubtypes.map((subtipo, index) => (
                                <span key={index} className="bg-blue3 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {subtipo.nome}
                                </span>
                            ))}
                        </div>
                    )}
                    {errors.selectedSubtypes && <p className="text-red-500 text-sm">{errors.selectedSubtypes}</p>}
                </div>
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

            <SubtypeSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tipoId={tipoId || 0}
                selectedSubtypes={form4.selectedSubtypes}
                onConfirm={handleSubtypesConfirm}
            />
        </form>
    )
}