// [TODO] - Adicionar a busca de CEP automática (aqui uma api https://viacep.com.br/ws/01001000/json/ ai só mudar os numeros no meio pelo cep)
// [TODO] - Procurar uma api com os estados e cidades automaticamente, talvez no mesmo lugar da cep automatica

import { CompanieForm2Data } from "../../../types/forms/companie";
import GenericFormField from "../generic_form_field";

export default function CompanieForm2({ formFunc, formId, initialData }: { formFunc: (data: CompanieForm2Data) => void, formId: string, initialData?: CompanieForm2Data }) {
    return (
        <form className="flex-col text-start space-y-8">
            <h2 className="font-semibold text-[1.3rem]">Endereço e Contato</h2>
            <GenericFormField id="companie_email_register" type="email" placeholder="Digite aqui o e-mail corporativo" autoComplete="email" required>E-mail Corporativo</GenericFormField>
            <div className="flex space-x-24">
                <GenericFormField id="companie_telefone_register" placeholder="Digite aqui o telefone comercial" autoComplete="tel" required>Telefone Comercial</GenericFormField>
                <GenericFormField id="companie_website_register" placeholder="Digite aqui o site da empresa">Site da Empresa</GenericFormField>
            </div>
            <div>
                <p>Endereço da Empresa</p>
                <div className="bg-blue4 rounded-lg py-6 px-12 space-y-5">
                    <div className="w-[30rem] space-y-5">
                        <GenericFormField id="companie_cep_register" placeholder="Digite aqui o CEP da empresa" autoComplete="postal-code" required>CEP</GenericFormField>
                        <div className="flex flex-1 space-x-5">
                            <div className="flex-[3] w-full">
                                <GenericFormField id="companie_estado_register" type="select" options={['Selecione']} required>Estado</GenericFormField>
                            </div>
                            <div className="flex-[7] w-full">
                                <GenericFormField id="companie_cidade_register" type="select" options={['Selecione']} required>Cidade</GenericFormField>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-between space-x-16">
                        <div className="flex flex-col w-full flex-[7] space-y-5">
                            <GenericFormField id="companie_rua_register" placeholder="Digite aqui a rua" autoComplete="address-line1" required>Rua</GenericFormField>
                            <GenericFormField id="companie_complemento_register" placeholder="Digite aqui o complemento" autoComplete="address-line2">Complemento</GenericFormField>
                        </div>
                        <div className="flex flex-col w-full flex-[2] space-y-5">
                            <GenericFormField id="companie_bairro_register" placeholder="Digite aqui o bairro" autoComplete="address-level2" required>Bairro</GenericFormField>
                            <GenericFormField id="companie_numero_register" placeholder="Digite aqui o número" required>Número</GenericFormField>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}