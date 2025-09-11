// [TODO] - Para a pré visualização, pegar também a foto de perfil da empresa e as formas de suporte

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
    idEmpresa: 1,
    title: '',
    company: 'TechCorp Solutions',
    companyLogo: '/img/logosTeste/teste1.jpeg',
    location: '',
    description: '',
    skillsTags: [],
    supportTags: ["Rampa de acesso", "Elevador", "Banheiro adaptado", "Intérprete de Libras", "Software leitor de tela", "Mesa ajustável"],
    compatibility: 0,
    startDate: new Date(),
    endDate: new Date(),
    typeContract: '',
    typeWork: '',
    payment: '',
    workLevel: '',
    timeShift: ''
  })

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSalario(e.target.value);
    setDataForm(prev => ({ ...prev, payment: e.target.value }))
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    setDataForm(prev => ({ ...prev, description: value }));
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
            <GenericFormField id="job_title" type="text" placeholder="Titulo da vaga" onChange={(e) => setDataForm(prev => ({ ...prev, title: e.target.value }))}>
              Nome da vaga
            </GenericFormField>
            <div className="flex gap-24">
              <GenericFormField id="start_date" type="date" onChange={(e) => setDataForm(prev => ({ ...prev, startDate: new Date(e.target.value) }))}>
                Início das inscrições
              </GenericFormField>
              <GenericFormField id="end_date" type="date" onChange={(e) => setDataForm(prev => ({ ...prev, endDate: new Date(e.target.value) }))}>
                Fim das inscrições
              </GenericFormField>
            </div>
            <MarkdownEditor
              value={description}
              onChange={handleDescriptionChange}
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
              onChange={e => setDataForm(prev => ({ ...prev, workLevel: e.target.value }))}
            >
              Nível da vaga
            </GenericFormField>
            <GenericFormField id="job_workload" type="text" placeholder="Digite o horário de trabalho para o candidato" onChange={e => setDataForm(prev => ({ ...prev, timeShift: e.target.value }))}>
              Horário de trabalho
            </GenericFormField>
            <div>
              <p>Caracteristicas da vaga</p>
              <div className="p-6 bg-blue4 rounded-lg space-y-8">
                <GenericFormField
                  id="job_type_work"
                  type="radio"
                  options={["Remoto", "Presencial", "Híbrido"]}
                  onChange={(e) => setDataForm(prev => ({ ...prev, typeWork: e.target.value }))}
                >
                  <strong>Tipo de Trabalho</strong>
                </GenericFormField>
                <GenericFormField
                  id="job_type_contract"
                  type="radio"
                  options={["CLT", "PJ", "Estágio", "Freelancer", "Temporário"]}
                  onChange={(e) => setDataForm(prev => ({ ...prev, typeContract: e.target.value }))}
                >
                  <strong>Tipo de Contrato</strong>
                </GenericFormField>
              </div>
            </div>
            {["Presencial", "Híbrido"].includes(dataForm.typeWork) &&
              <div>
                <GenericFormField id="job_location" type="text" placeholder="Digite o a cidade onde será a vaga presencial" onChange={e => setDataForm(prev => ({...prev, location: e.target.value}))}>
                  Local de Trabalho
                </GenericFormField>
              </div>
            }

            <TagContainer
              tags={dataForm.skillsTags}
              edit={true}
              onChange={(tags) => setDataForm(prev => ({ ...prev, skillsTags: tags }))}
            >
              Habilidades
            </TagContainer>
            
            <TagContainer
              tags={dataForm.supportTags}
              edit={true}
              onChange={(tags) => setDataForm(prev => ({ ...prev, supportTags: tags }))}
            >
              Apoio da Empresa
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
