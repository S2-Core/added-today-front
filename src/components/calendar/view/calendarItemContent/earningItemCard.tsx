import { FiDollarSign } from "react-icons/fi";

import { EarningStatus } from "@/constants/calendar";
import { formatCurrency } from "@/utils/number.utils";
import { getMonthCardText, getWeekCardText } from "./shared";

interface IProps {
  title: string;
  item: Record<string, unknown>;
  isMonthView: boolean;
}

const EarningItemCard = ({ item, isMonthView }: IProps) => {
  const status = item.status as keyof typeof EarningStatus;
  const sourceLabel = item.sourceLabel as string | undefined;
  const description = item.description as string | undefined;
  const amountCents = Number(item.amountCents || 0);
  const secondaryText = isMonthView
    ? getMonthCardText(sourceLabel || description)
    : getWeekCardText(sourceLabel || description);

  if (isMonthView) {
    return (
      <div className="flex min-h-[70px] max-w-full items-start gap-2 overflow-hidden rounded-xl border-l-4 border-l-green-500 bg-green-50 px-2.5 py-2 shadow-sm">
        <FiDollarSign className="mt-0.5 shrink-0 text-green-600" />

        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate text-xs font-semibold text-green-700">
            {formatCurrency(amountCents / 100, "BRL")}
          </p>

          {secondaryText && (
            <p className="mt-0.5 line-clamp-2 break-words text-[11px] leading-4 text-foreground">
              {secondaryText}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-1">
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] text-green-700">
              {EarningStatus[status]}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[128px] max-w-full flex-col gap-3 overflow-hidden rounded-2xl border-l-4 border-l-green-500 bg-green-50 p-3 shadow-sm transition-all duration-300 hover:bg-green-100">
      <div className="flex items-start gap-2">
        <FiDollarSign className="mt-1 shrink-0 text-base text-green-600" />

        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate text-2xl font-bold text-green-700">
            {formatCurrency(amountCents / 100, "BRL")}
          </p>

          {secondaryText && (
            <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-foreground">
              {secondaryText}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs text-green-700">
          {EarningStatus[status]}
        </span>
      </div>
    </div>
  );
};

export default EarningItemCard;
