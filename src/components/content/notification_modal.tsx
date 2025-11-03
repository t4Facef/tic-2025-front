import { useState } from "react";
import { X } from "lucide-react";

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (title: string, message: string) => void;
    candidatesCount: number;
    status: 'APROVADO' | 'RECUSADO';
}

export default function NotificationModal({ isOpen, onClose, onSend, candidatesCount, status }: NotificationModalProps) {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSend = async () => {
        if (!title.trim() || !message.trim()) return;
        
        setIsLoading(true);
        try {
            await onSend(title, message);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setTitle('');
                setMessage('');
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    const statusText = status === 'APROVADO' ? 'aprovados' : 'recusados';
    const statusColor = status === 'APROVADO' ? 'text-green-600' : 'text-red-600';

    if (showSuccess) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 text-center">
                    <div className="text-green-500 text-6xl mb-4">✓</div>
                    <h2 className="text-2xl font-semibold text-blue3 mb-2">Notificação Enviada!</h2>
                    <p className="text-gray-600">
                        Sua notificação foi enviada com sucesso para {candidatesCount} candidato(s) {statusText}.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-blue3">
                        Enviar Notificação para Candidatos <span className={statusColor}>{statusText}</span>
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <p className="text-gray-600 mb-4">
                    Esta notificação será enviada para <strong>{candidatesCount}</strong> candidato(s) {statusText}.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Título da Notificação
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue3 focus:border-transparent"
                            placeholder="Digite o título da notificação..."
                            maxLength={100}
                        />
                        <p className="text-xs text-gray-500 mt-1">{title.length}/100 caracteres</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mensagem
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={6}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue3 focus:border-transparent resize-none"
                            placeholder="Digite a mensagem da notificação..."
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500 mt-1">{message.length}/500 caracteres</p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={!title.trim() || !message.trim() || isLoading}
                        className="px-7 py-2 bg-blue3 text-white hover:bg-blue3H rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Enviando...' : 'Enviar Notificação'}
                    </button>
                </div>
            </div>
        </div>
    );
}