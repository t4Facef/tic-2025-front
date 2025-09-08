// [TODO] - Fazer a parte de possibilidade de edição

import { ReactNode, useState } from "react";
import Tag from "./tag";

interface TagContainerProps {
    children: ReactNode;
    edit?: boolean;
    tags?: string[];
}

export default function TagContainer({ children, edit = false, tags = [] }: TagContainerProps) {
    const [currentTags, setCurrentTags] = useState(tags);
    const [newTagText, setNewTagText] = useState("");

    const handleRemoveTag = (indexToRemove: number) => {
        setCurrentTags(currentTags.filter((_, index) => index !== indexToRemove));
    };

    const handleAddTag = () => {
        if (newTagText.trim()) {
            setCurrentTags([...currentTags, newTagText.trim()]);
            setNewTagText("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleClearAll = () => {
        setCurrentTags([]);
    };

    return (
        <div className="w-full space-y-4">
            <div>
                <p className="inline-flex bg-blue2 text-black p-2 px-3 rounded-t-xl text-center justify-center items-center">{children}</p>
                <div className="border-[2px] border-black min-h-[10rem] rounded-b-xl p-3 gap-2 bg-white relative">
                    {edit && currentTags.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClearAll}
                            className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border border-red-300 hover:border-red-400"
                        >
                            🗑️ Limpar Tudo
                        </button>
                    )}
                    {currentTags.map((tag, index) => (
                        <Tag 
                            key={index} 
                            removable={edit} 
                            onRemove={() => handleRemoveTag(index)}
                        >
                            {tag}
                        </Tag>
                    ))}
                    {edit && (
                        <div className="inline-flex items-center bg-blue1 px-3 m-2 rounded-2xl font-medium">
                            <input
                                type="text"
                                value={newTagText}
                                onChange={(e) => setNewTagText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Nova capacidade..."
                                className="bg-transparent border-none outline-none placeholder-gray-500 text-sm min-w-[120px]"
                            />
                            <button 
                                type="button"
                                onClick={handleAddTag}
                                className="ml-2 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-sm transition-colors"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}