// [TODO] - Colocar uma janelinha caso o número de funcionarios pcds seja muito abaixo da meta

import { useState } from "react";
import { CompanieForm1Data } from "../../../types/forms/companie";
import GenericFormField from "../generic_form_field";
import { formatCNPJ, validateCNPJ } from "../../../utils/cnpj";
import { useFormValidation } from '../../../hooks/useFormValidation';

export default function CompanieForm1({ formFunc, formId, initialData }: { formFunc: (data: CompanieForm1Data) => void, formId: string, initialData?: CompanieForm1Data }) {
    const [form1, setForm1] = useState<CompanieForm1Data>(initialData || {} as CompanieForm1Data)
    const [cnpjError, setCnpjError] = useState<string>('')
    const [isCheckingCnpj, setIsCheckingCnpj] = useState(false)
    
    const { errors, validateForm } = useFormValidation({
        companyName: { required: true, message: 'Razão social é obrigatória' },
        cnpj: { required: true, message: 'CNPJ é obrigatório' },
        businessSector: { required: true, message: 'Área de atuação é obrigatória' }
    })

    const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const maskedValue = formatCNPJ(e.target.value);
        setForm1((prev) => ({ ...prev, cnpj: maskedValue }));
    }

    return (
        <form id={formId} className="flex-col text-start space-y-6" onSubmit={async (e) => {
            e.preventDefault()
            
            // Validar campos obrigatórios primeiro
            const formDataForValidation = {
                companyName: form1.companyName || '',
                cnpj: form1.cnpj || '',
                businessSector: form1.businessSector || ''
            };
            
            if (!validateForm(formDataForValidation)) {
                return; // Para aqui se houver erros de validação
            }

            setIsCheckingCnpj(true)
            setCnpjError('')

            const cleanedData = {
                ...form1,
                cnpj: form1.cnpj?.replace(/\D/g, '') || ""
            }

            if (validateCNPJ(cleanedData.cnpj)) {
                try {
                    const responseCpf = await fetch(`http://localhost:3001/api/auth/check-cnpj?cnpj=${cleanedData.cnpj}`)
                    const data = await responseCpf.json();

                    if (data.exists) {
                        setCnpjError('Este CNPJ já está cadastrado. Tente fazer login.')
                        return
                    }
                    formFunc(cleanedData)
                }
                catch {
                    // Se der erro na verificação, continua (pode ser problema de rede)
                    formFunc(cleanedData)
                }
                finally {
                    setIsCheckingCnpj(false)
                }
            }
            else {
                setIsCheckingCnpj(false)
                setCnpjError("CNPJ invalido, tente novamente")
            }
        }}>
            <h2 className="font-semibold text-[1.3rem]">Informações da Empresa</h2>
            <GenericFormField id="companie_name1_register" placeholder="Digite aqui a razão social" autoComplete="organization" required onChange={(e) => setForm1((prev) => ({ ...prev, companyName: e.target.value }))} value={form1.companyName || ""} error={errors.companyName}>Razão social</GenericFormField>
            <GenericFormField id="companie_name2_register" placeholder="Digite aqui o nome fantasia" autoComplete="organization" onChange={(e) => setForm1((prev) => ({ ...prev, tradeName: e.target.value }))} value={form1.tradeName || ""}>Nome fantasia</GenericFormField>
            <div className="flex gap-32">
                <div>
                    <GenericFormField id="companie_cnpj_register" placeholder="Digite aqui o CNPJ" required onChange={(e) => handleCnpjChange(e)} value={form1.cnpj || ""} error={errors.cnpj}>CNPJ</GenericFormField>
                    {cnpjError && (
                        <p className="text-red-600 text-sm mt-1">❌ {cnpjError}</p>
                    )}
                    {isCheckingCnpj && (
                        <p className="text-blue-600 text-sm mt-1">🔄 Verificando CNPJ...</p>
                    )}
                </div>
                <div></div>
            </div>
            <GenericFormField id="companie_area_register" type="select" options={['Selecione', 'Tecnologia', 'Saúde', 'Educação', 'Financeiro', 'Varejo', 'Indústria', 'Logística', 'Construção', 'Alimentação', 'Consultoria', 'Marketing', 'Recursos Humanos', 'Jurídico', 'Telecomunicações', 'Energia', 'Agronegócio', 'Turismo', 'Outros']} required onChange={(e) => setForm1((prev) => ({ ...prev, businessSector: e.target.value }))} value={form1.businessSector || ""} error={errors.businessSector}>Area de atuação</GenericFormField>
        </form>
    )
}