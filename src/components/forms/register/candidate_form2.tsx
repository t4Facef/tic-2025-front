// [TODO] - Procurar uma api com os estados e cidades automaticamente, talvez no mesmo lugar da cep automatica

import { useState } from "react";
import GenericFormField from "../generic_form_field";
import { CandidateForm2Data } from "../../../types/forms/candidate";

export default function CandidateForm2 ({ formFunc, formId, initialData } : {formFunc: (data: CandidateForm2Data) => void, formId: string, initialData?: CandidateForm2Data}){
    const [form2, setForm2] = useState<CandidateForm2Data>(initialData || {} as CandidateForm2Data)



    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const cleanValue = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
        
        // Aplica máscara: 12345678 -> 12345-678
        let maskedValue = cleanValue;
        if (cleanValue.length > 5) {
            maskedValue = cleanValue.slice(0, 5) + '-' + cleanValue.slice(5, 8);
        }

        if(cleanValue.length === 8){
            buscarCep(cleanValue);
        }

        // Salva valor com máscara na visualização
        setForm2((prev) => ({...prev, zipCode: maskedValue}))
    };

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
                console.log("CEP encontrado:", data);
            } else {
                console.log("CEP não encontrado");
            }
        }
        catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={(e) => {
            e.preventDefault();
            // Limpa CEP antes de enviar para API
            const cleanedData = {
                ...form2,
                zipCode: form2.zipCode?.replace(/\D/g, '') || ""
            };
            formFunc(cleanedData)
        }}>
            <h2 className="font-semibold text-[1.3rem]">Informações de Contato</h2>
            <GenericFormField id="candidate_email_register" type="email" placeholder="Digite aqui o seu endereço de e-mail" autoComplete="email" required onChange={(e) => setForm2((prev) => ({...prev, email: e.target.value}))} value={form2.email || ""}>Endereço de Email</GenericFormField>
            <div className="flex space-x-24">
                <GenericFormField id="candidate_telefone1_register" placeholder="Digite aqui um número de telefone ou celular" autoComplete="tel" required  onChange={(e) => setForm2((prev) => ({...prev, phoneNumber1: e.target.value}))} value={form2.phoneNumber1 || ""}>Telefone 1</GenericFormField>
                <GenericFormField id="candidate_telefone2_register" placeholder="Digite aqui um número de telefone ou celular" autoComplete="tel"  onChange={(e) => setForm2((prev) => ({...prev, phoneNumber2: e.target.value}))} value={form2.phoneNumber2 || ""}>Telefone 2</GenericFormField>
            </div>
            <div>
                <p>Endereço</p>
                <div className="bg-blue4 rounded-lg py-6 px-12 space-y-5"> {/*Verificar possiblidades de cores*/}
                    <div className="w-[30rem] space-y-5">
                        <GenericFormField id="candidate_cep_register" placeholder="Digite aqui o CEP de sua residência" autoComplete="postal-code" onChange={handleCepChange} required value={form2.zipCode || ""}>CEP</GenericFormField>
                        <div className="flex flex-1 space-x-5">
                            <div className="flex-[3] w-full">
                                <GenericFormField 
                                    id="candidate_estado_register" 
                                    type="select" 
                                    options={['Selecione', form2.state].filter(Boolean)}
                                    onChange={(e) => setForm2((prev) => ({...prev, state: e.target.value}))} 
                                    value={form2.state || ""}
                                    required
                                >
                                    Estado
                                </GenericFormField>
                            </div>
                            <div className="flex-[7] w-full">
                                <GenericFormField 
                                    id="candidate_cidade_register" 
                                    type="select" 
                                    options={['Selecione', form2.city].filter(Boolean)}
                                    value={form2.city || ""}
                                    onChange={(e) => setForm2((prev) => ({...prev, city: e.target.value}))}
                                    required
                                >
                                    Cidade
                                </GenericFormField>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-between space-x-16">
                        <div className="flex flex-col w-full flex-[7] space-y-5">
                            <GenericFormField 
                                id="candidate_rua_register" 
                                placeholder="Digite aqui a rua" 
                                autoComplete="address-line1"
                                value={form2.street || ""}
                                onChange={(e) => setForm2((prev) => ({...prev, street: e.target.value}))}
                                required
                            >
                                Rua
                            </GenericFormField>
                            <GenericFormField id="candidate_complemento_register" placeholder="Digite aqui o complemento" autoComplete="address-line2" onChange={(e) => setForm2((prev) => ({...prev, complement: e.target.value}))} value={form2.complement || ""}>Complemento</GenericFormField>
                        </div>
                        <div className="flex flex-col w-full flex-[2] space-y-5">
                            <GenericFormField 
                                id="candidate_bairro_register" 
                                placeholder="Digite aqui o bairro" 
                                autoComplete="address-level2"
                                value={form2.neighborhood || ""}
                                onChange={(e) => setForm2((prev) => ({...prev, neighborhood: e.target.value}))}
                                required
                            >
                                Bairro
                            </GenericFormField>
                            <GenericFormField id="candidate_numero_register" placeholder="Digite aqui o número" onChange={(e) => setForm2((prev) => ({...prev, number: e.target.value}))} value={form2.number || ""} required>Número</GenericFormField>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}