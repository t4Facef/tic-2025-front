import { useState, useEffect, useRef } from "react";
import NotificationBox from "../content/notification_box";
import ProfilePicture from "./profile_picture";
import { useAuth } from "../../hooks/useAuth";

export default function UserInfo() {
  const [activeModal, setActiveModal] = useState<"none" | "notifications" | "profile">("none")
  const { role, user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setActiveModal(activeModal === "notifications" ? "none" : "notifications")
  }

  const toggleProfile = () => {
    setActiveModal(activeModal === "profile" ? "none" : "profile")
  }

  // Fechar qualquer modal ativo ao clicar fora do contêiner
  useEffect(() => {
    if (activeModal === "none") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveModal("none");
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModal("none");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [activeModal]);

  return (
    <div ref={containerRef} className="flex items-center space-x-2 lg:space-x-4">
      {/* User Name - Hidden on mobile */}
      <div className="hidden lg:block text-right">
        <p className="text-sm font-medium text-white/90">
          Olá, {user?.nome?.split(' ')[0] || 'Usuário'}
        </p>
        <p className="text-xs text-white/70 capitalize">
          {role === 'CANDIDATO' ? 'Candidato' : role === 'EMPRESA' ? 'Empresa' : 'Admin'}
        </p>
      </div>

      {/* Notifications */}
      {role !== 'ADMIN' && (
        <div className="relative">
          <NotificationBox 
            isOpen={activeModal === "notifications"} 
            onToggle={toggleNotifications}
          />
        </div>
      )}

      {/* Profile */}
      <div className="relative">
        <ProfilePicture 
          isOpen={activeModal === "profile"} 
          onToggle={toggleProfile}
        />
      </div>
    </div>
  );
}