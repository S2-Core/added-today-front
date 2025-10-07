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
    name: "Laila",
    category: "Clareza Criativa",
    disabled: false,
    defaultSelected: true,
    details: {
      description:
        "É a mentora da clareza criativa que orienta todos os seus passos",
      specialties: ["Criatividade"],
    },
  },
];
