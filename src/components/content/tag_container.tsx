import { ReactNode, useState } from "react";
import Tag from "./tag";
import SearchableSelect from "../forms/searchable_select ";

interface TagContainerProps {
    children: ReactNode;
    edit?: boolean;
    tags?: string[];
    onChange?: (tags: string[]) => void;
}

export default function TagContainer({ children, edit = false, tags = [], onChange }: TagContainerProps) {
    const [currentTags, setCurrentTags] = useState(tags);
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10'];
    const [selected, setSelected] = useState("")

    const handleRemoveTag = (indexToRemove: number) => {
        const newTags = currentTags.filter((_, index) => index !== indexToRemove);
        setCurrentTags(newTags);
        onChange?.(newTags);
    };

    const handleAddTag = (value?: string) => {
        const tagToAdd = value || selected;
        if (tagToAdd.trim() && !currentTags.includes(tagToAdd.trim())) {
            const newTags = [...currentTags, tagToAdd.trim()];
            setCurrentTags(newTags);
            onChange?.(newTags);
            setSelected("");
        }
    };

    const handleClearAll = () => {
        setCurrentTags([]);
        onChange?.([]);
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
                    {edit && <SearchableSelect options={options} addTag={handleAddTag} currentTags={currentTags}/>}
                </div>
            </div>
        </div>
    )
}