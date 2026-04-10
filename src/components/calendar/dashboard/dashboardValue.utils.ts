import { IDashboard } from "@/contexts/calendar/interfaces";
import { formatCurrency } from "@/utils/number.utils";

export const getMostUsedPlatform = (
  contentsByPlatform: IDashboard["contentsByPlatform"],
) =>
  contentsByPlatform.reduce(
    (prev, current) => (current.count > prev.count ? current : prev),
    {
      count: 0,
      platform: "OTHER" as const,
    },
  ).platform;

export const formatDashboardCurrencyFromCents = (
  amountCents: number,
  currency: string,
): string => {
  return formatCurrency(amountCents / 100, currency);
};

export const formatGrowthPercentage = (value?: number | null): string => {
  const safeValue = value || 0;
  const prefix = safeValue > 0 ? "+" : "";

  return `${prefix}${safeValue.toFixed(2).replace(".", ",")}%`;
};

export const formatCountLabel = (
  count: number,
  singular: string,
  plural: string,
): string => {
  return `${count} ${count === 1 ? singular : plural}`;
};
