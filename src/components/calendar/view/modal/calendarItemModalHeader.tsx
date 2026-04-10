import { CalendarFormValues } from "../../domain/form.mapper";
import { ICalendarItemModalHeaderProps } from "./calendarItemModal.types";

const CALENDAR_ITEM_TYPE_LABELS: Record<CalendarFormValues["type"], string> = {
  CONTENT: "Conteúdo",
  CAMPAIGN: "Campanha",
  EARNING: "Ganho",
};

const CALENDAR_ITEM_TYPE_DESCRIPTIONS: Record<
  CalendarFormValues["type"],
  string
> = {
  CONTENT: "Planeje posts, ideias, hooks e publicações.",
  CAMPAIGN: "Organize parcerias, entregas e ações com marcas.",
  EARNING: "Registre receitas, recebimentos e valores do período.",
};

const CalendarItemModalHeader = ({
  type = "CONTENT",
  isCreateMode,
  onTypeChange,
}: ICalendarItemModalHeaderProps) => {
  const helperText = isCreateMode
    ? "Escolha o tipo para ajustar os campos exibidos no formulário."
    : "Você pode trocar o tipo da atividade antes de salvar as alterações.";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="min-w-0 select-none text-sm font-medium text-foreground">
          Tipo da atividade
        </span>

        <span className="text-sm leading-6 text-foreground/60">
          {helperText}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Object.entries(CALENDAR_ITEM_TYPE_LABELS).map(([key, value]) => {
          const typedKey = key as CalendarFormValues["type"];
          const isActive = typedKey === type;

          return (
            <button
              key={key}
              tabIndex={-1}
              type="button"
              onClick={() => onTypeChange(typedKey)}
              className={[
                "flex min-h-[76px] flex-col items-center justify-center rounded-2xl border px-4 py-4 text-center transition-all duration-300",
                isActive
                  ? "border-primary bg-primary text-light shadow-sm"
                  : "cursor-pointer border-foreground/20 bg-light text-foreground hover:border-primary/40 hover:bg-secondary/10",
              ].join(" ")}
            >
              <span className="text-sm font-semibold">{value}</span>

              <span
                className={[
                  "mt-1 text-xs leading-5",
                  isActive ? "text-light/85" : "text-foreground/60",
                ].join(" ")}
              >
                {CALENDAR_ITEM_TYPE_DESCRIPTIONS[typedKey]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarItemModalHeader;
