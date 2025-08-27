import GenericFormField from '../generic_form_field';

export default function CandidateForm1 (){
    return (
        <form className="flex-col text-start space-y-5">
            <h2 className="font-semibold text-[1.3rem]">Informações Pessoais</h2>
            <GenericFormField id="candidate_name_register" type="text">Nome completo</GenericFormField>
            <div className="flex justify-between space-x-16">
                <GenericFormField id="candidate_cpf_register" type="text">CPF</GenericFormField>
                <GenericFormField id="candidate_birth_date_register" type="date">Data de Nascimento</GenericFormField>
            </div>
            <div className="flex justify-between space-x-16">
                <GenericFormField>Sexualidade</GenericFormField>
                <GenericFormField>Gênero</GenericFormField>
            </div>
        </form>
    )
}