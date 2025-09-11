// Fazer com que as caixas de estatisticas não ultrapassem o limite da pagina
// [TODO] - Adicionar path variable e mock de empresas (por enquanto ta vagas quaisquers  idependente da empresa)

import GenericBlueButton from "../components/buttons/generic_blue_button";
import JobPosition from "../components/content/job_position";
import StatisticBox from "../components/content/statistic_box";
import mockJobs from "../data/mockdata/jobs";

export default function CompanyDashboard() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col">
                <div className="flex flex-col w-[72rem] ">
                    <div className="flex justify-between bg-blue2 p-2 mt-5 rounded-lg">
                        <StatisticBox title="Candidaturas Hoje" animation={true} finalValue={1000}>1000</StatisticBox>
                        <StatisticBox title="Vagas Abertas" animation={true} finalValue={25}>25</StatisticBox>
                        <StatisticBox title="Candidatos Ativos" animation={true} finalValue={150}>150</StatisticBox>
                    </div>
                    <div>
                        <p className="pt-12">Vagas Recentes</p>
                        <div className="flex flex-col justify-center items-center bg-blue1 mb-6">
                            <div className="flex flex-col items-end p-6 space-y-6">
                                <JobPosition jobData={mockJobs[1]} />
                                <JobPosition jobData={mockJobs[2]} />
                                <JobPosition jobData={mockJobs[3]} />
                                <GenericBlueButton color={3} link="/jobs">Ver todas</GenericBlueButton>
                            </div>
                        </div>
                        <p className="pt-6">Vagas Encerradas</p>
                        <div className="flex flex-col justify-center items-center bg-blue1 mb-12">
                            <div className="flex flex-col items-end p-6 space-y-6">
                                <JobPosition jobData={mockJobs[4]} />
                                <JobPosition jobData={mockJobs[5]} />
                                <JobPosition jobData={mockJobs[6]} />
                                <GenericBlueButton color={3} link="/jobs">Ver todas</GenericBlueButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
