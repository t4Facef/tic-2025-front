// src/mock/mockNotifications.ts
export interface NotificationData {
  id: number;
  title: string;
  message: string;
  read: boolean;
  date: string; // opcional
}

export const mockNotifications: NotificationData[] = [
  {
    id: 1,
    title: "Nova vaga disponível: Desenvolvedor Frontend",
    message: "Uma vaga para Desenvolvedor Frontend foi aberta na empresa TechCorp.",
    read: false,
    date: "2025-08-26T09:00:00",
  },
  {
    id: 2,
    title: "Sua candidatura foi visualizada",
    message: "A empresa XYZ visualizou sua candidatura recentemente.",
    read: false,
    date: "2025-08-25T15:30:00",
  },
  {
    id: 3,
    title: "Lembrete: Complete seu perfil",
    message: "Adicione suas habilidades e experiências para aumentar suas chances.",
    read: false,
    date: "2025-08-24T11:20:00",
  },
  {
    id: 4,
    title: "Processo seletivo atualizado",
    message: "O status da sua inscrição para Analista de Dados foi alterado.",
    read: true,
    date: "2025-08-23T18:45:00",
  },
];
