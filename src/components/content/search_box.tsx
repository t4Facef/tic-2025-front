// [TODO] - Ajustar a caixa de pesquisa para quando for selecionada a borda não engrossar é arredondar lados errados
// [TODO] - Juntar os dashboards de empresas e candidatos

import {Search} from "lucide-react"

export default function SearchBox(){
    return(
        <form className="flex h-[3.5rem]">
            <input type="text" name="search" id="search" placeholder="Pesquisar" className="border border-black rounded-l-lg w-[132vh] pl-5"/>
            <button className="flex bg-blue4 border border-black rounded-r-lg p-2 items-center justify-center w-[8vh]">{<Search/>}</button>
        </form>
    )
}