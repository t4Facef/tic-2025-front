import GenericFormField from '../generic_form_field';

export default function JobRegistrationForm(){
  return(
    <form className='flex-col text-start space-5'>
      <h2 className="font-semibold text-[1.3rem]">Cadastre sua vaga</h2>
      <GenericFormField id='job_registration' type='text'>Nome da vaga</GenericFormField>
       <div className="flex gap-4"> 
        <GenericFormField id="start_date" type="date">
          Início das inscrições
        </GenericFormField>
        <GenericFormField id="end_date" type="date">
          Fim das inscrições
        </GenericFormField>
      </div>
      <GenericFormField id='job_description' type='textarea'>Descrição da vaga</GenericFormField>
      
      <GenericFormField id='job_characteristics' type='radio' options={["Remoto", "Presencial", "Híbrido"]}>Características da vaga</GenericFormField>
      
       <GenericFormField id='job_salary' type='text'>Salário</GenericFormField>
       <GenericFormField id='job_level' type='select' options={["Júnior", "Pleno", "Sênior"]}>Nível da vaga</GenericFormField>
       <GenericFormField id='job_workload' type='text'>Carga Horária</GenericFormField>
    </form>
  )
}