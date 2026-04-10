import ItemCardChips from "./itemCardChips";
import { IBaseItemCardProps } from "./itemCard.types";

const BaseItemCard = ({
  icon,
  title,
  secondaryText,
  chips = [],
  isMonthView,
  containerClassName,
  iconClassName,
  titleClassName,
  secondaryTextClassName = "text-foreground",
}: IBaseItemCardProps) => {
  if (isMonthView) {
    return (
      <div
        className={[
          "flex min-h-[56px] max-w-full items-start gap-2 overflow-hidden rounded-xl px-2 py-2 shadow-sm ring-1 ring-black/5",
          containerClassName,
        ].join(" ")}
      >
        <div className={["mt-0.5 shrink-0 text-sm", iconClassName].join(" ")}>
          {icon}
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <p
            className={[
              "truncate text-[11px] font-semibold sm:text-xs",
              titleClassName,
            ].join(" ")}
          >
            {title}
          </p>

          {secondaryText && (
            <p
              className={[
                "mt-0.5 line-clamp-1 break-words text-[10px] leading-4 sm:line-clamp-2 sm:text-[11px]",
                secondaryTextClassName,
              ].join(" ")}
            >
              {secondaryText}
            </p>
          )}

          <ItemCardChips chips={chips} isMonthView />
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "flex min-h-[96px] max-w-full flex-col gap-2.5 overflow-hidden rounded-2xl p-3 shadow-sm transition-all duration-300 sm:min-h-[110px] sm:p-3.5",
        containerClassName,
      ].join(" ")}
    >
      <div className="flex items-start gap-2">
        <div className={["mt-0.5 shrink-0 text-base", iconClassName].join(" ")}>
          {icon}
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <p
            className={[
              "truncate text-sm font-semibold sm:text-[15px]",
              titleClassName,
            ].join(" ")}
          >
            {title}
          </p>

          {secondaryText && (
            <p
              className={[
                "mt-1 line-clamp-2 break-words text-xs leading-5",
                secondaryTextClassName,
              ].join(" ")}
            >
              {secondaryText}
            </p>
          )}
        </div>
      </div>

      <ItemCardChips chips={chips} isMonthView={false} />
    </div>
  );
};

export default BaseItemCard;
