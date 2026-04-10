import { ICalendarItem } from "@/contexts/calendar/interfaces";

import {
  formatCalendarDayEarningsLabel,
  formatCalendarDaySummaryDate,
  getCalendarDayItemsCountLabel,
  sumCalendarDayEarnings,
} from "../utils/calendarDayItems.utils";

interface IProps {
  date: Date;
  items: ICalendarItem[];
}

const CalendarDayItemsSummary = ({ date, items }: IProps) => {
  const totalEarnings = sumCalendarDayEarnings(items);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium uppercase tracking-wide text-primary">
        Atividades do dia
      </span>

      <h2 className="font-title text-2xl font-semibold text-foreground">
        {formatCalendarDaySummaryDate(date)}
      </h2>

      <span className="text-sm text-foreground/60">
        {getCalendarDayItemsCountLabel(items)}
      </span>

      {totalEarnings > 0 && (
        <span className="inline-flex w-fit rounded-full bg-success-light/25 px-3 py-1 text-sm font-semibold text-success">
          Ganhos do dia: {formatCalendarDayEarningsLabel(totalEarnings)}
        </span>
      )}
    </div>
  );
};

export default CalendarDayItemsSummary;
