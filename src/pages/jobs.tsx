// [TODO] - Organizar o a requisição do banco para pegar as vagas que mais condizem, então colocar os numeros na nav com base no numero de vagas
// [TODO] - Colocar as estatisticas no depois da barra de pesquisar de forma horizontal

import JobPosition from "../components/content/job_position";
import SearchBox from "../components/content/search_box";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mockJobs from "../data/mockdata/jobs";

export default function Jobs(){
    return (
        <div className="flex flex-1">
            <div className="min-w-36 sm:min-w-40 md:min-w-44">
                <div className="bg-blue2 w-full py-6 flex flex-col items-center px-3">
                    <p className="text-white px-4 text-center mb-4">Filtros</p>
                    <div className="flex flex-col gap-4 w-full">
                        {["Teste 1", "teste 2", "teste 3", "teste 4", "teste 5"].map((option, i) => (
                            <label key={i} className="flex items-center gap-2 text-white text-sm justify-center">
                                <input type="checkbox" name={`job_filter_${i}`} value={option} />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center mt-7 px-36">
                <div>
                    <SearchBox/>
                <div>
                    <JobPosition jobData={mockJobs[1]}/>
                    <JobPosition jobData={mockJobs[2]}/>
                    <JobPosition jobData={mockJobs[3]}/>
                    <JobPosition jobData={mockJobs[4]}/>
                    <JobPosition jobData={mockJobs[5]}/>
                </div>
                <div className="flex font-semibold my-4">
                    <ChevronLeft/>
                    <nav className="flex space-x-3">
                        <a href="/1">1</a>
                        <a href="/1">2</a>
                        <a href="/1">3</a>
                        <a href="/1">4</a>
                        <a href="/1">5</a>
                        <a href="/i">...</a>
                    </nav>
                    <ChevronRight/>
                </div>
                </div>
            </div>
        </div>
    )
}