// src/components/notification.tsx
import { useState } from "react";
import { Bell, BellDot } from "lucide-react";
import GenericBlueButton from "../buttons/generic_blue_button";
import { mockNotifications, NotificationData } from "../../data/mockdata/notification";
import { Link } from "react-router-dom";

interface NotificationBoxProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function NotificationBox({ isOpen, onToggle }: NotificationBoxProps) {
  const [notifications, setNotifications] = useState<NotificationData[]>(mockNotifications);

  const hasNotifications = notifications.some((n) => !n.read);

  // Marcar todas como lidas
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
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
                  <li key={notif.id}>
                    <Link
                      to="/notifications"
                      className={`block p-3 rounded-md text-sm transition ${
                        notif.read
                          ? "bg-gray-200 text-gray-500"
                          : "bg-blue1 text-blue3 hover:bg-blue5H"
                      }`}
                    >
                      <h4 className="font-semibold">{truncate(notif.title, 40)}</h4>
                      <p className="text-xs">{truncate(notif.message, 70)}</p>
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
