import { useParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import NotFoundScreen from "../components/content/not_found_screen";

interface errorFields {
    title: string,
    icon: string,
    message: string
}

export default function JobView() {
    const { token } = useAuth();
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<errorFields | null>(null)


    useEffect(() => {
        const verifyInscritions = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`${API_BASE_URL}/api/candidaturas/vaga/${id}`, {
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
                        break
                    case 401:
                        setError({
                            title: "Acesso negado",
                            message: "Você não tem permissão para visualizar esta vaga.",
                            icon: "🔒"
                        })
                        break
                    case 402:
                        setError({
                            title: "Pagamento necessário",
                            message: "É necessário realizar um pagamento para acessar este conteúdo.",
                            icon: "💳"
                        })
                        break
                    case 403:
                        setError({
                            title: "Acesso negado",
                            message: "Você não tem permissão para visualizar esta vaga.",
                            icon: "🔒"
                        })
                        break
                    case 404:
                        setError({
                            title: "Vaga não encontrada",
                            message: "A vaga que você está procurando não existe ou foi removida.",
                            icon: "🔍"
                        })
                        break
                    case 200: {
                        const data = await res.json()
                        console.log('Sucesso:', data)
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
        <div className="flex justify-center">
            <h1>Vaga {id}</h1>
        </div>
    )
}