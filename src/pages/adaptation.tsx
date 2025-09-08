import GenericBlueButton from "../components/buttons/generic_blue_button";

export default function Adaptation() {
  return (
    <div className="px-20 py-10">
      <h1 className="font-bold text-[2rem] italic">Processo de Adequação</h1>
      <p className="mt-4">
        O Apojobs facilita a conexão entre profissionais PCDs e empresas comprometidas com a inclusão. 
        Nossa plataforma foi desenvolvida para tornar o processo de recrutamento mais acessível, 
        respeitoso e eficiente para todos os envolvidos. Complete seu perfil informando sua área de 
        interesse profissional, formação acadêmica, experiência e necessidades de acessibilidade.
      </p>

      <div className="mt-10">
        <h2 className="font-bold text-[1.5rem] italic">Como se cadastrar para Candidatos:</h2>
        <p className="mt-2">
          Complete seu perfil em 5 etapas: dados pessoais, contato, perfil profissional (formação e 
          experiência), informações de acessibilidade (tipo de necessidade e especificações) e 
          finalização com senha e foto. <strong>Documentos necessários:</strong> CPF, dados de contato, 
          currículo atualizado (opcional), <strong>laudo médico comprobatório da deficiência 
          (obrigatório para utilização da plataforma)</strong> e foto de perfil (opcional). Todas as 
          informações sobre acessibilidade são opcionais e tratadas com confidencialidade. Nossa 
          plataforma conecta automaticamente seu perfil com vagas de empresas que possuem as 
          capacidades de apoio adequadas.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="font-bold text-[1.5rem] italic">Como se cadastrar para Empresas:</h2>
        <p className="mt-2">
          Cadastre sua empresa em 4 etapas: dados corporativos, informações sobre inclusão e 
          capacidades de apoio (acessibilidade arquitetônica, tecnologia assistiva, intérprete de 
          Libras, etc.), e finalização com senha e logo. <strong>Documentos necessários:</strong> CNPJ, 
          razão social, dados do responsável pelo RH, comprovante de endereço da empresa, 
          certificações de inclusão (quando possível) e logo da empresa (opcional). Publique vagas 
          especificando requisitos técnicos e adaptações disponíveis. Facilite o cumprimento da 
          Lei 8.213/91 (Lei de Cotas) conectando-se com profissionais qualificados e promovendo 
          inclusão genuína.
        </p>
      </div>
      
      <div className="mt-10 items-end flex w-full flex-col">
        <div className="space-y-2">
          <p className="font-semibold text-lg italic">Se interessou?</p>
          <GenericBlueButton color={3} link="/auth/entry" size="md">Registre-se agora</GenericBlueButton>
        </div>
      </div>
    </div>
  );
}
