// [TODO] - Adicionar a busca de CEP automática (aqui uma api https://viacep.com.br/ws/01001000/json/ ai só mudar os numeros no meio pelo cep)
// [TODO] - Procurar uma api com os estados e cidades automaticamente, talvez no mesmo lugar da cep automatica

import GenericFormField from "../generic_form_field";

export default function CandidateForm2 (){
    return (
        <form className="flex-col text-start space-y-8">
            <h2 className="font-semibold text-[1.3rem]">Informações de Contato</h2>
            <GenericFormField id="candidate_email_register" type="email" placeholder="Digite aqui o seu endereço de e-mail" autoComplete="email">Endereço de Email</GenericFormField>
            <div className="flex space-x-24">
                <GenericFormField id="candidate_telefone1_register" placeholder="Digite aqui um número de telefone ou celular" autoComplete="tel">Telefone 1</GenericFormField>
                <GenericFormField id="candidate_telefone2_register" placeholder="Digite aqui um número de telefone ou celular" autoComplete="tel">Telefone 2</GenericFormField>
            </div>
            <div>
                <p>Endereço</p>
                <div className="bg-blue4 rounded-lg py-6 px-12 border border-blue3 space-y-5"> {/*Verificar possiblidades de cores*/}
                    <div className="w-[30rem] space-y-5">
                        <GenericFormField id="candidate_cep_register" placeholder="Digite aqui o CEP de sua residência" autoComplete="postal-code">CEP</GenericFormField>
                        <div className="flex flex-1 space-x-5">
                            <div className="flex-[3] w-full">
                                <GenericFormField id="candidate_estado_register" type="select" options={['Selecione']}>Estado</GenericFormField>
                            </div>
                            <div className="flex-[7] w-full">
                                <GenericFormField id="candidate_cidade_register" type="select" options={['Selecione']}>Cidade</GenericFormField>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-between space-x-16">
                        <div className="flex flex-col w-full flex-[7] space-y-5">
                            <GenericFormField id="candidate_rua_register" placeholder="Digite aqui a rua" autoComplete="address-line1">Rua</GenericFormField>
                            <GenericFormField id="candidate_complemento_register" placeholder="Digite aqui o complemento" autoComplete="address-line2">Complemento</GenericFormField>
                        </div>
                        <div className="flex flex-col w-full flex-[2] space-y-5">
                            <GenericFormField id="candidate_bairro_register" placeholder="Digite aqui o bairro" autoComplete="address-level2">Bairro</GenericFormField>
                            <GenericFormField id="candidate_numero_register" placeholder="Digite aqui o número">Número</GenericFormField>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}