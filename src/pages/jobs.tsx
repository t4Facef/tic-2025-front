// [TODO] - Organizar o a requisição do banco para pegar as vagas que mais condizem, então colocar os numeros na nav com base no numero de vagas
// [TODO] - Colocar as estatisticas no depois da barra de pesquisar de forma horizontal

import JobPosition from "../components/content/job_position";
import SearchBox from "../components/content/search_box";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mockJobs from "../data/mockdata/jobs";
import JobFilters from "../components/forms/filters/job_filters";

export default function Jobs() {
    return (
        <div className="flex flex-1">
            <div className="min-w-36 sm:min-w-40 md:min-w-44">
                <div className="bg-blue1 w-full py-6 flex flex-col items-center px-3">
                    <p className="text-black px-4 text-center mb-4 font-bold text-lg">Filtros</p>
                    <div className="flex flex-col gap-4 w-full">
                        <JobFilters />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center my-7 px-36">
                <div className="space-y-8">
                    <SearchBox />
                    <div>
                        <div className="space-y-8">
                            <JobPosition jobData={mockJobs[1]} />
                            <JobPosition jobData={mockJobs[2]} />
                            <JobPosition jobData={mockJobs[3]} />
                            <JobPosition jobData={mockJobs[4]} />
                            <JobPosition jobData={mockJobs[5]} />

                        </div>
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