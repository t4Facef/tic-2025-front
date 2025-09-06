// [TODO] - Colocar mais areas no fake data e depois colocar mais no banco
// [TODO] - Colocar uma janelinha caso o número de funcionarios pcds seja muito abaixo da meta

import GenericFormField from "../generic_form_field";

export default function CompanieForm1() {
    return (
        <form className="flex-col text-start space-y-6">
            <h2 className="font-semibold text-[1.3rem]">Informações da Empresa</h2>
            <GenericFormField id="companie_name1_register" placeholder="Digite aqui a razão social">Razão social</GenericFormField>
            <GenericFormField id="companie_name2_register" placeholder="Digite aqui o nome fantasia">Nome fantasia</GenericFormField>
            <div className="flex gap-32">
                <GenericFormField id="companie_cnpj_register" placeholder="Digite aqui o CNPJ">CNPJ</GenericFormField>
                <GenericFormField id="companie_employes_num_register" placeholder="Digite aqui o número de funcinários">Número de funcionários</GenericFormField>
            </div>
            <GenericFormField id="companie_area_register" type="select" options={['Selecione', 'Tecnologia', 'Saúde', 'Educação', 'Financeiro', 'Varejo', 'Indústria', 'Logística', 'Construção', 'Alimentação', 'Consultoria', 'Marketing', 'Recursos Humanos', 'Jurídico', 'Telecomunicações', 'Energia', 'Agronegócio', 'Turismo', 'Outros']}>Area de atuação</GenericFormField>
        </form>
    )
}