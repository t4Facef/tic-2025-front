// [TODO] - Verificar se os dados obrigatorios foram preenchidos
// [TODO] - Adicionar "Tem certeza que deseja cancelar em uma caixinha separada"

import { useState } from 'react'
import GenericBlueButton from '../components/buttons/generic_blue_button'
import StepIndicator from '../components/content/step_indicator'
import CandidateForm1 from '../components/forms/register/candidate_form1'
import CandidateForm2 from '../components/forms/register/candidate_form2'
import CandidateForm3 from '../components/forms/register/candidate_form3'
import CandidateForm4 from '../components/forms/register/candidate_form4'

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
        <div className="px-32 py-10 space-y-10">
            <div className="space-y-4">
                <h1 className="font-medium text-4xl">Vamos dar o primeiro passo</h1>
                <p>Preencha algumas informações para começarmos</p>
            </div>
            <div>
                <div className="bg-blue3 rounded-t-lg text-white p-3 text-center ">
                    <StepIndicator step={step}></StepIndicator>
                </div>
                <div className="bg-blue4 rounded-b-lg border-black text-center px-16 py-4 space-y-12 w-full">
                    {step == 1 && <CandidateForm1/>}
                    {step == 2 && <CandidateForm2/>}
                    {step == 3 && <CandidateForm3/>}
                    {step == 4 && <CandidateForm4/>}
                    <div className='flex justify-between'>
                        <GenericBlueButton 
                            color={3} 
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
