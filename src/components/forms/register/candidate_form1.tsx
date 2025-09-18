import { useState } from 'react';
import GenericFormField from '../generic_form_field';
import { CandidateForm1Data } from '../../../types/forms/candidate';

export default function CandidateForm1({ formFunc, formId, initialData }: { formFunc: (data: CandidateForm1Data) => void, formId: string, initialData?: CandidateForm1Data }) {
    const [form1, setForm1] = useState<CandidateForm1Data>(initialData || {} as CandidateForm1Data)
    const [cpfError, setCpfError] = useState<string>('')
    const [isCheckingCpf, setIsCheckingCpf] = useState(false)

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={async (e) => {
            e.preventDefault();
            
            setIsCheckingCpf(true)
            setCpfError('')            
            
            try{
                const responseCpf = await fetch(`http://localhost:3001/api/auth/check-cpf?cpf=${form1.cpf}`)
                const data = await responseCpf.json();
                
                if(data.exists){
                    setCpfError('Este CPF já está cadastrado. Tente fazer login.')
                    return
                }
                
                formFunc(form1)
            }
            catch{
                // Se der erro na verificação, continua (pode ser problema de rede)
                formFunc(form1)
            }
            finally {
                setIsCheckingCpf(false)
            }
        }}>
            <h2 className="font-semibold text-[1.3rem]">Informações Pessoais</h2>
            <GenericFormField id="candidate_name_register" type="text" placeholder='Digite aqui o seu nome completo' autoComplete="name" required onChange={(e) => setForm1((prev) => ({ ...prev, name: e.target.value }))} value={form1.name || ""}>Nome completo</GenericFormField>
            <div className="flex justify-between space-x-16">
                <div>
                    <GenericFormField id="candidate_cpf_register" type="text" placeholder='Digite aqui seu CPF' required onChange={(e) => setForm1((prev) => ({ ...prev, cpf: e.target.value }))} value={form1.cpf || ""}>CPF</GenericFormField>
                    {cpfError && (
                        <p className="text-red-600 text-sm mt-1">❌ {cpfError}</p>
                    )}
                    {isCheckingCpf && (
                        <p className="text-blue-600 text-sm mt-1">🔄 Verificando CPF...</p>
                    )}
                </div>
                <GenericFormField id="candidate_birth_date_register" type="date" autoComplete="bday" required onChange={(e) => setForm1((prev) => ({ ...prev, birthDate: e.target.value }))} value={form1.birthDate || ""}>Data de Nascimento</GenericFormField>
            </div>
            <div className="flex justify-between space-x-16">
                <GenericFormField id="candidate_sexuality_register" type="select" options={['Selecione', 'Heterossexual', 'Homossexual', 'Bissexual', 'Pansexual', 'Assexual', 'Outro', 'Prefiro não especificar']} onChange={(e) => setForm1((prev) => ({ ...prev, sexuality: e.target.value }))} value={form1.sexuality || ""}>Orientação Sexual</GenericFormField>
                <GenericFormField id="candidate_gender_register" type="select" options={['Selecione', 'Homem cisgênero', 'Mulher cisgênero', 'Homem transgênero', 'Mulher transgênero', 'Não-binário', 'Outro', 'Prefiro não especificar']} required onChange={(e) => setForm1((prev) => ({ ...prev, gender: e.target.value }))} value={form1.gender || ""}>Identidade de Gênero</GenericFormField>
            </div>
        </form>
    )
}