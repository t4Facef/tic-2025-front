import { ReactNode } from "react"

interface filterCampProps {
    children: ReactNode
}

export default function FilterCamp({children}: filterCampProps){
    return (
        <div className="bg-blue4 p-2 rounded-lg w-full">
            {children}
        </div>
    )
}