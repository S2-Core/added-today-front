import { IItemCardChip } from "./itemCard.types";

interface IProps {
  chips: IItemCardChip[];
  isMonthView: boolean;
}

const ItemCardChips = ({ chips, isMonthView }: IProps) => {
  if (!chips.length) return null;

  return (
    <div
      className={[
        "flex flex-wrap gap-1",
        !isMonthView ? "mt-auto gap-2" : "mt-2",
      ].join(" ")}
    >
      {chips.map(({ label, className }, index) => (
        <span
          key={`${label}-${index}`}
          className={[
            "rounded-full",
            isMonthView ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
            className,
          ].join(" ")}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default ItemCardChips;
