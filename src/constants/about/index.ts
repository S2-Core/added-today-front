"use client";

import { LuUsers } from "react-icons/lu";

import { IAboutItems } from "./interfaces";

export const aboutItems: IAboutItems = {
  highlight: {
    title: "A inteligência por trás da added today",
    description:
      "A added today é como se fosse seu sistema operacional. Ela combina dados, intuição e experiência real da creators economy.",
    Icon: LuUsers,
  },
  items: [
    {
      title: "Propósito",
      description:
        "Democratizar o acesso ao conhecimento aplicado — unindo criatividade e inteligência artificial para transformar criadores em negócios sustentáveis.",
    },
    {
      title: "Como os mentals funcionam",
      description:
        "Os mentals foram desenvolvidos para atuarem como agentes especializados de IA em áreas da criação de conteúdo, como: cálculo de precificação, busca inteligente de campanhas e brainstorm personalizado para insights. Eles aprendem com seu perfil e evoluem junto com você. Novos recursos - e mentals - serão disponibilizados em breve.",
    },
  ],
};
