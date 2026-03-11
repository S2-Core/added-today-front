import { IconType } from "react-icons";

export interface IAboutItem {
  title: string;
  subtitle?: string;
  description?: string;
  list?: { id: string; text: string; description: string }[];
}

export interface IAboutItems {
  highlight: IAboutItem & {
    Icon: IconType;
  };
  items: IAboutItem[];
  footerMessage: Omit<IAboutItem, "list" | "subtitle">;
}
