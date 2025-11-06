// Mostrar em cada vaga quantas candidaturas teve hoje

import GenericBlueButton from "../components/buttons/generic_blue_button";
import { useAuth } from "../hooks/useAuth";
import NotFoundScreen from "../components/content/not_found_screen";
import JobPosition from "../components/content/job_position";
import StatisticBox from "../components/content/statistic_box";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import { JobData, Vaga } from "../types/vagas/vaga";

interface meta {
    faltam: number
}

interface CompanyStatistics {
    candidaturasHoje: number,
    vagasAbertas: number,
    metaContratacao: meta
}

export default function CompanyDashboard() {
    const { user, isAuthenticated, role } = useAuth()
    const [companyStatistics, setCompanyStatistics] = useState<CompanyStatistics>({} as CompanyStatistics)
    const [openJobs, setOpenJobs] = useState<Vaga[]>([])
    const [closedJobs, setClosedJobs] = useState<Vaga[]>([])
    const [loading, setLoading] = useState(false)
    const companyId = user?.id

    useEffect(() => {
        if (!companyId) return
        
        const getStatistics = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${API_BASE_URL}/api/estatisticas/empresa/${companyId}`)
                const data = await res.json()
                setCompanyStatistics(data)
                console.log(data)

            } catch (err) {
                console.log("Error fetching statistics: " + err)
            } finally {
                setLoading(false)
            }
        }

        getStatistics()
    }, [companyId])

    useEffect(() => {
        if (!companyId) return
        
        const getOpenJobs = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/vagas/empresa/${companyId}?status=DISPONIVEL`)
                const data = await res.json()
                setOpenJobs(data)
            } catch (err) {
                console.log("Erro para carregas vagas abertas: " + err)
            }
        }

        const getClosedJobs = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/vagas/empresa/${companyId}?status=ENCERRADA`)
                const data = await res.json()
                setClosedJobs(data)
            } catch (err) {
                console.log("Erro para carregas vagas fechadas: " + err)
            }
        }

        getOpenJobs()
        getClosedJobs()
    }, [companyId])

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
                message="Administradores não podem acessar o dashboard de empresa."
                icon="🔒"
            />
        )
    }

    if (loading) {
        return <div className="flex justify-center items-center h-64">Carregando...</div>
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-12">
                    <div className="mb-4">
                        <h1 className="text-4xl font-bold text-slate-900">Dashboard Empresarial</h1>
                        <p className="text-slate-600 text-lg">Gerencie vagas e acompanhe candidaturas</p>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-3xl p-6 border-l-4 border-blue3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Geral</p>
                                <p className="text-3xl font-bold text-gray-900">{companyStatistics?.vagasAbertas || 0}</p>
                                <p className="text-blue3 text-sm">Vagas</p>
                            </div>
                            <div className="w-12 h-12 bg-blue1 rounded-2xl flex items-center justify-center">
                                <span className="text-2xl">💼</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-3xl p-6 border-l-4 border-blue2 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Em Andamento</p>
                                <p className="text-3xl font-bold text-gray-900">{companyStatistics?.candidaturasHoje || 0}</p>
                                <p className="text-blue2 text-sm">Candidaturas</p>
                            </div>
                            <div className="w-12 h-12 bg-blue1 rounded-2xl flex items-center justify-center">
                                <span className="text-2xl">📝</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-3xl p-6 border-l-4 border-blue1 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Meta</p>
                                <p className="text-3xl font-bold text-gray-900">{companyStatistics?.metaContratacao?.faltam || 0}</p>
                                <p className="text-blue1 text-sm">Faltam</p>
                            </div>
                            <div className="w-12 h-12 bg-blue1 rounded-2xl flex items-center justify-center">
                                <span className="text-2xl">🎯</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-3xl p-8 mb-12 border border-slate-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Publique uma Nova Vaga</h3>
                            <p className="text-slate-600">Encontre os melhores talentos para sua empresa</p>
                        </div>
                        <GenericBlueButton color={3} link="/jobs/new" size="lg">Criar Nova Vaga</GenericBlueButton>
                    </div>
                </div>
                {/* Open Jobs Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue1 rounded-2xl flex items-center justify-center">
                            <span className="text-xl">💼</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Vagas Ativas</h2>
                    </div>
                    {openJobs.length > 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="space-y-6">
                                {openJobs.slice(0, 3).map(vaga => {
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
                                })}
                                <div className="flex justify-center pt-4">
                                    <GenericBlueButton color={3} link="/jobs?minhasVagas=true" size="mdy">Ver todas as vagas</GenericBlueButton>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg p-12">
                            <div className="text-center space-y-4">
                                <div className="text-6xl mb-4">💼</div>
                                <h3 className="text-xl font-semibold text-gray-700">Nenhuma vaga aberta</h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    Crie sua primeira vaga para começar a atrair talentos incríveis!
                                </p>
                                <div className="flex justify-center pt-4">
                                    <GenericBlueButton color={3} link="/jobs/new" size="mdy">Criar Primeira Vaga</GenericBlueButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Closed Jobs Section */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue1 rounded-2xl flex items-center justify-center">
                            <span className="text-xl">📋</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Vagas Encerradas</h2>
                    </div>
                    {closedJobs.length > 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="space-y-6">
                                {closedJobs.slice(0, 3).map(vaga => {
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
                                })}
                                <div className="flex justify-center pt-4">
                                    <GenericBlueButton color={3} link="/jobs?minhasVagas=true" size="mdy">Ver todas as vagas</GenericBlueButton>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg p-12">
                            <div className="text-center space-y-4">
                                <div className="text-6xl mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-gray-700">Nenhuma vaga encerrada</h3>
                                <p className="text-gray-600">Suas vagas finalizadas aparecerão aqui para consulta</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}
