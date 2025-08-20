import { ReactNode } from "react";

interface StatisticBoxProps {
    title: string;
    children: ReactNode;
}

export default function StatisticBox({title ,children}: StatisticBoxProps){
    return (
        <div className="bg-blue2 p-2 flex-1 rounded-xl">
            <div className="bg-blue1 p-2 rounded-lg">
                {title}
                <p className="flex justify-end text-[32px]">
                    {children}
                </p>
            </div>
        </div>
    )
}