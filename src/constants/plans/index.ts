interface IBenefits {
  id: string;
  text: string;
  icon?: string;
  description?: string;
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

export const planBenefitsExamples: IBenefits[] = [
  { id: "example1", icon: "✨", text: "Acesso antecipado a novas features" },
  { id: "example2", icon: "💎", text: "Suporte prioritário" },
  { id: "example3", icon: "🎯", text: "Oportunidades exclusivas com marcas" },
  { id: "example4", icon: "🏆", text: "Badge exclusivo de fundador" },
];
