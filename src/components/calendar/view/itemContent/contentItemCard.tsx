import { FiPlayCircle } from "react-icons/fi";

import { ContentPlatform, ContentStatus } from "@/constants/calendar";

import BaseItemCard from "./baseItemCard";
import { IItemCardChip } from "./itemCard.types";
import { IContentItemCardProps } from "./itemContent.types";
import { getMonthCardText, getWeekCardText } from "./shared";

const CONTENT_STATUS_STYLES: Record<keyof typeof ContentStatus, string> = {
  IDEA: "bg-secondary/20 text-primary",
  TO_POST: "bg-warning/15 text-warning",
  POSTED: "bg-success-light/45 text-success",
};

const ContentItemCard = ({
  title,
  item,
  isMonthView,
}: IContentItemCardProps) => {
  const secondaryText = isMonthView
    ? getMonthCardText(item.hook || item.description)
    : getWeekCardText(item.hook || item.description);

  const chips: IItemCardChip[] = [
    {
      label: ContentPlatform[item.platform],
      className: "bg-primary/10 text-primary",
    },
    {
      label: ContentStatus[item.status],
      className: CONTENT_STATUS_STYLES[item.status],
    },
  ];

  return (
    <BaseItemCard
      icon={<FiPlayCircle />}
      title={title}
      secondaryText={secondaryText}
      chips={chips}
      isMonthView={isMonthView}
      containerClassName={
        isMonthView
          ? "border-l-4 border-l-primary bg-primary/7"
          : "border-l-4 border-l-primary bg-primary/7 hover:bg-primary/11"
      }
      iconClassName="text-primary"
      titleClassName="text-foreground"
      secondaryTextClassName="text-foreground/75"
    />
  );
};

export default ContentItemCard;
