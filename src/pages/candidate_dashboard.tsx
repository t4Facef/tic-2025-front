// [TODO] - Fazer com que quando direicionar pelo botão para a listagem de vagas colocar os filtros apropriados (descobrir como fazer algo assim)
// [TODO] - Ajeitar tamanho das vagas + caixa de estatistica

import { useState, useEffect } from "react";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import { useAuth } from "../hooks/useAuth";
import JobPosition from "../components/content/job_position";
import NotFoundScreen from "../components/content/not_found_screen";
import { API_BASE_URL } from "../config/api";
import { JobData, Vaga } from "../types/vagas/vaga";

interface Statistics {
    candidaturasNesteMes: number
    candidaturasTotal: number
    candidaturasAbertas: number
}



export default function CandidateDashboard() {
    const { user, isAuthenticated, token, role } = useAuth()
    const [statistics, setStatistics] = useState<Statistics | null>(null)
    const [recommendedJobs, setRecommendedJobs] = useState<Vaga[]>([])
    const [appliedJobs, setAppliedJobs] = useState<Vaga[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Buscar estatísticas do candidato
                const statsResponse = await fetch(`${API_BASE_URL}/api/estatisticas/candidato/${user?.id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })



                if (!statsResponse.ok) {
                    const errorText = await statsResponse.text()

                    throw new Error(`Erro ${statsResponse.status}: ${errorText}`)
                }

                const statsData = await statsResponse.json()
                setStatistics(statsData)

                // Buscar vagas recomendadas
                const jobsResponse = await fetch(`${API_BASE_URL}/api/vagas/recomendadas?candidatoId=${user?.id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })



                if (!jobsResponse.ok) {
                    const errorText = await jobsResponse.text()

                    throw new Error(`Erro ${jobsResponse.status}: ${errorText}`)
                }

                const jobsData = await jobsResponse.json()

                setRecommendedJobs(jobsData)

                // Buscar vagas que o candidato se inscreveu
                const appliedJobsResponse = await fetch(`${API_BASE_URL}/api/vagas/candidato/${user?.id}/inscritas`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })



                if (appliedJobsResponse.ok) {
                    const appliedJobsData = await appliedJobsResponse.json()

                    setAppliedJobs(appliedJobsData)
                } else {
                    console.warn('Erro ao buscar vagas aplicadas');
                }

            } catch (error) {
                console.error('Erro ao buscar dados do dashboard:', error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        if (user?.id && token) {
            fetchDashboardData()
        } else {
            setLoading(false)
        }
    }, [user?.id, token])

    if (loading) {
        return <div className="flex justify-center items-center h-64">Carregando...</div>
    }

    if (!isAuthenticated) {
        return (
            <NotFoundScreen
                title="Acesso negado"
                message="Você precisa estar logado para acessar esta página."
                icon="🔒"
            />
        )
    }

    if (role === 'ADMIN') {
        return (
            <NotFoundScreen
                title="Acesso negado"
                message="Administradores não podem acessar o dashboard de candidato."
                icon="🔒"
            />
        )
    }

    if (error || !statistics) {
        return (
            <NotFoundScreen
                title="Candidato não encontrado"
                message="O painel que você está procurando não existe ou foi removido."
                icon="👤"
            />
        )
    }

    if (statistics) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="mb-4">
                            <h1 className="text-4xl font-bold text-slate-900">Olá, {user?.nome}!</h1>
                            <p className="text-slate-600 text-lg">Bem-vindo ao seu painel de controle</p>
                        </div>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white rounded-3xl p-6 border-l-4 border-blue3 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Total Geral</p>
                                    <p className="text-3xl font-bold text-gray-900">{statistics.candidaturasTotal}</p>
                                    <p className="text-blue3 text-sm">Candidaturas</p>
                                </div>
                                <div className="w-12 h-12 bg-blue1 rounded-2xl flex items-center justify-center">
                                    <span className="text-2xl">📊</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-3xl p-6 border-l-4 border-blue2 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Este Mês</p>
                                    <p className="text-3xl font-bold text-gray-900">{statistics.candidaturasNesteMes}</p>
                                    <p className="text-blue2 text-sm">Candidaturas</p>
                                </div>
                                <div className="w-12 h-12 bg-blue1 rounded-2xl flex items-center justify-center">
                                    <span className="text-2xl">📅</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-3xl p-6 border-l-4 border-blue1 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Em Andamento</p>
                                    <p className="text-3xl font-bold text-gray-900">{statistics.candidaturasAbertas}</p>
                                    <p className="text-blue1 text-sm">Processos</p>
                                </div>
                                <div className="w-12 h-12 bg-blue1 rounded-2xl flex items-center justify-center">
                                    <span className="text-2xl">⏳</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-3xl p-8 mb-12 border border-slate-200">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Encontre Novas Oportunidades</h3>
                                <p className="text-slate-600">Explore vagas que combinam com seu perfil</p>
                            </div>
                            <GenericBlueButton color={3} link="/jobs" size="lg">Procurar Vagas</GenericBlueButton>
                        </div>
                    </div>
                    {/* Applied Jobs Section */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue1 rounded-2xl flex items-center justify-center">
                                <span className="text-xl">💼</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900">Suas Candidaturas</h2>
                        </div>
                        {(appliedJobs && appliedJobs.length > 0) ? (
                            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                                    <p className="text-slate-600 font-medium">Últimas candidaturas</p>
                                </div>
                                <div className="p-6 space-y-6">
                                    {appliedJobs.slice(0, 3).map(vaga => {
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
                                            status: vaga.status,
                                            sector: vaga.setor
                                        }
                                        return <JobPosition key={vaga.id} jobData={jobDataProps} />
                                    })}
                                </div>
                                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                                    <GenericBlueButton color={3} link="/jobs?minhasVagas=true" size="mdy">Ver todas as candidaturas</GenericBlueButton>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-16">
                                <div className="text-center space-y-6">
                                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                                        <span className="text-4xl">📝</span>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-slate-900">Primeira candidatura?</h3>
                                        <p className="text-slate-600 max-w-md mx-auto">
                                            Comece sua jornada profissional explorando nossas oportunidades exclusivas!
                                        </p>
                                        <div className="flex justify-center pt-4">
                                            <GenericBlueButton color={3} link="/jobs" size="lg">Explorar Vagas</GenericBlueButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                    {/* Recommended Jobs Section */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue1 rounded-2xl flex items-center justify-center">
                                <span className="text-xl">✨</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900">Recomendadas para Você</h2>
                        </div>
                        {(recommendedJobs && recommendedJobs.length > 0) ? (
                            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                                <div className="bg-blue1 px-6 py-4 border-b border-slate-200">
                                    <p className="text-blue3 font-medium">Vagas selecionadas especialmente para você</p>
                                </div>
                                <div className="p-6 space-y-6">
                                    {recommendedJobs.slice(0, 3).map(vaga => {
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
                                            status: vaga.status,
                                            sector: vaga.setor
                                        }
                                        return <JobPosition key={vaga.id} jobData={jobDataProps} />
                                    })}
                                </div>
                                <div className="bg-blue1 px-6 py-4 border-t border-slate-200">
                                    <GenericBlueButton color={3} link="/jobs" size="mdy">Ver mais vagas</GenericBlueButton>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-16">
                                <div className="text-center space-y-6">
                                    <div className="w-24 h-24 bg-blue1 rounded-full flex items-center justify-center mx-auto">
                                        <span className="text-4xl">🔍</span>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-slate-900">Analisando seu perfil...</h3>
                                        <p className="text-slate-600 max-w-md mx-auto">
                                            Nossa IA está encontrando as melhores oportunidades para você. Enquanto isso, explore todas as vagas!
                                        </p>
                                        <div className="flex justify-center pt-4">
                                            <GenericBlueButton color={3} link="/jobs" size="lg">Explorar Todas as Vagas</GenericBlueButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <NotFoundScreen
            title="Candidato não encontrado"
            message="O painel que você está procurando não existe ou foi removido."
            icon="👤"
        />
    )
}