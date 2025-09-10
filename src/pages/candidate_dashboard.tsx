// [TODO] - Fazer com que quando direicionar pelo botão para a listagem de vagas colocar os filtros apropriados (descobrir como fazer algo assim)
// [TODO] - Ajeitar tamanho das vagas + caixa de estatistica

import { useParams } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import JobPosition from "../components/content/job_position";
import StatisticBox from "../components/content/statistic_box";
import candidateStatistics from "../data/mockdata/candidate_statistics";

import mockJobs from "../data/mockdata/jobs";
import NotFoundScreen from "../components/content/not_found_screen";

export default function CandidateDashboard(){
    const { id } = useParams()
    const candidateStatistic = candidateStatistics.find(candidato => candidato.candidateId === Number(id))

    if( candidateStatistic ){
        return (
            <div className="flex flex-col items-center">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col w-[72rem]">
                        <div className="bg-blue2 p-2 mt-5 rounded-lg">
                            <div className="flex justify-between">
                                <StatisticBox title="Candidaturas neste mês" animation={true} finalValue={candidateStatistic.applicationsThisMonth}>{candidateStatistic.applicationsThisMonth}</StatisticBox>
                                <StatisticBox title="Candidatura totais" animation={true} finalValue={candidateStatistic.totalApplications}>{candidateStatistic.totalApplications}</StatisticBox>
                                <StatisticBox title="Candidatura abertas" animation={true} finalValue={candidateStatistic.openApplications}>{candidateStatistic.openApplications}</StatisticBox>            
                            </div>
                            <div className="flex justify-end mt-2 pr-2">
                                <GenericBlueButton color={3} link="/jobs">Acessar minhas vagas</GenericBlueButton>
                            </div>
                        </div>
                        <p className="pt-12">Recomendações de vaga para você</p>
                        <div className="flex flex-col justify-center items-center bg-blue1 mb-12 px-10">
                            <div className="flex flex-col items-end px-3">
                                <JobPosition jobData={mockJobs[9]}/>
                                <JobPosition jobData={mockJobs[8]}/>
                                <JobPosition jobData={mockJobs[7]}/>
                                <div className="py-5">
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