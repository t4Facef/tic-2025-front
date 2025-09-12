// [TODO] - Implementar formulario para adicionar novas experiencias, cursos e formações academicas
// [TODO] - Aqui está pedindo poucas informações, preencher o curriculo depois com experiencia profissional, cursos e formações academicas
// [TODO] - Colocar mais opções nos selects a fim de testes no fake data e posteriormente aplicar um fatch no banco
// [TODO] - Adicionar "nome do curso" dependendo da resposta do tipo de formação

import GenericFormField from "../generic_form_field";
import { useState } from "react";

interface CandidateForm3Data {
    workArea: string;
    educationType: string;
    educationStatus: string;
    courseName: string;
    educationStartDate: string;
    educationEndDate: string;
    educationInstitution: string;
    educationDescription: string;
    jobTitle: string;
    jobType: string;
    companyName: string;
    jobStartDate: string;
    jobEndDate: string;
    jobDescription: string;
    curriculum: File | null;
}

export default function CandidateForm3() {
    const [stillWorking, setStillWorking] = useState(false);
    const [stillStudying, setStillStudying] = useState(false);
    
    const [formData, setFormData] = useState<CandidateForm3Data>({
        workArea: '',
        educationType: '',
        educationStatus: '',
        courseName: '',
        educationStartDate: '',
        educationEndDate: '',
        educationInstitution: '',
        educationDescription: '',
        jobTitle: '',
        jobType: '',
        companyName: '',
        jobStartDate: '',
        jobEndDate: '',
        jobDescription: '',
        curriculum: null
    });

    function handleStillWorking(e: React.ChangeEvent<HTMLInputElement>){
        setStillWorking(e.target.checked)
        if (e.target.checked) {
            const today = new Date().toISOString().split('T')[0];
            setFormData(prev => ({ ...prev, jobEndDate: today }));
        } else {
            setFormData(prev => ({ ...prev, jobEndDate: '' }));
        }
    }

    function handleStillStudying(e: React.ChangeEvent<HTMLInputElement>){
        setStillStudying(e.target.checked)
        if (e.target.checked) {
            const today = new Date().toISOString().split('T')[0];
            setFormData(prev => ({ ...prev, educationEndDate: today }));
        } else {
            setFormData(prev => ({ ...prev, educationEndDate: '' }));
        }
    }

    return (
        <form className="flex-col text-start space-y-8">
            <h2 className="font-semibold text-[1.3rem]">Perfil Profissional</h2>
            
            <GenericFormField id="candidate_work_area_register" type="select" options={['Selecione', 'Tecnologia', 'Administração', 'Vendas', 'Marketing', 'Recursos Humanos', 'Financeiro', 'Logística', 'Produção', 'Atendimento', 'Design', 'Educação', 'Saúde', 'Jurídico', 'Engenharia', 'Outros']}>Área de Interesse Profissional</GenericFormField>
            <div>
                <p className="font-semibold text-lg">Formação Mais Recente</p>
                <div className="bg-blue4 rounded-lg p-4 space-y-6">
                    <div className="flex flex-1 gap-24">
                        <div className="flex-[6]">
                            <GenericFormField id="candidate_education_type_register" type="select" options={['Selecione', 'Sem escolaridade formal', 'Ensino Fundamental', 'Ensino Médio', 'Ensino Técnico', 'Ensino Superior', 'Pós-graduação', 'Mestrado', 'Doutorado', 'Educação de Jovens e Adultos (EJA)', 'Educação Especial', 'Curso Profissionalizante']}>Tipo de Formação</GenericFormField>
                        </div>
                        <div className="flex-[4]">
                            <GenericFormField id="candidate_education_status_register" type="select" options={['Selecione', 'Completo', 'Cursando', 'Incompleto', 'Interrompido']}>Situação</GenericFormField>
                        </div>
                    </div>
                    <GenericFormField id="candidate_course_name_register" placeholder="Digite o nome do curso">Nome do Curso</GenericFormField>
                    <div className="flex gap-4 items-end">
                        <div>
                            <GenericFormField id="candidate_education_start_date_register" type="date">Data de Início</GenericFormField>
                        </div>
                        <div>
                            <GenericFormField id="candidate_education_end_date_register" type="date" disabled={stillStudying} value={formData.educationEndDate}>Data de Conclusão</GenericFormField>
                        </div>
                        <div className="pb-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={stillStudying}
                                    onChange={(e) => handleStillStudying(e)}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">Ainda estudo aqui</span>
                            </label>
                        </div>
                    </div>
                    <GenericFormField id="candidate_education_institution_register" placeholder="Digite o nome da instituição de ensino">Instituição de Ensino</GenericFormField>
                    <GenericFormField id="candidate_education_description_register" type="textarea" placeholder="Descreva sua formação acadêmica">Descrição da Formação</GenericFormField>
                </div>    
            </div>
            <div>
                <p className="font-semibold text-lg">Experiência Profissional Mais Recente</p>
                <div className="bg-blue4 rounded-lg p-4 space-y-6">
                    <div className="flex flex-1 gap-24">
                         <div className="flex-[7]">
                            <GenericFormField id="candidate_job_title_register" placeholder="Digite o cargo da sua experiência mais recente">Cargo/Função</GenericFormField>
                        </div>
                        <div className="flex-[3]">
                            <GenericFormField id="candidate_job_type_register" type="select" options={['Selecione', 'CLT', 'PJ', 'Estágio', 'Freelancer', 'Temporário', 'Meio período', 'Integral']}>Tipo de Contrato</GenericFormField>
                        </div>
                    </div>
                    <GenericFormField id="candidate_company_name_register" placeholder="Digite o nome da empresa">Empresa</GenericFormField>
                    <div className="flex gap-4 items-end">
                        <div>
                            <GenericFormField id="candidate_job_start_date_register" type="date">Data de Início</GenericFormField>
                        </div>
                        <div>
                            <GenericFormField id="candidate_job_end_date_register" type="date" disabled={stillWorking} value={formData.jobEndDate}>Data de Saída</GenericFormField>
                        </div>
                        <div className="pb-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={stillWorking}
                                    onChange={(e) => handleStillWorking(e)}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">Ainda trabalho aqui</span>
                            </label>
                        </div>
                    </div>
                    <GenericFormField id="candidate_job_description_register" type="textarea" placeholder="Descreva suas principais atividades e responsabilidades">Descrição das Atividades</GenericFormField>

                </div>
            </div>
            <GenericFormField id="candidate_curriculum_register" type="file">Anexar Currículo (Opcional)</GenericFormField>
        </form>
    )
} 