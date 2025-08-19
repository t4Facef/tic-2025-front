import { ReactNode } from "react"

interface TagProps {
    children: ReactNode
}

export default function Tag({children}: TagProps ){
    return(
        <div className="bg-blue4 inline-flex px-3 m-2 rounded-2xl font-medium">
            {children}
        </div>
    )
}