import { DatesSetArg } from "@fullcalendar/core/index.js";

export interface ICalendarQueryRange {
  viewStart: number;
  viewEnd: number;
  start: Date;
  end: Date;
}

export const buildCalendarQueryRange = (
  dateInfo: DatesSetArg,
): ICalendarQueryRange => {
  const viewStart = new Date(dateInfo.start).getTime();
  const viewEnd = new Date(dateInfo.end).getTime();

  const baseDate = new Date(dateInfo.start);

  const start = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  start.setDate(start.getDate() - 30);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 89);
  end.setHours(23, 59, 59, 999);

  return {
    viewStart,
    viewEnd,
    start,
    end,
  };
};
