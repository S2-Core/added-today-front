import { FaUsers } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";
import { PiBellSimple } from "react-icons/pi";
import { IoBookOutline, IoCalculatorOutline } from "react-icons/io5";
import { FiTrendingUp } from "react-icons/fi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { GrPlan } from "react-icons/gr";
import { FaRegAddressBook } from "react-icons/fa";

import { IRouteLinks } from "./interfaces";

export enum RouteType {
  PUBLIC = "PUBLIC",
  SELF = "SELF",
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
    href: "/campaigns",
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
    title: "Mentals",
    href: "/chat",
    description: "Conversar com mentals",
    routeType: RouteType.PUBLIC,
    Icon: HiOutlineChatBubbleOvalLeft,
    hide: false,
  },
  {
    title: "Sobre",
    href: "/about",
    description: "Visualizar informações sobre a plataforma",
    routeType: RouteType.PUBLIC,
    Icon: IoBookOutline,
    hide: false,
  },
  {
    title: "Meu perfil",
    href: "/profile",
    description: "Visualizar meu perfil",
    routeType: RouteType.SELF,
    Icon: FaRegAddressBook,
    hide: true,
  },
  {
    title: "Planos",
    href: "/plans",
    description: "Visualizar planos disponíveis",
    routeType: RouteType.PUBLIC,
    Icon: GrPlan,
    hide: true,
  },
];

export const noAuthRoutes: string[] = ["/", "/register", "/new-password"];
