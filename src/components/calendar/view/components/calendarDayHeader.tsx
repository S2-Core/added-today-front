import { FiPlus } from "react-icons/fi";

import {
  formatUtcDayLabel,
  formatUtcDayMonthLabel,
  isSameUtcDay,
} from "../utils/calendarToday.utils";

interface IProps {
  date: Date;
  currentView: "dayGridWeek" | "dayGridMonth";
  onAddItemByDate: (date: Date) => void;
}

const CalendarDayHeader = ({ date, currentView, onAddItemByDate }: IProps) => {
  const weekdayLabel = formatUtcDayLabel(date);
  const dateLabel = formatUtcDayMonthLabel(date);
  const isToday = isSameUtcDay(date, new Date());

  if (currentView !== "dayGridWeek") {
    return (
      <div className="py-2 text-center">
        <span className="text-xs font-semibold uppercase text-gray-8">
          {weekdayLabel}
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-h-24 flex-col items-start gap-3 p-3">
      <div className="flex items-center gap-2">
        <span className="text-base font-semibold capitalize text-foreground">
          {weekdayLabel}
        </span>

        <span
          className={[
            "rounded-full px-2.5 py-1 text-sm font-medium",
            isToday
              ? "bg-primary/15 text-primary"
              : "bg-secondary/25 text-foreground",
          ].join(" ")}
        >
          {dateLabel}
        </span>
      </div>

      <button
        tabIndex={-1}
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onAddItemByDate(date);
        }}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-secondary/18 px-3 py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-secondary/28"
      >
        <FiPlus className="text-sm" />
        <span>Adicionar</span>
      </button>
    </div>
  );
};

export default CalendarDayHeader;
