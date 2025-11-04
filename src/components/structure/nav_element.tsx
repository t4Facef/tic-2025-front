import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";

type navElementProps = {
    link: string,
    children: ReactNode
}

export default function NavElement({link, children}: navElementProps){
    const location = useLocation()
    const isActive = location.pathname === link
    
    return (
        <Link 
            className={`
                block px-4 py-3 md:py-2 text-sm md:text-base font-medium rounded-lg md:rounded-md
                transition-all duration-200 hover:scale-105 active:scale-95
                ${
                    isActive 
                        ? 'bg-blue3 text-white shadow-md' 
                        : 'text-blue3 hover:bg-blue1 hover:text-blue2'
                }
            `} 
            to={link}
        >
            {children}
        </Link>
    )
}