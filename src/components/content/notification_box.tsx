
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
      if (role === 'ADMIN') return;
      
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
        className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
      >
        {hasNotifications ? (
          <>
            <BellDot size={20} className="text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </>
        ) : (
          <Bell size={20} className="text-white/80" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 md:right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] md:w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50 animate-in slide-in-from-top-2 duration-200 transform md:transform-none -translate-x-1/2 md:translate-x-0 left-1/2 md:left-auto">
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
                          <div
                            className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`/companies/${notif.notificacao.remetenteEmpresaId}/profile/`, '_blank');
                            }}
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
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm break-words">{truncate(notif.notificacao.titulo, 35)}</h4>
                          {notif.notificacao.remetenteEmpresa && (
                            <p className="text-xs opacity-70 mb-1 break-words">
                              De: {truncate(notif.notificacao.remetenteEmpresa.razaoSocial, 25)}
                            </p>
                          )}
                          <p className="text-xs break-words">{truncate(notif.notificacao.conteudo, 60)}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Rodapé do dropdown */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2 sm:gap-0">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue3 hover:underline order-2 sm:order-1"
                >
                  Marcar todas como lidas
                </button>
                <div className="order-1 sm:order-2 w-full sm:w-auto">
                  <GenericBlueButton color={3} size="sm" link="/notifications">
                    Ver todas
                  </GenericBlueButton>
                </div>
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
