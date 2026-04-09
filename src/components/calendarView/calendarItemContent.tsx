import { EventContentArg } from "@fullcalendar/core/index.js";

import {
  CampaignStatus,
  ContentPlatform,
  ContentStatus,
} from "@/constants/calendar";
import { formatCurrency } from "@/utils/number.utils";

interface IProps {
  eventInfo: EventContentArg;
}

const CalendarItemContent = ({ eventInfo }: IProps) => {
  const {
    event: { title, extendedProps: item },
  } = eventInfo;

  return (
    <div
      className={[
        "flex flex-col gap-1 p-2 overflow-hidden text-xs select-none duration-300 rounded-md transition-all",
        item.type === "CONTENT"
          ? "bg-primary/30 hover:bg-primary/50"
          : item.type === "CAMPAIGN"
            ? "bg-blue-500/30 hover:bg-blue-500/50"
            : "bg-success/30 hover:bg-success/50",
      ].join(" ")}
    >
      <span className="overflow-hidden font-semibold text-foreground text-ellipsis">
        {title}
      </span>

      {item.type === "CONTENT" && (
        <span className="w-full overflow-hidden text-foreground text-ellipsis">
          {`${ContentPlatform[item.platform as keyof typeof ContentPlatform]} • ${ContentStatus[item.status as keyof typeof ContentStatus]}`}
        </span>
      )}

      {item.type === "CAMPAIGN" && (
        <span className="w-full overflow-hidden text-foreground text-ellipsis">
          {`${item.brand} • ${CampaignStatus[item.status as keyof typeof CampaignStatus] ?? ""}`}
        </span>
      )}

      {item.type === "EARNING" && (
        <span className="w-full overflow-hidden font-semibold text-success text-ellipsis">
          {formatCurrency(item.amountCents / 100, item.currency)}
        </span>
      )}
    </div>
  );
};

export default CalendarItemContent;
