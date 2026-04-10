import { ICalendarItem } from "@/contexts/calendar/interfaces";
import { formatCurrency } from "@/utils/number.utils";

import { formatUtcDateKey } from "./calendarToday.utils";

export interface ICalendarDayItemsModalState {
  date: Date;
  items: ICalendarItem[];
}

export const getCalendarItemsByDate = (
  calendarItems: ICalendarItem[],
  date: Date,
): ICalendarItem[] => {
  const targetDateKey = formatUtcDateKey(date);

  return calendarItems.filter((item) => {
    const parsedItemDate = new Date(item.startsAt);

    if (Number.isNaN(parsedItemDate.getTime())) {
      return false;
    }

    return formatUtcDateKey(parsedItemDate) === targetDateKey;
  });
};

export const sumCalendarDayEarnings = (
  calendarItems: ICalendarItem[],
): number => {
  return calendarItems.reduce((totalAmount, item) => {
    if (item.type !== "EARNING") {
      return totalAmount;
    }

    return totalAmount + item.amountCents;
  }, 0);
};

export const formatCalendarDaySummaryDate = (date: Date): string =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

export const getCalendarDayItemsCountLabel = (
  calendarItems: ICalendarItem[],
): string => {
  const totalItems = calendarItems.length;

  return `${totalItems} ${
    totalItems === 1 ? "atividade encontrada" : "atividades encontradas"
  }`;
};

export const getCalendarItemTypeLabel = (item: ICalendarItem): string => {
  if (item.type === "CONTENT") return "Conteúdo";
  if (item.type === "CAMPAIGN") return "Campanha";

  return "Ganho";
};

export const formatCalendarDayEarningsLabel = (amountCents: number): string =>
  formatCurrency(amountCents / 100, "BRL");

export const formatCompactCalendarEarnings = (amountCents: number): string => {
  const amount = amountCents / 100;

  if (amount >= 10000) {
    return `R$${Math.round(amount / 1000)}k`;
  }

  if (amount >= 1000) {
    const compactValue =
      amount % 1000 === 0
        ? String(Math.round(amount / 1000))
        : (amount / 1000).toFixed(1).replace(".", ",");

    return `R$${compactValue}k`;
  }

  return `R$${Math.round(amount)}`;
};
