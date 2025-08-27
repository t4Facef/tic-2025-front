import { Link } from "react-router-dom";
import { ReactNode } from "react"

interface LinkListItemProps{
    children: ReactNode;
    path: string;
}

export default function LinkListItem({children, path}: LinkListItemProps){
    return(
        <div className="border-b border-gray-400 w-full text-center py-1">
            <Link to={path}>{children}</Link>
        </div>
    )
}