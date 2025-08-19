import SearchBox from "../components/content/search_box";

export default function PositionsList(){
    return (
        <div className="flex flex-1">
            <div className="bg-blue2 flex-[1] flex justify-center text-[16px] p-1 min-h-screen">
                <p className="text-white">Filtros</p>
            </div>
            <div className="flex flex-[7] justify-center mt-7 mx-5">
                <SearchBox/>
            </div>
        </div>
    )
}