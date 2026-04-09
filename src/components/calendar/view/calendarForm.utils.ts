import {
  ICalendarItem,
  ICreateCalendarItem,
  ICreateCampaignCalendarItem,
  ICreateContentCalendarItem,
  ICreateEarningCalendarItem,
} from "@/contexts/calendar/interfaces";
import { formatInputNumber } from "@/utils/number.utils";

export type CalendarFormValues = ICreateCalendarItem;

export const formatCalendarDateForInput = (
  dateValue: Date | string,
): string => {
  const parsedDate =
    typeof dateValue === "string" ? new Date(dateValue) : dateValue;

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getUTCFullYear();
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const normalizeCalendarDateInputValue = (
  dateValue?: string | Date | null,
): string => {
  if (!dateValue) return "";

  if (dateValue instanceof Date) {
    if (Number.isNaN(dateValue.getTime())) {
      return "";
    }

    return formatCalendarDateForInput(dateValue);
  }

  if (typeof dateValue !== "string") {
    return "";
  }

  return dateValue.trim();
};

export const normalizeCalendarDateForForm = (
  dateValue?: string | Date | null,
): string => {
  const normalizedDate = normalizeCalendarDateInputValue(dateValue);

  if (!normalizedDate) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) {
    return normalizedDate;
  }

  if (normalizedDate.includes("T")) {
    return normalizeCalendarDateForForm(normalizedDate.split("T")[0]);
  }

  if (normalizedDate.includes("/")) {
    const [dayString, monthString, yearString] = normalizedDate.split("/");
    const day = Number(dayString);
    const month = Number(monthString);
    const year = Number(yearString);

    if ([year, month, day].some(Number.isNaN)) {
      return "";
    }

    const parsedDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return formatCalendarDateForInput(parsedDate);
  }

  const parsedDate = new Date(normalizedDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return formatCalendarDateForInput(parsedDate);
};

const buildUtcDate = (year: number, month: number, day: number): Date => {
  const parsedDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.getUTCFullYear() !== year ||
    parsedDate.getUTCMonth() !== month - 1 ||
    parsedDate.getUTCDate() !== day
  ) {
    throw new Error("Data inválida para o calendário.");
  }

  return parsedDate;
};

export const formatCalendarDateToIso = (dateValue: string): string => {
  const normalizedDate = normalizeCalendarDateForForm(dateValue);

  if (!normalizedDate) {
    throw new Error("Data inválida para o calendário.");
  }

  const [yearString, monthString, dayString] = normalizedDate.split("-");
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);

  if ([year, month, day].some(Number.isNaN)) {
    throw new Error("Data inválida para o calendário.");
  }

  return buildUtcDate(year, month, day).toISOString();
};

export const createEmptyCalendarFormValues = (
  type: CalendarFormValues["type"] = "CONTENT",
  startsAt = "",
): CalendarFormValues =>
  ({
    type,
    title: "",
    startsAt: normalizeCalendarDateForForm(startsAt),
    hook: "",
    isAllDay: true,
    status: undefined,
    description: "",
    contentType: "",
    platform: "",
    earningType: "",
    amountCents: "",
    currency: "BRL",
    source: "",
    brand: "",
  }) as unknown as CalendarFormValues;

export const mapCalendarItemToFormValues = (
  item: ICalendarItem,
): CalendarFormValues => {
  const itemWithSourceLabel = item as Partial<ICalendarItem> & {
    sourceLabel?: string;
  };

  return {
    type: item.type,
    title: item.title,
    startsAt: item.startsAt ? formatCalendarDateForInput(item.startsAt) : "",
    isAllDay: true,
    status: item.status,
    description: item.description || "",
    hook: (item as Partial<ICreateContentCalendarItem>).hook || "",
    contentType:
      (item as Partial<ICreateContentCalendarItem>).contentType || "",
    platform: (item as Partial<ICreateContentCalendarItem>).platform || "",
    earningType:
      (item as Partial<ICreateEarningCalendarItem>).earningType || "",
    amountCents:
      formatInputNumber(
        ((item as Partial<ICreateEarningCalendarItem>).amountCents || 0) / 100,
      ) || "",
    currency: "BRL",
    source: itemWithSourceLabel.sourceLabel || "",
    brand: (item as Partial<ICreateCampaignCalendarItem>).brand || "",
  } as unknown as CalendarFormValues;
};
