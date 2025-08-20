// Fazer com que as caixas de estatisticas não ultrapassem o limite da pagina

import GenericBlueButton from "../components/buttons/generic_link_blue_button";
import JobPosition from "../components/content/job_position";
import StatisticBox from "../components/content/statistic_box";

export default function CompanyDashboard(){
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col">
                <div className="flex flex-col w-[72rem] bg-blue2 p-2 mt-5 rounded-lg">
                    <div className="flex justify-between">
                        <StatisticBox title="Candidaturas Hoje">XX</StatisticBox>
                        <StatisticBox title="Vagas Abertas">XX</StatisticBox>
                        <StatisticBox title="Candidaturas Hoje">XX</StatisticBox>           
                    </div>
                </div>
                <p className="pt-12">Vagas Recentes</p>
                <div className="flex flex-col justify-center items-center bg-blue1 mb-6">
                    <div className="flex flex-col items-end px-3">
                        <JobPosition profile="/a" title="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere facilis omnis odio ipsum odit iure a inventore iusto nihil, eum accusantium assumenda sunt aspernatur similique cum quo, nostrum ullam quaerat!</JobPosition>
                        <JobPosition profile="/a" title="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere facilis omnis odio ipsum odit iure a inventore iusto nihil, eum accusantium assumenda sunt aspernatur similique cum quo, nostrum ullam quaerat!</JobPosition>
                        <JobPosition profile="/a" title="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere facilis omnis odio ipsum odit iure a inventore iusto nihil, eum accusantium assumenda sunt aspernatur similique cum quo, nostrum ullam quaerat!</JobPosition>
                        <GenericBlueButton color={3} link="/vagas" classEdit="py-3 my-5">Ver todas</GenericBlueButton>
                    </div>
                </div>
                <p className="pt-6">Vagas Encerradas</p>
                <div className="flex flex-col justify-center items-center bg-blue1 mb-12">
                    <div className="flex flex-col items-end px-3">
                        <JobPosition profile="/a" title="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere facilis omnis odio ipsum odit iure a inventore iusto nihil, eum accusantium assumenda sunt aspernatur similique cum quo, nostrum ullam quaerat!</JobPosition>
                        <JobPosition profile="/a" title="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere facilis omnis odio ipsum odit iure a inventore iusto nihil, eum accusantium assumenda sunt aspernatur similique cum quo, nostrum ullam quaerat!</JobPosition>
                        <JobPosition profile="/a" title="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere facilis omnis odio ipsum odit iure a inventore iusto nihil, eum accusantium assumenda sunt aspernatur similique cum quo, nostrum ullam quaerat!</JobPosition>
                        <GenericBlueButton color={3} link="/vagas" classEdit="py-3 my-5">Ver todas</GenericBlueButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
