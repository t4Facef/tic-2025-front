// src/components/notification.tsx
import { useEffect, useState } from "react";
import { Bell, BellDot } from "lucide-react";
import GenericBlueButton from "../buttons/generic_blue_button";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { API_BASE_URL } from "../../config/api";
import Notification from "../../types/notification";

interface NotificationBoxProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function NotificationBox({ isOpen, onToggle }: NotificationBoxProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user, role } = useAuth();

  useEffect(() => {
      const fetchNotifications = async () => {
        try{
          const res = await fetch(`${API_BASE_URL}/api/notificacoes/${role == "CANDIDATO" ? "candidato" : "empresa"}/${user?.id}`)
          const data = await res.json()
          setNotifications(data)
        }catch(error){
          console.error("Error fetching notifications:", error);
        }
      }

      fetchNotifications()
    }, [role, user?.id])

  const hasNotifications = notifications.some((n) => !n.lida);

  // Marcar todas como lidas
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  // Função para limitar caracteres
  const truncate = (text: string, limit: number) =>
    text.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <div className="relative">
      {/* Ícone do sino */}
      <button
        onClick={onToggle}
        className="p-2 rounded-full bg-gray-200 transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none"
      >
        {hasNotifications ? (
          <BellDot size={24} className="text-blue3" />
        ) : (
          <Bell size={24} className="text-gray-600" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
          <p className="text-blue3 my-2 font-semibold">Veja suas notificações</p>
          {notifications.length > 0 ? (
            <>
              <ul className="space-y-2">
                {notifications.slice(0, 3).map((notif) => (
                  <li key={notif.notificacaoId}>
                    <Link
                      to="/notifications"
                      className={`block p-3 rounded-md text-sm transition ${
                        notif.lida
                          ? "bg-gray-200 text-gray-500"
                          : "bg-blue1 text-blue3 hover:bg-blue5H"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notif.notificacao.remetenteEmpresaId && (
                          <Link
                            to={`/companies/${notif.notificacao.remetenteEmpresaId}/profile/`}
                            className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <img
                              src={`${API_BASE_URL}/api/arquivos/empresa/${notif.notificacao.remetenteEmpresaId}/foto/view`}
                              alt="Empresa"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                                const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                                if (nextElement) nextElement.style.display = 'flex'
                              }}
                            />
                            <span className="text-gray-600 text-xs font-semibold" style={{ display: 'none' }}>
                              E
                            </span>
                          </Link>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold">{truncate(notif.notificacao.titulo, 35)}</h4>
                          {notif.notificacao.remetenteEmpresa && (
                            <p className="text-xs opacity-70 mb-1">
                              De: {truncate(notif.notificacao.remetenteEmpresa.razaoSocial, 25)}
                            </p>
                          )}
                          <p className="text-xs">{truncate(notif.notificacao.conteudo, 60)}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Rodapé do dropdown */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue3 hover:underline"
                >
                  Marcar todas como lidas
                </button>
                <GenericBlueButton color={3} size="sm" link="/notifications">
                  Ver todas
                </GenericBlueButton>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 text-sm py-6">
              Não há notificações
            </div>
          )}
        </div>
      )}
    </div>
  );
}
