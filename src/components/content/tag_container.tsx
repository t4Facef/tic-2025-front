import { ReactNode } from "react";
import Tag from "./tag";

interface TagContainerProps {
    children: ReactNode
    tags?: string[]
}

export default function TagContainer({children, tags = []}: TagContainerProps){
    return(
        <div className="mt-5 w-full">
            <p className="inline-flex bg-blue2 text-black p-2 px-3 rounded-t-xl">{children}</p>
            <div className="border-[2px] border-black min-h-[10rem] rounded-b-xl p-3 gap-2 bg-white">
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </div>
        </div>
    )
}