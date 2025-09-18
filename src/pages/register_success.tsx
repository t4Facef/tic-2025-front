import GenericBlueButton from '../components/buttons/generic_blue_button'

export default function RegisterSuccess() {
    return (
        <div className="min-h-screen bg-blue1 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center space-y-6">
                <div className="text-6xl">🎉</div>
                
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold text-blue3">Cadastro Realizado com Sucesso!</h1>
                    <p className="text-gray-600">
                        Bem-vindo ao Apojobs! Seu perfil foi criado e você já pode começar a explorar oportunidades inclusivas.
                    </p>
                </div>

                <div className="bg-blue4 rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold text-blue3">Próximos passos:</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>- Complete seu perfil profissional</li>
                        <li>- Explore vagas inclusivas</li>
                        <li>- Conecte-se com empresas</li>
                    </ul>
                </div>

                <div className="space-y-3 flex flex-col items-center">
                    <GenericBlueButton color={3} size="lg" link="/candidates/1/dashboard">
                        Ir para Dashboard
                    </GenericBlueButton>
                </div>
            </div>
        </div>
    )
}