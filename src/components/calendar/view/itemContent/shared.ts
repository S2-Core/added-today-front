export const clampText = (text?: string | null, maxLength = 48): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}...`;
};

export const getWeekCardText = (text?: string | null): string =>
  clampText(text, 42);

export const getMonthCardText = (text?: string | null): string =>
  clampText(text, 14);
