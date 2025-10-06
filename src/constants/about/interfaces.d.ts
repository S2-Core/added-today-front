import { IconType } from "react-icons";

export interface IAboutItem {
  title: string;
  description: string;
}

type IHighlightItem = IAboutItem & {
  Icon: IconType;
};

export interface IAboutItems {
  highlight: IHighlightItem;
  items: IAboutItem[];
}
