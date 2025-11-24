import JobPositionMobile from "../components/content/job_position_mobile";
import JobPositionDesktop from "../components/content/job_position_desktop";
import SearchBox from "../components/content/search_box";
import LoadingSpinner from "../components/content/loading_spinner";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
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
    const [showMobileFilters, setShowMobileFilters] = useState(false)
    const hasInitialized = useRef(false)
    
    useEffect(() => {
        if (hasInitialized.current) return
        
        const urlParams = new URLSearchParams(location.search)
        const minhasVagas = urlParams.get('minhasVagas')
        const empresaId = urlParams.get('empresa')
        
        if (minhasVagas === 'true') {
            setFiltros(prev => ({ ...prev, minhasVagas: true }))
        }
        
        if (empresaId) {
            setFiltros(prev => ({ ...prev, empresaId }))
        }
        
        hasInitialized.current = true
    }, [location.search])



    useEffect(() => {
        const fetchVagas = async () => {
            if (!user?.id) return // Aguarda user carregar
            
            setIsLoading(true)
            try {
                let filtrosProcessados = { ...filtros }
                
                // Remover propriedades undefined
                Object.keys(filtrosProcessados).forEach(key => {
                    if (filtrosProcessados[key as keyof VagasSearchFilters] === undefined) {
                        delete filtrosProcessados[key as keyof VagasSearchFilters]
                    }
                })

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
            } catch (error) {
                console.error('Erro ao buscar vagas:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchVagas()
    }, [filtros, user?.id, role, currentPage, user])

    // Fechar filtros mobile com ESC
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showMobileFilters) {
                setShowMobileFilters(false)
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [showMobileFilters])

    return (
        <div className="flex flex-1 relative">
            {/* Filtros Desktop - Sidebar fixa */}
            <div className="hidden md:block min-w-36 sm:min-w-40 md:min-w-44">
                <div className="bg-gradient-to-b from-blue1 to-blue-50 w-full py-8 flex flex-col items-center px-4 shadow-lg border-r border-blue2/20">
                    <div className="mb-6">
                        <h2 className="text-black text-center font-bold text-xl mb-1">Filtros</h2>
                        <div className="w-12 h-0.5 bg-blue3 mx-auto rounded-full"></div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <JobFilters 
                            initialValues={filtros}
                            onFiltersChange={(newFilters) => {
                                setFiltros(prev => ({ ...prev, ...newFilters }))
                                setCurrentPage(1)
                            }} 
                        />
                        <div className="mt-4 pt-4 border-t border-blue2/20">
                            <button
                                onClick={() => {
                                    setFiltros({})
                                    setCurrentPage(1)
                                }}
                                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay para mobile quando filtros estão abertos */}
            {showMobileFilters && (
                <div 
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowMobileFilters(false)}
                />
            )}

            {/* Modal de Filtros Mobile */}
            <div className={`md:hidden fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="bg-gradient-to-b from-blue1 to-blue-50 h-full flex flex-col">
                    {/* Header do modal */}
                    <div className="flex items-center justify-between p-4 border-b border-blue2/20">
                        <div className="flex items-center gap-3">
                            <Filter size={20} className="text-blue3" />
                            <h2 className="text-black font-bold text-lg">Filtros</h2>
                        </div>
                        <button
                            onClick={() => setShowMobileFilters(false)}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X size={20} className="text-blue3" />
                        </button>
                    </div>

                    {/* Conteúdo dos filtros */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="flex flex-col gap-4">
                            <JobFilters 
                                initialValues={filtros}
                                onFiltersChange={(newFilters) => {
                                    setFiltros(prev => ({ ...prev, ...newFilters }))
                                    setCurrentPage(1)
                                }} 
                            />
                        </div>
                    </div>

                    {/* Footer com botões */}
                    <div className="p-4 border-t border-blue2/20 space-y-3">
                        <button
                            onClick={() => {
                                setFiltros({})
                                setCurrentPage(1)
                            }}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm font-medium shadow-md"
                        >
                            Limpar Filtros
                        </button>
                        <button
                            onClick={() => setShowMobileFilters(false)}
                            className="w-full bg-blue3 text-white px-4 py-3 rounded-lg hover:bg-blue3H transition-colors text-sm font-medium shadow-md"
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col items-center my-7 px-4 md:px-36">
                {/* Botão de filtros mobile */}
                <div className="md:hidden w-full mb-4">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="flex items-center gap-2 bg-blue3 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue3H transition-colors w-full justify-center"
                    >
                        <Filter size={18} />
                        <span className="font-medium">Filtros</span>
                    </button>
                </div>

                <div className="space-y-8 w-full">
                    <div className="w-full">
                        <SearchBox onFiltersChange={(newFilters) => {
                            setFiltros(prev => ({ ...prev, ...newFilters }))
                            setCurrentPage(1)
                        }} />
                    </div>
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
                                        return (
                                            <div key={vaga.id} className="w-full">
                                                {/* Desktop */}
                                                <div className="hidden md:block">
                                                    <JobPositionDesktop jobData={jobDataProps} />
                                                </div>
                                                {/* Mobile */}
                                                <div className="md:hidden">
                                                    <JobPositionMobile jobData={jobDataProps} />
                                                </div>
                                            </div>
                                        )
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
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-8">
                                {/* Informação de página atual - só no mobile */}
                                <div className="sm:hidden text-sm text-gray-600">
                                    Página {currentPage} de {pagination.totalPages}
                                </div>
                                
                                {/* Botões de navegação */}
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded hover:bg-blue1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Página anterior"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    
                                    {/* Botões de página - escondidos no mobile muito pequeno */}
                                    <div className="hidden sm:flex gap-1">
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
                                                    className={`px-3 py-1 rounded text-sm transition-colors ${
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
                                                <span className="px-2 text-gray-400">...</span>
                                                <button
                                                    onClick={() => setCurrentPage(pagination.totalPages)}
                                                    className="px-3 py-1 rounded text-sm hover:bg-blue1 transition-colors"
                                                >
                                                    {pagination.totalPages}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                                        disabled={currentPage === pagination.totalPages}
                                        className="p-2 rounded hover:bg-blue1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Próxima página"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}