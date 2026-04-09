import { EventContentArg } from "@fullcalendar/core/index.js";

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
}

const CalendarItemContent = ({ eventInfo }: IProps) => {
  const {
    event: { title, extendedProps },
    view,
  } = eventInfo;

  const isMonthView = view.type === "dayGridMonth";
  const item = extendedProps as ICalendarItem;

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
