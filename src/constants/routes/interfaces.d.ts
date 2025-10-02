import { IconType } from "react-icons";

import { RouteType } from ".";

export interface IRouteLinks {
  title: string;
  href: string;
  description: string;
  routeType: RouteType;
  Icon: null | IconType;
  hide: boolean;
}
