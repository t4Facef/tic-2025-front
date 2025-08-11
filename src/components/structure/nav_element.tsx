import { Link } from "react-router-dom";
import { ReactNode } from "react";

type navElementProps = {
    link: string,
    children: ReactNode
}

export default function NavElement({link, children}: navElementProps){
    return (
        <Link className="p-4" to={link}>{children}</Link>
    )
}