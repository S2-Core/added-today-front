import { IconType } from "react-icons";

export interface IDashboardCard {
  Icon: IconType;
  title: string;
  description: string;
  href: string;
}

export interface IDashboardMental {
  image: string;
  locked: boolean;
  description: string;
  name?: string;
}
