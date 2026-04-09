import {
  ICalendarItem,
  ICreateCalendarItem,
  ICreateCampaignCalendarItem,
  ICreateContentCalendarItem,
  ICreateEarningCalendarItem,
} from "@/contexts/calendar/interfaces";
import { formatInputNumber, formatToDateTimeLocal } from "@/utils/number.utils";

export type CalendarFormValues = ICreateCalendarItem;

export const createEmptyCalendarFormValues = (
  type: CalendarFormValues["type"] = "CONTENT",
): CalendarFormValues =>
  ({
    type,
    title: "",
    startsAt: "",
    endsAt: "",
    hook: "",
    isAllDay: false,
    status: undefined,
    description: "",
    contentType: "",
    platform: "",
    earningType: "",
    amountCents: "",
    currency: "",
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
    startsAt: item.startsAt
      ? !item.isAllDay
        ? formatToDateTimeLocal(new Date(item.startsAt))
        : item.startsAt.split("T")[0]
      : "",
    endsAt: item.endsAt
      ? !item.isAllDay
        ? formatToDateTimeLocal(new Date(item.endsAt))
        : item.endsAt.split("T")[0]
      : "",
    isAllDay: item.isAllDay,
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
    currency: (item as Partial<ICreateEarningCalendarItem>).currency || "",
    source: itemWithSourceLabel.sourceLabel || "",
    brand: (item as Partial<ICreateCampaignCalendarItem>).brand || "",
  } as unknown as CalendarFormValues;
};
