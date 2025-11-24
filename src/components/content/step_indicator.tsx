interface stepIndicatorProps {
    step: number;
    stepsTitles: Record<number, string>
}

export default function StepIndicator({step, stepsTitles}: stepIndicatorProps) {

    const lenSteps = Object.keys(stepsTitles).length

    return (
        <div className="w-full overflow-x-auto">
            <div className="flex justify-between items-end min-w-[280px] px-4">
                {Array.from({ length: lenSteps }, (_, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 min-w-0">
                        <p className="text-center mb-1 text-xs sm:text-sm md:text-base font-medium px-1 leading-tight break-words min-h-[2.5rem] flex items-center justify-center">
                            <span className="hidden sm:inline">{stepsTitles[i + 1 as keyof typeof stepsTitles]}</span>
                            <span className="sm:hidden">
                                {stepsTitles[i + 1 as keyof typeof stepsTitles].split(' ')[0]}
                            </span>
                        </p>
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${i + 1 == step ? 'bg-blue-500' : i + 1 <= step ? 'bg-blue-300' : 'bg-gray-300'}`}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}