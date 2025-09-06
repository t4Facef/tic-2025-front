// [TODO] - Colocar dinamicamente as experiencias e cursos
// [TODO] - Implementar formulario para adicionar novas experiencias, cursos e formações academicas
// [TODO] - Aqui está pedindo poucas informações, preencher o curriculo depois com experiencia profissional, cursos e formações academicas
// [TODO] - Colocar mais opções nos selects a fim de testes no fake data e posteriormente aplicar um fatch no banco
// [TODO] - Incluir a primeira experiencia completa
// [TODO] - Rever as opções para semantica
// [TODO] - Agrupar informaçãos certinho para requisições

import GenericFormField from "../generic_form_field";

export default function CandidateForm3() {
    return (
        <form className="flex-col text-start space-y-8">
            <h2 className="font-semibold text-[1.3rem]">Perfil Profissional</h2>
            <div className="flex flex-1 space-x-12">
                <div className="flex-[8]">
                    <GenericFormField id="Candidate_scholarship_level_register" type="select" options={['Selecione', 'Não alfabetizado', 'Ensino Fundamental', 'Ensino Médio', 'Ensino Técnico', 'Ensino Superior', 'Pós-graduação', 'Mestrado', 'Doutorado', 'Educação de Jovens e Adultos (EJA)', 'Educação Especial', 'Curso Profissionalizante']}>Nível de Escolaridade</GenericFormField>
                </div>
                <div className="flex-[2]">
                    <GenericFormField id="Candidate_scholarship_situation_register" type="select" options={['Selecione', 'Completo', 'Cursando', 'Incompleto', 'Abandonado']}>Situação</GenericFormField>
                </div>
            </div>
            <div className="flex flex-1 space-x-12">
                <div className="flex-[6]">
                    <GenericFormField id="candidate_work_area_register" type="select" options={['Selecione', 'Tecnologia', 'Administração', 'Vendas', 'Marketing', 'Recursos Humanos', 'Financeiro', 'Logística', 'Produção', 'Atendimento', 'Design', 'Educação', 'Saúde', 'Jurídico', 'Engenharia', 'Outros']}>Aréa de Atuação</GenericFormField>
                </div>
                <div className="flex-[6]">
                    <GenericFormField id="candidate_experience_level_register" type="select" options={['Selecione', 'Sem experiência', 'Até 1 ano', '1-3 anos', '3-5 anos', '5-10 anos', 'Mais de 10 anos']}>Nível de Experiência</GenericFormField>
                </div>
            </div>
            <GenericFormField id="candidate_job_type_register" type="select" options={['Selecione', 'CLT', 'PJ', 'Estágio', 'Freelancer', 'Temporário', 'Meio período', 'Integral']}>Tipo de Vaga</GenericFormField>
            <GenericFormField id="Candidate_curriculum_register" type="file">Envie aqui seu currículo</GenericFormField>
        </form>
    )
} 