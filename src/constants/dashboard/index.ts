"use client";

import { PiBellSimple } from "react-icons/pi";
import { BsCalculator } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

import { IDashboardMental, IDashboardCard } from "./interfaces";

export const cards: IDashboardCard[] = [
  {
    Icon: PiBellSimple,
    title: "Campanhas",
    description:
      "Descubra campanhas abertas em tempo real, como se fosse um “Google Flights” da influência. Compare, escolha e se conecte às marcas certas.",
    href: "/opportunities",
  },
  {
    Icon: BsCalculator,
    title: "Precificação",
    description:
      "Uma calculadora exclusiva que mostra o preço justo para seus posts, vídeos e entregas de marca, usando nossa fórmula de precificação.",
    href: "/quotations",
  },
  {
    Icon: FiTrendingUp,
    title: "Insights",
    description:
      "Um compilado inteligente de notícias, tendências e dados ajustados ao seu nicho, para você se atualizar e se manter sempre à frente.",
    href: "/insights",
  },
  {
    Icon: HiOutlineChatBubbleOvalLeft,
    title: "Mentores",
    description:
      "Chat com mentores (nossos agentes de IA) que entendem seu contexto, se adaptam e te guiam com respostas práticas para você crescer como criador.",
    href: "/chat",
  },
];

export const dashboardExampleMentals: IDashboardMental[] = [
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
