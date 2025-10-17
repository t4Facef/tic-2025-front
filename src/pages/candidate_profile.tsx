import PerfilContentSection from "../components/content/perfil_content_section";
import { useAuth } from "../hooks/useAuth";
import TagContainer from "../components/content/tag_container";
import NotFoundScreen from "../components/content/not_found_screen";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CandidateProfileType } from "../types/candidate";
import { EditProfileCandidate } from "../types/perfis/candidate";
import { API_BASE_URL } from "../config/api";
import GenericBlueButton from "../components/buttons/generic_blue_button";

export default function CandidateProfile() {
    const { user, isAuthenticated, token, isOwnProfile } = useAuth()
    const { id } = useParams<{ id: string }>()
    const [candidateData, setCandidateData] = useState<CandidateProfileType | null>(null)
    const [barreiras, setBarreiras] = useState<string[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [editForm, setEditForm] = useState<EditProfileCandidate>({
        formacao: [],
        experiencia: [],
        habilidades: []
    })

    const isViewingOwnProfile = !id || (id && isOwnProfile(id))

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', {
            month: '2-digit',
            year: 'numeric'
        })
    }

    const handleEditing = async (isEditing: boolean) => {
        if(!isEditing){
            setIsEditing(true)
            // Inicializar editForm com dados atuais
            setEditForm({
                formacao: candidateData?.formacoes?.map(f => ({
                    candidatoId: f.candidatoId,
                    nomeCurso: f.nomeCurso,
                    tipoFormacao: f.tipoFormacao,
                    instituicao: f.instituicao,
                    situacao: f.situacao,
                    dataInicio: f.dataInicio,
                    dataFim: f.dataFim,
                    descricao: f.descricao
                })) || [],
                experiencia: candidateData?.experiencia?.map(e => ({
                    candidatoId: user?.id || 0,
                    empresa: e.empresa,
                    cargo: e.cargo,
                    dataInicio: e.dataInicio,
                    dataFim: e.dataFim,
                    descricao: e.descricao
                })) || [],
                habilidades: candidateData?.habilidades || []
            })
        }
        else{
            await saveChanges()
            setIsEditing(false)
        }
    }

    const saveChanges = async () => {
        try {
            // 1. Salvar formações
            const formacaoResponse = await fetch(`${API_BASE_URL}/api/candidato/formacoes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ formacoes: editForm.formacao })
            })

            // 2. Salvar experiências
            const experienciaResponse = await fetch(`${API_BASE_URL}/api/candidato/experiencias`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ experiencias: editForm.experiencia })
            })

            // 3. Salvar habilidades
            const habilidadesResponse = await fetch(`${API_BASE_URL}/api/candidato/${user?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ habilidades: editForm.habilidades })
            })

            // Atualizar localmente apenas os que foram salvos com sucesso
            setCandidateData(prev => {
                if (!prev) return null
                
                const updatedData = { ...prev }
                
                // Atualizar formações se salvou com sucesso
                if (formacaoResponse.ok) {
                    updatedData.formacoes = candidateData?.formacoes?.map((f, index) => 
                        editForm.formacao[index] ? {
                            ...f,
                            ...editForm.formacao[index]
                        } : f
                    ) || []
                    console.log('✅ Formações salvas')
                } else {
                    console.error('❌ Erro ao salvar formações')
                }
                
                // Atualizar experiências se salvou com sucesso
                if (experienciaResponse.ok) {
                    updatedData.experiencia = candidateData?.experiencia?.map((e, index) => 
                        editForm.experiencia[index] ? {
                            ...e,
                            ...editForm.experiencia[index]
                        } : e
                    ) || []
                    console.log('✅ Experiências salvas')
                } else {
                    console.error('❌ Erro ao salvar experiências')
                }
                
                // Atualizar habilidades se salvou com sucesso
                if (habilidadesResponse.ok) {
                    updatedData.habilidades = editForm.habilidades
                    console.log('✅ Habilidades salvas')
                } else {
                    console.error('❌ Erro ao salvar habilidades')
                }
                
                return updatedData
            })
            
        } catch (error) {
            console.error('Erro ao salvar alterações:', error)
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
                {((candidateData.formacoes && candidateData.formacoes.length > 0) || isEditing) && (
                    <PerfilContentSection
                        title="Formação Acadêmica"
                        info={candidateData.formacoes?.map(f => ({
                            formationType: f.tipoFormacao,
                            institut: f.instituicao,
                            course: f.nomeCurso,
                            startDate: formatDate(f.dataInicio),
                            endDate: formatDate(f.dataFim),
                            status: f.situacao,
                            desc: f.descricao
                        })) || []}
                        description="Histórico educacional e qualificações acadêmicas obtidas"
                        edit={isEditing}
                    />
                )}

                {((candidateData.experiencia && candidateData.experiencia.length > 0) || isEditing) && (
                    <PerfilContentSection
                        title="Experiência Profissional"
                        info={candidateData.experiencia?.map(e => ({
                            institut: e.empresa,
                            course: e.cargo,
                            startDate: formatDate(e.dataInicio),
                            endDate: formatDate(e.dataFim),
                            status: "Concluído",
                            desc: e.descricao
                        })) || []}
                        description="Trajetória profissional e principais conquistas no mercado de trabalho"
                        edit={isEditing}
                    />
                )}
                <TagContainer 
                    tags={isEditing ? editForm.habilidades : candidateData.habilidades || []} 
                    edit={!!isEditing}
                    onChange={(newHabilidades) => setEditForm((prev) => ({...prev, habilidades: newHabilidades}))}
                >
                    Habilidades
                </TagContainer>
                <TagContainer tags={barreiras} edit={false}>Limitações</TagContainer>

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