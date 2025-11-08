// [TODO] - Organizar o a requisição do banco para pegar as vagas que mais condizem, então colocar os numeros na nav com base no numero de vagas
// [TODO] - Colocar as estatisticas no depois da barra de pesquisar de forma horizontal

import JobPosition from "../components/content/job_position";
import SearchBox from "../components/content/search_box";
import LoadingSpinner from "../components/content/loading_spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import JobFilters from "../components/forms/filters/job_filters";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { JobData, Vaga } from "../types/vagas/vaga";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../hooks/useAuth";

interface VagasSearchFilters {
    titulo?: string;
    localizacao?: string;
    tipoContrato?: string | string[];
    tipoTrabalho?: string | string[];
    nivelTrabalho?: string;
    turno?: string;
    empresaId?: string;
    candidatoId?: number;
    habilidadesList?: string[];
    apoiosList?: string[];
    salarioMin?: number;
    salarioMax?: number;
    dataInicioMin?: string; // formato: "2024-01-15"
    dataInicioMax?: string; // formato: "2024-12-31"
    setor?: string;
    status?: boolean;
    recomendadas?: boolean;
    minhasVagas?: boolean;
    inscrito?: boolean;
    page?: number;
}

export default function Jobs() {
    const { user, role } = useAuth()
    const location = useLocation()
    const [filtros, setFiltros] = useState<VagasSearchFilters>(() => {
        const urlParams = new URLSearchParams(location.search)
        const minhasVagas = urlParams.get('minhasVagas')
        return minhasVagas === 'true' ? { minhasVagas: true } : {}
    })
    const [vagas, setVagas] = useState<Vaga[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState({ totalPages: 1, totalItems: 0, itemsPerPage: 8 })
    const hasInitialized = useRef(false)
    
    useEffect(() => {
        if (hasInitialized.current) return
        
        const urlParams = new URLSearchParams(location.search)
        const minhasVagas = urlParams.get('minhasVagas')
        
        if (minhasVagas === 'true') {
            setFiltros(prev => ({ ...prev, minhasVagas: true }))
        }
        
        hasInitialized.current = true
    }, [location.search])



    useEffect(() => {
        const fetchVagas = async () => {
            if (!user?.id) return // Aguarda user carregar
            
            setIsLoading(true)
            try {
                let filtrosProcessados = { ...filtros }

                if (user?.id && role?.toLowerCase() === 'candidato') {
                    filtrosProcessados = { ...filtrosProcessados, candidatoId: user.id }
                }

                if (filtros.minhasVagas && user) {
                    if (role?.toLowerCase() === 'empresa') {
                        filtrosProcessados = { ...filtrosProcessados, empresaId: user.id.toString() }
                    } else if (role?.toLowerCase() === 'candidato') {
                        filtrosProcessados = { ...filtrosProcessados, inscrito: true }
                    }
                }

                delete filtrosProcessados.minhasVagas

                filtrosProcessados = { ...filtrosProcessados, page: currentPage }
                

                const res = await fetch(`${API_BASE_URL}/api/vagas/search`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(filtrosProcessados)
                })

                const data = await res.json()

                setVagas(data.vagas || data)
                if (data.pagination) {
                    setPagination(data.pagination)
                }
            } catch (err) {

            } finally {
                setIsLoading(false)
            }
        }

        fetchVagas()
    }, [filtros, user?.id, role, currentPage, user])

    return (
        <div className="flex flex-1">
            <div className="min-w-36 sm:min-w-40 md:min-w-44">
                <div className="bg-blue1 w-full py-6 flex flex-col items-center px-3">
                    <p className="text-black px-4 text-center mb-4 font-bold text-lg">Filtros</p>
                    <div className="flex flex-col gap-4 w-full">
                        <JobFilters 
                            initialValues={filtros}
                            onFiltersChange={(newFilters) => {
                                setFiltros(prev => ({ ...prev, ...newFilters }))
                                setCurrentPage(1)
                            }} 
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center my-7 px-36">
                <div className="space-y-8 w-full">
                    <SearchBox onFiltersChange={(newFilters) => {
                        setFiltros(prev => ({ ...prev, ...newFilters }))
                        setCurrentPage(1)
                    }} />
                    <div>
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <div className="space-y-8">
                                {vagas.length > 0 ? (
                                    vagas.map(vaga => {
                                        const jobDataProps: JobData = {
                                            id: vaga.id,
                                            idEmpresa: vaga.empresaId,
                                            title: vaga.titulo,
                                            company: vaga.empresa.razaoSocial,
                                            companyLogo: vaga.empresa.foto || "",
                                            location: vaga.localizacao,
                                            description: vaga.descricao,
                                            skillsTags: vaga.habilidades,
                                            supportTags: vaga.apoios,
                                            compatibility: Math.round((vaga.compatibilidadeCalculada || 0) * 100),
                                            startDate: new Date(vaga.dataInicio),
                                            endDate: new Date(vaga.dataFim),
                                            typeContract: vaga.tipoContrato,
                                            typeWork: vaga.tipoTrabalho,
                                            payment: vaga.pagamento,
                                            workLevel: vaga.nivelTrabalho,
                                            timeShift: vaga.turno,
                                            sector: vaga.setor,
                                            status: vaga.status
                                        }
                                        return <JobPosition key={vaga.id} jobData={jobDataProps} />
                                    })
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 px-8">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <h3 className="text-2xl font-semibold text-blue3 mb-2">Nenhuma vaga encontrada</h3>
                                        <p className="text-gray-600 text-center max-w-md">
                                            Não encontramos vagas que correspondam aos seus filtros. Tente ajustar os critérios de busca ou remover alguns filtros.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 my-8">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded hover:bg-blue1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                
                                <div className="flex gap-1">
                                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (pagination.totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= pagination.totalPages - 2) {
                                            pageNum = pagination.totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`px-3 py-1 rounded ${
                                                    currentPage === pageNum
                                                        ? 'bg-blue3 text-white'
                                                        : 'hover:bg-blue1'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    
                                    {pagination.totalPages > 5 && currentPage < pagination.totalPages - 2 && (
                                        <>
                                            <span className="px-2">...</span>
                                            <button
                                                onClick={() => setCurrentPage(pagination.totalPages)}
                                                className="px-3 py-1 rounded hover:bg-blue1"
                                            >
                                                {pagination.totalPages}
                                            </button>
                                        </>
                                    )}
                                </div>
                                
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                                    disabled={currentPage === pagination.totalPages}
                                    className="p-2 rounded hover:bg-blue1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}