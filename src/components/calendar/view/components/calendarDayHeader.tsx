import { FiPlus } from "react-icons/fi";

import {
  formatUtcDayMonthLabel,
  formatUtcDayNumberLabel,
  formatUtcWeekdayLabel,
  isSameUtcDay,
} from "../utils/calendarToday.utils";

interface IProps {
  date: Date;
  currentView: "dayGridWeek" | "dayGridMonth";
  isMobile: boolean;
  isTablet: boolean;
  onAddItemByDate: (date: Date) => void;
}

const CalendarDayHeader = ({
  date,
  currentView,
  isMobile,
  isTablet,
  onAddItemByDate,
}: IProps) => {
  const weekdayLabel = formatUtcWeekdayLabel(
    date,
    isMobile || isTablet ? "short" : "long",
  );
  const dateLabel = isMobile
    ? formatUtcDayNumberLabel(date)
    : formatUtcDayMonthLabel(date);
  const isToday = isSameUtcDay(date, new Date());

  if (currentView !== "dayGridWeek") {
    return (
      <div className="py-2 text-center">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-8">
          {formatUtcWeekdayLabel(date, "short")}
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-h-[5.4rem] flex-col justify-between gap-2 p-2 sm:min-h-[6.5rem] sm:gap-2.5 sm:p-3">
      <div className="flex flex-col items-start gap-1">
        <span className="text-sm font-semibold uppercase tracking-wide text-foreground sm:text-[15px]">
          {weekdayLabel}
        </span>

        <span
          className={[
            "inline-flex min-w-[2rem] items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-medium sm:min-w-[3rem] sm:px-2.5 sm:py-1",
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
        aria-label="Adicionar atividade neste dia"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onAddItemByDate(date);
        }}
        className={[
          "cursor-pointer items-center justify-center rounded-full bg-secondary/18 text-primary transition-all duration-300 hover:bg-secondary/28",
          isMobile
            ? "inline-flex h-8 w-8 self-start"
            : "inline-flex w-full gap-2 px-3 py-2 text-sm font-medium",
        ].join(" ")}
      >
        <FiPlus className="text-sm" />
        {!isMobile && <span>Adicionar</span>}
      </button>
    </div>
  );
};

export default CalendarDayHeader;
