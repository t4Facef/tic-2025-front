// [TODO] - Pensar em design mais bonito pra essa tela

interface NotFoundScreenProps {
    title: string;
    message: string;
    icon?: string;
}

export default function NotFoundScreen({ title, message, icon = "👤" }: NotFoundScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-20 py-10">
            <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto mb-6 bg-blue1 rounded-full flex items-center justify-center">
                    <span className="text-4xl text-blue3">{icon}</span>
                </div>
                <h1 className="text-2xl font-bold text-blue3">{title}</h1>
                <p className="text-gray-600 max-w-md">
                    {message}
                </p>
                <button 
                    onClick={() => window.history.back()}
                    className="mt-6 px-6 py-2 bg-blue2 text-white rounded-lg hover:bg-blue3 transition-colors"
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}