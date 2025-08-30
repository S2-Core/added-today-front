"use client";

import { FaBolt, FaBrain } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

import { IHomeCard, IHomeMental } from "./interfaces";

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

export const homeExampleMentals: IHomeMental[] = [
  {
    name: "Laila, a capitã",
    description:
      "é a mentora da clareza criativa que orienta todos os seus passos",
    locked: false,
    image: "/images/mentals/laila.jpg",
  },
  {
    name: "Valai, o estrategista",
    description:
      "é o que ajuda a reconhecer o seu valor e o impacto da sua entrega",
    locked: false,
    image: "/images/mentals/valai.jpg",
  },
  {
    name: undefined,
    description: "é o que te orientará quando você precisar ajustar a rota",
    locked: true,
    image: "/images/mentals/luai.jpg",
  },
  {
    name: undefined,
    description: "te fará acessar zonas criativas além da lógica, fora do eixo",
    locked: true,
    image: "/images/mentals/kiari.jpg",
  },
];
