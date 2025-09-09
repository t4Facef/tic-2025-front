// [TODO] - Organizar os dados de mock e types correspondentes em uma pasta types separada
// [TODO] - Adicionar condicionais para se existe ou não um ou resultado para a caixa (se não existir descrição, não mostrar o titulo "descrição" e por ai vai)
// [TODO] - Os dados deveriam vir em vetor, pois pode ter mais de uma formação experiencia etc

import PerfilContentSection from "../components/content/perfil_content_section";
import TagContainer from "../components/content/tag_container";
import candidateData from "../data/mockdata/candidate";

export default function CandidateProfile(){
    return(
        <div className="px-20 py-10 space-y-8">
            <div className="flex items-center">
                <img src="/img/profile-default.png" alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover mr-5"/>
                <div>
                    <h1 className="font-bold text-[32px]">{candidateData.nome}</h1>
                    <p>
                        {candidateData.desc}
                    </p>
                </div>
            </div>
            <PerfilContentSection 
                title="Formação Acadêmica" 
                info={candidateData.education}
                description="Histórico educacional e qualificações acadêmicas obtidas"
            />

            <PerfilContentSection 
                title="Experiência Profissional" 
                info={candidateData.experience}
                description="Trajetória profissional e principais conquistas no mercado de trabalho"
            />

            <PerfilContentSection 
                title="Cursos e Certificações" 
                info={candidateData.courses}
                description="Cursos complementares e certificações para desenvolvimento contínuo"
            />
            
            <TagContainer tags={candidateData.skills}>Habilidades</TagContainer>
            <TagContainer tags={candidateData.barriers}>Limitações</TagContainer>
        </div>
    )
}