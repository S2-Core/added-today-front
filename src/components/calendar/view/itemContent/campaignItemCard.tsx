import { FiBriefcase } from "react-icons/fi";

import { CampaignStatus } from "@/constants/calendar";

import BaseItemCard from "./baseItemCard";
import { IItemCardChip } from "./itemCard.types";
import { ICampaignItemCardProps } from "./itemContent.types";
import { getMonthCardText, getWeekCardText } from "./shared";

const CAMPAIGN_STATUS_STYLES: Record<keyof typeof CampaignStatus, string> = {
  PLANNED: "bg-secondary/18 text-tertiary",
  IN_PROGRESS: "bg-tertiary/12 text-tertiary",
  COMPLETED: "bg-success-light/45 text-success",
  CANCELED: "bg-error/10 text-error",
};

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
            className: "bg-foreground/6 text-foreground/70",
          },
        ]
      : []),
    {
      label: CampaignStatus[item.status],
      className: CAMPAIGN_STATUS_STYLES[item.status],
    },
  ];

  return (
    <BaseItemCard
      icon={<FiBriefcase />}
      title={title}
      secondaryText={secondaryText}
      chips={chips}
      isMonthView={isMonthView}
      containerClassName={
        isMonthView
          ? "border-l-4 border-l-tertiary bg-tertiary/8"
          : "border-l-4 border-l-tertiary bg-tertiary/8 hover:bg-tertiary/12"
      }
      iconClassName="text-tertiary"
      titleClassName="text-foreground"
      secondaryTextClassName="text-foreground/75"
    />
  );
};

export default CampaignItemCard;
