import { FiBriefcase, FiDollarSign, FiPlayCircle } from "react-icons/fi";

import {
  ICampaignCalendarItem,
  ICalendarItem,
  IContentCalendarItem,
  IEarningCalendarItem,
} from "@/contexts/calendar/interfaces";

import CampaignItemCard from "../itemContent/campaignItemCard";
import ContentItemCard from "../itemContent/contentItemCard";
import EarningItemCard from "../itemContent/earningItemCard";
import { getCalendarItemTypeLabel } from "../utils/calendarDayItems.utils";

interface IProps {
  items: ICalendarItem[];
  onSelectItem: (item: ICalendarItem) => void;
}

const getCalendarItemIcon = (item: ICalendarItem) => {
  if (item.type === "CONTENT") return <FiPlayCircle />;
  if (item.type === "CAMPAIGN") return <FiBriefcase />;

  return <FiDollarSign />;
};

const renderCalendarDayItem = (item: ICalendarItem) => {
  if (item.type === "CONTENT") {
    return (
      <ContentItemCard
        title={item.title}
        item={item as IContentCalendarItem}
        isMonthView={false}
      />
    );
  }

  if (item.type === "CAMPAIGN") {
    return (
      <CampaignItemCard
        title={item.title}
        item={item as ICampaignCalendarItem}
        isMonthView={false}
      />
    );
  }

  return (
    <EarningItemCard
      title={item.title}
      item={item as IEarningCalendarItem}
      isMonthView={false}
    />
  );
};

const CalendarDayItemsList = ({ items, onSelectItem }: IProps) => {
  return (
    <div className="flex max-h-[58vh] flex-col gap-3 overflow-y-auto pr-1">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelectItem(item)}
          className="cursor-pointer text-left transition-all duration-300 hover:opacity-95"
          title={`${getCalendarItemTypeLabel(item)}: ${item.title}`}
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-secondary/12 px-3 py-1 text-xs font-semibold text-foreground/70">
            <span className="text-sm text-primary">
              {getCalendarItemIcon(item)}
            </span>
            <span>{getCalendarItemTypeLabel(item)}</span>
          </div>

          {renderCalendarDayItem(item)}
        </button>
      ))}
    </div>
  );
};

export default CalendarDayItemsList;
