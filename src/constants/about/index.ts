"use client";

import { LuUsers } from "react-icons/lu";

import { IAboutItems } from "./interfaces";
import { planBenefitsExamples } from "../plans";

export const aboutItems: IAboutItems = {
  highlight: {
    title: "A inteligência por trás da added today",
    description:
      "A added today é como se fosse seu sistema operacional. Ela combina dados, intuição e experiência real da creators economy.",
    Icon: LuUsers,
  },
  items: [
    {
      title: "Propósito:",
      subtitle: "Transformar creators em negócios mais estruturados.",
      description:
        "A added combina dados, inteligência artificial e experiência real da creators economy para ajudar criadores a organizar sua operação, negociar melhor e aproveitar mais oportunidades.",
    },
    {
      title: "Como a added ajuda no dia a dia:",
      subtitle:
        "O seu sistema operacional reúne ferramentas que organizam as decisões e tarefas como creator.",
      list: planBenefitsExamples,
    },
  ],
  footerMessage: {
    title: "A added evolui continuamente a partir do uso real dos creators.",
    description:
      "Novos recursos estão sendo desenvolvidos para tornar a operação de criadores de conteúdo cada vez mais simples e profissional.",
  },
};
