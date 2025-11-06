import PerfilContentSection from "../components/content/perfil_content_section";
import { useAuth } from "../hooks/useAuth";
import TagContainer from "../components/content/tag_container";
import NotFoundScreen from "../components/content/not_found_screen";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { CandidateProfileType } from "../types/candidate";
import { EditProfileCandidate, FormacaoCandidate, ExperienciaCandidate } from "../types/perfis/candidate";

// Interface para dados vindos do PerfilContentSection
interface InfoType {
    id?: number;
    formationType?: string;
    institut: string;
    course: string;
    startDate: string;
    endDate: string;
    status?: string;
    desc: string;
}
import { API_BASE_URL } from "../config/api";
import GenericBlueButton from "../components/buttons/generic_blue_button";

export default function CandidateProfile() {
    const { user, isAuthenticated, token, isOwnProfile, role } = useAuth()
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

    // Conversão de InfoType para FormacaoCandidate
    const convertInfoToFormacao = (info: InfoType): FormacaoCandidate => ({
        id: info.id,
        candidatoId: user?.id || 0,
        nomeCurso: info.course,
        tipoFormacao: info.formationType || '',
        instituicao: info.institut,
        situacao: info.status || '',
        dataInicio: info.startDate.includes('/') ? new Date(info.startDate.split('/').reverse().join('-')).toISOString() : new Date(info.startDate).toISOString(),
        dataFim: info.endDate.includes('/') ? new Date(info.endDate.split('/').reverse().join('-')).toISOString() : new Date(info.endDate).toISOString(),
        descricao: info.desc
    })

    // Conversão de InfoType para ExperienciaCandidate
    const convertInfoToExperiencia = (info: InfoType): ExperienciaCandidate => ({
        id: info.id,
        candidatoId: user?.id || 0,
        titulo: info.course,
        instituicao: info.institut,
        dataInicio: info.startDate.includes('/') ? new Date(info.startDate.split('/').reverse().join('-')).toISOString() : new Date(info.startDate).toISOString(),
        dataFim: info.endDate.includes('/') ? new Date(info.endDate.split('/').reverse().join('-')).toISOString() : new Date(info.endDate).toISOString(),
        descricao: info.desc,
        tipoContrato: info.formationType || ''
    })

    // Callbacks para atualizar dados do PerfilContentSection
    const handleFormacaoUpdate = (items: InfoType[]) => {
        const formacoes = items.map(convertInfoToFormacao)
        setEditForm(prev => ({ ...prev, formacao: formacoes }))
        
        // Atualizar candidateData localmente para mostrar mudanças imediatamente
        setCandidateData(prev => {
            if (!prev) return null
            return {
                ...prev,
                formacoes: formacoes.map(f => ({
                    id: f.id || 0,
                    candidatoId: f.candidatoId,
                    nomeCurso: f.nomeCurso,
                    tipoFormacao: f.tipoFormacao,
                    instituicao: f.instituicao,
                    situacao: f.situacao,
                    dataInicio: f.dataInicio,
                    dataFim: f.dataFim,
                    descricao: f.descricao,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }))
            }
        })
    }

    const handleExperienciaUpdate = (items: InfoType[]) => {
        const experiencias = items.map(convertInfoToExperiencia)
        setEditForm(prev => ({ ...prev, experiencia: experiencias }))
        
        // Atualizar candidateData localmente para mostrar mudanças imediatamente
        setCandidateData(prev => {
            if (!prev) return null
            return {
                ...prev,
                experiencia: experiencias.map(e => ({
                    id: e.id || 0,
                    candidatoId: e.candidatoId,
                    titulo: e.titulo,
                    instituicao: e.instituicao,
                    dataInicio: e.dataInicio,
                    dataFim: e.dataFim,
                    descricao: e.descricao,
                    tipoContrato: e.tipoContrato,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }))
            }
        })
    }

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
                    id: f.id,
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
                    id: e.id,
                    candidatoId: e.candidatoId,
                    titulo: e.titulo,
                    instituicao: e.instituicao,
                    dataInicio: e.dataInicio,
                    dataFim: e.dataFim,
                    descricao: e.descricao,
                    tipoContrato: e.tipoContrato
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
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            
            // Enviar todas as formações em lote
            if (editForm.formacao.length > 0) {
                const response = await fetch(`${API_BASE_URL}/api/candidato/formacoes/batch`, {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({ formacoes: editForm.formacao })
                })
                const result = await response.json()
                
                if (!response.ok) {
                    throw new Error(`Erro ao salvar formações: ${result.message || response.statusText}`)
                }
            }
            
            // Enviar todas as experiências em lote
            if (editForm.experiencia.length > 0) {
                const response = await fetch(`${API_BASE_URL}/api/candidato/experiencias/batch`, {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({ experiencias: editForm.experiencia })
                })
                const result = await response.json()
                
                if (!response.ok) {
                    throw new Error(`Erro ao salvar experiências: ${result.message || response.statusText}`)
                }
            }

            // Salvar habilidades
            if (editForm.habilidades.length > 0) {
                const response = await fetch(`${API_BASE_URL}/api/candidato/${user?.id}`, {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({ habilidades: editForm.habilidades })
                })
                const result = await response.json()
                
                if (!response.ok) {
                    throw new Error(`Erro ao salvar habilidades: ${result.message || response.statusText}`)
                }
            }
            
            // Recarregar dados do perfil após salvar
            await refreshProfile()
            
        } catch (error) {
            console.error('Erro ao salvar alterações:', error)
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
            alert(`Erro ao salvar: ${errorMessage}`)
        }
    }

    const refreshProfile = useCallback(async () => {
        try {
            const url = isViewingOwnProfile
                ? `${API_BASE_URL}/api/candidato/profile`
                : `${API_BASE_URL}/api/candidato/${id}/profile`

            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            }

            if (isViewingOwnProfile && token) {
                headers['Authorization'] = `Bearer ${token}`
            }

            const response = await fetch(url, { headers })
            const data = await response.json()
            setCandidateData(data)
        } catch (error) {
            console.error('Erro ao recarregar perfil:', error)
        }
    }, [isViewingOwnProfile, token, id])

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true)
            try {
                await refreshProfile()
            } catch (err) {
                console.error('Erro ao buscar perfil:', err)
            } finally {
                setIsLoading(false)
            }
        }

        if (isViewingOwnProfile ? (user?.id && token) : true) {
            fetchProfile()
        }
    }, [user?.id, token, id, isViewingOwnProfile, refreshProfile])

    // Buscar barreiras quando candidateData for carregado
    useEffect(() => {
        if (candidateData?.subtipos && candidateData.subtipos.length > 0) {
            const subtipoId = candidateData.subtipos[0].subtipoId
            fetchBarreiras(subtipoId)
        }
    }, [candidateData])

    const fetchBarreiras = async (subtipoId: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/barreiras/subtipo/${subtipoId}`)
            const data = await response.json()

            // Extrair descrições das barreiras
            const barreiraDescricoes = data.map((barreira: { descricao: string }) => barreira.descricao)
            setBarreiras(barreiraDescricoes)

        } catch (error) {
            console.error('Erro ao buscar barreiras:', error)
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

    if (role === 'ADMIN') {
        return (
            <NotFoundScreen
                title="Acesso negado"
                message="Administradores não podem acessar perfis de candidato."
                icon="🔒"
            />
        )
    }

    if (candidateData) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={`${API_BASE_URL}/api/arquivos/candidato/${isViewingOwnProfile ? user?.id : id}/foto/view`} alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover mr-5 shadow-xl border-[0.5px]" />
                        <div>
                            <h1 className="font-bold text-[32px]">{candidateData.nome}</h1>
                            <p>
                                {candidateData.areaInteresse} | {candidateData.genero}
                            </p>
                            {candidateData.endereco && (
                                <p className="text-sm text-gray-600">
                                    {candidateData.endereco?.cidade || 'N/A'}, {candidateData.endereco?.estado || 'N/A'}
                                </p>
                            )}
                        </div>
                    </div>
                    {isViewingOwnProfile && role !== 'ADMIN' && <div>
                        <GenericBlueButton color={3} size="lg" rounded="lg" onClick={() => handleEditing(isEditing)}>{isEditing ? "Salvar alterações" : "Editar Perfil"}</GenericBlueButton>
                    </div>
                    }
                </div>
                {((candidateData.formacoes && candidateData.formacoes.length > 0) || isEditing) && (
                    <PerfilContentSection
                        title="Formação Acadêmica"
                        type="formacao"
                        info={candidateData.formacoes?.map(f => ({
                            id: f.id,
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
                        onUpdate={handleFormacaoUpdate}
                    />
                )}

                {((candidateData.experiencia && candidateData.experiencia.length > 0) || isEditing) && (
                    <PerfilContentSection
                        title="Experiência Profissional"
                        type="experiencia"
                        info={candidateData.experiencia?.map(e => ({
                            id: e.id,
                            formationType: e.tipoContrato,
                            institut: e.instituicao,
                            course: e.titulo,
                            startDate: formatDate(e.dataInicio),
                            endDate: formatDate(e.dataFim),
                            status: "Concluído",
                            desc: e.descricao
                        })) || []}
                        description="Trajetória profissional e principais conquistas no mercado de trabalho"
                        edit={isEditing}
                        onUpdate={handleExperienciaUpdate}
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