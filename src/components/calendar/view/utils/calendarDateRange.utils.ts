import { DatesSetArg } from "@fullcalendar/core/index.js";

export interface ICalendarQueryRange {
  dashboardStart: Date;
  dashboardEnd: Date;
  itemsStart: Date;
  itemsEnd: Date;
}

const cloneDate = (date: Date): Date => new Date(date.getTime());

const getUtcDayStart = (date: Date): Date => {
  const normalizedDate = cloneDate(date);

  normalizedDate.setUTCHours(0, 0, 0, 0);

  return normalizedDate;
};

const getUtcDayEnd = (date: Date): Date => {
  const normalizedDate = cloneDate(date);

  normalizedDate.setUTCHours(23, 59, 59, 999);

  return normalizedDate;
};

export const buildCalendarQueryRange = (
  dateInfo: DatesSetArg,
): ICalendarQueryRange => {
  const currentStart = dateInfo.view.currentStart || dateInfo.start;
  const currentEnd = dateInfo.view.currentEnd || dateInfo.end;

  const dashboardStart = getUtcDayStart(new Date(currentStart));
  const dashboardEndBase = new Date(currentEnd);
  dashboardEndBase.setUTCDate(dashboardEndBase.getUTCDate() - 1);

  const dashboardEnd = getUtcDayEnd(dashboardEndBase);

  return {
    dashboardStart,
    dashboardEnd,
    itemsStart: dashboardStart,
    itemsEnd: dashboardEnd,
  };
};
