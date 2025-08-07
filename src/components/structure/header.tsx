import { Link } from "react-router-dom"
import "./header.css"

export default function Header(){
    return (
        <div className = "divHeader">
            <Link to="/" className="linkHeader"> 
                <img src="./img/logo-apojobs.jpg" alt="logo-site" className="imgHeader"/>
                <span className="txtHeader">Apojobs</span>
            </Link>
        </div>
    )
}