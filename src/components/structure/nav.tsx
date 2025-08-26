import NavElement from "./nav_element"

export default function Nav(){
    return(
        <nav className="bg-blue4 flex justify-evenly w-full">
            <NavElement link="/about">Saiba Mais</NavElement>
            <NavElement link="/faq">F.A.Q</NavElement>
            <NavElement link="/adaptation">Adequação</NavElement>
            <NavElement link="/usage">Utilização</NavElement>
        </nav>
    )
}