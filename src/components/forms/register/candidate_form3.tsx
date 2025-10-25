import { EDUCATION_STATUS, EDUCATION_TYPES } from "../../../data/constants/select_options";
import { CandidateForm3Data } from "../../../types/forms/candidate";
import GenericFormField from "../generic_form_field";
import { useState } from "react";

export default function CandidateForm3({ formFunc, formId, initialData, fileStorage }: { formFunc: (data: CandidateForm3Data) => void, formId: string, initialData?: CandidateForm3Data, fileStorage: { saveFile: (key: string, file: File) => void, hasFile: (key: string) => boolean, getFile: (key: string) => File | undefined } }) {
    const [form3, setForm3] = useState<CandidateForm3Data>(initialData || {} as CandidateForm3Data)
    const [stillWorking, setStillWorking] = useState(false)

    function handleStillWorking(e: React.ChangeEvent<HTMLInputElement>) {
        setStillWorking(e.target.checked)
        if (e.target.checked) {
            const today = new Date().toISOString().split('T')[0];
            setForm3(prev => ({ ...prev, jobEndDate: today }));
        } else {
            setForm3(prev => ({ ...prev, jobEndDate: '' }));
        }
    }

    const handleFileUpload = (file: File, tipo: string) => {
        fileStorage.saveFile(tipo, file)
    }

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={(e) => {
            e.preventDefault();
            formFunc(form3)
        }}>
            <h2 className="font-semibold text-[1.3rem]">Perfil Profissional</h2>

            <GenericFormField id="candidate_work_area_register" type="select" options={['Selecione', 'Tecnologia', 'Administração', 'Vendas', 'Marketing', 'Recursos Humanos', 'Financeiro', 'Logística', 'Produção', 'Atendimento', 'Design', 'Educação', 'Saúde', 'Jurídico', 'Engenharia', 'Outros']} required onChange={(e) => setForm3((prev) => ({ ...prev, workArea: e.target.value }))} value={form3.workArea || ""}>Área de Interesse Profissional</GenericFormField>
            <div>
                <p className="font-semibold text-lg">Formação Mais Recente</p>
                <div className="bg-blue4 rounded-lg p-4 space-y-6">
                    <div className="flex flex-1 gap-24">
                        <div className="flex-[6]">
                            <GenericFormField id="candidate_education_type_register" type="select" options={EDUCATION_TYPES} placeholder="Selecione" onChange={(e) => setForm3((prev) => ({ ...prev, educationType: e.target.value }))} value={form3.educationType || ""}>Tipo de Formação</GenericFormField>
                        </div>
                        <div className="flex-[4]">
                            <GenericFormField id="candidate_education_status_register" type="select" options={EDUCATION_STATUS} placeholder="Selecione" onChange={(e) => setForm3((prev) => ({ ...prev, educationStatus: e.target.value }))} value={form3.educationStatus || ""}>Situação</GenericFormField>
                        </div>
                    </div>
                    <GenericFormField id="candidate_course_name_register" placeholder="Digite o nome do curso" onChange={(e) => setForm3((prev) => ({ ...prev, courseName: e.target.value }))} value={form3.courseName || ""}>Nome do Curso</GenericFormField>
                    <div className="flex gap-4">
                        <div>
                            <GenericFormField id="candidate_education_start_date_register" type="date" onChange={(e) => setForm3((prev) => ({ ...prev, educationStartDate: e.target.value }))} value={form3.educationStartDate || ""}>Data de Início</GenericFormField>
                        </div>
                        <div>
                            <GenericFormField id="candidate_education_end_date_register" type="date" onChange={(e) => setForm3((prev) => ({ ...prev, educationEndDate: e.target.value }))} value={form3.educationEndDate || ""}>Data de Término Prevista</GenericFormField>
                        </div>
                    </div>
                    <GenericFormField id="candidate_education_institution_register" placeholder="Digite o nome da instituição de ensino" onChange={(e) => setForm3((prev) => ({ ...prev, educationInstitution: e.target.value }))} value={form3.educationInstitution || ""}>Instituição de Ensino</GenericFormField>
                    <GenericFormField id="candidate_education_description_register" type="textarea" placeholder="Descreva sua formação acadêmica" onChange={(e) => setForm3((prev) => ({ ...prev, educationDescription: e.target.value }))} value={form3.educationDescription || ""}>Descrição da Formação</GenericFormField>
                </div>
            </div>
            <div>
                <p className="font-semibold text-lg">Experiência Profissional Mais Recente</p>
                <div className="bg-blue4 rounded-lg p-4 space-y-6">
                    <div className="flex flex-1 gap-24">
                        <div className="flex-[7]">
                            <GenericFormField id="candidate_job_title_register" placeholder="Digite o cargo da sua experiência mais recente" onChange={(e) => setForm3((prev) => ({ ...prev, jobTitle: e.target.value }))} value={form3.jobTitle || ""}>Cargo/Função</GenericFormField>
                        </div>
                        <div className="flex-[3]">
                            <GenericFormField id="candidate_job_type_register" type="select" options={['Selecione', 'CLT', 'PJ', 'Estágio', 'Freelancer', 'Temporário', 'Meio período', 'Integral']} onChange={(e) => setForm3((prev) => ({ ...prev, jobType: e.target.value }))} value={form3.jobType || ""}>Tipo de Contrato</GenericFormField>
                        </div>
                    </div>
                    <GenericFormField id="candidate_company_name_register" placeholder="Digite o nome da empresa" onChange={(e) => setForm3((prev) => ({ ...prev, companyName: e.target.value }))} value={form3.companyName || ""}>Empresa</GenericFormField>
                    <div className="flex gap-4 items-end">
                        <div>
                            <GenericFormField id="candidate_job_start_date_register" type="date" onChange={(e) => setForm3((prev) => ({ ...prev, jobStartDate: e.target.value }))} value={form3.jobStartDate || ""}>Data de Início</GenericFormField>
                        </div>
                        <div>
                            {stillWorking ? (
                                <div className="flex flex-col w-full">
                                    <label className="text-left">Data de Saída</label>
                                    <div className="border border-gray-400 rounded-md p-2 bg-gray-200 text-gray-600">
                                        Emprego atual
                                    </div>
                                </div>
                            ) : (
                                <GenericFormField id="candidate_job_end_date_register" type="date" onChange={(e) => setForm3((prev) => ({ ...prev, jobEndDate: e.target.value }))} value={form3.jobEndDate || ""}>Data de Saída</GenericFormField>
                            )}
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
                    <GenericFormField id="candidate_job_description_register" type="textarea" placeholder="Descreva suas principais atividades e responsabilidades" onChange={(e) => setForm3((prev) => ({ ...prev, jobDescription: e.target.value }))} value={form3.jobDescription || ""}>Descrição das Atividades</GenericFormField>

                </div>
            </div>
            <div>
                <GenericFormField 
                    id="candidate_curriculum_register" 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) {
                            setForm3((prev) => ({ ...prev, curriculum: file }))
                            handleFileUpload(file, 'curriculo')
                        }
                    }}
                >
                    Anexar Currículo (Opcional)
                </GenericFormField>
                {fileStorage.hasFile('curriculo') && (
                    <p className="text-green-600 text-sm mt-1">✅ Arquivo salvo: {fileStorage.getFile('curriculo')?.name}</p>
                )}
            </div>
        </form>
    )
}