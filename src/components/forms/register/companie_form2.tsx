import { useEffect, useState } from "react";
import { CompanieForm2Data } from "../../../types/forms/companie";
import GenericFormField from "../generic_form_field";
import { useFormValidation } from '../../../hooks/useFormValidation';
import { formatPhone, cleanPhone } from '../../../utils/phone';

export default function CompanieForm2({ formFunc, formId, initialData }: { formFunc: (data: CompanieForm2Data) => void, formId: string, initialData?: CompanieForm2Data }) {
    const [form2, setForm2] = useState<CompanieForm2Data>(initialData || {} as CompanieForm2Data)
    const [estados, setEstados] = useState<string[]>(['Selecione'])
    const [cidades, setCidades] = useState<string[]>(['Selecione'])
    const [emailError, setEmailError] = useState<string>('')
    const [isCheckingEmail, setIsCheckingEmail] = useState(false)
    
    const { errors, validateForm } = useFormValidation({
        email: { required: true, message: 'Email corporativo é obrigatório' },
        businessPhone: { required: true, message: 'Telefone comercial é obrigatório' },
        postalCode: { required: true, message: 'CEP é obrigatório' },
        state: { required: true, message: 'Estado é obrigatório' },
        city: { required: true, message: 'Cidade é obrigatória' },
        street: { required: true, message: 'Rua é obrigatória' },
        neighborhood: { required: true, message: 'Bairro é obrigatório' },
        streetNumber: { required: true, message: 'Número é obrigatório' }
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

    const buscarCep = async (value: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
            const data = await response.json();

            if (!data.erro) {
                // Salva direto no form2
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
        }
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const cleanValue = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número

        // Aplica máscara: 12345678 -> 12345-678
        let maskedValue = cleanValue;
        if (cleanValue.length > 5) {
            maskedValue = cleanValue.slice(0, 5) + '-' + cleanValue.slice(5, 8);
        }

        if (cleanValue.length === 8) {
            buscarCep(cleanValue);
        }

        // Salva valor com máscara na visualização
        setForm2((prev) => ({ ...prev, postalCode: maskedValue }))
    };

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={async (e) => {
            e.preventDefault();
            
            // Validar campos obrigatórios primeiro
            const formDataForValidation = {
                email: form2.email || '',
                businessPhone: form2.businessPhone || '',
                postalCode: form2.postalCode || '',
                state: form2.state || '',
                city: form2.city || '',
                street: form2.street || '',
                neighborhood: form2.neighborhood || '',
                streetNumber: form2.streetNumber || ''
            };
            
            if (!validateForm(formDataForValidation)) {
                return; // Para aqui se houver erros de validação
            }
            
            // Limpa CEP e telefone antes de enviar para API
            const cleanedData = {
                ...form2,
                zipCode: form2.postalCode?.replace(/\D/g, '') || "",
                businessPhone: cleanPhone(form2.businessPhone || "")
            };

            setIsCheckingEmail(true)
            setEmailError('')

            try {
                const responseEmail = await fetch(`http://localhost:3001/api/auth/check-email?email=${cleanedData.email}`)
                const data = await responseEmail.json();

                if (data.exists) {
                    setEmailError('Este email já está cadastrado. Tente fazer login.')
                    return
                }

                formFunc(cleanedData)
            }
            catch (error) {
                console.error("Erro ao verificar email:", error);
                // Se der erro na verificação, continua (pode ser problema de rede)
                formFunc(cleanedData)
            }
            finally {
                setIsCheckingEmail(false)
            }

        }}>
            <h2 className="font-semibold text-[1.3rem]">Endereço e Contato</h2>
            <div>
                <GenericFormField id="companie_email_register" type="email" placeholder="Digite aqui o e-mail corporativo" autoComplete="email" required onChange={(e) => setForm2((prev) => ({...prev, email: e.target.value}))} value={form2.email || ""} error={errors.email}>E-mail Corporativo</GenericFormField>
                {emailError && (
                    <p className="text-red-600 text-sm mt-1">❌ {emailError}</p>
                )}
                {isCheckingEmail && (
                    <p className="text-blue-600 text-sm mt-1">🔄 Verificando email...</p>
                )}
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-24 gap-4 lg:gap-0">
                <GenericFormField 
                    id="companie_business_phone_register" 
                    type="tel" 
                    placeholder="(XX) XXXXX-XXXX" 
                    autoComplete="tel" 
                    required 
                    onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        setForm2((prev) => ({...prev, businessPhone: formatted}));
                    }} 
                    value={form2.businessPhone || ""} 
                    error={errors.businessPhone}
                >
                    Telefone Comercial
                </GenericFormField>
                <GenericFormField id="companie_website_register" type="text" placeholder="Digite aqui o site da empresa" autoComplete="url" onChange={(e) => setForm2((prev) => ({...prev, website: e.target.value}))} value={form2.website || ""}>Site da Empresa</GenericFormField>
            </div>
            <div>
                <p>Endereço da Empresa</p>
                <div className="bg-blue4 rounded-lg py-6 px-6 md:px-12 space-y-5">
                    <div className="w-full max-w-[30rem] space-y-5">
                        <GenericFormField id="companie_cep_register" placeholder="Digite aqui o CEP da empresa" autoComplete="postal-code" required onChange={(e) => handleCepChange(e)} value={form2.postalCode || ""} error={errors.postalCode}>CEP</GenericFormField>
                        <div className="flex flex-col sm:flex-row sm:flex-1 gap-4 sm:gap-0 sm:space-x-5">
                            <div className="sm:flex-[3] w-full">
                                <GenericFormField id="companie_estado_register" type="select" options={estados} required onChange={(e) => setForm2((prev) => ({...prev, state: e.target.value}))} value={form2.state || ""} error={errors.state}>Estado</GenericFormField>
                            </div>
                            <div className="sm:flex-[7] w-full">
                                <GenericFormField id="companie_cidade_register" type="select" options={cidades} required onChange={(e) => setForm2((prev) => ({...prev, city: e.target.value}))} value={form2.city || ""} error={errors.city}>Cidade</GenericFormField>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:flex-1 md:justify-between gap-4 md:gap-0 md:space-x-16">
                        <div className="flex flex-col w-full md:flex-[7] space-y-5">
                            <GenericFormField id="companie_rua_register" placeholder="Digite aqui a rua" autoComplete="address-line1" required onChange={(e) => setForm2((prev) => ({...prev, street: e.target.value}))} value={form2.street || ""} error={errors.street}>Rua</GenericFormField>
                            <GenericFormField id="companie_complemento_register" placeholder="Digite aqui o complemento" autoComplete="address-line2" onChange={(e) => setForm2((prev) => ({...prev, adressComplement: e.target.value}))} value={form2.adressComplement || ""}>Complemento</GenericFormField>
                        </div>
                        <div className="flex flex-col w-full md:flex-[2] space-y-5">
                            <GenericFormField id="companie_bairro_register" placeholder="Digite aqui o bairro" autoComplete="address-level2" required onChange={(e) => setForm2((prev) => ({...prev, neighborhood: e.target.value}))} value={form2.neighborhood || ""} error={errors.neighborhood}>Bairro</GenericFormField>
                            <GenericFormField id="companie_numero_register" placeholder="Digite aqui o número" required onChange={(e) => setForm2((prev) => ({...prev, streetNumber: e.target.value}))} value={form2.streetNumber || ""} error={errors.streetNumber}>Número</GenericFormField>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}