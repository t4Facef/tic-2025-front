// [TODO] - Configurar a Search box para não ultrapassar o limite da pagina quando com muito zoom

import JobPosition from "../components/content/job_position";
import SearchBox from "../components/content/search_box";

export default function PositionsList(){
    return (
        <div className="flex flex-1">
            <div className="bg-blue2 flex-[2] flex justify-center text-[16px] p-1 min-h-screen">
                <p className="text-white">Filtros</p>
            </div>
            <div className="flex flex-[11] flex-col items-center mt-7 mx-5">
                <SearchBox/>
                <div>
                    <JobPosition profile="" title="Lorem Impsum">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quidem cum eum facere laudantium pariatur enim officia esse. Doloribus sed minus sunt nesciunt incidunt cumque perferendis maiores. Fuga, assumenda veniam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloremque corrupti ratione ut doloribus et hic, adipisci nostrum architecto est nesciunt exercitationem! Aspernatur error odit vero esse ad molestiae amet.</JobPosition>
                    <JobPosition profile="" title="Lorem Impsum">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quidem cum eum facere laudantium pariatur enim officia esse. Doloribus sed minus sunt nesciunt incidunt cumque perferendis maiores. Fuga, assumenda veniam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloremque corrupti ratione ut doloribus et hic, adipisci nostrum architecto est nesciunt exercitationem! Aspernatur error odit vero esse ad molestiae amet.</JobPosition>
                    <JobPosition profile="" title="Lorem Impsum">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quidem cum eum facere laudantium pariatur enim officia esse. Doloribus sed minus sunt nesciunt incidunt cumque perferendis maiores. Fuga, assumenda veniam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloremque corrupti ratione ut doloribus et hic, adipisci nostrum architecto est nesciunt exercitationem! Aspernatur error odit vero esse ad molestiae amet.</JobPosition>
                    <JobPosition profile="" title="Lorem Impsum">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quidem cum eum facere laudantium pariatur enim officia esse. Doloribus sed minus sunt nesciunt incidunt cumque perferendis maiores. Fuga, assumenda veniam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloremque corrupti ratione ut doloribus et hic, adipisci nostrum architecto est nesciunt exercitationem! Aspernatur error odit vero esse ad molestiae amet.</JobPosition>
                </div>
                <div>
                    <span></span>
                </div>
            </div>
        </div>
    )
}