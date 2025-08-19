import NavElement from "./nav_element"

export default function Nav(){
    return(
        <nav className="bg-blue4 flex justify-evenly w-full">
            <NavElement link="/saiba_mais">Saiba Mais</NavElement>
            <NavElement link="/faq">F.A.Q</NavElement>
            <NavElement link="/adequacao">Adequação</NavElement>
            <NavElement link="/utilizacao">Utilização</NavElement>
        </nav>
    )
}