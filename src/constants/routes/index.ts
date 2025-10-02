import { IoFlash } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";
import { PiBellSimple } from "react-icons/pi";
import { BsCalculator } from "react-icons/bs";
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
  },
  {
    title: "Usuários (Admin)",
    href: "/users",
    description: "Gerenciar Usuários",
    routeType: RouteType.ADMIN,
    Icon: FaUsers,
    hide: false,
  },
  {
    title: "Mentores (Admin)",
    href: "/mentals",
    description: "Gerenciar Mentores",
    routeType: RouteType.ADMIN,
    Icon: LuBrain,
    hide: false,
  },
  {
    title: "Campanhas",
    href: "/opportunities",
    description: "Visualizar Campanhas Atuais",
    routeType: RouteType.PUBLIC,
    Icon: PiBellSimple,
    hide: false,
  },
  {
    title: "Precificação",
    href: "/quotations",
    description: "Realizar e Visualizar Precificações",
    routeType: RouteType.PUBLIC,
    Icon: BsCalculator,
    hide: false,
  },
  {
    title: "Insights",
    href: "/insights",
    description: "Visualizar Insights Sob Medida",
    routeType: RouteType.PUBLIC,
    Icon: FiTrendingUp,
    hide: false,
  },
  {
    title: "Mentores",
    href: "/chat",
    description: "Conversar com Mentores",
    routeType: RouteType.PUBLIC,
    Icon: HiOutlineChatBubbleOvalLeft,
    hide: false,
  },
];

export const noAuthRoutes: string[] = ["/", "/password-recovery"];
