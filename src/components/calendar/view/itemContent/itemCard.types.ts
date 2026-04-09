import { ReactNode } from "react";

export interface IItemCardChip {
  label: string;
  className: string;
}

export interface IBaseItemCardProps {
  icon: ReactNode;
  title: string;
  secondaryText?: string;
  chips: IItemCardChip[];
  isMonthView: boolean;
  containerClassName: string;
  iconClassName: string;
  titleClassName: string;
  secondaryTextClassName?: string;
}
