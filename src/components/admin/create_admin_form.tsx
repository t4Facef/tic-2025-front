import { useState } from 'react';
import { API_BASE_URL } from '../../config/api';
import AdminList from './admin_list';

export default function CreateAdminForm() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim() || !senha.trim()) {
            setMessage('❌ Email e senha são obrigatórios');
            return;
        }

        if (!email.includes('@')) {
            setMessage('❌ Digite um email válido');
            return;
        }

        setLoading(true);
        setMessage('🔄 Criando administrador...');

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ Administrador criado com sucesso!');
                setEmail('');
                setSenha('');
                setRefreshKey(prev => prev + 1); // Trigger refresh da lista
            } else {
                setMessage(`❌ ${data.error}`);
            }
        } catch (error) {
            console.error('Erro ao criar admin:', error);
            setMessage('❌ Erro ao criar administrador');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Formulário de criação */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Criar Novo Administrador</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email do Administrador
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue3 focus:border-transparent"
                                placeholder="Digite o email do administrador"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Senha
                            </label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue3 focus:border-transparent"
                                placeholder="Digite a senha"
                                disabled={loading}
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue3 text-white rounded-lg hover:bg-blue3H disabled:bg-gray-400 transition-colors"
                        >
                            {loading ? 'Criando...' : 'Criar Administrador'}
                        </button>
                        
                        {message && (
                            <div className={`px-4 py-2 rounded-lg text-sm ${
                                message.includes('❌') 
                                    ? 'bg-red-100 text-red-700'
                                    : message.includes('✅')
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                            }`}>
                                {message}
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* Lista de administradores */}
            <AdminList key={refreshKey} />
        </div>
    );
}