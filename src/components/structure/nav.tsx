import "./nav.css"
import { Link } from "react-router-dom"

export default function Nav(){
    return(
        <nav className="nav">
            <Link className="anchorNav" to="/saiba_mais">Saiba Mais</Link>
            <Link className="anchorNav" to="/faq">F.A.Q</Link>
            <Link className="anchorNav" to="/adequacao">Adequação</Link>
            <Link className="anchorNav" to="/ultilizacao">Ultilização</Link>
        </nav>
    )
}