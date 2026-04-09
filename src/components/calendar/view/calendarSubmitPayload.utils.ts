import {
  CalendarFormValues,
  formatCalendarDateToIso,
  normalizeCalendarDateForForm,
} from "./calendarForm.utils";

export const normalizeAmountCents = (
  amountCents?: string | number,
): number | undefined => {
  if (amountCents === undefined || amountCents === null || amountCents === "") {
    return undefined;
  }

  if (typeof amountCents === "number") {
    return amountCents;
  }

  return Number(amountCents.replace(/\D/g, ""));
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
