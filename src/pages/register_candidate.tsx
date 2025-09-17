// [TODO] - Adicionar "Tem certeza que deseja cancelar em uma caixinha separada"
// [TODO] - Geral para todos os formulários separados, verificar quais serão obrigatórios ou não, colocar verificação no front e adicinar erro caso não tenho todos os necessários
// [TODO] - Fazer com que os dado persistam entre os steps do formulário

import { useState } from 'react'
import GenericBlueButton from '../components/buttons/generic_blue_button'
import StepIndicator from '../components/content/step_indicator'
import CandidateForm1 from '../components/forms/register/candidate_form1'
import CandidateForm2 from '../components/forms/register/candidate_form2'
import CandidateForm3 from '../components/forms/register/candidate_form3'
import CandidateForm4 from '../components/forms/register/candidate_form4'
import CandidateForm5 from '../components/forms/register/candidate_form5'
import { 
  CandidateRegisterData, 
  CandidateForm1Data, 
  CandidateForm2Data, 
  CandidateForm3Data, 
  CandidateForm4Data, 
  CandidateForm5Data 
} from '../types/forms/candidate'



export default function Register(){
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<CandidateRegisterData>({} as CandidateRegisterData)
    
    // Mapeamento dos textos dos botões baseado no step
    const buttonTexts = {
        back: {
            1: "Cancelar",
            2: "Voltar", 
            3: "Voltar",
            4: "Voltar",
            5: "voltar"
        },
        next: {
            1: "Continuar",
            2: "Próximo",
            3: "Próximo",
            4: "Quase lá",
            5: "Finalizar"
        }
    }

    const buttonFunctions = {
        back: {
        },
        next: {
            1: (data: CandidateRegisterData) => setFormData(...data, )
        }
    }

    return (
        <div className="px-52 py-10 space-y-10">
            <div className="space-y-4">
                <h1 className="font-medium text-4xl">Vamos dar o primeiro passo</h1>
                <p>Preencha algumas informações para começarmos</p>
            </div>
            <div>
                <div className="bg-blue3 rounded-t-lg text-white p-3 text-center ">
                    <StepIndicator step={step} stepsTitles={{1: "Dados Pessoais", 2: "Contatos", 3: "Perfil Profissional", 4: "Acessibilidade", 5: "Finalização"}}></StepIndicator>
                </div>
                <div className="bg-blue1 rounded-b-lg border-black text-center px-16 py-7 space-y-12 w-full">
                    {step == 1 && <CandidateForm1/>}
                    {step == 2 && <CandidateForm2/>}
                    {step == 3 && <CandidateForm3/>}
                    {step == 4 && <CandidateForm4/>}
                    {step == 5 && <CandidateForm5/>}
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
                            {...(step === 5 
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
