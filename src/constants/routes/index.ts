import { IRouteLinks } from "./interfaces";

export enum RouteType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  ADMIN = "ADMIN",
}

export const routeLinks: IRouteLinks[] = [
  {
    title: "Home",
    href: "/home",
    description: "Voltar para tela inicial",
    routeType: RouteType.PUBLIC,
  },
  {
    title: "Usuários",
    href: "/users",
    description: "Usuários",
    routeType: RouteType.ADMIN,
  },
  {
    title: "Oportunidades",
    href: "/opportunities",
    description: "Oportunidades",
    routeType: RouteType.PUBLIC,
  },
  {
    title: "Mentals",
    href: "/mentals",
    description: "Mentals",
    routeType: RouteType.PUBLIC,
  },
  {
    title: "Chat",
    href: "/chat",
    description: "Chat",
    routeType: RouteType.PUBLIC,
  },
];

export const noAuthRoutes: string[] = ["/", "/password-recovery"];
