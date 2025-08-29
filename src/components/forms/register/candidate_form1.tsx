import GenericFormField from '../generic_form_field';

export default function CandidateForm1 (){
    return (
        <form className="flex-col text-start space-y-8">
            <h2 className="font-semibold text-[1.3rem]">Informações Pessoais</h2>
            <GenericFormField id="candidate_name_register" type="text" placeholder='Digite aqui o seu nome completo'>Nome completo</GenericFormField>
            <div className="flex justify-between space-x-16">
                <GenericFormField id="candidate_cpf_register" type="text" placeholder='Digite aqui seu CPF'>CPF</GenericFormField>
                <GenericFormField id="candidate_birth_date_register" type="date">Data de Nascimento</GenericFormField>
            </div>
            <div className="flex justify-between space-x-16">
                <GenericFormField id="candidate_sexuality_register" type="select" options={['Selecione', 'Heterossexual', 'Homossexual', 'Bissexual', 'Pansexual', 'Assexual', 'Outro', 'Prefiro não especificar']}>Orientação Sexual</GenericFormField>
                <GenericFormField id="candidate_gender_register" type="select" options={['Selecione', 'Homem cisgênero', 'Mulher cisgênero', 'Homem transgênero', 'Mulher transgênero', 'Não-binário', 'Outro', 'Prefiro não especificar']}>Identidade de Gênero</GenericFormField>
            </div>
        </form>
    )
}