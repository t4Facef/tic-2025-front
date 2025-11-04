import { useState } from "react";
import NotificationBox from "../content/notification_box";
import ProfilePicture from "./profile_picture";
import { useAuth } from "../../hooks/useAuth";

export default function UserInfo() {
  const [activeModal, setActiveModal] = useState<"none" | "notifications" | "profile">("none")
  const { role } = useAuth();

  const toggleNotifications = () => {
    setActiveModal(activeModal === "notifications" ? "none" : "notifications")
  }

  const toggleProfile = () => {
    setActiveModal(activeModal === "profile" ? "none" : "profile")
  }

  return (
    <div className="flex items-center pr-6 gap-6">
      {role !== 'ADMIN' && (
        <NotificationBox 
          isOpen={activeModal === "notifications"} 
          onToggle={toggleNotifications}
        />
      )}
      <ProfilePicture 
        isOpen={activeModal === "profile"} 
        onToggle={toggleProfile}
      />
    </div>
  );
}