import { FiSend } from "react-icons/fi";

import { CampaignStatus } from "@/constants/calendar";
import { getMonthCardText, getWeekCardText } from "./shared";

interface IProps {
  title: string;
  item: Record<string, unknown>;
  isMonthView: boolean;
}

const CampaignItemCard = ({ title, item, isMonthView }: IProps) => {
  const status = item.status as keyof typeof CampaignStatus;
  const brand = item.brand as string | undefined;
  const description = item.description as string | undefined;
  const secondaryText = isMonthView
    ? getMonthCardText(description || brand)
    : getWeekCardText(description || brand);

  if (isMonthView) {
    return (
      <div className="flex min-h-[70px] max-w-full items-start gap-2 overflow-hidden rounded-xl border-l-4 border-l-indigo-500 bg-violet-50 px-2.5 py-2 shadow-sm">
        <FiSend className="mt-0.5 shrink-0 text-violet-600" />

        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate text-xs font-semibold text-violet-700">
            {title}
          </p>

          {secondaryText && (
            <p className="mt-0.5 line-clamp-2 break-words text-[11px] leading-4 text-foreground">
              {secondaryText}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-1">
            {brand && (
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] text-violet-700">
                {brand}
              </span>
            )}

            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] text-purple-700">
              {CampaignStatus[status]}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[128px] max-w-full flex-col gap-3 overflow-hidden rounded-2xl border-l-4 border-l-indigo-500 bg-violet-50 p-3 shadow-sm transition-all duration-300 hover:bg-violet-100">
      <div className="flex items-start gap-2">
        <FiSend className="mt-1 shrink-0 text-base text-violet-600" />

        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate text-sm font-semibold text-violet-700">
            {title}
          </p>

          {secondaryText && (
            <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-foreground">
              {secondaryText}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {brand && (
          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs text-violet-700">
            {brand}
          </span>
        )}

        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs text-purple-700">
          {CampaignStatus[status]}
        </span>
      </div>
    </div>
  );
};

export default CampaignItemCard;
