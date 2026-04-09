interface IProps {
  isCreateMode: boolean;
  loading: boolean;
  hasAnyError: boolean;
  onSecondaryAction: () => void;
  onDelete: () => Promise<void>;
}

const CalendarItemModalActions = ({
  isCreateMode,
  loading,
  hasAnyError,
  onSecondaryAction,
  onDelete,
}: IProps) => {
  const gridClassName = isCreateMode ? "grid-cols-2" : "grid-cols-3";
  const primaryLabel = isCreateMode ? "Criar" : "Atualizar";
  const secondaryLabel = isCreateMode ? "Limpar" : "Cancelar";

  return (
    <div className={["grid gap-5", gridClassName].join(" ")}>
      <button
        tabIndex={-1}
        type="submit"
        disabled={hasAnyError || loading}
        className="cursor-pointer rounded-md bg-primary/70 p-2 text-white transition-all duration-300 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {primaryLabel}
      </button>

      <button
        tabIndex={-1}
        type="button"
        onClick={onSecondaryAction}
        className="cursor-pointer rounded-md border border-foreground/30 p-2 text-foreground transition-all duration-300 hover:bg-primary/10"
      >
        {secondaryLabel}
      </button>

      {!isCreateMode && (
        <button
          tabIndex={-1}
          disabled={loading}
          type="button"
          onClick={onDelete}
          className="cursor-pointer rounded-md bg-error/70 p-2 text-white transition-all duration-300 hover:bg-error disabled:cursor-not-allowed disabled:opacity-50"
        >
          Deletar
        </button>
      )}
    </div>
  );
};

export default CalendarItemModalActions;
