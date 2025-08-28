import GenericFormField from "../components/forms/generic_form_field";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import TagContainer from "../components/content/tag_container";
  
export default function JobRegistrationForm() {
  return (
    <div className="my-16 mx-36">
      <div className="p-3 text-white text-[1.5rem] bg-blue3 border border-black min-w-[28rem] rounded-t-lg">
        <h2>
        Cadastre sua vaga
      </h2>
      </div>
      <form className="flex-col text-start space-5 text-blue3 bg-blue1 rounded-b-lg px-4">
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
        <GenericFormField id="job_salary" type="text" placeholder="R$0,00">
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
        <TagContainer tags={["Java", "Python", "C++", "C#", "JavaScript", "PHP", "Ruby", "Go", "Rust", "Swift", "Kotlin", "TypeScript", "Scala", "Perl", "R", "Haskell", "Lua", "Elixir", "Clojure", "Dart", "Julia"]}>
          Habilidades
        </TagContainer>
      </div>
      <div className="flex justify-end p-4">
        <GenericBlueButton color={3}>Cadastrar Vaga</GenericBlueButton>
      </div>
    </form>
    </div>
    
  );
}
