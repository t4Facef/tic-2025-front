// [TODO] - Conciliar informações de filtros e cadastro
// [TODO] - Organizar as options dos selects


import { useState } from "react";
import GenericFormField from "../generic_form_field";
import FilterCamp from "./filter_camp";

interface VagasSearchFilters {
    titulo?: string;
    localizacao?: string;
    tipoContrato?: string | string[];
    tipoTrabalho?: string | string[];
    nivelTrabalho?: string;
    turno?: string; // não usado
    empresaId?: string; // não usado
    habilidadesList?: string[]; // não usado
    apoiosList?: string[]; // não usado
    salarioMin?: number; // não usado
    salarioMax?: number; // não usado
    dataInicioMin?: string; // não usado
    dataInicioMax?: string; // não usado
}

interface jobFiltersProps {
    onFiltersChange: (filtros: Partial<VagasSearchFilters>) => void
}

export default function JobFilters({ onFiltersChange }: jobFiltersProps) {
    const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([])
    const [selectedContractTypes, setSelectedContractTypes] = useState<string[]>([])
    
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
                    options={["Presencial", "Hibrido", "Remoto"]}
                    onChange={(e) => handleCheckboxChange(e.target.value, selectedWorkTypes, setSelectedWorkTypes, 'tipoTrabalho')}
                >
                    Tipo de Trabalho
                </GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField 
                    type="checkbox" 
                    id="contract_type_filter" 
                    options={["CLT", "PJ", "Estágio", "Freelancer", "Temporário"]} 
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
                    options={["São Paulo", "Rio de Janeiro", "Belo Horizonte"]} 
                    itemsOrientation={2} 
                    placeholder="Selecione"
                    onChange={(e) => onFiltersChange({ localizacao: e.target.value })}
                >
                    Localização
                </GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField 
                    type="select" 
                    id="work_level_filter" 
                    options={["Estágio", "Júnior", "Pleno", "Sênior"]} 
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
                    options={["Tecnologia", "Saúde", "Educação"]} 
                    itemsOrientation={2} 
                    placeholder="Selecione"
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
                >
                    Somente Recomendadas Para Mim?
                </GenericFormField>
            </FilterCamp>
        </div>
    )
}