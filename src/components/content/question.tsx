import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface QuestionProps {
    title: string;
    description: string;
}

export default function Question({title, description}: QuestionProps){
    const [open, setOpen] = useState(false)
    
    return(
        <div className="bg-blue4 hover:bg-blue5H w-full border border-black p-3 rounded-xl cursor-pointer transition-colors duration-200" onClick={() => setOpen(!open)}>
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-[1.3rem]">{title}</h2>
                <ChevronDown className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}/>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                open ? 'max-h-screen opacity-100 mt-3' : 'max-h-0 opacity-0'
            }`}>
                <p className="text-gray-700 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}