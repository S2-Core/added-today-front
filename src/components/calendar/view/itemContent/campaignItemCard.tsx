import { FiSend } from "react-icons/fi";

import { CampaignStatus } from "@/constants/calendar";

import BaseItemCard from "./baseItemCard";
import { IItemCardChip } from "./itemCard.types";
import { ICampaignItemCardProps } from "./itemContent.types";
import { getMonthCardText, getWeekCardText } from "./shared";

const CampaignItemCard = ({
  title,
  item,
  isMonthView,
}: ICampaignItemCardProps) => {
  const secondaryText = isMonthView
    ? getMonthCardText(item.description || item.brand)
    : getWeekCardText(item.description || item.brand);

  const chips: IItemCardChip[] = [
    ...(item.brand
      ? [
          {
            label: item.brand,
            className: "bg-violet-100 text-violet-700",
          },
        ]
      : []),
    {
      label: CampaignStatus[item.status],
      className: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <BaseItemCard
      icon={<FiSend />}
      title={title}
      secondaryText={secondaryText}
      chips={chips}
      isMonthView={isMonthView}
      containerClassName={
        isMonthView
          ? "border-l-4 border-l-indigo-500 bg-violet-50"
          : "border-l-4 border-l-indigo-500 bg-violet-50 hover:bg-violet-100"
      }
      iconClassName="text-violet-600"
      titleClassName="text-violet-700"
    />
  );
};

export default CampaignItemCard;
