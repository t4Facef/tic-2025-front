import { ChevronDown } from "lucide-react";

interface QuestionProps {
    title: string;
    description: string;
}

export default function Question({title, description}: QuestionProps){
    return(
        <div className="bg-blue4 w-full border border-black p-3">
            <div className="flex justify-between">
                <h2 className="font-semibold text-[1.3rem]">{title}</h2>
                <ChevronDown/>
            </div>
            <p>{description}</p>
        </div>
    )
}