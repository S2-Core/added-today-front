import { FaUsers } from "react-icons/fa6";
import { LuBrain, LuUsers } from "react-icons/lu";
import { PiBellSimple } from "react-icons/pi";
import { IoCalculatorOutline } from "react-icons/io5";
import { FiTrendingUp } from "react-icons/fi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

import { IRouteLinks } from "./interfaces";

export enum RouteType {
  PUBLIC = "PUBLIC",
  ADMIN = "ADMIN",
}

export const routeLinks: IRouteLinks[] = [
  {
    title: "Usuários (Admin)",
    href: "/users",
    description: "Gerenciar usuários",
    routeType: RouteType.ADMIN,
    Icon: FaUsers,
    hide: true,
  },
  {
    title: "Mentores (Admin)",
    href: "/mentals",
    description: "Gerenciar mentores",
    routeType: RouteType.ADMIN,
    Icon: LuBrain,
    hide: true,
  },
  {
    title: "Campanhas",
    href: "/opportunities",
    description: "Visualizar campanhas atuais",
    routeType: RouteType.PUBLIC,
    Icon: PiBellSimple,
    hide: false,
  },
  {
    title: "Precificação",
    href: "/quotations",
    description: "Realizar precificações",
    routeType: RouteType.PUBLIC,
    Icon: IoCalculatorOutline,
    hide: false,
  },
  {
    title: "Insights",
    href: "/insights",
    description: "Visualizar insights sob medida",
    routeType: RouteType.PUBLIC,
    Icon: FiTrendingUp,
    hide: false,
  },
  {
    title: "Mentores",
    href: "/chat",
    description: "Conversar com mentores",
    routeType: RouteType.PUBLIC,
    Icon: HiOutlineChatBubbleOvalLeft,
    hide: false,
  },
  {
    title: "Sobre",
    href: "/about",
    description: "Visualizar informações sobre a plataforma",
    routeType: RouteType.PUBLIC,
    Icon: LuUsers,
    hide: false,
  },
];

export const noAuthRoutes: string[] = ["/", "/new-password"];
