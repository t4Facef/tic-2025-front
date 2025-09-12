import { ReactNode, useState, useEffect } from "react";

interface StatisticBoxProps {
    title: string;
    children?: ReactNode;
    animation?: boolean;
    finalValue?: number;
}

export default function StatisticBox({title, children, animation = false, finalValue = 0}: StatisticBoxProps){
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        if (animation && finalValue > 0) {
            // Pequeno delay para garantir que execute após carregamento
            const startDelay = setTimeout(() => {
                const duration = 1200; // 1.2 segundos fixos
                const interval = duration / finalValue; // Calcula intervalo baseado no valor
                let count = 0;
                
                const timer = setInterval(() => {
                    count++;
                    setCurrentValue(count);
                    if (count >= finalValue) {
                        clearInterval(timer);
                    }
                }, interval);
            }, 500); // Espera 500ms após carregar

            return () => clearTimeout(startDelay);
        }
    }, [animation, finalValue]);

    return (
        <div className="bg-blue2 p-2 flex-1 rounded-xl">
            <div className="bg-blue1 p-2 rounded-lg">
                {title}
                <p className="flex justify-end text-[32px]">
                    {animation ? currentValue : children}
                </p>
            </div>
        </div>
    )
}