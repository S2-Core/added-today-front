export const formatUtcDateKey = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const capitalizeLabel = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const formatUtcWeekdayLabel = (
  date: Date,
  variant: "short" | "long" = "short",
): string => {
  const rawLabel = new Intl.DateTimeFormat("pt-BR", {
    weekday: variant,
    timeZone: "UTC",
  })
    .format(date)
    .replace(".", "")
    .trim();

  const normalizedLabel =
    variant === "long" ? rawLabel.replace("-feira", "").trim() : rawLabel;

  return capitalizeLabel(normalizedLabel);
};

export const formatUtcDayLabel = (date: Date): string =>
  formatUtcWeekdayLabel(date, "short");

export const formatUtcDayNumberLabel = (date: Date): string =>
  String(date.getUTCDate()).padStart(2, "0");

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
