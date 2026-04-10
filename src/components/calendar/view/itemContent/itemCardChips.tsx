import { IItemCardChip } from "./itemCard.types";

interface IProps {
  chips: IItemCardChip[];
  isMonthView: boolean;
}

const ItemCardChips = ({ chips = [], isMonthView }: IProps) => {
  if (!chips.length) return null;

  return (
    <div
      className={[
        "flex max-w-full flex-wrap gap-1.5",
        isMonthView ? "mt-1.5" : "mt-auto",
      ].join(" ")}
    >
      {chips.map(({ label, className }, index) => (
        <span
          key={`${label}-${index}`}
          className={[
            "max-w-full truncate rounded-full font-medium",
            isMonthView
              ? "px-2 py-0.5 text-[10px]"
              : "px-2.5 py-1 text-[11px] sm:text-xs",
            className,
          ].join(" ")}
          title={label}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default ItemCardChips;
