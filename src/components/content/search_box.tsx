

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
        <form className="flex h-12 md:h-14" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="search" 
                id="search" 
                placeholder="Pesquisar vagas..." 
                className="border border-black rounded-l-lg w-full pl-4 md:pl-5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue3 focus:border-blue3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
                type="submit"
                className="flex bg-blue4 hover:bg-blue5H border border-black rounded-r-lg p-2 md:p-3 items-center justify-center w-12 md:w-16 transition-colors"
            >
                <Search size={18} className="md:w-5 md:h-5"/>
            </button>
        </form>
    )
}