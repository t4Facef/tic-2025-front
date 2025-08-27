interface stepIndicatorProps {
    step: number
}

export default function StepIndicator({step}: stepIndicatorProps){
    const stepsTitles = {
        1: "Dados Pessoais",
        2: "Contatos",
        3: "Curriculo",
        4: "Finalização"
    }

    return (
        <div className="flex justify-evenly">
            {Array.from({ length: 4 }, (_, i) => (
                <div className="flex flex-col items-center">
                    <p className="text-center mb-2">{stepsTitles[i + 1 as keyof typeof stepsTitles]}</p>
                    <div key={i} className={`w-4 h-4 rounded-full ${i < step ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                </div>
            ))}
        </div>
    )
}