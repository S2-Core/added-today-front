import { FiPlayCircle } from "react-icons/fi";

import { ContentPlatform, ContentStatus } from "@/constants/calendar";
import { getMonthCardText, getWeekCardText } from "./shared";

interface IProps {
  title: string;
  item: Record<string, unknown>;
  isMonthView: boolean;
}

const ContentItemCard = ({ title, item, isMonthView }: IProps) => {
  const platform = item.platform as keyof typeof ContentPlatform;
  const status = item.status as keyof typeof ContentStatus;
  const hook = item.hook as string | undefined;
  const description = item.description as string | undefined;
  const secondaryText = isMonthView
    ? getMonthCardText(hook || description)
    : getWeekCardText(hook || description);

  if (isMonthView) {
    return (
      <div className="flex min-h-[70px] max-w-full items-start gap-2 overflow-hidden rounded-xl border-l-4 border-l-blue-400 bg-blue-50 px-2.5 py-2 shadow-sm">
        <FiPlayCircle className="mt-0.5 shrink-0 text-blue-600" />

        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate text-xs font-semibold text-blue-700">
            {title}
          </p>

          {secondaryText && (
            <p className="mt-0.5 line-clamp-2 break-words text-[11px] leading-4 text-foreground">
              {secondaryText}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-1">
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700">
              {ContentPlatform[platform]}
            </span>

            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] text-green-700">
              {ContentStatus[status]}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[128px] max-w-full flex-col gap-3 overflow-hidden rounded-2xl border-l-4 border-l-blue-400 bg-blue-50 p-3 shadow-sm transition-all duration-300 hover:bg-blue-100">
      <div className="flex items-start gap-2">
        <FiPlayCircle className="mt-1 shrink-0 text-base text-blue-600" />

        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate text-sm font-semibold text-blue-700">
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
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-700">
          {ContentPlatform[platform]}
        </span>

        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs text-green-700">
          {ContentStatus[status]}
        </span>
      </div>
    </div>
  );
};

export default ContentItemCard;
