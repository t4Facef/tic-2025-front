import GenericBlueButton from "../components/buttons/generic_blue_button";
import { useAuth } from "../hooks/useAuth";
import NotFoundScreen from "../components/content/not_found_screen";
import JobPosition from "../components/content/job_position";
import StatisticBox from "../components/content/statistic_box";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import { JobData, Vaga } from "../types/vagas/vaga";

interface CompanyStatistics {
    candidaturasHoje: number,
    vagasAbertas: number,
    metaContratacao: number
}

export default function CompanyDashboard() {
    const { user, isAuthenticated } = useAuth()
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

    if (loading) {
        return <div className="flex justify-center items-center h-64">Carregando...</div>
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col">
                <div className="flex flex-col w-[72rem] ">
                    <div className="bg-blue2 p-2 mt-5 rounded-lg">
                        <div className="flex justify-between">
                            <StatisticBox title="Candidaturas Hoje" animation={true} finalValue={companyStatistics?.candidaturasHoje || 0}>{companyStatistics?.candidaturasHoje || 0}</StatisticBox>
                            <StatisticBox title="Vagas Abertas" animation={true} finalValue={companyStatistics?.vagasAbertas || 0}>{companyStatistics?.vagasAbertas || 0}</StatisticBox>
                            <StatisticBox title="Meta de Contratação" animation={true} finalValue={companyStatistics?.metaContratacao || 0}>{companyStatistics?.metaContratacao || 0}</StatisticBox>
                        </div>
                        <div className="flex justify-end mt-2 pr-2">
                            <GenericBlueButton color={3} link="/jobs/new">Criar nova vaga</GenericBlueButton>
                        </div>
                    </div>
                    {openJobs.length > 0 ?
                        <div>
                            <h2 className="pt-12 text-2xl font-semibold text-blue3 mb-4">Vagas Recentes</h2>
                            <div className="flex flex-col justify-center items-center bg-blue1 mb-6">
                                <div className="flex flex-col items-end p-6 space-y-6 w-full">
                                    {openJobs.map(vaga => {
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
                                            sector: vaga.setor
                                        }
                                        return <JobPosition key={vaga.id} jobData={jobDataProps} />
                                    })}
                                    <GenericBlueButton color={3} link="/jobs">Ver todas</GenericBlueButton>
                                </div>
                            </div>
                        </div> :
                        <div>
                            <h2 className="pt-12 text-2xl font-semibold text-blue3 mb-4">Vagas Recentes</h2>
                            <div className="flex flex-col justify-center items-center bg-blue1 mb-6 p-12 rounded-lg">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">💼</div>
                                    <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhuma vaga aberta no momento</h3>
                                    <p className="text-gray-600 mb-6">Crie sua primeira vaga para começar a atrair talentos incríveis!</p>
                                    <div className="flex justify-center">
                                        <GenericBlueButton color={3} link="/jobs/create">Criar Primeira Vaga</GenericBlueButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {closedJobs.length > 0 ?
                        <div>
                            <h2 className="pt-6 text-2xl font-semibold text-blue3 mb-4">Vagas Encerradas</h2>
                            <div className="flex flex-col justify-center items-center bg-blue1 mb-12">
                                <div className="flex flex-col items-end p-6 space-y-6">
                                    {closedJobs.map(vaga => {
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
                                            sector: vaga.setor
                                        }
                                        return <JobPosition key={vaga.id} jobData={jobDataProps} />
                                    })}
                                    <GenericBlueButton color={3} link="/jobs">Ver todas</GenericBlueButton>
                                </div>
                            </div>
                        </div> :
                        <div>
                            <h2 className="pt-6 text-2xl font-semibold text-blue3 mb-4">Vagas Encerradas</h2>
                            <div className="flex flex-col justify-center items-center bg-blue1 mb-12 p-12 rounded-lg">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">📋</div>
                                    <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhuma vaga encerrada</h3>
                                    <p className="text-gray-600">Suas vagas finalizadas aparecerão aqui para consulta</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}
