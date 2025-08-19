import {Search} from "lucide-react"

export default function SearchBox(){
    return(
        <form className="flex max-h-[2.9rem]">
            <input type="text" name="search" id="search" placeholder="Pesquisar" className="border border-black rounded-l-lg w-[55rem] pl-5"/>
            <button className="flex bg-blue4 border border-black rounded-r-lg p-2 items-center">{<Search/>}</button>
        </form>
    )
}