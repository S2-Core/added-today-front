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
  return (
    <div
      className={[
        "gap-5 grid",
        isCreateMode ? "grid-cols-2" : "grid-cols-3",
      ].join(" ")}
    >
      <button
        tabIndex={-1}
        type="submit"
        disabled={hasAnyError || loading}
        className="bg-primary/70 hover:bg-primary disabled:opacity-50 p-2 rounded-md text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
      >
        {isCreateMode ? "Criar" : "Atualizar"}
      </button>

      <button
        tabIndex={-1}
        type="button"
        onClick={onSecondaryAction}
        className="hover:bg-primary/10 p-2 border border-foreground/30 rounded-md text-foreground transition-all duration-300 cursor-pointer"
      >
        {isCreateMode ? "Limpar" : "Cancelar"}
      </button>

      {!isCreateMode && (
        <button
          tabIndex={-1}
          disabled={loading}
          type="button"
          onClick={onDelete}
          className="bg-error/70 hover:bg-error disabled:opacity-50 p-2 rounded-md text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
        >
          Deletar
        </button>
      )}
    </div>
  );
};

export default CalendarItemModalActions;
