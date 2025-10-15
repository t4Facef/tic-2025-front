import PerfilContentSection from "../components/content/perfil_content_section";
import { useAuth } from "../hooks/useAuth";
import TagContainer from "../components/content/tag_container";
import NotFoundScreen from "../components/content/not_found_screen";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CandidateProfileType } from "../types/candidate";
import { API_BASE_URL } from "../config/api";
import GenericBlueButton from "../components/buttons/generic_blue_button";

export default function CandidateProfile() {
    const { user, isAuthenticated, token, isOwnProfile } = useAuth()
    const { id } = useParams<{ id: string }>()
    const [candidateData, setCandidateData] = useState<CandidateProfileType | null>(null)
    const [barreiras, setBarreiras] = useState<string[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const isViewingOwnProfile = !id || (id && isOwnProfile(id))

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', {
            month: '2-digit',
            year: 'numeric'
        })
    }

    const handleEditing = (isEditing: boolean) => {
        if(!isEditing){
            setIsEditing(true)
        }
        else{
            setIsEditing(false)
            //Salvar Alterações
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true)
            try {
                const url = isViewingOwnProfile
                    ? `${API_BASE_URL}/api/candidato/profile`
                    : `${API_BASE_URL}/api/candidato/${id}/profile`

                const headers: Record<string, string> = {
                    'Content-Type': 'application/json'
                }

                // Só adiciona token se for próprio perfil
                if (isViewingOwnProfile && token) {
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
            } finally {
                setIsLoading(false)
            }
        }

        if (isViewingOwnProfile ? (user?.id && token) : true) {
            fetchProfile()
        }
    }, [user?.id, token, id, isViewingOwnProfile])

    const fetchBarreiras = async (subtipoId: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/barreiras/subtipo/${subtipoId}`)
            const data = await response.json()

            // Extrair descrições das barreiras
            const barreiraDescricoes = data.map((barreira: { descricao: string }) => barreira.descricao)
            setBarreiras(barreiraDescricoes)

        } catch (error) {
            console.log('Erro ao buscar barreiras:', error)
            setBarreiras([])
        }
    }

    if (isViewingOwnProfile && !isAuthenticated) {
        return (
            <NotFoundScreen
                title="Acesso negado"
                message="Você precisa estar logado para acessar esta página."
                icon="🔒"
            />
        )
    }

    if (candidateData) {
        return (
            <div className="px-20 py-10 space-y-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="/img/profile-default.png" alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover mr-5 shadow-xl border-[0.5px]" />
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
                    {isViewingOwnProfile && <div>
                        <GenericBlueButton color={3} size="lg" rounded="lg" onClick={() => handleEditing(isEditing)}>{isEditing ? "Salvar alterações" : "Editar Perfil"}</GenericBlueButton>
                    </div>
                    }
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
                        edit={isEditing}
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
                        edit={isEditing}
                    />
                )}



                <TagContainer tags={candidateData.habilidades || []} edit={!!isEditing}>Habilidades</TagContainer>
                <TagContainer tags={barreiras} edit={isEditing}>Limitações</TagContainer>

            </div>
        )
    }
    else if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue3 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando perfil...</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <NotFoundScreen
                title="Candidato não encontrado"
                message="O perfil que você está procurando não existe ou foi removido."
                icon="👤"
            />
        )
    }
}