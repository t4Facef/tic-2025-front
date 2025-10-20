// [TODO] - Fazer com que quando direicionar pelo botão para a listagem de vagas colocar os filtros apropriados (descobrir como fazer algo assim)
// [TODO] - Ajeitar tamanho das vagas + caixa de estatistica

import { useState, useEffect } from "react";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import { useAuth } from "../hooks/useAuth";
import JobPosition from "../components/content/job_position";
import StatisticBox from "../components/content/statistic_box";
import NotFoundScreen from "../components/content/not_found_screen";
import { JobData } from "../data/mockdata/jobs";
import { API_BASE_URL } from "../config/api";

interface Statistics {
    applicationsThisMonth: number
    totalApplications: number
    openApplications: number
}



export default function CandidateDashboard(){
    const { user, isAuthenticated, token } = useAuth()
    const [statistics, setStatistics] = useState<Statistics | null>(null)
    const [recommendedJobs, setRecommendedJobs] = useState<JobData[]>([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Buscar estatísticas do candidato
                const statsResponse = await fetch(`${API_BASE_URL}/api/estatisticas/candidato/${user?.id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
                console.log('Stats Response Status:', statsResponse.status)
                
                if (!statsResponse.ok) {
                    const errorText = await statsResponse.text()
                    console.log('Stats Error Response:', errorText)
                    throw new Error(`Erro ${statsResponse.status}: ${errorText}`)
                }
                
                const statsData = await statsResponse.json()
                setStatistics(statsData)
                
                // Buscar vagas recomendadas
                const jobsResponse = await fetch(`${API_BASE_URL}/api/candidates/${user?.id}/recommended-jobs`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                
                console.log('Jobs Response Status:', jobsResponse.status)
                
                if (!jobsResponse.ok) {
                    const errorText = await jobsResponse.text()
                    console.log('Jobs Error Response:', errorText)
                    throw new Error(`Erro ${jobsResponse.status}: ${errorText}`)
                }
                
                const jobsData = await jobsResponse.json()
                setRecommendedJobs(jobsData)
                
            } catch (error) {
                console.error('Erro ao buscar dados do dashboard:', error)
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

    if( statistics ){
        return (
            <div className="flex flex-col items-center">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col w-[72rem]">
                        <div className="bg-blue2 p-2 mt-5 rounded-lg">
                            <div className="flex justify-between">
                                <StatisticBox title="Candidaturas neste mês" animation={true} finalValue={statistics.applicationsThisMonth}>{statistics.applicationsThisMonth}</StatisticBox>
                                <StatisticBox title="Candidatura totais" animation={true} finalValue={statistics.totalApplications}>{statistics.totalApplications}</StatisticBox>
                                <StatisticBox title="Candidatura abertas" animation={true} finalValue={statistics.openApplications}>{statistics.openApplications}</StatisticBox>            
                            </div>
                            <div className="flex justify-end mt-2 pr-2">
                                <GenericBlueButton color={3} link="/jobs">Acessar minhas vagas</GenericBlueButton>
                            </div>
                        </div>
                        <p className="pt-12">Recomendações de vaga para você</p>
                        <div className="flex flex-col justify-center items-center bg-blue1 mb-12 p-10">
                            <div className="flex flex-col items-end px-3 space-y-6">
                                {recommendedJobs.slice(0, 3).map(job => (
                                    <JobPosition key={job.id} jobData={job}/>
                                ))}
                                <div>
                                    <GenericBlueButton color={3} link="/jobs">Ver mais</GenericBlueButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <NotFoundScreen 
                title="Candidato não encontrado"
                message="O painel que você está procurando não existe ou foi removido."
                icon="👤"
            />
        )
    }
}