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
    recomendadas?: boolean;
    minhasVagas?: boolean;
    inscrito?: boolean;
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

                const res = await fetch(`${API_BASE_URL}/api/vagas/search`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(filtrosProcessados)
                })

                const data = await res.json()
                setVagas(data)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchVagas()
    }, [filtros, role, user, user?.id])

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
                            }} 
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center my-7 px-36">
                <div className="space-y-8 w-full">
                    <SearchBox onFiltersChange={(newFilters) => {
                        setFiltros(prev => ({ ...prev, ...newFilters }))
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
                        <div className="flex font-semibold my-4">
                            <ChevronLeft />
                            <nav className="flex space-x-3">
                                <a href="/1">1</a>
                                <a href="/1">2</a>
                                <a href="/1">3</a>
                                <a href="/1">4</a>
                                <a href="/1">5</a>
                                <a href="/i">...</a>
                            </nav>
                            <ChevronRight />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}