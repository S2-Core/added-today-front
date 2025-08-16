import { IHeaderRouteLinks } from "./interfaces";

export const headerRouteLinks: IHeaderRouteLinks[] = [
  {
    title: "Home",
    href: "/home",
    description: "Voltar para tela inicial",
  },
  {
    title: "Mentals",
    href: "/mentals",
    description: "Gerenciar Mentals",
  },
  {
    title: "Usuários",
    href: "/users",
    description: "Gerenciar Usuários",
  },
  {
    title: "Chat",
    href: "/chat",
    description: "Gerenciar Chatbots",
  },
];

export const publicRoutes: string[] = ["/", "/password-recovery"];
