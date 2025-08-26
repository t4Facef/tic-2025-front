// [TODO] - Fazer com que quando direicionar pelo botão para a listagem de vagas colocar os filtros apropriados (descobrir como fazer algo assim)
// [TODO] - Ajeitar tamanho das vagas + caixa de estatistica

import GenericBlueButton from "../components/buttons/generic_link_blue_button";
import JobPosition from "../components/content/job_position";
import StatisticBox from "../components/content/statistic_box";

export default function CandidateDashboard(){
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col w-[72rem]">
                    <div className="bg-blue2 p-2 mt-5 rounded-lg">
                        <div className="flex justify-between">
                            <StatisticBox title="Candidaturas neste mês">XX</StatisticBox>
                            <StatisticBox title="Candidatura totais">XX</StatisticBox>
                            <StatisticBox title="Candidatura abertas">XX</StatisticBox>            
                        </div>
                        <div className="flex justify-end mt-2 pr-2">
                            <GenericBlueButton color={3} link="/jobs">Acessar minhas vagas</GenericBlueButton>
                        </div>
                    </div>
                    <p className="pt-12">Recomendações de vaga para você</p>
                    <div className="flex flex-col justify-center items-center bg-blue1 mb-12">
                        <div className="flex flex-col items-end px-3">
                            <JobPosition profile="/a" title="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere facilis omnis odio ipsum odit iure a inventore iusto nihil, eum accusantium assumenda sunt aspernatur similique cum quo, nostrum ullam quaerat!</JobPosition>
                            <JobPosition profile="/a" title="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere facilis omnis odio ipsum odit iure a inventore iusto nihil, eum accusantium assumenda sunt aspernatur similique cum quo, nostrum ullam quaerat!</JobPosition>
                            <JobPosition profile="/a" title="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere facilis omnis odio ipsum odit iure a inventore iusto nihil, eum accusantium assumenda sunt aspernatur similique cum quo, nostrum ullam quaerat!</JobPosition>
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