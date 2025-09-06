export interface NotificationData {
  id: number;
  title: string;
  message: string;
  read: boolean; // true = já lida
  date: string;  // opcional, se quiser mostrar a data
}

export const mockNotifications: NotificationData[] = [
  {
    id: 1,
    title: "Redefinição de senha",
    message: "Um e-mail foi enviado para usuario@email.com",
    read: false,
    date: "2025-08-26",
  },
  {
    id: 2,
    title: "Atualização de perfil",
    message: "Seu perfil foi atualizado com sucesso!",
    read: true,
    date: "2025-08-25",
  },
];
