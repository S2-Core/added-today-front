import { IconType } from "react-icons";

import { RouteType } from ".";

export interface IRouteLinks {
  title: string;
  href: string;
  description: string;
  routeType: RouteType;
  Icon: IconType;
  hide: boolean;
  navigationRote: boolean;
}
