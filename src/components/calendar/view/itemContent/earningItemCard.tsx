import { FiDollarSign } from "react-icons/fi";

import { EarningStatus } from "@/constants/calendar";
import { formatCurrency } from "@/utils/number.utils";

import BaseItemCard from "./baseItemCard";
import { IItemCardChip } from "./itemCard.types";
import { IEarningItemCardProps } from "./itemContent.types";
import { getMonthCardText, getWeekCardText } from "./shared";

const EarningItemCard = ({ item, isMonthView }: IEarningItemCardProps) => {
  const secondaryText = isMonthView
    ? getMonthCardText(item.sourceLabel || item.description)
    : getWeekCardText(item.sourceLabel || item.description);

  const chips: IItemCardChip[] = [
    {
      label: EarningStatus[item.status],
      className: "bg-green-100 text-green-700",
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
          ? "border-l-4 border-l-green-500 bg-green-50"
          : "border-l-4 border-l-green-500 bg-green-50 hover:bg-green-100"
      }
      iconClassName="text-green-600"
      titleClassName={
        isMonthView ? "text-green-700" : "text-green-700 text-2xl font-bold"
      }
    />
  );
};

export default EarningItemCard;
