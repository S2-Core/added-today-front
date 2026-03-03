interface IGain {
  id: string;
  icon: string;
  text: string;
}

interface IPlanGains {
  full: IGain[];
  examples: IGain[];
}

export const planGains: IPlanGains = {
  full: [
    { id: "1", icon: "✨", text: "Estruturação da carreira com IA" },
    { id: "2", icon: "💰", text: "Ferramentas de precificação inteligente" },
    { id: "3", icon: "🤝", text: "Oportunidades exclusivas com marcas" },
    { id: "4", icon: "👥", text: "Comunidade exclusiva para criadores" },
    { id: "5", icon: "🚀", text: "Acesso antecipado a novas features" },
    { id: "6", icon: "📊", text: "Dashboard completo de analytics" },
    { id: "7", icon: "🎯", text: "Sistema de gestão de campanhas" },
    { id: "8", icon: "💎", text: "Suporte prioritário" },
  ],
  examples: [
    { id: "9", icon: "✨", text: "Acesso antecipado a novas features" },
    { id: "10", icon: "💎", text: "Suporte prioritário" },
    { id: "11", icon: "🎯", text: "Oportunidades exclusivas com marcas" },
    { id: "12", icon: "🏆", text: "Badge exclusivo de fundador" },
  ],
};
