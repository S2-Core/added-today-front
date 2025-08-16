"use client";

import { FaBolt, FaBrain, FaUsers } from "react-icons/fa";

import { IHomeCard } from "./interfaces";

export const cards: IHomeCard[] = [
  {
    Icon: FaUsers,
    title: "Comunidade com Propósito",
    description:
      "Rede para quem está sozinho, criando conexão e suporte real entre creators.",
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
