import { IconType } from "react-icons";

export interface IAboutItem {
  Icon?: IconType;
  iconColor?: string;
  title: string;
  subtitle?: string;
  description?: string;
  list?: { id: string; Icon?: IconType; text: string; description: string }[];
}

export interface IAboutItems {
  highlight: Omit<IAboutItem, "Icon">;
  items: IAboutItem[];
  footerMessage: Omit<IAboutItem, "Icon" | "list" | "subtitle">;
}
