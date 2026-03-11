import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { IChatMental } from "./interface";

export enum MessageDirection {
  USER = "USER",
  BOT = "BOT",
}

export const chatMentals: IChatMental[] = [
  {
    id: "1",
    icon: {
      Icon: HiOutlineChatBubbleOvalLeft,
      color: "text-primary",
    },
    name: "Agente de IA",
    subtitle:
      "Posso ajudar você com tarefas e decisões do dia a dia. Pergunte abaixo:",
    disabled: false,
    defaultSelected: true,
    details: {
      description:
        "O agente da added ajuda creators a lidar com tarefas operacionais do dia a dia.",
      specialties: [
        "Estruturar propostas para marcas",
        "Organizar entregas e prazos",
        "Tomar decisões sobre conteúdo e parcerias",
      ],
    },
  },
];
