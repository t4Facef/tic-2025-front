// [TODO] - Fazer a parte de possibilidade de edição

import { ReactNode } from "react";
import Tag from "./tag";
import GenericBlueButton from "../buttons/generic_blue_button";

interface TagContainerProps {
    children: ReactNode;
    edit?: boolean;
    tags?: string[];
}

export default function TagContainer({ children, edit = false, tags = [] }: TagContainerProps) {
    return (
        <div className="w-full space-y-4">
            <div>
                <div className="flex justify-between">
                    <p className="inline-flex bg-blue2 text-black p-2 px-3 rounded-t-xl text-center justify-center items-center">{children}</p>
                    {edit &&
                        <div className="flex gap-6 justify-end pb-2">
                            <GenericBlueButton size="md" color={6} rounded="lg">Remover</GenericBlueButton>
                            <GenericBlueButton size="md" color={6} rounded="lg">Adicionar</GenericBlueButton>
                        </div>
                    }
                </div>
                <div className="border-[2px] border-black min-h-[10rem] rounded-b-xl p-3 gap-2 bg-white">
                    {tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </div>
            </div>
        </div>
    )
}