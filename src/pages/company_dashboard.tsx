import { useParams } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import JobPosition from "../components/content/job_position";
import StatisticBox from "../components/content/statistic_box";
import mockJobs from "../data/mockdata/jobs";
import { mockCompanies } from "../data/mockdata/companies";
import { mockCompanyStats } from "../data/mockdata/company_stats";

export default function CompanyDashboard() {
    const { id } = useParams()
    const companyId = Number(id)
    const companyExists = mockCompanies.some(comp => comp.id === companyId)

    if (companyExists) {
        const statistics = mockCompanyStats.find(stat => stat.companyId === companyId)

        return (
            <div className="flex flex-col items-center">
                <div className="flex flex-col">
                    <div className="flex flex-col w-[72rem] ">
                        <div className="flex justify-between bg-blue2 p-2 mt-5 rounded-lg">
                            <StatisticBox title="Candidaturas Hoje" animation={true} finalValue={statistics?.todayApplications || 0}>{statistics?.todayApplications || 0}</StatisticBox>
                            <StatisticBox title="Vagas Abertas" animation={true} finalValue={statistics?.openJobs || 0}>{statistics?.openJobs || 0}</StatisticBox>
                            <StatisticBox title="Meta de Contratação" animation={true} finalValue={statistics?.activeCandidates || 0}>{statistics?.activeCandidates || 0}</StatisticBox>
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
}
