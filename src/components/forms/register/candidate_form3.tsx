import GenericFormField from "../generic_form_field";

export default function CandidateForm3 (){
    return (
        <form className="flex-col text-start space-y-8">
            <h2 className="font-semibold text-[1.3rem]">Perfil Profissional</h2>
            <div>
                <div className="flex flex-1 space-x-12">
                    <div className="flex-[8]">
                        <GenericFormField id="Candidate_scholarship_level_register" type="select" options={['Selecione', 'Não alfabetizado', 'Ensino Fundamental', 'Ensino Médio', 'Ensino Técnico', 'Ensino Superior', 'Pós-graduação', 'Mestrado', 'Doutorado', 'Educação de Jovens e Adultos (EJA)', 'Educação Especial', 'Curso Profissionalizante']}>Nível de Escolaridade</GenericFormField>
                    </div>
                    <div className="flex-[2]">
                        <GenericFormField id="Candidate_scholarship_situation_register" type="select" options={['Selecione', 'Cursando', 'Completo', 'Incompleto', 'Trancado', 'Transferido', 'Abandonado']}>Situação</GenericFormField>
                    </div>
                </div>
            </div>
            <GenericFormField id="Candidate_curriculum_register" type="file">Envie aqui seu currículo</GenericFormField>
        </form>
    )
} 