import { useParams } from "react-router-dom";
import PerfilContentSection from "../components/content/perfil_content_section";
import TagContainer from "../components/content/tag_container";
import NotFoundScreen from "../components/content/not_found_screen";
import candidateDataAll from "../data/mockdata/candidate";

export default function CandidateProfile(){
    // Parte especifica para mockdata, atualizar para equivalente do banco posteriormente
    const { id } = useParams()

    const candidateData = candidateDataAll.find(candidato => candidato.id === Number(id))

    if(candidateData){
        return(
        <div className="px-20 py-10 space-y-8">
            <div className="flex items-center">
                <img src="/img/profile-default.png" alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover mr-5 shadow-xl border-[0.5px]"/>
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
    else{
        return(
            <NotFoundScreen 
                title="Candidato não encontrado"
                message="O perfil que você está procurando não existe ou foi removido."
                icon="👤"
            />
        )
    }
}