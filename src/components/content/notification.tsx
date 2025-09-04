// src/components/notification.tsx
import { useState } from "react";
import { Bell, BellDot } from "lucide-react";

interface Notification {
  id: number;
  message: string;
}

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);

  // Exemplo de notificações (pode vir de props ou API futuramente)
  const [notifications] = useState<Notification[]>([
   { id: 1, message: "Nova vaga disponível: Desenvolvedor Frontend" },
    { id: 2, message: "Sua candidatura foi visualizada pela empresa XYZ" },
    { id: 3, message: "Lembrete: Complete seu perfil para mais oportunidades" }
  ]);
  

  const hasNotifications = notifications.length > 0;

  return (
    <div className="relative">
      {/* Ícone do sino */}
      <button
        onClick={() => setIsOpen(!isOpen)}
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
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
          {hasNotifications ? (
            <ul className="space-y-2">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className="p-2 bg-blue1 rounded-md text-sm text-gray-700 hover:bg-blue5H transition"
                >
                  {notif.message}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 text-sm">
              Não há notificações
            </div>
          )}
        </div>
      )}
    </div>
  );
}
