import { useParams } from "react-router-dom";
import PerfilContentSection from "../components/content/perfil_content_section";
import TagContainer from "../components/content/tag_container";
import candidateDataAll from "../data/mockdata/candidate";

export default function CandidateProfile(){
    // Parte especifica para mockdata, atualizar para equivalente do banco posteriormente
    const { id } = useParams()

    const candidateData = candidateDataAll.find(candidato => candidato.id === Number(id))

    if(candidateData){
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
    else{
        return(
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-20 py-10">
                <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto mb-6 bg-blue1 rounded-full flex items-center justify-center">
                        <span className="text-4xl text-blue3">👤</span>
                    </div>
                    <h1 className="text-2xl font-bold text-blue3">Candidato não encontrado</h1>
                    <p className="text-gray-600 max-w-md">
                        O perfil que você está procurando não existe ou foi removido.
                    </p>
                    <button 
                        onClick={() => window.history.back()}
                        className="mt-6 px-6 py-2 bg-blue2 text-white rounded-lg hover:bg-blue3 transition-colors"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        )
    }
}