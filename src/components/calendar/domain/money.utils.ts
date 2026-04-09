export const parseCurrencyToCents = (value: string): number => {
  if (!value) return 0;

  const cleaned = value.trim();

  const normalized = cleaned.replace(/\./g, "").replace(",", ".");

  const floatValue = Number(normalized);

  if (Number.isNaN(floatValue)) return 0;

  return Math.round(floatValue * 100);
};
