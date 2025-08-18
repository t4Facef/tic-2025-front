import { ReactNode } from "react";

interface TagContainerProps {
    children: ReactNode
}

export default function TagContainer({children}: TagContainerProps){
    return(
        <div className="mt-5">
            <p className="inline-flex bg-blue2 text-white p-2 px-3 rounded-t-xl">{children}</p>
            <div className="border-[2px] border-black min-h-[10rem] rounded-b-xl">

            </div>
        </div>
    )
}