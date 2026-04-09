import { FiPlayCircle } from "react-icons/fi";

import { ContentPlatform, ContentStatus } from "@/constants/calendar";

import BaseItemCard from "./baseItemCard";
import { IItemCardChip } from "./itemCard.types";
import { IContentItemCardProps } from "./itemContent.types";
import { getMonthCardText, getWeekCardText } from "./shared";

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
      className: "bg-blue-100 text-blue-700",
    },
    {
      label: ContentStatus[item.status],
      className: "bg-green-100 text-green-700",
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
          ? "border-l-4 border-l-blue-400 bg-blue-50"
          : "border-l-4 border-l-blue-400 bg-blue-50 hover:bg-blue-100"
      }
      iconClassName="text-blue-600"
      titleClassName="text-blue-700"
    />
  );
};

export default ContentItemCard;
