import { IHeaderRouteLinks } from "./interfaces";

export const routeLinks: IHeaderRouteLinks[] = [
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
];

export const excludedRoutes: string[] = ["/"];
