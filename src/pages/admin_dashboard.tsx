import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import NotFoundScreen from "../components/content/not_found_screen";
import CreateAdminForm from "../components/admin/create_admin_form";
import { API_BASE_URL } from "../config/api";
import { 
    Layers, 
    Users, 
    Shield, 
    Plus, 
    Edit, 
    Trash2, 
    ChevronRight,
    ArrowLeft,
    CheckCircle
} from "lucide-react";

type ViewMode = 'overview' | 'tipos' | 'subtipos' | 'barreiras' | 'acessibilidades' | 'admin';
type EntityData = {
    id: number;
    nome: string;
    parentId?: number;
    parentName?: string;
    count?: number;
};

export default function AdminDashboard() {
    const { role, isAuthenticated } = useAuth();
    const [currentView, setCurrentView] = useState<ViewMode>('overview');
    const [selectedParent, setSelectedParent] = useState<EntityData | null>(null);
    const [breadcrumb, setBreadcrumb] = useState<EntityData[]>([]);
    
    // Data states
    const [tipos, setTipos] = useState<EntityData[]>([]);
    const [subtipos, setSubtipos] = useState<EntityData[]>([]);
    const [barreiras, setBarreiras] = useState<EntityData[]>([]);
    const [acessibilidades, setAcessibilidades] = useState<EntityData[]>([]);
    
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [editingItem, setEditingItem] = useState<EntityData | null>(null);
    const [editingName, setEditingName] = useState('');
    
    // Statistics
    const [totalStats, setTotalStats] = useState({
        tipos: 0,
        subtipos: 0,
        barreiras: 0,
        acessibilidades: 0
    });

    // Navigation functions
    const navigateTo = (view: ViewMode, parent?: EntityData) => {
        setCurrentView(view);
        setSelectedParent(parent || null);
        setShowAddForm(false);
        setEditingItem(null);
        setNewItemName('');
        setEditingName('');

        // Update breadcrumb
        const newBreadcrumb: EntityData[] = [];
        if (parent) {
            newBreadcrumb.push(parent);
        }
        setBreadcrumb(newBreadcrumb);
    };

    const goBack = () => {
        switch (currentView) {
            case 'subtipos':
                navigateTo('tipos');
                break;
            case 'barreiras':
                navigateTo('subtipos', breadcrumb[0]);
                if (breadcrumb[0]) fetchSubtipos(breadcrumb[0].id);
                break;
            case 'acessibilidades':
                navigateTo('barreiras', breadcrumb[0]);
                if (breadcrumb[0]) fetchBarreiras(breadcrumb[0].id);
                break;
            case 'admin':
                navigateTo('overview');
                break;
            default:
                navigateTo('overview');
                break;
        }
    };

    // Data fetching functions
    const fetchTotalStats = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/estatisticas/admin`);
            const data = await response.json();
            
            setTotalStats({
                tipos: data.tipos,
                subtipos: data.subtipos,
                barreiras: data.barreiras,
                acessibilidades: data.acessibilidades
            });
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    };

    const fetchTipos = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/tipos`);
            const data = await response.json();
            
            // Get counts for each tipo
            const tiposWithCounts = await Promise.all(
                data.map(async (tipo: { id: number; nome: string }) => {
                    try {
                        const subtiposResponse = await fetch(`${API_BASE_URL}/api/subtipos/tipoId/${tipo.id}`);
                        const subtiposData = await subtiposResponse.json();
                        return { ...tipo, count: subtiposData.length };
                    } catch {
                        return { ...tipo, count: 0 };
                    }
                })
            );
            
            setTipos(tiposWithCounts);
        } catch (error) {
            console.error('Erro ao carregar tipos:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubtipos = async (tipoId: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/subtipos/tipoId/${tipoId}`);
            const data = await response.json();
            
            // Get counts for each subtipo
            const subtiposWithCounts = await Promise.all(
                data.map(async (subtipo: { id: number; nome: string }) => {
                    try {
                        const barreirasResponse = await fetch(`${API_BASE_URL}/api/barreiras/subtipo/${subtipo.id}`);
                        const barreirasData = await barreirasResponse.json();
                        return { ...subtipo, count: barreirasData.length };
                    } catch {
                        return { ...subtipo, count: 0 };
                    }
                })
            );
            
            setSubtipos(subtiposWithCounts);
        } catch (error) {
            console.error('Erro ao carregar subtipos:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBarreiras = async (subtipoId: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/barreiras/subtipo/${subtipoId}`);
            const data = await response.json();
            
            // Get counts for each barreira
            const barreirasWithCounts = await Promise.all(
                data.map(async (barreira: { id: number; descricao: string }) => {
                    try {
                        const acessResponse = await fetch(`${API_BASE_URL}/api/acessibilidades/barreira/${barreira.id}`);
                        const acessData = await acessResponse.json();
                        return { 
                            id: barreira.id, 
                            nome: barreira.descricao, 
                            count: acessData.length 
                        };
                    } catch {
                        return { 
                            id: barreira.id, 
                            nome: barreira.descricao, 
                            count: 0 
                        };
                    }
                })
            );
            
            setBarreiras(barreirasWithCounts);
        } catch (error) {
            console.error('Erro ao carregar barreiras:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAcessibilidades = async (barreiraId: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/acessibilidades/barreira/${barreiraId}`);
            const data = await response.json();
            setAcessibilidades(data);
        } catch (error) {
            console.error('Erro ao carregar acessibilidades:', error);
        } finally {
            setLoading(false);
        }
    };

    // CRUD operations
    const handleAdd = async () => {
        if (!newItemName.trim()) return;

        try {
            let endpoint = '';
            let body: Record<string, unknown> = { nome: newItemName };

            switch (currentView) {
                case 'tipos':
                    endpoint = '/api/tipos';
                    break;
                case 'subtipos':
                    endpoint = '/api/subtipos';
                    body.tipoId = selectedParent?.id;
                    break;
                case 'barreiras':
                    endpoint = '/api/barreiras/vincular-subtipo';
                    body = { subtipoId: selectedParent?.id, descricao: newItemName };
                    break;
                case 'acessibilidades':
                    endpoint = '/api/acessibilidades/vincular-barreira';
                    body = { barreiraId: selectedParent?.id, nome: newItemName };
                    break;
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                setShowAddForm(false);
                setNewItemName('');
                // Refresh current view
                refreshCurrentView();
                // Show success message
                alert('Item adicionado com sucesso!');
            } else {
                const errorData = await response.text();
                console.error('Erro ao adicionar item:', errorData);
                alert('Erro ao adicionar item. Verifique os dados inseridos.');
            }
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            alert('Erro ao adicionar item. Verifique o console para mais detalhes.');
        }
    };

    const handleEdit = async () => {
        if (!editingItem || !editingName.trim()) return;

        try {
            let endpoint = '';
            let body: Record<string, unknown> = {};

            switch (currentView) {
                case 'tipos':
                    endpoint = `/api/tipos/${editingItem!.id}`;
                    body = { nome: editingName };
                    break;
                case 'subtipos':
                    endpoint = `/api/subtipos/${editingItem!.id}`;
                    body = { nome: editingName };
                    break;
                case 'barreiras':
                    endpoint = `/api/barreiras/${editingItem!.id}`;
                    body = { descricao: editingName };
                    break;
                case 'acessibilidades':
                    endpoint = `/api/acessibilidades/${editingItem!.id}`;
                    body = { nome: editingName };
                    break;
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                setEditingItem(null);
                setEditingName('');
                refreshCurrentView();
                // Show success message
                alert('Item editado com sucesso!');
            } else {
                const errorText = await response.text();
                console.error('Erro ao editar item:', errorText);
                
                // Check if it's a "not implemented" error
                if (response.status === 404 || errorText.includes('Cannot PUT')) {
                    alert('Funcionalidade de edição ainda não implementada no backend para este item.');
                } else {
                    alert('Erro ao editar item. Verifique se os dados estão corretos.');
                }
            }
        } catch (error) {
            console.error('Erro ao editar item:', error);
            alert('Erro de conexão ao editar item.');
        }
    };

    const handleDelete = async (item: EntityData) => {
        if (!confirm(`Tem certeza que deseja excluir "${item.nome}"?`)) return;

        try {
            let endpoint = '';
            switch (currentView) {
                case 'tipos':
                    endpoint = `/api/tipos/${item.id}`;
                    break;
                case 'subtipos':
                    endpoint = `/api/subtipos/${item.id}`;
                    break;
                case 'barreiras':
                    endpoint = `/api/barreiras/${item.id}`;
                    break;
                case 'acessibilidades':
                    endpoint = `/api/acessibilidades/${item.id}`;
                    break;
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                refreshCurrentView();
                alert('Item excluído com sucesso!');
            } else {
                const errorData = await response.text();
                console.error('Erro ao excluir item:', errorData);
                alert('Erro ao excluir item. Verifique se não há dependências.');
            }
        } catch (error) {
            console.error('Erro ao excluir item:', error);
            alert('Erro ao excluir item. Verifique o console para mais detalhes.');
        }
    };

    const refreshCurrentView = () => {
        switch (currentView) {
            case 'tipos':
                fetchTipos();
                break;
            case 'subtipos':
                if (selectedParent) fetchSubtipos(selectedParent.id);
                break;
            case 'barreiras':
                if (selectedParent) fetchBarreiras(selectedParent.id);
                break;
            case 'acessibilidades':
                if (selectedParent) fetchAcessibilidades(selectedParent.id);
                break;
        }
    };

    useEffect(() => {
        if (currentView === 'tipos') {
            fetchTipos();
        } else if (currentView === 'overview') {
            fetchTotalStats();
        }
    }, [currentView]);

    const getCurrentData = () => {
        switch (currentView) {
            case 'tipos': return tipos;
            case 'subtipos': return subtipos;
            case 'barreiras': return barreiras;
            case 'acessibilidades': return acessibilidades;
            default: return [];
        }
    };

    const getCurrentTitle = () => {
        switch (currentView) {
            case 'tipos': return 'Tipos de Deficiência';
            case 'subtipos': return `Subtipos de ${selectedParent?.nome}`;
            case 'barreiras': return `Barreiras de ${selectedParent?.nome}`;
            case 'acessibilidades': return `Acessibilidades de ${selectedParent?.nome}`;
            case 'admin': return 'Gerenciar Administradores';
            default: return 'Painel Administrativo';
        }
    };

    const getNextView = (currentView: ViewMode): ViewMode | null => {
        switch (currentView) {
            case 'tipos': return 'subtipos';
            case 'subtipos': return 'barreiras';
            case 'barreiras': return 'acessibilidades';
            default: return null;
        }
    };

    if (!isAuthenticated || role !== 'ADMIN') {
        return (
            <NotFoundScreen
                title="Acesso negado"
                message="Você precisa ser um administrador para acessar esta página."
                icon="X"
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-3 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 lg:mb-6 p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4 lg:mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-2 lg:space-y-0">
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                                {getCurrentTitle()}
                            </h1>
                            {(currentView !== 'overview' && currentView !== 'admin') && (
                                <div className="flex flex-wrap items-center gap-1 lg:gap-2 text-xs lg:text-sm text-gray-600">
                                    <button 
                                        onClick={() => navigateTo('overview')}
                                        className="text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
                                    >
                                        Início
                                    </button>
                                    
                                    {currentView === 'tipos' && (
                                        <>
                                            <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                            <span className="font-medium text-gray-800">Tipos de Deficiência</span>
                                        </>
                                    )}
                                    
                                    {currentView === 'subtipos' && (
                                        <>
                                            <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                            <button 
                                                onClick={() => navigateTo('tipos')}
                                                className="text-blue-600 hover:text-blue-800 whitespace-nowrap"
                                            >
                                                Tipos
                                            </button>
                                            {selectedParent && (
                                                <>
                                                    <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                                    <span className="font-medium text-gray-800 truncate max-w-32 lg:max-w-none">{selectedParent.nome}</span>
                                                </>
                                            )}
                                        </>
                                    )}
                                    
                                    {currentView === 'barreiras' && (
                                        <>
                                            <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                            <button 
                                                onClick={() => navigateTo('tipos')}
                                                className="text-blue-600 hover:text-blue-800 whitespace-nowrap"
                                            >
                                                Tipos
                                            </button>
                                            {selectedParent && (
                                                <>
                                                    <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                                    <button 
                                                        onClick={() => {
                                                            navigateTo('subtipos', selectedParent);
                                                            fetchSubtipos(selectedParent.id);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800 truncate max-w-24 lg:max-w-none"
                                                    >
                                                        {selectedParent.nome}
                                                    </button>
                                                    <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                                    <span className="font-medium text-gray-800">Barreiras</span>
                                                </>
                                            )}
                                        </>
                                    )}
                                    
                                    {currentView === 'acessibilidades' && (
                                        <>
                                            <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                            <button 
                                                onClick={() => navigateTo('tipos')}
                                                className="text-blue-600 hover:text-blue-800 whitespace-nowrap"
                                            >
                                                Tipos
                                            </button>
                                            {selectedParent && (
                                                <>
                                                    <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                                    <button 
                                                        onClick={() => {
                                                            navigateTo('subtipos', selectedParent);
                                                            fetchSubtipos(selectedParent.id);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800 truncate max-w-24 lg:max-w-none"
                                                    >
                                                        {selectedParent.nome}
                                                    </button>
                                                    <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                                    <button 
                                                        onClick={() => {
                                                            navigateTo('barreiras', selectedParent);
                                                            fetchBarreiras(selectedParent.id);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800 whitespace-nowrap"
                                                    >
                                                        Barreiras
                                                    </button>
                                                    <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                                    <span className="font-medium text-gray-800">Acessibilidades</span>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        {currentView !== 'overview' && currentView !== 'admin' && (
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg flex items-center space-x-1 lg:space-x-2 transition-colors text-sm lg:text-base"
                            >
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">Adicionar</span>
                                <span className="sm:hidden">+</span>
                            </button>
                        )}
                    </div>

                    {/* Navigation */}
                    {currentView !== 'overview' && (
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={goBack}
                                className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>
                                    {currentView === 'admin' ? 'Voltar ao Overview' :
                                     currentView === 'tipos' ? 'Voltar ao Overview' :
                                     currentView === 'subtipos' ? 'Voltar aos Tipos' :
                                     currentView === 'barreiras' ? 'Voltar aos Subtipos' : 'Voltar às Barreiras'}
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Overview Cards */}
                {currentView === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-6">
                        <div 
                            onClick={() => navigateTo('tipos')}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 lg:p-3 bg-blue-50 rounded-lg">
                                    <Layers className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
                                </div>
                                <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">Tipos de Deficiência</h3>
                            <p className="text-sm lg:text-base text-gray-600">Gerenciar categorias principais</p>
                        </div>

                        <div 
                            onClick={() => navigateTo('admin')}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 lg:p-3 bg-green-50 rounded-lg">
                                    <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                                </div>
                                <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                            </div>
                            <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">Administradores</h3>
                            <p className="text-sm lg:text-base text-gray-600">Criar novos administradores</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 md:col-span-2 xl:col-span-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 lg:p-3 bg-purple-50 rounded-lg">
                                    <Users className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas do Sistema</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center space-x-2 lg:space-x-3 min-w-0">
                                        <div className="p-1 lg:p-2 bg-blue-100 rounded flex-shrink-0">
                                            <Layers className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
                                        </div>
                                        <span className="text-xs lg:text-sm font-medium text-gray-700 truncate">Tipos</span>
                                    </div>
                                    <span className="text-lg lg:text-2xl font-bold text-blue-600 ml-2">{totalStats.tipos}</span>
                                </div>
                                
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center space-x-2 lg:space-x-3 min-w-0">
                                        <div className="p-1 lg:p-2 bg-green-100 rounded flex-shrink-0">
                                            <div className="h-3 w-3 lg:h-4 lg:w-4 bg-green-600 rounded-sm"></div>
                                        </div>
                                        <span className="text-xs lg:text-sm font-medium text-gray-700 truncate">Subtipos</span>
                                    </div>
                                    <span className="text-lg lg:text-2xl font-bold text-green-600 ml-2">{totalStats.subtipos}</span>
                                </div>
                                
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                    <div className="flex items-center space-x-2 lg:space-x-3 min-w-0">
                                        <div className="p-1 lg:p-2 bg-orange-100 rounded flex-shrink-0">
                                            <Shield className="h-3 w-3 lg:h-4 lg:w-4 text-orange-600" />
                                        </div>
                                        <span className="text-xs lg:text-sm font-medium text-gray-700 truncate">Barreiras</span>
                                    </div>
                                    <span className="text-lg lg:text-2xl font-bold text-orange-600 ml-2">{totalStats.barreiras}</span>
                                </div>
                                
                                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                    <div className="flex items-center space-x-2 lg:space-x-3 min-w-0">
                                        <div className="p-1 lg:p-2 bg-purple-100 rounded flex-shrink-0">
                                            <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-purple-600" />
                                        </div>
                                        <span className="text-xs lg:text-sm font-medium text-gray-700 truncate">Acessibilidades</span>
                                    </div>
                                    <span className="text-lg lg:text-2xl font-bold text-purple-600 ml-2">{totalStats.acessibilidades}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Form */}
                {showAddForm && currentView !== 'admin' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4 lg:p-6">
                        <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">
                            Adicionar {currentView === 'tipos' ? 'Tipo' : 
                                     currentView === 'subtipos' ? 'Subtipo' :
                                     currentView === 'barreiras' ? 'Barreira' : 'Acessibilidade'}
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                            <input
                                type="text"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                placeholder="Nome do item"
                                className="flex-1 px-3 py-2 lg:px-4 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm lg:text-base"
                            />
                            <button
                                onClick={handleAdd}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 lg:px-6 lg:py-2 rounded-lg flex items-center space-x-1 lg:space-x-2 transition-colors text-sm lg:text-base"
                            >
                                <CheckCircle className="h-4 w-4" />
                                <span className="hidden sm:inline">Salvar</span>
                                <span className="sm:hidden">✓</span>
                            </button>
                            <button
                                onClick={() => {setShowAddForm(false); setNewItemName('');}}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 lg:px-6 lg:py-2 rounded-lg flex items-center space-x-1 lg:space-x-2 transition-colors text-sm lg:text-base"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

                {/* Admin Management */}
                {currentView === 'admin' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <CreateAdminForm />
                    </div>
                )}

                {/* Data Grid */}
                {['tipos', 'subtipos', 'barreiras', 'acessibilidades'].includes(currentView) && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <div className="grid gap-3 lg:gap-4">
                                {getCurrentData().map((item) => (
                                    <div key={item.id}>
                                        {editingItem?.id === item.id ? (
                                            // Edit mode
                                            <div className="flex items-center justify-between p-4 border border-blue-300 rounded-lg bg-blue-50">
                                                <input
                                                    type="text"
                                                    value={editingName}
                                                    onChange={(e) => setEditingName(e.target.value)}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    autoFocus
                                                />
                                                <div className="flex items-center space-x-2 ml-4">
                                                    <button
                                                        onClick={handleEdit}
                                                        className="text-green-600 hover:text-green-800 p-1"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => {setEditingItem(null); setEditingName('');}}
                                                        className="text-gray-600 hover:text-gray-800 p-1"
                                                    >
                                                        <span>X</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // Normal mode
                                            <div 
                                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer group"
                                                onClick={() => {
                                                    const nextView = getNextView(currentView);
                                                    if (nextView) {
                                                        navigateTo(nextView, item);
                                                        switch (nextView) {
                                                            case 'subtipos':
                                                                fetchSubtipos(item.id);
                                                                break;
                                                            case 'barreiras':
                                                                fetchBarreiras(item.id);
                                                                break;
                                                            case 'acessibilidades':
                                                                fetchAcessibilidades(item.id);
                                                                break;
                                                        }
                                                    }
                                                }}
                                            >
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-800">{item.nome}</h4>
                                                    {item.count !== undefined && (
                                                        <p className="text-sm text-gray-600">
                                                            {item.count} {
                                                                currentView === 'tipos' ? 'subtipos' :
                                                                currentView === 'subtipos' ? 'barreiras' :
                                                                currentView === 'barreiras' ? 'acessibilidades' : 'itens'
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                
                                                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {getNextView(currentView) && (
                                                        <ChevronRight className="h-4 w-4 text-blue-600" />
                                                    )}
                                                    
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditingItem(item);
                                                            setEditingName(item.nome);
                                                        }}
                                                        className="text-gray-600 hover:text-blue-600 p-1"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(item);
                                                        }}
                                                        className="text-gray-600 hover:text-red-600 p-1"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                
                                {getCurrentData().length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        Nenhum item encontrado. Clique em "Adicionar" para criar o primeiro.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}