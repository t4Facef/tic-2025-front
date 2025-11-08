import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

type navElementProps = {
    link: string,
    children: ReactNode,
    icon?: LucideIcon,
    description?: string,
    mobile?: boolean
}

export default function NavElement({link, children, icon: Icon, description, mobile}: navElementProps){
    const location = useLocation()
    const isActive = location.pathname === link
    
    return (
        <Link 
            className={`
                ${mobile ? 'flex items-center space-x-3' : 'flex flex-col items-center space-y-1'}
                px-4 py-3 md:py-2 text-sm md:text-base font-medium rounded-lg md:rounded-md
                transition-all duration-200 hover:scale-105 active:scale-95
                ${
                    isActive 
                        ? 'bg-blue3 text-white shadow-md' 
                        : 'text-blue3 hover:bg-blue1 hover:text-blue2'
                }
            `} 
            to={link}
            title={description}
        >
            {Icon && <Icon size={mobile ? 18 : 20} />}
            <span className={mobile ? '' : 'text-xs'}>{children}</span>
            {description && !mobile && (
                <span className="text-xs opacity-75">{description}</span>
            )}
        </Link>
    )
}