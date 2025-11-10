import { ReactNode, useState, useEffect } from "react";
import Tag from "./tag";
import SearchableSelect from "../forms/searchable_select";

interface TagContainerProps {
    children: ReactNode;
    edit?: boolean;
    tags?: string[];
    onChange?: (tags: string[]) => void;
    options?: string[];
}

export default function TagContainer({ children, edit = false, tags = [], onChange, options }: TagContainerProps) {
    const [currentTags, setCurrentTags] = useState(tags);
    
    // Sincronizar estado interno com props quando tags mudarem
    useEffect(() => {
        setCurrentTags(tags);
    }, [tags]);
    const [newTagText, setNewTagText] = useState("");

    const handleRemoveTag = (indexToRemove: number) => {
        const newTags = currentTags.filter((_, index) => index !== indexToRemove);
        setCurrentTags(newTags);
        onChange?.(newTags);
    };

    const handleAddTag = (value?: string) => {
        const tagToAdd = value || newTagText;
        if (tagToAdd.trim() && !currentTags.includes(tagToAdd.trim())) {
            const newTags = [...currentTags, tagToAdd.trim()];
            setCurrentTags(newTags);
            onChange?.(newTags);
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
        onChange?.([]);
    };

    return (
        <div className="w-full space-y-4">
            <div>
                <p className="inline-flex bg-blue3 text-white p-3 px-6 rounded-t-2xl text-center justify-center items-center font-medium text-lg">{children}</p>
                <div className="border border-blue3 min-h-[8rem] rounded-b-2xl rounded-tr-2xl p-6 gap-2 bg-white relative shadow-sm">
                    {edit && currentTags.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClearAll}
                            className="absolute top-3 right-3 bg-red1 hover:bg-red2 text-white px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
                        >
                            Limpar Tudo
                        </button>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {currentTags.map((tag, index) => (
                            <Tag
                                key={index}
                                removable={edit}
                                onRemove={() => handleRemoveTag(index)}
                            >
                                {tag}
                            </Tag>
                        ))}
                    </div>
                    {edit && options && (
                        <div className="mt-4">
                            <SearchableSelect options={options} addTag={handleAddTag} currentTags={currentTags}/>
                        </div>
                    )}
                    {edit && !options && (
                        <div className="mt-4">
                            <div className="inline-flex items-center bg-blue1 px-4 py-2 rounded-xl font-medium border border-blue2">
                                <input
                                    type="text"
                                    value={newTagText}
                                    onChange={(e) => setNewTagText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nova habilidade..."
                                    className="bg-transparent border-none outline-none placeholder-blue3 text-blue3 min-w-[150px] font-medium"
                                />
                                <button 
                                    type="button"
                                    onClick={() => handleAddTag()}
                                    className="ml-3 bg-blue3 hover:bg-blue3H text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}
                    {currentTags.length === 0 && !edit && (
                        <div className="text-center py-8 text-gray-500">
                            <p>Nenhuma tag adicionada ainda</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}