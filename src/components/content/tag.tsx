import { ReactNode } from "react"

interface TagProps {
    children: ReactNode;
    removable?: boolean;
    onRemove?: () => void;
}

export default function Tag({children, removable = false, onRemove}: TagProps ){
    return(
        <div className="bg-blue2 text-white inline-flex items-center px-3 py-1 rounded-full font-medium shadow-sm hover:bg-blue3 transition-colors group">
            <span className="text-sm font-medium">{children}</span>
            {removable && (
                <button 
                    type="button"
                    onClick={onRemove}
                    className="ml-2 text-white hover:text-red1 hover:bg-white hover:bg-opacity-20 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold transition-all duration-200"
                >
                    ×
                </button>
            )}
        </div>
    )
}