import { useEffect, useState } from "react";
import GenericFormField from "../generic_form_field";
import { CandidateForm2Data } from "../../../types/forms/candidate";
import { useFormValidation } from '../../../hooks/useFormValidation';
import { formatPhone, cleanPhone } from '../../../utils/phone';

export default function CandidateForm2 ({ formFunc, formId, initialData } : {formFunc: (data: CandidateForm2Data) => void, formId: string, initialData?: CandidateForm2Data}){
    const [form2, setForm2] = useState<CandidateForm2Data>(initialData || {} as CandidateForm2Data)
    const [estados, setEstados] = useState<string[]>(['Selecione'])
    const [cidades, setCidades] = useState<string[]>(['Selecione'])
    const [emailError, setEmailError] = useState<string>('')
    const [isCheckingEmail, setIsCheckingEmail] = useState(false)
    const [cepError, setCepError] = useState<string>('')
    
    const { errors, validateForm } = useFormValidation({
        email: { required: true, message: 'Email é obrigatório' },
        phoneNumber1: { required: true, message: 'Telefone 1 é obrigatório' },
        zipCode: { required: true, message: 'CEP é obrigatório' },
        state: { required: true, message: 'Estado é obrigatório' },
        city: { required: true, message: 'Cidade é obrigatória' },
        street: { required: true, message: 'Rua é obrigatória' },
        neighborhood: { required: true, message: 'Bairro é obrigatório' },
        number: { required: true, message: 'Número é obrigatório' }
    })
    
    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
                const data = await response.json()
                
                // Extrai apenas as siglas e ordena alfabeticamente
                const siglas = data.map((estado: { sigla: string }) => estado.sigla).sort()
                setEstados(['Selecione', ...siglas])
            }
            catch (error) {
                console.error("Erro ao buscar estados:", error);
            }
        }
        
        fetchEstados()
    }, [])

    useEffect(() => {
        const fetchCidades = async () => {
            if (form2.state && form2.state !== 'Selecione') {
                try {
                    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form2.state}/municipios`)
                    const data = await response.json()
                    
                    // Extrai apenas os nomes das cidades e ordena alfabeticamente
                    const nomes = data.map((cidade: { nome: string }) => cidade.nome).sort()
                    setCidades(['Selecione', ...nomes])
                } catch (error) {
                    console.error('Erro ao buscar cidades:', error)
                    setCidades(['Selecione'])
                }
            } else {
                setCidades(['Selecione'])
            }
        }
        
        fetchCidades()
    }, [form2.state])

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const cleanValue = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
        
        // Aplica máscara: 12345678 -> 12345-678
        let maskedValue = cleanValue;
        if (cleanValue.length > 5) {
            maskedValue = cleanValue.slice(0, 5) + '-' + cleanValue.slice(5, 8);
        }

        setCepError(''); // Limpa erro anterior
        
        if(cleanValue.length === 8){
            buscarCep(cleanValue);
        }

        // Salva valor com máscara na visualização
        setForm2((prev) => ({...prev, zipCode: maskedValue}))
    };

    const buscarCep = async (value: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${value}/json/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            if (!data.erro) {
                setForm2((prev) => ({
                    ...prev,
                    state: data.uf || "",
                    city: data.localidade || "",
                    street: data.logradouro || "",
                    neighborhood: data.bairro || ""
                }));
            } else {
                console.warn('CEP não encontrado');
            }
        }
        catch (error) {
            console.error("Erro ao buscar CEP:", error);
            setCepError('Erro ao buscar CEP. Preencha os campos manualmente.');
        }
    };

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={async (e) => {
            e.preventDefault();
            
            // Validar campos obrigatórios primeiro
            const formDataForValidation = {
                email: form2.email || '',
                phoneNumber1: form2.phoneNumber1 || '',
                zipCode: form2.zipCode || '',
                state: form2.state || '',
                city: form2.city || '',
                street: form2.street || '',
                neighborhood: form2.neighborhood || '',
                number: form2.number || ''
            };
            
            if (!validateForm(formDataForValidation)) {
                return; // Para aqui se houver erros de validação
            }
            
            // Limpa CEP e telefones antes de enviar para API
            const cleanedData = {
                ...form2,
                zipCode: form2.zipCode?.replace(/\D/g, '') || "",
                phoneNumber1: cleanPhone(form2.phoneNumber1 || ""),
                phoneNumber2: cleanPhone(form2.phoneNumber2 || "")
            };

            setIsCheckingEmail(true)
            setEmailError('')
            
            try{
                const responseEmail = await fetch(`http://localhost:3001/api/auth/check-email?email=${cleanedData.email}`)
                const data = await responseEmail.json();
                
                if(data.exists){
                    setEmailError('Este email já está cadastrado. Tente fazer login.')
                    return
                }
                
                formFunc(cleanedData)
            }
            catch(error){
                console.error("Erro ao verificar email:", error);
                // Se der erro na verificação, continua (pode ser problema de rede)
                formFunc(cleanedData)
            }
            finally {
                setIsCheckingEmail(false)
            }

        }}>
            <h2 className="font-semibold text-[1.3rem]">Informações de Contato</h2>
            <div>
                <GenericFormField id="candidate_email_register" type="email" placeholder="Digite aqui o seu endereço de e-mail" autoComplete="email" required onChange={(e) => setForm2((prev) => ({...prev, email: e.target.value}))} value={form2.email || ""} error={errors.email}>Endereço de Email</GenericFormField>
                {emailError && (
                    <p className="text-red-600 text-sm mt-1">❌ {emailError}</p>
                )}
                {isCheckingEmail && (
                    <p className="text-blue-600 text-sm mt-1">🔄 Verificando email...</p>
                )}
            </div>
            <div className="flex flex-col md:flex-row md:space-x-24 gap-4 md:gap-0">
                <GenericFormField 
                    id="candidate_telefone1_register" 
                    placeholder="(XX) XXXXX-XXXX" 
                    autoComplete="tel" 
                    required  
                    onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        setForm2((prev) => ({...prev, phoneNumber1: formatted}));
                    }} 
                    value={form2.phoneNumber1 || ""} 
                    error={errors.phoneNumber1}
                >
                    Telefone 1
                </GenericFormField>
                <GenericFormField 
                    id="candidate_telefone2_register" 
                    placeholder="(XX) XXXXX-XXXX" 
                    autoComplete="tel"  
                    onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        setForm2((prev) => ({...prev, phoneNumber2: formatted}));
                    }} 
                    value={form2.phoneNumber2 || ""}
                >
                    Telefone 2
                </GenericFormField>
            </div>
            <div>
                <p>Endereço</p>
                <div className="bg-blue4 rounded-lg py-6 px-6 md:px-12 space-y-5"> {/*Verificar possiblidades de cores*/}
                    <div className="w-full max-w-[30rem] space-y-5">
                        <div>
                            <GenericFormField id="candidate_cep_register" placeholder="Digite aqui o CEP de sua residência" autoComplete="postal-code" onChange={handleCepChange} required value={form2.zipCode || ""} error={errors.zipCode}>CEP</GenericFormField>
                            {cepError && (
                                <p className="text-red-600 text-sm mt-1">❌ {cepError}</p>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:flex-1 gap-4 sm:gap-0 sm:space-x-5">
                            <div className="sm:flex-[3] w-full">
                                <GenericFormField 
                                    id="candidate_estado_register" 
                                    type="select" 
                                    options={estados}
                                    onChange={(e) => setForm2((prev) => ({...prev, state: e.target.value}))} 
                                    value={form2.state || ""}
                                    required
                                    error={errors.state}
                                >
                                    Estado
                                </GenericFormField>
                            </div>
                            <div className="sm:flex-[7] w-full">
                                <GenericFormField 
                                    id="candidate_cidade_register" 
                                    type="select" 
                                    options={cidades}
                                    value={form2.city || ""}
                                    onChange={(e) => setForm2((prev) => ({...prev, city: e.target.value}))}
                                    required
                                    error={errors.city}
                                >
                                    Cidade
                                </GenericFormField>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:flex-1 md:justify-between gap-4 md:gap-0 md:space-x-16">
                        <div className="flex flex-col w-full md:flex-[7] space-y-5">
                            <GenericFormField 
                                id="candidate_rua_register" 
                                placeholder="Digite aqui a rua" 
                                autoComplete="address-line1"
                                value={form2.street || ""}
                                onChange={(e) => setForm2((prev) => ({...prev, street: e.target.value}))}
                                required
                                error={errors.street}
                            >
                                Rua
                            </GenericFormField>
                            <GenericFormField id="candidate_complemento_register" placeholder="Digite aqui o complemento" autoComplete="address-line2" onChange={(e) => setForm2((prev) => ({...prev, complement: e.target.value}))} value={form2.complement || ""}>Complemento</GenericFormField>
                        </div>
                        <div className="flex flex-col w-full md:flex-[2] space-y-5">
                            <GenericFormField 
                                id="candidate_bairro_register" 
                                placeholder="Digite aqui o bairro" 
                                autoComplete="address-level2"
                                value={form2.neighborhood || ""}
                                onChange={(e) => setForm2((prev) => ({...prev, neighborhood: e.target.value}))}
                                required
                                error={errors.neighborhood}
                            >
                                Bairro
                            </GenericFormField>
                            <GenericFormField id="candidate_numero_register" placeholder="Digite aqui o número" onChange={(e) => setForm2((prev) => ({...prev, number: e.target.value}))} value={form2.number || ""} required error={errors.number}>Número</GenericFormField>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}