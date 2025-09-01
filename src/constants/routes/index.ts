import { IRouteLinks } from "./interfaces";

export enum RouteType {
  PUBLIC = "PUBLIC",
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
    title: "Mentores",
    href: "/mentals",
    description: "Mentores",
    routeType: RouteType.ADMIN,
  },
  {
    title: "Oportunidades no radar",
    href: "/opportunities",
    description: "Oportunidades no radar",
    routeType: RouteType.PUBLIC,
  },
  {
    title: "Quanto vale seu conteúdo?",
    href: "/quotations",
    description: "Quanto vale seu conteúdo?",
    routeType: RouteType.PUBLIC,
  },
  {
    title: "Insights sob medida",
    href: "/insights",
    description: "Insights sob medida",
    routeType: RouteType.PUBLIC,
  },
  {
    title: "Mentores que conversam com você",
    href: "/chat",
    description: "Mentores que conversam com você",
    routeType: RouteType.PUBLIC,
  },
];

export const noAuthRoutes: string[] = ["/", "/password-recovery"];
