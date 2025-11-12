import { ReactNode } from "react"

interface filterCampProps {
    children: ReactNode
}

export default function FilterCamp({children}: filterCampProps){
    return (
        <div className="bg-white p-4 rounded-xl w-full shadow-md border border-blue2/10 hover:shadow-lg hover:border-blue2/20 transition-all duration-200">
            {children}
        </div>
    )
}