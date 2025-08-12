import { ReactNode } from "react";

type TextSectionProps = {
    id: string
    title: string,
    children: ReactNode
    img?: string 
    imgs?: string[] //A implementar
}

export default function TextSection({id, title, children, img}: TextSectionProps){
    return (
        <div id={id}>
            <h1 className="font-semibold text-[1.5rem] py-4">{title}</h1>
            <div className="text-[1.1rem]">{children}</div>
            {img && (
                <div className="my-4 flex justify-center">
                    <img src={img} alt={title} className="max-w-full md:max-w-4xl w-auto h-auto rounded-lg shadow-lg border border-gray-300" />
                </div>
            )}
        </div>
    )
}