import { IUserMessage } from "@/contexts/users/interfaces";

export enum MessageDirection {
  USER = "user",
  BOT = "bot",
}

export const chatMessages: IUserMessage[] = [
  {
    id: "1",
    direction: MessageDirection.USER,
    message:
      "Oi! Fiquei sabendo que o site addedToday lançou um novo chat. É verdade?",
    date: new Date("2025-08-12T16:00"),
  },
  {
    id: "2",
    direction: MessageDirection.BOT,
    message:
      "Sim! O novo chat do addedToday foi lançado hoje mesmo, com interface mais rápida e responsiva.",
    date: new Date("2025-08-12T16:01"),
  },
  {
    id: "3",
    direction: MessageDirection.USER,
    message: "Legal! Ele funciona também no celular ou é só no computador?",
    date: new Date("2025-08-12T16:02"),
  },
  {
    id: "4",
    direction: MessageDirection.BOT,
    message:
      "Funciona em qualquer dispositivo! O layout é totalmente adaptável para desktop, tablet e mobile.",
    date: new Date("2025-08-12T16:03"),
  },
  {
    id: "5",
    direction: MessageDirection.USER,
    message: "E tem suporte para envio de imagens e arquivos?",
    date: new Date("2025-08-12T16:04"),
  },
  {
    id: "6",
    direction: MessageDirection.BOT,
    message:
      "Ainda não é possível enviar imagens ou arquivos pelo chat, mas essa funcionalidade já está nos planos para as próximas atualizações.",
    date: new Date("2025-08-12T16:05"),
  },
  {
    id: "7",
    direction: MessageDirection.USER,
    message: "Ótimo! E as mensagens antigas ficam salvas ou somem?",
    date: new Date("2025-08-12T16:06"),
  },
  {
    id: "8",
    direction: MessageDirection.BOT,
    message:
      "As mensagens ficam salvas no histórico, então você pode consultar tudo depois.",
    date: new Date("2025-08-12T16:07"),
  },
  {
    id: "9",
    direction: MessageDirection.USER,
    message:
      "Excelente! Vou testar agora mesmo e ver se consigo conversar com o suporte.",
    date: new Date("2025-08-12T16:08"),
  },
  {
    id: "10",
    direction: MessageDirection.BOT,
    message:
      "Perfeito! Qualquer dúvida é só mandar uma mensagem aqui no chat que respondemos rapidamente.",
    date: new Date("2025-08-12T16:09"),
  },
  {
    id: "11",
    direction: MessageDirection.USER,
    message: "Tem algum limite de quantas mensagens posso enviar por dia?",
    date: new Date("2025-08-12T16:10"),
  },
  {
    id: "12",
    direction: MessageDirection.BOT,
    message: "Por enquanto, não há limite de mensagens!",
    date: new Date("2025-08-12T16:11"),
  },
  {
    id: "13",
    direction: MessageDirection.USER,
    message: "Interessante. E o chat já tem suporte para múltiplos idiomas?",
    date: new Date("2025-08-12T16:12"),
  },
  {
    id: "14",
    direction: MessageDirection.BOT,
    message:
      "Ainda não, mas o suporte multilíngue está nos planos para as próximas atualizações.",
    date: new Date("2025-08-12T16:13"),
  },
  {
    id: "15",
    direction: MessageDirection.USER,
    message: "Show! Vou ficar de olho nas novidades e testar cada atualização.",
    date: new Date("2025-08-12T16:14"),
  },
];
