import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../contexts/AuthContext';

interface Admin {
    id: number;
    email: string;
    createdAt: string;
}

export default function AdminList() {
    const [adminList, setAdminList] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const loadAdminList = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/list`);
            if (response.ok) {
                const admins = await response.json();
                setAdminList(admins);
            }
        } catch (error) {
            console.error('Erro ao carregar lista de administradores:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAdminList();
    }, []);

    if (loading) {
        return <div className="text-center py-4 text-gray-500">Carregando administradores...</div>;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Administradores Cadastrados ({adminList.length})</h3>
            
            {adminList.length === 0 ? (
                <div className="text-center py-4 text-gray-500">Nenhum administrador encontrado</div>
            ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                        {adminList.map((admin) => (
                            <div key={admin.id} className="flex justify-between items-center bg-white p-3 rounded-lg border">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-800">{admin.email}</span>
                                        {user?.email === admin.email && (
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                Você
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Criado em: {new Date(admin.createdAt).toLocaleDateString('pt-BR')} às {new Date(admin.createdAt).toLocaleTimeString('pt-BR')}
                                    </div>
                                </div>
                                <div className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                                    Ativo
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}