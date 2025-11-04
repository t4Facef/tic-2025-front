import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import NotFoundScreen from "../components/content/not_found_screen";
import DeficiencyManager from "../components/admin/deficiency_manager";
import CreateAdminForm from "../components/admin/create_admin_form";
import { TipoDeficiencia } from "../types/admin";
import { API_BASE_URL } from "../config/api";

export default function AdminDashboard() {
    const { user, role, isAuthenticated } = useAuth();
    const [tipos, setTipos] = useState<TipoDeficiencia[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/tipos/com-subtipos`);
                const tiposData = await response.json();
                
                // Para cada subtipo, buscar suas barreiras
                const tiposComBarreiras = await Promise.all(
                    tiposData.map(async (tipo: any) => {
                        const subtiposComBarreiras = await Promise.all(
                            tipo.subtipos.map(async (subtipo: any) => {
                                try {
                                    const barreirasResponse = await fetch(`${API_BASE_URL}/api/barreiras/subtipo/${subtipo.id}`);
                                    const barreiras = await barreirasResponse.json();
                                    
                                    // Para cada barreira, buscar suas acessibilidades
                                    const barreirasComAcess = await Promise.all(
                                        barreiras.map(async (barreira: any) => {
                                            try {
                                                const acessResponse = await fetch(`${API_BASE_URL}/api/acessibilidades/barreira/${barreira.id}`);
                                                const acessibilidades = await acessResponse.json();
                                                return {
                                                    id: barreira.id,
                                                    nome: barreira.descricao,
                                                    subtipoId: subtipo.id,
                                                    acessibilidades: acessibilidades.map((a: any) => ({
                                                        id: a.id,
                                                        nome: a.nome,
                                                        barreiraId: barreira.id
                                                    }))
                                                };
                                            } catch {
                                                return {
                                                    id: barreira.id,
                                                    nome: barreira.descricao,
                                                    subtipoId: subtipo.id,
                                                    acessibilidades: []
                                                };
                                            }
                                        })
                                    );
                                    
                                    return { ...subtipo, barreiras: barreirasComAcess };
                                } catch {
                                    return { ...subtipo, barreiras: [] };
                                }
                            })
                        );
                        return { ...tipo, subtipos: subtiposComBarreiras };
                    })
                );
                
                setTipos(tiposComBarreiras);
            } catch (error) {
                console.error('Erro ao carregar tipos:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated && role === 'ADMIN') {
            fetchTipos();
        }
    }, [isAuthenticated, role]);

    const handleAddTipo = async (nome: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tipos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome })
            });
            if (response.ok) {
                const newTipo = await response.json();
                setTipos(prev => [...prev, { ...newTipo, subtipos: [] }]);
            }
        } catch (error) {
            console.error('Erro ao criar tipo:', error);
        }
    };

    const handleDeleteTipo = async (id: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tipos/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setTipos(prev => prev.filter(tipo => tipo.id !== id));
            }
        } catch (error) {
            console.error('Erro ao deletar tipo:', error);
        }
    };

    const handleAddSubtipo = async (tipoId: number, nome: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/subtipos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, tipoId })
            });
            if (response.ok) {
                const newSubtipo = await response.json();
                setTipos(prev => prev.map(tipo => 
                    tipo.id === tipoId 
                        ? { ...tipo, subtipos: [...tipo.subtipos, { ...newSubtipo, barreiras: [] }] }
                        : tipo
                ));
            }
        } catch (error) {
            console.error('Erro ao criar subtipo:', error);
        }
    };

    const handleDeleteSubtipo = async (id: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/subtipos/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setTipos(prev => prev.map(tipo => ({
                    ...tipo,
                    subtipos: tipo.subtipos.filter(subtipo => subtipo.id !== id)
                })));
            }
        } catch (error) {
            console.error('Erro ao deletar subtipo:', error);
        }
    };

    const handleAddBarreira = async (subtipoId: number, nome: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/barreiras/vincular-subtipo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subtipoId, descricao: nome })
            });
            if (response.ok) {
                const newBarreira = await response.json();
                setTipos(prev => prev.map(tipo => ({
                    ...tipo,
                    subtipos: tipo.subtipos.map(subtipo => 
                        subtipo.id === subtipoId
                            ? { ...subtipo, barreiras: [...(subtipo.barreiras || []), { id: newBarreira.id, nome: newBarreira.descricao, subtipoId, acessibilidades: [] }] }
                            : subtipo
                    )
                })));
            }
        } catch (error) {
            console.error('Erro ao criar barreira:', error);
        }
    };

    const handleDeleteBarreira = async (id: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/barreiras/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setTipos(prev => prev.map(tipo => ({
                    ...tipo,
                    subtipos: tipo.subtipos.map(subtipo => ({
                        ...subtipo,
                        barreiras: (subtipo.barreiras || []).filter(barreira => barreira.id !== id)
                    }))
                })));
            }
        } catch (error) {
            console.error('Erro ao deletar barreira:', error);
        }
    };

    const handleAddAcessibilidade = async (barreiraId: number, nome: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/acessibilidades/vincular-barreira`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ barreiraId, nome })
            });
            if (response.ok) {
                const newAcessibilidade = await response.json();
                setTipos(prev => prev.map(tipo => ({
                    ...tipo,
                    subtipos: tipo.subtipos.map(subtipo => ({
                        ...subtipo,
                        barreiras: (subtipo.barreiras || []).map(barreira => 
                            barreira.id === barreiraId
                                ? { ...barreira, acessibilidades: [...(barreira.acessibilidades || []), { id: newAcessibilidade.id, nome: newAcessibilidade.nome, barreiraId }] }
                                : barreira
                        )
                    }))
                })));
            }
        } catch (error) {
            console.error('Erro ao criar acessibilidade:', error);
        }
    };

    const handleDeleteAcessibilidade = async (id: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/acessibilidades/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setTipos(prev => prev.map(tipo => ({
                    ...tipo,
                    subtipos: tipo.subtipos.map(subtipo => ({
                        ...subtipo,
                        barreiras: (subtipo.barreiras || []).map(barreira => ({
                            ...barreira,
                            acessibilidades: (barreira.acessibilidades || []).filter(acess => acess.id !== id)
                        }))
                    }))
                })));
            }
        } catch (error) {
            console.error('Erro ao deletar acessibilidade:', error);
        }
    };

    if (!isAuthenticated || role !== 'ADMIN') {
        return (
            <NotFoundScreen
                title="Acesso negado"
                message="Você precisa ser um administrador para acessar esta página."
                icon="🔒"
            />
        );
    }

    return (
        <div className="flex flex-col items-center p-8">
            <div className="max-w-6xl w-full">
                <h1 className="text-3xl font-bold text-blue3 mb-8">Painel Administrativo</h1>

                <div className="bg-blue1 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Bem-vindo, {user?.nome}!</h2>
                    <p className="text-gray-700">
                        Gerencie e edite dados do sistema através das ferramentas abaixo.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-xl font-semibold text-blue3 mb-4">Criar Novo Administrador</h3>
                    <CreateAdminForm />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    {loading ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">Carregando dados...</p>
                        </div>
                    ) : (
                        <DeficiencyManager
                            tipos={tipos}
                        onAddTipo={handleAddTipo}
                        onDeleteTipo={handleDeleteTipo}
                        onAddSubtipo={handleAddSubtipo}
                        onDeleteSubtipo={handleDeleteSubtipo}
                        onAddBarreira={handleAddBarreira}
                        onDeleteBarreira={handleDeleteBarreira}
                        onAddAcessibilidade={handleAddAcessibilidade}
                        onDeleteAcessibilidade={handleDeleteAcessibilidade}
                    />
                    )}
                </div>
            </div>
        </div>
    );
}