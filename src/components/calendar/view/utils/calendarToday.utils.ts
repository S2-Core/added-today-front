export const formatUtcDateKey = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatUtcDayLabel = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    timeZone: "UTC",
  })
    .format(date)
    .replace(".", "");
};

export const formatUtcDayMonthLabel = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC",
  }).format(date);
};

export const isSameUtcDay = (left: Date, right: Date): boolean => {
  return formatUtcDateKey(left) === formatUtcDateKey(right);
};
