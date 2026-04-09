import { CalendarFormValues } from "../../domain/form.mapper";

interface IProps {
  type?: CalendarFormValues["type"];
  onTypeChange: (nextType: CalendarFormValues["type"]) => void;
}

const CALENDAR_ITEM_TYPE_LABELS: Record<CalendarFormValues["type"], string> = {
  CONTENT: "Conteúdo",
  CAMPAIGN: "Campanha",
  EARNING: "Ganho",
};

const CalendarItemModalHeader = ({ type, onTypeChange }: IProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="min-w-0 select-none text-sm font-medium text-foreground">
        Tipo da atividade
      </span>

      <div className="grid grid-cols-3 gap-3">
        {Object.entries(CALENDAR_ITEM_TYPE_LABELS).map(
          ([key, value], index) => (
            <button
              tabIndex={-1}
              key={`${key}-${index}`}
              type="button"
              onClick={() => onTypeChange(key as CalendarFormValues["type"])}
              className={[
                "rounded-lg border py-3",
                key === type
                  ? "border-transparent bg-primary text-white"
                  : "border-foreground/30 cursor-pointer",
              ].join(" ")}
            >
              {value}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default CalendarItemModalHeader;
