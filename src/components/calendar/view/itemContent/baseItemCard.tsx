import ItemCardChips from "./itemCardChips";
import { IBaseItemCardProps } from "./itemCard.types";

const BaseItemCard = ({
  icon,
  title,
  secondaryText,
  chips,
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
          "flex min-h-[70px] max-w-full items-start gap-2 overflow-hidden rounded-xl px-2.5 py-2 shadow-sm",
          containerClassName,
        ].join(" ")}
      >
        <div className={["mt-0.5 shrink-0", iconClassName].join(" ")}>
          {icon}
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <p
            className={["truncate text-xs font-semibold", titleClassName].join(
              " ",
            )}
          >
            {title}
          </p>

          {secondaryText && (
            <p
              className={[
                "mt-0.5 line-clamp-2 break-words text-[11px] leading-4",
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
        "flex min-h-[128px] max-w-full flex-col gap-3 overflow-hidden rounded-2xl p-3 shadow-sm transition-all duration-300",
        containerClassName,
      ].join(" ")}
    >
      <div className="flex items-start gap-2">
        <div className={["mt-1 shrink-0 text-base", iconClassName].join(" ")}>
          {icon}
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <p
            className={["truncate text-sm font-semibold", titleClassName].join(
              " ",
            )}
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
