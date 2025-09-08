import { ReactNode } from "react"

interface TagProps {
    children: ReactNode;
    removable?: boolean;
    onRemove?: () => void;
}

export default function Tag({children, removable = false, onRemove}: TagProps ){
    return(
        <div className="bg-blue4 inline-flex items-center px-3 m-2 rounded-2xl font-medium group">
            <span>{children}</span>
            {removable && (
                <button 
                    type="button"
                    onClick={onRemove}
                    className="ml-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-full w-5 h-5 flex items-center justify-center text-sm transition-colors"
                >
                    ×
                </button>
            )}
        </div>
    )
}