import {
  ICalendarItem,
  ICreateCalendarItem,
  ICreateCampaignCalendarItem,
  ICreateContentCalendarItem,
  ICreateEarningCalendarItem,
} from "@/contexts/calendar/interfaces";
import { formatInputNumber } from "@/utils/number.utils";

import {
  formatCalendarDateForInput,
  formatCalendarDateToIso,
  normalizeCalendarDateForForm,
} from "./date.utils";
import { parseCurrencyToCents } from "./money.utils";

export type CalendarFormValues = ICreateCalendarItem;

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

export const normalizeAmountCents = (
  amountCents?: string | number,
): number | undefined => {
  if (amountCents === undefined || amountCents === null || amountCents === "") {
    return undefined;
  }

  if (typeof amountCents === "number") {
    return amountCents;
  }

  return parseCurrencyToCents(amountCents);
};

export const buildCalendarSubmitPayload = (
  data: CalendarFormValues,
): CalendarFormValues => {
  const normalizedStartsAt = normalizeCalendarDateForForm(data.startsAt);

  const formattedData = {
    ...data,
    isAllDay: true,
    startsAt: formatCalendarDateToIso(normalizedStartsAt),
  } as CalendarFormValues;

  if (formattedData.type === "EARNING") {
    const normalizedAmountCents = normalizeAmountCents(
      formattedData.amountCents,
    );

    if (normalizedAmountCents !== undefined) {
      formattedData.amountCents = normalizedAmountCents;
    }

    formattedData.currency = "BRL";

    if ("description" in formattedData) {
      delete (formattedData as { description?: string }).description;
    }
  }

  return Object.fromEntries(
    Object.entries(formattedData).filter(([_, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string") return value.trim() !== "";
      return true;
    }),
  ) as unknown as CalendarFormValues;
};
