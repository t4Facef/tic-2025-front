// [TODO] - Adicionar "Tem certeza que deseja cancelar em uma caixinha separada"

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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



export default function Register() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<CandidateRegisterData>({} as CandidateRegisterData)
    const [apiMessage, setApiMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

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

    const handlesForm = {
        1: (data: CandidateForm1Data) => {
            setFormData(prev => ({ ...prev, formdata1: data }))
            setStep(2)
        },
        2: (data: CandidateForm2Data) => {
            setFormData(prev => ({ ...prev, formdata2: data }))
            setStep(3)
        },
        3: (data: CandidateForm3Data) => {
            setFormData(prev => ({ ...prev, formdata3: data }))
            setStep(4)
        },
        4: (data: CandidateForm4Data) => {
            setFormData(prev => ({ ...prev, formdata4: data }))
            setStep(5)
        },
        5: (data: CandidateForm5Data) => {
            setIsLoading(true)
            setApiMessage('🔄 Enviando dados...')
            
            const allData = { ...formData.formdata1, ...formData.formdata2, ...formData.formdata3, ...formData.formdata4, ...data }
            
            console.log('🔍 Dados combinados (allData):', allData)
            
            // TEMPORÁRIO: Enviando JSON puro até backend suportar FormData com multer
            const candidateData = {
                nome: allData.name,
                email: allData.email,
                senha: allData.password,
                cpf: allData.cpf,
                dataNascimento: allData.birthDate,
                sexo: allData.sexuality,
                genero: allData.gender,
                telefones: [allData.phoneNumber1, allData.phoneNumber2].filter(Boolean),
                endereco: {
                    cep: allData.zipCode,
                    estado: allData.state,
                    cidade: allData.city,
                    bairro: allData.neighborhood,
                    rua: allData.street,
                    numero: allData.number,
                    complemento: allData.complement
                }
            }
            
            console.log('📤 JSON sendo enviado (candidateData):', candidateData)
            
            const API_BASE_URL = 'http://localhost:3001';
            
            // TEMPORÁRIO: Enviando JSON até backend configurar multer
            fetch(`${API_BASE_URL}/api/auth/candidato/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(candidateData)
            })
            
            /* VERSÃO FINAL: Usar quando backend suportar FormData + multer
            const formDataToSend = new FormData()
            formDataToSend.append('candidateData', JSON.stringify(candidateData))
            if (allData.profilePicture) {
                formDataToSend.append('profilePicture', allData.profilePicture)
            }
            
            fetch(`${API_BASE_URL}/api/auth/candidato/register`, {
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
                localStorage.removeItem('candidateFormData')
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
                <h1 className="font-medium text-4xl">Vamos dar o primeiro passo</h1>
                <p>Preencha algumas informações para começarmos</p>
            </div>
            <div>
                <div className="bg-blue3 rounded-t-lg text-white p-3 text-center ">
                    <StepIndicator step={step} stepsTitles={{ 1: "Dados Pessoais", 2: "Contatos", 3: "Perfil Profissional", 4: "Acessibilidade", 5: "Finalização" }}></StepIndicator>
                </div>
                <div className="bg-blue1 rounded-b-lg border-black text-center px-16 py-7 space-y-12 w-full">
                    {step == 1 && <CandidateForm1 formFunc={handlesForm[1]} formId="step1Form" initialData={formData.formdata1}/>}
                    {step == 2 && <CandidateForm2 formFunc={handlesForm[2]} formId="step2Form" initialData={formData.formdata2}/>}
                    {step == 3 && <CandidateForm3 formFunc={handlesForm[3]} formId="step3Form" initialData={formData.formdata3}/>}
                    {step == 4 && <CandidateForm4 formFunc={handlesForm[4]} formId="step4Form" initialData={formData.formdata4}/>}
                    {step == 5 && <CandidateForm5 formFunc={handlesForm[5]} formId="step5Form" initialData={formData.formdata5}/>}
                    {apiMessage && (
                        <div className={`border-2 p-4 text-center rounded-lg ${
                            apiMessage.includes('❌') 
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
                            {...(step === 5
                                ? { submit: true, form: `step${step}Form` }  // Step 5: submit do formulário
                                : { submit: true, form: `step${step}Form` }  // Outros: submit do formulário
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
