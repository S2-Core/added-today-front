import { EventContentArg } from "@fullcalendar/core/index.js";
import { FiBriefcase, FiDollarSign, FiPlayCircle } from "react-icons/fi";

import {
  ICampaignCalendarItem,
  ICalendarItem,
  IContentCalendarItem,
  IEarningCalendarItem,
} from "@/contexts/calendar/interfaces";

import CampaignItemCard from "./campaignItemCard";
import ContentItemCard from "./contentItemCard";
import EarningItemCard from "./earningItemCard";

interface IProps {
  eventInfo: EventContentArg;
  currentView: "dayGridWeek" | "dayGridMonth";
  isSmallMobile: boolean;
  isMobile: boolean;
  isWeekCompact: boolean;
}

interface ICompactIndicatorProps {
  item: ICalendarItem;
  title: string;
  isWeekCompact: boolean;
}

const CompactCalendarItemIndicator = ({
  item,
  title,
  isWeekCompact,
}: ICompactIndicatorProps) => {
  const iconMap = {
    CONTENT: {
      icon: <FiPlayCircle />,
      wrapperClassName: "bg-primary/12 text-primary",
      label: "Conteúdo",
    },
    CAMPAIGN: {
      icon: <FiBriefcase />,
      wrapperClassName: "bg-tertiary/12 text-tertiary",
      label: "Campanha",
    },
    EARNING: {
      icon: <FiDollarSign />,
      wrapperClassName: "bg-success-light/35 text-success",
      label: "Ganho",
    },
  } as const;

  const config = iconMap[item.type];

  return (
    <div
      title={`${config.label}: ${title}`}
      aria-label={`${config.label}: ${title}`}
      className={[
        "inline-flex items-center justify-center rounded-full ring-1 ring-black/5",
        isWeekCompact ? "h-8 w-8" : "h-5 w-5",
        config.wrapperClassName,
      ].join(" ")}
    >
      <span className={isWeekCompact ? "text-sm" : "text-xs"}>
        {config.icon}
      </span>
    </div>
  );
};

const CalendarItemContent = ({
  eventInfo,
  currentView,
  isMobile,
  isWeekCompact,
}: IProps) => {
  const {
    event: { title, extendedProps },
    view,
  } = eventInfo;

  const isMonthView = view.type === "dayGridMonth";
  const item = extendedProps as ICalendarItem;

  const shouldUseCompactIndicator =
    (currentView === "dayGridMonth" && isMobile) ||
    (currentView === "dayGridWeek" && isWeekCompact);

  if (shouldUseCompactIndicator) {
    return (
      <CompactCalendarItemIndicator
        item={item}
        title={title}
        isWeekCompact={currentView === "dayGridWeek"}
      />
    );
  }

  if (item.type === "CONTENT") {
    return (
      <ContentItemCard
        title={title}
        item={item as IContentCalendarItem}
        isMonthView={isMonthView}
      />
    );
  }

  if (item.type === "CAMPAIGN") {
    return (
      <CampaignItemCard
        title={title}
        item={item as ICampaignCalendarItem}
        isMonthView={isMonthView}
      />
    );
  }

  return (
    <EarningItemCard
      title={title}
      item={item as IEarningCalendarItem}
      isMonthView={isMonthView}
    />
  );
};

export default CalendarItemContent;
