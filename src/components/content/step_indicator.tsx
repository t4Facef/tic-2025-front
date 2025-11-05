interface stepIndicatorProps {
    step: number;
    stepsTitles: Record<number, string>
}

export default function StepIndicator({step, stepsTitles}: stepIndicatorProps){

    const lenSteps = Object.keys(stepsTitles).length

    return (
        <div className="flex justify-evenly">
            {Array.from({ length: lenSteps }, (_, i) => (
                <div className="flex flex-col items-center">
                    <p className="text-center mb-2">{stepsTitles[i + 1 as keyof typeof stepsTitles]}</p>
                    <div key={i} className={`w-4 h-4 rounded-full ${i + 1 == step ? 'bg-blue-500' : i + 1 <= step ? 'bg-blue-300' : 'bg-white border-2 border-gray-300'}`}></div>
                </div>
            ))}
        </div>
    )
}