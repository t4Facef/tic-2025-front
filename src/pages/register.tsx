// [TODO] - Verificar se os dados obrigatorios foram preenchidos

import { useState } from 'react'
import GenericBlueButton from '../components/buttons/generic_blue_button'

export default function Register(){
    const [step, setStep] = useState(1)
    
    // Mapeamento dos textos dos botões baseado no step
    const buttonTexts = {
        back: {
            1: "Cancelar",
            2: "Voltar", 
            3: "Voltar",
            4: "Voltar"
        },
        next: {
            1: "Continuar",
            2: "Próximo",
            3: "Quase lá",
            4: "Finalizar"
        }
    }

    return (
        <div className="px-32 py-10 space-y-5">
            <div className="space-y-4">
                <h1 className="font-medium text-4xl">Vamos dar o primeiro passo</h1>
                <p>Conte um pouco sobre você para começarmos</p>
            </div>
            <div>
                <div className="bg-blue3 rounded-t-lg text-white p-3 text-center">
                    W.I.P
                </div>
                <div className="bg-blue4 rounded-b-lg border-black text-center px-8 py-4 space-y-4 ">
                    {step == 1 && <span>Step1</span>}
                    {step == 2 && <span>Step2</span>}
                    {step == 3 && <span>Step3</span>}
                    {step == 4 && <span>Step4</span>}
                    <div className='flex justify-between'>
                        <GenericBlueButton 
                            color={2} 
                            size='md' 
                            {...(step === 1 
                                ? { link: "/" }  // Step 1: vai pra home
                                : { onClick: () => setStep(step - 1) }  // Outros: volta step
                            )}
                        >
                            {buttonTexts.back[step as keyof typeof buttonTexts.back]}
                        </GenericBlueButton>
                        
                        <GenericBlueButton 
                            color={3} 
                            size='md' 
                            {...(step === 4 
                                ? { link: "/candidates/1/dashboard" }  // Step 4: vai pro dashboard
                                : { onClick: () => setStep(step + 1) }  // Outros: avança step
                            )}
                        >
                            {buttonTexts.next[step as keyof typeof buttonTexts.next]}
                        </GenericBlueButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
