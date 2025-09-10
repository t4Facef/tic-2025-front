import GenericFormField from "../components/forms/generic_form_field";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import TagContainer from "../components/content/tag_container";
import MarkdownEditor from "../components/forms/markdown_editor";
import { useState } from "react";
import { useParams } from "react-router-dom";
import JobPosition from "../components/content/job_position";
import { JobData } from "../data/mockdata/jobs";

export default function JobForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [salario, setSalario] = useState("R$ ");
  const [description, setDescription] = useState("");

  const [dataForm, setDataForm] = useState<JobData>({
    id: 0,
    idEmpresa: 0,
    title: '',
    company: '',
    companyLogo: '',
    location: '',
    type: '',
    description: '',
    skillsTags: [],
    supportTags: [],
    compatibility: 0
  })

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSalario(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Dados do formulário:", dataForm);
  };

  return (
    <div className="my-16 mx-64 space-y-8">
      <div>
        <div className="p-3 text-white text-[1.5rem] bg-blue3 border border-black min-w-[28rem] rounded-t-lg">
        <h2>
          {isEditing ? 'Edite sua vaga' : 'Cadastre sua vaga'}
        </h2>
      </div>
      <form className="flex-col text-start space-5 text-blue3 bg-blue1 rounded-b-lg px-12">
        <div className="p-3 space-y-5">
          <GenericFormField id="job_registration" type="text" placeholder="Titulo da vaga" onChange={(e) => setDataForm(prev => ({...prev, title: e.target.value}))}>
            Nome da vaga
          </GenericFormField>
          <div className="flex gap-24">
            <GenericFormField id="start_date" type="date">
              Início das inscrições
            </GenericFormField>
            <GenericFormField id="end_date" type="date">
              Fim das inscrições
            </GenericFormField>
          </div>
          <MarkdownEditor
            value={description}
            onChange={setDescription}
            placeholder="Descreva sua vaga aqui..."
            label="Descrição da vaga"
          />
          <GenericFormField
            id="job_salary"
            type="currency"
            placeholder="R$ 0,00"
            value={salario}
            onChange={handleSalarioChange}
          >
            Salário
          </GenericFormField>
          <GenericFormField
            id="job_level"
            type="select"
            options={["Estágio", "Júnior", "Pleno", "Sênior"]}
          >
            Nível da vaga
          </GenericFormField>
          <GenericFormField id="job_workload" type="text" placeholder="Horas">
            Carga Horária
          </GenericFormField>
          <GenericFormField
            id="job_characteristics"
            type="radio"
            options={["Remoto", "Presencial", "Híbrido"]}
          >
            Características da vaga
          </GenericFormField>
          <TagContainer tags={[]} edit={true}>
            Habilidades
          </TagContainer>
        </div>
        <div className="flex justify-end p-4">
          <GenericBlueButton color={3} onClick={handleSubmit}>{isEditing ? 'Salvar Alterações' : 'Cadastrar Vaga'}</GenericBlueButton>
        </div>
      </form>
      </div>
      
      <div>
        <h3 className="font-medium">Pré-visualização da Vaga</h3>
        <JobPosition jobData={dataForm}></JobPosition>
      </div>
    </div>
  );
}
