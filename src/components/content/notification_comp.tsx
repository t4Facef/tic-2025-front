import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { API_BASE_URL } from "../../config/api";
import Notification from "../../types/notification";
import GenericBlueButton from "../buttons/generic_blue_button";

export default function NotificationComp() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user, role, token } = useAuth();

  const markAsRead = async (notificationId: number) => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/notificacoes/${role == "CANDIDATO" ? "candidato" : "empresa"}/${notificationId}/${user.id}/lida`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setNotifications(prev => 
          prev.map(notif => 
            notif.notificacaoId === notificationId 
              ? { ...notif, lida: true }
              : notif
          )
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/notificacoes/${role == "CANDIDATO" ? "candidato" : "empresa"}/${user.id}/todas-lidas`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, lida: true }))
        );
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;
      
      try {
        const res = await fetch(`${API_BASE_URL}/api/notificacoes/${role == "CANDIDATO" ? "candidato" : "empresa"}/${user.id}/all`)
        const data = await res.json()
        setNotifications(data)
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }

    fetchNotifications()
  }, [role, user?.id])

  return (
    <div className="m-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-[2rem] font-bold text-blue3">
          Notificações
        </h1>
        {notifications.some(n => !n.lida) && (
          <GenericBlueButton
            color={3}
            size="sm"
            onClick={markAllAsRead}
          >
            Marcar todas como lidas
          </GenericBlueButton>
        )}
      </div>
      <div className="space-y-10">
        {notifications.map((notification) => (
          <div key={notification.notificacaoId} className="flex flex-col mx-24">
            <h2
              className={`rounded-t-lg text-white p-4 font-semibold ${
                notification.lida ? "bg-black" : "bg-blue3"
              }`}
            >
              <div className="flex items-center gap-3">
                {notification.notificacao.remetenteEmpresaId && (
                  <a
                    href={`/companies/${notification.notificacao.remetenteEmpresaId}/profile/`}
                    className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`${API_BASE_URL}/api/arquivos/empresa/${notification.notificacao.remetenteEmpresaId}/foto/view`}
                      alt="Empresa"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                        if (nextElement) nextElement.style.display = 'flex'
                      }}
                    />
                    <span className="text-blue3 text-xs font-semibold" style={{ display: 'none' }}>
                      E
                    </span>
                  </a>
                )}
                <div>
                  <div>{notification.notificacao.titulo}</div>
                  {notification.notificacao.remetenteEmpresa && (
                    <div className="text-sm opacity-80">
                      De: {notification.notificacao.remetenteEmpresa.razaoSocial}
                    </div>
                  )}
                </div>
              </div>
            </h2>
            <div
              className={`rounded-b-lg flex flex-row justify-between p-6 space-x-20 text-blue3 ${
                notification.lida ? "bg-gray-300" : "bg-blue1"
              }`}
            >
              <p>{notification.notificacao.conteudo}</p>
              <GenericBlueButton
                color={notification.lida ? 5 : 3}
                size="sm"
                onClick={notification.lida ? undefined : () => markAsRead(notification.notificacaoId)}
              >
                {notification.lida ? "Notificação lida" : "Marcar como lida"}
              </GenericBlueButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
