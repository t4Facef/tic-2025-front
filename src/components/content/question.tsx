import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

interface QuestionProps {
    title: string;
    description: string;
    category?: string;
}

export default function Question({title, description, category}: QuestionProps){
    const [open, setOpen] = useState(false)
    
    return(
        <div className="bg-white border border-blue2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div 
                className="p-5 cursor-pointer hover:bg-blue1 transition-colors duration-200" 
                onClick={() => setOpen(!open)}
            >
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        {category && (
                            <span className="inline-block bg-blue3 text-white text-xs px-3 py-1 rounded-full mb-2 font-medium">
                                {category}
                            </span>
                        )}
                        <div className="flex items-start gap-3">
                            <HelpCircle className="text-blue3 mt-1 flex-shrink-0" size={20} />
                            <h2 className="font-semibold text-lg text-blue3 leading-tight">{title}</h2>
                        </div>
                    </div>
                    <ChevronDown 
                        className={`text-blue3 transition-transform duration-300 flex-shrink-0 ${
                            open ? 'rotate-180' : ''
                        }`}
                        size={24}
                    />
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-5 pb-5 pt-0">
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue3">
                        <div 
                            className="text-gray-700 leading-relaxed whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}