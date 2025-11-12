import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import NotFoundScreen from "../components/content/not_found_screen";
import { VagaComCandidaturas } from "../types/vagas/vagaCandidaturas";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import JobPosition from "../components/content/job_position";
import { exportApprovedCandidates } from "../utils/excelExport";
import NotificationModal from "../components/content/notification_modal";

interface errorFields {
    title: string,
    icon: string,
    message: string
}

export default function JobView() {
    const { token } = useAuth();
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<errorFields | null>(null)
    const [jobData, setJobData] = useState<VagaComCandidaturas>()
    const [jobStatus, setJobStatus] = useState(jobData?.status)
    const [selectedCandidatura, setSelectedCandidatura] = useState<VagaComCandidaturas['candidaturas'][0] | null>(null)
    const [expandedSections, setExpandedSections] = useState({
        PENDENTE: true,
        APROVADO: false,
        RECUSADO: false
    })
    const [notificationModal, setNotificationModal] = useState<{
        isOpen: boolean;
        status: 'APROVADO' | 'RECUSADO';
        candidates: VagaComCandidaturas['candidaturas'];
    }>({ isOpen: false, status: 'APROVADO', candidates: [] })

    const handleStatusChange = async (candidaturaId: number, newStatus: 'APROVADO' | 'RECUSADO' | 'PENDENTE') => {
        const originalJobData = jobData

        // Atualização otimista do estado local
        setJobData(prev => {
            if (!prev) return prev
            return {
                ...prev,
                candidaturas: prev.candidaturas.map(c =>
                    c.id === candidaturaId ? { ...c, status: newStatus } : c
                )
            }
        })

        try {
            const response = await fetch(`${API_BASE_URL}/api/candidaturas/${candidaturaId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            })

            if (!response.ok) {
                throw new Error('Falha ao atualizar status')
            }
        } catch (error) {
            // Reverte o estado em caso de erro
            setJobData(originalJobData)
            console.error('Erro ao atualizar status:', error)
        }
    }

    const handleJobStatusChange = () => {
        const currentStatus = jobStatus || jobData?.status
        const newStatus = currentStatus === 'DISPONIVEL' ? "ENCERRADA" : "DISPONIVEL"
        setJobStatus(newStatus)
        
        // Atualiza também o jobData para refletir na UI
        setJobData(prev => prev ? { ...prev, status: newStatus } : prev)

        const updateJobStatus = async () => {
            try{
                const res = await fetch(`${API_BASE_URL}/api/vagas/${id}`, {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: newStatus
                    })
                })
                

                
                if (!res.ok) {
                    console.error('Erro na requisição:', res.status, res.statusText)
                    // Reverte o estado local em caso de erro
                    setJobStatus(currentStatus)
                    setJobData(prev => prev ? { ...prev, status: currentStatus || prev.status } : prev)
                    return
                }
                
                // Sucesso - não precisa processar resposta
                // Candidatura enviada com sucesso

            } catch (error) {
                console.error('Erro ao candidatar-se:', error);
                // Reverte o estado local em caso de erro
                setJobStatus(currentStatus)
                setJobData(prev => prev ? { ...prev, status: currentStatus || prev.status } : prev)
            }
        }

        updateJobStatus()
    }

    const sendNotification = async (title: string, message: string) => {
        try {
            const candidateIds = notificationModal.candidates.map(c => c.candidatoId)
            const url = `${API_BASE_URL}/api/notificacoes`

            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: title,
                    conteudo: message,
                    candidatoIds: candidateIds,
                    remetenteEmpresaId: jobData?.empresaId
                })
            })
            
            if (!response.ok) {
                throw new Error('Falha ao enviar notificação')
            }
            

        } catch (error) {
            console.error('Erro ao enviar notificação:', error)
            throw error
        }
    }

    const toggleSection = (status: 'PENDENTE' | 'APROVADO' | 'RECUSADO') => {
        setExpandedSections(prev => ({
            ...prev,
            [status]: !prev[status]
        }))
    }

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'APROVADO':
                return {
                    bgColor: 'bg-green-100',
                    headerColor: 'bg-green-600',
                    cardBg: 'bg-green-50',
                    cardHover: 'hover:bg-green-100',
                    title: 'Candidaturas Aprovadas'
                }
            case 'RECUSADO':
                return {
                    bgColor: 'bg-red-100',
                    headerColor: 'bg-red-600',
                    cardBg: 'bg-red-50',
                    cardHover: 'hover:bg-red-100',
                    title: 'Candidaturas Encerradas'
                }
            default:
                return {
                    bgColor: 'bg-blue1',
                    headerColor: 'bg-blue3',
                    cardBg: 'bg-blue1',
                    cardHover: 'hover:bg-blue4',
                    title: 'Candidaturas Pendentes'
                }
        }
    }

    useEffect(() => {
        const verifyInscritions = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`${API_BASE_URL}/api/vagas/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                })

                switch (res.status) {
                    case 400:
                        setError({
                            title: "Requisição inválida",
                            message: "Os dados enviados são inválidos. Verifique os parâmetros.",
                            icon: "⚠️"
                        })
                        setLoading(false)
                        break
                    case 401:
                        setError({
                            title: "Acesso negado",
                            message: "Você não tem permissão para visualizar esta vaga.",
                            icon: "🔒"
                        })
                        setLoading(false)
                        break
                    case 402:
                        setError({
                            title: "Pagamento necessário",
                            message: "É necessário realizar um pagamento para acessar este conteúdo.",
                            icon: "💳"
                        })
                        setLoading(false)
                        break
                    case 403:
                        setError({
                            title: "Acesso negado",
                            message: "Você não tem permissão para visualizar esta vaga.",
                            icon: "🔒"
                        })
                        setLoading(false)
                        break
                    case 404:
                        setError({
                            title: "Vaga não encontrada",
                            message: "A vaga que você está procurando não existe ou foi removida.",
                            icon: "🔍"
                        })
                        setLoading(false)
                        break
                    case 200: {
                        const data = await res.json()

                        setJobData(data)
                        setJobStatus(data.status)
                        setLoading(false)
                        break
                    }
                    default:
                        if (!res.ok) {
                            setError({
                                title: "Erro ao carregar",
                                message: "Ocorreu um erro ao carregar os dados. Tente novamente.",
                                icon: "⚠️"
                            })
                            setLoading(false)
                        }
                }
            } catch {
                setError({
                    title: "Erro de conexão",
                    message: "Não foi possível conectar ao servidor. Verifique sua conexão.",
                    icon: "🌐"
                })
                setLoading(false)
            }
        }

        if (id && token) {
            verifyInscritions()
        }
    }, [id, token])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-blue3">Carregando...</div>
            </div>
        )
    }

    if (error) {
        return (
            <NotFoundScreen
                title={error.title}
                icon={error.icon}
                message={error.message}
            />
        )
    }

    return (
        <div className="flex flex-col items-center p-8 max-w-6xl mx-auto">
            <div className="space-y-6 w-full">
                <div className="text-center space-y-6">
                    <div className="relative flex items-center mb-16">
                        <h1 className="text-4xl text-blue3 absolute left-1/2 transform -translate-x-1/2">Visualização <strong>{jobData?.titulo} - <span className={`${jobData?.status === 'DISPONIVEL' ? 'text-green-600' : 'text-red-600'}`}>{jobData?.status}</span></strong></h1>
                        <button className={`p-3 rounded-lg ml-auto ${jobStatus === 'DISPONIVEL' ? "bg-red-500" : "bg-green-500"}`} onClick={() => handleJobStatusChange()}>{jobData?.status === 'DISPONIVEL' ? "Encerrar": "Ativar"}</button>
                    </div>
                    <div className="text-start">
                        <p>Clique na vaga para visualizar e editar </p>
                        {jobData && (
                            <JobPosition jobData={{
                                id: jobData.id,
                                idEmpresa: jobData.empresaId,
                                title: jobData.titulo,
                                company: jobData.empresa.razaoSocial,
                                companyLogo: jobData.empresa.nomeFantasia || "",
                                location: jobData.localizacao,
                                description: jobData.descricao,
                                skillsTags: jobData.habilidades,
                                supportTags: jobData.apoios,
                                compatibility: Math.round((jobData.compatibilidade || 0) * 100),
                                startDate: new Date(jobData.dataInicio),
                                endDate: new Date(jobData.dataFim),
                                typeContract: jobData.tipoContrato,
                                typeWork: jobData.tipoTrabalho,
                                payment: jobData.pagamento,
                                workLevel: jobData.nivelTrabalho,
                                timeShift: jobData.turno,
                                sector: jobData.setor || "",
                                status: jobData.status
                            }} isEditing={true} />
                        )}
                    </div>
                </div>

                {jobData?.candidaturas && jobData.candidaturas.length > 0 ? (
                    <div className="space-y-4">
                        {(['PENDENTE', 'APROVADO', 'RECUSADO'] as const).map(status => {
                            const candidaturasByStatus = jobData.candidaturas.filter(c => c.status === status)
                            if (candidaturasByStatus.length === 0) return null

                            const config = getStatusConfig(status)
                            const isExpanded = expandedSections[status]

                            return (
                                <div key={status}>
                                    {status == 'APROVADO' &&
                                        <div className="flex justify-end gap-2 mb-2">
                                            <button
                                                className="px-4 py-2 bg-green-900 hover:bg-green-950 text-white rounded-lg transition-colors"
                                                onClick={() => setNotificationModal({ 
                                                    isOpen: true, 
                                                    status: 'APROVADO', 
                                                    candidates: candidaturasByStatus 
                                                })}
                                            >
                                                Notificar Aprovados
                                            </button>
                                            <GenericBlueButton color={3} onClick={() => exportApprovedCandidates(candidaturasByStatus, jobData?.titulo || 'vaga')}>Baixar em Planilha</GenericBlueButton>
                                        </div>
                                    }
                                    {status == 'RECUSADO' &&
                                        <div className="flex justify-end mb-2">
                                            <button
                                                className="px-4 py-2 bg-red-900 hover:bg-red-950 text-white rounded-lg transition-colors"
                                                onClick={() => setNotificationModal({ 
                                                    isOpen: true, 
                                                    status: 'RECUSADO', 
                                                    candidates: candidaturasByStatus 
                                                })}
                                            >
                                                Notificar Recusados
                                            </button>
                                        </div>
                                    }
                                    <div key={status} className="rounded-lg overflow-hidden shadow-lg">
                                        <div
                                            className={`${config.headerColor} text-white p-4 cursor-pointer flex justify-between items-center transition-colors hover:opacity-90`}
                                            onClick={() => toggleSection(status)}
                                        >
                                            <h2 className="text-xl font-semibold">
                                                {config.title} ({candidaturasByStatus.length})
                                            </h2>
                                            <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                                ▼
                                            </span>
                                        </div>
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                            <div className={config.bgColor}>
                                                {candidaturasByStatus.map((candidatura, index) => {
                                                    if (!candidatura.candidatoId) return null

                                                    const isEven = index % 2 === 0
                                                    const cardBg = isEven ? config.cardBg : 'bg-white'

                                                    return (
                                                        <div
                                                            key={candidatura.id}
                                                            className={`${cardBg} ${config.cardHover} transition-all duration-200 p-4 cursor-pointer border-b border-gray-200 last:border-b-0`}
                                                            onClick={() => setSelectedCandidatura(candidatura)}
                                                        >
                                                            <div className="flex items-start gap-4">
                                                                <div
                                                                    className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        navigate(`/candidates/${candidatura.candidatoId}/profile/`)
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={`${API_BASE_URL}/api/arquivos/candidato/${candidatura.candidatoId}/foto/view`}
                                                                        alt="Candidato"
                                                                        className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                                                                        onError={(e) => {
                                                                            e.currentTarget.style.display = 'none'
                                                                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                                                                            if (nextElement) nextElement.style.display = 'flex'
                                                                        }}
                                                                    />
                                                                    <span className="text-gray-600 text-lg font-semibold" style={{ display: 'none' }}>
                                                                        C
                                                                    </span>
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                                                        {candidatura.candidato.nome}
                                                                    </h3>
                                                                    <p className="text-gray-600 text-sm line-clamp-2">
                                                                        {candidatura.mensagem || 'Nenhuma mensagem enviada'}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                        {new Date(candidatura.dataCandidatura).toLocaleDateString('pt-BR')}
                                                                    </p>
                                                                </div>
                                                                {status === 'PENDENTE' ? (
                                                                    <div className="flex gap-2 flex-shrink-0">
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                handleStatusChange(candidatura.id, 'APROVADO')
                                                                            }}
                                                                            className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
                                                                            title="Aprovar candidatura"
                                                                        >
                                                                            ✓
                                                                        </button>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                handleStatusChange(candidatura.id, 'RECUSADO')
                                                                            }}
                                                                            className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                                                                            title="Recusar candidatura"
                                                                        >
                                                                            ✕
                                                                        </button>
                                                                    </div>
                                                                ) : status === 'APROVADO' ? (
                                                                    <div className="flex gap-2 flex-shrink-0">
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                handleStatusChange(candidatura.id, 'RECUSADO')
                                                                            }}
                                                                            className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                                                                            title="Reprovar candidatura"
                                                                        >
                                                                            ✕
                                                                        </button>
                                                                    </div>
                                                                ) : status === 'RECUSADO' ? (
                                                                    <div className="flex gap-2 flex-shrink-0">
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                handleStatusChange(candidatura.id, 'APROVADO')
                                                                            }}
                                                                            className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
                                                                            title="Aprovar candidatura"
                                                                        >
                                                                            ✓
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-8 h-8 border-2 border-gray-300 rounded bg-white flex-shrink-0">
                                                                        {/* Espaço para favoritar */}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="bg-blue1 rounded-lg shadow-lg p-8 text-center">
                        <div className="text-gray-500">
                            <span className="text-4xl mb-4 block">📋</span>
                            <h3 className="text-xl font-semibold text-blue3 mb-2">Nenhuma candidatura ainda</h3>
                            <p>Esta vaga ainda não recebeu candidaturas.</p>
                        </div>
                    </div>
                )}

                {/* Modal */}
                {selectedCandidatura && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gradient-to-br from-blue1 to-blue4 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="bg-blue3 text-white p-4 rounded-t-lg">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-2xl font-bold">Detalhes da Candidatura</h2>
                                    <button
                                        onClick={() => setSelectedCandidatura(null)}
                                        className="text-white hover:text-blue1 text-2xl transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-full overflow-hidden bg-blue1 flex items-center justify-center">
                                            <img
                                                src={`${API_BASE_URL}/api/arquivos/candidato/${selectedCandidatura.candidatoId}/foto/view`}
                                                alt="Candidato"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none'
                                                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                                                    if (nextElement) nextElement.style.display = 'flex'
                                                }}
                                            />
                                            <span className="text-blue3 text-xl font-semibold" style={{ display: 'none' }}>
                                                C
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-blue3">{selectedCandidatura.candidato.nome}</h3>
                                            <p className="text-gray-600">ID: {selectedCandidatura.candidatoId}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-blue3 mb-2">Status</h4>
                                            <span className={`px-3 py-1 rounded-full text-sm ${selectedCandidatura.status === 'APROVADO' ? 'bg-green-100 text-green-800' :
                                                selectedCandidatura.status === 'RECUSADO' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {selectedCandidatura.status}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue3 mb-2">Data da Candidatura</h4>
                                            <p>{new Date(selectedCandidatura.dataCandidatura).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-blue3 mb-2">Mensagem</h4>
                                        <p className="bg-white p-3 rounded border border-blue2">
                                            {selectedCandidatura.mensagem || 'Nenhuma mensagem enviada'}
                                        </p>
                                    </div>

                                    <div className="bg-white p-4 rounded border border-blue2">
                                        <h4 className="font-semibold text-blue3 mb-3">Documentos</h4>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const response = await fetch(`${API_BASE_URL}/api/arquivos/candidato/${selectedCandidatura.candidatoId}/curriculo/download`, {
                                                            headers: { 'Authorization': 'Bearer ' + token }
                                                        })
                                                        if (response.ok) {
                                                            const blob = await response.blob()
                                                            const url = window.URL.createObjectURL(blob)
                                                            const link = document.createElement('a')
                                                            link.href = url
                                                            link.download = `curriculo${selectedCandidatura.candidato.nome.split(' ')[0]}${selectedCandidatura.candidatoId}.pdf`
                                                            link.click()
                                                            window.URL.revokeObjectURL(url)
                                                        } else {
                                                            alert('Currículo não encontrado para este candidato.')
                                                        }
                                                    } catch {
                                                        alert('Erro ao tentar baixar o currículo.')
                                                    }
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue3 hover:bg-blue3H text-white rounded-lg transition-colors text-sm"
                                            >
                                                Baixar Currículo
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const response = await fetch(`${API_BASE_URL}/api/arquivos/candidato/${selectedCandidatura.candidatoId}/laudo/download`, {
                                                            headers: { 'Authorization': 'Bearer ' + token }
                                                        })
                                                        if (response.ok) {
                                                            const blob = await response.blob()
                                                            const url = window.URL.createObjectURL(blob)
                                                            const link = document.createElement('a')
                                                            link.href = url
                                                            link.download = `laudo${selectedCandidatura.candidato.nome.split(' ')[0]}${selectedCandidatura.candidatoId}.pdf`
                                                            link.click()
                                                            window.URL.revokeObjectURL(url)
                                                        } else {
                                                            alert('Laudo não encontrado para este candidato.')
                                                        }
                                                    } catch {
                                                        alert('Erro ao tentar baixar o laudo.')
                                                    }
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue3 hover:bg-blue3H text-white rounded-lg transition-colors text-sm"
                                            >
                                                Baixar Laudo
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded border border-blue2 space-y-4">
                                        <h4 className="font-semibold text-blue3 mb-2">Informações Adicionais</h4>
                                        <div className="flex justify-between">
                                            <span>Email: <strong>{selectedCandidatura.candidato.email}</strong></span>
                                            <span>Telefones: <strong>{selectedCandidatura.candidato.telefones.map(tel => tel + " ")}</strong></span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Cidade: <strong>{selectedCandidatura.candidato.endereco?.cidade || 'N/A'}, {selectedCandidatura.candidato.endereco?.estado || 'N/A'}</strong></span>
                                            <span>Bairro: <strong>{selectedCandidatura.candidato.endereco?.bairro || 'N/A'}</strong></span>
                                        </div>
                                        <p className="text-blue3">Para ver habilidades e detalhes completos, acesse o perfil do candidato.</p>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <GenericBlueButton
                                            color={3}
                                            size="md"
                                            onClick={() => window.open(`/candidates/${selectedCandidatura.candidatoId}/profile/`, '_blank')}
                                        >
                                            Ver Perfil Completo
                                        </GenericBlueButton>
                                        <GenericBlueButton
                                            color={2}
                                            size="md"
                                            onClick={() => setSelectedCandidatura(null)}
                                        >
                                            Fechar
                                        </GenericBlueButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <NotificationModal
                isOpen={notificationModal.isOpen}
                onClose={() => setNotificationModal({ ...notificationModal, isOpen: false })}
                onSend={sendNotification}
                candidatesCount={notificationModal.candidates.length}
                status={notificationModal.status}
            />
        </div>
    )
}