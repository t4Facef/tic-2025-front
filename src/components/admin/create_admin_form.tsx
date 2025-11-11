import { useState } from 'react';
import { API_BASE_URL } from '../../config/api';

export default function CreateAdminForm() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!nome.trim() || !senha.trim()) {
            setMessage('❌ Nome e senha são obrigatórios');
            return;
        }

        setLoading(true);
        setMessage('🔄 Criando administrador...');

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, senha })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ Administrador criado com sucesso!');
                setNome('');
                setSenha('');
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
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Administrador
                    </label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue3 focus:border-transparent"
                        placeholder="Digite o nome do administrador"
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
                    className="px-6 py-2 bg-blue3 text-white rounded-lg hover:bg-blue3H disabled:bg-gray-400"
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
    );
}