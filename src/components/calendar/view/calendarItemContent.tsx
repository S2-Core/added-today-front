import { EventContentArg } from "@fullcalendar/core/index.js";

import CampaignItemCard from "./calendarItemContent/campaignItemCard";
import ContentItemCard from "./calendarItemContent/contentItemCard";
import EarningItemCard from "./calendarItemContent/earningItemCard";

interface IProps {
  eventInfo: EventContentArg;
}

const CalendarItemContent = ({ eventInfo }: IProps) => {
  const {
    event: { title, extendedProps },
    view,
  } = eventInfo;

  const item = extendedProps as Record<string, unknown>;
  const isMonthView = view.type === "dayGridMonth";

  if (item.type === "CONTENT") {
    return (
      <ContentItemCard title={title} item={item} isMonthView={isMonthView} />
    );
  }

  if (item.type === "CAMPAIGN") {
    return (
      <CampaignItemCard title={title} item={item} isMonthView={isMonthView} />
    );
  }

  return (
    <EarningItemCard title={title} item={item} isMonthView={isMonthView} />
  );
};

export default CalendarItemContent;
