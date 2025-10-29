// [TODO] - Conciliar informações de filtros e cadastro
// [TODO] - Organizar as options dos selects


import { useState, useEffect } from "react";
import GenericFormField from "../generic_form_field";
import FilterCamp from "./filter_camp";
import { WORK_TYPES, CONTRACT_TYPES, WORK_LEVELS, SECTORS } from "../../../data/constants/select_options";

interface VagasSearchFilters {
    titulo?: string;
    localizacao?: string;
    tipoContrato?: string | string[];
    tipoTrabalho?: string | string[];
    nivelTrabalho?: string;
    setor?: string;
    recomendadas?: boolean;
    minhasVagas?: boolean;
    inscrito?: boolean;
    status?: boolean;
}

interface jobFiltersProps {
    onFiltersChange: (filtros: Partial<VagasSearchFilters>) => void
    initialValues?: Partial<VagasSearchFilters>
}

export default function JobFilters({ onFiltersChange, initialValues }: jobFiltersProps) {
    const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([])
    const [selectedContractTypes, setSelectedContractTypes] = useState<string[]>([])
    const [estados, setEstados] = useState<{ nome: string, sigla: string }[]>([])
    const [minhasVagasValue, setMinhasVagasValue] = useState<string>("")
    
    useEffect(() => {
        const newValue = initialValues?.minhasVagas === true ? "Sim" : ""
        setMinhasVagasValue(newValue)
    }, [initialValues])
    
    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
                const data = await response.json()
                const estadosData = data.map((estado: { nome: string, sigla: string }) => ({
                    nome: estado.nome,
                    sigla: estado.sigla
                })).sort((a: { nome: string }, b: { nome: string }) => a.nome.localeCompare(b.nome))
                setEstados(estadosData)
            } catch (error) {
                console.log('Erro ao buscar estados:', error)
            }
        }
        
        fetchEstados()
    }, [])
    
    const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const nomeEstado = e.target.value
        const estadoSelecionado = estados.find(estado => estado.nome === nomeEstado)
        const sigla = estadoSelecionado?.sigla
        onFiltersChange({ localizacao: sigla })
    }
    
    const handleCheckboxChange = (value: string, currentArray: string[], setter: (arr: string[]) => void, filterKey: keyof VagasSearchFilters) => {
        let newArray: string[]
        if (currentArray.includes(value)) {
            newArray = currentArray.filter(item => item !== value)
        } else {
            newArray = [...currentArray, value]
        }
        setter(newArray)
        onFiltersChange({ [filterKey]: newArray.length > 0 ? newArray : undefined })
    }
    
    return (
        <div className="flex flex-col gap-4 w-full text-sm items-center">
            <FilterCamp>
                <GenericFormField 
                    type="checkbox" 
                    id="work_type_filter" 
                    options={[...WORK_TYPES]}
                    onChange={(e) => handleCheckboxChange(e.target.value, selectedWorkTypes, setSelectedWorkTypes, 'tipoTrabalho')}
                >
                    Tipo de Trabalho
                </GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField 
                    type="checkbox" 
                    id="contract_type_filter" 
                    options={[...CONTRACT_TYPES]} 
                    itemsOrientation={2}
                    onChange={(e) => handleCheckboxChange(e.target.value, selectedContractTypes, setSelectedContractTypes, 'tipoContrato')}
                >
                    Tipo de Contrato
                </GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField 
                    type="select" 
                    id="location_filter" 
                    options={estados.map(estado => estado.nome)} 
                    itemsOrientation={2} 
                    placeholder="Selecione"
                    onChange={handleEstadoChange}
                >
                    Estado
                </GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField 
                    type="select" 
                    id="work_level_filter" 
                    options={[...WORK_LEVELS]} 
                    itemsOrientation={2} 
                    placeholder="Selecione"
                    onChange={(e) => onFiltersChange({ nivelTrabalho: e.target.value })}
                >
                    Nivel de Trabalho
                </GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField 
                    type="select" 
                    id="sector_filter" 
                    options={[...SECTORS]} 
                    itemsOrientation={2} 
                    placeholder="Selecione"
                    onChange={(e) => onFiltersChange({ setor: e.target.value })}
                >
                    Setor
                </GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField 
                    type="radio" 
                    id="recommended_filter" 
                    options={["Sim", "Não"]} 
                    itemsOrientation={2} 
                    placeholder="Selecione"
                    onChange={(e) => onFiltersChange({ recomendadas: e.target.value === "Sim" })}
                >
                    Somente Recomendadas Para Mim?
                </GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField 
                    type="radio" 
                    id="my_jobs_filter" 
                    options={["Sim", "Não"]} 
                    itemsOrientation={2}
                    value={minhasVagasValue}
                    onChange={(e) => {
                        setMinhasVagasValue(e.target.value)
                        onFiltersChange({ minhasVagas: e.target.value === "Sim" })
                    }}
                >
                    Somente Minhas Vagas?
                </GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField
                    type="radio"
                    id="open_filters"
                    options={["Sim", "Não"]}
                    itemsOrientation={2}
                    onChange={(e) => {
                        onFiltersChange({ status: e.target.value === "Sim" })
                    }}
                >
                    Somente Vagas Abertas?
                </GenericFormField>
            </FilterCamp>
        </div>
    )
}