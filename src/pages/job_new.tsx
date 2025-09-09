import GenericFormField from "../components/forms/generic_form_field";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import TagContainer from "../components/content/tag_container";
import { useState } from "react";
import { useParams } from "react-router-dom";
  
export default function JobForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [salario, setSalario] = useState("R$ ");

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSalario(e.target.value);
  };

  return (
    <div className="my-16 mx-64">
      <div className="p-3 text-white text-[1.5rem] bg-blue3 border border-black min-w-[28rem] rounded-t-lg">
        <h2>
        {isEditing ? 'Edite sua vaga' : 'Cadastre sua vaga'}
      </h2>
      </div>
      <form className="flex-col text-start space-5 text-blue3 bg-blue1 rounded-b-lg px-12">
      <div className="p-3 space-y-5">
        <GenericFormField id="job_registration" type="text" placeholder="Titulo da vaga">
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
        <GenericFormField id="job_description" type="textarea" placeholder="Descreva sua vaga aqui...">
          Descrição da vaga
        </GenericFormField>  
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
        <GenericBlueButton color={3}>{isEditing ? 'Salvar Alterações' : 'Cadastrar Vaga'}</GenericBlueButton>
      </div>
    </form>
    </div>
    
  );
}
