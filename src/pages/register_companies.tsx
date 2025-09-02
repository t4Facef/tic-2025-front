// [TODO] - Verificar se os dados obrigatorios foram preenchidos
// [TODO] - Adicionar "Tem certeza que deseja cancelar em uma caixinha separada"
// [TODO] - Geral para todos os formulários separados, verificar quais serão obrigatórios ou não, colocar verificação no front e adicinar erro caso não tenho todos os necessários
// [TODO] - Fazer com que os dado persistam entre os steps do formulário

import { useState } from 'react'
import GenericBlueButton from '../components/buttons/generic_blue_button'
import StepIndicator from '../components/content/step_indicator'
import CompanieForm1 from '../components/forms/register/companie_form1'
import CompanieForm2 from '../components/forms/register/companie_form2'
import CompanieForm3 from '../components/forms/register/companie_form3'
import CompanieForm4 from '../components/forms/register/companie_form4'

export default function RegisterCompanies(){
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
            3: "Próximo",
            4: "Finalizar"
        }
    }

    return (
        <div className="px-52 py-10 space-y-10">
            <div className="space-y-4">
                <h1 className="font-medium text-4xl">Cadastro da Empresa</h1>
                <p>Preencha as informações da sua empresa para começarmos</p>
            </div>
            <div>
                <div className="bg-blue3 rounded-t-lg text-white p-3 text-center ">
                    <StepIndicator step={step} stepsTitles={{1: "Dados da Empresa", 2: "Endereço e Contato", 3: "Informações de Inclusão", 4: "Acesso e Segurança"}}></StepIndicator>
                </div>
                <div className="bg-blue1 rounded-b-lg border-black text-center px-16 py-7 space-y-12 w-full">
                    {step == 1 && <CompanieForm1/>}
                    {step == 2 && <CompanieForm2/>}
                    {step == 3 && <CompanieForm3/>}
                    {step == 4 && <CompanieForm4/>}
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
                                ? { link: "/companies/1/dashboard" }  // Step 4: vai pro dashboard
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