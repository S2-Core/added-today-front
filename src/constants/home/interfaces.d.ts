import { IconType } from "react-icons";

export interface IHomeCard {
  Icon: IconType;
  title: string;
  description: string;
  href: string;
}

export interface IHomeMental {
  image: string;
  locked: boolean;
  description: string;
  name?: string;
}
