"use client";

import { LuUsers } from "react-icons/lu";

import { IAboutItems } from "./interfaces";

export const aboutItems: IAboutItems = {
  highlight: {
    title: "Conheça nossos Mentores",
    description:
      "Saiba mais sobre a história e missão dos mentores de IA que estão aqui para ajudar você.",
    Icon: LuUsers,
  },
  items: [
    {
      title: "Nossa Missão",
      description:
        "Democratizar a acesso a conhecimento especializado em marketing de influência, fornecendo mentoria personalizada e baseada em dados para criadores de conteúdo de todos os níveis.",
    },
    {
      title: "Como Funcionam",
      description:
        "Nossos mentores de IA são especializados em diferentes áreas do marketing digital, analisam seu conteúdo e audiência para fornecer conselhos práticos e personalizados para o seu crescimento.",
    },
  ],
};
