import { ICalendarItemDetailsActionsProps } from "./calendarItemModal.types";

const CalendarItemDetailsActions = ({
  onEdit,
  onDelete,
  onClose,
}: ICalendarItemDetailsActionsProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <button
        tabIndex={-1}
        type="button"
        onClick={onEdit}
        className="cursor-pointer rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-light transition-all duration-300 hover:opacity-90"
      >
        Editar
      </button>

      <button
        tabIndex={-1}
        type="button"
        onClick={onDelete}
        className="cursor-pointer rounded-2xl bg-error px-4 py-3 text-sm font-semibold text-light transition-all duration-300 hover:opacity-90"
      >
        Deletar
      </button>

      <button
        tabIndex={-1}
        type="button"
        onClick={onClose}
        className="cursor-pointer rounded-2xl border border-foreground/20 bg-light px-4 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-secondary/10"
      >
        Fechar
      </button>
    </div>
  );
};

export default CalendarItemDetailsActions;
