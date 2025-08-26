// [TODO] - Organizar o a requisição do banco para pegar as vagas que mais condizem, então colocar os numeros na nav com base no numero de vagas
// [TODO] - Colocar as estatisticas no depois da barra de pesquisar de forma horizontal

import JobPosition from "../components/content/job_position";
import SearchBox from "../components/content/search_box";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Jobs(){
    return (
        <div className="flex flex-1">
            <div className="bg-blue2 flex-[2] flex justify-center text-[16px] p-1 min-h-screen">
                <p className="text-white">Filtros</p>
            </div>
            <div className="flex flex-[11] flex-col items-center mt-7 px-36">
                <div>
                    <SearchBox/>
                <div>
                    <JobPosition profile="" title="Lorem Impsum">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quidem cum eum facere laudantium pariatur enim officia esse. Doloribus sed minus sunt nesciunt incidunt cumque perferendis maiores. Fuga, assumenda veniam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloremque corrupti ratione ut doloribus et hic, adipisci nostrum architecto est nesciunt exercitationem! Aspernatur error odit vero esse ad molestiae amet.</JobPosition>
                    <JobPosition profile="" title="Lorem Impsum">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quidem cum eum facere laudantium pariatur enim officia esse. Doloribus sed minus sunt nesciunt incidunt cumque perferendis maiores. Fuga, assumenda veniam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloremque corrupti ratione ut doloribus et hic, adipisci nostrum architecto est nesciunt exercitationem! Aspernatur error odit vero esse ad molestiae amet.</JobPosition>
                    <JobPosition profile="" title="Lorem Impsum">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quidem cum eum facere laudantium pariatur enim officia esse. Doloribus sed minus sunt nesciunt incidunt cumque perferendis maiores. Fuga, assumenda veniam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloremque corrupti ratione ut doloribus et hic, adipisci nostrum architecto est nesciunt exercitationem! Aspernatur error odit vero esse ad molestiae amet.</JobPosition>
                    <JobPosition profile="" title="Lorem Impsum">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quidem cum eum facere laudantium pariatur enim officia esse. Doloribus sed minus sunt nesciunt incidunt cumque perferendis maiores. Fuga, assumenda veniam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloremque corrupti ratione ut doloribus et hic, adipisci nostrum architecto est nesciunt exercitationem! Aspernatur error odit vero esse ad molestiae amet.</JobPosition>
                    <JobPosition profile="" title="Lorem Impsum">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quidem cum eum facere laudantium pariatur enim officia esse. Doloribus sed minus sunt nesciunt incidunt cumque perferendis maiores. Fuga, assumenda veniam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloremque corrupti ratione ut doloribus et hic, adipisci nostrum architecto est nesciunt exercitationem! Aspernatur error odit vero esse ad molestiae amet.</JobPosition>
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