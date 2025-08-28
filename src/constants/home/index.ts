"use client";

import { FaBolt, FaBrain } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

import { IHomeCard } from "./interfaces";

export const cards: IHomeCard[] = [
  {
    Icon: FaMoneyBillTrendUp,
    title: "Monetização multiplicada",
    description:
      "Te ajudamos a escalar como quem não quer só audiência, mas construção de patrimônio",
  },
  {
    Icon: FaBolt,
    title: "Tecnologia Acessível",
    description:
      "IA integrada para auxiliar com ideias, tempo e produção de conteúdo.",
  },
  {
    Icon: FaBrain,
    title: "Aprendizado com Mentores Digitais",
    description:
      "Mentals com personalidade própria que guiam o criador em jornadas temáticas.",
  },
];
