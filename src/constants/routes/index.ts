import { IoFlash } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";
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
    title: "Dashboard",
    href: "/dashboard",
    description: "Ir para tela inicial",
    routeType: RouteType.PUBLIC,
    Icon: IoFlash,
    hide: false,
    navigationRote: false,
  },
  {
    title: "Usuários (Admin)",
    href: "/users",
    description: "Gerenciar usuários",
    routeType: RouteType.ADMIN,
    Icon: FaUsers,
    hide: false,
    navigationRote: false,
  },
  {
    title: "Mentores (Admin)",
    href: "/mentals",
    description: "Gerenciar mentores",
    routeType: RouteType.ADMIN,
    Icon: LuBrain,
    hide: false,
    navigationRote: false,
  },
  {
    title: "Campanhas",
    href: "/opportunities",
    description: "Visualizar campanhas atuais",
    routeType: RouteType.PUBLIC,
    Icon: PiBellSimple,
    hide: false,
    navigationRote: true,
  },
  {
    title: "Precificação",
    href: "/quotations",
    description: "Realizar precificações",
    routeType: RouteType.PUBLIC,
    Icon: IoCalculatorOutline,
    hide: false,
    navigationRote: true,
  },
  {
    title: "Insights",
    href: "/insights",
    description: "Visualizar insights sob medida",
    routeType: RouteType.PUBLIC,
    Icon: FiTrendingUp,
    hide: false,
    navigationRote: true,
  },
  {
    title: "Mentores",
    href: "/chat",
    description: "Conversar com mentores",
    routeType: RouteType.PUBLIC,
    Icon: HiOutlineChatBubbleOvalLeft,
    hide: false,
    navigationRote: true,
  },
];

export const noAuthRoutes: string[] = ["/", "/password-recovery"];
