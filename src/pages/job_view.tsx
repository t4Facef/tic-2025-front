import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import NotFoundScreen from "../components/content/not_found_screen";
import { VagaComCandidaturas } from "../types/vagas/vagaCandidaturas";
import GenericBlueButton from "../components/buttons/generic_blue_button";

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
    const [selectedCandidatura, setSelectedCandidatura] = useState<VagaComCandidaturas['candidaturas'][0] | null>(null)


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
                        console.log('Job data received:', data)
                        setJobData(data)
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
                <div className="text-center space-y-4">
                    <h1 className="text-4xl text-blue3">Visualização <strong>{jobData?.titulo}</strong></h1>
                    <GenericBlueButton color={3} size="mdxMax" link={`/jobs/${id}/edit`}>Editar Vaga</GenericBlueButton>
                </div>
                
                {jobData?.candidaturas && jobData.candidaturas.length > 0 ? (
                    <div className="space-y-4">
                        <div className="bg-blue3 text-white p-4 rounded-t-lg">
                            <h2 className="text-xl font-semibold">Candidatos ({jobData.candidaturas.length})</h2>
                        </div>
                        <div className="grid gap-4">
                            {jobData.candidaturas.map((candidatura) => {
                                console.log('Candidatura completa:', candidatura)
                                if (!candidatura.candidatoId) return null
                                
                                return (
                                    <div 
                                        key={candidatura.id}
                                        className="bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg p-4 cursor-pointer"
                                        onClick={() => setSelectedCandidatura(candidatura)}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div 
                                                className="w-16 h-16 rounded-full overflow-hidden bg-blue1 flex items-center justify-center flex-shrink-0"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    navigate(`/candidate/profile/${candidatura.candidatoId}`)
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
                                                <span className="text-blue3 text-lg font-semibold" style={{display: 'none'}}>
                                                    C
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-blue3 mb-1">
                                                    Candidato {candidatura.candidatoId}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-2">
                                                    {candidatura.mensagem || 'Nenhuma mensagem enviada'}
                                                </p>
                                            </div>
                                            <div className="w-8 h-8 border-2 border-gray-300 rounded bg-white flex-shrink-0">
                                                {/* Espaço para favoritar */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
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
                                            <span className="text-blue3 text-xl font-semibold" style={{display: 'none'}}>
                                                C
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-blue3">Candidato {selectedCandidatura.candidatoId}</h3>
                                            <p className="text-gray-600">ID: {selectedCandidatura.candidatoId}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-blue3 mb-2">Status</h4>
                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                selectedCandidatura.status === 'APROVADO' ? 'bg-green-100 text-green-800' :
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
                                        <h4 className="font-semibold text-blue3 mb-2">Informações Adicionais</h4>
                                        <p className="text-blue3">Para ver habilidades e detalhes completos, acesse o perfil do candidato.</p>
                                    </div>
                                    
                                    <div className="flex gap-3 pt-4">
                                        <GenericBlueButton 
                                            color={3} 
                                            size="md" 
                                            onClick={() => navigate(`/candidate/profile/${selectedCandidatura.candidatoId}`)}
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
        </div>
    )
}