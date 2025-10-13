import PerfilContentSection from "../components/content/perfil_content_section";
import { useAuth } from "../hooks/useAuth";
import TagContainer from "../components/content/tag_container";
import NotFoundScreen from "../components/content/not_found_screen";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CandidateProfileType } from "../types/candidate";

export default function CandidateProfile(){
    const { user, isAuthenticated, token } = useAuth()
    const { id } = useParams<{ id: string }>()
    const [candidateData, setCandidateData] = useState<CandidateProfileType | null>(null)
    const [barreiras, setBarreiras] = useState<string[]>([])
    
    const isOwnProfile = !id // Se não tem ID na URL, é o próprio perfil
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', {
            month: '2-digit',
            year: 'numeric'
        })
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const url = isOwnProfile 
                    ? `http://localhost:3001/api/candidato/profile`
                    : `http://localhost:3001/api/candidato/${id}/profile`
                
                const headers: Record<string, string> = {
                    'Content-Type': 'application/json'
                }
                
                // Só adiciona token se for próprio perfil
                if (isOwnProfile && token) {
                    headers['Authorization'] = `Bearer ${token}`
                }
                
                const response = await fetch(url, { headers })
                const data = await response.json()
                setCandidateData(data)
                console.log('Profile data:', data)
                
                // Buscar barreiras se houver subtipos
                if (data.subtipos && data.subtipos.length > 0) {
                    const subtipoId = data.subtipos[0].subtipoId
                    await fetchBarreiras(subtipoId)
                }
            } catch (err) {
                console.log('Erro ao buscar perfil:', err)
            }
        }
        
        if (isOwnProfile ? (user?.id && token) : true) {
            fetchProfile()
        }
    }, [user?.id, token, id, isOwnProfile])
    
    const fetchBarreiras = async (subtipoId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/api/barreiras/subtipo/${subtipoId}`)
            const data = await response.json()
            
            // Extrair descrições das barreiras
            const barreiraDescricoes = data.map((barreira: { descricao: string }) => barreira.descricao)
            setBarreiras(barreiraDescricoes)
            
        } catch (error) {
            console.log('Erro ao buscar barreiras:', error)
            setBarreiras([])
        }
    }
    
    if (isOwnProfile && !isAuthenticated) {
        return (
            <NotFoundScreen 
                title="Acesso negado"
                message="Você precisa estar logado para acessar esta página."
                icon="🔒"
            />
        )
    }

    if(candidateData){
        return(
        <div className="px-20 py-10 space-y-8">

            <div className="flex items-center">
                <img src="/img/profile-default.png" alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover mr-5 shadow-xl border-[0.5px]"/>
                <div>
                    <h1 className="font-bold text-[32px]">{candidateData.nome}</h1>
                    <p>
                        {candidateData.areaInteresse} | {candidateData.genero}
                    </p>
                    {candidateData.endereco && (
                        <p className="text-sm text-gray-600">
                            {candidateData.endereco.cidade}, {candidateData.endereco.estado}
                        </p>
                    )}
                </div>
            </div>
            {candidateData.formacoes && candidateData.formacoes.length > 0 && (
                <PerfilContentSection 
                    title="Formação Acadêmica" 
                    info={candidateData.formacoes.map(f => ({
                        formationType: f.tipoFormacao,
                        institut: f.instituicao,
                        course: f.nomeCurso,
                        startDate: formatDate(f.dataInicio),
                        endDate: formatDate(f.dataFim),
                        status: f.situacao,
                        desc: f.descricao
                    }))}
                    description="Histórico educacional e qualificações acadêmicas obtidas"
                />
            )}

            {candidateData.experiencia && candidateData.experiencia.length > 0 && (
                <PerfilContentSection 
                    title="Experiência Profissional" 
                    info={candidateData.experiencia.map(e => ({
                        institut: e.empresa,
                        course: e.cargo,
                        startDate: formatDate(e.dataInicio),
                        endDate: formatDate(e.dataFim),
                        status: "Concluído",
                        desc: e.descricao
                    }))}
                    description="Trajetória profissional e principais conquistas no mercado de trabalho"
                />
            )}


            
            <TagContainer tags={candidateData.habilidades || []}>Habilidades</TagContainer>
            <TagContainer tags={barreiras}>Limitações</TagContainer>

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