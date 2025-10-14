// [TODO] - Ajustar a caixa de pesquisa para quando for selecionada a borda não engrossar é arredondar lados errados
// [TODO] - Juntar os dashboards de empresas e candidatos

import { Search } from "lucide-react"
import { useState } from "react"

interface VagasSearchFilters {
    titulo?: string;
    localizacao?: string;
    tipoContrato?: string | string[];
    tipoTrabalho?: string | string[];
    nivelTrabalho?: string;
    turno?: string;
    empresaId?: string;
    habilidadesList?: string[];
    apoiosList?: string[];
    salarioMin?: number;
    salarioMax?: number;
    dataInicioMin?: string;
    dataInicioMax?: string;
}

interface SearchBoxProps {
    onFiltersChange: (filtros: Partial<VagasSearchFilters>) => void
}

export default function SearchBox({ onFiltersChange }: SearchBoxProps){
    const [searchTerm, setSearchTerm] = useState('')
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onFiltersChange({ titulo: searchTerm || undefined })
    }
    
    return(
        <form className="flex h-[3.5rem]" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="search" 
                id="search" 
                placeholder="Pesquisar" 
                className="border border-black rounded-l-lg w-full pl-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
                type="submit"
                className="flex bg-blue4 border border-black rounded-r-lg p-2 items-center justify-center w-[8vh]"
            >
                <Search/>
            </button>
        </form>
    )
}