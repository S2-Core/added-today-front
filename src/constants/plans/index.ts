import { IconType } from "react-icons";
import { LuRadar } from "react-icons/lu";
import { TbBulb } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";
import { IoPricetagOutline } from "react-icons/io5";

interface IBenefits {
  id: string;
  Icon?: IconType;
  text: string;
  description: string;
}

export const planIcons = {
  money: "💰",
  target: "🎯",
  search: "🔎",
  brain: "🧠",
  star: "⭐️",
};

export const planIntervals = {
  MONTH: "mês",
  YEAR: "ano",
};

export const planPeriods = {
  DAY: "dia",
  WEEK: "semana",
  MONTH: "mês",
  YEAR: "ano",
};

export const planStatus = {
  INCOMPLETE: "Incompleto",
  ACTIVE: "Ativo",
  PAST_DUE: "Vencido",
  CANCELED: "Cancelado",
};

export const planProviders = {
  STRIPE: "Stripe",
  MERCADOPAGO: "Mercado Pago",
  PAGARME: "Pagar.me",
  PAGBANK: "PagBank",
};

export const planEntitlements = {
  LAILA_INTERACTIONS: "Interações com o Agente de IA",
  QUOTATIONS: "Precificações",
  INSIGHTS: "Insights",
  OPPORTUNITIES: "Oportunidades",
  CALENDAR_AI_SUGGESTIONS: "Sugestões da AI para o calendário",
};

export const planBenefitsExamples: IBenefits[] = [
  {
    id: "example1",
    Icon: LuRadar,
    text: "Radar de oportunidades",
    description:
      "Encontre campanhas e oportunidades para monetizar alinhadas ao seu perfil.",
  },
  {
    id: "example2",
    Icon: IoPricetagOutline,
    text: "Precificação inteligente com IA",
    description:
      "Calcule quanto cobrar por entrega com referência, contexto e justificativa.",
  },
  {
    id: "example3",
    Icon: TbBulb,
    text: "Insights quentes (curadoria com IA)",
    description: "Sugestões aplicáveis no seu conteúdo, no seu ritmo.",
  },
  {
    id: "example4",
    Icon: RiRobot2Line,
    text: "Agente de IA",
    description:
      "Ajuda em tarefas e decisões do dia a dia do creator (negociação, rotina, checklists).",
  },
];
