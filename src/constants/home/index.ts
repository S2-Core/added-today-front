"use client";

import { FaBolt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaMagnifyingGlassDollar } from "react-icons/fa6";

import { IHomeCard, IHomeMental } from "./interfaces";
import { IoMdChatbubbles } from "react-icons/io";

export const cards: IHomeCard[] = [
  {
    Icon: MdWork,
    title: "Oportunidades no radar",
    description:
      "Descubra campanhas abertas em tempo real, como se fosse um “Google Flights” da influência. Compare, escolha e se conecte às marcas certas.",
    href: "/opportunities",
  },
  {
    Icon: FaMagnifyingGlassDollar,
    title: "Quanto vale seu conteúdo?",
    description:
      "Uma calculadora exclusiva que mostra o preço justo para seus posts, vídeos e entregas de marca, usando nossa fórmula de precificação.",
    href: "/quotations",
  },
  {
    Icon: FaBolt,
    title: "Insights sob medida",
    description:
      "Um compilado inteligente de notícias, tendências e dados ajustados ao seu nicho, para você se atualizar e se manter sempre à frente.",
    href: "/insights",
  },
  {
    Icon: IoMdChatbubbles,
    title: "Mentores que conversam com você",
    description:
      "Chat com mentals (nossos agentes de IA) que entendem seu contexto, se adaptam e te guiam com respostas práticas para você crescer como criador.",
    href: "/chat",
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
