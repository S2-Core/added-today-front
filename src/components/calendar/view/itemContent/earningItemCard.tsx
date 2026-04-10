import { FiDollarSign } from "react-icons/fi";

import { EarningStatus, EarningType } from "@/constants/calendar";
import { formatCurrency } from "@/utils/number.utils";

import BaseItemCard from "./baseItemCard";
import { IItemCardChip } from "./itemCard.types";
import { IEarningItemCardProps } from "./itemContent.types";
import { getMonthCardText, getWeekCardText } from "./shared";

const EARNING_STATUS_STYLES: Record<keyof typeof EarningStatus, string> = {
  EXPECTED: "bg-secondary/20 text-primary",
  RECEIVED: "bg-success-light/45 text-success",
  CANCELED: "bg-error/10 text-error",
};

const EarningItemCard = ({ item, isMonthView }: IEarningItemCardProps) => {
  const secondaryText = isMonthView
    ? getMonthCardText(item.sourceLabel || item.description)
    : getWeekCardText(item.sourceLabel || item.description);

  const chips: IItemCardChip[] = [
    {
      label: EarningType[item.earningType],
      className: "bg-foreground/6 text-foreground/70",
    },
    {
      label: EarningStatus[item.status],
      className: EARNING_STATUS_STYLES[item.status],
    },
  ];

  return (
    <BaseItemCard
      icon={<FiDollarSign />}
      title={formatCurrency(item.amountCents / 100, "BRL")}
      secondaryText={secondaryText}
      chips={chips}
      isMonthView={isMonthView}
      containerClassName={
        isMonthView
          ? "border-l-4 border-l-success bg-success-light/20"
          : "border-l-4 border-l-success bg-success-light/20 hover:bg-success-light/30"
      }
      iconClassName="text-success"
      titleClassName={
        isMonthView
          ? "text-success"
          : "text-success text-lg font-bold sm:text-xl"
      }
      secondaryTextClassName="text-foreground/75"
    />
  );
};

export default EarningItemCard;
