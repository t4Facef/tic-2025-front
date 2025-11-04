import { useAuth } from "../hooks/useAuth";
import NotFoundScreen from "../components/content/not_found_screen";
import GenericBlueButton from "../components/buttons/generic_blue_button";

export default function AdminDashboard() {
    const { user, role, isAuthenticated } = useAuth();

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

                {/* Seção de Criação */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-blue3 mb-6">Criar Novos Registros</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">👤</div>
                            <h3 className="text-lg font-semibold mb-2">Novo Candidato</h3>
                            <p className="text-gray-600 text-sm mb-4">Criar perfil de candidato</p>
                            <GenericBlueButton color={3} size="sm">Criar</GenericBlueButton>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">🏢</div>
                            <h3 className="text-lg font-semibold mb-2">Nova Empresa</h3>
                            <p className="text-gray-600 text-sm mb-4">Criar perfil de empresa</p>
                            <GenericBlueButton color={3} size="sm">Criar</GenericBlueButton>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">💼</div>
                            <h3 className="text-lg font-semibold mb-2">Nova Vaga</h3>
                            <p className="text-gray-600 text-sm mb-4">Criar vaga de emprego</p>
                            <GenericBlueButton color={3} size="sm">Criar</GenericBlueButton>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">👨‍💼</div>
                            <h3 className="text-lg font-semibold mb-2">Novo Admin</h3>
                            <p className="text-gray-600 text-sm mb-4">Criar administrador</p>
                            <GenericBlueButton color={3} size="sm">Criar</GenericBlueButton>
                        </div>
                    </div>
                </div>

                {/* Seção de Edição */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-blue3 mb-6">Editar Registros Existentes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">✏️</div>
                            <h3 className="text-lg font-semibold mb-2">Editar Candidatos</h3>
                            <p className="text-gray-600 text-sm mb-4">Buscar e editar perfis de candidatos</p>
                            <GenericBlueButton color={2} size="sm">Buscar</GenericBlueButton>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">🏗️</div>
                            <h3 className="text-lg font-semibold mb-2">Editar Empresas</h3>
                            <p className="text-gray-600 text-sm mb-4">Buscar e editar perfis de empresas</p>
                            <GenericBlueButton color={2} size="sm">Buscar</GenericBlueButton>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-lg font-semibold mb-2">Editar Vagas</h3>
                            <p className="text-gray-600 text-sm mb-4">Buscar e editar vagas de emprego</p>
                            <GenericBlueButton color={2} size="sm">Buscar</GenericBlueButton>
                        </div>
                    </div>
                </div>

                {/* Seção de Gerenciamento */}
                <div>
                    <h2 className="text-2xl font-bold text-blue3 mb-6">Ferramentas de Gerenciamento</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-lg font-semibold mb-2">Relatórios</h3>
                            <p className="text-gray-600 text-sm mb-4">Estatísticas do sistema</p>
                            <GenericBlueButton color={4} size="sm">Ver</GenericBlueButton>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">🗑️</div>
                            <h3 className="text-lg font-semibold mb-2">Exclusões</h3>
                            <p className="text-gray-600 text-sm mb-4">Gerenciar exclusões</p>
                            <GenericBlueButton color={1} size="sm">Acessar</GenericBlueButton>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">⚙️</div>
                            <h3 className="text-lg font-semibold mb-2">Configurações</h3>
                            <p className="text-gray-600 text-sm mb-4">Configurações do sistema</p>
                            <GenericBlueButton color={4} size="sm">Configurar</GenericBlueButton>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-lg font-semibold mb-2">Logs</h3>
                            <p className="text-gray-600 text-sm mb-4">Visualizar logs do sistema</p>
                            <GenericBlueButton color={4} size="sm">Ver Logs</GenericBlueButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}