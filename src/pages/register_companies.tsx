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
import { CompanieForm1Data, CompanieForm2Data, CompanieForm3Data, CompanieForm4Data, CompanieRegisterData } from '../types/forms/companie'
import { useNavigate } from 'react-router-dom'

export default function RegisterCompanies() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<CompanieRegisterData>({} as CompanieRegisterData)
    const [apiMessage, setApiMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

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

    const handlesForm = {
        1: (data: CompanieForm1Data) => {
            setFormData(prev => ({ ...prev, formdata1: data }))
            setStep(2)
        },
        2: (data: CompanieForm2Data) => {
            setFormData(prev => ({ ...prev, formdata2: data }))
            setStep(3)
        },
        3: (data: CompanieForm3Data) => {
            setFormData(prev => ({ ...prev, formdata3: data }))
            setStep(4)
        },
        4: (data: CompanieForm4Data) => {
            setFormData(prev => ({ ...prev, formdata4: data }))
            setIsLoading(true)
            setApiMessage('🔄 Enviando dados...')

            const allData = { ...formData.formdata1, ...formData.formdata2, ...formData.formdata3, ...formData.formdata4, ...data }

            console.log('🔍 Dados combinados (allData):', allData)

            // TEMPORÁRIO: Enviando JSON puro até backend suportar FormData com multer
            const companieData = {
                // TODO: Mapear campos da empresa quando formulários estiverem prontos
                nome: allData.companyName,
                email: allData.email,
                cnpj: allData.cnpj,
                // Adicionar outros campos conforme necessário
            }

            console.log('📤 JSON sendo enviado (companieData):', companieData)

            const API_BASE_URL = 'http://localhost:3001';

            // TEMPORÁRIO: Enviando JSON até backend configurar multer
            fetch(`${API_BASE_URL}/api/auth/companie/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(companieData)
            })
            
            /* VERSÃO FINAL: Usar quando backend suportar FormData + multer
            const formDataToSend = new FormData()
            formDataToSend.append('companieData', JSON.stringify(companieData))
            if (allData.profilePicture) {
                formDataToSend.append('profilePicture', allData.profilePicture)
            }
            
            fetch(`${API_BASE_URL}/api/auth/companie/register`, {
                method: 'POST',
                body: formDataToSend
            })
            */
                .then(async response => {
                    if (!response.ok) {
                        const errorData = await response.json()
                        const errorMessage = errorData.error || errorData.message || 'Erro desconhecido'
                        throw new Error(errorMessage)
                    }

                    return response.json()
                })
                .then(() => {
                    // Limpar dados do formulário
                    localStorage.removeItem('companieFormData')
                    // Navegar para página de sucesso
                    navigate('/auth/register/success')
                })
                .catch(error => {
                    setApiMessage(`❌ ${error.message}`)
                })
                .finally(() => {
                    setIsLoading(false)
                })
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
                    <StepIndicator step={step} stepsTitles={{ 1: "Dados da Empresa", 2: "Endereço e Contato", 3: "Informações de Inclusão", 4: "Acesso e Segurança" }}></StepIndicator>
                </div>
                <div className="bg-blue1 rounded-b-lg border-black text-center px-16 py-7 space-y-12 w-full">
                    {step == 1 && <CompanieForm1 formFunc={handlesForm[1]} formId="step1Form" initialData={formData.formdata1} />}
                    {step == 2 && <CompanieForm2 formFunc={handlesForm[2]} formId="step2Form" initialData={formData.formdata2} />}
                    {step == 3 && <CompanieForm3 formFunc={handlesForm[3]} formId="step3Form" initialData={formData.formdata3} />}
                    {step == 4 && <CompanieForm4 formFunc={handlesForm[4]} formId="step4Form" initialData={formData.formdata4} />}
                    {apiMessage && (
                        <div className={`border-2 p-4 text-center rounded-lg ${apiMessage.includes('❌')
                                ? 'bg-red-100 border-red-300 text-red-700'
                                : 'bg-blue-100 border-blue-300 text-blue-700'
                            }`}>
                            <p className="text-lg font-medium">{apiMessage}</p>
                        </div>
                    )}
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
                                ? { submit: true, form: `step${step}Form` }  // Step 4: vai pro dashboard
                                : { submit: true, form: `step${step}Form` }  // Outros: avança step
                            )}
                        >
                            {isLoading ? '🔄 Enviando...' : buttonTexts.next[step as keyof typeof buttonTexts.next]}
                        </GenericBlueButton>
                    </div>
                </div>
            </div>
        </div>
    )
}