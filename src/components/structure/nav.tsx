import { Link } from "react-router-dom"

export default function Nav(){
    return(
        <nav className="bg-blue4 flex justify-evenly w-full">
            <Link className="p-4" to="/saiba_mais">Saiba Mais</Link>
            <Link className="p-4" to="/faq">F.A.Q</Link>
            <Link className="p-4" to="/adequacao">Adequação</Link>
            <Link className="p-4" to="/ultilizacao">Ultilização</Link>
        </nav>
    )
}