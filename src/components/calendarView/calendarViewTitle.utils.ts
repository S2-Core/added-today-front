import { DatesSetArg } from "@fullcalendar/core/index.js";

const monthYearFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const getCalendarToolbarTitle = (dateInfo: DatesSetArg): string => {
  const baseDate = dateInfo.view.currentStart || dateInfo.start;

  return monthYearFormatter.format(baseDate);
};
