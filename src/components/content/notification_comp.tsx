import { mockNotifications } from "../../data/mockdata/notification";
import GenericBlueButton from "../buttons/generic_blue_button";

export default function NotificationComp() {
  return (
    <div className="m-8 space-y-4">
      <h1 className="flex justify-center text-[2rem] font-bold text-blue3">
        Notificações
      </h1>
      <div className="space-y-10">
        {mockNotifications.map((notification) => (
          <div key={notification.id} className="flex flex-col mx-24">
            <h2
              className={`rounded-t-lg text-white p-4 font-semibold ${
                notification.read ? "bg-black" : "bg-blue3"
              }`}
            >
              {notification.title}
            </h2>
            <div
              className={`rounded-b-lg flex flex-row justify-between p-6 space-x-20 text-blue3 ${
                notification.read ? "bg-gray-300" : "bg-blue1"
              }`}
            >
              <p>{notification.message}</p>
              <GenericBlueButton
                color={notification.read ? 5 : 3}
                size="sm"
              >
                {notification.read ? "Notificação lida" : "Marcar como lida"}
              </GenericBlueButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
