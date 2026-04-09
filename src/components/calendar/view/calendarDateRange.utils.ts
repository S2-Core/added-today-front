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

  const start = new Date(
    Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth(), 1),
  );
  start.setUTCDate(start.getUTCDate() - 30);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 89);
  end.setUTCHours(23, 59, 59, 999);

  return {
    viewStart,
    viewEnd,
    start,
    end,
  };
};
