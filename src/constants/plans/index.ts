interface IBenefits {
  id: string;
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
};

export const planBenefitsExamples: IBenefits[] = [
  {
    id: "example1",
    text: "Radar de oportunidades",
    description:
      "Encontre campanhas e oportunidades para monetizar alinhadas ao seu perfil.",
  },
  {
    id: "example2",
    text: "Precificação inteligente com IA",
    description:
      "Calcule quanto cobrar por entrega com referência, contexto e justificativa.",
  },
  {
    id: "example3",
    text: "Insights quentes (curadoria com IA)",
    description: "Sugestões aplicáveis no seu conteúdo, no seu ritmo.",
  },
  {
    id: "example4",
    text: "Agente de IA",
    description:
      "Ajuda em tarefas e decisões do dia a dia do creator (negociação, rotina, checklists).",
  },
];
