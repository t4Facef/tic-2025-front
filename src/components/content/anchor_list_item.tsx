import { ReactNode } from "react";

interface AnchorListItemProps {
    id: string;
    children: ReactNode;
}

export default function AnchorListItem({id, children}: AnchorListItemProps){
    return(
        <li>
            <a href={`#${id}`} className="hover:underline">{children}</a>
        </li>
    )
}