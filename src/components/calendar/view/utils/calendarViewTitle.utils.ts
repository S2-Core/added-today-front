import { DatesSetArg } from "@fullcalendar/core/index.js";

const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  timeZone: "UTC",
});

const yearFormatter = new Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  timeZone: "UTC",
});

const capitalizeLabel = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const getCalendarToolbarTitle = (dateInfo: DatesSetArg): string => {
  const baseDate = dateInfo.view.currentStart || dateInfo.start;
  const month = capitalizeLabel(monthFormatter.format(baseDate));
  const year = yearFormatter.format(baseDate);

  return `${month} ${year}`;
};
